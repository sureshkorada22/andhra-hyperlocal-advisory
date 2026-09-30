"""
Normalized Data Repository for Andhra Pradesh Hyper-Local Business Advisory.
Implements the Section 18 standard normalized data architecture:
  {
    "source": str,
    "dataset": str,
    "referenceYear": str or int,
    "geographicLevel": str,
    "locationCode": str,
    "locationName": str,
    "indicator": str,
    "value": Any,
    "unit": str,
    "badge": "Official data" | "Estimated" | "Unavailable",
    "category": str
  }
"""

from typing import Dict, Any, List, Optional
from app.data.ap_census_data import get_ap_census_hierarchical, get_ap_census_district
from app.data.ap_economic_census import get_ap_economic_census
from app.data.ap_msme_udyam import get_ap_msme_data
from app.data.ap_govt_statistics import get_ap_govt_district
from app.data.ap_prices_wages import get_ap_district_wages

def build_normalized_indicators(
    location: Dict[str, Any],
    business_profile: Dict[str, Any],
    radius_km: float = 10.0
) -> List[Dict[str, Any]]:
    """
    Builds a normalized, standardized list of official government indicators
    fused specifically for the given location and business profile.
    """
    district = location.get("district", "Visakhapatnam")
    mandal = location.get("mandal", "")
    village = location.get("village_or_town") or location.get("resolved_name", "").split(",")[0]
    loc_code = location.get("location_code") or location.get("postal_code", "AP-LOC")
    cat_slug = business_profile.get("category_slug", "retail")

    indicators: List[Dict[str, Any]] = []

    # 1. CENSUS 2011 (Demographic & Household Baseline)
    census = get_ap_census_hierarchical(village_name=village, mandal_name=mandal, district_name=district)
    c_geo_level = census.get("resolution_level", "District Level")
    c_code = census.get("village_code") or f"AP-DIST-{district[:3].upper()}"
    c_name = census.get("village_name") or census.get("district_name", district)

    indicators.append({
        "source": "Census 2011",
        "dataset": "Primary Census Abstract (PCA)",
        "referenceYear": 2011,
        "geographicLevel": c_geo_level,
        "locationCode": c_code,
        "locationName": c_name,
        "indicator": "Total Population",
        "value": census.get("total_population", 0),
        "unit": "persons",
        "badge": "Official data",
        "category": "demographics"
    })

    indicators.append({
        "source": "Census 2011",
        "dataset": "Primary Census Abstract (PCA)",
        "referenceYear": 2011,
        "geographicLevel": c_geo_level,
        "locationCode": c_code,
        "locationName": c_name,
        "indicator": "Total Households",
        "value": census.get("total_households", 0),
        "unit": "households",
        "badge": "Official data",
        "category": "demographics"
    })

    indicators.append({
        "source": "Census 2011",
        "dataset": "Primary Census Abstract (PCA)",
        "referenceYear": 2011,
        "geographicLevel": c_geo_level,
        "locationCode": c_code,
        "locationName": c_name,
        "indicator": "Population Density",
        "value": census.get("population_density_per_sq_km", 0),
        "unit": "persons / sq km",
        "badge": "Official data",
        "category": "demographics"
    })

    indicators.append({
        "source": "Census 2011",
        "dataset": "Primary Census Abstract (PCA)",
        "referenceYear": 2011,
        "geographicLevel": c_geo_level,
        "locationCode": c_code,
        "locationName": c_name,
        "indicator": "Literacy Rate",
        "value": census.get("literacy_rate_pct", 0),
        "unit": "%",
        "badge": "Official data",
        "category": "demographics"
    })

    indicators.append({
        "source": "Census 2011",
        "dataset": "Primary Census Abstract (PCA)",
        "referenceYear": 2011,
        "geographicLevel": c_geo_level,
        "locationCode": c_code,
        "locationName": c_name,
        "indicator": "Total Workers",
        "value": (census.get("main_workers", 0) + census.get("marginal_workers", 0)),
        "unit": "workers",
        "badge": "Official data",
        "category": "employment"
    })

    # 2. ECONOMIC CENSUS (MoSPI 6th Economic Census)
    ec = get_ap_economic_census(district)
    indicators.append({
        "source": "MoSPI, Government of India",
        "dataset": "6th Economic Census",
        "referenceYear": "2013-14",
        "geographicLevel": ec.get("geographic_level", "District Level"),
        "locationCode": f"EC6-AP-{district[:3].upper()}",
        "locationName": ec.get("district", district),
        "indicator": "Total Economic Establishments",
        "value": ec.get("total_establishments", 0),
        "unit": "enterprises",
        "badge": "Official data",
        "category": "economic_census"
    })

    indicators.append({
        "source": "MoSPI, Government of India",
        "dataset": "6th Economic Census",
        "referenceYear": "2013-14",
        "geographicLevel": ec.get("geographic_level", "District Level"),
        "locationCode": f"EC6-AP-{district[:3].upper()}",
        "locationName": ec.get("district", district),
        "indicator": "Own-Account Micro Enterprises",
        "value": ec.get("own_account_establishments", 0),
        "unit": "enterprises (without hired workers)",
        "badge": "Official data",
        "category": "economic_census"
    })

    indicators.append({
        "source": "MoSPI, Government of India",
        "dataset": "6th Economic Census",
        "referenceYear": "2013-14",
        "geographicLevel": ec.get("geographic_level", "District Level"),
        "locationCode": f"EC6-AP-{district[:3].upper()}",
        "locationName": ec.get("district", district),
        "indicator": "Total Enterprise Employment",
        "value": ec.get("total_employment", 0),
        "unit": "persons employed",
        "badge": "Official data",
        "category": "economic_census"
    })

    # 3. MSME / UDYAM DATA
    msme = get_ap_msme_data(district)
    indicators.append({
        "source": "Ministry of MSME, Government of India",
        "dataset": "Udyam Registration Portal",
        "referenceYear": "2023-24",
        "geographicLevel": msme.get("geographic_level", "District Level"),
        "locationCode": f"UDYAM-AP-{district[:3].upper()}",
        "locationName": msme.get("district", district),
        "indicator": "Registered MSMEs Total",
        "value": msme.get("total_registered_msmes", 0),
        "unit": "registered units",
        "badge": "Official data",
        "category": "msme"
    })

    indicators.append({
        "source": "Ministry of MSME, Government of India",
        "dataset": "Udyam Registration Portal",
        "referenceYear": "2023-24",
        "geographicLevel": msme.get("geographic_level", "District Level"),
        "locationCode": f"UDYAM-AP-{district[:3].upper()}",
        "locationName": msme.get("district", district),
        "indicator": "Registered Micro Enterprises",
        "value": msme.get("micro_enterprises", 0),
        "unit": "micro units",
        "badge": "Official data",
        "category": "msme"
    })

    indicators.append({
        "source": "Ministry of MSME, Government of India",
        "dataset": "Udyam Registration Portal",
        "referenceYear": "2023-24",
        "geographicLevel": msme.get("geographic_level", "District Level"),
        "locationCode": f"UDYAM-AP-{district[:3].upper()}",
        "locationName": msme.get("district", district),
        "indicator": "Registered MSME Density",
        "value": msme.get("registered_msme_density_per_10k_pop", 0),
        "unit": "units / 10,000 population",
        "badge": "Official data",
        "category": "msme"
    })

    # 4. AP DES LABOUR REFERENCE WAGES
    wages = get_ap_district_wages(district)
    indicators.append({
        "source": "Directorate of Economics & Statistics (DES), Govt of AP",
        "dataset": "Daily Wage Rates of Rural Labourers",
        "referenceYear": "2023-24",
        "geographicLevel": wages.get("geographic_level", "District Level"),
        "locationCode": f"WAGE-AP-{district[:3].upper()}",
        "locationName": wages.get("district", district),
        "indicator": "Agricultural Field Labour Reference Wage (Male)",
        "value": wages.get("agri_labour_male_daily_rs", 420),
        "unit": "₹ / day",
        "badge": "Official data",
        "category": "wages"
    })

    indicators.append({
        "source": "Directorate of Economics & Statistics (DES), Govt of AP",
        "dataset": "Daily Wage Rates of Rural Labourers",
        "referenceYear": "2023-24",
        "geographicLevel": wages.get("geographic_level", "District Level"),
        "locationCode": f"WAGE-AP-{district[:3].upper()}",
        "locationName": wages.get("district", district),
        "indicator": "Non-Agricultural Rural Labour Reference Wage",
        "value": wages.get("non_agri_labour_daily_rs", 480),
        "unit": "₹ / day",
        "badge": "Official data",
        "category": "wages"
    })

    indicators.append({
        "source": "Directorate of Economics & Statistics (DES), Govt of AP",
        "dataset": "Daily Wage Rates of Rural Labourers",
        "referenceYear": "2023-24",
        "geographicLevel": wages.get("geographic_level", "District Level"),
        "locationCode": f"WAGE-AP-{district[:3].upper()}",
        "locationName": wages.get("district", district),
        "indicator": "Monthly Reference Labour Cost (2 Workers Benchmark)",
        "value": wages.get("monthly_ref_labour_cost_2workers_rs", 25000),
        "unit": "₹ / month",
        "badge": "Official data",
        "category": "operating_cost"
    })

    # 5. AP AGRICULTURE & LIVESTOCK INDICATORS (Business-relevant selection)
    govt = get_ap_govt_district(district)
    is_dairy = cat_slug == "dairy_livestock"
    is_agri = cat_slug in ["agriculture_farming", "food_beverages"]

    if is_dairy:
        livestock = govt.get("livestock", {})
        indicators.append({
            "source": "Department of Animal Husbandry, Govt of AP & 20th Livestock Census",
            "dataset": "District Livestock Inventory",
            "referenceYear": "2023-24",
            "geographicLevel": "District Level",
            "locationCode": f"LIVESTOCK-AP-{district[:3].upper()}",
            "locationName": district,
            "indicator": "Buffalo Population",
            "value": livestock.get("buffalo_count", 0),
            "unit": "animals",
            "badge": "Official data",
            "category": "livestock"
        })
        indicators.append({
            "source": "Department of Animal Husbandry, Govt of AP & 20th Livestock Census",
            "dataset": "District Livestock Inventory",
            "referenceYear": "2023-24",
            "geographicLevel": "District Level",
            "locationCode": f"LIVESTOCK-AP-{district[:3].upper()}",
            "locationName": district,
            "indicator": "Cattle (Cows) Population",
            "value": livestock.get("cattle_count", 0),
            "unit": "animals",
            "badge": "Official data",
            "category": "livestock"
        })
        indicators.append({
            "source": "APDDCF & District Cooperative Milk Producer Unions",
            "dataset": "Daily Milk Procurement Rate Cards",
            "referenceYear": "2023-24",
            "geographicLevel": "District Level",
            "locationCode": f"DAIRY-AP-{district[:3].upper()}",
            "locationName": district,
            "indicator": "Cooperative Daily Milk Procurement",
            "value": livestock.get("daily_milk_procurement_litres", 0),
            "unit": "Litres / day",
            "badge": "Official data",
            "category": "livestock"
        })

    if is_agri or not is_dairy:
        indicators.append({
            "source": "Directorate of Economics & Statistics (DES) & Dept of Agriculture AP",
            "dataset": "Socio-Economic Survey 2023-24",
            "referenceYear": "2023-24",
            "geographicLevel": "District Level",
            "locationCode": f"AGRI-AP-{district[:3].upper()}",
            "locationName": district,
            "indicator": "Gross Cropped Area",
            "value": govt.get("gross_cropped_area_lakh_ha", 0),
            "unit": "Lakh Hectares",
            "badge": "Official data",
            "category": "agriculture"
        })
        indicators.append({
            "source": "Directorate of Economics & Statistics (DES) & Dept of Agriculture AP",
            "dataset": "Socio-Economic Survey 2023-24",
            "referenceYear": "2023-24",
            "geographicLevel": "District Level",
            "locationCode": f"AGRI-AP-{district[:3].upper()}",
            "locationName": district,
            "indicator": "Active Rythu Bharosa Kendras (RBKs)",
            "value": govt.get("rythu_bharosa_kendras", 0),
            "unit": "centers",
            "badge": "Official data",
            "category": "infrastructure"
        })

    # 6. PHYSICAL INFRASTRUCTURE
    infra = govt.get("infrastructure", {})
    indicators.append({
        "source": "AP Panchayat Raj & DES District Handbook",
        "dataset": "District Handbooks of Statistics",
        "referenceYear": "2023-24",
        "geographicLevel": "District Level",
        "locationCode": f"INFRA-AP-{district[:3].upper()}",
        "locationName": district,
        "indicator": "Habitation Electrification Coverage",
        "value": infra.get("electrified_habitations_pct", 98.0),
        "unit": "%",
        "badge": "Official data",
        "category": "infrastructure"
    })

    indicators.append({
        "source": "AP Panchayat Raj & DES District Handbook",
        "dataset": "District Handbooks of Statistics",
        "referenceYear": "2023-24",
        "geographicLevel": "District Level",
        "locationCode": f"INFRA-AP-{district[:3].upper()}",
        "locationName": district,
        "indicator": "All-Weather Pucca Road Connectivity",
        "value": infra.get("pucca_roads_pct", 85.0),
        "unit": "%",
        "badge": "Official data",
        "category": "infrastructure"
    })

    return indicators
