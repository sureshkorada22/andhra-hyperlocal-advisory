import asyncio
import logging
import time
from typing import Dict, Any, List, Optional
from fastapi import APIRouter, HTTPException, Depends, Query
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.models import (
    Location as LocationModel,
    AnalysisRequest as AnalysisModel,
    Competitor as CompetitorModel,
    OpportunityScore as OpportunityScoreModel,
    RiskResult as RiskResultModel,
    SwotResult as SwotResultModel,
    BusinessSubmission as BusinessSubmissionModel
)
from app.services.location_service import (
    geocode_ap_location,
    reverse_geocode_ap_location,
    get_ap_districts_catalog,
    is_within_ap_bounds,
)
from app.data.ap_census_data import get_ap_census_hierarchical
from app.business.categories import BUSINESS_CATEGORIES, CATEGORY_MAP
from app.business.profiler import get_or_create_business_profile
from app.services.data_provider import collect_and_normalize_businesses
from app.services.demographics_service import fetch_demographic_indicators
from app.services.weather_service import fetch_ap_weather
from app.services.ap_data_service import get_ap_sector_indicators
from app.engines.competitor_engine import analyze_competitors
from app.engines.accessibility_engine import calculate_accessibility_score
from app.engines.market_gap_engine import evaluate_market_gap
from app.engines.opportunity_engine import calculate_opportunity_score
from app.engines.threat_swot_engine import evaluate_threats_and_swot
from app.engines.confidence_engine import evaluate_data_confidence
from app.services.nlp_service import generate_ai_explanation
from app.data.data_registry import get_central_data_sources
from app.engines.financial_engine import (
    calculate_financial_roadmap,
    generate_repayment_schedule,
    SCHEME_CONFIG
)
from app.data.ap_locations_registry import get_location_hierarchy
from app.data.normalized_repository import build_normalized_indicators

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api")

# In-memory fast cache to prevent redundant Overpass queries
ANALYSIS_CACHE: Dict[str, Any] = {}

# --- Pydantic Schemas ---

class GeocodeRequest(BaseModel):
    query: str

class ReverseGeocodeRequest(BaseModel):
    latitude: float
    longitude: float

class BusinessUnderstandRequest(BaseModel):
    business_text: str
    category_slug: Optional[str] = None

class AnalyzeRequest(BaseModel):
    location: Dict[str, Any]
    business: Dict[str, Any]
    radius_km: float = 10.0
    language: str = "te"  # te, hi, en
    margin_capital: Optional[float] = 100000.0
    is_demo: Optional[bool] = False

class BusinessSuggestRequest(BaseModel):
    business_name: str
    category: str
    location_text: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    address: Optional[str] = None
    supporting_info: Optional[str] = None


class FinancialCalculateRequest(BaseModel):
    margin_capital: float


class FinancialScheduleRequest(BaseModel):
    loan_amount: float
    interest_rate_pa: float
    tenure_years: int
    moratorium_months: int
    frequency: str = "quarterly"


# --- Endpoints ---

@router.get("/categories")
async def get_categories():
    """Returns the comprehensive small business library categorized into 11 domains."""
    return {"categories": BUSINESS_CATEGORIES}


@router.get("/location/hierarchy")
async def get_location_hierarchy_endpoint():
    """
    Returns the official Andhra Pradesh administrative hierarchy:
    Andhra Pradesh -> Districts -> Mandals -> Villages / Towns / Localities
    with coordinates, official codes, and Telugu names.
    """
    return get_location_hierarchy()



@router.post("/location/geocode")
async def geocode_location(req: GeocodeRequest):
    """
    Geocodes user location strictly within Andhra Pradesh.
    Returns error if outside AP or prompts disambiguation if multiple candidates match.
    """
    res = await geocode_ap_location(req.query)
    if not res.get("is_ap"):
        return {
            "success": False,
            "is_ap": False,
            "error_message": res.get("error_message", "This prototype currently supports locations within Andhra Pradesh."),
            "candidates": []
        }
    return res


@router.post("/location/reverse-geocode")
async def reverse_geocode_location(req: ReverseGeocodeRequest):
    """
    Reverse geocodes latitude and longitude coordinates strictly within Andhra Pradesh.
    Returns standard LocationItem schema or error if outside AP bounds.
    """
    res = await reverse_geocode_ap_location(req.latitude, req.longitude)
    return res


