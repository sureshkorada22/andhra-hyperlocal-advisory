import logging
import httpx
from typing import Dict, Any
from app.config import settings

logger = logging.getLogger(__name__)

async def fetch_ap_weather(lat: float, lon: float) -> Dict[str, Any]:
    """
    Retrieves live meteorological indicators from Open-Meteo for the AP coordinate.
    Used for weather-sensitive businesses (Dairy, Agriculture, Poultry, Solar).
    """
    params = {
        "latitude": round(lat, 4),
        "longitude": round(lon, 4),
        "current": ["temperature_2m", "relative_humidity_2m", "precipitation", "wind_speed_10m"],
        "daily": ["temperature_2m_max", "temperature_2m_min", "precipitation_sum"],
        "timezone": "Asia/Kolkata",
        "forecast_days": 1
    }

    try:
        async with httpx.AsyncClient(timeout=4.0) as client:
            resp = await client.get(settings.OPEN_METEO_URL, params=params)
            if resp.status_code == 200:
                data = resp.json()
                current = data.get("current", {})
                daily = data.get("daily", {})

                temp = current.get("temperature_2m", 31.0)
                humidity = current.get("relative_humidity_2m", 68.0)
                precip = current.get("precipitation", 0.0)
                max_temp = daily.get("temperature_2m_max", [temp])[0]

                # Classify seasonal risk and suitability
                seasonal_risk = "Normal"
                if max_temp > 38.0:
                    seasonal_risk = "High Summer Heat Stress"
                elif precip > 25.0:
                    seasonal_risk = "Monsoon Heavy Rain Warning"

                suitability = "Favorable"
                if seasonal_risk != "Normal":
                    suitability = "Requires Climate Mitigation"

                return {
                    "avg_temp_c": round(temp, 1),
                    "max_temp_c": round(max_temp, 1),
                    "humidity_percent": round(humidity, 1),
                    "precipitation_mm": round(precip, 1),
                    "seasonal_risk": seasonal_risk,
                    "climate_suitability": suitability,
                    "source": "Open-Meteo Global API",
                    "status": "Verified / Observed"
                }
    except Exception as e:
        logger.warning(f"Open-Meteo API query error: {e}")

    # Fallback AP regional climate normal (tropical coastal/inland)
    return {
        "avg_temp_c": 30.5,
        "max_temp_c": 34.0,
        "humidity_percent": 70.0,
        "precipitation_mm": 0.0,
        "seasonal_risk": "Moderate Summer Warmth",
        "climate_suitability": "Favorable",
        "source": "AP Regional Meteorological Baseline",
        "status": "Estimated"
    }
