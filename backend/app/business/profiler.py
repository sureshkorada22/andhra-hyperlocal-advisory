import re
from typing import Dict, Any, Tuple
from app.business.categories import BUSINESS_CATEGORIES, DEFAULT_PROFILES, CATEGORY_MAP

# Multilingual intent stopwords & patterns (Telugu, Hindi, English)
STOPWORDS = {
    "na", "village", "lo", "pettali", "cheyyali", "start", "business", "nenu", "kavalanukuntunnanu",
    "mere", "gaon", "mein", "shuru", "karni", "hai", "karna", "chahata", "hoon", "dukaan",
    "i", "want", "to", "open", "shop", "centre", "center", "service", "services", "store"
}

CATEGORY_KEYWORDS = {
    "dairy_livestock": [
        "dairy", "milk", "cattle", "cow", "buffalo", "ghee", "curd", "paneer", "feed",
        "goat", "sheep", "poultry", "chicken", "egg", "meat",
        "డెయిరీ", "పాడి", "పాలు", "పాల", "ఆవు", "గేదె", "నెయ్యి", "మేక", "గొర్రె", "కోడి", "గుడ్లు",
        "डेयरी", "दूध", "गाय", "भैंस", "पशु", "बकरी", "मुर्गी", "अंडा"
    ],
    "agriculture_farming": [
        "farm", "farming", "crop", "vegetable", "fruit", "organic", "flower", "nursery",
        "seed", "fertilizer", "pesticide", "tractor", "irrigation", "drip", "greenhouse", "mushroom", "vermicompost",
        "వ్యవసాయం", "సాగు", "కూరగాయలు", "పండ్లు", "విత్తనాలు", "ఎరువులు", "పుట్టగొడుగులు",
        "खेती", "कृषि", "सब्जी", "फल", "बीज", "उर्वरक", "कीटनाशक"
    ],
    "food_beverages": [
        "restaurant", "restaurent", "restuarent", "resturant", "restraunt", "restarant", "restro",
        "hotel", "hotell", "dhaba", "mess", "biryani", "biriyani", "bhojanam", "canteen", "food",
        "dining", "meals", "eatery", "bakery", "cake", "bread", "tea", "coffee", "juice", "tiffin",
        "fast food", "catering", "kitchen", "sweet", "mithai", "snacks", "pickle", "pachadi", "spice", "mill", "flour", "rice mill",
        "రెస్టారెంట్", "హోటల్", "టిఫిన్", "మెస్", "ధాబా", "బిర్యానీ", "భోజనం", "బేకరీ", "టీ", "స్వీట్", "పచ్చళ్ళు", "పిండి గిర్నీ",
        "रेस्टोरेंट", "होटल", "ढाबा", "भोजनालय", "मेस", "बेकरी", "चाय", "नाश्ता", "मिठाई", "अचार", "आटा चक्की"
    ],
    "retail": [
        "grocery", "kirana", "supermarket", "clothing", "cloth", "footwear", "shoes", "chappal",
        "stationery", "book", "hardware", "paint", "electrical", "electronics", "mobile accessories",
        "fancy", "cosmetic",
        "కిరాణా", "బట్టలు", "చెప్పులు", "స్టేషనరీ", "హార్డ్‌వేర్", "ఫ్యాన్సీ",
        "किराना", "दुकान", "कपड़े", "जूते", "हार्डवेयर"
    ],
    "services": [
        "repair", "mobile repair", "phone", "bike", "two wheeler", "car wash", "laundry",
        "tailor", "tailoring", "salon", "barber", "parlour", "photo", "studio", "xerox", "print", "courier",
        "మొబైల్ రిపేర్", "టైలరింగ్", "బ్యూటీ పార్లర్", "క్షౌరశాల", "జిరాక్స్", "కొరియర్",
        "रिपेयर", "सिलाई", "ब्यूटी पार्लर", "नाई", "फोटो", "ज़ेरॉक्स"
    ],
    "manufacturing": [
        "manufacture", "making", "furniture", "wood", "candle", "agarbatti", "soap", "detergent",
        "paper", "bag", "cup", "handicraft", "craft", "garment", "brick", "metal",
        "తయారీ", "ఫర్నిచర్", "కొవ్వొత్తులు", "సబ్బులు", "బొమ్మలు", "ఇటుకలు",
        "निर्माण", "फर्नीचर", "मोमबत्ती", "साबुन", "हस्तशिल्प", "ईंट"
    ],
    "transport_mobility": [
        "transport", "auto", "cab", "taxi", "delivery", "mini truck", "lorry", "rental", "logistics",
        "రవాణా", "ఆటో", "టాక్సీ", "గూడ్స్",
        "परिवहन", "ऑटो", "टैक्सी", "गाड़ी", "किराया"
    ],
    "education": [
        "tuition", "school", "coaching", "computer training", "skill", "spoken english", "vocational",
        "ట్యూషన్", "కోచింగ్", "శిక్షణ", "స్కూల్",
        "ट्यूशन", "कोचिंग", "प्रशिक्षण", "पढ़ाई"
    ],
    "tourism_hospitality": [
        "tourism", "tourist", "homestay", "lodge", "guest house", "resort", "guide", "travel", "kalamkari",
        "పర్యాటకం", "హోమ్‌స్టే", "లాడ్జ్", "యాత్రికులు",
        "पर्यटन", "होमस्टे", "लॉज", "होटल"
    ],
    "digital_services": [
        "digital", "online", "meeseva", "e-seva", "internet", "website", "graphic", "csc",
        "మీసేవ", "ఈ-సేవ", "ఇంటర్నెట్", "ఆన్‌లైన్",
        "डिजिटल", "ई-सेवा", "ऑनलाइन", "कंप्यूटर"
    ],
    "environment_sustainability": [
        "solar", "rooftop", "panel", "waste", "scrap", "recycling", "compost", "water", "ro plant", "purification", "green",
        "సోలార్", "సౌరశక్తి", "మినరల్ వాటర్", "రీసైక్లింగ్", "వ్యర్థాలు",
        "सोलर", "सौर", "जल शोधन", "कचरा", "रीसाइक्लिंग"
    ]
}

