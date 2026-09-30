"""
Central Data Source Registry for SIH 2026 Module 1: Andhra Pradesh Hyper-Local Business Advisory.
Lists all active official integrated data sources with exact metadata, provenance, and hierarchy levels.
Hierarchy:
  Level 1: Official Government of India Datasets
  Level 2: Official Government of Andhra Pradesh Datasets
  Level 3: Official AP District Administration & DES Datasets
  Level 4: Authoritative Geospatial & Environmental Observations
"""

from typing import List, Dict, Any

CENTRAL_DATA_REGISTRY: List[Dict[str, Any]] = [
    # LEVEL 1: OFFICIAL GOVERNMENT OF INDIA DATASETS
    {
        "id": "census_2011",
        "name": "Census of India 2011 (Primary Census Abstract & Village Directory)",
        "provider": "Office of the Registrar General & Census Commissioner of India, Ministry of Home Affairs",
        "data_type": "Historical Demographic & Household Baseline",
        "level": "Level 1: Official Government of India",
        "year": "2011",
        "reference_period": "Reference year: 2011 (Statutory Decennial Census)",
        "geographic_level": "Village Level & District Level",
        "indicators": "Total Population, Male/Female, Sex Ratio, Total Households, Population Density, Literacy Rate (Total, Male, Female), Rural/Urban Split, Main/Marginal Workers, Non-Workers, Cultivators, Agricultural Labourers, Household Industry Workers, Other Workers",
        "source_url": "https://censusindia.gov.in/census.website/",
        "description": "Statutory nationwide decennial census baseline providing verified administrative household and demographic foundation for all 26 districts and rural villages of Andhra Pradesh.",
        "freshness": "Historical Census Baseline (2011)",
        "badge": "Official data",
        "verification_status": "Statutory Official"
    },
    {
        "id": "economic_census",
        "name": "6th Economic Census of India",
        "provider": "Ministry of Statistics and Programme Implementation (MoSPI), Government of India",
        "data_type": "Official Establishment & Enterprise Inventory",
        "level": "Level 1: Official Government of India",
        "year": "2013-14",
        "reference_period": "Reference year: 2013-14 (6th Economic Census Official Round)",
        "geographic_level": "District Level",
        "indicators": "Total Establishments, Agricultural vs Non-Agricultural Establishments, Own-Account Units (operating without hired workers), Units with Hired Workers, Total Enterprise Employment, Rural vs Urban Enterprise Distribution, Sector Concentrations",
        "source_url": "https://mospi.gov.in/economic-census",
        "description": "Official enumeration of all entrepreneurial and commercial establishments providing reliable non-farm business structure benchmarks across all 26 AP districts.",
        "freshness": "Official Published Round (2013-14)",
        "badge": "Official data",
        "verification_status": "Statutory Official"
    },
    {
        "id": "msme_udyam",
        "name": "Udyam Registration Portal (Registered MSMEs)",
        "provider": "Ministry of Micro, Small and Medium Enterprises (MSME), Government of India",
        "data_type": "Official Registered MSME Statistics",
        "level": "Level 1: Official Government of India",
        "year": "2023-24",
        "reference_period": "Reference year: 2023-24 (Live Official Register)",
        "geographic_level": "District Level",
        "indicators": "Total Registered MSMEs, Micro Enterprises, Small Enterprises, Medium Enterprises, Manufacturing Units, Services Units, Trading Units, Registered Enterprise Density per 10,000 population",
        "source_url": "https://udyamregistration.gov.in/",
        "description": "Official registry of formal MSME enterprises. Explicitly represents 'Registered MSMEs' (not all informal businesses).",
        "freshness": "Annual Registry (2023-24)",
        "badge": "Official data",
        "verification_status": "Statutory Official"
    },

    # LEVEL 2: OFFICIAL ANDHRA PRADESH GOVERNMENT DATASETS
    {
        "id": "ap_des_survey",
        "name": "Socio-Economic Survey of Andhra Pradesh (2023-24 & 2024-25)",
        "provider": "Directorate of Economics and Statistics (DES), Planning Department, Government of Andhra Pradesh",
        "data_type": "State & District Agricultural & Economic Statistics",
        "level": "Level 2: Official Andhra Pradesh Government",
        "year": "2023-24",
        "reference_period": "Reference year: 2023-24 & 2024-25",
        "geographic_level": "District Level",
        "indicators": "Gross Cropped Area, Net Sown Area, Irrigation Ratio, Cropping Intensity, Major Horticultural & Agricultural Crops, Active Rythu Bharosa Kendras (RBKs), APMC Regulated Market Yards",
        "source_url": "https://desap.cgg.gov.in/",
        "description": "Comprehensive annual publication documenting official agricultural, horticultural, industrial, and rural development metrics across all 26 districts of Andhra Pradesh.",
        "freshness": "Annual Official Publication (2023-24 / 2024-25)",
        "badge": "Official data",
        "verification_status": "Official State Government"
    },
    {
        "id": "ap_animal_husbandry",
        "name": "20th Livestock Census & AP Livestock Profile",
        "provider": "Department of Animal Husbandry, Government of Andhra Pradesh & APDDCF (Vijaya Dairy)",
        "data_type": "Livestock, Bovine Population & Dairy Cooperatives",
        "level": "Level 2: Official Andhra Pradesh Government",
        "year": "2023-24",
        "reference_period": "Reference year: 2023-24 (20th Livestock Census & Annual Department Report)",
        "geographic_level": "District Level",
        "indicators": "Cattle (Cows) Count, Buffalo Count, Sheep & Goat Count, Poultry Population, Daily Milk Procurement (Litres/day), Primary Milk Producers Societies, Major Dairy Cooperative Unions, Veterinary Dispensaries",
        "source_url": "https://ahd.ap.gov.in/",
        "description": "Official livestock census statistics and cooperative dairy procurement frameworks reflecting live production capabilities.",
        "freshness": "20th Livestock Census & Annual Dept Report (2023-24)",
        "badge": "Official data",
        "verification_status": "Official State Government"
    },
    {
        "id": "ap_labour_wages",
        "name": "Report on Daily Wage Rates of Rural Labourers in AP",
        "provider": "Directorate of Economics and Statistics (DES), Government of Andhra Pradesh",
        "data_type": "Rural Reference Labour Wages",
        "level": "Level 2: Official Andhra Pradesh Government",
        "year": "2023-24",
        "reference_period": "Reference period: 2023-24",
        "geographic_level": "District Level",
        "indicators": "Agricultural Field Labour Daily Rate (Male/Female), Non-Agricultural Rural Labour Daily Rate, Skilled Mason/Carpenter Daily Rate, Semi-Skilled Helper Rate, Estimated 2-Worker Monthly Operating Cost Benchmark",
        "source_url": "https://desap.cgg.gov.in/",
        "description": "Statutory rural wage bulletins used to estimate business operating-cost context. Explicitly designated as 'Reference wage' rather than guaranteed salary.",
        "freshness": "Annual Labour Bulletin (2023-24)",
        "badge": "Official data",
        "verification_status": "Official State Government"
    },
    {
        "id": "ap_agrimarketing",
        "name": "APMC Mandi Price Schedules & Cooperative Procurement Tariffs",
        "provider": "Agricultural Marketing Department, Government of Andhra Pradesh",
        "data_type": "Observed Mandi Rates & Farmgate Prices",
        "level": "Level 2: Official Andhra Pradesh Government",
        "year": "2024-25",
        "reference_period": "Reference period: 2024-25 (Current Mandi Season)",
        "geographic_level": "District / APMC Market Yard Level",
        "indicators": "Farmgate Cow Milk Rate (4.0/8.5), Farmgate Buffalo Milk Rate (6.5/9.0), Minimum Support Prices (Paddy, Groundnut, Cotton, Chillies, Jaggery, Turmeric), Cattle Feed Concentrate Rates, Commercial Power Tariffs",
        "source_url": "https://market.ap.nic.in/",
        "description": "Regulated market yard auction prices and cooperative union purchase cards. Explicitly distinguished as 'Observed price' rather than guaranteed business revenue.",
        "freshness": "Current Market Season (2024-25)",
        "badge": "Official data",
        "verification_status": "Observed Official Market Card"
    },

    # LEVEL 3: OFFICIAL AP DISTRICT ADMINISTRATION & DES DATASETS
    {
        "id": "census_dchb",
        "name": "District Handbooks of Statistics & DCHB Village Directory",
        "provider": "Chief Planning Officer (CPO) & Directorate of Census Operations, Andhra Pradesh",
        "data_type": "Local Village & Town Infrastructure Coverage",
        "level": "Level 3: Official AP District Administration",
        "year": "2023-24",
        "reference_period": "Reference year: 2023-24",
        "geographic_level": "Village / Mandal / District Level",
        "indicators": "Habitations Count, Electrified Habitations %, All-Weather Pucca Road Network %, Primary & Secondary Schools, Primary Health Centres (PHC), Commercial & Cooperative Bank Branches, Market Linkages",
        "source_url": "https://desap.cgg.gov.in/",
        "description": "Village and mandal infrastructure inventory benchmarking rural physical accessibility and utility connectivity.",
        "freshness": "District Handbook 2023-24",
        "badge": "Official data",
        "verification_status": "Official District Administration"
    },

    # LEVEL 4: AUTHORITATIVE GEOSPATIAL & ENVIRONMENTAL OBSERVATIONS
    {
        "id": "osm_overpass",
        "name": "OpenStreetMap Geographic Physical POIs & Road Topography",
        "provider": "OpenStreetMap Contributors & Overpass API Mirrors",
        "data_type": "Live Micro-Spatial Infrastructure & Physical POIs",
        "level": "Level 4: Micro-Spatial Grounding",
        "year": "2026",
        "reference_period": "Live Spatial Query (2026)",
        "geographic_level": "Radius Catchment (5 km / 10 km around coordinates)",
        "indicators": "Direct Physical Competitors, Indirect Physical Competitors, Supporting Commercial Establishments, Habitation Nodes, Highway Proximity",
        "source_url": "https://www.openstreetmap.org/",
        "description": "Micro-spatial radius query for mapped physical establishments and road junctions. Distinguishes mapped physical POIs from official registered MSMEs.",
        "freshness": "Real-Time / Live Query (2026)",
        "badge": "Observed physical POIs",
        "verification_status": "Directly Observed"
    },
    {
        "id": "open_meteo",
        "name": "Open-Meteo Satellite Meteorological Forecast",
        "provider": "Open-Meteo & National Weather Services (ECMWF / GFS)",
        "data_type": "Live Environmental Conditions",
        "level": "Level 4: Environmental Observations",
        "year": "2026",
        "reference_period": "Live Forecast (2026)",
        "geographic_level": "Coordinates (Latitude/Longitude)",
        "indicators": "Ambient Temperature (°C), Relative Humidity (%), Current Precipitation (mm), Wind Speed, Seasonal Weather Risk",
        "source_url": "https://open-meteo.com/",
        "description": "Climatic indicators used to evaluate perishability risks for dairy, agriculture, and outdoor businesses.",
        "freshness": "Real-Time Forecast (2026)",
        "badge": "Observed live weather",
        "verification_status": "Directly Observed"
    }
]

def get_central_data_sources() -> List[Dict[str, Any]]:
    """Returns the full list of verified integrated official sources."""
    return CENTRAL_DATA_REGISTRY
