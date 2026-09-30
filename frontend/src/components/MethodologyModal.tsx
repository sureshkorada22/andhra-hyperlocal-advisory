import React from 'react';
import { createPortal } from 'react-dom';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { BookOpen, X, ShieldCheck, AlertTriangle } from 'lucide-react';

interface MethodologyModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({
  language,
  isOpen,
  onClose,
}) => {
  const t = translations[language];
  if (!isOpen) return null;

  const sourcesData = {
    te: [
      {
        name: "భారత జనగణన 2011 (Census of India)",
        provider: "రిజిస్ట్రార్ జనరల్ & సెన్సస్ కమిషనర్ కార్యాలయం, భారత ప్రభుత్వం",
        year: "2011 (అధికారిక చట్టబద్ధ బేస్‌లైన్)",
        level: "జిల్లా స్థాయి (ఆంధ్రప్రదేశ్ లోని 26 జిల్లాలు)",
        indicator: "మొత్తం జనాభా, పురుషులు/స్త్రీలు, లింగ నిష్పత్తి, గృహాల సంఖ్య, జనసాంద్రత, అక్షరాస్యత రేటు, కార్మికుల విభజన, వ్యవసాయ కూలీలు",
        method: "అధికారిక డీసీఏ (District Census Handbook) & పీసీఏ (Primary Census Abstract) గణాంకాలు",
        status: "Statutory Baseline",
        confidence: "High (Official Statutory)",
        url: "https://censusindia.gov.in",
        limitations: "జిల్లా పరిపాలనా బేస్‌లైన్‌ను సూచిస్తుంది. వ్యాపార క్యాచ్‌మెంట్ కోసం ప్రస్తుత ఓఎస్ఎమ్ సెటిల్‌మెంట్లతో సమన్వయం చేయబడింది."
      },
      {
        name: "ఆంధ్రప్రదేశ్ ఆర్థిక & గణాంకాల డైరెక్టరేట్ (AP DES)",
        provider: "ప్రణాళికా విభాగం, ఆంధ్రప్రదేశ్ ప్రభుత్వం",
        year: "2024-25",
        level: "జిల్లా & మండల స్థాయి",
        indicator: "జిల్లా స్థూల ఉత్పత్తి (GDDP), తలసరి ఆదాయం, ఆర్థిక సూచికలు, మండల మౌలిక వసతులు",
        method: "వార్షిక సామాజిక-ఆర్థిక సర్వే & ఏపీ గణాంక దర్శిని నివేదికలు",
        status: "Official AP State Benchmark",
        confidence: "High (State Government)",
        url: "https://des.ap.gov.in",
        limitations: "స్థూల ఆర్థిక సూచికలు; సూక్ష్మ వ్యాపార విక్రయాల ఖచ్చితమైన లావాదేవీలకు స్థానిక మార్కెట్ అధ్యయనం అవసరం."
      },
      {
        name: "ఓపెన్‌స్ట్రీట్‌మ్యాప్ (OpenStreetMap Overpass API)",
        provider: "ఓపెన్‌స్ట్రీట్‌మ్యాప్ ఫౌండేషన్ & గ్లోబల్ కమ్యూనిటీ",
        year: "2026 (లైవ్ రియల్-టైమ్)",
        level: "ఖచ్చితమైన రేడియస్ పరిధి (హైపర్‌లోకల్)",
        indicator: "పోటీ వ్యాపారాలు, కిరాణా, సర్వీస్ సెంటర్లు, బ్యాంకులు, రోడ్లు, రవాణా స్టాపులు",
        method: "ప్రత్యక్ష జియో-స్పేషియల్ రేడియస్ హావర్‌సైన్ డిస్టెన్స్ ఫార్ములా & ఎంటిటీ డూప్లికేషన్ నిర్మూలన",
        status: "Verified / Observed Live",
        confidence: "Medium to High",
        url: "https://www.openstreetmap.org",
        limitations: "డిజిటల్ మ్యాపింగ్ లేని అతి చిన్న అసంఘటిత గ్రామీణ దుకాణాలు నమోదు కాకపోవచ్చు."
      },
      {
        name: "ఏపీ వ్యవసాయ మార్కెటింగ్ శాఖ (APMC Mandis)",
        provider: "వ్యవసాయ మార్కెటింగ్ శాఖ, ఆంధ్రప్రదేశ్ ప్రభుత్వం",
        year: "2024-25",
        level: "జిల్లా & మార్కెట్ యార్డ్ స్థాయి",
        indicator: "వరి, మిర్చి, పత్తి, వేరుశనగ, పప్పుధాన్యాల కనీస/గరిష్ట మార్కెట్ ధరలు & యార్డ్ లభ్యత",
        method: "ఈ-నామ్ (e-NAM) మరియు ఏపీ మార్కెట్ యార్డుల రోజువారీ బులెటిన్లు",
        status: "Verified APMC Benchmark",
        confidence: "High",
        url: "https://market.ap.nic.in",
        limitations: "ట్రేడింగ్ నాణ్యత గ్రేడ్, తేమ మరియు రవాణా వ్యయాలను బట్టి స్థానిక ధరల్లో స్వల్ప వ్యత్యాసం ఉండవచ్చు."
      },
      {
        name: "ఏపీ పశుసంవర్ధక శాఖ & ఏపీడీడీసీఎఫ్ (Dairy & Livestock)",
        provider: "పశుసంవర్ధక శాఖ & ఏపీ పాల సమాఖ్య (APDDCF)",
        year: "2024-25",
        level: "జిల్లా స్థాయి",
        indicator: "ఆవు మరియు గేదె పాల సేకరణ ధరలు, పశువుల జనాభా, పౌల్ట్రీ ధరలు, పశుగ్రాసం లభ్యత",
        method: "విశాఖ డైరీ, సంగం డైరీ మరియు ఏపీడీడీసీఎఫ్ అధికారిక సేకరణ చార్టులు",
        status: "Verified Livestock Benchmark",
        confidence: "High",
        url: "https://ahd.ap.gov.in",
        limitations: "పాలలోని వెన్న శాతం (FAT) మరియు ఎస్ఎన్ఎఫ్ (SNF) ఆధారంగా రైతుకు చెల్లించే అసలు ధర మారుతుంది."
      },
      {
        name: "ఓపెన్-మీటియో వెదర్ మోడల్ (Open-Meteo)",
        provider: "ఓపెన్-మీటియో గ్లోబల్ మెటియోరలాజికల్ సర్వీస్",
        year: "2026 (లైవ్ శాటిలైట్)",
        level: "ఖచ్చితమైన లాటిట్యూడ్ & లాంగిట్యూడ్ గ్రిడ్ (1-2 కిమీ)",
        indicator: "ప్రస్తుత ఉష్ణోగ్రత, గరిష్ట ఉష్ణోగ్రత, తేమ శాతం, వర్షపాతం, కాలానుగుణ వాతావరణ రిస్క్",
        method: "హై-రిజల్యూషన్ ఈసీఎండబ్ల్యూఎఫ్ (ECMWF) శాటిలైట్ మోడల్",
        status: "Real-time Live",
        confidence: "High",
        url: "https://open-meteo.com",
        limitations: "స్వల్పకాలిక వాతావరణ సూచనలు; దీర్ఘకాలిక వ్యవసాయానికి కాలానుగుణ ఋతుపవనాల చరిత్ర అవసరం."
      },
      {
        name: "ఏపీ మత్స్య శాఖ (AP Fisheries Department)",
        provider: "మత్స్య శాఖ, ఆంధ్రప్రదేశ్ ప్రభుత్వం",
        year: "2024-25",
        level: "తీరప్రాంత & జిల్లా స్థాయి",
        indicator: "చేపలు మరియు రొయ్యల (వనామి) చెరువుల విస్తీర్ణం, ఫాం-గేట్ ట్రేడింగ్ రేట్లు, శీతల గిడ్డంగులు",
        method: "ఏపీ మత్స్య శాఖ వార్షిక ప్రొడక్షన్ బులెటిన్లు",
        status: "Verified Aqua Benchmark",
        confidence: "High",
        url: "https://fisheries.ap.gov.in",
        limitations: "అంతర్జాతీయ ఎగుమతి డిమాండ్ మరియు రవాణా ఐస్ లభ్యతను బట్టి ఆక్వా ధరలు వేగంగా మారతాయి."
      }
    ],
    hi: [
      {
        name: "भारत की जनगणना 2011 (Census of India)",
        provider: "रजिस्ट्रार जनरल और जनगणना आयुक्त कार्यालय, भारत सरकार",
        year: "2011 (सांविधिक आधिकारिक आधारभूत डेटा)",
        level: "जिला स्तर (आंध्र प्रदेश के सभी 26 जिले)",
        indicator: "कुल जनसंख्या, लिंग अनुपात, परिवारों की संख्या, जनसंख्या घनत्व, साक्षरता दर, मुख्य व सीमांत श्रमिक",
        method: "आधिकारिक प्राथमिक जनगणना सार (PCA) और जिला जनगणना पुस्तिका (DCHB)",
        status: "Statutory Baseline",
        confidence: "High (Official Statutory)",
        url: "https://censusindia.gov.in",
        limitations: "यह आधिकारिक प्रशासनिक आधार है। स्थानीय व्यावसायिक प्रभाव क्षेत्र के लिए इसे वर्तमान ओएसएम आबादी नोड्स से जोड़ा गया है।"
      },
      {
        name: "आंध्र प्रदेश अर्थशास्त्र और सांख्यिकी निदेशालय (AP DES)",
        provider: "योजना विभाग, आंध्र प्रदेश सरकार",
        year: "2024-25",
        level: "जिला और मंडल स्तर",
        indicator: "सकल जिला घरेलू उत्पाद (GDDP), प्रति व्यक्ति आय, आर्थिक विकास दर और मंडल स्तरीय बुनियादी ढांचा",
        method: "वार्षिक सामाजिक-आर्थिक सर्वेक्षण और आंध्र प्रदेश सांख्यिकी डायरी",
        status: "Official AP State Benchmark",
        confidence: "High (State Government)",
        url: "https://des.ap.gov.in",
        limitations: "मैक्रो-इकोनॉमिक रुझान दर्शाते हैं; जमीनी स्तर पर विशिष्ट स्थानीय बिक्री के लिए मौके का सत्यापन आवश्यक है।"
      },
      {
        name: "ओपनस्ट्रीटमैप (OpenStreetMap Overpass API)",
        provider: "ओपनस्ट्रीटमैप फाउंडेशन और वैश्विक समुदाय",
        year: "2026 (रीयल-टाइम लाइव)",
        level: "सटीक त्रिज्या दायरा (हाइपरलोकल)",
        indicator: "प्रतियोगी स्टोर, किराना, सेवाएं, बैंक, सड़कें, बस स्टॉप और सार्वजनिक सुविधाएं",
        method: "रीयल-टाइम जियो-स्पेशियल क्वेरी और डुप्लीकेट प्रविष्टियों का समाधान",
        status: "Verified / Observed Live",
        confidence: "Medium to High",
        url: "https://www.openstreetmap.org",
        limitations: "डिजिटल रूप से गैर-पंजीकृत छोटे असंगठित ग्रामीण उद्यमों का रिकॉर्ड छूट सकता है।"
      },
      {
        name: "आंध्र प्रदेश कृषि विपणन समितियां (APMC Mandis)",
        provider: "कृषि विपणन विभाग, आंध्र प्रदेश सरकार",
        year: "2024-25",
        level: "जिला और मंडी स्तर",
        indicator: "धान, मिर्च, कपास, मूंगफली और दालों के न्यूनतम/अधिकतम मंडी भाव व यार्ड",
        method: "ई-नाम (e-NAM) और स्थानीय कृषि उपज मंडी दैनिक मूल्य बुलेटिन",
        status: "Verified APMC Benchmark",
        confidence: "High",
        url: "https://market.ap.nic.in",
        limitations: "जिंसों की गुणवत्ता, नमी और दैनिक मांग के अनुसार कीमतों में उतार-चढ़ाव संभव है।"
      },
      {
        name: "आंध्र प्रदेश पशुपालन विभाग और APDDCF (डेयरी और पशुधन)",
        provider: "पशुपालन विभाग व दुग्ध महासंघ (APDDCF)",
        year: "2024-25",
        level: "जिला स्तर",
        indicator: "गाय और भैंस के दूध का खरीद मूल्य, पशु गणना, पोल्ट्री दरें और चारा उपलब्धता",
        method: "विशाखा डेयरी, संगम डेयरी और आंध्र प्रदेश दुग्ध महासंघ के खरीद चार्ट",
        status: "Verified Livestock Benchmark",
        confidence: "High",
        url: "https://ahd.ap.gov.in",
        limitations: "दूध की वसा (FAT) और एसएनएफ (SNF) की मात्रा पर किसान का वास्तविक भुगतान निर्भर करता है।"
      },
      {
        name: "ओपन-मीटियो उपग्रह मौसम मॉडल (Open-Meteo)",
        provider: "ओपन-मीटियो वैश्विक मौसम विज्ञान सेवा",
        year: "2026 (लाइव उपग्रह)",
        level: "सटीक अक्षांश-देशांतर ग्रिड (1-2 किमी)",
        indicator: "वर्तमान तापमान, आर्द्रता, वर्षा की मात्रा और मौसमी जलवायु जोखिम",
        method: "उच्च-सटीक ईसीएमडब्ल्यूएफ (ECMWF) उपग्रह पूर्वानुमान मॉडल",
        status: "Real-time Live",
        confidence: "High",
        url: "https://open-meteo.com",
        limitations: "अल्पकालिक मौसम स्थितियों को दर्शाता है; मौसमी फसलों के लिए दीर्घावधि पैटर्न देखना चाहिए।"
      },
      {
        name: "आंध्र प्रदेश मत्स्य विभाग (AP Fisheries)",
        provider: "मत्स्य विभाग, आंध्र प्रदेश सरकार",
        year: "2024-25",
        level: "तटीय और जिला स्तर",
        indicator: "मछली व झींगा (Vannamei) तालाब क्षेत्र, फार्मगेट दरें और कोल्ड स्टोरेज",
        method: "आंध्र प्रदेश मत्स्य विभाग के आधिकारिक उत्पादन आंकड़े",
        status: "Verified Aqua Benchmark",
        confidence: "High",
        url: "https://fisheries.ap.gov.in",
        limitations: "अंतरराष्ट्रीय निर्यात मांग और आइस आपूर्ति के आधार पर जलीय कृषि मूल्य तेजी से बदलते हैं।"
      }
    ],
    en: [
      {
        name: "Census of India 2011",
        provider: "Office of the Registrar General & Census Commissioner, Govt. of India",
        year: "2011 (Statutory Administrative Benchmark)",
        level: "District Level (All 26 Districts of AP)",
        indicator: "Total Population, Male/Female Split, Sex Ratio, Households, Population Density, Literacy, Cultivators & Agricultural Labourers",
        method: "Primary Census Abstract (PCA) and District Census Handbooks (DCHB)",
        status: "Statutory Official Baseline",
        confidence: "High (Statutory Administrative)",
        url: "https://censusindia.gov.in",
        limitations: "Official baseline at district administrative tier; spatial projections combine this baseline with live OSM settlement nodes for catchment estimates."
      },
      {
        name: "AP Directorate of Economics and Statistics (DES)",
        provider: "Planning Department, Government of Andhra Pradesh",
        year: "2024-25",
        level: "District & Mandal Level",
        indicator: "Gross District Domestic Product (GDDP), Per Capita Income, Sectoral Growth, Mandal Demographic Profiling",
        method: "Annual Socio-Economic Survey and AP Statistical Abstract",
        status: "Official State Benchmark",
        confidence: "High (State Authority)",
        url: "https://des.ap.gov.in",
        limitations: "Macro-level economic indicators; micro-enterprise footfall requires on-the-ground validation."
      },
      {
        name: "OpenStreetMap (Overpass API)",
        provider: "OpenStreetMap Foundation & Global Contributor Community",
        year: "2026 (Live / Real-Time)",
        level: "Catchment Radius Level (Hyperlocal)",
        indicator: "Verified Business POIs, Kirana Stores, Workshops, Direct & Indirect Competitors, Highway Networks, Public Transit",
        method: "Live geospatial radius querying with multi-mirror fallback, geodesic Haversine distance, and entity resolution",
        status: "Verified / Observed Live",
        confidence: "Medium to High",
        url: "https://www.openstreetmap.org",
        limitations: "Small unmapped rural informal businesses may not have digital records in open geographic databases."
      },
      {
        name: "AP Agricultural Marketing Department (APMC Mandis)",
        provider: "Department of Agricultural Marketing, Govt. of Andhra Pradesh",
        year: "2024-25",
        level: "District & APMC Market Yard Level",
        indicator: "Paddy, Chilli, Cotton, Groundnut, Pulses Commodity Prices, Market Yard Infrastructure",
        method: "National Agriculture Market (e-NAM) and daily APMC trading rate cards",
        status: "Verified APMC Benchmark",
        confidence: "High",
        url: "https://market.ap.nic.in",
        limitations: "Local mandi prices fluctuate daily based on specific grade, moisture content, and trading volume."
      },
      {
        name: "AP Department of Animal Husbandry & APDDCF",
        provider: "Animal Husbandry Department & AP Dairy Development Cooperative Federation",
        year: "2024-25",
        level: "District Level",
        indicator: "Cow & Buffalo Milk Farmgate Procurement Prices, Livestock Population, Poultry Farm Economics, Cattle Feed",
        method: "Official procurement rate cards from Visakha Dairy, Sangam Milk Union, and APDDCF",
        status: "Verified Livestock Benchmark",
        confidence: "High",
        url: "https://ahd.ap.gov.in",
        limitations: "Actual realization depends on individual sample testing for Fat% and Solid-Not-Fat (SNF)%."
      },
      {
        name: "Open-Meteo Global Meteorological API",
        provider: "Open-Meteo Global Meteorological Service",
        year: "2026 (Live Satellite Model)",
        level: "Precision Coordinate Grid (1-2 km)",
        indicator: "Real-time Temperature, Daily Max/Min, Humidity, Precipitation, Climate Suitability, Heat/Drought Risk",
        method: "Live high-resolution ECMWF / GFS satellite meteorological models",
        status: "Real-time Live",
        confidence: "High",
        url: "https://open-meteo.com",
        limitations: "Short-term weather observation; seasonal micro-enterprise planning requires multi-year seasonal insights."
      },
      {
        name: "AP Fisheries Department",
        provider: "Department of Fisheries, Government of Andhra Pradesh",
        year: "2024-25",
        level: "Coastal & District Level",
        indicator: "Freshwater Fish & Vannamei Shrimp Pond Density, Farmgate Trading Rates, Cold Storage Proximity",
        method: "AP Fisheries Statistical Reports and District Aquaculture Handbooks",
        status: "Verified Aqua Benchmark",
        confidence: "High",
        url: "https://fisheries.ap.gov.in",
        limitations: "Export demand and local ice plant availability cause rapid farmgate price fluctuations."
      }
    ]
  };

  const currentSources = sourcesData[language] || sourcesData.en;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-300 border-b-[4px] border-b-slate-400 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3.5">
          <div className="flex items-center gap-3 text-emerald-700">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                {t.methodologyModalTitle}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {t.methodologySubtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700">
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
            <h4 className="font-extrabold text-emerald-950 mb-1.5 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.ruleZeroFakeHeading}</span>
            </h4>
            <p className="text-xs text-emerald-900 leading-relaxed font-medium">
              {t.ruleZeroFakeDesc}
            </p>
          </div>

          <div className="space-y-3.5">
            {currentSources.map((src: any, idx: number) => (
              <div key={idx} className="p-4 sm:p-5 rounded-2xl border border-slate-300 border-b-[3.5px] border-b-slate-300 hover:border-emerald-300 bg-white shadow-2xs transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <div>
                    <h5 className="font-black text-slate-900 text-sm sm:text-base">{src.name}</h5>
                    <div className="text-2xs font-bold text-slate-500 mt-0.5">
                      {src.provider} · <span className="text-emerald-700">{src.year}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-2xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {src.status}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-2xs font-extrabold bg-indigo-100 text-indigo-800 border border-indigo-300">
                      {src.level}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-2.5">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-600 block text-2xs uppercase tracking-wider mb-0.5">{t.indicatorLabel}</span>
                    <span className="text-slate-800 font-semibold">{src.indicator}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-600 block text-2xs uppercase tracking-wider mb-0.5">{t.methodLabel}</span>
                    <span className="text-slate-800 font-semibold">{src.method}</span>
                  </div>
                </div>

                <div className="text-xs bg-amber-50/70 p-3 rounded-xl border border-amber-200 text-slate-700 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span className="font-medium">
                      <strong className="text-amber-950 font-black">{t.limitationLabel} </strong>{src.limitations}
                    </span>
                  </div>
                  {src.url && (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-3xs font-black text-emerald-700 hover:text-emerald-900 bg-white px-2.5 py-1 rounded-lg border border-emerald-300 shrink-0 shadow-2xs inline-flex items-center gap-1 hover:underline"
                    >
                      Portal Link ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button onClick={onClose} className="btn-3d-primary text-sm py-2.5 px-6">
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