@router.get("/location/catalog")
async def get_location_catalog():
    """
    Returns all 26 Andhra Pradesh districts with their towns/mandals and popular quick-pick presets.
    """
    return get_ap_districts_catalog()


@router.post("/business/understand")
async def understand_business(req: BusinessUnderstandRequest):
    """
    NLP intent classification for business ideas (Telugu, Hindi, English).
    Returns dynamic business profile and confidence score.
    """
    profile = get_or_create_business_profile(req.business_text, req.category_slug)
    needs_confirmation = profile.get("confidence", 1.0) < 0.65
    return {
        "success": True,
        "profile": profile,
        "needs_confirmation": needs_confirmation,
        "confirmation_message": (
            f"We understood your business as '{profile['business_name']}' under category '{profile.get('category_name_en')}'. Is this correct?"
            if needs_confirmation else None
        )
    }


@router.post("/analyze")
async def perform_analysis(req: AnalyzeRequest, db: Session = Depends(get_db)):
    """
    Main Module 1 Business + Location Intelligence pipeline:
      REAL DATA -> ANALYTICS ENGINE -> DETERMINISTIC RESULTS -> MULTILINGUAL AI EXPLANATION
    Outputs strict Module 1 schema contract ready for Module 2.
    """
    loc = req.location
    lat_val = loc.get("latitude")
    lon_val = loc.get("longitude")
    if lat_val is None or lon_val is None:
        raise HTTPException(
            status_code=400,
            detail="Coordinates unavailable for this location. Radius-based analysis may be limited."
        )
    try:
        lat = float(lat_val)
        lon = float(lon_val)
    except (ValueError, TypeError):
        raise HTTPException(
            status_code=400,
            detail="Coordinates unavailable for this location. Radius-based analysis may be limited."
        )
    
    # Strictly restrict Module 1 to Andhra Pradesh, India
    if not is_within_ap_bounds(lat, lon):
        raise HTTPException(
            status_code=400,
            detail="This application currently supports locations within Andhra Pradesh only."
        )

    radius_km = float(req.radius_km)
    margin_capital = float(req.margin_capital or 100000.0)
    biz = req.business
    biz_name = biz.get("business_name") or biz.get("name") or biz.get("name_en") or "Rural Enterprise"
    cat_slug = biz.get("category_slug", "retail")
    lang = req.language if req.language in ["te", "hi", "en"] else "te"

    cache_key = f"{round(lat, 4)}_{round(lon, 4)}_{round(radius_km, 1)}_{cat_slug}_{biz_name}_{round(margin_capital, 0)}"
    if cache_key in ANALYSIS_CACHE:
        cached = dict(ANALYSIS_CACHE[cache_key])
        # Update language explanation if switched
        cached["ai_explanation"] = generate_ai_explanation(
            business_name=biz_name,
            location_name=loc.get("village_or_town") or loc.get("resolved_name", "Andhra Pradesh"),
            radius_km=radius_km,
            opportunity_score=cached["opportunity_score"]["opportunity_score"],
            opportunity_label=cached["opportunity_score"]["opportunity_label"],
            market_gap=cached["market_gap"]["market_gap_level"],
            direct_count=cached["competitors"]["direct_count"],
            indirect_count=cached["competitors"]["indirect_count"],
            households=cached["market_reach"]["estimated_households"],
            accessibility_score=cached["accessibility"]["accessibility_score"],
            language=lang
        )
        return cached

    # Fetch Demographics, POIs, Accessibility, and Weather CONCURRENTLY for sub-second/fast response
    district = loc.get("district")
    if not district or district == "Andhra Pradesh":
        from app.services.data_provider import haversine_distance
        from app.data.ap_locations_registry import AP_COMPREHENSIVE_LOCATIONS
        closest_loc = min(AP_COMPREHENSIVE_LOCATIONS, key=lambda l: haversine_distance(lat, lon, l["latitude"], l["longitude"]))
        district = closest_loc.get("district", "Andhra Pradesh")
    profile = get_or_create_business_profile(biz_name, cat_slug)

    demo_task = fetch_demographic_indicators(
        lat=lat,
        lon=lon,
        radius_km=radius_km,
        district=district,
        village=loc.get("village_or_town"),
        mandal=loc.get("mandal"),
        location_code=loc.get("location_code")
    )
    poi_task = collect_and_normalize_businesses(lat, lon, radius_km, profile)
    access_task = calculate_accessibility_score(lat, lon, radius_km)
    weather_task = fetch_ap_weather(lat, lon)

    demo_res, poi_res, access_res, weather_res = await asyncio.gather(
        demo_task, poi_task, access_task, weather_task, return_exceptions=True
    )

    # 1. Demographics
    if isinstance(demo_res, Exception) or not isinstance(demo_res, dict):
        logger.warning(f"Demographics task fallback due to: {demo_res}")
        area_sq = round(3.14159 * (radius_km ** 2), 2)
        census_fallback = get_ap_census_hierarchical(
            loc.get("village_or_town"),
            loc.get("mandal"),
            district,
            loc.get("location_code")
        )
        density = float(census_fallback.get("population_density_per_sq_km", 380.0))
        estimated_pop = int(area_sq * density * 0.75)
        estimated_hh = int(estimated_pop / 3.8)
        demographics = {
            "area_sq_km": area_sq,
            "estimated_population": estimated_pop,
            "estimated_households": estimated_hh,
            "district_density_per_sq_km": density,
            "identified_settlements_count": 1,
            "settlement_samples": [{"name": loc.get("village_or_town", "Local Settlement"), "type": "village", "distance_km": 1.0}],
            "demographic_status": f"Census 2011 Baseline ({census_fallback.get('resolution_level', 'District Level')})",
            "data_source": "Census of India 2011 (Reference year: 2011)",
            "census_baseline": {
                "location_name": census_fallback.get("village_name") or district,
                "district_name": census_fallback.get("district_name", district),
                "mandal_name": census_fallback.get("mandal_name", loc.get("mandal")),
                "village_code": census_fallback.get("village_code"),
                "total_population": census_fallback.get("total_population", 50000),
                "male_population": census_fallback.get("male_population", 25000),
                "female_population": census_fallback.get("female_population", 25000),
                "total_households": census_fallback.get("total_households", 12000),
                "population_density_per_sq_km": density,
                "literacy_rate_pct": census_fallback.get("literacy_rate_pct", 67.0),
                "rural_population_pct": census_fallback.get("rural_population_pct", 75.0),
                "main_workers": census_fallback.get("main_workers", 22000),
                "marginal_workers": census_fallback.get("marginal_workers", 4000),
                "cultivators_count": census_fallback.get("cultivators_count", 4500),
                "agri_labourers_count": census_fallback.get("agri_labourers_count", 8500),
                "household_industry_workers": census_fallback.get("household_industry_workers", 1200),
                "other_workers": census_fallback.get("other_workers", 7800),
                "source": "Census of India 2011",
                "year": "2011",
                "reference_year": "2011",
                "reference_year_label": "Reference year: 2011",
                "geographic_level": census_fallback.get("resolution_level", "District Level"),
                "badge": census_fallback.get("badge", "Official data")
            },
            "note": "Population and household figures are demographic indicators of local market reach, not guaranteed customer footfall."
        }
    else:
        demographics = demo_res

    # 2. Multi-Source POIs & Competitors
    if isinstance(poi_res, Exception) or not isinstance(poi_res, tuple) or len(poi_res) != 3:
        logger.warning(f"POI collection task fallback due to: {poi_res}")
        direct, indirect, supporting = [], [], []
    else:
        direct, indirect, supporting = poi_res

    # 3. Competitor Analytics
    competitor_stats = analyze_competitors(direct, indirect, radius_km)

    # 4. Accessibility Analytics
    if isinstance(access_res, Exception) or not isinstance(access_res, dict):
        logger.warning(f"Accessibility task fallback due to: {access_res}")
        accessibility_stats = {
            "accessibility_score": 72.0,
            "accessibility_level": "Moderate Accessibility",
            "factors": {
                "highway_proximity": 70.0,
                "public_transit": 65.0,
                "rural_road_network": 75.0,
                "market_linkage": 70.0
            },
            "status": "Estimated via AP Rural Road Network Baseline",
            "confidence": 0.82
        }
    else:
        accessibility_stats = access_res

    # 5. Market Gap Analytics
    market_gap_stats = evaluate_market_gap(
        estimated_households=demographics["estimated_households"],
        direct_competitor_count=competitor_stats["direct_count"],
        indirect_competitor_count=competitor_stats["indirect_count"],
        radius_km=radius_km
    )

    # 6. Sector, Agricultural, Wage, Price & Enterprise Indicators
    ap_sector = get_ap_sector_indicators(district, cat_slug, business_name=biz_name)
    normalized_indicators = build_normalized_indicators(loc, profile, radius_km)

    # 7. Weather & Climatic Indicators
    if isinstance(weather_res, Exception) or not isinstance(weather_res, dict):
        logger.warning(f"Weather task fallback due to: {weather_res}")
        weather_stats = {
            "avg_temp_c": 31.0,
            "max_temp_c": 35.0,
            "humidity_percent": 68.0,
            "precipitation_mm": 0.0,
            "seasonal_risk": "Normal",
            "climate_suitability": "Favorable",
            "source": "AP Regional Meteorological Baseline",
            "status": "Estimated"
        }
    else:
        weather_stats = weather_res

    # 8. Deterministic Opportunity Score (0-100)
    opportunity_stats = calculate_opportunity_score(
        demographics=demographics,
        competitor_stats=competitor_stats,
        accessibility_stats=accessibility_stats,
        market_gap_stats=market_gap_stats,
        weather_stats=weather_stats,
        category_slug=cat_slug
    )

    # 9. Empirical SWOT and Threat Matrix
    threat_swot = evaluate_threats_and_swot(
        business_name=biz_name,
        category_slug=cat_slug,
        location_name=loc.get("village_or_town") or loc.get("resolved_name", "Selected Location"),
        district=district,
        demographics=demographics,
        competitor_stats=competitor_stats,
        accessibility_stats=accessibility_stats,
        market_gap_stats=market_gap_stats,
        weather_stats=weather_stats,
        margin_capital=margin_capital
    )

    # 10. Data Confidence Rating
    confidence_stats = evaluate_data_confidence(
        competitor_count=competitor_stats["total_count"],
        has_demographics=True,
        price_count=len(ap_sector.get("price_indicators", [])),
        has_weather=True,
        location_confidence=loc.get("confidence", 1.0)
    )

    # 11. Multilingual AI Explanation (AI never modifies numbers)
    ai_explanation = generate_ai_explanation(
        business_name=biz_name,
        location_name=loc.get("village_or_town") or loc.get("resolved_name", "Selected Location"),
        radius_km=radius_km,
        opportunity_score=opportunity_stats["opportunity_score"],
        opportunity_label=opportunity_stats["opportunity_label"],
        market_gap=market_gap_stats["market_gap_level"],
        direct_count=competitor_stats["direct_count"],
        indirect_count=competitor_stats["indirect_count"],
        households=demographics["estimated_households"],
        accessibility_score=accessibility_stats["accessibility_score"],
        language=lang
    )

    # 12. Transparent Methodology & Sources Contract
    sources_contract = {
        "geocoding_source": loc.get("provider", "Andhra Pradesh Official Locations Registry / OpenStreetMap"),
        "competitors_source": "OpenStreetMap Overpass API & Verified Local Submissions",
        "demographics_source": "Census of India 2011 (Reference year: 2011)",
        "weather_source": weather_stats.get("source", "Open-Meteo Weather API"),
        "prices_source": "AP Agricultural Marketing Department (APMC Mandi Rate Cards)",
        "wages_source": "Directorate of Economics and Statistics (DES), Govt of AP",
        "msme_source": "Ministry of MSME, Govt of India / Udyam Portal (Registered MSMEs)",
        "economic_census_source": "MoSPI 6th Economic Census, Govt of India",
        "last_updated": time.strftime("%Y-%m-%d %H:%M:%S IST"),
        "limitations": [
            "Census 2011 provides statutory baseline population/households (Reference year: 2011).",
            "Udyam statistics strictly count Registered MSMEs; unmapped informal vendors may exist.",
            "Wages are official reference benchmarks for operating cost estimation, not guaranteed salaries.",
            "Prices reflect observed market yard rates; revenues depend on daily individual micro-unit trading."
        ]
    }

    # Data Quality & Coverage Matrix (Section 14)
    data_quality_coverage = [
        {
            "domain": "Demographics & Households",
            "source": "Census of India 2011",
            "dataset": "Primary Census Abstract (PCA)",
            "reference_year": "2011 (Statutory Census)",
            "geographic_level": demographics.get("census_baseline", {}).get("geographic_level", "District Level"),
            "badge": "Official data"
        },
        {
            "domain": "Establishment Structure",
            "source": "MoSPI, Government of India",
            "dataset": "6th Economic Census",
            "reference_year": "2013-14 (Official Round)",
            "geographic_level": "District Level",
            "badge": "Official data"
        },
        {
            "domain": "Registered MSMEs",
            "source": "Ministry of MSME, Govt of India",
            "dataset": "Udyam Registration Portal",
            "reference_year": "2023-24 (Live Register)",
            "geographic_level": "District Level",
            "badge": "Official data"
        },
        {
            "domain": "Agriculture & Crops",
            "source": "DES AP & Dept of Agriculture",
            "dataset": "Socio-Economic Survey of AP",
            "reference_year": "2023-24",
            "geographic_level": "District Level",
            "badge": "Official data"
        },
        {
            "domain": "Livestock & Bovines",
            "source": "20th Livestock Census AP & Dept of Animal Husbandry",
            "dataset": "District Livestock Inventory",
            "reference_year": "2023-24",
            "geographic_level": "District Level",
            "badge": "Official data"
        },
        {
            "domain": "Observed Prices",
            "source": "APMC Mandi Rate Cards / APDDCF Rate Cards",
            "dataset": "Mandi Procurement Schedules",
            "reference_year": "2024-25",
            "geographic_level": "District / Market Yard Level",
            "badge": "Official data"
        },
        {
            "domain": "Labour Reference Wages",
            "source": "Directorate of Economics & Statistics (DES) AP",
            "dataset": "Rural Labour Daily Wage Bulletins",
            "reference_year": "2023-24",
            "geographic_level": "District Level",
            "badge": "Official data"
        },
        {
            "domain": "Physical POIs & Road Topography",
            "source": "OpenStreetMap Contributors",
            "dataset": "Overpass Geographic API",
            "reference_year": "2026",
            "geographic_level": f"{radius_km} km Radius Catchment",
            "badge": "Observed physical POIs"
        }
    ]

    is_demo_mode = bool(req.is_demo or loc.get("is_demo") or "lakshmipuram benchmark" in str(loc.get("resolved_name", "")).lower())
    data_mode_str = "DEMO DATA — For Presentation Only (Lakshmipuram Benchmark)" if is_demo_mode else "REAL GOVERNMENT DATA"

    base_bl = demographics.get("census_baseline", {})
    local_snapshot = {
        "source": base_bl.get("source", "Census of India 2011"),
        "dataset": "Primary Census Abstract",
        "reference_year": base_bl.get("reference_year", "2011"),
        "reference_year_label": "Reference year: 2011",
        "geographic_level": base_bl.get("geographic_level", "District Level"),
        "location_code": base_bl.get("village_code") or loc.get("location_code", ""),
        "location_name": base_bl.get("location_name") or loc.get("village_or_town", district),
        "district": base_bl.get("district_name", district),
        "population": base_bl.get("total_population") or demographics.get("estimated_population", 5000),
        "male_population": base_bl.get("male_population", 2500),
        "female_population": base_bl.get("female_population", 2500),
        "households": base_bl.get("total_households") or demographics.get("estimated_households", 1200),
        "population_density": base_bl.get("population_density_per_sq_km") or demographics.get("district_density_per_sq_km", 380.0),
        "literacy_rate_pct": base_bl.get("literacy_rate_pct", 67.0),
        "rural_urban": "Rural" if base_bl.get("rural_population_pct", 75.0) > 50 else "Urban",
        "workers_total": (base_bl.get("main_workers") or 0) + (base_bl.get("marginal_workers") or 0),
        "cultivators": base_bl.get("cultivators_count", 0),
        "agricultural_labourers": base_bl.get("agri_labourers_count", 0),
        "household_industry_workers": base_bl.get("household_industry_workers", 0),
        "other_workers": base_bl.get("other_workers", 0),
        "badge": base_bl.get("badge", "Official data"),
        **base_bl
    }

    biz_landscape = dict(ap_sector.get("business_landscape", {}))
    msme_sub = biz_landscape.get("registered_msmes", {})
    ec_sub = biz_landscape.get("economic_census", {})
    biz_landscape.update({
        "registered_msmes_district": msme_sub.get("total_registered_msmes", 0),
        "msme_micro": msme_sub.get("micro_enterprises", 0),
        "msme_small": msme_sub.get("small_enterprises", 0),
        "msme_medium": msme_sub.get("medium_enterprises", 0),
        "msme_manufacturing": msme_sub.get("manufacturing_units", 0),
        "msme_services": msme_sub.get("service_units", 0),
        "msme_trading": msme_sub.get("trading_units", 0),
        "msme_reference_year": msme_sub.get("reference_period", "2023-24"),
        "economic_census_establishments": ec_sub.get("total_establishments", 0),
        "economic_census_agri": ec_sub.get("agricultural_establishments", 0),
        "economic_census_non_agri": ec_sub.get("non_agricultural_establishments", 0),
        "economic_census_reference_year": ec_sub.get("reference_year", "2013-14"),
        "top_district_sectors": [s.get("sector") for s in ec_sub.get("primary_sectors", [])] if ec_sub.get("primary_sectors") else ["Retail & Trade", "Agriculture & Allied"]
    })

    operating_costs = dict(ap_sector.get("operating_cost_indicators", {}))
    operating_costs.update({
        "reference_daily_wage_agri": operating_costs.get("agri_labour_male_daily_rs", 420),
        "reference_daily_wage_non_agri": operating_costs.get("non_agri_labour_daily_rs", 480),
        "reference_daily_wage_construction": operating_costs.get("semi_skilled_helper_daily_rs", 510),
        "estimated_monthly_operating_labour_cost_2_workers": operating_costs.get("monthly_ref_labour_cost_2workers_rs", 25000),
        "wage_source": operating_costs.get("source", "Directorate of Economics & Statistics (DES), Govt of AP"),
        "wage_reference_period": operating_costs.get("reference_period", "2023-24"),
        "wage_geographic_level": operating_costs.get("geographic_level", "District Level"),
    })

    # Assemble Full Module 1 Response Contract
    response_payload = {
        "analysis_id": int(time.time() * 1000),
        "business": {
            "name": biz_name,
            "category_slug": cat_slug,
            "category_name": CATEGORY_MAP.get(cat_slug, {}).get("name_en", cat_slug.title()),
            "customer_segments": profile.get("customer_segments", []),
            "infrastructure_requirements": profile.get("infrastructure_requirements", [])
        },
        "location": loc,
        "radius": {
            "radius_km": radius_km,
            "area_sq_km": competitor_stats["area_sq_km"]
        },
        "market_reach": demographics,
        "competitors": competitor_stats,
        "accessibility": accessibility_stats,
        "market_gap": market_gap_stats,
        "price_indicators": ap_sector.get("price_indicators", []),
        "operating_cost_indicators": operating_costs,
        "business_landscape": biz_landscape,
        "local_snapshot": local_snapshot,
        "normalized_indicators": normalized_indicators,
        "opportunity_insights": ap_sector.get("evidence_insights", []),
        "data_quality_coverage": data_quality_coverage,
        "supporting_infrastructure": {
            "accessibility_score": accessibility_stats["accessibility_score"],
            "apmc_market_yards": ap_sector.get("district_market_yards", []),
            "livestock_indicators": ap_sector.get("livestock_indicators")
        },
        "margin_capital": margin_capital,
        "budget_feasibility": threat_swot.get("budget_feasibility"),
        "opportunity_score": opportunity_stats,
        "threats": threat_swot["threats"],
        "swot": threat_swot["swot"],
        "data_confidence": confidence_stats,
        "weather": weather_stats,
        "ai_explanation": ai_explanation,
        "sources": sources_contract,
        "data_mode": data_mode_str,
        "is_demo": is_demo_mode,
        "sector_indicators": ap_sector,
        "data_sources": get_central_data_sources()
    }

    # Save to memory cache
    ANALYSIS_CACHE[cache_key] = response_payload

    # Optional background database persistence
    try:
        loc_row = LocationModel(
            query_text=loc.get("resolved_name", ""),
            resolved_name=loc.get("resolved_name", ""),
            state="Andhra Pradesh",
            district=loc.get("district"),
            mandal=loc.get("mandal"),
            village_or_town=loc.get("village_or_town"),
            latitude=lat,
            longitude=lon,
            provider=loc.get("provider", "OSM")
        )
        db.add(loc_row)
        db.commit()
    except Exception as db_err:
        logger.debug(f"DB persistence note: {db_err}")

    return response_payload


