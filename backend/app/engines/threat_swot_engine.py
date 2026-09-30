from typing import Dict, Any, List

def evaluate_threats_and_swot(
    business_name: str,
    category_slug: str,
    location_name: str,
    district: str,
    demographics: Dict[str, Any],
    competitor_stats: Dict[str, Any],
    accessibility_stats: Dict[str, Any],
    market_gap_stats: Dict[str, Any],
    weather_stats: Dict[str, Any],
    margin_capital: float = 100000.0
) -> Dict[str, Any]:
    """
    Generates data-backed, non-generic Threats (Low/Med/High with reasons), SWOT analysis,
    and Budget-Aware Feasibility assessment (Module 1 scope — no loans or EMIs).
    Grounds all statements in actual location, real demographics, competitor counts, and capital budget.
    """
    threats = []
    strengths = []
    weaknesses = []
    opportunities = []

    # Budget-aware classification & allocation guide
    cap_val = float(margin_capital or 100000.0)
    if cap_val < 75000:
        budget_feasibility = {
            "margin_capital": cap_val,
            "scale_classification": "Micro Scale",
            "recommended_allocation": {
                "fixed_setup_equipment_pct": 40,
                "initial_inventory_stock_pct": 35,
                "working_capital_buffer_pct": 25
            },
            "working_capital_runway": "30-45 Days Lean",
            "capital_assessment": "Lean initial budget with low fixed asset overhead and faster break-even timeline. Best focused on fast-moving daily essential lines."
        }
        strengths.append(f"Lean initial margin capital (₹{int(cap_val):,}) reduces fixed asset exposure and shortens the operating break-even horizon.")
        weaknesses.append("Lean working capital limits bulk purchase discounts; inventory must remain focused on rapid daily turnover.")
        threats.append({
            "title": "Working Capital Cushion",
            "level": "Medium",
            "category": "Capital Budget",
            "reason": f"With ₹{int(cap_val):,} starting budget, extended local customer credit or slow initial adoption could strain cash flow."
        })
    elif cap_val <= 175000:
        budget_feasibility = {
            "margin_capital": cap_val,
            "scale_classification": "Standard Scale",
            "recommended_allocation": {
                "fixed_setup_equipment_pct": 45,
                "initial_inventory_stock_pct": 35,
                "working_capital_buffer_pct": 20
            },
            "working_capital_runway": "60-90 Days Balanced",
            "capital_assessment": "Well-balanced rural starter budget for core tools, initial display inventory, and an operating safety reserve."
        }
        strengths.append(f"Balanced capital base (₹{int(cap_val):,}) enables quality equipment procurement with a steady 60-day operating buffer.")
        opportunities.append("Phased reinvestment of early operating surpluses into higher-margin auxiliary product varieties.")
    else:
        budget_feasibility = {
            "margin_capital": cap_val,
            "scale_classification": "Commercial Scale",
            "recommended_allocation": {
                "fixed_setup_equipment_pct": 50,
                "initial_inventory_stock_pct": 30,
                "working_capital_buffer_pct": 20
            },
            "working_capital_runway": "90+ Days Commercial",
            "capital_assessment": "Substantial commercial capability enabling mechanized processing, branded packaging, and wholesale mandi-level procurement."
        }
        strengths.append(f"Substantial margin capital (₹{int(cap_val):,}) enables bulk wholesale procurement discounts and commercial-grade tooling.")
        weaknesses.append("Higher initial capital deployment requires disciplined inventory tracking to avoid capital lock-in.")
        opportunities.append("Capacity to supply institutional village buyers, catering orders, and wider mandal shandy networks.")

    direct_count = competitor_stats.get("direct_count", 0)
    density = competitor_stats.get("competitor_density", 0.0)
    households = demographics.get("estimated_households", 1000)
    access_score = accessibility_stats.get("accessibility_score", 65.0)
    seasonal_risk = weather_stats.get("seasonal_risk", "Normal")

    # --- 1. Threat: Competition & Saturation ---
    if direct_count >= 8 or density > 3.0:
        threats.append({
            "title": "Local Competitor Saturation",
            "level": "High",
            "category": "Competition",
            "reason": f"With {direct_count} direct competitors detected within the search zone, pricing pressure and customer division are significant."
        })
        weaknesses.append(f"High local competitor density ({density} units/km²) requires substantial promotional spend or aggressive pricing to capture share.")
    elif direct_count >= 3:
        threats.append({
            "title": "Established Market Incumbents",
            "level": "Medium",
            "category": "Competition",
            "reason": f"{direct_count} direct competitors are already serving this radius; establishing customer loyalty will require distinct quality or delivery convenience."
        })
    else:
        threats.append({
            "title": "Unmapped Informal Village Competitors",
            "level": "Low",
            "category": "Data & Competition",
            "reason": f"Only {direct_count} competitors appear in digital records; however, small unmapped cottage or village sellers may exist."
        })
        strengths.append(f"Minimal direct digital competitor footprint in {location_name}, providing an early-mover advantage.")

    # --- 2. Threat: Demand / Customer Potential ---
    if households < 500:
        threats.append({
            "title": "Limited Immediate Catchment Population",
            "level": "High",
            "category": "Market Reach",
            "reason": f"Estimated local households (~{households:,}) within this boundary may limit daily recurring transaction volumes."
        })
        weaknesses.append(f"Restricted localized household reach in immediate village hamlet.")
    else:
        strengths.append(f"Robust addressable rural catchment base of approximately {households:,} households across surrounding habitations.")
        opportunities.append(f"Cross-selling bundled supplies and mobile door-to-door delivery across nearby habitations in {district}.")

    # --- 3. Threat: Accessibility & Road Connectivity ---
    if access_score < 50.0:
        threats.append({
            "title": "Logistics & Transport Inefficiencies",
            "level": "High",
            "category": "Infrastructure",
            "reason": f"Accessibility score is {access_score}/100; secondary feeder roads may lead to longer transit times for perishable stock or equipment."
        })
        weaknesses.append("Feeder road distance increases freight overheads for inventory restocking.")
    else:
        strengths.append(f"Strong accessibility score ({access_score}/100) along arterial road corridors enabling rapid customer and supplier transit.")

    # --- 4. Threat: Climate & Seasonal Risk ---
    if seasonal_risk != "Normal":
        threats.append({
            "title": f"Weather Sensitivity ({seasonal_risk})",
            "level": "Medium",
            "category": "Environment",
            "reason": f"Current weather monitoring indicates {seasonal_risk}, which requires dedicated storage or shelter management."
        })
        weaknesses.append(f"Vulnerability to seasonal weather peaks ({seasonal_risk}) requires temperature/drainage mitigation.")
    else:
        strengths.append(f"Current climatic conditions in {district} are favorable and stable for standard enterprise operations.")

    # --- Opportunities ---
    gap_grade = market_gap_stats.get("market_gap_grade", "Medium")
    if gap_grade == "High":
        opportunities.append(f"High local market gap allows {business_name} to capture first-choice standing among local households and institutions.")
    else:
        opportunities.append(f"Partnering with local weekly shandies (santalu) and Rythu Bharosa Kendras to expand wholesale reach.")

    opportunities.append(f"Leveraging digital payment (UPI / PhonePe) adoption across Andhra Pradesh villages to build transparent credit history.")

    # Ensure complete SWOT matrix
    swot = {
        "strengths": strengths[:4],
        "weaknesses": weaknesses[:4] or [f"Dependence on localized footfall in {location_name}."],
        "opportunities": opportunities[:4],
        "threats": [f"{t['title']}: {t['reason']}" for t in threats[:4]]
    }

    return {
        "threats": threats,
        "swot": swot,
        "budget_feasibility": budget_feasibility
    }
