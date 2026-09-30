import os
from typing import List, Dict
from dotenv import load_dotenv

load_dotenv()

class Settings:
    ENV: str = os.getenv("ENVIRONMENT", "development")
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", 8000))
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./andhra_hyperlocal.db")
    
    NOMINATIM_URL: str = os.getenv("NOMINATIM_URL", "https://nominatim.openstreetmap.org/search")
    NOMINATIM_REVERSE_URL: str = os.getenv("NOMINATIM_REVERSE_URL", "https://nominatim.openstreetmap.org/reverse")
    OVERPASS_URLS: List[str] = [
        u.strip() for u in os.getenv(
            "OVERPASS_URLS",
            "https://overpass-api.de/api/interpreter,https://lz4.overpass-api.de/api/interpreter,https://overpass.kumi.systems/api/interpreter,https://maps.mail.ru/osm/tools/overpass/api/interpreter"
        ).split(",") if u.strip()
    ]
    OPEN_METEO_URL: str = os.getenv("OPEN_METEO_URL", "https://api.open-meteo.com/v1/forecast")

    # Andhra Pradesh Geographical Boundaries
    AP_MIN_LAT: float = float(os.getenv("AP_MIN_LAT", 12.6))
    AP_MAX_LAT: float = float(os.getenv("AP_MAX_LAT", 19.9))
    AP_MIN_LON: float = float(os.getenv("AP_MIN_LON", 76.7))
    AP_MAX_LON: float = float(os.getenv("AP_MAX_LON", 84.8))

    # All 26 Districts of Andhra Pradesh
    AP_DISTRICTS: List[str] = [
        "Alluri Sitharama Raju",
        "Anakapalli",
        "Ananthapuramu",
        "Annamayya",
        "Bapatla",
        "Chittoor",
        "Dr. B.R. Ambedkar Konaseema",
        "East Godavari",
        "Eluru",
        "Guntur",
        "Kakinada",
        "Krishna",
        "Kurnool",
        "Nandyal",
        "NTR",
        "Palnadu",
        "Parvathipuram Manyam",
        "Prakasam",
        "Srikakulam",
        "Sri Potti Sriramulu Nellore",
        "Sri Sathya Sai",
        "Tirupati",
        "Visakhapatnam",
        "Vizianagaram",
        "West Godavari",
        "YSR Kadapa"
    ]

    # Deterministic Opportunity Score Weights (Configurable)
    # Customer Potential: 25%, Market Gap: 20%, Competition: 20%, Accessibility: 15%, Supporting Infrastructure: 10%, Demand Indicators: 10%
    DEFAULT_WEIGHTS: Dict[str, float] = {
        "customer_potential": 0.25,
        "market_gap": 0.20,
        "competition": 0.20,
        "accessibility": 0.15,
        "supporting_infrastructure": 0.10,
        "demand_indicators": 0.10
    }

    # Density Interpretation Thresholds (Competitors / sq km)
    # Configurable heuristics:
    # 0–2 → Low, 3–5 → Moderate, 6–10 → High, 11+ → Very High
    DENSITY_THRESHOLDS: Dict[str, float] = {
        "low_max": 2.0,
        "moderate_max": 5.0,
        "high_max": 10.0
    }

    CACHE_TTL_SECONDS: int = 3600  # 1 hour cache for POIs and Demographics

settings = Settings()
