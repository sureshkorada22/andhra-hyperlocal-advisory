import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.data.ap_locations_registry import get_location_hierarchy
from app.data.ap_census_data import get_ap_census_hierarchical
from app.services.ap_data_service import get_ap_sector_indicators
from app.data.normalized_repository import build_normalized_indicators

client = TestClient(app)

def test_location_hierarchy_structure():
    """Verify all 26 AP districts are represented in administrative hierarchy."""
    hierarchy = get_location_hierarchy()
    assert hierarchy["state"] == "Andhra Pradesh"
    assert hierarchy["total_districts"] == 26
    assert len(hierarchy["districts"]) == 26

    dist_names = [d["district"] for d in hierarchy["districts"]]
    assert "Visakhapatnam" in dist_names
    assert "Vizianagaram" in dist_names
    assert "Srikakulam" in dist_names
    assert "Guntur" in dist_names
    assert "Sri Sathya Sai" in dist_names

def test_hierarchy_endpoint():
    """Verify GET /api/location/hierarchy endpoint."""
    res = client.get("/api/location/hierarchy")
    assert res.status_code == 200
    data = res.json()
    assert data["state"] == "Andhra Pradesh"
    assert len(data["districts"]) == 26

def test_census_hierarchical_fallback():
    """Test Village -> Mandal -> District hierarchical fallback."""
    # 1. Exact Village match with official Census code (Bheemunipatnam: 802951)
    rec1 = get_ap_census_hierarchical("Bheemunipatnam", "Bheemunipatnam", "Visakhapatnam")
    assert rec1["geographic_level"] == "Village Level"
    assert rec1["location_code"] in ["802951", "586123"]
    assert rec1["badge"] == "Official data"
    assert rec1["reference_year"] == "2011"
    assert rec1["population"] == 54860

    # 2. Mandal fallback (Unknown village in Bhogapuram Mandal)
    rec2 = get_ap_census_hierarchical("UnknownRemoteHamlet", "Bhogapuram", "Vizianagaram")
    assert "District" in rec2["geographic_level"] or "Mandal" in rec2["geographic_level"]
    assert rec2["reference_year"] == "2011"
    assert rec2["badge"] in ["Official data", "Estimated"]

    # 3. District fallback (Unknown village & unknown mandal in Srikakulam)
    rec3 = get_ap_census_hierarchical("UnknownSpot", "UnknownMandal", "Srikakulam")
    assert "District" in rec3["geographic_level"]
    assert rec3["district"] == "Srikakulam"
    assert rec3["population"] == 2703114
    assert rec3["reference_year"] == "2011"

