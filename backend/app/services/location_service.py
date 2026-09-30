import re
import difflib
import logging
import httpx
from typing import Dict, Any, List, Optional
from app.config import settings
from app.data.ap_locations_registry import (
    AP_COMPREHENSIVE_LOCATIONS,
    POPULAR_AP_LOCATIONS,
    DISTRICT_HEADQUARTERS,
)

logger = logging.getLogger(__name__)

# Maintain AP_LANDMARKS for backward compatibility
AP_LANDMARKS = AP_COMPREHENSIVE_LOCATIONS


def is_within_ap_bounds(lat: float, lon: float) -> bool:
    """Verifies that latitude and longitude are strictly within Andhra Pradesh geographic bounds."""
    return (
        settings.AP_MIN_LAT <= lat <= settings.AP_MAX_LAT and
        settings.AP_MIN_LON <= lon <= settings.AP_MAX_LON
    )


def extract_ap_details_from_address(addr: Dict[str, Any], display_name: str) -> Dict[str, Any]:
    """Extracts village, mandal, district, postal code and state from Nominatim address dict."""
    state = addr.get("state", "Andhra Pradesh")
    country = addr.get("country", "India")

    district = (
        addr.get("state_district") or
        addr.get("county") or
        addr.get("district") or
        ""
    )
    mandal = (
        addr.get("subdistrict") or
        addr.get("municipality") or
        addr.get("taluk") or
        ""
    )
    village_town = (
        addr.get("village") or
        addr.get("town") or
        addr.get("city") or
        addr.get("suburb") or
        addr.get("hamlet") or
        ""
    )
    postal_code = addr.get("postcode", "")

    # Match district with known 26 AP districts
    matched_district = None
    for d in settings.AP_DISTRICTS:
        if d.lower() in district.lower() or d.lower() in display_name.lower():
            matched_district = d
            break
    if not matched_district and district:
        matched_district = district

    return {
        "state": state,
        "country": country,
        "district": matched_district or "Andhra Pradesh",
        "mandal": mandal,
        "village_or_town": village_town or display_name.split(",")[0],
        "postal_code": postal_code
    }


# Multilingual noise stopwords for Andhra Pradesh location queries
AP_LOCATION_NOISE = {
    "district", "dist", "mandal", "mndl", "mandalam", "town", "city",
    "village", "gramam", "rural", "urban", "junction", "jn", "road",
    "near", "in", "andhra", "pradesh", "ap", "india", "state", "centre", "center",
    "జిల్లా", "మండలం", "పట్టణం", "గ్రామం", "ఆంధ్రప్రదేశ్", "ఆంధ్ర", "ప్రదేశ్"
}


def normalize_ap_query(query: str):
    clean = query.strip().lower()
    clean_no_punct = re.sub(r'[^\w\s]', ' ', clean)
    tokens = clean_no_punct.split()
    core_tokens = [t for t in tokens if t not in AP_LOCATION_NOISE]
    core = " ".join(core_tokens) if core_tokens else clean
    return clean, core, tokens, core_tokens


