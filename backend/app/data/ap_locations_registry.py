"""
Comprehensive Andhra Pradesh Location & Mandal Registry.
Coverage: All 26 Reorganized Districts of Andhra Pradesh.
Includes Headquarters, Municipalities, Major Mandals, Towns, Rural Growth Centers, and Pilgrimage Hubs.
Includes English names, Telugu script names, and extensive spelling/alias variations.
"""

from typing import List, Dict, Any, Optional

AP_COMPREHENSIVE_LOCATIONS: List[Dict[str, Any]] = [
    {
        "village_or_town": "Paderu",
        "name_te": "పాడేరు",
        "aliases": [
            "paderu agency",
            "పాడేరు"
        ],
        "mandal": "Paderu Mandal",
        "district": "Alluri Sitharama Raju",
        "postal_code": "531024",
        "latitude": 18.0833,
        "longitude": 82.6667,
        "is_hq": True,
        "is_popular": True
    },
    {
        "village_or_town": "Araku Valley",
        "name_te": "అరకు లోయ",
        "aliases": [
            "araku",
            "araku valley",
            "coffee valley",
            "అరకు"
        ],
        "mandal": "Araku Valley Mandal",
        "district": "Alluri Sitharama Raju",
        "postal_code": "531149",
        "latitude": 18.3333,
        "longitude": 82.8833,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Chintapalle",
        "name_te": "చింతపల్లి",
        "aliases": [
            "chintapalli",
            "chintapalli rars",
            "చింతపల్లి"
        ],
        "mandal": "Chintapalle Mandal",
        "district": "Alluri Sitharama Raju",
        "postal_code": "531111",
        "latitude": 17.8667,
        "longitude": 82.35,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Lambasingi",
        "name_te": "లంబసింగి",
        "aliases": [
            "lammasingi",
            "kashmir of ap",
            "లంబసింగి"
        ],
        "mandal": "Chintapalle Mandal",
        "district": "Alluri Sitharama Raju",
        "postal_code": "531111",
        "latitude": 17.8167,
        "longitude": 82.4833,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Maredumilli",
        "name_te": "మారేడుమిల్లి",
        "aliases": [
            "maredumilli eco tourism",
            "మారేడుమిల్లి"
        ],
        "mandal": "Maredumilli Mandal",
        "district": "Alluri Sitharama Raju",
        "postal_code": "533295",
        "latitude": 17.6,
        "longitude": 81.7,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Rampachodavaram",
        "name_te": "రంపచోడవరం",
        "aliases": [
            "rampa agency",
            "rampa chodavaram",
            "రంపచోడవరం"
        ],
        "mandal": "Rampachodavaram Mandal",
        "district": "Alluri Sitharama Raju",
        "postal_code": "533288",
        "latitude": 17.45,
        "longitude": 81.7833,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Addateegala",
        "name_te": "అడ్డతీగల",
        "aliases": [
            "addateegala mandal",
            "అడ్డతీగల"
        ],
        "mandal": "Addateegala Mandal",
        "district": "Alluri Sitharama Raju",
        "postal_code": "533428",
        "latitude": 17.4833,
        "longitude": 82.0167,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Ananthagiri",
        "name_te": "అనంతగిరి",
        "aliases": [
            "ananthagiri coffee",
            "అనంతగిరి"
        ],
        "mandal": "Ananthagiri Mandal",
        "district": "Alluri Sitharama Raju",
        "postal_code": "535145",
        "latitude": 18.2333,
        "longitude": 83.0167,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Chintoor",
        "name_te": "చింతూరు",
        "aliases": [
            "chintoor mandal",
            "చింతూరు"
        ],
        "mandal": "Chintoor Mandal",
        "district": "Alluri Sitharama Raju",
        "postal_code": "507126",
        "latitude": 17.75,
        "longitude": 81.3833,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Devipatnam",
        "name_te": "దేవీపట్నం",
        "aliases": [
            "devipatnam godavari",
            "దేవీపట్నం"
        ],
        "mandal": "Devipatnam Mandal",
        "district": "Alluri Sitharama Raju",
        "postal_code": "533354",
        "latitude": 17.2833,
        "longitude": 81.65,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Anakapalli",
        "name_te": "అనకాపల్లి",
        "aliases": [
            "anakapalle",
            "bellam market",
            "jaggery market",
            "అనకాపల్లి",
            "అనకాపల్లె"
        ],
        "mandal": "Anakapalli Mandal",
        "district": "Anakapalli",
        "postal_code": "531001",
        "latitude": 17.6913,
        "longitude": 83.0039,
        "is_hq": True,
        "is_popular": True
    },
    {
        "village_or_town": "Atchutapuram",
        "name_te": "అచ్యుతాపురం",
        "aliases": [
            "atchutapuram sez",
            "అచ్యుతాపురం"
        ],
        "mandal": "Atchutapuram Mandal",
        "district": "Anakapalli",
        "postal_code": "531011",
        "latitude": 17.5167,
        "longitude": 83.0167,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Chodavaram",
        "name_te": "చోడవరం",
        "aliases": [
            "chodavaram sugar",
            "chodavaram town",
            "చోడవరం"
        ],
        "mandal": "Chodavaram Mandal",
        "district": "Anakapalli",
        "postal_code": "531036",
        "latitude": 17.8333,
        "longitude": 82.95,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Narsipatnam",
        "name_te": "నర్సీపట్నం",
        "aliases": [
            "narasipatnam",
            "narsipatnam town",
            "నర్సీపట్నం"
        ],
        "mandal": "Narsipatnam Mandal",
        "district": "Anakapalli",
        "postal_code": "531116",
        "latitude": 17.6667,
        "longitude": 82.6167,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Parawada",
        "name_te": "పరవాడ",
        "aliases": [
            "parawada pharma city",
            "పరవాడ"
        ],
        "mandal": "Parawada Mandal",
        "district": "Anakapalli",
        "postal_code": "531021",
        "latitude": 17.6333,
        "longitude": 83.1,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Payakaraopeta",
        "name_te": "పాయకరావుపేట",
        "aliases": [
            "payakaraopet",
            "payakaraopeta town",
            "పాయకరావుపేట"
        ],
        "mandal": "Payakaraopeta Mandal",
        "district": "Anakapalli",
        "postal_code": "533401",
        "latitude": 17.35,
        "longitude": 82.5667,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Yelamanchili",
        "name_te": "ఎలమంచిలి",
        "aliases": [
            "elamanchili",
            "yelamanchili town",
            "ఎలమంచిలి",
            "యలమంచిలి"
        ],
        "mandal": "Yelamanchili Mandal",
        "district": "Anakapalli",
        "postal_code": "531055",
        "latitude": 17.55,
        "longitude": 82.8667,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Devarapalle",
        "name_te": "దేవరపల్లి",
        "aliases": [
            "devarapalle anakapalli",
            "devarapalli eg",
            "దేవరపల్లి"
        ],
        "mandal": "Devarapalle Mandal",
        "district": "Anakapalli",
        "postal_code": "531030",
        "latitude": 17.9833,
        "longitude": 83.0167,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "K.Kotapadu",
        "name_te": "కె.కోటపాడు",
        "aliases": [
            "k kotapadu mandal",
            "కోటపాడు"
        ],
        "mandal": "K.Kotapadu Mandal",
        "district": "Anakapalli",
        "postal_code": "531039",
        "latitude": 17.9167,
        "longitude": 83.0333,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Kasimkota",
        "name_te": "కాశీంకోట",
        "aliases": [
            "kasimkota mandal",
            "కాశీంకోట"
        ],
        "mandal": "Kasimkota Mandal",
        "district": "Anakapalli",
        "postal_code": "531031",
        "latitude": 17.65,
        "longitude": 82.9667,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Kotauratla",
        "name_te": "కోటవురట్ల",
        "aliases": [
            "kotauratla mandal",
            "కోటవురట్ల"
        ],
        "mandal": "Kotauratla Mandal",
        "district": "Anakapalli",
        "postal_code": "531085",
        "latitude": 17.5667,
        "longitude": 82.6,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Madugula",
        "name_te": "మాడుగుల",
        "aliases": [
            "v madugula",
            "మాడుగుల"
        ],
        "mandal": "Madugula Mandal",
        "district": "Anakapalli",
        "postal_code": "531027",
        "latitude": 17.9167,
        "longitude": 82.8,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Munagapaka",
        "name_te": "మునగపాక",
        "aliases": [
            "munagapaka mandal",
            "మునగపాక"
        ],
        "mandal": "Munagapaka Mandal",
        "district": "Anakapalli",
        "postal_code": "531033",
        "latitude": 17.6167,
        "longitude": 82.95,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Rambilli",
        "name_te": "రాంబిల్లి",
        "aliases": [
            "rambilli mandal",
            "రాంబిల్లి"
        ],
        "mandal": "Rambilli Mandal",
        "district": "Anakapalli",
        "postal_code": "531061",
        "latitude": 17.4833,
        "longitude": 82.9667,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Anantapur",
        "name_te": "అనంతపురం",
        "aliases": [
            "ananthapuramu",
            "ananthapur",
            "అనంతపురం"
        ],
        "mandal": "Anantapur Urban",
        "district": "Ananthapuramu",
        "postal_code": "515001",
        "latitude": 14.6819,
        "longitude": 77.6006,
        "is_hq": True,
        "is_popular": True
    },
    {
        "village_or_town": "Ananthapuramu",
        "name_te": "అనంతపురం",
        "aliases": [
            "anantapur",
            "anantapuramu",
            "అనంతపురం"
        ],
        "mandal": "Ananthapuramu Urban",
        "district": "Ananthapuramu",
        "postal_code": "515001",
        "latitude": 14.6819,
        "longitude": 77.6006,
        "is_hq": True,
        "is_popular": True
    },
    {
        "village_or_town": "Gooty",
        "name_te": "గుత్తి",
        "aliases": [
            "gooty fort",
            "గుత్తి"
        ],
        "mandal": "Gooty Mandal",
        "district": "Ananthapuramu",
        "postal_code": "515401",
        "latitude": 15.1167,
        "longitude": 77.6333,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Guntakal",
        "name_te": "గుంతకల్లు",
        "aliases": [
            "guntakal railway division",
            "గుంతకల్లు"
        ],
        "mandal": "Guntakal Mandal",
        "district": "Ananthapuramu",
        "postal_code": "515801",
        "latitude": 15.1667,
        "longitude": 77.3667,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Kalyandurg",
        "name_te": "కళ్యాణదుర్గం",
        "aliases": [
            "kalyandurgam",
            "కళ్యాణదుర్గం"
        ],
        "mandal": "Kalyandurg Mandal",
        "district": "Ananthapuramu",
        "postal_code": "515761",
        "latitude": 14.55,
        "longitude": 77.1,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Rayadurg",
        "name_te": "రాయదుర్గం",
        "aliases": [
            "rayadurgam fort",
            "rayadurgam jeans",
            "రాయదుర్గం"
        ],
        "mandal": "Rayadurg Mandal",
        "district": "Ananthapuramu",
        "postal_code": "515865",
        "latitude": 14.7,
        "longitude": 76.85,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Tadipatri",
        "name_te": "తాడిపత్రి",
        "aliases": [
            "tadipatri cement",
            "tadpatri granite",
            "తాడిపత్రి"
        ],
        "mandal": "Tadipatri Mandal",
        "district": "Ananthapuramu",
        "postal_code": "515411",
        "latitude": 14.9167,
        "longitude": 78.0167,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Uravakonda",
        "name_te": "ఉరవకొండ",
        "aliases": [
            "uravakonda town",
            "ఉరవకొండ"
        ],
        "mandal": "Uravakonda Mandal",
        "district": "Ananthapuramu",
        "postal_code": "515812",
        "latitude": 14.95,
        "longitude": 77.2667,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Pamidi",
        "name_te": "పామిడి",
        "aliases": [
            "pamidi mandal",
            "పామిడి"
        ],
        "mandal": "Pamidi Mandal",
        "district": "Ananthapuramu",
        "postal_code": "515775",
        "latitude": 14.95,
        "longitude": 77.5833,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Rayachoti",
        "name_te": "రాయచోటి",
        "aliases": [
            "rayachoty",
            "రాయచోటి"
        ],
        "mandal": "Rayachoti Mandal",
        "district": "Annamayya",
        "postal_code": "516269",
        "latitude": 14.0558,
        "longitude": 78.7522,
        "is_hq": True,
        "is_popular": True
    },
    {
        "village_or_town": "Horsley Hills",
        "name_te": "హార్సిలీ హిల్స్",
        "aliases": [
            "enugu mallamma konda",
            "హార్సిలీ హిల్స్"
        ],
        "mandal": "B.Kothakota Mandal",
        "district": "Annamayya",
        "postal_code": "517357",
        "latitude": 13.65,
        "longitude": 78.4,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Madanapalle",
        "name_te": "మదనపల్లె",
        "aliases": [
            "bt college",
            "madanapalli",
            "madanapalli tomato market",
            "tomato market",
            "మదనపల్లి",
            "మదనపల్లె"
        ],
        "mandal": "Madanapalle Mandal",
        "district": "Annamayya",
        "postal_code": "517325",
        "latitude": 13.55,
        "longitude": 78.5,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Pileru",
        "name_te": "పీలేరు",
        "aliases": [
            "piler",
            "పీలేరు"
        ],
        "mandal": "Pileru Mandal",
        "district": "Annamayya",
        "postal_code": "517214",
        "latitude": 13.65,
        "longitude": 78.9333,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Railway Koduru",
        "name_te": "రైల్వే కోడూరు",
        "aliases": [
            "koduru annamayya",
            "రైల్వే కోడూరు"
        ],
        "mandal": "Railway Koduru Mandal",
        "district": "Annamayya",
        "postal_code": "516101",
        "latitude": 13.95,
        "longitude": 79.35,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Rajampet",
        "name_te": "రాజంపేట",
        "aliases": [
            "rajampeta",
            "రాజంపేట"
        ],
        "mandal": "Rajampet Mandal",
        "district": "Annamayya",
        "postal_code": "516115",
        "latitude": 14.1833,
        "longitude": 79.1667,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Galiveedu",
        "name_te": "గాలివీడు",
        "aliases": [
            "galiveedu solar",
            "గాలివీడు"
        ],
        "mandal": "Galiveedu Mandal",
        "district": "Annamayya",
        "postal_code": "516267",
        "latitude": 14.1,
        "longitude": 78.5167,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Nandalur",
        "name_te": "నందలూరు",
        "aliases": [
            "nandalur buddhist site",
            "నందలూరు"
        ],
        "mandal": "Nandalur Mandal",
        "district": "Annamayya",
        "postal_code": "516150",
        "latitude": 14.25,
        "longitude": 79.1167,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Valmikipuram",
        "name_te": "వాల్మీకిపురం (వాయల్పాడు)",
        "aliases": [
            "vayalpad",
            "వాల్మీకిపురం"
        ],
        "mandal": "Valmikipuram Mandal",
        "district": "Annamayya",
        "postal_code": "517299",
        "latitude": 13.65,
        "longitude": 78.6333,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Bapatla",
        "name_te": "బాపట్ల",
        "aliases": [
            "bapatla agriculture",
            "suryalanka beach",
            "బాపట్ల"
        ],
        "mandal": "Bapatla Mandal",
        "district": "Bapatla",
        "postal_code": "522101",
        "latitude": 15.9056,
        "longitude": 80.4686,
        "is_hq": True,
        "is_popular": True
    },
    {
        "village_or_town": "Addanki",
        "name_te": "అద్దంకి",
        "aliases": [
            "addanki historic",
            "addanki town",
            "అద్దంకి"
        ],
        "mandal": "Addanki Mandal",
        "district": "Bapatla",
        "postal_code": "523201",
        "latitude": 15.8167,
        "longitude": 79.9833,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Chirala",
        "name_te": "చీరాల",
        "aliases": [
            "chirala handlooms",
            "handlooms chirala",
            "mini mumbai",
            "textile town",
            "చీరాల"
        ],
        "mandal": "Chirala Mandal",
        "district": "Bapatla",
        "postal_code": "523155",
        "latitude": 15.8246,
        "longitude": 80.3522,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Nizampatnam",
        "name_te": "నిజాంపట్నం",
        "aliases": [
            "nizampatnam port",
            "నిజాంపట్నం"
        ],
        "mandal": "Nizampatnam Mandal",
        "district": "Bapatla",
        "postal_code": "522314",
        "latitude": 15.9,
        "longitude": 80.6667,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Parchur",
        "name_te": "పర్చూరు",
        "aliases": [
            "parchuru",
            "పర్చూరు"
        ],
        "mandal": "Parchur Mandal",
        "district": "Bapatla",
        "postal_code": "523169",
        "latitude": 15.9667,
        "longitude": 80.2667,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Repalle",
        "name_te": "రేపల్లె",
        "aliases": [
            "repalle town",
            "రేపల్లె"
        ],
        "mandal": "Repalle Mandal",
        "district": "Bapatla",
        "postal_code": "522265",
        "latitude": 16.0217,
        "longitude": 80.8492,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Bhattiprolu",
        "name_te": "భట్టిప్రోలు",
        "aliases": [
            "bhattiprolu stupa",
            "భట్టిప్రోలు"
        ],
        "mandal": "Bhattiprolu Mandal",
        "district": "Bapatla",
        "postal_code": "522256",
        "latitude": 16.1,
        "longitude": 80.7833,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Karamchedu",
        "name_te": "కారంచేడు",
        "aliases": [
            "karamchedu mandal",
            "కారంచేడు"
        ],
        "mandal": "Karamchedu Mandal",
        "district": "Bapatla",
        "postal_code": "523168",
        "latitude": 15.9,
        "longitude": 80.2667,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Vemuru",
        "name_te": "వేమూరు",
        "aliases": [
            "vemuru mandal",
            "వేమూరు"
        ],
        "mandal": "Vemuru Mandal",
        "district": "Bapatla",
        "postal_code": "522261",
        "latitude": 16.15,
        "longitude": 80.75,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Vetapalem",
        "name_te": "వేటపాలెం",
        "aliases": [
            "vetapalem cashew",
            "vetapalem library",
            "వేటపాలెం"
        ],
        "mandal": "Vetapalem Mandal",
        "district": "Bapatla",
        "postal_code": "523187",
        "latitude": 15.7833,
        "longitude": 80.3167,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Chittoor",
        "name_te": "చిత్తూరు",
        "aliases": [
            "chittoor city",
            "chittur",
            "mango pulp hub",
            "చిత్తూరు"
        ],
        "mandal": "Chittoor Urban",
        "district": "Chittoor",
        "postal_code": "517001",
        "latitude": 13.2172,
        "longitude": 79.1003,
        "is_hq": True,
        "is_popular": True
    },
    {
        "village_or_town": "Kanipakam",
        "name_te": "కాణిపాకం",
        "aliases": [
            "kanipakam vinayaka",
            "కాణిపాకం"
        ],
        "mandal": "Irala Mandal",
        "district": "Chittoor",
        "postal_code": "517131",
        "latitude": 13.2667,
        "longitude": 79.0333,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Kuppam",
        "name_te": "కుప్పం",
        "aliases": [
            "kuppam border",
            "kuppam dravidian university",
            "కుప్పం"
        ],
        "mandal": "Kuppam Mandal",
        "district": "Chittoor",
        "postal_code": "517425",
        "latitude": 12.75,
        "longitude": 78.3667,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Palamaner",
        "name_te": "పలమనేరు",
        "aliases": [
            "palamaneru",
            "palamaneru dairy",
            "పలమనేరు"
        ],
        "mandal": "Palamaner Mandal",
        "district": "Chittoor",
        "postal_code": "517408",
        "latitude": 13.2,
        "longitude": 78.75,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Punganur",
        "name_te": "పుంగనూరు",
        "aliases": [
            "punganur cow breed",
            "పుంగనూరు"
        ],
        "mandal": "Punganur Mandal",
        "district": "Chittoor",
        "postal_code": "517247",
        "latitude": 13.3667,
        "longitude": 78.5833,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Bangarupalem",
        "name_te": "బంగారుపాలెం",
        "aliases": [
            "bangarupalem mandal",
            "బంగారుపాలెం"
        ],
        "mandal": "Bangarupalem Mandal",
        "district": "Chittoor",
        "postal_code": "517416",
        "latitude": 13.1833,
        "longitude": 78.9667,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Gudipala",
        "name_te": "గుడిపాల",
        "aliases": [
            "gudipala mandal",
            "గుడిపాల"
        ],
        "mandal": "Gudipala Mandal",
        "district": "Chittoor",
        "postal_code": "517132",
        "latitude": 13.15,
        "longitude": 79.1333,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Karvetinagar",
        "name_te": "కార్వేటినగరం",
        "aliases": [
            "karvetinagaram",
            "కార్వేటినగరం"
        ],
        "mandal": "Karvetinagar Mandal",
        "district": "Chittoor",
        "postal_code": "517582",
        "latitude": 13.4167,
        "longitude": 79.4167,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Amalapuram",
        "name_te": "అమలాపురం",
        "aliases": [
            "amalapuram konaseema",
            "konaseema heart",
            "అమలాపురం"
        ],
        "mandal": "Amalapuram Mandal",
        "district": "Dr. B.R. Ambedkar Konaseema",
        "postal_code": "533201",
        "latitude": 16.5787,
        "longitude": 82.0061,
        "is_hq": True,
        "is_popular": True
    },
    {
        "village_or_town": "Antarvedi",
        "name_te": "అంతర్వేది",
        "aliases": [
            "antarvedi temple",
            "అంతర్వేది"
        ],
        "mandal": "Sakhinetipalle Mandal",
        "district": "Dr. B.R. Ambedkar Konaseema",
        "postal_code": "533252",
        "latitude": 16.3333,
        "longitude": 81.7333,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Atreyapuram",
        "name_te": "ఆత్రేయపురం",
        "aliases": [
            "atreyapuram pootharekulu",
            "ఆత్రేయపురం"
        ],
        "mandal": "Atreyapuram Mandal",
        "district": "Dr. B.R. Ambedkar Konaseema",
        "postal_code": "533235",
        "latitude": 16.8333,
        "longitude": 81.7833,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Kothapeta",
        "name_te": "కొత్తపేట",
        "aliases": [
            "kothapeta konaseema",
            "కొత్తపేట"
        ],
        "mandal": "Kothapeta Mandal",
        "district": "Dr. B.R. Ambedkar Konaseema",
        "postal_code": "533223",
        "latitude": 16.7167,
        "longitude": 81.8833,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Mandapeta",
        "name_te": "మండపేట",
        "aliases": [
            "mandapeta rice city",
            "rice mill city",
            "మండపేట"
        ],
        "mandal": "Mandapeta Mandal",
        "district": "Dr. B.R. Ambedkar Konaseema",
        "postal_code": "533308",
        "latitude": 16.8667,
        "longitude": 81.9333,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Ramachandrapuram",
        "name_te": "రామచంద్రపురం",
        "aliases": [
            "rc puram",
            "rc puram konaseema",
            "రామచంద్రపురం"
        ],
        "mandal": "Ramachandrapuram Mandal",
        "district": "Dr. B.R. Ambedkar Konaseema",
        "postal_code": "533255",
        "latitude": 16.85,
        "longitude": 82.0167,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Ravulapalem",
        "name_te": "రావులపాలెం",
        "aliases": [
            "banana market",
            "ravulapalem banana market",
            "రావులపాలెం"
        ],
        "mandal": "Ravulapalem Mandal",
        "district": "Dr. B.R. Ambedkar Konaseema",
        "postal_code": "533238",
        "latitude": 16.75,
        "longitude": 81.8333,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Razole",
        "name_te": "రాజోలు",
        "aliases": [
            "razole island",
            "razole konaseema",
            "రాజోలు"
        ],
        "mandal": "Razole Mandal",
        "district": "Dr. B.R. Ambedkar Konaseema",
        "postal_code": "533242",
        "latitude": 16.4833,
        "longitude": 81.8333,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Malikipuram",
        "name_te": "మలికిపురం",
        "aliases": [
            "malikipuram mandal",
            "మలికిపురం"
        ],
        "mandal": "Malikipuram Mandal",
        "district": "Dr. B.R. Ambedkar Konaseema",
        "postal_code": "533253",
        "latitude": 16.4167,
        "longitude": 81.8667,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Mummidivaram",
        "name_te": "ముమ్మిడివరం",
        "aliases": [
            "mummidivaram mandal",
            "ముమ్మిడివరం"
        ],
        "mandal": "Mummidivaram Mandal",
        "district": "Dr. B.R. Ambedkar Konaseema",
        "postal_code": "533216",
        "latitude": 16.65,
        "longitude": 82.1167,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Rajahmundry",
        "name_te": "రాజమండ్రి (రాజమహేంద్రవరం)",
        "aliases": [
            "cultural capital",
            "rajahmundri",
            "rajamahendravaram",
            "rajamahendri",
            "రాజమండ్రి",
            "రాజమహేంద్రవరం"
        ],
        "mandal": "Rajahmundry Urban",
        "district": "East Godavari",
        "postal_code": "533101",
        "latitude": 17.0005,
        "longitude": 81.804,
        "is_hq": True,
        "is_popular": True
    },
    {
        "village_or_town": "Anaparthi",
        "name_te": "అనపర్తి",
        "aliases": [
            "anaparthi town",
            "anaparthy",
            "అనపర్తి"
        ],
        "mandal": "Anaparthi Mandal",
        "district": "East Godavari",
        "postal_code": "533342",
        "latitude": 16.9333,
        "longitude": 81.95,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Kadiam",
        "name_te": "కడియం",
        "aliases": [
            "kadiam plant nurseries",
            "kadiyam nurseries",
            "కడియం"
        ],
        "mandal": "Kadiam Mandal",
        "district": "East Godavari",
        "postal_code": "533126",
        "latitude": 16.9167,
        "longitude": 81.8333,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Kovvur",
        "name_te": "కొవ్వూరు",
        "aliases": [
            "kovvuru",
            "kovvuru godavari",
            "కొవ్వూరు"
        ],
        "mandal": "Kovvur Mandal",
        "district": "East Godavari",
        "postal_code": "534350",
        "latitude": 17.0167,
        "longitude": 81.7333,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Nidadavole",
        "name_te": "నిడదవోలు",
        "aliases": [
            "nidadavolu",
            "nidadavolu junction",
            "నిడదవోలు"
        ],
        "mandal": "Nidadavole Mandal",
        "district": "East Godavari",
        "postal_code": "534301",
        "latitude": 16.9,
        "longitude": 81.6667,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Chagallu",
        "name_te": "చాగల్లు",
        "aliases": [
            "chagallu mandal",
            "చాగల్లు"
        ],
        "mandal": "Chagallu Mandal",
        "district": "East Godavari",
        "postal_code": "534342",
        "latitude": 16.9833,
        "longitude": 81.65,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Gopalapuram",
        "name_te": "గోపాలపురం",
        "aliases": [
            "gopalapuram mandal",
            "గోపాలపురం"
        ],
        "mandal": "Gopalapuram Mandal",
        "district": "East Godavari",
        "postal_code": "534316",
        "latitude": 17.1,
        "longitude": 81.5333,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Rajanagaram",
        "name_te": "రాజానగరం",
        "aliases": [
            "rajanagaram hub",
            "రాజానగరం"
        ],
        "mandal": "Rajanagaram Mandal",
        "district": "East Godavari",
        "postal_code": "533294",
        "latitude": 17.0833,
        "longitude": 81.9,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Tallapudi",
        "name_te": "తాళ్లపూడి",
        "aliases": [
            "tallapudi mandal",
            "తాళ్లపూడి"
        ],
        "mandal": "Tallapudi Mandal",
        "district": "East Godavari",
        "postal_code": "534341",
        "latitude": 17.0667,
        "longitude": 81.7,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Eluru",
        "name_te": "ఏలూరు",
        "aliases": [
            "carpet city",
            "ellore",
            "helapuri",
            "ఏలూరు",
            "హెలాపురి"
        ],
        "mandal": "Eluru Urban",
        "district": "Eluru",
        "postal_code": "534001",
        "latitude": 16.7107,
        "longitude": 81.0952,
        "is_hq": True,
        "is_popular": True
    },
    {
        "village_or_town": "Chintalapudi",
        "name_te": "చింతలపూడి",
        "aliases": [
            "chintalapudi town",
            "చింతలపూడి"
        ],
        "mandal": "Chintalapudi Mandal",
        "district": "Eluru",
        "postal_code": "534460",
        "latitude": 17.0667,
        "longitude": 80.9833,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Dwaraka Tirumala",
        "name_te": "ద్వారకా తిరుమల (చిన్న తిరుపతి)",
        "aliases": [
            "chinna tirupati",
            "ద్వారకా తిరుమల"
        ],
        "mandal": "Dwaraka Tirumala Mandal",
        "district": "Eluru",
        "postal_code": "534426",
        "latitude": 16.95,
        "longitude": 81.25,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Jangareddigudem",
        "name_te": "జంగారెడ్డిగూడెం",
        "aliases": [
            "jrg",
            "tobacco hub",
            "జంగారెడ్డిగూడెం"
        ],
        "mandal": "Jangareddigudem Mandal",
        "district": "Eluru",
        "postal_code": "534447",
        "latitude": 17.1167,
        "longitude": 81.2833,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Jangareddygudem",
        "name_te": "జంగారెడ్డిగూడెం",
        "aliases": [
            "jrg",
            "jangareddigudem",
            "జంగారెడ్డిగూడెం"
        ],
        "mandal": "Jangareddygudem Mandal",
        "district": "Eluru",
        "postal_code": "534447",
        "latitude": 17.1167,
        "longitude": 81.3,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Kaikalur",
        "name_te": "కైకలూరు",
        "aliases": [
            "kolleru lake",
            "kolleru lake kaikalur",
            "కైకలూరు"
        ],
        "mandal": "Kaikalur Mandal",
        "district": "Eluru",
        "postal_code": "521333",
        "latitude": 16.55,
        "longitude": 81.2,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Nuzvid",
        "name_te": "నూజివీడు",
        "aliases": [
            "iiit nuzvid",
            "nuzvid mangoes",
            "nuzwidu",
            "నూజివీడు"
        ],
        "mandal": "Nuzvid Mandal",
        "district": "Eluru",
        "postal_code": "521201",
        "latitude": 16.7833,
        "longitude": 80.85,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Polavaram",
        "name_te": "పోలవరం",
        "aliases": [
            "polavaram project",
            "పోలవరం"
        ],
        "mandal": "Polavaram Mandal",
        "district": "Eluru",
        "postal_code": "534315",
        "latitude": 17.25,
        "longitude": 81.6333,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Bhimadole",
        "name_te": "భీమడోలు",
        "aliases": [
            "bhimadole mandal",
            "భీమడోలు"
        ],
        "mandal": "Bhimadole Mandal",
        "district": "Eluru",
        "postal_code": "534425",
        "latitude": 16.8167,
        "longitude": 81.2667,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Denduluru",
        "name_te": "దెందులూరు",
        "aliases": [
            "denduluru historical",
            "దెందులూరు"
        ],
        "mandal": "Denduluru Mandal",
        "district": "Eluru",
        "postal_code": "534432",
        "latitude": 16.7667,
        "longitude": 81.1833,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Koyyalagudem",
        "name_te": "కొయ్యలగూడెం",
        "aliases": [
            "koyyalagudem mandal",
            "కొయ్యలగూడెం"
        ],
        "mandal": "Koyyalagudem Mandal",
        "district": "Eluru",
        "postal_code": "534312",
        "latitude": 17.1167,
        "longitude": 81.4333,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Kukunoor",
        "name_te": "కుక్కునూరు",
        "aliases": [
            "kukunoor agency",
            "కుక్కునూరు"
        ],
        "mandal": "Kukunoor Mandal",
        "district": "Eluru",
        "postal_code": "507114",
        "latitude": 17.5833,
        "longitude": 81.1833,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Guntur",
        "name_te": "గుంటూరు",
        "aliases": [
            "chilli city",
            "guntoor",
            "guntur chili market",
            "guntur city",
            "గుంటూరు"
        ],
        "mandal": "Guntur East & West",
        "district": "Guntur",
        "postal_code": "522001",
        "latitude": 16.3067,
        "longitude": 80.4365,
        "is_hq": True,
        "is_popular": True
    },
    {
        "village_or_town": "Amaravati",
        "name_te": "అమరావతి",
        "aliases": [
            "amaravathi",
            "ap capital",
            "dharanikota",
            "అమరావతి"
        ],
        "mandal": "Amaravati Mandal",
        "district": "Guntur",
        "postal_code": "522020",
        "latitude": 16.5736,
        "longitude": 80.3575,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Mangalagiri",
        "name_te": "మంగళగిరి",
        "aliases": [
            "aiims mangalagiri",
            "mangalagiri handloom",
            "mangalagiri sarees",
            "mangalagiri temple",
            "panakala narasimha",
            "మంగళగిరి"
        ],
        "mandal": "Mangalagiri Mandal",
        "district": "Guntur",
        "postal_code": "522503",
        "latitude": 16.432,
        "longitude": 80.5687,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Ponnur",
        "name_te": "పొన్నూరు",
        "aliases": [
            "ponnuru",
            "పొన్నూరు"
        ],
        "mandal": "Ponnur Mandal",
        "district": "Guntur",
        "postal_code": "522124",
        "latitude": 16.0689,
        "longitude": 80.5542,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Tadepalli",
        "name_te": "తాడేపల్లి",
        "aliases": [
            "tadepalle",
            "తాడేపల్లి"
        ],
        "mandal": "Tadepalli Mandal",
        "district": "Guntur",
        "postal_code": "522501",
        "latitude": 16.4819,
        "longitude": 80.6033,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Tenali",
        "name_te": "తెనాలి",
        "aliases": [
            "andhra paris",
            "tenali andhra paris",
            "tenali ramakrishna",
            "తెనాలి"
        ],
        "mandal": "Tenali Mandal",
        "district": "Guntur",
        "postal_code": "522201",
        "latitude": 16.2437,
        "longitude": 80.64,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Chebrolu",
        "name_te": "చేబ్రోలు",
        "aliases": [
            "chebrolu historical",
            "చేబ్రోలు"
        ],
        "mandal": "Chebrolu Mandal",
        "district": "Guntur",
        "postal_code": "522212",
        "latitude": 16.2,
        "longitude": 80.5333,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Duggirala",
        "name_te": "దుగ్గిరాల",
        "aliases": [
            "duggirala turmeric",
            "దుగ్గిరాల"
        ],
        "mandal": "Duggirala Mandal",
        "district": "Guntur",
        "postal_code": "522330",
        "latitude": 16.3333,
        "longitude": 80.6333,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Pedakakani",
        "name_te": "పెదకాకాని",
        "aliases": [
            "pedakakani temple",
            "పెదకాకాని"
        ],
        "mandal": "Pedakakani Mandal",
        "district": "Guntur",
        "postal_code": "522509",
        "latitude": 16.35,
        "longitude": 80.4833,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Prathipadu",
        "name_te": "ప్రత్తిపాడు",
        "aliases": [
            "prathipadu guntur",
            "prathipadu kakinada",
            "ప్రత్తిపాడు"
        ],
        "mandal": "Prathipadu Mandal",
        "district": "Guntur",
        "postal_code": "522019",
        "latitude": 16.1822,
        "longitude": 80.3544,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Tadikonda",
        "name_te": "తాడికొండ",
        "aliases": [
            "tadikonda mandal",
            "తాడికొండ"
        ],
        "mandal": "Tadikonda Mandal",
        "district": "Guntur",
        "postal_code": "522236",
        "latitude": 16.4167,
        "longitude": 80.45,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Kakinada",
        "name_te": "కాకినాడ",
        "aliases": [
            "cocanada",
            "fertilizer city",
            "kakinada port",
            "smart city kakinada",
            "కాకినాడ"
        ],
        "mandal": "Kakinada Urban",
        "district": "Kakinada",
        "postal_code": "533001",
        "latitude": 16.9891,
        "longitude": 82.2475,
        "is_hq": True,
        "is_popular": True
    },
    {
        "village_or_town": "Annavaram",
        "name_te": "అన్నవరం",
        "aliases": [
            "annavaram satyanarayana",
            "అన్నవరం"
        ],
        "mandal": "Sankhavaram Mandal",
        "district": "Kakinada",
        "postal_code": "533406",
        "latitude": 17.2833,
        "longitude": 82.4,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Peddapuram",
        "name_te": "పెద్దాపురం",
        "aliases": [
            "peddapuram silk",
            "peddapuram town",
            "పెద్దాపురం"
        ],
        "mandal": "Peddapuram Mandal",
        "district": "Kakinada",
        "postal_code": "533437",
        "latitude": 17.0833,
        "longitude": 82.1333,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Pithapuram",
        "name_te": "పిఠాపురం",
        "aliases": [
            "pada gaya",
            "peethika pada",
            "pithapuram temple",
            "పిఠాపురం",
            "పీఠికాపురం"
        ],
        "mandal": "Pithapuram Mandal",
        "district": "Kakinada",
        "postal_code": "533450",
        "latitude": 17.1167,
        "longitude": 82.25,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Samalkot",
        "name_te": "సామర్లకోట",
        "aliases": [
            "samarlakota",
            "samalkota",
            "సామర్లకోట"
        ],
        "mandal": "Samalkot Mandal",
        "district": "Kakinada",
        "postal_code": "533440",
        "latitude": 17.05,
        "longitude": 82.1667,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Samalkota",
        "name_te": "సామర్లకోట",
        "aliases": [
            "samalkot",
            "సామర్లకోట",
            "సామల్కోట్"
        ],
        "mandal": "Samalkota Mandal",
        "district": "Kakinada",
        "postal_code": "533440",
        "latitude": 17.05,
        "longitude": 82.1667,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Tuni",
        "name_te": "తుని",
        "aliases": [
            "tuni betel leaves",
            "tuni mangoes",
            "తుని"
        ],
        "mandal": "Tuni Mandal",
        "district": "Kakinada",
        "postal_code": "533401",
        "latitude": 17.35,
        "longitude": 82.55,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Gollaprolu",
        "name_te": "గొల్లప్రోలు",
        "aliases": [
            "gollaprolu mandal",
            "గొల్లప్రోలు"
        ],
        "mandal": "Gollaprolu Mandal",
        "district": "Kakinada",
        "postal_code": "533445",
        "latitude": 17.15,
        "longitude": 82.2833,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Jaggampeta",
        "name_te": "జగ్గంపేట",
        "aliases": [
            "jaggampeta mandal",
            "జగ్గంపేట"
        ],
        "mandal": "Jaggampeta Mandal",
        "district": "Kakinada",
        "postal_code": "533435",
        "latitude": 17.1667,
        "longitude": 82.05,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Yeleswaram",
        "name_te": "ఏలేశ్వరం",
        "aliases": [
            "yeleswaram reservoir",
            "ఏలేశ్వరం"
        ],
        "mandal": "Yeleswaram Mandal",
        "district": "Kakinada",
        "postal_code": "533429",
        "latitude": 17.2833,
        "longitude": 82.05,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Machilipatnam",
        "name_te": "మచిలీపట్నం (బందరు)",
        "aliases": [
            "bandar",
            "bandaru",
            "machilipatnam port",
            "masulipatnam",
            "బందరు",
            "మచిలీపట్నం"
        ],
        "mandal": "Machilipatnam Mandal",
        "district": "Krishna",
        "postal_code": "521001",
        "latitude": 16.1875,
        "longitude": 81.1389,
        "is_hq": True,
        "is_popular": True
    },
    {
        "village_or_town": "Avanigadda",
        "name_te": "అవనిగడ్డ",
        "aliases": [
            "avanigadda diviseema",
            "avanigadda town",
            "అవనిగడ్డ"
        ],
        "mandal": "Avanigadda Mandal",
        "district": "Krishna",
        "postal_code": "521121",
        "latitude": 16.0219,
        "longitude": 80.9197,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Gannavaram",
        "name_te": "గన్నవరం",
        "aliases": [
            "gannavaram airport",
            "vijayawada airport",
            "గన్నవరం"
        ],
        "mandal": "Gannavaram Mandal",
        "district": "Krishna",
        "postal_code": "521101",
        "latitude": 16.5393,
        "longitude": 80.7997,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Gudivada",
        "name_te": "గుడివాడ",
        "aliases": [
            "gudivada junction",
            "gudivada town",
            "గుడివాడ"
        ],
        "mandal": "Gudivada Mandal",
        "district": "Krishna",
        "postal_code": "521301",
        "latitude": 16.4411,
        "longitude": 80.9926,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Pedana",
        "name_te": "పెడన",
        "aliases": [
            "pedana kalamkari",
            "పెడన"
        ],
        "mandal": "Pedana Mandal",
        "district": "Krishna",
        "postal_code": "521366",
        "latitude": 16.2667,
        "longitude": 81.1667,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Vuyyuru",
        "name_te": "వుయ్యూరు",
        "aliases": [
            "vuyyur sugar",
            "vuyyuru sugar",
            "ఉయ్యూరు",
            "వుయ్యూరు"
        ],
        "mandal": "Vuyyuru Mandal",
        "district": "Krishna",
        "postal_code": "521165",
        "latitude": 16.3683,
        "longitude": 80.8417,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Challapalli",
        "name_te": "చల్లపల్లి",
        "aliases": [
            "challapalli raja",
            "చల్లపల్లి"
        ],
        "mandal": "Challapalli Mandal",
        "district": "Krishna",
        "postal_code": "521126",
        "latitude": 16.1167,
        "longitude": 80.9333,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Kankipadu",
        "name_te": "కంకిపాడు",
        "aliases": [
            "kankipadu town",
            "కంకిపాడు"
        ],
        "mandal": "Kankipadu Mandal",
        "district": "Krishna",
        "postal_code": "521151",
        "latitude": 16.4258,
        "longitude": 80.7681,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Nagayalanka",
        "name_te": "నాగాయలంక",
        "aliases": [
            "nagayalanka lighthouse",
            "నాగాయలంక"
        ],
        "mandal": "Nagayalanka Mandal",
        "district": "Krishna",
        "postal_code": "521120",
        "latitude": 15.95,
        "longitude": 80.9167,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Pamarru",
        "name_te": "పామర్రు",
        "aliases": [
            "pamarru mandal",
            "పామర్రు"
        ],
        "mandal": "Pamarru Mandal",
        "district": "Krishna",
        "postal_code": "521157",
        "latitude": 16.3167,
        "longitude": 80.9667,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Kurnool",
        "name_te": "కర్నూలు",
        "aliases": [
            "kandanavolu",
            "karnul",
            "konda reddy buruju",
            "kurnool city",
            "కర్నూలు"
        ],
        "mandal": "Kurnool Urban",
        "district": "Kurnool",
        "postal_code": "518001",
        "latitude": 15.8281,
        "longitude": 78.0373,
        "is_hq": True,
        "is_popular": True
    },
    {
        "village_or_town": "Adoni",
        "name_te": "ఆదోని",
        "aliases": [
            "adoni cotton",
            "cotton market adoni",
            "ఆదోని"
        ],
        "mandal": "Adoni Mandal",
        "district": "Kurnool",
        "postal_code": "518301",
        "latitude": 15.6322,
        "longitude": 77.2728,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Dhone",
        "name_te": "డోన్ (ద్రోణాచలం)",
        "aliases": [
            "dhone railway",
            "dronachalam",
            "డోన్"
        ],
        "mandal": "Dhone Mandal",
        "district": "Kurnool",
        "postal_code": "518222",
        "latitude": 15.4167,
        "longitude": 77.8667,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Mantralayam",
        "name_te": "మంత్రాలయం",
        "aliases": [
            "raghavendra swamy",
            "raghavendra swamy mutt",
            "మంత్రాలయం"
        ],
        "mandal": "Mantralayam Mandal",
        "district": "Kurnool",
        "postal_code": "518345",
        "latitude": 15.94,
        "longitude": 77.43,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Orvakal",
        "name_te": "ఓర్వకల్లు",
        "aliases": [
            "orvakal rock garden",
            "kurnool airport",
            "ఓర్వకల్లు"
        ],
        "mandal": "Orvakal Mandal",
        "district": "Kurnool",
        "postal_code": "518010",
        "latitude": 15.6833,
        "longitude": 78.2167,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Pattikonda",
        "name_te": "పత్తికొండ",
        "aliases": [
            "pattikonda tomato",
            "pattikonda town",
            "పత్తికొండ"
        ],
        "mandal": "Pattikonda Mandal",
        "district": "Kurnool",
        "postal_code": "518380",
        "latitude": 15.4,
        "longitude": 77.5167,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Yemmiganur",
        "name_te": "ఎమ్మిగనూరు",
        "aliases": [
            "handloom city yemmiganur",
            "yemmiganur handloom",
            "ఎమ్మిగనూరు"
        ],
        "mandal": "Yemmiganur Mandal",
        "district": "Kurnool",
        "postal_code": "518360",
        "latitude": 15.7333,
        "longitude": 77.4833,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Alur",
        "name_te": "ఆలూరు",
        "aliases": [
            "alur mandal",
            "ఆలూరు"
        ],
        "mandal": "Alur Mandal",
        "district": "Kurnool",
        "postal_code": "518395",
        "latitude": 15.3167,
        "longitude": 77.2333,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Kodumur",
        "name_te": "కోడుమూరు",
        "aliases": [
            "kodumuru mandal",
            "కోడుమూరు"
        ],
        "mandal": "Kodumur Mandal",
        "district": "Kurnool",
        "postal_code": "518464",
        "latitude": 15.6833,
        "longitude": 77.7833,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Vijayawada",
        "name_te": "విజయవాడ (బెజవాడ)",
        "aliases": [
            "bezawada",
            "kanakadurga",
            "vijayawada city",
            "vijyawada",
            "బెజవాడ",
            "విజయవాడ"
        ],
        "mandal": "Vijayawada Urban",
        "district": "NTR",
        "postal_code": "520001",
        "latitude": 16.5062,
        "longitude": 80.648,
        "is_hq": True,
        "is_popular": True
    },
    {
        "village_or_town": "Ibrahimpatnam",
        "name_te": "ఇబ్రహీంపట్నం",
        "aliases": [
            "ibrahimpatnam thermal",
            "ఇబ్రహీంపట్నం"
        ],
        "mandal": "Ibrahimpatnam Mandal",
        "district": "NTR",
        "postal_code": "521456",
        "latitude": 16.5888,
        "longitude": 80.5233,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Jaggayyapet",
        "name_te": "జగ్గయ్యపేట",
        "aliases": [
            "jaggayyapeta",
            "జగ్గయ్యపేట"
        ],
        "mandal": "Jaggayyapet Mandal",
        "district": "NTR",
        "postal_code": "521175",
        "latitude": 16.8928,
        "longitude": 80.0975,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Jaggayyapeta",
        "name_te": "జగ్గయ్యపేట",
        "aliases": [
            "jaggayyapet cement",
            "జగ్గయ్యపేట"
        ],
        "mandal": "Jaggayyapeta Mandal",
        "district": "NTR",
        "postal_code": "521175",
        "latitude": 16.8925,
        "longitude": 80.0978,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Kondapalli",
        "name_te": "కొండపల్లి",
        "aliases": [
            "kondapalli toys",
            "కొండపల్లి బొమ్మలు",
            "కొండపల్లి"
        ],
        "mandal": "Ibrahimpatnam Mandal",
        "district": "NTR",
        "postal_code": "521228",
        "latitude": 16.6167,
        "longitude": 80.5333,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Nandigama",
        "name_te": "నందిగామ",
        "aliases": [
            "nandigama town",
            "నందిగామ"
        ],
        "mandal": "Nandigama Mandal",
        "district": "NTR",
        "postal_code": "521185",
        "latitude": 16.7681,
        "longitude": 80.2936,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Tiruvuru",
        "name_te": "తిరువూరు",
        "aliases": [
            "thiruvuru",
            "tiruvuru town",
            "తిరువూరు"
        ],
        "mandal": "Tiruvuru Mandal",
        "district": "NTR",
        "postal_code": "521235",
        "latitude": 17.1128,
        "longitude": 80.6133,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Kanchikacherla",
        "name_te": "కంచికచర్ల",
        "aliases": [
            "kanchikacherla mandal",
            "కంచికచర్ల"
        ],
        "mandal": "Kanchikacherla Mandal",
        "district": "NTR",
        "postal_code": "521180",
        "latitude": 16.6833,
        "longitude": 80.3833,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Mylavaram",
        "name_te": "మైలవరం",
        "aliases": [
            "mylavaram mandal",
            "mylavaram town",
            "మైలవరం"
        ],
        "mandal": "Mylavaram Mandal",
        "district": "NTR",
        "postal_code": "521230",
        "latitude": 16.7644,
        "longitude": 80.6386,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Vissannapeta",
        "name_te": "విస్సన్నపేట",
        "aliases": [
            "vissannapeta mandal",
            "విస్సన్నపేట"
        ],
        "mandal": "Vissannapeta Mandal",
        "district": "NTR",
        "postal_code": "521215",
        "latitude": 16.9833,
        "longitude": 80.75,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Nandyal",
        "name_te": "నంద్యాల",
        "aliases": [
            "nandi city",
            "nandyal town",
            "nine nandis",
            "నంద్యాల"
        ],
        "mandal": "Nandyal Mandal",
        "district": "Nandyal",
        "postal_code": "518501",
        "latitude": 15.488,
        "longitude": 78.4842,
        "is_hq": True,
        "is_popular": True
    },
    {
        "village_or_town": "Allagadda",
        "name_te": "ఆళ్లగడ్డ",
        "aliases": [
            "allagadda stone carving",
            "allagadda stone sculpture",
            "ఆళ్లగడ్డ"
        ],
        "mandal": "Allagadda Mandal",
        "district": "Nandyal",
        "postal_code": "518543",
        "latitude": 15.1333,
        "longitude": 78.5167,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Banaganapalle",
        "name_te": "బనగానపల్లె",
        "aliases": [
            "banaganapalli",
            "banganapalle mango",
            "banganapalle mangoes",
            "బనగానపల్లి",
            "బనగానపల్లె"
        ],
        "mandal": "Banaganapalle Mandal",
        "district": "Nandyal",
        "postal_code": "518124",
        "latitude": 15.3167,
        "longitude": 78.2333,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Mahanandi",
        "name_te": "మహానంది",
        "aliases": [
            "mahanandi temple",
            "మహానంది"
        ],
        "mandal": "Mahanandi Mandal",
        "district": "Nandyal",
        "postal_code": "518502",
        "latitude": 15.4833,
        "longitude": 78.6167,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Nandikotkur",
        "name_te": "నందికొట్కూరు",
        "aliases": [
            "nandikotkuru",
            "నందికొట్కూరు"
        ],
        "mandal": "Nandikotkur Mandal",
        "district": "Nandyal",
        "postal_code": "518401",
        "latitude": 15.8667,
        "longitude": 78.2667,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Srisailam",
        "name_te": "శ్రీశైలం",
        "aliases": [
            "jyotirlinga",
            "mallikarjuna",
            "srishailam mallikarjuna",
            "శ్రీశైలం"
        ],
        "mandal": "Srisailam Mandal",
        "district": "Nandyal",
        "postal_code": "518101",
        "latitude": 16.0747,
        "longitude": 78.8686,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Atmakur (K)",
        "name_te": "ఆత్మకూరు (కర్నూలు)",
        "aliases": [
            "atmakur kurnool",
            "ఆత్మకూరు"
        ],
        "mandal": "Atmakur Mandal",
        "district": "Nandyal",
        "postal_code": "518422",
        "latitude": 15.8833,
        "longitude": 78.5833,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Bethamcherla",
        "name_te": "బెతంచెర్ల",
        "aliases": [
            "bethamcherla slabs",
            "బెతంచెర్ల"
        ],
        "mandal": "Bethamcherla Mandal",
        "district": "Nandyal",
        "postal_code": "518599",
        "latitude": 15.45,
        "longitude": 78.1667,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Koilkuntla",
        "name_te": "కోయిలకుంట్ల",
        "aliases": [
            "koilakuntla",
            "కోయిలకుంట్ల"
        ],
        "mandal": "Koilkuntla Mandal",
        "district": "Nandyal",
        "postal_code": "518134",
        "latitude": 15.2333,
        "longitude": 78.3167,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Narasaraopet",
        "name_te": "నరసరావుపేట",
        "aliases": [
            "narasaraopeta",
            "nspet",
            "నరసరావుపేట"
        ],
        "mandal": "Narasaraopet Mandal",
        "district": "Palnadu",
        "postal_code": "522601",
        "latitude": 16.236,
        "longitude": 80.051,
        "is_hq": True,
        "is_popular": True
    },
    {
        "village_or_town": "Chilakaluripet",
        "name_te": "చిలకలూరిపేట",
        "aliases": [
            "chilakaluripeta",
            "చిలకలూరిపేట"
        ],
        "mandal": "Chilakaluripet Mandal",
        "district": "Palnadu",
        "postal_code": "522616",
        "latitude": 16.0894,
        "longitude": 80.1672,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Gurazala",
        "name_te": "గురజాల",
        "aliases": [
            "gurajala",
            "గురజాల"
        ],
        "mandal": "Gurazala Mandal",
        "district": "Palnadu",
        "postal_code": "522415",
        "latitude": 16.5833,
        "longitude": 79.5667,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Kotappakonda",
        "name_te": "కోటప్పకొండ",
        "aliases": [
            "trikoota parvatham",
            "కోటప్పకొండ"
        ],
        "mandal": "Narasaraopet Mandal",
        "district": "Palnadu",
        "postal_code": "522601",
        "latitude": 16.1833,
        "longitude": 80.05,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Macherla",
        "name_te": "మాచర్ల",
        "aliases": [
            "macherla palnadu",
            "macherla town",
            "మాచర్ల"
        ],
        "mandal": "Macherla Mandal",
        "district": "Palnadu",
        "postal_code": "522426",
        "latitude": 16.4811,
        "longitude": 79.2989,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Piduguralla",
        "name_te": "పిడుగురాళ్ల",
        "aliases": [
            "lime city",
            "పిడుగురాళ్ల"
        ],
        "mandal": "Piduguralla Mandal",
        "district": "Palnadu",
        "postal_code": "522413",
        "latitude": 16.48,
        "longitude": 79.89,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Sattenapalle",
        "name_te": "సత్తెనపల్లి",
        "aliases": [
            "sattenapalli",
            "సత్తెనపల్లి"
        ],
        "mandal": "Sattenapalle Mandal",
        "district": "Palnadu",
        "postal_code": "522403",
        "latitude": 16.3986,
        "longitude": 80.1583,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Vinukonda",
        "name_te": "వినుకొండ",
        "aliases": [
            "vinukonda fort",
            "vinukonda town",
            "వినుకొండ"
        ],
        "mandal": "Vinukonda Mandal",
        "district": "Palnadu",
        "postal_code": "522647",
        "latitude": 16.0506,
        "longitude": 79.7428,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Dachepalle",
        "name_te": "దాచేపల్లి",
        "aliases": [
            "dachepalli cement",
            "దాచేపల్లి"
        ],
        "mandal": "Dachepalle Mandal",
        "district": "Palnadu",
        "postal_code": "522414",
        "latitude": 16.6,
        "longitude": 79.7333,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Parvathipuram",
        "name_te": "పార్వతీపురం",
        "aliases": [
            "manyam hq",
            "parvathipuram agency",
            "పార్వతీపురం"
        ],
        "mandal": "Parvathipuram Mandal",
        "district": "Parvathipuram Manyam",
        "postal_code": "535501",
        "latitude": 18.7833,
        "longitude": 83.4333,
        "is_hq": True,
        "is_popular": True
    },
    {
        "village_or_town": "Palakonda",
        "name_te": "పాలకొండ",
        "aliases": [
            "palakonda agency",
            "palakonda cashew",
            "పాలకొండ"
        ],
        "mandal": "Palakonda Mandal",
        "district": "Parvathipuram Manyam",
        "postal_code": "532440",
        "latitude": 18.6,
        "longitude": 83.75,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Salur",
        "name_te": "సాలూరు",
        "aliases": [
            "saluru",
            "saluru agency gateway",
            "సాలూరు"
        ],
        "mandal": "Salur Mandal",
        "district": "Parvathipuram Manyam",
        "postal_code": "535591",
        "latitude": 18.5167,
        "longitude": 83.2167,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Kurupam",
        "name_te": "కురుపాం",
        "aliases": [
            "kurupam agency",
            "కురుపాం"
        ],
        "mandal": "Kurupam Mandal",
        "district": "Parvathipuram Manyam",
        "postal_code": "535524",
        "latitude": 18.8667,
        "longitude": 83.55,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Seethampeta",
        "name_te": "సీతంపేట",
        "aliases": [
            "seethampeta itda",
            "సీతంపేట"
        ],
        "mandal": "Seethampeta Mandal",
        "district": "Parvathipuram Manyam",
        "postal_code": "532443",
        "latitude": 18.6667,
        "longitude": 83.85,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Veeraghattam",
        "name_te": "వీరఘట్టం",
        "aliases": [
            "veeraghattam mandal",
            "వీరఘట్టం"
        ],
        "mandal": "Veeraghattam Mandal",
        "district": "Parvathipuram Manyam",
        "postal_code": "532460",
        "latitude": 18.6833,
        "longitude": 83.6,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Ongole",
        "name_te": "ఒంగోలు",
        "aliases": [
            "ongol",
            "ongole bull",
            "ongole city",
            "ఒంగోలు"
        ],
        "mandal": "Ongole Urban",
        "district": "Prakasam",
        "postal_code": "523001",
        "latitude": 15.5057,
        "longitude": 80.0499,
        "is_hq": True,
        "is_popular": True
    },
    {
        "village_or_town": "Chimakurthy",
        "name_te": "చీమకుర్తి",
        "aliases": [
            "galaxy granite",
            "చీమకుర్తి"
        ],
        "mandal": "Chimakurthy Mandal",
        "district": "Prakasam",
        "postal_code": "523226",
        "latitude": 15.5833,
        "longitude": 79.8667,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Darsi",
        "name_te": "దర్శి",
        "aliases": [
            "darsi mandal",
            "దర్శి"
        ],
        "mandal": "Darsi Mandal",
        "district": "Prakasam",
        "postal_code": "523247",
        "latitude": 15.7667,
        "longitude": 79.6833,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Giddalur",
        "name_te": "గిద్దలూరు",
        "aliases": [
            "giddaluru",
            "giddaluru town",
            "గిద్దలూరు"
        ],
        "mandal": "Giddalur Mandal",
        "district": "Prakasam",
        "postal_code": "523357",
        "latitude": 15.3833,
        "longitude": 78.9333,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Kandukur",
        "name_te": "కందుకూరు",
        "aliases": [
            "kandukuru",
            "కందుకూరు"
        ],
        "mandal": "Kandukur Mandal",
        "district": "Prakasam",
        "postal_code": "523105",
        "latitude": 15.2167,
        "longitude": 79.9,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Kanigiri",
        "name_te": "కనిగిరి",
        "aliases": [
            "kanigiri town",
            "కనిగిరి"
        ],
        "mandal": "Kanigiri Mandal",
        "district": "Prakasam",
        "postal_code": "523230",
        "latitude": 15.4,
        "longitude": 79.5167,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Markapur",
        "name_te": "మార్కాపురం",
        "aliases": [
            "markapuram",
            "slate city",
            "slate town",
            "మార్కాపురం"
        ],
        "mandal": "Markapur Mandal",
        "district": "Prakasam",
        "postal_code": "523316",
        "latitude": 15.7333,
        "longitude": 79.2833,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Podili",
        "name_te": "పొదిలి",
        "aliases": [
            "podili town",
            "పొదిలి"
        ],
        "mandal": "Podili Mandal",
        "district": "Prakasam",
        "postal_code": "523240",
        "latitude": 15.6,
        "longitude": 79.6,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Singarayakonda",
        "name_te": "సింగరాయకొండ",
        "aliases": [
            "singarayakonda temple",
            "సింగరాయకొండ"
        ],
        "mandal": "Singarayakonda Mandal",
        "district": "Prakasam",
        "postal_code": "523101",
        "latitude": 15.25,
        "longitude": 80.0333,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Cumbum",
        "name_te": "కంభం",
        "aliases": [
            "cumbum tank",
            "కంభం"
        ],
        "mandal": "Cumbum Mandal",
        "district": "Prakasam",
        "postal_code": "523333",
        "latitude": 15.5667,
        "longitude": 79.1167,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Yerragondapalem",
        "name_te": "ఎర్రగొండపాలెం",
        "aliases": [
            "y palem",
            "ఎర్రగొండపాలెం"
        ],
        "mandal": "Yerragondapalem Mandal",
        "district": "Prakasam",
        "postal_code": "523327",
        "latitude": 16.0333,
        "longitude": 79.3,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Nellore",
        "name_te": "నెల్లూరు (సింహపురి)",
        "aliases": [
            "nellor",
            "simhapuri",
            "spsr nellore",
            "నెల్లూరు"
        ],
        "mandal": "Nellore Urban",
        "district": "Sri Potti Sriramulu Nellore",
        "postal_code": "524001",
        "latitude": 14.4426,
        "longitude": 79.9865,
        "is_hq": True,
        "is_popular": True
    },
    {
        "village_or_town": "Atmakur",
        "name_te": "ఆత్మకూరు",
        "aliases": [
            "atmakur nandyal",
            "atmakur nellore",
            "ఆత్మకూరు"
        ],
        "mandal": "Atmakur Mandal",
        "district": "Sri Potti Sriramulu Nellore",
        "postal_code": "524322",
        "latitude": 14.6167,
        "longitude": 79.6167,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Buchireddypalem",
        "name_te": "బుచ్చిరెడ్డిపాలెం",
        "aliases": [
            "buchi",
            "బుచ్చిరెడ్డిపాలెం"
        ],
        "mandal": "Buchireddypalem Mandal",
        "district": "Sri Potti Sriramulu Nellore",
        "postal_code": "524305",
        "latitude": 14.5333,
        "longitude": 79.8833,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Kavali",
        "name_te": "కావలి",
        "aliases": [
            "kavali town",
            "కావలి"
        ],
        "mandal": "Kavali Mandal",
        "district": "Sri Potti Sriramulu Nellore",
        "postal_code": "524201",
        "latitude": 14.9131,
        "longitude": 79.9928,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Krishnapatnam",
        "name_te": "కృష్ణపట్నం",
        "aliases": [
            "krishnapatnam port",
            "కృష్ణపట్నం"
        ],
        "mandal": "Muthukur Mandal",
        "district": "Sri Potti Sriramulu Nellore",
        "postal_code": "524344",
        "latitude": 14.2833,
        "longitude": 80.1167,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Udayagiri",
        "name_te": "ఉదయగిరి",
        "aliases": [
            "udayagiri fort",
            "ఉదయగిరి"
        ],
        "mandal": "Udayagiri Mandal",
        "district": "Sri Potti Sriramulu Nellore",
        "postal_code": "524226",
        "latitude": 14.8667,
        "longitude": 79.3167,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Kovur",
        "name_te": "కోవూరు",
        "aliases": [
            "kovur nellore",
            "kovuru nellore",
            "కోవూరు"
        ],
        "mandal": "Kovur Mandal",
        "district": "Sri Potti Sriramulu Nellore",
        "postal_code": "524137",
        "latitude": 14.4925,
        "longitude": 79.9897,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Podalakur",
        "name_te": "పొదలకూరు",
        "aliases": [
            "podalakur mandal",
            "పొదలకూరు"
        ],
        "mandal": "Podalakur Mandal",
        "district": "Sri Potti Sriramulu Nellore",
        "postal_code": "524345",
        "latitude": 14.3667,
        "longitude": 79.7333,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Puttaparthi",
        "name_te": "పుట్టపర్తి",
        "aliases": [
            "prasanthi nilayam",
            "prashanthi nilayam",
            "puttaparthy",
            "పుట్టపర్తి"
        ],
        "mandal": "Puttaparthi Mandal",
        "district": "Sri Sathya Sai",
        "postal_code": "515134",
        "latitude": 14.1681,
        "longitude": 77.8106,
        "is_hq": True,
        "is_popular": True
    },
    {
        "village_or_town": "Dharmavaram",
        "name_te": "ధర్మవరం",
        "aliases": [
            "dharmavaram pattu sarees",
            "dharmavaram silk sarees",
            "ధర్మవరం"
        ],
        "mandal": "Dharmavaram Mandal",
        "district": "Sri Sathya Sai",
        "postal_code": "515671",
        "latitude": 14.4142,
        "longitude": 77.7214,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Hindupur",
        "name_te": "హిందూపురం",
        "aliases": [
            "hindupuram",
            "hindupuram silk",
            "హిందూపురం"
        ],
        "mandal": "Hindupur Mandal",
        "district": "Sri Sathya Sai",
        "postal_code": "515201",
        "latitude": 13.8294,
        "longitude": 77.4914,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Kadiri",
        "name_te": "కదిరి",
        "aliases": [
            "kadiri narasimha",
            "kadiri narasimha swamy",
            "కదిరి"
        ],
        "mandal": "Kadiri Mandal",
        "district": "Sri Sathya Sai",
        "postal_code": "515591",
        "latitude": 14.1167,
        "longitude": 78.1667,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Lepakshi",
        "name_te": "లేపాక్షి",
        "aliases": [
            "lepakshi nandi",
            "hanging pillar",
            "లేపాక్షి"
        ],
        "mandal": "Lepakshi Mandal",
        "district": "Sri Sathya Sai",
        "postal_code": "515331",
        "latitude": 13.8,
        "longitude": 77.6,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Madakasira",
        "name_te": "మడకశిర",
        "aliases": [
            "madakasira town",
            "మడకశిర"
        ],
        "mandal": "Madakasira Mandal",
        "district": "Sri Sathya Sai",
        "postal_code": "515301",
        "latitude": 13.9333,
        "longitude": 77.2667,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Penukonda",
        "name_te": "పెనుకొండ",
        "aliases": [
            "kia motors hub",
            "penukonda fort",
            "penukonda kia motors",
            "పెనుకొండ"
        ],
        "mandal": "Penukonda Mandal",
        "district": "Sri Sathya Sai",
        "postal_code": "515110",
        "latitude": 14.0833,
        "longitude": 77.6,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Gorantla",
        "name_te": "గోరంట్ల",
        "aliases": [
            "gorantla mandal",
            "గోరంట్ల"
        ],
        "mandal": "Gorantla Mandal",
        "district": "Sri Sathya Sai",
        "postal_code": "515231",
        "latitude": 13.9833,
        "longitude": 77.7667,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Srikakulam",
        "name_te": "శ్రీకాకుళం",
        "aliases": [
            "arasavalli surya",
            "arasavalli temple",
            "chicacole",
            "శ్రీకాకుళం"
        ],
        "mandal": "Srikakulam Urban",
        "district": "Srikakulam",
        "postal_code": "532001",
        "latitude": 18.2949,
        "longitude": 83.8938,
        "is_hq": True,
        "is_popular": True
    },
    {
        "village_or_town": "Amadalavalasa",
        "name_te": "ఆమదాలవలస",
        "aliases": [
            "amadalavalasa junction",
            "ఆమదాలవలస"
        ],
        "mandal": "Amadalavalasa Mandal",
        "district": "Srikakulam",
        "postal_code": "532185",
        "latitude": 18.4167,
        "longitude": 83.9,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Arasavalli",
        "name_te": "అరసవల్లి",
        "aliases": [
            "arasavalli sun temple",
            "అరసవల్లి"
        ],
        "mandal": "Srikakulam Urban",
        "district": "Srikakulam",
        "postal_code": "532001",
        "latitude": 18.3,
        "longitude": 83.9167,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Ichchapuram",
        "name_te": "ఇచ్ఛాపురం",
        "aliases": [
            "ichapuram border",
            "ఇచ్ఛాపురం"
        ],
        "mandal": "Ichchapuram Mandal",
        "district": "Srikakulam",
        "postal_code": "532312",
        "latitude": 19.1167,
        "longitude": 84.6833,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Palasa",
        "name_te": "పలాస (కాశీబుగ్గ)",
        "aliases": [
            "cashew city palasa",
            "kasibugga",
            "palasa cashew capital",
            "కాశీబుగ్గ",
            "పలాస"
        ],
        "mandal": "Palasa Mandal",
        "district": "Srikakulam",
        "postal_code": "532222",
        "latitude": 18.7667,
        "longitude": 84.4167,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Ponduru",
        "name_te": "పొందూరు",
        "aliases": [
            "ponduru khadi",
            "పొందూరు"
        ],
        "mandal": "Ponduru Mandal",
        "district": "Srikakulam",
        "postal_code": "532168",
        "latitude": 18.35,
        "longitude": 83.8333,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Tekkali",
        "name_te": "టెక్కలి",
        "aliases": [
            "tekkali town",
            "టెక్కలి"
        ],
        "mandal": "Tekkali Mandal",
        "district": "Srikakulam",
        "postal_code": "532201",
        "latitude": 18.6167,
        "longitude": 84.2333,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Narasannapeta",
        "name_te": "నరసన్నపేట",
        "aliases": [
            "narasannapeta town",
            "నరసన్నపేట"
        ],
        "mandal": "Narasannapeta Mandal",
        "district": "Srikakulam",
        "postal_code": "532421",
        "latitude": 18.4167,
        "longitude": 84.05,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Sompeta",
        "name_te": "సోంపేట",
        "aliases": [
            "sompeta town",
            "సోంపేట"
        ],
        "mandal": "Sompeta Mandal",
        "district": "Srikakulam",
        "postal_code": "532284",
        "latitude": 18.9333,
        "longitude": 84.6,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Tirupati",
        "name_te": "తిరుపతి",
        "aliases": [
            "balaji town",
            "tirumala",
            "tirupathi",
            "తిరుపతి",
            "తిరుమల"
        ],
        "mandal": "Tirupati Urban",
        "district": "Tirupati",
        "postal_code": "517501",
        "latitude": 13.6288,
        "longitude": 79.4192,
        "is_hq": True,
        "is_popular": True
    },
    {
        "village_or_town": "Chandragiri",
        "name_te": "చంద్రగిరి",
        "aliases": [
            "chandragiri fort",
            "చంద్రగిరి"
        ],
        "mandal": "Chandragiri Mandal",
        "district": "Tirupati",
        "postal_code": "517101",
        "latitude": 13.5833,
        "longitude": 79.3167,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Gudur",
        "name_te": "గూడూరు",
        "aliases": [
            "gudur junction",
            "gudur lemon market",
            "గూడూరు"
        ],
        "mandal": "Gudur Mandal",
        "district": "Tirupati",
        "postal_code": "524101",
        "latitude": 14.1464,
        "longitude": 79.8504,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Nagari",
        "name_te": "నగరి",
        "aliases": [
            "nagari powerlooms",
            "nagari town",
            "నగరి"
        ],
        "mandal": "Nagari Mandal",
        "district": "Tirupati",
        "postal_code": "517590",
        "latitude": 13.3167,
        "longitude": 79.5833,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Puttur",
        "name_te": "పుత్తూరు",
        "aliases": [
            "puttur bone fracture",
            "puttur kattu",
            "పుత్తూరు"
        ],
        "mandal": "Puttur Mandal",
        "district": "Tirupati",
        "postal_code": "517583",
        "latitude": 13.4414,
        "longitude": 79.5542,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Renigunta",
        "name_te": "రేణిగుంట",
        "aliases": [
            "renigunta airport rly",
            "renigunta junction",
            "రేణిగుంట"
        ],
        "mandal": "Renigunta Mandal",
        "district": "Tirupati",
        "postal_code": "517520",
        "latitude": 13.65,
        "longitude": 79.5167,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Sri City",
        "name_te": "శ్రీసిటీ",
        "aliases": [
            "sricity sez",
            "tada industrial",
            "శ్రీసిటీ"
        ],
        "mandal": "Satyavedu Mandal",
        "district": "Tirupati",
        "postal_code": "517646",
        "latitude": 13.5333,
        "longitude": 80.0167,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Srikalahasti",
        "name_te": "శ్రీకాళహస్తి",
        "aliases": [
            "kalahasti",
            "kalahasti vayu lingam",
            "శ్రీకాళహస్తి"
        ],
        "mandal": "Srikalahasti Mandal",
        "district": "Tirupati",
        "postal_code": "517644",
        "latitude": 13.7498,
        "longitude": 79.6984,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Sullurpeta",
        "name_te": "సూళ్లూరుపేట",
        "aliases": [
            "shar sriharikota",
            "shriharikota base",
            "sullurpet",
            "సూళ్లూరుపేట"
        ],
        "mandal": "Sullurpeta Mandal",
        "district": "Tirupati",
        "postal_code": "524121",
        "latitude": 13.7008,
        "longitude": 80.0219,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Tirumala",
        "name_te": "తిరుమల",
        "aliases": [
            "seven hills",
            "lord venkateswara",
            "తిరుమల"
        ],
        "mandal": "Tirupati Urban",
        "district": "Tirupati",
        "postal_code": "517504",
        "latitude": 13.6833,
        "longitude": 79.35,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Venkatagiri",
        "name_te": "వెంకటగిరి",
        "aliases": [
            "venkatagiri sarees",
            "venkatagiri zari sarees",
            "వెంకటగిరి"
        ],
        "mandal": "Venkatagiri Mandal",
        "district": "Tirupati",
        "postal_code": "524132",
        "latitude": 13.9667,
        "longitude": 79.5833,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Pakala",
        "name_te": "పాకాల",
        "aliases": [
            "pakala junction",
            "పాకాల"
        ],
        "mandal": "Pakala Mandal",
        "district": "Tirupati",
        "postal_code": "517112",
        "latitude": 13.4667,
        "longitude": 79.1167,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Visakhapatnam",
        "name_te": "విశాఖపట్నం (వైజాగ్)",
        "aliases": [
            "visakha",
            "vishakapatnam",
            "vishakhapatnam",
            "vizag",
            "waltair",
            "విశాఖ",
            "వైజాగ్"
        ],
        "mandal": "Visakhapatnam Urban",
        "district": "Visakhapatnam",
        "postal_code": "530001",
        "latitude": 17.6868,
        "longitude": 83.2185,
        "is_hq": True,
        "is_popular": True
    },
    {
        "village_or_town": "Bheemunipatnam",
        "name_te": "భీమునిపట్నం (భీమిలి)",
        "aliases": [
            "bheemili",
            "bhimili",
            "భీమిలి"
        ],
        "mandal": "Bheemunipatnam Mandal",
        "district": "Visakhapatnam",
        "postal_code": "531163",
        "latitude": 17.8914,
        "longitude": 83.4542,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Gajuwaka",
        "name_te": "గాజువాక",
        "aliases": [
            "gajuwaka industrial",
            "గాజువాక"
        ],
        "mandal": "Gajuwaka Mandal",
        "district": "Visakhapatnam",
        "postal_code": "530026",
        "latitude": 17.6811,
        "longitude": 83.182,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Lakshmipuram",
        "name_te": "లక్ష్మీపురం",
        "aliases": [
            "lakshmipuram dairy",
            "లక్ష్మీపురం"
        ],
        "mandal": "Anandapuram Mandal",
        "district": "Visakhapatnam",
        "postal_code": "530052",
        "latitude": 17.8924,
        "longitude": 83.3341,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Madhurawada",
        "name_te": "మధురవాడ",
        "aliases": [
            "madhurawada it sez",
            "మధురవాడ"
        ],
        "mandal": "Visakhapatnam Rural",
        "district": "Visakhapatnam",
        "postal_code": "530048",
        "latitude": 17.8184,
        "longitude": 83.3523,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Simhachalam",
        "name_te": "సింహాచలం",
        "aliases": [
            "simhachalam temple",
            "సింహాచలం"
        ],
        "mandal": "Gopalapatnam Mandal",
        "district": "Visakhapatnam",
        "postal_code": "530028",
        "latitude": 17.7667,
        "longitude": 83.25,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Anandapuram",
        "name_te": "ఆనందపురం",
        "aliases": [
            "anandapuram junction",
            "ఆనందపురం"
        ],
        "mandal": "Anandapuram Mandal",
        "district": "Visakhapatnam",
        "postal_code": "530052",
        "latitude": 17.9048,
        "longitude": 83.3444,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Gopalapatnam",
        "name_te": "గోపాలపట్నం",
        "aliases": [
            "gopalapatnam rly",
            "గోపాలపట్నం"
        ],
        "mandal": "Gopalapatnam Mandal",
        "district": "Visakhapatnam",
        "postal_code": "530027",
        "latitude": 17.7453,
        "longitude": 83.2208,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Kurmannapalem",
        "name_te": "కూర్మన్నపాలెం",
        "aliases": [
            "steel plant gate",
            "కూర్మన్నపాలెం"
        ],
        "mandal": "Gajuwaka Mandal",
        "district": "Visakhapatnam",
        "postal_code": "530046",
        "latitude": 17.6833,
        "longitude": 83.15,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Padmanabham",
        "name_te": "పద్మనాభం",
        "aliases": [
            "padmanabham mandal",
            "పద్మనాభం"
        ],
        "mandal": "Padmanabham Mandal",
        "district": "Visakhapatnam",
        "postal_code": "531219",
        "latitude": 17.9833,
        "longitude": 83.3333,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Pendurthi",
        "name_te": "పెందుర్తి",
        "aliases": [
            "pendurti",
            "పెందుర్తి"
        ],
        "mandal": "Pendurthi Mandal",
        "district": "Visakhapatnam",
        "postal_code": "531173",
        "latitude": 17.8319,
        "longitude": 83.1979,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Sontyam",
        "name_te": "సొంట్యం",
        "aliases": [
            "sontyam village",
            "సొంట్యం"
        ],
        "mandal": "Anandapuram Mandal",
        "district": "Visakhapatnam",
        "postal_code": "531173",
        "latitude": 17.8685,
        "longitude": 83.2922,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Vizianagaram",
        "name_te": "విజయనగరం",
        "aliases": [
            "city of music",
            "fort city",
            "fort town",
            "music city",
            "విజయనగరం"
        ],
        "mandal": "Vizianagaram Urban",
        "district": "Vizianagaram",
        "postal_code": "535001",
        "latitude": 18.1167,
        "longitude": 83.4167,
        "is_hq": True,
        "is_popular": True
    },
    {
        "village_or_town": "Bhogapuram",
        "name_te": "భోగాపురం",
        "aliases": [
            "bhogapuram international airport",
            "భోగాపురం"
        ],
        "mandal": "Bhogapuram Mandal",
        "district": "Vizianagaram",
        "postal_code": "535216",
        "latitude": 18.0167,
        "longitude": 83.4833,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Bobbili",
        "name_te": "బొబ్బిలి",
        "aliases": [
            "battle of bobbili",
            "bobbili battle",
            "bobbili veena",
            "బొబ్బిలి"
        ],
        "mandal": "Bobbili Mandal",
        "district": "Vizianagaram",
        "postal_code": "535558",
        "latitude": 18.5667,
        "longitude": 83.3667,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Cheepurupalli",
        "name_te": "చీపురుపల్లి",
        "aliases": [
            "cheepurupalle",
            "చీపురుపల్లి"
        ],
        "mandal": "Cheepurupalli Mandal",
        "district": "Vizianagaram",
        "postal_code": "535128",
        "latitude": 18.3,
        "longitude": 83.5667,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Kothavalasa",
        "name_te": "కొత్తవలస",
        "aliases": [
            "kothavalasa junction",
            "కొత్తవలస"
        ],
        "mandal": "Kothavalasa Mandal",
        "district": "Vizianagaram",
        "postal_code": "535183",
        "latitude": 17.9,
        "longitude": 83.2,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Rajam",
        "name_te": "రాజాం",
        "aliases": [
            "gmr rajam",
            "rajam town",
            "రాజాం"
        ],
        "mandal": "Rajam Mandal",
        "district": "Vizianagaram",
        "postal_code": "532127",
        "latitude": 18.45,
        "longitude": 83.65,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Srungavarapukota",
        "name_te": "శృంగవరపుకోట (ఎస్.కోట)",
        "aliases": [
            "s kota",
            "శృంగవరపుకోట"
        ],
        "mandal": "Srungavarapukota Mandal",
        "district": "Vizianagaram",
        "postal_code": "535145",
        "latitude": 18.1167,
        "longitude": 83.15,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Gajapathinagaram",
        "name_te": "గజపతినగరం",
        "aliases": [
            "gajapathinagaram town",
            "gp nagaram",
            "గజపతినగరం"
        ],
        "mandal": "Gajapathinagaram Mandal",
        "district": "Vizianagaram",
        "postal_code": "535270",
        "latitude": 18.2833,
        "longitude": 83.3333,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Nellimarla",
        "name_te": "నెల్లిమర్ల",
        "aliases": [
            "nellimarla jute",
            "నెల్లిమర్ల"
        ],
        "mandal": "Nellimarla Mandal",
        "district": "Vizianagaram",
        "postal_code": "535217",
        "latitude": 18.1667,
        "longitude": 83.4333,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Bhimavaram",
        "name_te": "భీమవరం",
        "aliases": [
            "aqua capital",
            "aqua hub",
            "bheemavaram",
            "భీమవరం"
        ],
        "mandal": "Bhimavaram Mandal",
        "district": "West Godavari",
        "postal_code": "534201",
        "latitude": 16.5449,
        "longitude": 81.5212,
        "is_hq": True,
        "is_popular": True
    },
    {
        "village_or_town": "Akividu",
        "name_te": "ఆకివీడు",
        "aliases": [
            "akividu aqua",
            "ఆకివీడు"
        ],
        "mandal": "Akividu Mandal",
        "district": "West Godavari",
        "postal_code": "534235",
        "latitude": 16.5833,
        "longitude": 81.3833,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Narasapuram",
        "name_te": "నరసాపురం",
        "aliases": [
            "narsapur",
            "narsapur lace",
            "narsapuram lace",
            "నరసాపురం"
        ],
        "mandal": "Narasapuram Mandal",
        "district": "West Godavari",
        "postal_code": "534275",
        "latitude": 16.4333,
        "longitude": 81.7,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Palakollu",
        "name_te": "పాలకొల్లు",
        "aliases": [
            "ksheerarama",
            "palakol",
            "పాలకొల్లు"
        ],
        "mandal": "Palakollu Mandal",
        "district": "West Godavari",
        "postal_code": "534260",
        "latitude": 16.5167,
        "longitude": 81.7333,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Tadepalligudem",
        "name_te": "తాడేపల్లిగూడెం",
        "aliases": [
            "tadepalligoodem",
            "tadepalligudam",
            "tp gudem",
            "tpg",
            "తాడేపల్లిగూడెం"
        ],
        "mandal": "Tadepalligudem Mandal",
        "district": "West Godavari",
        "postal_code": "534101",
        "latitude": 16.8139,
        "longitude": 81.5267,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Tanuku",
        "name_te": "తణుకు",
        "aliases": [
            "tanuku andhra sugars",
            "tanuku industrial",
            "తణుకు"
        ],
        "mandal": "Tanuku Mandal",
        "district": "West Godavari",
        "postal_code": "534211",
        "latitude": 16.7561,
        "longitude": 81.6828,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Achanta",
        "name_te": "ఆచంట",
        "aliases": [
            "achanta mandal",
            "ఆచంట"
        ],
        "mandal": "Achanta Mandal",
        "district": "West Godavari",
        "postal_code": "534123",
        "latitude": 16.6,
        "longitude": 81.8,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Attili",
        "name_te": "అత్తిలి",
        "aliases": [
            "attili mandal",
            "అత్తిలి"
        ],
        "mandal": "Attili Mandal",
        "district": "West Godavari",
        "postal_code": "534134",
        "latitude": 16.6833,
        "longitude": 81.6,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Mogalthur",
        "name_te": "మొగల్తూరు",
        "aliases": [
            "mogalthuru",
            "మొగల్తూరు"
        ],
        "mandal": "Mogalthur Mandal",
        "district": "West Godavari",
        "postal_code": "534281",
        "latitude": 16.4167,
        "longitude": 81.6,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Undi",
        "name_te": "ఉండి",
        "aliases": [
            "undi mandal",
            "ఉండి"
        ],
        "mandal": "Undi Mandal",
        "district": "West Godavari",
        "postal_code": "534199",
        "latitude": 16.5833,
        "longitude": 81.4667,
        "is_hq": False,
        "is_popular": False
    },
    {
        "village_or_town": "Kadapa",
        "name_te": "కడప (వైఎస్సార్ కడప)",
        "aliases": [
            "cuddapah",
            "kadapa city",
            "ysr kadapa",
            "కడప"
        ],
        "mandal": "Kadapa Mandal",
        "district": "YSR Kadapa",
        "postal_code": "516001",
        "latitude": 14.4673,
        "longitude": 78.8242,
        "is_hq": True,
        "is_popular": True
    },
    {
        "village_or_town": "Badvel",
        "name_te": "బద్వేలు",
        "aliases": [
            "badvel town",
            "badvelu town",
            "బద్వేలు"
        ],
        "mandal": "Badvel Mandal",
        "district": "YSR Kadapa",
        "postal_code": "516227",
        "latitude": 14.7333,
        "longitude": 79.05,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Gandikota",
        "name_te": "గండికోట",
        "aliases": [
            "grand canyon of india",
            "గండికోట"
        ],
        "mandal": "Jammalamadugu Mandal",
        "district": "YSR Kadapa",
        "postal_code": "516434",
        "latitude": 14.8167,
        "longitude": 78.2833,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Jammalamadugu",
        "name_te": "జమ్మలమడుగు",
        "aliases": [
            "gandikota gateway",
            "gandikota gorge",
            "జమ్మలమడుగు"
        ],
        "mandal": "Jammalamadugu Mandal",
        "district": "YSR Kadapa",
        "postal_code": "516434",
        "latitude": 14.85,
        "longitude": 78.3833,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Mydukur",
        "name_te": "మైదుకూరు",
        "aliases": [
            "maidukuru",
            "s mydukur",
            "మైదుకూరు"
        ],
        "mandal": "Mydukur Mandal",
        "district": "YSR Kadapa",
        "postal_code": "516172",
        "latitude": 14.7167,
        "longitude": 78.7833,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Proddatur",
        "name_te": "ప్రొద్దుటూరు",
        "aliases": [
            "gold city",
            "gold city proddatur",
            "proddutur",
            "second bombay",
            "ప్రొద్దుటూరు"
        ],
        "mandal": "Proddatur Mandal",
        "district": "YSR Kadapa",
        "postal_code": "516360",
        "latitude": 14.75,
        "longitude": 78.55,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Pulivendula",
        "name_te": "పులివెందుల",
        "aliases": [
            "pulivendla",
            "pulivendla banana",
            "పులివెందుల"
        ],
        "mandal": "Pulivendula Mandal",
        "district": "YSR Kadapa",
        "postal_code": "516390",
        "latitude": 14.4167,
        "longitude": 78.2333,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Vontimitta",
        "name_te": "ఒంటిమిట్ట",
        "aliases": [
            "kodandarama temple",
            "ఒంటిమిట్ట"
        ],
        "mandal": "Vontimitta Mandal",
        "district": "YSR Kadapa",
        "postal_code": "516213",
        "latitude": 14.3833,
        "longitude": 79.0333,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Yerraguntla",
        "name_te": "ఎర్రగుంట్ల",
        "aliases": [
            "yerraguntla cement",
            "ఎర్రగుంట్ల"
        ],
        "mandal": "Yerraguntla Mandal",
        "district": "YSR Kadapa",
        "postal_code": "516309",
        "latitude": 14.6333,
        "longitude": 78.5333,
        "is_hq": False,
        "is_popular": True
    },
    {
        "village_or_town": "Kamalapuram",
        "name_te": "కమలాపురం",
        "aliases": [
            "kamalapuram mandal",
            "కమలాపురం"
        ],
        "mandal": "Kamalapuram Mandal",
        "district": "YSR Kadapa",
        "postal_code": "516289",
        "latitude": 14.6,
        "longitude": 78.6667,
        "is_hq": False,
        "is_popular": False
    }
]

