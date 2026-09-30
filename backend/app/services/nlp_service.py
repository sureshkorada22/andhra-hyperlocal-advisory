from typing import Dict, Any

def generate_ai_explanation(
    business_name: str,
    location_name: str,
    radius_km: float,
    opportunity_score: float,
    opportunity_label: str,
    market_gap: str,
    direct_count: int,
    indirect_count: int,
    households: int,
    accessibility_score: float,
    language: str = "te"
) -> Dict[str, str]:
    """
    Generates plain-language, rural micro-entrepreneur explanations in Telugu, Hindi, and English.
    Strictly grounded in deterministic analytics metrics:
      AI NEVER changes the Opportunity Score, Competitor Counts, or Risk Levels.
    """
    # 1. Telugu Explanation (తెలుగు)
    te_text = (
        f"{location_name} పరిధిలో ({radius_km} కి.మీ వ్యాసార్థంలో) '{business_name}' ప్రారంభించడానికి స్థానిక అవకాశ స్కోరు "
        f"100కి {opportunity_score:.1f} ({opportunity_label}) గా లెక్కించబడింది. "
        f"అందుబాటులో ఉన్న డేటా ప్రకారం, ఇక్కడ సుమారు {households:,} కుటుంబాలు నివసిస్తున్నాయి. "
        f"ప్రత్యక్ష పోటీదారులు {direct_count} మరియు పరోక్ష వ్యాపారాలు {indirect_count} గుర్తించబడ్డాయి. "
        f"మార్కెట్ గ్యాప్ '{market_gap}' గా ఉంది, రోడ్డు మరియు రవాణా సౌలభ్యం స్కోరు {accessibility_score:.0f}/100. "
    )
    if direct_count <= 2:
        te_text += "ఈ ప్రాంతంలో ప్రత్యక్ష పోటీ తక్కువగా ఉన్నందున, స్థానిక నాణ్యమైన సేవలతో మీరు మంచి ప్రారంభ ప్రయోజనాన్ని పొందవచ్చు. "
    else:
        te_text += f"ఇప్పటికే {direct_count} పోటీదారులు ఉన్నందున, సరసమైన ధరలు లేదా నాణ్యమైన కస్టమర్ సర్వీస్‌తో ప్రత్యేకతను చూపించడం అవసరం. "
    te_text += "ఈ ఫలితాలు అందుబాటులో ఉన్న నిజమైన స్థానిక డేటాపై ఆధారపడి ఉన్నాయి."

    # 2. Hindi Explanation (हिन्दी)
    hi_text = (
        f"{location_name} के {radius_km} किमी के दायरे में '{business_name}' शुरू करने के लिए स्थानीय अवसर स्कोर "
        f"100 में से {opportunity_score:.1f} ({opportunity_label}) है। "
        f"उपलब्ध आंकड़ों के अनुसार, इस क्षेत्र में लगभग {households:,} परिवार रहते हैं। "
        f"सीधे प्रतियोगी {direct_count} और अप्रत्यक्ष व्यवसाय {indirect_count} पाए गए हैं। "
        f"बाजार का अंतर '{market_gap}' स्तर पर है तथा सड़क और परिवहन सुगमता {accessibility_score:.0f}/100 है। "
    )
    if direct_count <= 2:
        hi_text += "सीधी प्रतिस्पर्धा कम होने के कारण आपके पास शुरुआती बढ़त बनाने का बेहतरीन मौका है। "
    else:
        hi_text += f"क्षेत्र में पहले से {direct_count} प्रतियोगी सक्रिय हैं, इसलिए ग्राहकों को आकर्षित करने के लिए गुणवत्ता और त्वरित सेवा पर ध्यान दें। "
    hi_text += "यह मूल्यांकन उपलब्ध स्थानीय आंकड़ों पर आधारित है।"

    # 3. English Explanation
    en_text = (
        f"For starting '{business_name}' around {location_name} ({radius_km} km radius), the local business opportunity score "
        f"is evaluated at {opportunity_score:.1f}/100 ({opportunity_label}). "
        f"Based on available datasets, this area supports an estimated catchment of ~{households:,} households. "
        f"We identified {direct_count} direct competitors and {indirect_count} indirect competitors in current records. "
        f"Market gap is evaluated as '{market_gap}', and road accessibility stands at {accessibility_score:.0f}/100. "
    )
    if direct_count <= 2:
        en_text += "Low direct competition provides a favorable early-mover advantage for catering to local demand. "
    else:
        en_text += f"With {direct_count} established direct competitors, focus on superior customer service, transparent pricing, and quality differentiation. "
    en_text += "Note: Calculations reflect verified and observable data sources without speculative inflation."

    return {
        "te": te_text,
        "hi": hi_text,
        "en": en_text,
        "selected_language_text": te_text if language == "te" else (hi_text if language == "hi" else en_text)
    }
