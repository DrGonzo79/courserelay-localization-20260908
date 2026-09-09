import json
import os
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, Field

app = FastAPI(title="CourseRelay API", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.environ.get("ALLOWED_ORIGINS", "http://localhost:3000").split(","),
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)
courses = json.loads((Path(__file__).resolve().parent.parent / "data/courses.json").read_text())


class OpportunityRequest(BaseModel):
    model_config = ConfigDict(strict=True, extra="forbid")
    course_id: str = Field(min_length=1, max_length=80)
    target_language: str = Field(pattern="^(Spanish|Portuguese|French)$")
    localized_price: int = Field(ge=10, le=500)
    monthly_sales: int = Field(ge=0, le=100000)
    operator_share: int = Field(ge=0, le=100)
    production_cost: int = Field(ge=0, le=1000000)


@app.get("/health")
def health():
    return {"status": "ok", "mode": "demo"}


@app.get("/courses")
def list_courses():
    return courses


@app.post("/opportunities/analyze")
def analyze(request: OpportunityRequest):
    course = next((item for item in courses if item["id"] == request.course_id), None)
    if course is None:
        raise HTTPException(status_code=404, detail="course_not_found")
    if request.target_language in course["languages"]:
        raise HTTPException(status_code=409, detail="language_already_served")

    gross = request.localized_price * request.monthly_sales
    operator_revenue = gross * request.operator_share // 100
    months_to_payback = None if operator_revenue == 0 else round(request.production_cost / operator_revenue, 1)
    base = course["targets"][request.target_language]
    review_signal = min(course["reviews"] / 50, 100)
    rating_signal = max(0, (course["rating"] - 4) * 100)
    score = round(base * 0.75 + review_signal * 0.15 + rating_signal * 0.1)
    verdict = "Pilot" if score >= 78 and (months_to_payback is not None and months_to_payback <= 4) else "Validate"
    return {
        "courseId": course["id"],
        "score": score,
        "verdict": verdict,
        "monthlyGross": gross,
        "operatorRevenue": operator_revenue,
        "creatorRevenue": gross - operator_revenue,
        "monthsToPayback": months_to_payback,
        "disclaimer": "Illustrative demo model; verify rights, demand, taxes, refunds, and partner terms.",
    }
