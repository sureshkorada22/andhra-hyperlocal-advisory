import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root():
    resp = client.get("/")
    assert resp.status_code == 200
    data = resp.json()
    assert "Andhra Pradesh" in data["geographic_scope"]

def test_categories():
    resp = client.get("/api/categories")
    assert resp.status_code == 200
    cats = resp.json()["categories"]
    assert len(cats) >= 11

def test_sources():
    resp = client.get("/api/sources")
    assert resp.status_code == 200
    sources = resp.json()["sources"]
    assert len(sources) >= 4

def test_understand_business():
    # Telugu phrase
    resp = client.post("/api/business/understand", json={"business_text": "Na village lo dairy business pettali"})
    assert resp.status_code == 200
    body = resp.json()
    assert body["profile"]["category_slug"] == "dairy_livestock"

def test_geocode_outside_ap():
    # Location outside AP
    resp = client.post("/api/location/geocode", json={"query": "Pune, Maharashtra"})
    assert resp.status_code == 200
    body = resp.json()
    assert body["is_ap"] is False
    assert "Andhra Pradesh" in body["error_message"]

def test_analyze_demo():
    payload = {
        "location": {
            "resolved_name": "Lakshmipuram, Visakhapatnam District, Andhra Pradesh",
            "village_or_town": "Lakshmipuram",
            "district": "Visakhapatnam",
            "latitude": 17.8924,
            "longitude": 83.3341,
            "state": "Andhra Pradesh"
        },
        "business": {
            "business_name": "Dairy Farm",
            "category_slug": "dairy_livestock"
        },
        "radius_km": 10.0,
        "language": "te"
    }
    resp = client.post("/api/analyze", json=payload)
    assert resp.status_code == 200
    data = resp.json()
    # Check Section 41 response schema
    assert "business" in data
    assert "location" in data
    assert "radius" in data
    assert "market_reach" in data
    assert "competitors" in data
    assert "accessibility" in data
    assert "market_gap" in data
    assert "price_indicators" in data
    assert "opportunity_score" in data
    assert "threats" in data
    assert "swot" in data
    assert "data_confidence" in data
    assert "sources" in data
    assert "ai_explanation" in data

def test_reverse_geocode_inside_ap():
    # Gajuwaka, Visakhapatnam coordinates
    resp = client.post("/api/location/reverse-geocode", json={"latitude": 17.6814, "longitude": 83.2130})
    assert resp.status_code == 200
    data = resp.json()
    assert data["is_ap"] is True
    assert data["success"] is True
    assert "Visakhapatnam" in data["location"]["district"] or "Visakhapatnam" in data["location"]["resolved_name"]

def test_reverse_geocode_outside_ap():
    # Pune coordinates (outside AP)
    resp = client.post("/api/location/reverse-geocode", json={"latitude": 18.5204, "longitude": 73.8567})
    assert resp.status_code == 200
    data = resp.json()
    assert data["is_ap"] is False
    assert data["success"] is False
    assert "outside Andhra Pradesh" in data["error_message"]