# Synonyms & phonetic typo alias map to guarantee exact template mapping
TEMPLATE_ALIASES: Dict[str, list] = {
    "restaurant": [
        "restaurant", "restaurent", "restuarent", "resturant", "restraunt", "restarant", "restro",
        "hotel", "hotell", "mess", "dhaba", "biryani", "biriyani", "bhojanam", "canteen", "kitchen",
        "eatery", "food_court", "dining", "meals", "diner", "mandhi", "mandi", "bhojanalaya",
        "రెస్టారెంట్", "హోటల్", "మెస్", "ధాబా", "బిర్యానీ", "భోజనం", "భోజనశాల",
        "रेस्टोरेंट", "होटल", "ढाबा", "भोजनालय", "मेस"
    ],
    "tiffin_centre": ["tiffin", "tiffins", "fast_food", "fast food", "breakfast", "idli", "dosa", "snacks", "టిఫిన్", "టిఫిన్స్", "నాश्తా"],
    "tea_shop": ["tea", "chai", "coffee", "juice", "beverages", "టీ", "కాఫీ", "జ్యూస్", "చాయ్", "चाय", "कॉफ़ी"],
    "bakery": ["bakery", "cake", "pastry", "bread", "sweets", "confectionery", "బేకరీ", "స్వీట్స్", "बेकरी", "मिठाई"],
    "grocery_shop": ["grocery", "kirana", "kiranam", "provisions", "general_store", "general store", "provisional", "కిరాణా", "కిరాణం", "చిల్లర", "किराना"],
    "supermarket": ["supermarket", "mart", "dmart", "d-mart", "more", "hypermarket", "సూపర్_మార్కెట్"],
    "fruit_shop": ["fruit", "fruits", "పండ్ల", "పండ్లు", "फल"],
    "vegetable_shop": ["vegetable", "vegetables", "veggies", "greens", "కూరగాయలు", "సబ్జీ", "सब्जी"],
    "dairy_farm": ["dairy", "milk", "cattle", "cow", "buffalo", "ghee", "curd", "paneer", "పాడి", "పాలు", "డెయిరీ", "పాల కేంద్రం", "डेयरी", "दूध"],
    "poultry_farming": ["poultry", "chicken", "broiler", "meat", "egg", "eggs", "కోళ్ల", "చికెన్", "గుడ్లు", "मुर्गी", "अंडा"],
    "mobile_repair": ["mobile", "cell", "phone", "repair", "screen", "మొబైల్", "రిపేర్", "मोबाइल"],
    "solar_maintenance": ["solar", "pv", "panel", "cleaning", "సోలార్", "सौर"]
}

def clean_input_text(text: str) -> str:
    """Normalize input text by lowering and stripping special chars."""
    text = text.lower().strip()
    return re.sub(r"[^\w\s\u0C00-\u0C7F\u0900-\u097F]", " ", text)

