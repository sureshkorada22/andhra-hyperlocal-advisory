import pytest
from app.engines.financial_engine import (
    calculate_financial_roadmap,
    generate_repayment_schedule,
    calculate_reducing_balance_installment,
    SCHEME_CONFIG,
    SCHEME_MAX_LIMIT
)

def test_case_1_micro_finance():
    """Case 1: Margin = ₹10,000 -> Project Cost = ₹1,00,000 -> Micro Finance Scheme"""
    res = calculate_financial_roadmap(10000)
    assert res["is_valid"] is True
    assert res["exceeds_limit"] is False
    assert res["total_project_cost"] == 100000.0
    assert res["maximum_loan"] == 90000.0
    assert res["scheme_id"] == "micro_finance"
    assert res["interest_rate_pct"] == 6.5
    assert res["tenure_years"] == 3
    assert res["moratorium_months"] == 3


def test_case_2_boundary_micro_finance():
    """Case 2: Margin = ₹14,000 -> Project Cost = ₹1,40,000 -> Micro Finance Scheme boundary"""
    res = calculate_financial_roadmap(14000)
    assert res["is_valid"] is True
    assert res["exceeds_limit"] is False
    assert res["total_project_cost"] == 140000.0
    assert res["maximum_loan"] == 125000.0 or res["maximum_loan"] == 126000.0  # 90% is 1.26L, capped at 1.25L max loan!
    assert res["maximum_loan"] == 125000.0  # Respects Micro Finance ₹1.25 Lakh cap
    assert res["scheme_id"] == "micro_finance"


def test_case_3_term_loan_entry():
    """Case 3: Margin = ₹20,000 -> Project Cost = ₹2,00,000 -> Term Loan Scheme"""
    res = calculate_financial_roadmap(20000)
    assert res["is_valid"] is True
    assert res["exceeds_limit"] is False
    assert res["total_project_cost"] == 200000.0
    assert res["maximum_loan"] == 180000.0
    assert res["scheme_id"] == "term_loan"
    assert res["interest_rate_pct"] == 8.0
    assert res["tenure_years"] == 7
    assert res["moratorium_months"] == 6


def test_case_4_term_loan_standard():
    """Case 4: Margin = ₹1,00,000 -> Project Cost = ₹10,00,000 -> Term Loan Scheme -> Loan = ₹9,00,000"""
    res = calculate_financial_roadmap(100000)
    assert res["is_valid"] is True
    assert res["exceeds_limit"] is False
    assert res["total_project_cost"] == 1000000.0
    assert res["maximum_loan"] == 900000.0
    assert res["scheme_id"] == "term_loan"
    assert res["indicative_monthly_emi"] > 0
    assert res["indicative_quarterly_installment"] > 0


def test_case_5_term_loan_upper_boundary():
    """Case 5: Margin = ₹5,00,000 -> Project Cost = ₹50,00,000 -> Term Loan Scheme -> Cap at ₹45 Lakh"""
    res = calculate_financial_roadmap(500000)
    assert res["is_valid"] is True
    assert res["exceeds_limit"] is False
    assert res["total_project_cost"] == 5000000.0
    assert res["maximum_loan"] == 4500000.0  # 90% of 50L is 45L, which equals max loan cap
    assert res["scheme_id"] == "term_loan"


def test_case_6_exceeds_scheme_limit():
    """Case 6: Margin > ₹5,00,000 -> Project Cost > ₹50 lakh -> Do NOT route automatically"""
    res = calculate_financial_roadmap(600000)
    assert res["is_valid"] is True
    assert res["exceeds_limit"] is True
    assert res["total_project_cost"] == 6000000.0
    assert res["scheme"] is None
    assert "outside the project-cost range" in res["limit_warning"]
    assert "reducing the proposed project scale" in res["limit_guidance"]


def test_boundary_and_invalid_inputs():
    """Boundary & error test cases: ₹0, negative values, None, strings, decimals, large numbers"""
    res_zero = calculate_financial_roadmap(0)
    assert res_zero["is_valid"] is False

    res_neg = calculate_financial_roadmap(-50000)
    assert res_neg["is_valid"] is False

    res_none = calculate_financial_roadmap(None)
    assert res_none["is_valid"] is False

    res_empty = calculate_financial_roadmap("")
    assert res_empty["is_valid"] is False

    res_invalid_str = calculate_financial_roadmap("invalid_amount")
    assert res_invalid_str["is_valid"] is False

    # Decimal values
    res_decimal = calculate_financial_roadmap(10000.50)
    assert res_decimal["is_valid"] is True
    assert res_decimal["total_project_cost"] == 100005.0

    # Very large values
    res_large = calculate_financial_roadmap(10000000) # 1 Crore margin
    assert res_large["is_valid"] is True
    assert res_large["exceeds_limit"] is True
    assert res_large["total_project_cost"] == 100000000.0 # 10 Crore
    assert res_large["scheme"] is None


def test_repayment_schedule():
    """Repayment schedule generation test with moratorium"""
    schedule_q = generate_repayment_schedule(
        loan_amount=900000.0,
        interest_rate_pa=0.08,
        tenure_years=7,
        moratorium_months=6,
        frequency="quarterly"
    )
    assert len(schedule_q) == 2 + (7 * 4)  # 2 moratorium quarters + 28 regular quarters
    # Check moratorium quarters
    assert schedule_q[0]["is_moratorium"] is True
    assert schedule_q[0]["repayment_amount"] == 0.0
    assert schedule_q[1]["is_moratorium"] is True
    assert schedule_q[1]["repayment_amount"] == 0.0
    # Check regular repayment starts after moratorium
    assert schedule_q[2]["is_moratorium"] is False
    assert schedule_q[2]["repayment_amount"] > 0.0
    # Check final period brings balance to 0
    assert schedule_q[-1]["closing_balance"] == 0.0
