from typing import Dict, Any, List, Optional
import math

# SIH 2026 Problem Statement SIH26091 — Central Scheme Configuration
SCHEME_CONFIG = {
    "MICRO_FINANCE": {
        "id": "micro_finance",
        "name_en": "Micro Finance Scheme",
        "name_te": "మైక్రో ఫైనాన్స్ పథకం",
        "name_hi": "माइक्रो फाइनेंस योजना",
        "project_cost_min": 0.0,
        "project_cost_max": 140000.0,  # Up to ₹1.40 lakh
        "loan_percentage": 0.90,       # Up to 90% of project cost
        "max_loan": 125000.0,          # ₹1.25 lakh
        "interest_rate_pa": 0.065,     # 6.5% p.a.
        "tenure_years": 3,             # 3 years
        "moratorium_months": 3,        # 3 months
        "range_label": "Up to ₹1.40 Lakh",
        "loan_support_label": "Up to 90%",
    },
    "TERM_LOAN": {
        "id": "term_loan",
        "name_en": "Term Loan Scheme",
        "name_te": "టర్మ్ లోన్ పథకం",
        "name_hi": "टर्म लोन योजना",
        "project_cost_min": 140000.01,
        "project_cost_max": 5000000.0, # Above ₹1.40 lakh to ₹50 lakh
        "loan_percentage": 0.90,       # Up to 90% of project cost
        "max_loan": 4500000.0,         # ₹45 lakh
        "interest_rate_pa": 0.08,      # 8% p.a.
        "tenure_years": 7,             # 7 years
        "moratorium_months": 6,        # 6 months
        "range_label": "Above ₹1.40 Lakh to ₹50 Lakh",
        "loan_support_label": "Up to 90%",
    }
}

SCHEME_MAX_LIMIT = 5000000.0  # ₹50 Lakh hard ceiling for SIH schemes


def calculate_reducing_balance_installment(
    principal: float,
    annual_rate: float,
    tenure_years: int,
    installments_per_year: int = 12
) -> float:
    """
    Standard reducing-balance installment calculation.
    E = P * r * (1 + r)^n / ((1 + r)^n - 1)
    """
    if principal <= 0 or tenure_years <= 0 or installments_per_year <= 0:
        return 0.0
    r = annual_rate / installments_per_year
    n = tenure_years * installments_per_year
    if r == 0:
        return round(principal / n, 2)
    factor = math.pow(1 + r, n)
    installment = principal * (r * factor) / (factor - 1)
    return round(installment, 2)


def generate_repayment_schedule(
    loan_amount: float,
    interest_rate_pa: float,
    tenure_years: int,
    moratorium_months: int,
    frequency: str = "quarterly"  # "monthly" or "quarterly"
) -> List[Dict[str, Any]]:
    """
    Generates indicative reducing-balance repayment schedule with moratorium accounting.
    During the moratorium period, normal principal amortization is paused.
    """
    if loan_amount <= 0:
        return []

    installments_per_year = 4 if frequency == "quarterly" else 12
    period_label = "Quarter" if frequency == "quarterly" else "Month"
    periods_in_moratorium = (
        math.ceil(moratorium_months / 3) if frequency == "quarterly" else moratorium_months
    )
    total_repayment_periods = tenure_years * installments_per_year

    r = interest_rate_pa / installments_per_year
    regular_installment = calculate_reducing_balance_installment(
        loan_amount, interest_rate_pa, tenure_years, installments_per_year
    )

    schedule = []
    balance = loan_amount

    # 1. Moratorium Periods
    for m in range(1, periods_in_moratorium + 1):
        schedule.append({
            "period": m,
            "period_label": f"{period_label} {m} (Moratorium)",
            "is_moratorium": True,
            "opening_balance": round(balance, 2),
            "repayment_amount": 0.0,
            "principal_component": 0.0,
            "interest_component": 0.0,
            "closing_balance": round(balance, 2),
            "notes": "Moratorium grace period — no regular principal repayment due."
        })

    # 2. Regular Repayment Periods
    for i in range(1, total_repayment_periods + 1):
        interest = round(balance * r, 2)
        if i == total_repayment_periods:
            # Final period cleans up rounding
            principal_comp = round(balance, 2)
            payment = round(principal_comp + interest, 2)
            balance = 0.0
        else:
            payment = regular_installment
            principal_comp = round(payment - interest, 2)
            balance = max(0.0, round(balance - principal_comp, 2))

        schedule.append({
            "period": periods_in_moratorium + i,
            "period_label": f"{period_label} {periods_in_moratorium + i}",
            "is_moratorium": False,
            "opening_balance": round(schedule[-1]["closing_balance"], 2),
            "repayment_amount": round(payment, 2),
            "principal_component": round(principal_comp, 2),
            "interest_component": round(interest, 2),
            "closing_balance": round(balance, 2),
            "notes": "Regular reducing-balance installment"
        })

    return schedule


