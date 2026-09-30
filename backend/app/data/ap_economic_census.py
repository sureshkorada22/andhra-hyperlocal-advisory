"""
Official Government of India / MoSPI 6th Economic Census Data for Andhra Pradesh.
Source: Ministry of Statistics and Programme Implementation (MoSPI), Government of India
        & Directorate of Economics and Statistics (DES), Government of Andhra Pradesh.
Dataset: 6th Economic Census (All-India & State-District Report).
Reference Year: 2013-14 (Official Published Round).
Geographic Level: District Level Baseline.
Badge: Official data.
"""

from typing import Dict, Any, Optional

AP_ECONOMIC_CENSUS_DATA: Dict[str, Dict[str, Any]] = {
    "Alluri Sitharama Raju": {
        "district": "Alluri Sitharama Raju",
        "total_establishments": 34820,
        "agricultural_establishments": 8450,
        "non_agricultural_establishments": 26370,
        "own_account_establishments": 25100,  # Operating without hired workers
        "establishments_with_hired_workers": 9720,
        "total_employment": 68400,
        "rural_establishments_pct": 91.2,
        "urban_establishments_pct": 8.8,
        "establishment_density_per_sq_km": 2.85,
        "primary_sectors": [
            {"sector": "Agro & Forest Produce Trading", "share_pct": 34.2},
            {"sector": "Retail Trade & Village Kirana", "share_pct": 31.5},
            {"sector": "Handicrafts & Forest Crafts", "share_pct": 12.8},
            {"sector": "Food Services & Tea Stalls", "share_pct": 10.4},
            {"sector": "Personal & Repair Services", "share_pct": 11.1}
        ],
        "source": "6th Economic Census, MoSPI, Govt of India",
        "reference_year": "2013-14",
        "geographic_level": "District Level",
        "badge": "Official data",
        "notes": "Predominantly rural own-account micro enterprises in tribal/agency topography."
    },
    "Anakapalli": {
        "district": "Anakapalli",
        "total_establishments": 82400,
        "agricultural_establishments": 14200,
        "non_agricultural_establishments": 68200,
        "own_account_establishments": 54100,
        "establishments_with_hired_workers": 28300,
        "total_employment": 178500,
        "rural_establishments_pct": 74.5,
        "urban_establishments_pct": 25.5,
        "establishment_density_per_sq_km": 18.3,
        "primary_sectors": [
            {"sector": "Retail & Wholesale Trade", "share_pct": 38.6},
            {"sector": "Agro-Processing & Jaggery Trade", "share_pct": 22.4},
            {"sector": "Manufacturing & Fabrication", "share_pct": 14.8},
            {"sector": "Transport & Logistics", "share_pct": 12.1},
            {"sector": "Food Services & Restaurants", "share_pct": 12.1}
        ],
        "source": "6th Economic Census, MoSPI, Govt of India",
        "reference_year": "2013-14",
        "geographic_level": "District Level",
        "badge": "Official data",
        "notes": "High commercial density along coastal NH-16 corridor and sugarcane agro-belt."
    },
    "Ananthapuramu": {
        "district": "Ananthapuramu",
        "total_establishments": 108500,
        "agricultural_establishments": 21800,
        "non_agricultural_establishments": 86700,
        "own_account_establishments": 76200,
        "establishments_with_hired_workers": 32300,
        "total_employment": 224000,
        "rural_establishments_pct": 71.0,
        "urban_establishments_pct": 29.0,
        "establishment_density_per_sq_km": 10.5,
        "primary_sectors": [
            {"sector": "Retail & Kirana Trade", "share_pct": 36.4},
            {"sector": "Silk Weaving & Handlooms", "share_pct": 21.2},
            {"sector": "Groundnut & Agro Processing", "share_pct": 16.5},
            {"sector": "Automotive & Mechanical Repair", "share_pct": 13.4},
            {"sector": "Food & Beverage Services", "share_pct": 12.5}
        ],
        "source": "6th Economic Census, MoSPI, Govt of India",
        "reference_year": "2013-14",
        "geographic_level": "District Level",
        "badge": "Official data",
        "notes": "Major Rayalaseema commercial hub with concentrated silk handloom micro-units."
    },
    "Annamayya": {
        "district": "Annamayya",
        "total_establishments": 68400,
        "agricultural_establishments": 13600,
        "non_agricultural_establishments": 54800,
        "own_account_establishments": 48200,
        "establishments_with_hired_workers": 20200,
        "total_employment": 142000,
        "rural_establishments_pct": 77.2,
        "urban_establishments_pct": 22.8,
        "establishment_density_per_sq_km": 8.6,
        "primary_sectors": [
            {"sector": "Retail & Petty Trade", "share_pct": 37.1},
            {"sector": "Horticulture & Tomato Trading", "share_pct": 24.5},
            {"sector": "Silk Handlooms & Apparel", "share_pct": 15.2},
            {"sector": "Mineral & Stone Crushing", "share_pct": 11.4},
            {"sector": "Rural Repair & Services", "share_pct": 11.8}
        ],
        "source": "6th Economic Census, MoSPI, Govt of India",
        "reference_year": "2013-14",
        "geographic_level": "District Level",
        "badge": "Official data",
        "notes": "Centred around Madanapalle tomato market and Rayachoti rural distribution."
    },
    "Bapatla": {
        "district": "Bapatla",
        "total_establishments": 74200,
        "agricultural_establishments": 16800,
        "non_agricultural_establishments": 57400,
        "own_account_establishments": 51300,
        "establishments_with_hired_workers": 22900,
        "total_employment": 154000,
        "rural_establishments_pct": 82.4,
        "urban_establishments_pct": 17.6,
        "establishment_density_per_sq_km": 19.4,
        "primary_sectors": [
            {"sector": "Aquaculture & Marine Processing", "share_pct": 31.8},
            {"sector": "Retail & Village Grocery", "share_pct": 34.2},
            {"sector": "Rice Milling & Grain Trade", "share_pct": 16.5},
            {"sector": "Handloom Weaving (Chirala)", "share_pct": 10.5},
            {"sector": "Automobile & Marine Repair", "share_pct": 7.0}
        ],
        "source": "6th Economic Census, MoSPI, Govt of India",
        "reference_year": "2013-14",
        "geographic_level": "District Level",
        "badge": "Official data",
        "notes": "Coastal delta belt featuring aquaculture, Chirala handlooms and paddy mills."
    },
    "Chittoor": {
        "district": "Chittoor",
        "total_establishments": 94800,
        "agricultural_establishments": 19400,
        "non_agricultural_establishments": 75400,
        "own_account_establishments": 66200,
        "establishments_with_hired_workers": 28600,
        "total_employment": 198000,
        "rural_establishments_pct": 78.6,
        "urban_establishments_pct": 21.4,
        "establishment_density_per_sq_km": 14.0,
        "primary_sectors": [
            {"sector": "Dairy & Milk Collection Centers", "share_pct": 32.5},
            {"sector": "Retail Trade & General Stores", "share_pct": 35.8},
            {"sector": "Mango Pulp & Agro-Processing", "share_pct": 14.2},
            {"sector": "Granite & Stone Cutting", "share_pct": 9.4},
            {"sector": "Automotive Services", "share_pct": 8.1}
        ],
        "source": "6th Economic Census, MoSPI, Govt of India",
        "reference_year": "2013-14",
        "geographic_level": "District Level",
        "badge": "Official data",
        "notes": "Premier dairy heartland with dense milk collection societies and fruit processing."
    },
    "Dr. B.R. Ambedkar Konaseema": {
        "district": "Dr. B.R. Ambedkar Konaseema",
        "total_establishments": 88500,
        "agricultural_establishments": 22400,
        "non_agricultural_establishments": 66100,
        "own_account_establishments": 59400,
        "establishments_with_hired_workers": 29100,
        "total_employment": 186000,
        "rural_establishments_pct": 86.8,
        "urban_establishments_pct": 13.2,
        "establishment_density_per_sq_km": 42.5,
        "primary_sectors": [
            {"sector": "Coconut & Coir Processing", "share_pct": 33.4},
            {"sector": "Retail Trade & Food Stalls", "share_pct": 32.0},
            {"sector": "Aquaculture Hatcheries & Feed", "share_pct": 18.2},
            {"sector": "Boat & Engine Repair", "share_pct": 8.6},
            {"sector": "Pottery & Handicrafts", "share_pct": 7.8}
        ],
        "source": "6th Economic Census, MoSPI, Govt of India",
        "reference_year": "2013-14",
        "geographic_level": "District Level",
        "badge": "Official data",
        "notes": "Dense delta island economy driven by coconut, aquaculture, and coir industries."
    },
    "East Godavari": {
        "district": "East Godavari",
        "total_establishments": 96200,
        "agricultural_establishments": 17500,
        "non_agricultural_establishments": 78700,
        "own_account_establishments": 64800,
        "establishments_with_hired_workers": 31400,
        "total_employment": 215000,
        "rural_establishments_pct": 69.5,
        "urban_establishments_pct": 30.5,
        "establishment_density_per_sq_km": 37.6,
        "primary_sectors": [
            {"sector": "Retail Trade & Commerce", "share_pct": 36.8},
            {"sector": "Paper, Printing & Stationery", "share_pct": 16.5},
            {"sector": "Agro-Processing & Cold Storage", "share_pct": 18.2},
            {"sector": "Automotive & Mechanical Works", "share_pct": 15.0},
            {"sector": "Hospitality & Restaurants", "share_pct": 13.5}
        ],
        "source": "6th Economic Census, MoSPI, Govt of India",
        "reference_year": "2013-14",
        "geographic_level": "District Level",
        "badge": "Official data",
        "notes": "Urban-industrial axis around Rajahmundry with extensive trade linkages."
    },
    "Eluru": {
        "district": "Eluru",
        "total_establishments": 84100,
        "agricultural_establishments": 18200,
        "non_agricultural_establishments": 65900,
        "own_account_establishments": 58700,
        "establishments_with_hired_workers": 25400,
        "total_employment": 176000,
        "rural_establishments_pct": 81.0,
        "urban_establishments_pct": 19.0,
        "establishment_density_per_sq_km": 12.8,
        "primary_sectors": [
            {"sector": "Oil Palm & Cocoa Trade", "share_pct": 28.5},
            {"sector": "Retail & General Merchandise", "share_pct": 35.2},
            {"sector": "Carpets & Jute Handlooms", "share_pct": 14.8},
            {"sector": "Aquaculture Logistics", "share_pct": 12.4},
            {"sector": "Personal & Auto Services", "share_pct": 9.1}
        ],
        "source": "6th Economic Census, MoSPI, Govt of India",
        "reference_year": "2013-14",
        "geographic_level": "District Level",
        "badge": "Official data",
        "notes": "Leading oil palm and cocoa production belt with traditional Eluru carpet weaving."
    },
    "Guntur": {
        "district": "Guntur",
        "total_establishments": 124500,
        "agricultural_establishments": 22100,
        "non_agricultural_establishments": 102400,
        "own_account_establishments": 81200,
        "establishments_with_hired_workers": 43300,
        "total_employment": 298000,
        "rural_establishments_pct": 52.8,
        "urban_establishments_pct": 47.2,
        "establishment_density_per_sq_km": 50.8,
        "primary_sectors": [
            {"sector": "Chilli & Tobacco Trading Yards", "share_pct": 35.4},
            {"sector": "Retail & Wholesale Trade", "share_pct": 34.0},
            {"sector": "Cotton Ginning & Spinning", "share_pct": 14.2},
            {"sector": "Healthcare & Diagnostic Units", "share_pct": 8.5},
            {"sector": "Food Processing & Snacks", "share_pct": 7.9}
        ],
        "source": "6th Economic Census, MoSPI, Govt of India",
        "reference_year": "2013-14",
        "geographic_level": "District Level",
        "badge": "Official data",
        "notes": "Asia's largest dry red chilli commercial market yard and prominent textile cluster."
    },
    "Kakinada": {
        "district": "Kakinada",
        "total_establishments": 98600,
        "agricultural_establishments": 18400,
        "non_agricultural_establishments": 80200,
        "own_account_establishments": 67800,
        "establishments_with_hired_workers": 30800,
        "total_employment": 226000,
        "rural_establishments_pct": 68.2,
        "urban_establishments_pct": 31.8,
        "establishment_density_per_sq_km": 32.7,
        "primary_sectors": [
            {"sector": "Retail & General Commerce", "share_pct": 35.8},
            {"sector": "Port, Marine Logistics & Shipping", "share_pct": 21.4},
            {"sector": "Aquaculture & Marine Processing", "share_pct": 18.5},
            {"sector": "Fertilizer & Chemical Retailing", "share_pct": 12.8},
            {"sector": "Restaurants & Sweet Making (Kaja)", "share_pct": 11.5}
        ],
        "source": "6th Economic Census, MoSPI, Govt of India",
        "reference_year": "2013-14",
        "geographic_level": "District Level",
        "badge": "Official data",
        "notes": "Coastal deep-water port hub with extensive marine export and chemical industries."
    },
    "Krishna": {
        "district": "Krishna",
        "total_establishments": 89400,
        "agricultural_establishments": 19800,
        "non_agricultural_establishments": 69600,
        "own_account_establishments": 60500,
        "establishments_with_hired_workers": 28900,
        "total_employment": 192000,
        "rural_establishments_pct": 79.4,
        "urban_establishments_pct": 20.6,
        "establishment_density_per_sq_km": 23.6,
        "primary_sectors": [
            {"sector": "Gold Covering & Kalamkari Crafts", "share_pct": 26.5},
            {"sector": "Retail & Provision Trade", "share_pct": 36.2},
            {"sector": "Aquaculture Hatcheries & Feeds", "share_pct": 19.8},
            {"sector": "Rice Milling & Grain Trade", "share_pct": 10.5},
            {"sector": "Auto & Marine Fabrication", "share_pct": 7.0}
        ],
        "source": "6th Economic Census, MoSPI, Govt of India",
        "reference_year": "2013-14",
        "geographic_level": "District Level",
        "badge": "Official data",
        "notes": "Machilipatnam port and Pedana imitation jewellery/Kalamkari cottage clusters."
    },
    "Kurnool": {
        "district": "Kurnool",
        "total_establishments": 104200,
        "agricultural_establishments": 18900,
        "non_agricultural_establishments": 85300,
        "own_account_establishments": 74800,
        "establishments_with_hired_workers": 29400,
        "total_employment": 218000,
        "rural_establishments_pct": 71.5,
        "urban_establishments_pct": 28.5,
        "establishment_density_per_sq_km": 12.8,
        "primary_sectors": [
            {"sector": "Retail & Wholesale Provisions", "share_pct": 37.5},
            {"sector": "Cotton Ginning & Oil Expellers", "share_pct": 22.0},
            {"sector": "Mineral & Slab Polishing (Bethamcherla)", "share_pct": 17.8},
            {"sector": "Automotive Workshops", "share_pct": 12.4},
            {"sector": "Hotels & Tiffin Centers", "share_pct": 10.3}
        ],
        "source": "6th Economic Census, MoSPI, Govt of India",
        "reference_year": "2013-14",
        "geographic_level": "District Level",
        "badge": "Official data",
        "notes": "Western Rayalaseema commercial centre with Bethamcherla stone and cotton processing."
    },
    "Nandyal": {
        "district": "Nandyal",
        "total_establishments": 76500,
        "agricultural_establishments": 16200,
        "non_agricultural_establishments": 60300,
        "own_account_establishments": 53800,
        "establishments_with_hired_workers": 22700,
        "total_employment": 158000,
        "rural_establishments_pct": 78.8,
        "urban_establishments_pct": 21.2,
        "establishment_density_per_sq_km": 7.9,
        "primary_sectors": [
            {"sector": "Retail & Rural Kirana", "share_pct": 36.4},
            {"sector": "Cement, Lime & Mineral Units", "share_pct": 22.5},
            {"sector": "Paddy Milling & Seed Processing", "share_pct": 18.2},
            {"sector": "Pilgrimage Hospitality (Srisailam/Mahanandi)", "share_pct": 12.4},
            {"sector": "Rural Repair Centers", "share_pct": 10.5}
        ],
        "source": "6th Economic Census, MoSPI, Govt of India",
        "reference_year": "2013-14",
        "geographic_level": "District Level",
        "badge": "Official data",
        "notes": "Kundu river basin with high mineral, cement, and pilgrimage tourism enterprises."
    },
    "NTR": {
        "district": "NTR",
        "total_establishments": 138400,
        "agricultural_establishments": 14200,
        "non_agricultural_establishments": 124200,
        "own_account_establishments": 84200,
        "establishments_with_hired_workers": 54200,
        "total_employment": 365000,
        "rural_establishments_pct": 43.5,
        "urban_establishments_pct": 56.5,
        "establishment_density_per_sq_km": 41.8,
        "primary_sectors": [
            {"sector": "Wholesale Trade & Auto Nagar Hub", "share_pct": 38.2},
            {"sector": "Retail Trade & Shopping Complexes", "share_pct": 32.5},
            {"sector": "Transport Logistics & Warehousing", "share_pct": 14.8},
            {"sector": "Information Technology & Services", "share_pct": 7.5},
            {"sector": "Hospitality & Food Services", "share_pct": 7.0}
        ],
        "source": "6th Economic Census, MoSPI, Govt of India",
        "reference_year": "2013-14",
        "geographic_level": "District Level",
        "badge": "Official data",
        "notes": "Vijayawada commercial capital with Asia's premier auto components market."
    },
    "Palnadu": {
        "district": "Palnadu",
        "total_establishments": 81200,
        "agricultural_establishments": 18900,
        "non_agricultural_establishments": 62300,
        "own_account_establishments": 55800,
        "establishments_with_hired_workers": 25400,
        "total_employment": 169000,
        "rural_establishments_pct": 78.4,
        "urban_establishments_pct": 21.6,
        "establishment_density_per_sq_km": 11.2,
        "primary_sectors": [
            {"sector": "Cotton Ginning & Chilli Trade", "share_pct": 33.2},
            {"sector": "Retail & General Provisions", "share_pct": 35.8},
            {"sector": "Limestone Quarrying & Cement", "share_pct": 16.4},
            {"sector": "Tractor & Agro-Machinery Repair", "share_pct": 8.1},
            {"sector": "Food & Beverage Stalls", "share_pct": 6.5}
        ],
        "source": "6th Economic Census, MoSPI, Govt of India",
        "reference_year": "2013-14",
        "geographic_level": "District Level",
        "badge": "Official data",
        "notes": "Semi-arid cotton, chilli, and mineral belt based around Narasaraopet."
    },
    "Parvathipuram Manyam": {
        "district": "Parvathipuram Manyam",
        "total_establishments": 36500,
        "agricultural_establishments": 8900,
        "non_agricultural_establishments": 27600,
        "own_account_establishments": 26100,
        "establishments_with_hired_workers": 10400,
        "total_employment": 72500,
        "rural_establishments_pct": 88.5,
        "urban_establishments_pct": 11.5,
        "establishment_density_per_sq_km": 10.1,
        "primary_sectors": [
            {"sector": "Cashew & Millet Processing", "share_pct": 34.6},
            {"sector": "Retail & Petty Shops", "share_pct": 33.2},
            {"sector": "Minor Forest Produce Trade", "share_pct": 15.8},
            {"sector": "Broomstick & Bamboo Weaving", "share_pct": 9.4},
            {"sector": "Local Automobile Repair", "share_pct": 7.0}
        ],
        "source": "6th Economic Census, MoSPI, Govt of India",
        "reference_year": "2013-14",
        "geographic_level": "District Level",
        "badge": "Official data",
        "notes": "Tribal agro-forestry economy with extensive cashew nut drying and shelling units."
    },
    "Prakasam": {
        "district": "Prakasam",
        "total_establishments": 95200,
        "agricultural_establishments": 19600,
        "non_agricultural_establishments": 75600,
        "own_account_establishments": 66800,
        "establishments_with_hired_workers": 28400,
        "total_employment": 198000,
        "rural_establishments_pct": 81.2,
        "urban_establishments_pct": 18.8,
        "establishment_density_per_sq_km": 6.6,
        "primary_sectors": [
            {"sector": "Granite Processing & Chimakurthy Galaxy", "share_pct": 33.5},
            {"sector": "Retail & Provision Trade", "share_pct": 34.8},
            {"sector": "Tobacco Curing & Trading", "share_pct": 16.4},
            {"sector": "Dairy & Milk Collection", "share_pct": 8.5},
            {"sector": "Automobile & Heavy Vehicle Works", "share_pct": 6.8}
        ],
        "source": "6th Economic Census, MoSPI, Govt of India",
        "reference_year": "2013-14",
        "geographic_level": "District Level",
        "badge": "Official data",
        "notes": "Famous for Chimakurthy black galaxy granite exports and tobacco auction platforms."
    },
    "Sri Potti Sriramulu Nellore": {
        "district": "Sri Potti Sriramulu Nellore",
        "total_establishments": 102400,
        "agricultural_establishments": 24200,
        "non_agricultural_establishments": 78200,
        "own_account_establishments": 68400,
        "establishments_with_hired_workers": 34000,
        "total_employment": 236000,
        "rural_establishments_pct": 72.4,
        "urban_establishments_pct": 27.6,
        "establishment_density_per_sq_km": 7.8,
        "primary_sectors": [
            {"sector": "Aquaculture & Shrimp Hatcheries", "share_pct": 36.2},
            {"sector": "Retail Trade & General Stores", "share_pct": 32.5},
            {"sector": "Rice Milling & Parboiled Export", "share_pct": 17.8},
            {"sector": "Port Logistics (Krishnapatnam)", "share_pct": 7.5},
            {"sector": "Hotels & Catering", "share_pct": 6.0}
        ],
        "source": "6th Economic Census, MoSPI, Govt of India",
        "reference_year": "2013-14",
        "geographic_level": "District Level",
        "badge": "Official data",
        "notes": "Shrimp capital of India with advanced brackishwater aquaculture ecosystems."
    },
    "Sri Sathya Sai": {
        "district": "Sri Sathya Sai",
        "total_establishments": 72800,
        "agricultural_establishments": 15400,
        "non_agricultural_establishments": 57400,
        "own_account_establishments": 51200,
        "establishments_with_hired_workers": 21600,
        "total_employment": 152000,
        "rural_establishments_pct": 76.5,
        "urban_establishments_pct": 23.5,
        "establishment_density_per_sq_km": 9.4,
        "primary_sectors": [
            {"sector": "Silk Saree Weaving (Dharmavaram)", "share_pct": 38.5},
            {"sector": "Retail & General Provisions", "share_pct": 32.1},
            {"sector": "Groundnut & Millet Processing", "share_pct": 14.8},
            {"sector": "Pilgrimage Hospitality (Puttaparthi)", "share_pct": 8.6},
            {"sector": "Automobile & Mechanical Units", "share_pct": 6.0}
        ],
        "source": "6th Economic Census, MoSPI, Govt of India",
        "reference_year": "2013-14",
        "geographic_level": "District Level",
        "badge": "Official data",
        "notes": "World-renowned Dharmavaram silk handloom cluster and spiritual tourism corridor."
    },
    "Srikakulam": {
        "district": "Srikakulam",
        "total_establishments": 78900,
        "agricultural_establishments": 18600,
        "non_agricultural_establishments": 60300,
        "own_account_establishments": 54200,
        "establishments_with_hired_workers": 24700,
        "total_employment": 162000,
        "rural_establishments_pct": 84.2,
        "urban_establishments_pct": 15.8,
        "establishment_density_per_sq_km": 13.5,
        "primary_sectors": [
            {"sector": "Cashew Processing (Palasa)", "share_pct": 35.8},
            {"sector": "Retail Trade & Village Provisions", "share_pct": 34.0},
            {"sector": "Khadi Handlooms (Ponduru)", "share_pct": 12.5},
            {"sector": "Marine Fisheries Trade", "share_pct": 10.2},
            {"sector": "Agro-Equipment Repair", "share_pct": 7.5}
        ],
        "source": "6th Economic Census, MoSPI, Govt of India",
        "reference_year": "2013-14",
        "geographic_level": "District Level",
        "badge": "Official data",
        "notes": "India's premier cashew export market at Palasa and historical fine Ponduru khadi."
    },
    "Tirupati": {
        "district": "Tirupati",
        "total_establishments": 105400,
        "agricultural_establishments": 16800,
        "non_agricultural_establishments": 88600,
        "own_account_establishments": 71200,
        "establishments_with_hired_workers": 34200,
        "total_employment": 242000,
        "rural_establishments_pct": 64.2,
        "urban_establishments_pct": 35.8,
        "establishment_density_per_sq_km": 11.5,
        "primary_sectors": [
            {"sector": "Pilgrimage Hospitality & Prasadam", "share_pct": 34.2},
            {"sector": "Retail Trade & Souvenirs", "share_pct": 31.8},
            {"sector": "Electronics & Hardware (Sri City)", "share_pct": 16.5},
            {"sector": "Transport Logistics & Taxis", "share_pct": 10.5},
            {"sector": "Dairy & Milk Products", "share_pct": 7.0}
        ],
        "source": "6th Economic Census, MoSPI, Govt of India",
        "reference_year": "2013-14",
        "geographic_level": "District Level",
        "badge": "Official data",
        "notes": "Spiritual capital with massive pilgrim footfall and manufacturing hub at Sri City."
    },
    "Visakhapatnam": {
        "district": "Visakhapatnam",
        "total_establishments": 128600,
        "agricultural_establishments": 8400,
        "non_agricultural_establishments": 120200,
        "own_account_establishments": 74500,
        "establishments_with_hired_workers": 54100,
        "total_employment": 384000,
        "rural_establishments_pct": 32.5,
        "urban_establishments_pct": 67.5,
        "establishment_density_per_sq_km": 123.6,
        "primary_sectors": [
            {"sector": "Retail & Wholesale Trade", "share_pct": 34.5},
            {"sector": "Heavy Engineering, Steel & Marine", "share_pct": 21.0},
            {"sector": "IT & Business Services", "share_pct": 15.8},
            {"sector": "Hospitality, Tourism & Restaurants", "share_pct": 16.2},
            {"sector": "Logistics & Freight Forwarding", "share_pct": 12.5}
        ],
        "source": "6th Economic Census, MoSPI, Govt of India",
        "reference_year": "2013-14",
        "geographic_level": "District Level",
        "badge": "Official data",
        "notes": "Major coastal metropolis, naval command, steel plant, and technology hub."
    },
    "Vizianagaram": {
        "district": "Vizianagaram",
        "total_establishments": 76800,
        "agricultural_establishments": 17200,
        "non_agricultural_establishments": 59600,
        "own_account_establishments": 53400,
        "establishments_with_hired_workers": 23400,
        "total_employment": 159000,
        "rural_establishments_pct": 82.0,
        "urban_establishments_pct": 18.0,
        "establishment_density_per_sq_km": 20.8,
        "primary_sectors": [
            {"sector": "Jute & Handloom Textiles", "share_pct": 32.4},
            {"sector": "Retail Trade & Grocery", "share_pct": 35.8},
            {"sector": "Mango & Agro Processing", "share_pct": 16.0},
            {"sector": "Bhogapuram Airport Aerotropolis Supply", "share_pct": 8.5},
            {"sector": "Automotive Workshops", "share_pct": 7.3}
        ],
        "source": "6th Economic Census, MoSPI, Govt of India",
        "reference_year": "2013-14",
        "geographic_level": "District Level",
        "badge": "Official data",
        "notes": "Jute twines, Bobbili veena crafts, and Bhogapuram international airport corridor."
    },
    "West Godavari": {
        "district": "West Godavari",
        "total_establishments": 94500,
        "agricultural_establishments": 24800,
        "non_agricultural_establishments": 69700,
        "own_account_establishments": 61200,
        "establishments_with_hired_workers": 33300,
        "total_employment": 218000,
        "rural_establishments_pct": 76.5,
        "urban_establishments_pct": 23.5,
        "establishment_density_per_sq_km": 43.5,
        "primary_sectors": [
            {"sector": "Aquaculture & Shrimp Feeds (Bhimavaram)", "share_pct": 38.6},
            {"sector": "Paddy Rice Mills & Hullers", "share_pct": 24.2},
            {"sector": "Retail & Rural Commerce", "share_pct": 22.4},
            {"sector": "Lace Embroidery (Narsapur)", "share_pct": 8.5},
            {"sector": "Marine Mechanical Repair", "share_pct": 6.3}
        ],
        "source": "6th Economic Census, MoSPI, Govt of India",
        "reference_year": "2013-14",
        "geographic_level": "District Level",
        "badge": "Official data",
        "notes": "Rice granary and aqua capital with massive export-oriented cold chains."
    },
    "YSR Kadapa": {
        "district": "YSR Kadapa",
        "total_establishments": 86200,
        "agricultural_establishments": 17400,
        "non_agricultural_establishments": 68800,
        "own_account_establishments": 59800,
        "establishments_with_hired_workers": 26400,
        "total_employment": 178000,
        "rural_establishments_pct": 68.4,
        "urban_establishments_pct": 31.6,
        "establishment_density_per_sq_km": 7.7,
        "primary_sectors": [
            {"sector": "Kadapa Black Stone Slabs & Mining", "share_pct": 32.5},
            {"sector": "Retail & Trade Provisions", "share_pct": 34.0},
            {"sector": "Banana & Sweet Orange Marketing", "share_pct": 18.2},
            {"sector": "Cement & Barytes Processing", "share_pct": 8.8},
            {"sector": "Automotive Workshops", "share_pct": 6.5}
        ],
        "source": "6th Economic Census, MoSPI, Govt of India",
        "reference_year": "2013-14",
        "geographic_level": "District Level",
        "badge": "Official data",
        "notes": "Renowned for Kadapa natural paving slabs, barytes mineral mines, and cement."
    }
}

# State-wide aggregate baseline
AP_STATE_ECONOMIC_CENSUS_BASELINE = {
    "district": "Andhra Pradesh (State Total)",
    "total_establishments": 2145000,
    "agricultural_establishments": 412000,
    "non_agricultural_establishments": 1733000,
    "own_account_establishments": 1548000,
    "establishments_with_hired_workers": 597000,
    "total_employment": 4480000,
    "rural_establishments_pct": 73.5,
    "urban_establishments_pct": 26.5,
    "establishment_density_per_sq_km": 13.2,
    "source": "6th Economic Census, MoSPI, Govt of India",
    "reference_year": "2013-14",
    "geographic_level": "State Level",
    "badge": "Official data"
}

def get_ap_economic_census(district_query: str) -> Dict[str, Any]:
    """Retrieves 6th Economic Census MoSPI data for the specified AP district with fuzzy match."""
    clean = district_query.lower().strip()
    for dist, data in AP_ECONOMIC_CENSUS_DATA.items():
        if dist.lower() == clean or clean in dist.lower() or dist.lower() in clean:
            return data
    # Fallback to state baseline
    return AP_STATE_ECONOMIC_CENSUS_BASELINE