def classify_business_idea(raw_input: str) -> Tuple[str, str, float]:
    """
    Classifies raw business text into (Category Slug, Standardized Business Name, Confidence Score).
    Handles Telugu, Hindi, English colloquial phrasing and common typing variations.
    """
    cleaned = clean_input_text(raw_input)
    words = [w for w in cleaned.split() if w not in STOPWORDS]

    # 1. Check for direct match in predefined ideas
    for cat in BUSINESS_CATEGORIES:
        for idea in cat["ideas"]:
            name_en = idea["name_en"].lower()
            name_te = idea["name_te"].lower()
            name_hi = idea["name_hi"].lower()

            if any(name in cleaned for name in [name_en, name_te, name_hi]):
                return cat["slug"], idea["name_en"], 0.95
            
            # Check individual word overlaps
            idea_words = set(name_en.split() + name_te.split() + name_hi.split())
            overlap = set(words).intersection(idea_words)
            if len(overlap) >= 2:
                return cat["slug"], idea["name_en"], 0.88

    # 2. Check alias templates (handles common typos like 'restaurent')
    for tmpl_key, aliases in TEMPLATE_ALIASES.items():
        if any(a in cleaned for a in aliases) or any(any(a in w for w in words) for a in aliases):
            for cat in BUSINESS_CATEGORIES:
                for idea in cat["ideas"]:
                    if idea["slug"] == tmpl_key or tmpl_key in idea["slug"]:
                        return cat["slug"], idea["name_en"], 0.95

    # 3. Keyword scoring across categories
    best_cat = "retail"  # default fallback
    best_score = 0
    total_matches = 0

    for cat_slug, kw_list in CATEGORY_KEYWORDS.items():
        score = 0
        for kw in kw_list:
            if kw in cleaned:
                score += 2 if len(kw) > 3 else 1
        if score > best_score:
            best_score = score
            best_cat = cat_slug
        total_matches += score

    # Clean standardized title from words
    title_words = [w.capitalize() for w in words[:4]]
    standardized_title = " ".join(title_words) if title_words else raw_input.strip().title()

    if best_score >= 3:
        confidence = 0.85
    elif best_score >= 1:
        confidence = 0.70
    else:
        confidence = 0.50  # Low confidence

    return best_cat, standardized_title, confidence