@router.get("/analysis/{analysis_id}")
async def get_analysis_by_id(analysis_id: int):
    """Retrieves an existing analysis by ID."""
    for record in ANALYSIS_CACHE.values():
        if record.get("analysis_id") == analysis_id:
            return record
    raise HTTPException(status_code=404, detail="Analysis record not found.")


@router.get("/competitors")
async def get_competitors_summary():
    """Returns the latest competitor query results."""
    return {"message": "Competitor queries are executed dynamically per location & radius."}


@router.get("/market")
async def get_market_summary():
    """Returns general AP market indicators."""
    return {"message": "Market indicators are generated dynamically per business & district."}


@router.get("/demographics")
async def get_demographics_summary(district: str = Query("Visakhapatnam")):
    """Returns demographic parameters for the specified AP district."""
    return {
        "district": district,
        "census_year": "2011/2021 Projections",
        "state": "Andhra Pradesh",
        "household_size_avg": 3.8
    }


@router.get("/accessibility")
async def get_accessibility_info():
    """Returns accessibility scoring criteria."""
    return {
        "criteria": [
            {"factor": "Highway Proximity (Trunk/Primary)", "weight": 35},
            {"factor": "Transit Connectivity (Bus Station/Stop)", "weight": 25},
            {"factor": "Rural Road Network Coverage (PMGSY)", "weight": 20},
            {"factor": "Market Node Proximity", "weight": 20}
        ]
    }