def search_local_registry(query: str, limit: int = 10) -> List[Dict[str, Any]]:
    """
    Intelligent 5-tier fuzzy search over canonical Andhra Pradesh locations registry.
    Handles typos (e.g. Anakapalle, Guntoor, Karnul, Vishakapatnam), alternate spellings,
    Telugu script, mandal suffixes, and district-level filtering.
    """
    clean, core, tokens, core_tokens = normalize_ap_query(query)
    if not clean:
        return []

    # Detect if query explicitly mentions an AP district (e.g. "somewhere, guntur" or "atmakur nellore")
    target_district = None
    for d in settings.AP_DISTRICTS:
        d_lower = d.lower()
        if d_lower in clean or any(t == d_lower for t in tokens):
            target_district = d
            break

    tier1 = []  # Exact matches
    tier2 = []  # Prefix / Starts-with matches
    tier3 = []  # Substring & token matches
    tier4 = []  # Mandal or District matches
    tier5 = []  # Fuzzy spelling / typo matches (ratio >= 0.72)

    for item in AP_COMPREHENSIVE_LOCATIONS:
        town_en = item["village_or_town"].lower()
        town_te = item.get("name_te", "").lower()
        district = item.get("district", "").lower()
        mandal = item.get("mandal", "").lower()
        aliases = [a.lower() for a in item.get("aliases", [])]

        formatted_cand = {
            "resolved_name": f"{item['village_or_town']}, {item['district']} District, Andhra Pradesh",
            "village_or_town": item["village_or_town"],
            "name_te": item.get("name_te", item["village_or_town"]),
            "district": item["district"],
            "mandal": item.get("mandal", f"{item['village_or_town']} Mandal"),
            "postal_code": item.get("postal_code", ""),
            "latitude": item["latitude"],
            "longitude": item["longitude"],
            "state": "Andhra Pradesh",
            "country": "India",
            "provider": "AP Canonical Registry",
            "confidence": 1.0,
            "is_hq": item.get("is_hq", False),
            "is_popular": item.get("is_popular", False)
        }

        # Boost priority if matched target district
        district_match = target_district and (item["district"].lower() == target_district.lower())

        # Tier 1: Exact matches on clean or core
        if (core == town_en or clean == town_en or
            core in town_te or clean in town_te or
            core in aliases or clean in aliases):
            tier1.append((0 if district_match else 1, formatted_cand))
            continue

        # Tier 2: Starts with match
        if (town_en.startswith(core) or any(a.startswith(core) for a in aliases) or
            core.startswith(town_en)):
            tier2.append((0 if district_match else 1, formatted_cand))
            continue

        # Tier 3: Substring & Word Token Overlap
        if (core in town_en or town_en in core or any(core in a for a in aliases) or
            any(t in town_en for t in core_tokens if len(t) > 2)):
            tier3.append((0 if district_match else 1, formatted_cand))
            continue

        # Tier 4: Mandal or District match
        if core in mandal or core in district:
            tier4.append((0 if district_match else 1, formatted_cand))
            continue

        # Tier 5: Fuzzy Sequence Matcher (Typo tolerance)
        ratios = [difflib.SequenceMatcher(None, core, town_en).ratio()]
        for a in aliases:
            ratios.append(difflib.SequenceMatcher(None, core, a).ratio())
        max_r = max(ratios) if ratios else 0.0

        if max_r >= 0.72:
            tier5.append((max_r, 0 if district_match else 1, formatted_cand))

    # Sort each tier prioritizing district match, HQ, and popularity
    tier1.sort(key=lambda x: (x[0], not x[1]["is_hq"], not x[1]["is_popular"]))
    tier2.sort(key=lambda x: (x[0], not x[1]["is_hq"], not x[1]["is_popular"]))
    tier3.sort(key=lambda x: (x[0], not x[1]["is_hq"], not x[1]["is_popular"]))
    tier4.sort(key=lambda x: (x[0], not x[1]["is_hq"], not x[1]["is_popular"]))
    tier5.sort(key=lambda x: (-x[0], x[1], not x[2]["is_hq"], not x[2]["is_popular"]))

    combined = (
        [c[1] for c in tier1] +
        [c[1] for c in tier2] +
        [c[1] for c in tier3] +
        [c[1] for c in tier4] +
        [c[2] for c in tier5]
    )

    seen = set()
    result = []
    for cand in combined:
        key = (round(cand["latitude"], 3), round(cand["longitude"], 3))
        if key not in seen:
            seen.add(key)
            result.append(cand)
            if len(result) >= limit:
                break

    return result


OUT_OF_AP_MAJOR_PLACES = {
    "bangalore", "bengaluru", "hyderabad", "chennai", "madras", "delhi", "new delhi",
    "mumbai", "bombay", "kolkata", "calcutta", "pune", "kochi", "coimbatore",
    "karnataka", "telangana", "tamil nadu", "kerala", "maharashtra", "odisha", "orissa",
    "goa", "bhopal", "patna", "jaipur", "lucknow", "chandigarh", "ahmedabad", "surat"
}


