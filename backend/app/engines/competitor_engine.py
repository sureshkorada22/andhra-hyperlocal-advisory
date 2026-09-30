import math
from typing import Dict, Any, List
from app.config import settings

def analyze_competitors(
    direct: List[Dict[str, Any]],
    indirect: List[Dict[str, Any]],
    radius_km: float
) -> Dict[str, Any]:
    """
    Computes deterministic competitor statistics:
      - Direct count, Indirect count, Total count
      - Area (π * r²) and Density (Total / Area)
      - Nearest competitor distance
      - Average competitor distance
      - Distance distribution bins (0-2km, 2-5km, 5-10km, 10-25km)
      - Category distribution
      - Honest small business detection message
    """
    area_sq_km = round(math.pi * (radius_km ** 2), 2)
    direct_count = len(direct)
    indirect_count = len(indirect)
    total_count = direct_count + indirect_count

    density = round(total_count / area_sq_km, 3) if area_sq_km > 0 else 0.0

    # Configurable density interpretation
    t = settings.DENSITY_THRESHOLDS
    if density <= t["low_max"]:
        density_label = "Low Competition Density"
    elif density <= t["moderate_max"]:
        density_label = "Moderate Competition Density"
    elif density <= t["high_max"]:
        density_label = "High Competition Density"
    else:
        density_label = "Very High Competition Density"

    all_comps = direct + indirect
    distances = [c["distance_km"] for c in all_comps]

    nearest_km = min(distances) if distances else None
    avg_km = round(sum(distances) / len(distances), 2) if distances else None

    # Distance Distribution Bins for Recharts
    bins = {
        "0 - 2 km": 0,
        "2 - 5 km": 0,
        "5 - 10 km": 0,
        "10+ km": 0
    }
    for d in distances:
        if d <= 2.0:
            bins["0 - 2 km"] += 1
        elif d <= 5.0:
            bins["2 - 5 km"] += 1
        elif d <= 10.0:
            bins["5 - 10 km"] += 1
        else:
            bins["10+ km"] += 1

    distance_distribution = [{"range": k, "count": v} for k, v in bins.items()]

    # Coverage Statement (Mandatory Honest Reporting)
    if total_count > 0:
        coverage_statement = f"{total_count} relevant businesses identified in available data sources."
    else:
        coverage_statement = "0 relevant businesses identified in available digital records within this radius."

    return {
        "direct_count": direct_count,
        "indirect_count": indirect_count,
        "total_count": total_count,
        "area_sq_km": area_sq_km,
        "competitor_density": density,
        "density_label": density_label,
        "nearest_competitor_km": nearest_km,
        "average_competitor_distance_km": avg_km,
        "distance_distribution": distance_distribution,
        "coverage_statement": coverage_statement,
        "direct_competitors": direct,
        "indirect_competitors": indirect,
        "methodology": "Geographic Haversine radius query with multi-source deduplication. Density = Competitors / Area (π * r²)."
    }