def get_or_create_business_profile(raw_input: str, category_slug: str = None) -> Dict[str, Any]:
    """
    Generates a dynamic Business-Specific Profile ensuring different businesses use different relevant data.
    """
    detected_cat, standardized_title, confidence = classify_business_idea(raw_input)
    if category_slug:
        detected_cat = category_slug

    clean_key = standardized_title.lower().replace(" ", "_")
    input_lower = raw_input.lower()
    matched_template_key = None

    for tmpl_key, aliases in TEMPLATE_ALIASES.items():
        if tmpl_key in clean_key or any(a in clean_key or a in input_lower for a in aliases):
            matched_template_key = tmpl_key
            break

    if matched_template_key and matched_template_key in DEFAULT_PROFILES:
        profile = dict(DEFAULT_PROFILES[matched_template_key])
        profile["confidence"] = confidence
        profile["raw_input"] = raw_input
        profile["business_name"] = standardized_title
        return profile

    # Category-based fallback generation for custom enterprises
    cat_info = CATEGORY_MAP.get(detected_cat, BUSINESS_CATEGORIES[0])

    profile = {
        "business_name": standardized_title,
        "category_slug": detected_cat,
        "category_name_en": cat_info["name_en"],
        "category_name_te": cat_info["name_te"],
        "category_name_hi": cat_info["name_hi"],
        "confidence": confidence,
        "raw_input": raw_input,
        "search_keywords": [standardized_title.lower(), detected_cat],
        "competitor_keywords": [standardized_title.lower(), cat_info["name_en"].lower()],
        "indirect_keywords": [],
        "direct_osm_tags": [f"shop={detected_cat}", f"craft={detected_cat}"],
        "indirect_osm_tags": [],
        "exclude_osm_tags": [],
        "exclude_keywords": [],
        "supporting_poi_tags": ["highway=bus_stop", "amenity=bank", "amenity=marketplace"],
        "customer_segments": ["Local Residents & Households", "Small Commercial Establishments", "Passersby & Commuters"],
        "supplier_categories": ["Regional Wholesale Distributors", "Local Agri/Trade Suppliers"],
        "infrastructure_requirements": ["Grid Electricity Connection", "All-Weather Road Access", "Mobile Data / UPI Connectivity"],
        "relevant_demographics": ["Local Population & Household Density", "Village/Town Commercial Activity"],
        "relevant_environmental_factors": ["Seasonal Monsoon and Summer Heat Patterns"],
        "relevant_risk_factors": ["Local Purchasing Power Sensitivity", "Credit Default / Working Capital Shortage"],
        "relevant_price_indicators": ["Average Product/Service Ticket: Local Andhra Rural Benchmark"],
        "relevant_accessibility_factors": ["Distance to Main Village Junction or State Highway"]
    }

    # Strict domain isolation
    if detected_cat == "food_beverages":
        profile["direct_osm_tags"] = ["amenity=restaurant", "amenity=fast_food", "amenity=food_court"]
        profile["indirect_osm_tags"] = ["amenity=cafe", "shop=bakery", "shop=sweets"]
        profile["indirect_keywords"] = ["cafe", "coffee", "tea", "bakery", "sweets", "snacks"]
        profile["exclude_osm_tags"] = ["shop=supermarket", "shop=convenience", "shop=grocery", "shop=dairy", "shop=clothes", "shop=hardware", "amenity=marketplace"]
        profile["exclude_keywords"] = ["supermarket", "mart", "dmart", "d-mart", "more", "spencer", "walmart", "kirana", "grocery", "dairy", "diary", "milk", "medical", "pharmacy", "hardware", "cloth"]
        profile["relevant_demographics"] = ["Residential Population Density", "Daily Street Footfall"]
        profile["relevant_price_indicators"] = ["Food / Dining Average Ticket: Local Benchmark"]
    elif detected_cat == "retail":
        profile["direct_osm_tags"] = ["shop=convenience", "shop=grocery", "shop=general", "shop=supermarket"]
        profile["indirect_osm_tags"] = ["amenity=marketplace", "shop=department_store"]
        profile["indirect_keywords"] = ["market", "bazaar", "mart"]
        profile["exclude_osm_tags"] = ["amenity=restaurant", "amenity=fast_food", "amenity=cafe", "shop=dairy"]
        profile["exclude_keywords"] = ["restaurant", "hotel", "mess", "dhaba", "biryani", "cowshed", "dairy farm"]
        profile["relevant_demographics"] = ["Residential Catchment Households"]
        profile["relevant_price_indicators"] = ["Retail FMCG & Daily Need Basket: Local APMC Benchmark"]
    elif detected_cat == "dairy_livestock":
        profile["direct_osm_tags"] = ["shop=dairy", "craft=dairy", "building=cowshed", "landuse=farmyard"]
        profile["indirect_osm_tags"] = ["shop=farm"]
        profile["exclude_osm_tags"] = ["amenity=restaurant", "amenity=fast_food", "shop=supermarket", "shop=convenience", "shop=clothes"]
        profile["exclude_keywords"] = ["restaurant", "hotel", "mess", "supermarket", "dmart", "more", "spencer", "kirana", "grocery"]
        profile["supporting_poi_tags"] = ["amenity=veterinary", "shop=agrarian"]
        profile["relevant_demographics"] = ["Total Agricultural Households", "Livestock Count in District"]
        profile["relevant_price_indicators"] = ["Farmgate Milk APMC Benchmark"]
    elif detected_cat == "agriculture_farming":
        profile["direct_osm_tags"] = ["shop=agrarian", "building=farm", "landuse=farmyard", "shop=seeds"]
        profile["indirect_osm_tags"] = ["amenity=marketplace"]
        profile["exclude_osm_tags"] = ["amenity=restaurant", "shop=supermarket", "shop=clothes"]
        profile["exclude_keywords"] = ["restaurant", "hotel", "supermarket", "dmart", "more"]
        profile["supporting_poi_tags"] = ["amenity=veterinary", "shop=agrarian", "amenity=marketplace"]
        profile["relevant_demographics"] = ["Cultivated Land Area", "Farmer Population"]
        profile["relevant_price_indicators"] = ["APMC Mandi Farmgate Price"]
    elif detected_cat in ["services", "digital_services"]:
        profile["direct_osm_tags"] = ["craft=electronics_repair", "shop=mobile_phone", "amenity=internet_cafe"]
        profile["indirect_osm_tags"] = ["shop=electronics", "shop=computer"]
        profile["exclude_osm_tags"] = ["amenity=restaurant", "shop=supermarket", "shop=dairy"]
        profile["exclude_keywords"] = ["restaurant", "hotel", "supermarket", "dmart", "more", "dairy", "milk", "kirana"]
        profile["supporting_poi_tags"] = ["amenity=college", "amenity=bus_station", "amenity=bank"]
        profile["relevant_demographics"] = ["Youth Population (15-35)", "Smartphone & Digital Adoption"]

    return profile