# Quick access helpers
POPULAR_AP_LOCATIONS = [loc for loc in AP_COMPREHENSIVE_LOCATIONS if loc.get("is_popular", False)]
DISTRICT_HEADQUARTERS = [loc for loc in AP_COMPREHENSIVE_LOCATIONS if loc.get("is_hq", False)]

def get_location_hierarchy() -> Dict[str, Any]:
    """
    Constructs the official administrative hierarchy:
      Andhra Pradesh -> District -> Mandal -> Village / Town / Locality
    Includes coordinates, official codes, Telugu names, and postal codes.
    """
    from collections import defaultdict
    hierarchy = defaultdict(lambda: defaultdict(list))
    
    for loc in AP_COMPREHENSIVE_LOCATIONS:
        dist = loc.get("district", "Andhra Pradesh")
        mandal = loc.get("mandal", "General Mandal")
        hierarchy[dist][mandal].append({
            "village_or_town": loc.get("village_or_town"),
            "name_te": loc.get("name_te"),
            "latitude": loc.get("latitude"),
            "longitude": loc.get("longitude"),
            "postal_code": loc.get("postal_code"),
            "location_code": loc.get("location_code") or loc.get("postal_code"),
            "is_hq": loc.get("is_hq", False),
            "is_popular": loc.get("is_popular", False),
            "resolved_name": f"{loc.get('village_or_town')}, {mandal}, {dist} District, Andhra Pradesh"
        })
    
    districts_list = []
    for dist in sorted(hierarchy.keys()):
        mandals_list = []
        for mndl in sorted(hierarchy[dist].keys()):
            mandals_list.append({
                "mandal": mndl,
                "villages": sorted(hierarchy[dist][mndl], key=lambda x: x["village_or_town"])
            })
        districts_list.append({
            "district": dist,
            "mandals": mandals_list
        })
        
    return {
        "state": "Andhra Pradesh",
        "total_districts": len(districts_list),
        "districts": districts_list
    }