def calculate_financial_roadmap(margin_capital: float) -> Dict[str, Any]:
    """
    Deterministic SIH 2026 Module 2 Financial Calculator and Scheme Router.
    Rule:
      Available Margin Capital = 10% of Total Project Cost
      Total Project Cost = Margin / 0.10
      Maximum Loan Amount = 90% of Total Project Cost (capped at Scheme Max Loan)
    """
    # Safe validation
    if margin_capital is None:
        margin_capital = 0.0
    try:
        margin = float(margin_capital)
    except (ValueError, TypeError):
        margin = 0.0

    if margin < 0:
        margin = 0.0

    # Core SIH Formula
    total_project_cost = round(margin / 0.10, 2)
    raw_loan_amount = round(total_project_cost * 0.90, 2)

    # Route Scheme
    if total_project_cost <= 0:
        return {
            "is_valid": False,
            "error_message": "Please enter a valid margin capital greater than ₹0.",
            "available_margin": 0.0,
            "total_project_cost": 0.0,
            "maximum_loan": 0.0,
            "scheme": None,
            "exceeds_limit": False,
        }

    if total_project_cost > SCHEME_MAX_LIMIT:
        return {
            "is_valid": True,
            "exceeds_limit": True,
            "available_margin": margin,
            "total_project_cost": total_project_cost,
            "maximum_loan": raw_loan_amount,
            "scheme": None,
            "scheme_id": None,
            "limit_warning": (
                "Your calculated project cost is above ₹50 lakh, which is outside the project-cost range "
                "specified for the schemes in this problem statement."
            ),
            "limit_guidance": (
                "Please consider reducing the proposed project scale or verify applicable financing options "
                "with the concerned agency."
            ),
            "own_contribution_pct": 10.0,
            "loan_portion_pct": 90.0,
        }

    # Scheme Routing
    if total_project_cost <= SCHEME_CONFIG["MICRO_FINANCE"]["project_cost_max"]:
        scheme = dict(SCHEME_CONFIG["MICRO_FINANCE"])
    else:
        scheme = dict(SCHEME_CONFIG["TERM_LOAN"])

    # Cap maximum loan to scheme defined maximum loan
    capped_loan = min(raw_loan_amount, scheme["max_loan"])

    # Calculate Indicative Repayments
    indicative_monthly_emi = calculate_reducing_balance_installment(
        principal=capped_loan,
        annual_rate=scheme["interest_rate_pa"],
        tenure_years=scheme["tenure_years"],
        installments_per_year=12
    )

    indicative_quarterly_installment = calculate_reducing_balance_installment(
        principal=capped_loan,
        annual_rate=scheme["interest_rate_pa"],
        tenure_years=scheme["tenure_years"],
        installments_per_year=4
    )

    return {
        "is_valid": True,
        "exceeds_limit": False,
        "available_margin": margin,
        "total_project_cost": total_project_cost,
        "maximum_loan": capped_loan,
        "raw_calculated_loan": raw_loan_amount,
        "is_loan_capped": capped_loan < raw_loan_amount,
        "own_contribution_pct": 10.0,
        "loan_portion_pct": 90.0,
        "scheme": scheme,
        "scheme_id": scheme["id"],
        "scheme_name": scheme["name_en"],
        "interest_rate_pa": scheme["interest_rate_pa"],
        "interest_rate_pct": scheme["interest_rate_pa"] * 100,
        "tenure_years": scheme["tenure_years"],
        "moratorium_months": scheme["moratorium_months"],
        "indicative_monthly_emi": indicative_monthly_emi,
        "indicative_quarterly_installment": indicative_quarterly_installment,
        "disclaimer": (
            "Indicative repayment estimate based on reducing balance method. "
            "Actual repayment terms may be determined by the concerned financing agency."
        ),
        "source_transparency": (
            "Scheme parameters derived from SIH 2026 Problem Statement SIH26091 "
            "(Micro Finance Scheme & Term Loan Scheme). Please verify with the State Channelizing "
            "Agency (SCA) or financing authority before application."
        )
    }