async def geocode_ap_location(query: str) -> Dict[str, Any]:
    """
    Geocodes user location query strictly within Andhra Pradesh.
    Uses high-speed local canonical registry first, complemented with OpenStreetMap Nominatim.
    Always prioritizes exact Andhra Pradesh matches without false positives.
    """
    clean_query = query.strip()
    if not clean_query:
        return {
            "success": False,
            "is_ap": False,
            "error_message": "Please enter a village, town, mandal, or city name in Andhra Pradesh.",
            "candidates": []
        }

    clean_lower = clean_query.lower()
    # Check if query is explicitly an out-of-AP major city or state
    if clean_lower in OUT_OF_AP_MAJOR_PLACES or any(p == clean_lower for p in OUT_OF_AP_MAJOR_PLACES):
        return {
            "success": False,
            "is_ap": False,
            "error_message": "This application currently supports locations within Andhra Pradesh only.",
            "candidates": []
        }

    # 1. Search Canonical Local AP Registry (Ultra-fast & Exhaustive with Fuzzy)
    local_candidates = search_local_registry(clean_query, limit=5)

    has_exact_match = False
    if local_candidates:
        top_name = local_candidates[0]["village_or_town"].lower()
        if (clean_lower == top_name or
            top_name in clean_lower or
            clean_lower in top_name or
            local_candidates[0].get("confidence", 0) == 1.0):
            has_exact_match = True

    # 2. Query Nominatim for live external coverage (small rural hamlets/unlisted landmarks)
    nominatim_results = []
    headers = {"User-Agent": "SIH2026-AndhraPradesh-HyperLocal-Advisory/1.0"}
    
    # If not an exact local match or to supplement local options
    if not has_exact_match or len(local_candidates) < 2:
        try:
            params = {
                "q": f"{clean_query}, Andhra Pradesh, India",
                "format": "jsonv2",
                "addressdetails": 1,
                "limit": 5,
                "countrycodes": "in"
            }
            geo_timeout = 2.5 if local_candidates else 4.5
            async with httpx.AsyncClient(timeout=geo_timeout) as client:
                resp = await client.get(settings.NOMINATIM_URL, params=params, headers=headers)
                if resp.status_code == 200:
                    nominatim_results = resp.json()
        except Exception as e:
            logger.warning(f"Nominatim lookup note for '{clean_query}': {e}")

    # 3. Check for explicitly outside-AP locations if no local candidates matched
    if not local_candidates and not nominatim_results:
        try:
            async with httpx.AsyncClient(timeout=3.5) as client:
                resp = await client.get(
                    settings.NOMINATIM_URL,
                    params={"q": clean_query, "format": "jsonv2", "addressdetails": 1, "limit": 3},
                    headers=headers
                )
                if resp.status_code == 200:
                    external = resp.json()
                    if external:
                        first = external[0]
                        addr = first.get("address", {})
                        state = addr.get("state", "")
                        lat = float(first.get("lat", 0))
                        lon = float(first.get("lon", 0))

                        # If explicitly in another state or completely outside AP coordinates
                        if (state and "Andhra Pradesh" not in state) or not is_within_ap_bounds(lat, lon):
                            return {
                                "success": False,
                                "is_ap": False,
                                "error_message": "This application currently supports locations within Andhra Pradesh only.",
                                "candidates": []
                            }
        except Exception as e:
            logger.warning(f"External state check note: {e}")

    # 4. Process and Merge Candidates
    valid_ap_candidates = []
    seen_coords = set()

    for cand in local_candidates:
        coord_key = (round(cand["latitude"], 3), round(cand["longitude"], 3))
        if coord_key not in seen_coords:
            seen_coords.add(coord_key)
            c = dict(cand)
            c["source"] = "search"
            c["village"] = c.get("village_or_town", "")
            c["pincode"] = c.get("postal_code", "")
            valid_ap_candidates.append(c)

    for res in nominatim_results:
        try:
            lat = float(res.get("lat", 0))
            lon = float(res.get("lon", 0))
            display_name = res.get("display_name", "")
            addr = res.get("address", {})
            state = addr.get("state", "")

            # Strict AP filter
            if not is_within_ap_bounds(lat, lon):
                continue
            if state and "Andhra Pradesh" not in state:
                continue

            coord_key = (round(lat, 3), round(lon, 3))
            if coord_key in seen_coords:
                continue
            seen_coords.add(coord_key)

            details = extract_ap_details_from_address(addr, display_name)
            valid_ap_candidates.append({
                "resolved_name": display_name,
                "district": details["district"],
                "mandal": details["mandal"] or f"{details['village_or_town']} Mandal",
                "village_or_town": details["village_or_town"],
                "village": details["village_or_town"],
                "name_te": details["village_or_town"],
                "postal_code": details["postal_code"],
                "pincode": details["postal_code"],
                "latitude": lat,
                "longitude": lon,
                "state": "Andhra Pradesh",
                "country": "India",
                "provider": "OpenStreetMap Nominatim",
                "confidence": 0.95,
                "source": "search",
                "is_demo": False
            })
        except Exception as err:
            logger.warning(f"Candidate parsing note: {err}")

    if not valid_ap_candidates:
        return {
            "success": False,
            "is_ap": False,
            "error_message": "No matching Andhra Pradesh location found.",
            "candidates": []
        }

    is_ambiguous = len(valid_ap_candidates) > 1

    return {
        "success": True,
        "is_ap": True,
        "is_ambiguous": is_ambiguous,
        "candidates": valid_ap_candidates,
        "selected_location": valid_ap_candidates[0]
    }