@router.get("/swot")
async def get_swot_criteria():
    """Returns SWOT methodology."""
    return {"methodology": "Empirically calculated from competitor density, household counts, and road access."}


@router.get("/threats")
async def get_threats_criteria():
    """Returns risk categorization rules."""
    return {"risk_levels": ["Low", "Medium", "High"]}


@router.get("/sources")
async def get_sources_and_methodology():
    """
    Dedicated endpoint for hackathon evaluators to inspect data origins, calculation formulas,
    and statutory provenance.
    """
    return {
        "title": "SIH 2026 — Central Data Source Registry & Methodology",
        "geographic_scope": "Andhra Pradesh, India ONLY",
        "sources": get_central_data_sources()
    }


@router.post("/business/suggest")
async def suggest_missing_business(req: BusinessSuggestRequest, db: Session = Depends(get_db)):
    """
    Community contribution feature: "Is a local business missing?"
    Accepts crowdsourced business entries marked as 'Suggested'.
    Does NOT automatically verify until review.
    """
    submission = BusinessSubmissionModel(
        business_name=req.business_name,
        category=req.category,
        location_text=req.location_text,
        latitude=req.latitude,
        longitude=req.longitude,
        address=req.address,
        supporting_info=req.supporting_info,
        status="Suggested"
    )
    db.add(submission)
    db.commit()
    db.refresh(submission)

    return {
        "success": True,
        "submission_id": submission.id,
        "status": "Suggested",
        "message": "Thank you! Your business suggestion has been recorded with status 'Suggested' and queued for community verification."
    }


# =========================================================================
# MODULE 2: SMART FINANCIAL CALCULATOR & SCHEME ROUTER (SIH26091)
# =========================================================================

@router.get("/finance/schemes")
async def get_schemes():
    """Returns central SIH 2026 scheme parameters for Micro Finance & Term Loan."""
    return {"schemes": SCHEME_CONFIG}


@router.post("/finance/calculate")
async def calculate_finance(req: FinancialCalculateRequest):
    """
    Deterministic SIH 2026 Module 2 Financial Calculator and Scheme Router.
    Calculates: Total Project Cost (Margin / 10%), Max Loan (90%), Scheme Routing.
    """
    return calculate_financial_roadmap(req.margin_capital)


@router.post("/finance/schedule")
async def get_schedule(req: FinancialScheduleRequest):
    """
    Generates indicative reducing-balance schedule with moratorium accounting (Monthly or Quarterly).
    """
    schedule = generate_repayment_schedule(
        loan_amount=req.loan_amount,
        interest_rate_pa=req.interest_rate_pa,
        tenure_years=req.tenure_years,
        moratorium_months=req.moratorium_months,
        frequency=req.frequency
    )
    return {"schedule": schedule}

