from typing import Dict, Any

def evaluate_market_gap(
    estimated_households: int,
    direct_competitor_count: int,
    indirect_competitor_count: int,
    radius_km: float
) -> Dict[str, Any]:
    """
    Compares potential customer indicators (households) with existing relevant businesses.
    Outputs: High, Medium, Low with transparent reason.
    Adheres strictly to the rule: Zero detected competitors != guaranteed market gap.
    """
    total_competitors = direct_competitor_count + (0.4 * indirect_competitor_count)

    # Households per effective competitor ratio
    if total_competitors > 0:
        ratio = estimated_households / total_competitors
    else:
        ratio = estimated_households  # Unserved theoretical ratio

    # Classification logic
    if total_competitors == 0:
        # Transparently explain coverage limitation
        level = "Moderate to High (Data Coverage Caution)"
        gap_grade = "High"
        reason = (
            f"The selected {radius_km} km area has an estimated {estimated_households:,} households with zero direct "
            f"competitors identified in available digital records. While this suggests a strong market gap, unmapped "
            f"local village informal businesses may exist."
        )
    elif ratio >= 1200:
        gap_grade = "High"
        level = "High Market Gap"
        reason = (
            f"Strong customer potential of approximately {estimated_households:,} households supported by relatively few "
            f"identified direct competitors ({direct_competitor_count}), indicating substantial unmet local demand."
        )
    elif ratio >= 500:
        gap_grade = "Medium"
        level = "Moderate Market Gap"
        reason = (
            f"Healthy balance between estimated household demand ({estimated_households:,}) and existing supply "
            f"({direct_competitor_count} direct, {indirect_competitor_count} indirect competitors). Niche differentiation recommended."
        )
    else:
        gap_grade = "Low"
        level = "Low Market Gap"
        reason = (
            f"High competitor density relative to estimated households ({direct_competitor_count} direct competitors "
            f"for ~{estimated_households:,} households). Market in this radius shows signs of saturation."
        )

    return {
        "market_gap_grade": gap_grade,
        "market_gap_level": level,
        "reason": reason,
        "households_per_competitor_ratio": round(ratio, 1),
        "methodology": "Ratio analysis between estimated demographic household indicators and detected competitor counts."
    }