async def reverse_geocode_ap_location(lat: float, lon: float) -> Dict[str, Any]:
    """
    Reverse geocodes latitude and longitude coordinates strictly within Andhra Pradesh.
    Returns standard LocationItem schema or error if outside AP bounds.
    """
    if not is_within_ap_bounds(lat, lon):
        return {
            "success": False,
            "is_ap": False,
            "error_message": "Coordinates are outside Andhra Pradesh. This application currently supports locations within Andhra Pradesh only.",
            "location": None
        }

    headers = {"User-Agent": "SIH2026-AndhraPradesh-HyperLocal-Advisory/1.0"}
    params = {
        "lat": lat,
        "lon": lon,
        "format": "jsonv2",
        "addressdetails": 1
    }

    try:
        async with httpx.AsyncClient(timeout=2.2) as client:
            resp = await client.get(settings.NOMINATIM_REVERSE_URL, params=params, headers=headers)
            if resp.status_code == 200:
                data = resp.json()
                display_name = data.get("display_name", "")
                addr = data.get("address", {})
                state = addr.get("state", "")

                if state and "Andhra Pradesh" not in state:
                    return {
                        "success": False,
                        "is_ap": False,
                        "error_message": f"Detected location is in {state} (outside Andhra Pradesh). This application currently supports locations within Andhra Pradesh only.",
                        "location": None
                    }

                details = extract_ap_details_from_address(addr, display_name)
                village_val = details["village_or_town"]
                mandal_val = details["mandal"]
                undetermined_note = None

                if not village_val or not mandal_val:
                    undetermined_note = "Exact mandal/village could not be determined from this location."

                location = {
                    "resolved_name": display_name or f"{village_val or 'Detected Location'}, {details['district']}, Andhra Pradesh",
                    "district": details["district"],
                    "mandal": mandal_val or "",
                    "village_or_town": village_val or "Exact mandal/village could not be determined from this location.",
                    "village": village_val or "",
                    "name_te": village_val or "ప్రత్యక్ష లొకేషన్",
                    "postal_code": details["postal_code"],
                    "pincode": details["postal_code"],
                    "latitude": lat,
                    "longitude": lon,
                    "state": "Andhra Pradesh",
                    "country": "India",
                    "provider": "GPS Live Detection (Nominatim)",
                    "confidence": 1.0,
                    "source": "live_gps",
                    "is_demo": False,
                    "undetermined_note": undetermined_note
                }
                return {
                    "success": True,
                    "is_ap": True,
                    "location": location
                }
    except Exception as e:
        logger.warning(f"Reverse geocode error for ({lat}, {lon}): {e}")

    # Fallback to finding closest location in authoritative AP registry
    from app.services.data_provider import haversine_distance
    closest = None
    min_dist = 999999.0
    for lm in AP_COMPREHENSIVE_LOCATIONS:
        d = haversine_distance(lat, lon, lm["latitude"], lm["longitude"])
        if d < min_dist:
            min_dist = d
            closest = lm

    if closest:
        dist_name = closest.get("district", "Andhra Pradesh")
        if min_dist <= 8.0:
            village_val = closest.get("village_or_town", "")
            mandal_val = closest.get("mandal", "")
            cand = dict(closest)
            cand["resolved_name"] = f"{village_val}, {mandal_val}, {dist_name} District, Andhra Pradesh"
            cand["village_or_town"] = village_val
            cand["village"] = village_val
            cand["mandal"] = mandal_val
            cand["district"] = dist_name
            cand["state"] = "Andhra Pradesh"
            cand["country"] = "India"
            cand["latitude"] = lat
            cand["longitude"] = lon
            cand["postal_code"] = closest.get("postal_code", "")
            cand["pincode"] = closest.get("postal_code", "")
            cand["provider"] = "GPS Live Detection (AP Registry Match)"
            cand["source"] = "live_gps"
            cand["is_demo"] = False
            return {
                "success": True,
                "is_ap": True,
                "location": cand
            }
        else:
            return {
                "success": True,
                "is_ap": True,
                "location": {
                    "resolved_name": f"Coordinates ({lat:.4f}°N, {lon:.4f}°E), {dist_name} District, Andhra Pradesh",
                    "district": dist_name,
                    "mandal": closest.get("mandal", ""),
                    "village_or_town": "Exact mandal/village could not be determined from this location.",
                    "village": "",
                    "name_te": "ప్రత్యక్ష లొకేషన్",
                    "postal_code": closest.get("postal_code", ""),
                    "pincode": closest.get("postal_code", ""),
                    "latitude": lat,
                    "longitude": lon,
                    "state": "Andhra Pradesh",
                    "country": "India",
                    "provider": "GPS Live Coordinates",
                    "confidence": 0.9,
                    "source": "live_gps",
                    "is_demo": False,
                    "undetermined_note": "Exact mandal/village could not be determined from this location."
                }
            }

    return {
        "success": False,
        "is_ap": False,
        "error_message": "Unable to detect your location. Please use manual selection or search.",
        "location": None
    }


def get_ap_districts_catalog() -> Dict[str, Any]:
    """Returns all 26 districts of Andhra Pradesh with major towns/mandals and popular presets."""
    districts_map: Dict[str, List[Dict[str, Any]]] = {d: [] for d in settings.AP_DISTRICTS}

    for loc in AP_COMPREHENSIVE_LOCATIONS:
        dist = loc["district"]
        if dist in districts_map:
            districts_map[dist].append({
                "village_or_town": loc["village_or_town"],
                "name_te": loc.get("name_te", loc["village_or_town"]),
                "mandal": loc.get("mandal", ""),
                "postal_code": loc.get("postal_code", ""),
                "latitude": loc["latitude"],
                "longitude": loc["longitude"],
                "is_hq": loc.get("is_hq", False)
            })

    return {
        "districts": settings.AP_DISTRICTS,
        "districts_data": districts_map,
        "popular_locations": POPULAR_AP_LOCATIONS
    }
