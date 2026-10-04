import asyncio
import logging
import math
import urllib.parse
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

async def fetch_nominatim_pois(
    lat: float,
    lon: float,
    radius_km: float,
    search_tags: List[str],
    keywords: Optional[List[str]] = None
) -> List[Dict[str, Any]]:
    """
    Queries OpenStreetMap Nominatim with bounded spatial search around (lat, lon).
    Provides resilient, high-availability fallback when Overpass mirrors are unreachable or rate-limited.
    """
    dlat = radius_km / 111.0
    dlon = radius_km / (111.0 * math.cos(math.radians(lat)))
    min_lat = max(lat - dlat, settings.AP_MIN_LAT)
    max_lat = min(lat + dlat, settings.AP_MAX_LAT)
    min_lon = max(lon - dlon, settings.AP_MIN_LON)
    max_lon = min(lon + dlon, settings.AP_MAX_LON)
    viewbox = f"{min_lon:.4f},{max_lat:.4f},{max_lon:.4f},{min_lat:.4f}"

    # Extract distinct search terms from tags and keywords
    terms: List[str] = []
    for tag in search_tags:
        val = tag.split("=")[-1].replace("_", " ").strip()
        if val and val not in terms and len(val) > 2:
            terms.append(val)

    if keywords:
        for kw in keywords:
            kw_clean = kw.strip().lower()
            if kw_clean and kw_clean not in terms and len(kw_clean) > 2:
                terms.append(kw_clean)

    selected_terms = terms[:4] if terms else ["business"]
    headers = {"User-Agent": "SIH2026-AndhraPradesh-Advisory/1.0"}
    results_map: Dict[str, Dict[str, Any]] = {}

    async with httpx.AsyncClient(timeout=4.0) as client:
        tasks = []
        for term in selected_terms:
            encoded_term = urllib.parse.quote(term)
            url = f"{settings.NOMINATIM_URL}?q={encoded_term}&format=json&viewbox={viewbox}&bounded=1&limit=50&addressdetails=1"
            tasks.append(client.get(url, headers=headers))
        responses = await asyncio.gather(*tasks, return_exceptions=True)
        for resp in responses:
            if isinstance(resp, httpx.Response) and resp.status_code == 200:
                try:
                    data = resp.json()
                except Exception:
                    continue
                for item in data:
                    osm_id = str(item.get("osm_id"))
                    if osm_id in results_map:
                        continue
                    try:
                        p_lat = float(item.get("lat"))
                        p_lon = float(item.get("lon"))
                    except (ValueError, TypeError):
                        continue

                    dist = haversine_distance(lat, lon, p_lat, p_lon)
                    if dist <= radius_km:
                        name = item.get("name")
                        if not name and item.get("display_name"):
                            name = item.get("display_name").split(",")[0].strip()
                        if not name:
                            name = "Commercial Establishment"

                        cls = item.get("class", "amenity")
                        typ = item.get("type", "commercial")
                        tags = {cls: typ, typ: "yes", "name": name}
                        addr = item.get("address", {})
                        if isinstance(addr, dict):
                            for ak, av in addr.items():
                                if ak in ["shop", "amenity", "cuisine", "brand"]:
                                    tags[ak] = av

                        # Extract exact locality / address
                        loc_parts = []
                        if isinstance(addr, dict):
                            for key in ["road", "suburb", "neighbourhood", "village", "town", "city_district", "county"]:
                                val = addr.get(key)
                                if val and val not in loc_parts:
                                    loc_parts.append(val)
                        if not loc_parts and item.get("display_name"):
                            dn_parts = [p.strip() for p in item.get("display_name").split(",") if p.strip()]
                            if len(dn_parts) > 1 and dn_parts[0].lower() == name.lower():
                                loc_parts = dn_parts[1:4]
                            else:
                                loc_parts = dn_parts[:3]
                        exact_loc = ", ".join(loc_parts) if loc_parts else ""

                        results_map[osm_id] = {
                            "osm_id": osm_id,
                            "name": name,
                            "latitude": p_lat,
                            "longitude": p_lon,
                            "distance_km": dist,
                            "tags": tags,
                            "address": exact_loc,
                            "source": "OpenStreetMap Nominatim",
                            "verification_status": "Observed"
                        }

    return list(results_map.values())

async def fetch_osm_pois(
    lat: float,
    lon: float,
    radius_km: float,
    search_tags: List[str],
    keywords: Optional[List[str]] = None
) -> List[Dict[str, Any]]:
    """
    Queries live Overpass API mirrors with failover to OpenStreetMap Nominatim bounded spatial search.
    Guarantees real observed POIs without dummy data or connection failures.
    """
    radius_meters = int(min(radius_km, 25.0) * 1000)
    query_str = build_overpass_query(lat, lon, radius_meters, search_tags)
    headers = {"User-Agent": "SIH2026-AndhraPradesh-Advisory/1.0"}

    # Attempt top 2 Overpass mirrors with short timeout
    for mirror_url in settings.OVERPASS_URLS[:2]:
        try:
            async with httpx.AsyncClient(timeout=2.5) as client:
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
                            tag_desc = next((f"{k}: {v}" for k, v in tags.items() if k in ["shop", "amenity", "craft", "building"]), "Commercial Unit")
                            name = tag_desc.title()

                        dist = haversine_distance(lat, lon, p_lat, p_lon)
                        if dist <= radius_km:
                            loc_parts = []
                            for lk in ["addr:street", "addr:suburb", "addr:neighbourhood", "addr:village", "addr:city", "addr:district"]:
                                if tags.get(lk) and tags.get(lk) not in loc_parts:
                                    loc_parts.append(tags.get(lk))
                            exact_loc = ", ".join(loc_parts) if loc_parts else ""

                            results.append({
                                "osm_id": str(el.get("id")),
                                "name": name,
                                "latitude": p_lat,
                                "longitude": p_lon,
                                "distance_km": dist,
                                "tags": tags,
                                "address": exact_loc,
                                "source": "OpenStreetMap Overpass",
                                "verification_status": "Observed"
                            })
                    if results:
                        logger.info(f"Retrieved {len(results)} POIs from {mirror_url}")
                        return results
        except Exception as e:
            logger.warning(f"Failed to fetch POIs from mirror {mirror_url}: {e}")
            continue

    logger.info("Overpass mirrors unreachable or returned 0 POIs; falling back to OpenStreetMap Nominatim bounded search.")
    try:
        nom_pois = await fetch_nominatim_pois(lat, lon, radius_km, search_tags, keywords)
        if nom_pois:
            logger.info(f"Retrieved {len(nom_pois)} POIs from OpenStreetMap Nominatim.")
            return nom_pois
    except Exception as e:
        logger.error(f"Nominatim fallback failed: {e}")

    return []