def test_visakhapatnam_analysis_5km():
    """Test Visakhapatnam region village with 5 km radius and Dairy category."""
    payload = {
        "location": {
            "resolved_name": "Anandapuram, Visakhapatnam, Andhra Pradesh",
            "village_or_town": "Anandapuram",
            "mandal": "Anandapuram",
            "district": "Visakhapatnam",
            "state": "Andhra Pradesh",
            "country": "India",
            "latitude": 17.9100,
            "longitude": 83.3700,
            "confidence": 1.0
        },
        "business": {
            "name": "Dairy Farm",
            "category_slug": "dairy_livestock"
        },
        "radius_km": 5,
        "language": "en",
        "margin_capital": 100000,
        "is_demo": False
    }
    res = client.post("/api/analyze", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["radius"]["radius_km"] == 5
    assert data["data_mode"] == "REAL GOVERNMENT DATA"
    assert "local_snapshot" in data
    assert data["local_snapshot"]["reference_year"] == "2011"
    assert "business_landscape" in data
    assert data["business_landscape"]["registered_msmes_district"] > 0
    assert "operating_cost_indicators" in data
    assert "data_quality_coverage" in data
    assert len(data["data_quality_coverage"]) >= 5

def test_vizianagaram_analysis_10km():
    """Test Vizianagaram region village with 10 km radius and Retail category."""
    payload = {
        "location": {
            "resolved_name": "Bhogapuram, Vizianagaram, Andhra Pradesh",
            "village_or_town": "Bhogapuram",
            "mandal": "Bhogapuram",
            "district": "Vizianagaram",
            "state": "Andhra Pradesh",
            "country": "India",
            "latitude": 18.0260,
            "longitude": 83.4920,
            "confidence": 1.0
        },
        "business": {
            "name": "General Provision Store",
            "category_slug": "retail"
        },
        "radius_km": 10,
        "language": "te",
        "margin_capital": 150000,
        "is_demo": False
    }
    res = client.post("/api/analyze", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["radius"]["radius_km"] == 10
    assert data["data_mode"] == "REAL GOVERNMENT DATA"
    assert data["location"]["district"] == "Vizianagaram"
    assert data["operating_cost_indicators"]["reference_daily_wage_agri"] > 0

def test_srikakulam_analysis_5km():
    """Test Srikakulam region village with 5 km radius and Food Processing."""
    payload = {
        "location": {
            "resolved_name": "Amadalavalasa, Srikakulam, Andhra Pradesh",
            "village_or_town": "Amadalavalasa",
            "mandal": "Amadalavalasa",
            "district": "Srikakulam",
            "state": "Andhra Pradesh",
            "country": "India",
            "latitude": 18.4167,
            "longitude": 83.9000,
            "confidence": 1.0
        },
        "business": {
            "name": "Millets Processing and Flour Milling",
            "category_slug": "food_beverages"
        },
        "radius_km": 5,
        "language": "en",
        "margin_capital": 200000,
        "is_demo": False
    }
    res = client.post("/api/analyze", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["location"]["district"] == "Srikakulam"
    assert data["local_snapshot"]["population"] > 0
    assert len(data["price_indicators"]) > 0

def test_another_ap_district_guntur_10km():
    """Test another AP district (Guntur - Mangalagiri) with 10 km radius."""
    payload = {
        "location": {
            "resolved_name": "Mangalagiri, Guntur District, Andhra Pradesh",
            "village_or_town": "Mangalagiri",
            "mandal": "Mangalagiri",
            "district": "Guntur",
            "state": "Andhra Pradesh",
            "country": "India",
            "latitude": 16.4300,
            "longitude": 80.5700,
            "confidence": 1.0
        },
        "business": {
            "name": "Handloom Textile & Tailoring Unit",
            "category_slug": "services"
        },
        "radius_km": 10,
        "language": "hi",
        "margin_capital": 100000,
        "is_demo": False
    }
    res = client.post("/api/analyze", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["location"]["district"] == "Guntur"
    assert data["business_landscape"]["registered_msmes_district"] > 0

def test_custom_unknown_business_category():
    """Test custom/unrecognized business idea gracefully handles generic indicators."""
    payload = {
        "location": {
            "resolved_name": "Paderu, Alluri Sitharama Raju, Andhra Pradesh",
            "village_or_town": "Paderu",
            "mandal": "Paderu",
            "district": "Alluri Sitharama Raju",
            "state": "Andhra Pradesh",
            "country": "India",
            "latitude": 18.0833,
            "longitude": 82.6667,
            "confidence": 1.0
        },
        "business": {
            "name": "Custom Drone Servicing for Organic Coffee Hills"
        },
        "radius_km": 5,
        "language": "en",
        "margin_capital": 100000,
        "is_demo": False
    }
    res = client.post("/api/analyze", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["opportunity_score"]["opportunity_score"] > 0
    assert "local_snapshot" in data
    assert "operating_cost_indicators" in data

def test_missing_and_invalid_inputs_no_crash():
    """Test edge cases: missing fields, empty strings, invalid coordinates."""
    # 1. Missing business name - should handle gracefully
    res1 = client.post("/api/analyze", json={
        "location": {
            "resolved_name": "Tirupati, Andhra Pradesh",
            "district": "Tirupati",
            "latitude": 13.6288,
            "longitude": 79.4192
        },
        "business": {},
        "radius_km": 5
    })
    assert res1.status_code == 200
    assert res1.json()["opportunity_score"]["opportunity_score"] > 0

    # 2. Location outside AP should fail validation cleanly (400) without 500 crash
    res2 = client.post("/api/analyze", json={
        "location": {
            "resolved_name": "Mumbai, Maharashtra",
            "latitude": 19.0760,
            "longitude": 72.8777
        },
        "business": {"name": "Grocery Store"},
        "radius_km": 10
    })
    assert res2.status_code == 400
    assert "Andhra Pradesh" in res2.json()["detail"]


def test_missing_coordinates_rejection():
    """Verify analyze endpoint rejects missing coordinates instead of defaulting to Visakhapatnam."""
    res = client.post("/api/analyze", json={
        "location": {
            "resolved_name": "Unknown spot, Andhra Pradesh"
        },
        "business": {"name": "Dairy Farm"},
        "radius_km": 5
    })
    assert res.status_code == 400
    assert "Coordinates unavailable" in res.json()["detail"]


def test_search_and_reverse_geocode_standardized_location():
    """Verify search and reverse geocode return valid standardized AP location items."""
    # 1. Search for Gajuwaka
    resp1 = client.post("/api/location/geocode", json={"query": "Gajuwaka"})
    assert resp1.status_code == 200
    data1 = resp1.json()
    assert data1["is_ap"] is True
    assert len(data1["candidates"]) > 0
    top1 = data1["candidates"][0]
    assert top1["source"] == "search"
    assert "Gajuwaka" in top1["village_or_town"]
    assert top1["state"] == "Andhra Pradesh"

    # 2. Search for Anakapalle
    resp2 = client.post("/api/location/geocode", json={"query": "Anakapalle"})
    assert resp2.status_code == 200
    data2 = resp2.json()
    assert data2["is_ap"] is True
    top2 = data2["candidates"][0]
    assert "Anakapalli" in top2["district"] or "Anakapalle" in top2["resolved_name"]

    # 3. Live GPS reverse geocoding
    resp3 = client.post("/api/location/reverse-geocode", json={"latitude": 17.6814, "longitude": 83.2130})
    assert resp3.status_code == 200
    data3 = resp3.json()
    assert data3["is_ap"] is True
    loc3 = data3["location"]
    assert loc3["source"] == "live_gps"
    assert loc3["state"] == "Andhra Pradesh"

