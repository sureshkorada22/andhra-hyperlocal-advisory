import logging
import math
import httpx
from typing import Dict, Any, List, Optional
from app.config import settings

logger = logging.getLogger(__name__)

def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculates true great-circle distance in kilometers between two geographic coordinates."""
    R = 6371.0  # Earth radius in kilometers
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (
        math.sin(dlat / 2.0) ** 2 +
        math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
        math.sin(dlon / 2.0) ** 2
    )
    c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))
    return round(R * c, 2)

def build_overpass_query(lat: float, lon: float, radius_meters: int, tags: List[str]) -> str:
    """
    Constructs an Overpass QL query string querying nodes and ways within radius.
    """
    clauses = []
    for tag in tags:
        if "=" in tag:
            k, v = tag.split("=", 1)
            clauses.append(f'node["{k}"="{v}"](around:{radius_meters},{lat},{lon});')
            clauses.append(f'way["{k}"="{v}"](around:{radius_meters},{lat},{lon});')
        else:
            clauses.append(f'node["{tag}"](around:{radius_meters},{lat},{lon});')
            clauses.append(f'way["{tag}"](around:{radius_meters},{lat},{lon});')

    all_clauses = "\n  ".join(clauses)
    return f"""
[out:json][timeout:10];
(
  {all_clauses}
);
out center 100;
"""

async def fetch_osm_pois(lat: float, lon: float, radius_km: float, search_tags: List[str]) -> List[Dict[str, Any]]:
    """
    Queries live Overpass API mirrors with failover to retrieve real POIs.
    """
    radius_meters = int(min(radius_km, 25.0) * 1000)
    query_str = build_overpass_query(lat, lon, radius_meters, search_tags)
    
    headers = {"User-Agent": "SIH2026-AndhraPradesh-Advisory/1.0"}

    for mirror_url in settings.OVERPASS_URLS[:3]:
        try:
            async with httpx.AsyncClient(timeout=4.5) as client:
                resp = await client.post(mirror_url, data={"data": query_str}, headers=headers)
                if resp.status_code == 200:
                    data = resp.json()
                    elements = data.get("elements", [])
                    results = []
                    for el in elements:
                        p_lat = el.get("lat") or el.get("center", {}).get("lat")
                        p_lon = el.get("lon") or el.get("center", {}).get("lon")
                        if p_lat is None or p_lon is None:
                            continue
                        
                        tags = el.get("tags", {})
                        name = tags.get("name") or tags.get("name:en") or tags.get("name:te")
                        if not name:
                            # Use category tag as name description if no explicit name tag
                            tag_desc = next((f"{k}: {v}" for k, v in tags.items() if k in ["shop", "amenity", "craft", "building"]), "Commercial Unit")
                            name = tag_desc.title()

                        dist = haversine_distance(lat, lon, p_lat, p_lon)
                        if dist <= radius_km:
                            results.append({
                                "osm_id": str(el.get("id")),
                                "name": name,
                                "latitude": p_lat,
                                "longitude": p_lon,
                                "distance_km": dist,
                                "tags": tags,
                                "source": "OpenStreetMap Overpass",
                                "verification_status": "Observed"
                            })
                    logger.info(f"Retrieved {len(results)} POIs from {mirror_url}")
                    return results
        except Exception as e:
            logger.warning(f"Failed to fetch POIs from mirror {mirror_url}: {e}")
            continue

    logger.warning("All Overpass mirrors timed out or failed; returning empty POI list.")
    return []
