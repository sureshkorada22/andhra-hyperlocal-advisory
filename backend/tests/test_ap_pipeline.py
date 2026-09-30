import pytest
from app.services.location_service import is_within_ap_bounds, AP_LANDMARKS
from app.business.profiler import classify_business_idea, get_or_create_business_profile
from app.engines.opportunity_engine import calculate_opportunity_score
from app.services.data_provider import are_entities_duplicate
from app.engines.competitor_engine import analyze_competitors

def test_ap_bounding_box():
    # Inside AP: Visakhapatnam (17.7°N, 83.3°E)
    assert is_within_ap_bounds(17.7, 83.3) is True
    # Inside AP: Tirupati (13.6°N, 79.4°E)
    assert is_within_ap_bounds(13.6, 79.4) is True
    # Outside AP: Mumbai (19.07°N, 72.87°E)
    assert is_within_ap_bounds(19.07, 72.87) is False
    # Outside AP: London (51.5°N, -0.12°E)
    assert is_within_ap_bounds(51.5, -0.12) is False

def test_business_profiler_multilingual():
    # Telugu phrase: "Na village lo dairy business pettali"
    cat, name, conf = classify_business_idea("Na village lo dairy business pettali")
    assert cat == "dairy_livestock"
    assert conf >= 0.70

    # Hindi phrase: "मेरे गांव में किराना दुकान शुरू करनी है"
    cat_hi, name_hi, conf_hi = classify_business_idea("मेरे गांव में किराना दुकान शुरू करनी है")
    assert cat_hi == "retail"
    assert conf_hi >= 0.70

    # Custom English enterprise: "Solar panel cleaning and maintenance service"
    profile = get_or_create_business_profile("Solar panel cleaning and maintenance service")
    assert profile["category_slug"] == "environment_sustainability"
    assert "customer_segments" in profile
    assert len(profile["customer_segments"]) > 0

def test_opportunity_score_determinism():
    # Mock parameters
    demo = {"estimated_households": 2500}
    comps = {"direct_count": 2, "competitor_density": 0.4}
    access = {"accessibility_score": 82.0}
    gap = {"market_gap_grade": "High"}
    weather = {"seasonal_risk": "Normal"}

    res1 = calculate_opportunity_score(demo, comps, access, gap, weather, "dairy_livestock")
    res2 = calculate_opportunity_score(demo, comps, access, gap, weather, "dairy_livestock")

    # Score MUST be 100% deterministic (no random variation)
    assert res1["opportunity_score"] == res2["opportunity_score"]
    assert 10.0 <= res1["opportunity_score"] <= 100.0
    assert "disclaimer" in res1
    assert "guarantee" in res1["disclaimer"].lower()

def test_entity_deduplication():
    # Two entities with same normalized name and near coordinates
    e1 = {
        "name": "Sri Lakshmi Bakery",
        "latitude": 17.8920,
        "longitude": 83.3340
    }
    e2 = {
        "name": "Sri Lakshmi Bakery",
        "latitude": 17.8922,
        "longitude": 83.3342
    }
    # Within 30 meters with identical name -> duplicate
    assert are_entities_duplicate(e1, e2) is True

    # Different business far away
    e3 = {
        "name": "Sri Krishna Sweets",
        "latitude": 17.9200,
        "longitude": 83.4000
    }
    assert are_entities_duplicate(e1, e3) is False

def test_competitor_density_and_coverage():
    direct = [{"distance_km": 1.2, "name": "Coop Dairy"}]
    indirect = [{"distance_km": 3.4, "name": "Supermarket"}]
    res = analyze_competitors(direct, indirect, 10.0)

    assert res["direct_count"] == 1
    assert res["indirect_count"] == 1
    assert res["total_count"] == 2
    assert "relevant businesses identified in available data sources" in res["coverage_statement"]
    assert "only" not in res["coverage_statement"].lower()

def test_competitor_classification_relevance():
    from app.services.data_provider import classify_competitor

    rest_profile = get_or_create_business_profile("Restaurant", "food_beverages")

    # Real Restaurant POIs -> Direct
    kfc_poi = {"name": "KFC", "tags": {"amenity": "fast_food"}}
    hotel_poi = {"name": "Hotel Alpha", "tags": {"amenity": "restaurant"}}
    mess_poi = {"name": "Sri Krishna Mess", "tags": {"amenity": "restaurant"}}
    assert classify_competitor(kfc_poi, rest_profile) == "direct"
    assert classify_competitor(hotel_poi, rest_profile) == "direct"
    assert classify_competitor(mess_poi, rest_profile) == "direct"

    # Cafes / Bakeries -> Indirect
    cafe_poi = {"name": "Brew n Bubble Cafe", "tags": {"amenity": "cafe"}}
    bakery_poi = {"name": "Crown Bakery", "tags": {"shop": "bakery"}}
    assert classify_competitor(cafe_poi, rest_profile) == "indirect"
    assert classify_competitor(bakery_poi, rest_profile) == "indirect"

    # Unrelated businesses: DMart, More, Dairy, Mobile repair -> MUST BE UNRELATED
    dmart_poi = {"name": "DMart", "tags": {"shop": "supermarket"}}
    more_poi = {"name": "More Supermarket", "tags": {"shop": "supermarket"}}
    dairy_poi = {"name": "Suresh Dairy Enterprises", "tags": {"shop": "dairy"}}
    repair_poi = {"name": "Cell Clinic Mobile Repair", "tags": {"shop": "mobile_phone"}}

    assert classify_competitor(dmart_poi, rest_profile) == "unrelated"
    assert classify_competitor(more_poi, rest_profile) == "unrelated"
    assert classify_competitor(dairy_poi, rest_profile) == "unrelated"
    assert classify_competitor(repair_poi, rest_profile) == "unrelated"

