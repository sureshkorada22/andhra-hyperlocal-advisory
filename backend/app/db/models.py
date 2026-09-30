import datetime
from sqlalchemy import (
    Column, Integer, String, Float, Boolean, Text, DateTime, ForeignKey, JSON
)
from sqlalchemy.orm import relationship
from app.db.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=True)
    phone_or_email = Column(String(255), nullable=True)
    preferred_language = Column(String(50), default="te")  # te, hi, en
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    analysis_requests = relationship("AnalysisRequest", back_populates="user")
    submissions = relationship("BusinessSubmission", back_populates="user")


class Location(Base):
    __tablename__ = "locations"

    id = Column(Integer, primary_key=True, index=True)
    query_text = Column(String(500), nullable=False)
    resolved_name = Column(String(500), nullable=False)
    state = Column(String(100), default="Andhra Pradesh")
    district = Column(String(100), nullable=True)
    mandal = Column(String(100), nullable=True)
    village_or_town = Column(String(200), nullable=True)
    postal_code = Column(String(20), nullable=True)
    latitude = Column(Float, nullable=False, index=True)
    longitude = Column(Float, nullable=False, index=True)
    provider = Column(String(100), default="OpenStreetMap")
    confidence = Column(Float, default=1.0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    analysis_requests = relationship("AnalysisRequest", back_populates="location")


class BusinessCategory(Base):
    __tablename__ = "business_categories"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(100), unique=True, index=True)
    name_en = Column(String(200), nullable=False)
    name_te = Column(String(200), nullable=False)
    name_hi = Column(String(200), nullable=False)
    icon = Column(String(50), nullable=True)
    description = Column(Text, nullable=True)

    ideas = relationship("BusinessIdea", back_populates="category")


class BusinessIdea(Base):
    __tablename__ = "business_ideas"

    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(Integer, ForeignKey("business_categories.id"))
    slug = Column(String(100), unique=True, index=True)
    name_en = Column(String(200), nullable=False)
    name_te = Column(String(200), nullable=False)
    name_hi = Column(String(200), nullable=False)
    sub_category = Column(String(100), nullable=True)
    is_custom = Column(Boolean, default=False)

    category = relationship("BusinessCategory", back_populates="ideas")
    profile = relationship("BusinessProfile", back_populates="idea", uselist=False)


class BusinessProfile(Base):
    __tablename__ = "business_profiles"

    id = Column(Integer, primary_key=True, index=True)
    idea_id = Column(Integer, ForeignKey("business_ideas.id"), nullable=True)
    business_name = Column(String(255), nullable=False)
    category_slug = Column(String(100), nullable=False)
    search_keywords = Column(JSON, default=list)
    competitor_keywords = Column(JSON, default=list)
    direct_osm_tags = Column(JSON, default=list)
    indirect_osm_tags = Column(JSON, default=list)
    supporting_poi_tags = Column(JSON, default=list)
    customer_segments = Column(JSON, default=list)
    supplier_categories = Column(JSON, default=list)
    infrastructure_requirements = Column(JSON, default=list)
    relevant_demographics = Column(JSON, default=list)
    relevant_environmental_factors = Column(JSON, default=list)
    relevant_risk_factors = Column(JSON, default=list)
    relevant_price_indicators = Column(JSON, default=list)
    relevant_accessibility_factors = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    idea = relationship("BusinessIdea", back_populates="profile")


class AnalysisRequest(Base):
    __tablename__ = "analysis_requests"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    location_id = Column(Integer, ForeignKey("locations.id"), nullable=False)
    business_name = Column(String(255), nullable=False)
    category_slug = Column(String(100), nullable=False)
    radius_km = Column(Float, default=10.0)
    language = Column(String(20), default="te")
    status = Column(String(50), default="completed")  # pending, completed, failed
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="analysis_requests")
    location = relationship("Location", back_populates="analysis_requests")
    competitors = relationship("Competitor", back_populates="analysis")
    opportunity_score = relationship("OpportunityScore", back_populates="analysis", uselist=False)
    risk_results = relationship("RiskResult", back_populates="analysis")
    swot_results = relationship("SwotResult", back_populates="analysis")


class Place(Base):
    __tablename__ = "places"

    id = Column(Integer, primary_key=True, index=True)
    osm_id = Column(String(100), nullable=True, index=True)
    name = Column(String(300), nullable=False)
    category = Column(String(100), nullable=False)
    sub_category = Column(String(100), nullable=True)
    latitude = Column(Float, nullable=False, index=True)
    longitude = Column(Float, nullable=False, index=True)
    address = Column(Text, nullable=True)
    source = Column(String(100), default="OpenStreetMap")
    is_verified = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)


