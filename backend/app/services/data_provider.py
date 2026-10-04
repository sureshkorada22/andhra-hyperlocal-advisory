import re
import math
from typing import Dict, Any, List, Tuple
from app.services.poi_service import fetch_osm_pois, haversine_distance
from app.db.database import SessionLocal
from app.db.models import BusinessSubmission

def normalize_name(name: str) -> str:
    """Normalizes business name for entity resolution."""
    name = name.lower()
    name = re.sub(r"[^\w\s]", "", name)
    # Remove common filler words
    for w in ["sri", "shri", "enterprises", "shop", "store", "point", "centre", "center"]:
        name = re.sub(rf"\b{w}\b", "", name)
    return " ".join(name.split())

def are_entities_duplicate(e1: Dict[str, Any], e2: Dict[str, Any]) -> bool:
    """
    Checks if two business entities from different sources represent the same business.
    Uses geographic distance threshold (< 50 meters) and string similarity.
    """
    dist = haversine_distance(e1["latitude"], e1["longitude"], e2["latitude"], e2["longitude"])
    if dist > 0.1:  # More than 100 meters apart -> distinct
        return False

    n1 = normalize_name(e1["name"])
    n2 = normalize_name(e2["name"])

    if not n1 or not n2:
        return dist < 0.03  # Within 30 meters

    if n1 == n2 or n1 in n2 or n2 in n1:
        return True

    return False

def classify_competitor(poi: Dict[str, Any], profile: Dict[str, Any]) -> str:
    """
    Separates businesses into:
      - Direct Competitors: Businesses offering essentially the same product/service.
      - Indirect Competitors: Businesses satisfying a similar customer need or close substitute in the same domain.
      - Unrelated: Businesses from different sectors (e.g., dairy or supermarket when searching restaurant).
    """
    tags = poi.get("tags", {})
    name_lower = poi.get("name", "").lower()

    # 1. Strict Exclusions: If POI matches excluded terms or tags, it is UNRELATED
    exclude_keywords = profile.get("exclude_keywords", [])
    for ex in exclude_keywords:
        if re.search(rf"\b{re.escape(ex)}\b", name_lower):
            return "unrelated"

    exclude_tags = profile.get("exclude_osm_tags", [])
    for xtag in exclude_tags:
        if "=" in xtag:
            k, v = xtag.split("=", 1)
            if tags.get(k) == v:
                return "unrelated"
        elif xtag in tags:
            return "unrelated"

    # 2. Check Direct OSM Tags
    direct_tags = profile.get("direct_osm_tags", [])
    for dtag in direct_tags:
        if "=" in dtag:
            k, v = dtag.split("=", 1)
            if tags.get(k) == v:
                return "direct"
        elif dtag in tags:
            return "direct"

    # 3. Check Competitor Keywords in Business Name
    for kw in profile.get("competitor_keywords", []):
        if re.search(rf"\b{re.escape(kw)}\b", name_lower):
            return "direct"

    # 4. Check Indirect OSM Tags
    indirect_tags = profile.get("indirect_osm_tags", [])
    for itag in indirect_tags:
        if "=" in itag:
            k, v = itag.split("=", 1)
            if tags.get(k) == v:
                return "indirect"
        elif itag in tags:
            return "indirect"

    # 5. Check Indirect Keywords in Business Name
    for ikw in profile.get("indirect_keywords", []):
        if re.search(rf"\b{re.escape(ikw)}\b", name_lower):
            return "indirect"

    # 6. Check Supporting Infrastructure Tags
    supporting_tags = profile.get("supporting_poi_tags", [])
    for stag in supporting_tags:
        if "=" in stag:
            k, v = stag.split("=", 1)
            if tags.get(k) == v:
                return "supporting"
        elif stag in tags:
            return "supporting"

    # 7. Unmatched POIs from other sectors are considered UNRELATED
    return "unrelated"

async def collect_and_normalize_businesses(
    lat: float,
    lon: float,
    radius_km: float,
    profile: Dict[str, Any]
) -> Tuple[List[Dict[str, Any]], List[Dict[str, Any]], List[Dict[str, Any]]]:
    """
    Aggregates POIs from OSM Overpass, AP Local Records, and Verified Community Submissions.
    Deduplicates across sources (entity resolution).
    Returns (direct_competitors, indirect_competitors, supporting_facilities).
    """
    # 1. Search tags for OSM Overpass / Nominatim
    search_tags = profile.get("direct_osm_tags", []) + profile.get("indirect_osm_tags", [])
    if not search_tags:
        search_tags = ["shop=convenience", "amenity=marketplace"]

    keywords = profile.get("competitor_keywords", []) + profile.get("search_keywords", [])
    osm_pois = await fetch_osm_pois(lat, lon, radius_km, search_tags, keywords=keywords)

    # 2. Fetch community submissions from local DB within radius
    db_submissions = []
    try:
        db = SessionLocal()
        deg_lat = radius_km / 111.0
        deg_lon = radius_km / (111.0 * math.cos(math.radians(lat)))
        subs = db.query(BusinessSubmission).filter(
            BusinessSubmission.status.in_(["Verified", "Suggested"]),
            BusinessSubmission.latitude.between(lat - deg_lat, lat + deg_lat),
            BusinessSubmission.longitude.between(lon - deg_lon, lon + deg_lon)
        ).all()
        for s in subs:
            dist = haversine_distance(lat, lon, s.latitude, s.longitude)
            if dist <= radius_km:
                candidate = {
                    "name": s.business_name,
                    "latitude": s.latitude,
                    "longitude": s.longitude,
                    "distance_km": dist,
                    "tags": {"shop": s.category},
                    "source": f"Local Contribution ({s.status})",
                    "verification_status": s.status
                }
                # Only include community submission if it relates to current business
                if classify_competitor(candidate, profile) in ["direct", "indirect"]:
                    db_submissions.append(candidate)
        db.close()
    except Exception:
        pass

    # 3. Combine raw entities
    raw_entities = osm_pois + db_submissions

    # 4. Entity Resolution / Deduplication
    unique_entities: List[Dict[str, Any]] = []
    for entity in raw_entities:
        # Validate coordinates & radius membership
        if not (12.6 <= entity["latitude"] <= 19.9 and 76.7 <= entity["longitude"] <= 84.8):
            continue
        if entity["distance_km"] > radius_km:
            continue

        duplicate_found = False
        for u in unique_entities:
            if are_entities_duplicate(entity, u):
                duplicate_found = True
                # Merge provenance
                if entity["source"] not in u["source"]:
                    u["source"] = f"{u['source']} + {entity['source']}"
                break

        if not duplicate_found:
            unique_entities.append(entity)

    # 5. Classify into Direct vs Indirect vs Supporting (Unrelated discarded)
    direct_competitors = []
    indirect_competitors = []
    supporting_facilities = []

    for item in unique_entities:
        classification = classify_competitor(item, profile)
        item["classification"] = classification
        if classification == "direct":
            direct_competitors.append(item)
        elif classification == "indirect":
            indirect_competitors.append(item)
        elif classification == "supporting":
            supporting_facilities.append(item)

    # Sort competitors by distance ascending
    direct_competitors.sort(key=lambda x: x["distance_km"])
    indirect_competitors.sort(key=lambda x: x["distance_km"])

    return direct_competitors, indirect_competitors, supporting_facilities
