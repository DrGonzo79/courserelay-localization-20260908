from fastapi.testclient import TestClient
import pytest

from main import app

client = TestClient(app)
BASE = {
    "course_id": "excel-ops",
    "target_language": "Portuguese",
    "localized_price": 89,
    "monthly_sales": 100,
    "operator_share": 60,
    "production_cost": 12000,
}


def test_analysis_calculates_score_and_conserves_revenue():
    response = client.post("/opportunities/analyze", json=BASE)
    assert response.status_code == 200
    result = response.json()
    assert result["score"] == 90
    assert result["verdict"] == "Pilot"
    assert result["monthlyGross"] == 8900
    assert result["operatorRevenue"] + result["creatorRevenue"] == result["monthlyGross"]
    assert result["monthsToPayback"] == 2.2


def test_existing_translation_is_a_named_conflict():
    payload = {**BASE, "course_id": "food-photo", "target_language": "Spanish"}
    response = client.post("/opportunities/analyze", json=payload)
    assert response.status_code == 409
    assert response.json()["detail"] == "language_already_served"


def test_unknown_course_is_not_found():
    response = client.post("/opportunities/analyze", json={**BASE, "course_id": "missing"})
    assert response.status_code == 404
    assert response.json()["detail"] == "course_not_found"


@pytest.mark.parametrize("field,value", [
    ("localized_price", 9), ("monthly_sales", -1), ("operator_share", 101),
    ("production_cost", -1), ("target_language", "Klingon"), ("monthly_sales", True),
])
def test_invalid_inputs_are_rejected(field, value):
    assert client.post("/opportunities/analyze", json={**BASE, field: value}).status_code == 422


def test_zero_sales_has_no_fake_payback():
    result = client.post("/opportunities/analyze", json={**BASE, "monthly_sales": 0}).json()
    assert result["monthlyGross"] == 0
    assert result["monthsToPayback"] is None
    assert result["verdict"] == "Validate"


def test_catalog_and_health_use_shared_fixtures():
    assert len(client.get("/courses").json()) == 4
    assert client.get("/health").json() == {"status": "ok", "mode": "demo"}