class Competitor(Base):
    __tablename__ = "competitors"

    id = Column(Integer, primary_key=True, index=True)
    analysis_id = Column(Integer, ForeignKey("analysis_requests.id"), nullable=False)
    place_id = Column(Integer, ForeignKey("places.id"), nullable=True)
    name = Column(String(300), nullable=False)
    category = Column(String(100), nullable=False)
    classification = Column(String(50), nullable=False)  # direct, indirect
    distance_km = Column(Float, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    address = Column(Text, nullable=True)
    source = Column(String(100), default="OpenStreetMap")
    verification_status = Column(String(50), default="Observed")  # Observed, Verified, Suggested

    analysis = relationship("AnalysisRequest", back_populates="competitors")


class Demographics(Base):
    __tablename__ = "demographics"

    id = Column(Integer, primary_key=True, index=True)
    location_id = Column(Integer, ForeignKey("locations.id"), nullable=True)
    district = Column(String(100), nullable=True)
    mandal = Column(String(100), nullable=True)
    estimated_population = Column(Integer, nullable=True)
    estimated_households = Column(Integer, nullable=True)
    settlement_type = Column(String(100), default="village")  # village, town, city
    density_per_sq_km = Column(Float, nullable=True)
    data_source = Column(String(100), default="AP Census / OSM")
    data_status = Column(String(50), default="Estimated")  # Verified, Estimated, Unavailable


class MarketIndicator(Base):
    __tablename__ = "market_indicators"

    id = Column(Integer, primary_key=True, index=True)
    analysis_id = Column(Integer, ForeignKey("analysis_requests.id"), nullable=True)
    indicator_name = Column(String(200), nullable=False)
    indicator_value = Column(String(255), nullable=False)
    status = Column(String(50), default="Observed")  # Verified, Estimated, Unavailable
    source = Column(String(100), nullable=False)
    details = Column(JSON, default=dict)


class PriceIndicator(Base):
    __tablename__ = "price_indicators"

    id = Column(Integer, primary_key=True, index=True)
    item_name = Column(String(200), nullable=False)
    category = Column(String(100), nullable=False)
    price_range = Column(String(100), nullable=False)
    unit = Column(String(50), nullable=False)
    status = Column(String(50), default="Observed")  # Verified / Observed, Estimated, Unavailable
    source = Column(String(200), nullable=False)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow)


class InfrastructureIndicator(Base):
    __tablename__ = "infrastructure_indicators"

    id = Column(Integer, primary_key=True, index=True)
    analysis_id = Column(Integer, ForeignKey("analysis_requests.id"), nullable=True)
    highway_proximity_km = Column(Float, nullable=True)
    major_roads_count = Column(Integer, default=0)
    transit_access_score = Column(Float, default=50.0)
    power_water_suitability = Column(String(100), default="Moderate")
    commercial_cluster_density = Column(String(50), default="Medium")
    status = Column(String(50), default="Observed")


class WeatherIndicator(Base):
    __tablename__ = "weather_indicators"

    id = Column(Integer, primary_key=True, index=True)
    analysis_id = Column(Integer, ForeignKey("analysis_requests.id"), nullable=True)
    avg_temp_c = Column(Float, nullable=True)
    precipitation_mm = Column(Float, nullable=True)
    seasonal_risk = Column(String(100), default="Normal")
    climate_suitability = Column(String(100), default="Favorable")
    source = Column(String(100), default="Open-Meteo")


class OpportunityScore(Base):
    __tablename__ = "opportunity_scores"

    id = Column(Integer, primary_key=True, index=True)
    analysis_id = Column(Integer, ForeignKey("analysis_requests.id"), nullable=False)
    overall_score = Column(Float, nullable=False)  # 0 to 100
    customer_potential_score = Column(Float, nullable=False)
    market_gap_score = Column(Float, nullable=False)
    competition_score = Column(Float, nullable=False)
    accessibility_score = Column(Float, nullable=False)
    infrastructure_score = Column(Float, nullable=False)
    demand_score = Column(Float, nullable=False)
    market_gap_level = Column(String(50), default="Medium")  # High, Medium, Low
    opportunity_label = Column(String(100), default="Promising")
    formula_explanation = Column(Text, nullable=True)

    analysis = relationship("AnalysisRequest", back_populates="opportunity_score")


class RiskResult(Base):
    __tablename__ = "risk_results"

    id = Column(Integer, primary_key=True, index=True)
    analysis_id = Column(Integer, ForeignKey("analysis_requests.id"), nullable=False)
    threat_title = Column(String(255), nullable=False)
    threat_level = Column(String(50), nullable=False)  # High, Medium, Low
    reason = Column(Text, nullable=False)
    category = Column(String(100), nullable=False)

    analysis = relationship("AnalysisRequest", back_populates="risk_results")


class SwotResult(Base):
    __tablename__ = "swot_results"

    id = Column(Integer, primary_key=True, index=True)
    analysis_id = Column(Integer, ForeignKey("analysis_requests.id"), nullable=False)
    item_type = Column(String(20), nullable=False)  # strength, weakness, opportunity, threat
    text = Column(Text, nullable=False)
    evidence_source = Column(String(200), nullable=True)

    analysis = relationship("AnalysisRequest", back_populates="swot_results")


class DataSource(Base):
    __tablename__ = "data_sources"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    category = Column(String(100), nullable=False)
    status = Column(String(50), default="Observed")  # Observed, Estimated, Unavailable
    method = Column(String(200), nullable=False)
    confidence = Column(String(50), default="Medium")  # High, Medium, Low
    last_collected = Column(DateTime, default=datetime.datetime.utcnow)
    limitations = Column(Text, nullable=True)


class BusinessSubmission(Base):
    __tablename__ = "business_submissions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    business_name = Column(String(300), nullable=False)
    category = Column(String(100), nullable=False)
    location_text = Column(String(500), nullable=False)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    address = Column(Text, nullable=True)
    supporting_info = Column(Text, nullable=True)
    status = Column(String(50), default="Suggested")  # Suggested, Pending Verification, Verified, Rejected
    submitted_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="submissions")
    verifications = relationship("VerificationRecord", back_populates="submission")


class VerificationRecord(Base):
    __tablename__ = "verification_records"

    id = Column(Integer, primary_key=True, index=True)
    submission_id = Column(Integer, ForeignKey("business_submissions.id"), nullable=False)
    verified_by = Column(String(200), nullable=True)
    status = Column(String(50), default="Pending")  # Verified, Rejected, In Review
    notes = Column(Text, nullable=True)
    verified_at = Column(DateTime, default=datetime.datetime.utcnow)

    submission = relationship("BusinessSubmission", back_populates="verifications")
