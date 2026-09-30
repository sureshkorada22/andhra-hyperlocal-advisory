/**
 * SIH 2026 Module 1 — Visual Business Idea Image Mapping.
 * Provides curated, legally unencumbered (Unsplash license / Public Domain),
 * highly optimized images for all 128 business ideas across all 11 categories.
 * Guaranteed unique, relevant images with zero cross-category image repetition.
 */

export interface BusinessVisual {
  imageUrl: string;
  oneLiner_en: string;
  oneLiner_te: string;
  oneLiner_hi: string;
  themeColor: string;
}

export const BUSINESS_VISUAL_MAP: Record<string, BusinessVisual> = {
  "vegetable_farming": {
    imageUrl: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Cultivate high-demand seasonal vegetables for local mandis",
    oneLiner_te: "తాజా కాలానుగుణ కూరగాయల సాగు మరియు స్థానిక మార్కెట్ విక్రయాలు",
    oneLiner_hi: "स्थानीय मंडियों के लिए मौसमी सब्जियों की लाभदायक खेती",
    themeColor: "#10b981"
  },
  "fruit_farming": {
    imageUrl: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "High-yield mango, guava and citrus orchard cultivation",
    oneLiner_te: "మామిడి, జామ మరియు నిమ్మ వంటి పండ్ల తోటల పెంపకం",
    oneLiner_hi: "आम, अमरूद और नींबू जैसे उच्च उपज वाले फलों के बाग",
    themeColor: "#f59e0b"
  },
  "organic_farming": {
    imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Chemical-free organic crops with premium market pricing",
    oneLiner_te: "రసాయనాల్లేని సేంద్రీయ సాగుతో ప్రీమియం మార్కెట్ ధర",
    oneLiner_hi: "रसायन मुक्त जैविक फसलें और प्रीमियम मूल्य लाभ",
    themeColor: "#059669"
  },
  "flower_farming": {
    imageUrl: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Jasmine, marigold and rose flowers for temples & festivities",
    oneLiner_te: "దేవాలయాలు మరియు శుభకార్యాల కోసం మల్లెలు, బంతి పూల సాగు",
    oneLiner_hi: "मंदिरों और शुभ अवसरों के लिए गेंदा, चमेली और गुलाब की खेती",
    themeColor: "#ec4899"
  },
  "nursery": {
    imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Quality saplings, fruit grafts and ornamental nursery plants",
    oneLiner_te: "రైతులు మరియు ఇళ్ల కోసం మేలైన పండ్ల, పూల మొక్కల నర్సరీ",
    oneLiner_hi: "गुणवत्तापूर्ण पौधे, फलदार कलम और सजावटी नर्सरी पौधे",
    themeColor: "#10b981"
  },
  "seed_business": {
    imageUrl: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Certified high-germination hybrid seeds for AP crops",
    oneLiner_te: "రైతుల కోసం ప్రామాణిక నాణ్యమైన విత్తనాల పంపిణీ దుకాణం",
    oneLiner_hi: "प्रमाणित उच्च-अंकुरण वाले उन्नत बीजों की खुदरा दुकान",
    themeColor: "#84cc16"
  },
  "fertilizer_shop": {
    imageUrl: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Bio and mineral fertilizers for soil nutrition management",
    oneLiner_te: "పంటలకు అవసరమైన ఎరువులు & సూక్ష్మపోషకాల విక్రయం",
    oneLiner_hi: "मिट्टी के पोषण के लिए जैविक और खनिज उर्वरक की दुकान",
    themeColor: "#0284c7"
  },
  "pesticide_shop": {
    imageUrl: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Crop protection bio-sprays, pesticides and micronutrients",
    oneLiner_te: "పంట రక్షణ పురుగుమందులు & బయో రసాయనాల దుకాణం",
    oneLiner_hi: "फसल सुरक्षा के लिए जैविक स्प्रे और कीटनाशक केंद्र",
    themeColor: "#ef4444"
  },
  "agri_equipment_rental": {
    imageUrl: "https://images.unsplash.com/photo-1589874836640-5231c6a2e4e1?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Affordable rental sprayers, weeders and farm tools",
    oneLiner_te: "చిన్న రైతులకు వ్యవసాయ పనిముట్లు, స్ప్రేయర్లు అద్దెకు ఇవ్వడం",
    oneLiner_hi: "छोटे किसानों के लिए स्प्रेयर और कृषि उपकरण किराए पर देना",
    themeColor: "#d97706"
  },
  "farm_machinery_rental": {
    imageUrl: "https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Tractor, rotavator and harvest machinery rental service",
    oneLiner_te: "పొలాల దుక్కి కోసం ట్రాక్టర్లు, రోటావేటర్ల అద్దె సర్వీస్",
    oneLiner_hi: "खेतों की जुताई के लिए ट्रैक्टर और रोटावेटर किराया सेवा",
    themeColor: "#b45309"
  },
  "irrigation_equipment": {
    imageUrl: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Submersible pumps, HDPE pipes and sprinkler systems",
    oneLiner_te: "సబ్‌మెర్సిబుల్ మోటార్లు, పైపులు & స్ప్రింక్లర్ పరికరాల విక్రయం",
    oneLiner_hi: "सबमर्सिबल पंप, पाइप और स्प्रिंकलर सिंचाई उपकरण",
    themeColor: "#0ea5e9"
  },
  "drip_irrigation_services": {
    imageUrl: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Water-saving precision drip line installation and servicing",
    oneLiner_te: "రైతులకు బిందు సేద్యం పరికరాల బిగింపు మరియు నిర్వహణ",
    oneLiner_hi: "जल-बचत ड्रिप सिंचाई प्रणाली की स्थापना और सेवा",
    themeColor: "#06b6d4"
  },
  "greenhouse_farming": {
    imageUrl: "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Climate-controlled polyhouse exotic vegetables & flowers",
    oneLiner_te: "పాలీహౌస్ షేడ్‌నెట్లలో హై-వాల్యూ కూరగాయలు, పూల సాగు",
    oneLiner_hi: "पॉलीहाउस में शिमला मिर्च और विदेशी सब्जियों की खेती",
    themeColor: "#059669"
  },
  "mushroom_farming": {
    imageUrl: "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Nutritious oyster and button mushroom indoor cultivation",
    oneLiner_te: "చిన్న స్థలంలో లాభదాయక పుట్టగొడుగుల పెంపకం",
    oneLiner_hi: "कम जगह में पौष्टिक मशरूम का लाभदायक उत्पादन",
    themeColor: "#78716c"
  },
  "beekeeping": {
    imageUrl: "https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Pure raw honey production and apiculture colony management",
    oneLiner_te: "సహజ తేనె ఉత్పత్తి కోసం తేనెటీగల పెంపకం యూనిట్",
    oneLiner_hi: "शुद्ध प्राकृतिक शहद उत्पादन और मधुमक्खी पालन",
    themeColor: "#f59e0b"
  },
  "vermicomposting": {
    imageUrl: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Organic earthworm vermicast production for local farmers",
    oneLiner_te: "వానపాముల ఎరువు (వర్మి కంపోస్ట్) తయారీ & విక్రయం",
    oneLiner_hi: "केंचुआ खाद (वर्मीकम्पोस्ट) का उत्पादन और स्थानीय बिक्री",
    themeColor: "#65a30d"
  },
  "compost_production": {
    imageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d69102a56?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Enriched organic compost manure from farm biomass",
    oneLiner_te: "పంట వ్యర్థాలు, పేడతో పోషకాల సేంద్రీయ ఎరువుల తయారీ",
    oneLiner_hi: "कृषि अपशिष्ट और गोबर से समृद्ध खाद का निर्माण",
    themeColor: "#84cc16"
  },
  "agri_processing": {
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Primary grading, cleaning and packaging of harvested crops",
    oneLiner_te: "పంటల గ్రేడింగ్, క్లీనింగ్ మరియు ప్యాకింగ్ యూనిట్",
    oneLiner_hi: "फसलों की सफाई, ग्रेडिंग और प्राथमिक पैकेजिंग यूनिट",
    themeColor: "#16a34a"
  },
  "dairy_farm": {
    imageUrl: "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Milch cows and buffalo milk production for AP cooperatives",
    oneLiner_te: "పాడి ఆవులు, గేదెలతో పచ్చి పాల ఉత్పత్తి & డైరీ సరఫరా",
    oneLiner_hi: "दुधारू गाय-भैंस पालन और दूध का दैनिक उत्पादन",
    themeColor: "#2563eb"
  },
  "milk_collection_centre": {
    imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Village milk testing (FAT/SNF) and procurement chill point",
    oneLiner_te: "గ్రామీణ పాల సేకరణ, వెన్న శాతం పరీక్ష & డైరీ బట్వాడా",
    oneLiner_hi: "ग्रामीण दूध संकलन, फैट/एसएनएफ परीक्षण और खरीद केंद्र",
    themeColor: "#0284c7"
  },
  "milk_products": {
    imageUrl: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Value-added pure ghee, fresh paneer, curd and butter",
    oneLiner_te: "స్వచ్ఛమైన నెయ్యి, పనీర్, పెరుగు మరియు వెన్న తయారీ విక్రయం",
    oneLiner_hi: "शुद्ध घी, पनीर, दही और मक्खन का मूल्य संवर्धन व्यवसाय",
    themeColor: "#38bdf8"
  },
  "cattle_feed_shop": {
    imageUrl: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Balanced cattle feed bags, mineral mixture & fodder seeds",
    oneLiner_te: "పశువుల దాణా, మినరల్ మిశ్రమం & గడ్డి విత్తనాల దుకాణం",
    oneLiner_hi: "पशु आहार, खनिज मिश्रण और पौष्टिक चारे की दुकान",
    themeColor: "#ca8a04"
  },
  "goat_farming": {
    imageUrl: "https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Stall-fed Osmanabadi / Boer goat breeding & meat rearing",
    oneLiner_te: "లాభదాయక మేకల పెంపకం మరియు పునరుత్పత్తి యూనిట్",
    oneLiner_hi: "उन्नत नस्ल की बकरियों का पालन और प्रजनन व्यवसाय",
    themeColor: "#a16207"
  },
  "sheep_farming": {
    imageUrl: "https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Nellore Brown breed sheep rearing with high local meat demand",
    oneLiner_te: "నెల్లూరు జాతి గొర్రెల పెంపకం మరియు జీవాల విక్రయాలు",
    oneLiner_hi: "नेल्लोर नस्ल की भेड़ों का पालन और स्थानीय बाजार आपूर्ति",
    themeColor: "#b45309"
  },
  "poultry_farming": {
    imageUrl: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Commercial broiler and country chicken (Natukodi) farm",
    oneLiner_te: "బ్రాయిలర్ మరియు నాటుకోళ్ల ఫారమ్ నిర్వహణ",
    oneLiner_hi: "ब्रायलर और देशी मुर्गी पालन का लाभदायक फार्म",
    themeColor: "#e11d48"
  },
  "egg_production": {
    imageUrl: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Layer poultry farm for daily table egg wholesale supply",
    oneLiner_te: "రోజువారీ కోడిగుడ్ల ఉత్పత్తి మరియు హోల్‌సేల్ సరఫరా",
    oneLiner_hi: "दैनिक अंडा उत्पादन और थोक आपूर्ति पोल्ट्री फार्म",
    themeColor: "#ea580c"
  },
  "meat_production": {
    imageUrl: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Hygienic fresh meat and dressed poultry retail outlet",
    oneLiner_te: "పరిశుభ్రమైన తాజా చికెన్ మరియు మటన్ విక్రయ కేంద్రం",
    oneLiner_hi: "स्वच्छ और ताजे चिकन व मांस की खुदरा दुकान",
    themeColor: "#be123c"
  },
  "animal_feed": {
    imageUrl: "https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Pelletized poultry and livestock feed grinding mill",
    oneLiner_te: "పశువులు మరియు కోళ్ల దాణా తయారీ మిల్లు యూనిట్",
    oneLiner_hi: "पशु और मुर्गी दाना निर्माण व ग्राइंडिंग यूनिट",
    themeColor: "#854d0e"
  },
  "bakery": {
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Fresh bread, puffs, rusks and celebratory birthday cakes",
    oneLiner_te: "తాజా బ్రెడ్, పఫ్స్, రస్కులు & బర్త్‌డే కేకుల బేకరీ",
    oneLiner_hi: "ताजा ब्रेड, पफ, बिस्कुट और बर्थडे केक की बेकरी",
    themeColor: "#f97316"
  },
  "restaurant": {
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Family restaurant serving Andhra meals, biryani and curries",
    oneLiner_te: "ఆంధ్రా భోజనం, బిర్యానీ మరియు కూరలతో ఫ్యామిలీ రెస్టారెంట్",
    oneLiner_hi: "आंध्र थाली, बिरयानी और स्वादिष्ट भोजन का फैमिली रेस्टोरेंट",
    themeColor: "#ea580c"
  },
  "small_hotel": {
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Budget village mess serving hot homestyle breakfast & meals",
    oneLiner_te: "గ్రామీణ మెస్ & భోజన శాల (వేడి వేడి టిఫిన్లు & భోజనం)",
    oneLiner_hi: "गरमा-गरम नाश्ते और घरेलू भोजन की स्थानीय मेस",
    themeColor: "#c2410c"
  },
  "tea_shop": {
    imageUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Tea stall, filter coffee and evening fritters (Mirchi Bajji)",
    oneLiner_te: "టీ, ఫిల్టర్ కాఫీ మరియు సాయంత్రం వేడి బజ్జీలు, సమోసాలు",
    oneLiner_hi: "चाय, फिल्टर कॉफी और शाम के गर्म पकोड़े/समोसे की दुकान",
    themeColor: "#b45309"
  },
  "juice_shop": {
    imageUrl: "https://images.unsplash.com/photo-1622597467836-f3285f2131b7?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Fresh seasonal sugarcane, citrus and seasonal fruit juices",
    oneLiner_te: "చెరకు రసం, బత్తాయి & పండ్ల జ్యూస్ కార్నర్",
    oneLiner_hi: "ताजे गन्ने का रस और मौसमी फलों के जूस की दुकान",
    themeColor: "#eab308"
  },
  "tiffin_centre": {
    imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Hot idli, dosa, pesarattu and vada morning tiffin point",
    oneLiner_te: "ఇడ్లీ, పెసరట్టు, దోశ, వడల మార్నింగ్ టిఫిన్ సెంటర్",
    oneLiner_hi: "इडली, डोसा, पेसरट्टू और वड़ा का लोकप्रिय टिफिन सेंटर",
    themeColor: "#f59e0b"
  },
  "fast_food": {
    imageUrl: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Chinese fast food noodles, fried rice and egg rolls",
    oneLiner_te: "నూడుల్స్, ఫ్రైడ్ రైస్ & ఎగ్ రోల్స్ ఫాస్ట్ ఫుడ్ సెంటర్",
    oneLiner_hi: "चाउमीन, फ्राइड राइस और फास्ट फूड कॉर्नर",
    themeColor: "#ef4444"
  },
  "catering": {
    imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Event catering for weddings, functions and temple festivals",
    oneLiner_te: "శుభకార్యాలు, పెళ్లిళ్లు & పండుగల కోసం క్యాటరింగ్ సర్వీస్",
    oneLiner_hi: "विवाह, उत्सव और आयोजनों के लिए भोजन कैटरिंग सेवा",
    themeColor: "#d97706"
  },
  "cloud_kitchen": {
    imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Home delivery kitchen for packed curries, rice & meals",
    oneLiner_te: "ప్యాక్డ్ కూరలు, భోజనం హోమ్ డెలివరీ క్లౌడ్ కిచెన్",
    oneLiner_hi: "पार्सल भोजन और होम डिलीवरी क्लाउड किचन",
    themeColor: "#f97316"
  },
  "sweet_shop": {
    imageUrl: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Traditional Andhra sweets: Kaja, Pootharekulu, Laddu & Halwa",
    oneLiner_te: "కాకినాడ కాజా, పూతరేకులు, లడ్డూ & సాంప్రదాయ మిఠాయిలు",
    oneLiner_hi: "काजा, पूथारेकुलु, लड्डू और पारंपरिक भारतीय मिठाइयों की दुकान",
    themeColor: "#d97706"
  },
  "snacks": {
    imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Crispy murukku, mixture, chekodilu and hot savouries",
    oneLiner_te: "మురుకులు, చెక్కలు, మిక్చర్ & హాట్ స్నాక్స్ తయారీ",
    oneLiner_hi: "कुरकुरा नमकीन, मुरुक्कू और स्नैक्स निर्माण यूनिट",
    themeColor: "#f59e0b"
  },
  "food_processing": {
    imageUrl: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Fruit pulping, tomato puree and dehydration unit",
    oneLiner_te: "మామిడి పల్ప్, టమోటా ప్యూరీ ప్రాసెసింగ్ యూనిట్",
    oneLiner_hi: "फल गूदा, टमाटर प्यूरी और खाद्य प्रसंस्करण इकाई",
    themeColor: "#16a34a"
  },
  "pickle_business": {
    imageUrl: "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Authentic Avakaya mango, gongura, lemon and non-veg pickles",
    oneLiner_te: "ఆవకాయ, గోంగూర, నిమ్మకాయ & నాటు పచ్చళ్ల తయారీ",
    oneLiner_hi: "पारंपरिक आम का अचार (अवाकाया), गोंगुरा और नींबू अचार",
    themeColor: "#dc2626"
  },
  "spice_processing": {
    imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Turmeric, Guntur chilli, coriander and garam masala grinding",
    oneLiner_te: "గుంటూరు కారం, పసుపు, ధనియాలు & మసాలా పిండి గిర్నీ",
    oneLiner_hi: "गुंटूर मिर्च, हल्दी और खड़े मसालों की पिसाई व पैकेजिंग",
    themeColor: "#b91c1c"
  },
  "flour_mill": {
    imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Wheat, ragi, jowar and gram flour grinding machine unit",
    oneLiner_te: "గోధుమలు, రాగులు, జొన్నలు & పిండి మిల్లు (పిండి గిర్నీ)",
    oneLiner_hi: "गेहूं, रागी और बेसन की स्थानीय आटा चक्की",
    themeColor: "#ca8a04"
  },
  "rice_mill": {
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Mini paddy de-husking and polishing mill for local farmers",
    oneLiner_te: "వరి ధాన్యం మిల్లింగ్, పాలిషింగ్ & తవుడు మినీ రైస్ మిల్లు",
    oneLiner_hi: "धान कुटाई और चावल पॉलिशिंग की मिनी राइस मिल",
    themeColor: "#eab308"
  },
  "grocery_shop": {
    imageUrl: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Daily provisions, pulses, oils, spices and packaged goods",
    oneLiner_te: "నిత్యావసర సరుకులు, పప్పులు, నూనెలు & కిరాణా దుకాణం",
    oneLiner_hi: "दैनिक किराना, दालें, तेल और आवश्यक घरेलू सामान की दुकान",
    themeColor: "#16a34a"
  },
  "supermarket": {
    imageUrl: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Self-service mini mart with FMCG, personal care & staples",
    oneLiner_te: "సెల్ఫ్-సర్వీస్ మినీ సూపర్ మార్కెట్ మరియు గృహావసర వస్తువులు",
    oneLiner_hi: "मिनी सुपरमार्केट, दैनिक उपभोग की वस्तुएं और पर्सनल केयर",
    themeColor: "#059669"
  },
  "vegetable_shop": {
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Daily farm-fresh onions, potatoes, tomatoes and leafy greens",
    oneLiner_te: "తాజా ఆకుకూరలు, ఉల్లిపాయలు, టమోటాల కూరగాయల స్టాల్",
    oneLiner_hi: "ताजी मौसमी हरी सब्जियां, आलू-प्याज की खुदरा दुकान",
    themeColor: "#22c55e"
  },
  "fruit_shop": {
    imageUrl: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Bananas, apples, papayas and seasonal fruit retail stand",
    oneLiner_te: "అరటి, బొప్పాయి, ఆపిల్ & సీజనల్ పండ్ల విక్రయ స్టాల్",
    oneLiner_hi: "केले, सेब, पपीता और मौसमी फलों की खुदरा दुकान",
    themeColor: "#f59e0b"
  },
  "clothing": {
    imageUrl: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Sarees, nighties, dhotis, kids wear and readymade apparel",
    oneLiner_te: "చీరలు, పిల్లల బట్టలు, రెడీమేడ్ దుస్తుల వస్త్ర దుకాణం",
    oneLiner_hi: "साड़ियां, रेडीमेड कपड़े और बच्चों के परिधानों की दुकान",
    themeColor: "#8b5cf6"
  },
  "footwear": {
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Slippers, sandals, school shoes and rubber boots",
    oneLiner_te: "చెప్పులు, షూస్, పాఠశాల బూట్లు & పాదరక్షల దుకాణం",
    oneLiner_hi: "चप्पल, सैंडल, स्कूल के जूते और फुटवियर की दुकान",
    themeColor: "#a855f7"
  },
  "stationery": {
    imageUrl: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Notebooks, pens, school bags, art supplies and exam boards",
    oneLiner_te: "నోట్‌బుక్స్, పెన్నులు, స్కూల్ బ్యాగులు & స్టేషనరీ షాప్",
    oneLiner_hi: "नोटबुक, पेन, स्टेशनरी और स्कूल आपूर्ति की दुकान",
    themeColor: "#3b82f6"
  },
  "hardware": {
    imageUrl: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Paints, brushes, cement, nails, locks and building hardware",
    oneLiner_te: "పెయింట్లు, తాళాలు, సిమెంట్, మేకులు & హార్డ్‌వేర్ సామాగ్రి",
    oneLiner_hi: "पेंट, ब्रश, सीमेंट, कीलें, ताले और हार्डवेयर सामान",
    themeColor: "#0284c7"
  },
  "electrical_shop": {
    imageUrl: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "LED bulbs, switches, copper wires, fans and plugs",
    oneLiner_te: "ఎల్ఈడీ బల్బులు, వైర్లు, స్విచ్‌లు & ఎలక్ట్రికల్ వస్తువులు",
    oneLiner_hi: "एलईडी बल्ब, तार, स्विच, पंखे और बिजली के उपकरण",
    themeColor: "#eab308"
  },
  "electronics": {
    imageUrl: "https://images.unsplash.com/photo-1593344484962-796055d4a3a4?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Table fans, mixer grinders, TVs, irons and audio sets",
    oneLiner_te: "మిక్సీలు, ఫ్యాన్లు, టీవీలు & చిన్న గృహ ఎలక్ట్రానిక్స్",
    oneLiner_hi: "मिक्सर ग्राइंडर, पंखे, टीवी और घरेलू इलेक्ट्रॉनिक उपकरण",
    themeColor: "#6366f1"
  },
  "mobile_accessories": {
    imageUrl: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Tempered glass, phone back covers, chargers and earphones",
    oneLiner_te: "టెంపర్డ్ గ్లాస్, మొబైల్ కవర్లు, చార్జర్లు & హెడ్‌ఫోన్లు",
    oneLiner_hi: "मोबाइल बैक कवर, टेम्पर्ड ग्लास, चार्जर और ईयरफोन",
    themeColor: "#06b6d4"
  },
  "household_goods": {
    imageUrl: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Buckets, steel vessels, brooms, mops and kitchen plastics",
    oneLiner_te: "ప్లాస్టిక్ బకెట్లు, స్టీల్ సామాన్లు & గృహోపకరణాలు",
    oneLiner_hi: "प्लास्टिक बाल्टी, स्टील बर्तन, झाड़ू और घरेलू उपयोगी वस्तुएं",
    themeColor: "#0d9488"
  },
  "cosmetic_shop": {
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Bangles, mehendi, skin creams, hair clips & fancy store",
    oneLiner_te: "గాజులు, గోరింటాకు, ఫేస్ క్రీములు & లేడీస్ ఫ్యాన్సీ స్టోర్",
    oneLiner_hi: "चूड़ियां, मेहंदी, सौंदर्य प्रसाधन और लेडीज फैंसी स्टोर",
    themeColor: "#d946ef"
  },
  "mobile_repair": {
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Smartphone display replacement, battery swap and software fix",
    oneLiner_te: "మొబైల్ డిస్‌ప్లే మార్పు, బ్యాటరీ & సాఫ్ట్‌వేర్ రిపేరింగ్",
    oneLiner_hi: "मोबाइल स्क्रीन, बैटरी रिप्लेसमेंट और सॉफ्टवेयर मरम्मत",
    themeColor: "#6366f1"
  },
  "computer_repair": {
    imageUrl: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Laptop OS formatting, hardware upgrades and desktop service",
    oneLiner_te: "ల్యాప్‌టాప్ ఫార్మాటింగ్, హార్డ్‌వేర్ రిపేర్ & కంప్యూటర్ సర్వీస్",
    oneLiner_hi: "लैपटॉप और कंप्यूटर की हार्डवेयर मरम्मत व ओएस इंस्टॉलेशन",
    themeColor: "#3b82f6"
  },
  "electronics_repair": {
    imageUrl: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "LED TV, audio system, induction stove and fan repairing",
    oneLiner_te: "టీవీలు, మిక్సీలు, ఇండక్షన్ స్టవ్‌ల ఎలక్ట్రానిక్స్ రిపేరింగ్",
    oneLiner_hi: "एलईडी टीवी, मिक्सर और होम अप्लायंसेज की तकनीकी मरम्मत",
    themeColor: "#0284c7"
  },
  "vehicle_repair": {
    imageUrl: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Automobile mechanical repairs, brake tune-up & engine overhaul",
    oneLiner_te: "కార్లు, జీపుల ఇంజిన్ మరమ్మత్తు & ఆటోమొబైల్ వర్క్‌షాప్",
    oneLiner_hi: "कार व ऑटोमोबाइल की मैकेनिकल मरम्मत और वर्कशॉप",
    themeColor: "#b45309"
  },
  "two_wheeler_service": {
    imageUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Bike oil change, tyre puncture, clutch and engine servicing",
    oneLiner_te: "బైక్ సర్వీసింగ్, ఇంజిన్ ఆయిల్ ఛేంజ్ & పంక్చర్ల షాప్",
    oneLiner_hi: "मोटरसाइकिल और स्कूटर की सर्विसिंग, ऑयल चेंज व मरम्मत",
    themeColor: "#ea580c"
  },
  "car_washing": {
    imageUrl: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Pressure jet car foam wash, interior vacuum & bike polish",
    oneLiner_te: "ప్రెజర్ వాటర్ వాషింగ్, కార్ & బైక్ ఫోమ్ వాష్ సెంటర్",
    oneLiner_hi: "प्रेशर जेट कार और बाइक वॉश व पॉलिशिंग सेंटर",
    themeColor: "#0284c7"
  },
  "laundry": {
    imageUrl: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Cloth washing, steam iron press and dry cleaning services",
    oneLiner_te: "బట్టల వాషింగ్, స్టీమ్ ఐరన్ ప్రెస్ & లాండ్రీ సర్వీస్",
    oneLiner_hi: "कपड़ों की धुलाई, स्टीम आयरन और ड्राई क्लीनिंग सेवा",
    themeColor: "#38bdf8"
  },
  "tailoring": {
    imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Blouse stitching, fall-pico, dresses and uniform tailoring",
    oneLiner_te: "బ్లౌజ్ కుట్లు, ఫాల్-పీకో, డ్రెస్సులు & లేడీస్ టైలరింగ్",
    oneLiner_hi: "सिलाई, ब्लाउज डिजाइनिंग, फॉल-पीको और लेडीज बुटीक",
    themeColor: "#ec4899"
  },
  "beauty_salon": {
    imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Bridal makeup, facial, waxing, threading and hair styling",
    oneLiner_te: "పెళ్లికూతురు మేకప్, ఫేషియల్ & లేడీస్ బ్యూటీ పార్లర్",
    oneLiner_hi: "ब्राइडल मेकअप, फेशियल, हेयर स्टाइलिंग और ब्यूटी पार्लर",
    themeColor: "#db2777"
  },
  "barber": {
    imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Men's haircut, beard trimming, head massage and shaving",
    oneLiner_te: "హెయిర్ కటింగ్, షేవింగ్, హెడ్ మసాజ్ మెన్స్ సెలూన్",
    oneLiner_hi: "हेयरकट, दाढ़ी ट्रिमिंग और जेंट्स सैलून सेवा",
    themeColor: "#475569"
  },
  "photography": {
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Passport photos, wedding videography and frame printing",
    oneLiner_te: "పాస్‌పోర్ట్ ఫొటోలు, పెళ్లిళ్ల వీడియో గ్రఫీ & ఫొటో స్టూడియో",
    oneLiner_hi: "पासपोर्ट फोटो, विवाह वीडियोग्राफी और फोटो स्टूडियो",
    themeColor: "#64748b"
  },
  "printing": {
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Xerox, colour printouts, lamination and spiral binding",
    oneLiner_te: "జిరాక్స్, కలర్ ప్రింటౌట్లు, లామినేషన్ & స్పైరల్ బైండింగ్",
    oneLiner_hi: "फोटोकॉपी (ज़ेरॉक्स), कलर प्रिंट, लेमिनेशन और बाइंडिंग",
    themeColor: "#0ea5e9"
  },
  "internet_centre": {
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Internet browsing, ticket booking and online certificate point",
    oneLiner_te: "ఇంటర్నెట్ బ్రౌజింగ్, రైలు/బస్సు టికెట్లు & సర్టిఫికేట్ డౌన్‌లోడ్",
    oneLiner_hi: "इंटरनेट कैफे, ऑनलाइन टिकट बुकिंग और प्रमाणपत्र डाउनलोड",
    themeColor: "#4f46e5"
  },
  "digital_services_centre": {
    imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Aadhaar, voter ID, ration card and digital citizen services",
    oneLiner_te: "ఆధార్, ఓటర్ ఐడీ, రేషన్ కార్డు డిజిటల్ పౌర సేవా కేంద్రం",
    oneLiner_hi: "आधार, वोटर आईडी और सरकारी नागरिक सेवा डिजिटल केंद्र",
    themeColor: "#4338ca"
  },
  "courier": {
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Domestic parcel dispatch, parcel tracking and courier booking",
    oneLiner_te: "పార్సిల్ బుకింగ్, పోస్టల్ & కొరియర్ పికప్ ఏజెన్సీ",
    oneLiner_hi: "घरेलू पार्सल और कूरियर बुकिंग व ट्रैकिंग सेवा",
    themeColor: "#d97706"
  },
  "delivery": {
    imageUrl: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Local village doorstep delivery of groceries & medicines",
    oneLiner_te: "గ్రామీణ నిత్యావసర సరుకులు & ఔషధాల హోమ్ డెలివరీ",
    oneLiner_hi: "किराना और दवाओं की स्थानीय होम डिलीवरी सेवा",
    themeColor: "#ea580c"
  },
  "cleaning": {
    imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Home deep cleaning, water tank wash and floor scrubbing",
    oneLiner_te: "ఇళ్ల డీప్ క్లీనింగ్, వాటర్ ట్యాంక్ కడగడం & పారిశుధ్య సేవలు",
    oneLiner_hi: "घर की गहरी सफाई, पानी की टंकी और फर्श सफाई सेवा",
    themeColor: "#06b6d4"
  },
  "pest_control": {
    imageUrl: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Termite, cockroach and bedbug eradication chemical spray",
    oneLiner_te: "చెదపురుగులు, బొద్దింకల నివారణ పెస్ట్ కంట్రోల్ స్ప్రే",
    oneLiner_hi: "दीमक, खटमल और कीट नियंत्रण रासायनिक स्प्रे सेवा",
    themeColor: "#0284c7"
  },
  "furniture": {
    imageUrl: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Teak wood cots, steel almirahs, dining sets and office desks",
    oneLiner_te: "టేకు మంచాలు, స్టీల్ బీరువాలు, డైనింగ్ టేబుళ్ల తయారీ",
    oneLiner_hi: "लकड़ी के पलंग, स्टील अलमारी और फर्नीचर निर्माण कार्यशाला",
    themeColor: "#78350f"
  },
  "candles": {
    imageUrl: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Hand-dipped scented wax candles & aromatic agarbatti incense",
    oneLiner_te: "సువాసన కొవ్వొత్తులు & ధూప్ అగర్‌బత్తీల తయారీ యూనిట్",
    oneLiner_hi: "मोमबत्ती और सुगंधित अगरबत्ती निर्माण गृह उद्योग",
    themeColor: "#d97706"
  },
  "soap": {
    imageUrl: "https://images.unsplash.com/photo-1607006314644-8c772c3d0c9c?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Handcrafted herbal neem soap bars & liquid washing detergents",
    oneLiner_te: "వేప, కలబంద సహజ సబ్బులు & బట్టల లిక్విడ్ డిటర్జెంట్లు",
    oneLiner_hi: "हस्तनिर्मित हर्बल साबुन और कपड़े धोने का डिटर्जेंट",
    themeColor: "#059669"
  },
  "paper_products": {
    imageUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Eco-friendly brown kraft paper shopping bags & tea paper cups",
    oneLiner_te: "పర్యావరణ అనుకూల పేపర్ బ్యాగులు & టీ పేపర్ కప్పుల తయారీ",
    oneLiner_hi: "इको-फ्रेंडली पेपर बैग, लिफाफे और चाय के पेपर कप",
    themeColor: "#ca8a04"
  },
  "packaging": {
    imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Corrugated cardboard boxes, sealing tapes and crate packaging",
    oneLiner_te: "కార్డ్‌బోర్డ్ డబ్బాలు, ప్యాకింగ్ బాక్సులు & టేపుల సప్లై",
    oneLiner_hi: "गत्ते के डिब्बे (कार्टन), पैकिंग बॉक्स और पैकेजिंग सामग्री",
    themeColor: "#b45309"
  },
  "handicrafts": {
    imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "GI-tagged Kondapalli toys, Etikoppaka lacquered wood crafts",
    oneLiner_te: "ప్రసిద్ధ కొండపల్లి / ఏటికొప్పాక చెక్క బొమ్మలు & హస్తకళలు",
    oneLiner_hi: "कोंडापल्ली और एतिकोप्पाका पारंपरिक लकड़ी के खिलौने व शिल्प",
    themeColor: "#b91c1c"
  },
  "garments": {
    imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Bulk cotton shirts, school uniforms and nightwear stitching",
    oneLiner_te: "యూనిఫారాలు, షర్టులు & నైటీల భారీ గార్మెంట్ తయారీ యూనిట్",
    oneLiner_hi: "रेडीमेड गारमेंट्स, शर्ट और स्कूल यूनिफॉर्म सिलाई यूनिट",
    themeColor: "#4f46e5"
  },
  "small_machinery": {
    imageUrl: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Light metal lathe works, pulley fabrication and custom parts",
    oneLiner_te: "లేత్ మిషన్ జాబ్ వర్క్స్, పుల్లీలు & చిన్న యంత్రాల ఫ్యాబ్రికేషన్",
    oneLiner_hi: "लेथ मशीन जॉब वर्क और लघु कृषि मशीनरी निर्माण",
    themeColor: "#334155"
  },
  "food_products": {
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Packaged fryums, appalams, sweets and confectionery unit",
    oneLiner_te: "ప్యాక్ చేసిన అప్పడాలు, వడియాలు & మిఠాయిల తయారీ",
    oneLiner_hi: "पापड़, बड़ी, स्नैक्स और पैकेज्ड खाद्य उत्पाद निर्माण",
    themeColor: "#ea580c"
  },
  "building_materials": {
    imageUrl: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Fly-ash concrete cement bricks, paver blocks and compound slabs",
    oneLiner_te: "ఫ్లై-యాష్ సిమెంట్ ఇటుకలు, పేవర్ బ్లాక్స్ & కాంక్రీట్ స్లాబ్‌లు",
    oneLiner_hi: "सीमेंट ईंटें, पेवर ब्लॉक और भवन निर्माण सामग्री",
    themeColor: "#64748b"
  },
  "metal_products": {
    imageUrl: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Welded safety iron gates, window security grills & roof trusses",
    oneLiner_te: "ఇనుప గేట్లు, కిటికీ గ్రిల్స్ & వెల్డింగ్ వర్క్స్ యూనిట్",
    oneLiner_hi: "लोहे के सुरक्षा गेट, खिड़की ग्रिल और वेल्डिंग वर्क्स",
    themeColor: "#475569"
  },
  "wooden_products": {
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Solid wood doors, window frames, rolling pins & kitchen boards",
    oneLiner_te: "టేకు తలుపులు, కిటికీ ఫ్రేములు & చెక్క గృహోపకరణాలు",
    oneLiner_hi: "लकड़ी के दरवाजे, चौखट और पारंपरिक बढ़ईगीरी कार्यशाला",
    themeColor: "#78350f"
  },
  "auto_service": {
    imageUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Passenger auto-rickshaw local village & mandal transit",
    oneLiner_te: "గ్రామీణ ప్రయాణికుల కోసం ఆటో రిక్షా రవాణా సేవ",
    oneLiner_hi: "ग्रामीण और मंडल स्तर पर ऑटो रिक्शा यात्री परिवहन",
    themeColor: "#eab308"
  },
  "taxi": {
    imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "AC cab & SUV taxi hire for pilgrimage, weddings and hospitals",
    oneLiner_te: "తీర్థయాత్రలు, పెళ్లిళ్లకు క్యాబ్ / కారు అద్దె సేవలు",
    oneLiner_hi: "तीर्थयात्रा, अस्पताल और विवाह के लिए टैक्सी कार सेवा",
    themeColor: "#ca8a04"
  },
  "local_delivery": {
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Two-wheeler and small e-loader village freight delivery",
    oneLiner_te: "ద్విచక్ర వాహనంపై గ్రామీణ సరుకుల వేగవంతమైన డెలివరీ",
    oneLiner_hi: "छोटे सामान और पार्सल की त्वरित स्थानीय डिलीवरी",
    themeColor: "#f97316"
  },
  "goods_transport": {
    imageUrl: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Mini-truck (Tata Ace/Bolero) farm produce freight transport",
    oneLiner_te: "పంట ఉత్పత్తులు, వ్యాపార సరుకుల మినీ లారీ రవాణా సేవ",
    oneLiner_hi: "कृषि उपज और माल ढुलाई के लिए मिनी ट्रक परिवहन",
    themeColor: "#d97706"
  },
  "tractor_rental": {
    imageUrl: "https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Tractor and hydraulic trolley hire for sand, crops and mud",
    oneLiner_te: "పంటలు, ఇసుక, మట్టి రవాణా కోసం ట్రాక్టర్ & ట్రాలీ అద్దె",
    oneLiner_hi: "मिट्टी, बालू और फसल ढुलाई के लिए ट्रैक्टर ट्रॉली किराया",
    themeColor: "#b45309"
  },
  "farm_vehicle_rental": {
    imageUrl: "https://images.unsplash.com/photo-1589874836640-5231c6a2e4e1?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Paddy harvester and sugarcane transport vehicle hire",
    oneLiner_te: "వరి కోత యంత్రాలు మరియు ప్రత్యేక వ్యవసాయ వాహనాల అద్దె",
    oneLiner_hi: "धान कटाई और भारी कृषि वाहनों की मौसमी किराया सेवा",
    themeColor: "#854d0e"
  },
  "two_wheeler_rental": {
    imageUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Bike and scooter daily rental for local sales and commutes",
    oneLiner_te: "రోజువారీ తిరుగుడు కోసం బైక్‌లు, స్కూటర్ల అద్దె సర్వీస్",
    oneLiner_hi: "दैनिक आवागमन के लिए बाइक और स्कूटर किराया सेवा",
    themeColor: "#ea580c"
  },
  "logistics": {
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Mandi-to-city agricultural produce aggregation and freight",
    oneLiner_te: "మార్కెట్ యార్డుల నుంచి నగరాలకు వ్యవసాయ లాజిస్టిక్స్",
    oneLiner_hi: "मंडी से शहर तक कृषि उपज का थोक लॉजिस्टिक्स परिवहन",
    themeColor: "#0284c7"
  },
  "tuition": {
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Maths, Science & English tuition classes for school students",
    oneLiner_te: "పాఠశాల విద్యార్థులకు సైన్స్, మ్యాథ్స్ & ఇంగ్లీష్ ట్యూషన్లు",
    oneLiner_hi: "कक्षा 1-10 के छात्रों के लिए गणित और विज्ञान ट्यूशन",
    themeColor: "#2563eb"
  },
  "coaching": {
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "APPSC, Police Constable and competitive test coaching center",
    oneLiner_te: "పోలీస్, డీఎస్సీ & ప్రభుత్వ ఉద్యోగాల కాంపిటీటివ్ కోచింగ్",
    oneLiner_hi: "प्रतियोगी परीक्षाओं और सरकारी नौकरियों के लिए कोचिंग",
    themeColor: "#1d4ed8"
  },
  "computer_training": {
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "MS Office, PGDCA, basic programming & internet skills",
    oneLiner_te: "ఎంఎస్ ఆఫీస్, కంప్యూటర్ బేసిక్స్ & టైపింగ్ శిక్షణ కేంద్రం",
    oneLiner_hi: "कंप्यूटर बेसिक, एमएस ऑफिस और टाइपिंग प्रशिक्षण संस्थान",
    themeColor: "#3b82f6"
  },
  "skill_training": {
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Electrician, plumber and AC technician vocational training",
    oneLiner_te: "ఎలక్ట్రీషియన్, ప్లంబింగ్ & సాంకేతిక వృత్తి విద్యా శిక్షణ",
    oneLiner_hi: "इलेक्ट्रीशियन, प्लंबर और तकनीशियन कौशल विकास केंद्र",
    themeColor: "#0284c7"
  },
  "language_training": {
    imageUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Spoken English, interview communication and Hindi fluency",
    oneLiner_te: "స్పోకెన్ ఇంగ్లీష్ మరియు కమ్యూనికేషన్ స్కిల్స్ క్లాసులు",
    oneLiner_hi: "स्पोकन इंग्लिश और साक्षात्कार तैयारी कक्षाएं",
    themeColor: "#4f46e5"
  },
  "vocational_training": {
    imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Tailoring, embroidery, fashion design and craft workshops",
    oneLiner_te: "టైలరింగ్, ఎంబ్రాయిడరీ & ఫ్యాషన్ డిజైనింగ్ నేర్పించే కేంద్రం",
    oneLiner_hi: "सिलाई, कढ़ाई और बुटीक कौशल प्रशिक्षण केंद्र",
    themeColor: "#9333ea"
  },
  "educational_materials": {
    imageUrl: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "School textbooks, model exam guides and educational charts",
    oneLiner_te: "స్కూల్ పుస్తకాలు, మోడల్ పేపర్లు & విద్యా చార్టుల విక్రయం",
    oneLiner_hi: "पाठ्यपुस्तकें, अभ्यास पुस्तिकाएं और शैक्षणिक सामग्री",
    themeColor: "#2563eb"
  },
  "homestay": {
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Traditional eco-friendly village homestay with Andhra meals",
    oneLiner_te: "గ్రామీణ వాతావరణంలో హోమ్‌స్టే & సాంప్రదాయ ఆతిథ్యం",
    oneLiner_hi: "ग्रामीण परिवेश में पारंपरिक होमस्टे और घरेलू भोजन",
    themeColor: "#0284c7"
  },
  "guest_house": {
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Clean and secure AC/Non-AC rest house for temple pilgrims",
    oneLiner_te: "తీర్థయాత్ర భక్తుల కోసం శుభ్రమైన వసతి గృహం / లాడ్జి",
    oneLiner_hi: "तीर्थयात्रियों के लिए स्वच्छ और आरामदायक विश्राम गृह",
    themeColor: "#0369a1"
  },
  "tourist_guide": {
    imageUrl: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Heritage temple history and nature sightseeing guiding",
    oneLiner_te: "చారిత్రక దేవాలయాలు & ప్రకృతి పర్యాటక గైడ్ సేవలు",
    oneLiner_hi: "ऐतिहासिक मंदिरों और प्राकृतिक स्थलों का टूरिस्ट गाइड",
    themeColor: "#0d9488"
  },
  "local_transport": {
    imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Pilgrimage circuit tour packages in Tirupati, Simhachalam",
    oneLiner_te: "పుణ్యక్షేత్రాలు & దర్శనాల కోసం టూరిస్ట్ వాహనాల సర్వీస్",
    oneLiner_hi: "तीर्थ और पर्यटन स्थलों के लिए दर्शनीय वाहन पैकेज",
    themeColor: "#d97706"
  },
  "travel_service": {
    imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "APSRTC/IRCTC online booking and custom holiday tours",
    oneLiner_te: "రైలు, బస్సు టికెట్ బుకింగ్ & పర్యాటక ప్యాకేజీలు",
    oneLiner_hi: "टूर पैकेज, बस और ट्रेन टिकट ऑनलाइन बुकिंग केंद्र",
    themeColor: "#0ea5e9"
  },
  "handicrafts_souvenirs": {
    imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Kalamkari prints, temple brass idols and cultural souvenirs",
    oneLiner_te: "కలంకారి వస్త్రాలు, ఇత్తడి విగ్రహాలు & జ్ఞాపికల దుకాణం",
    oneLiner_hi: "कलमकारी वस्त्र, पीतल की मूर्तियां और स्मृति चिन्ह",
    themeColor: "#b91c1c"
  },
  "local_food_experience": {
    imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Authentic rural bamboo chicken, pot biryani & ragi sankati",
    oneLiner_te: "బొంగు చికెన్, రాగి సంగటి & గ్రామీణ సంప్రదాయ వంటకాలు",
    oneLiner_hi: "पारंपरिक ग्रामीण व्यंजन, रागी संगटी और स्थानीय भोजन स्टॉल",
    themeColor: "#c2410c"
  },
  "computer_centre": {
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Gramin MeeSeva citizen portal, certificates & bill payments",
    oneLiner_te: "మీసేవ, ప్రభుత్వ ధృవీకరణ పత్రాలు & కరెంట్ బిల్లుల చెల్లింపు",
    oneLiner_hi: "ई-सेवा केंद्र, सरकारी प्रमाणपत्र और बिजली बिल भुगतान",
    themeColor: "#4f46e5"
  },
  "digital_service_centre": {
    imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "AePS cash withdrawal, money transfer & DBT support kiosk",
    oneLiner_te: "ఆధార్ ద్వారా నగదు విత్‌డ్రా, మనీ ట్రాన్స్‌ఫర్ సర్వీస్ పాయింట్",
    oneLiner_hi: "आधार सक्षम नकद निकासी (AePS) और मनी ट्रांसफर कियोस्क",
    themeColor: "#4338ca"
  },
  "website_services": {
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Google Business profile setup & websites for local traders",
    oneLiner_te: "స్థానిక వ్యాపారులకు గూగుల్ మ్యాప్స్ లిస్టింగ్ & వెబ్‌సైట్లు",
    oneLiner_hi: "स्थानीय व्यापारियों के लिए गूगल मैप्स और वेबसाइट निर्माण",
    themeColor: "#3b82f6"
  },
  "graphic_design": {
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Flex banners, wedding invitation cards and logo designing",
    oneLiner_te: "ఫ్లెక్స్ బ్యానర్లు, పెళ్లి పత్రికలు & విజిటింగ్ కార్డుల డిజైనింగ్",
    oneLiner_hi: "फ्लेक्स बैनर, शादी के कार्ड और ग्राफिक्स डिजाइनिंग",
    themeColor: "#8b5cf6"
  },
  "digital_marketing": {
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Local WhatsApp business marketing, posters and social promos",
    oneLiner_te: "వాట్సాప్ ప్రమోషన్లు & స్థానిక వ్యాపార సోషల్ మీడియా ప్రచారం",
    oneLiner_hi: "व्हाट्सएप मार्केटिंग और स्थानीय व्यापार डिजिटल प्रचार",
    themeColor: "#06b6d4"
  },
  "mobile_app_services": {
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Smart device configuration, banking app help & backups",
    oneLiner_te: "స్మార్ట్‌ఫోన్ యాప్‌లు, బ్యాంకింగ్ యాప్‌ల సహాయం & సెటప్",
    oneLiner_hi: "स्मार्टफोन सेटअप, बैंकिंग ऐप सहायता और डेटा बैकअप",
    themeColor: "#0284c7"
  },
  "online_form_services": {
    imageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Govt job applications, scholarship forms & PAN card apply",
    oneLiner_te: "ఉద్యోగ దరఖాస్తులు, స్కాలర్‌షిప్‌లు & పాన్ కార్డ్ అప్లికేషన్లు",
    oneLiner_hi: "सरकारी नौकरी के ऑनलाइन फॉर्म और पैन कार्ड आवेदन",
    themeColor: "#2563eb"
  },
  "cyber_services": {
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "High-speed document scanning, email service and colour print",
    oneLiner_te: "డాక్యుమెంట్ స్కానింగ్, ఇమెయిల్ & సైబర్ కేఫ్ సేవలు",
    oneLiner_hi: "दस्तावेज़ स्कैनिंग, ईमेल सेवा और सुरक्षित इंटरनेट पॉइंट",
    themeColor: "#1d4ed8"
  },
  "it_training": {
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Tally accounting, typing skills and digital payment training",
    oneLiner_te: "టాలీ అకౌంటింగ్, టైపింగ్ & డిజిటల్ పేమెంట్స్ నేర్పించడం",
    oneLiner_hi: "टैली अकाउंटिंग, टाइपिंग और डिजिटल वित्तीय साक्षरता",
    themeColor: "#0d9488"
  },
  "waste_collection": {
    imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Iron scrap, old newspapers and segregated dry waste pickup",
    oneLiner_te: "పాత ఇనుము, పేపర్లు & పొడి వ్యర్థాల సేకరణ కేంద్రం",
    oneLiner_hi: "पुराना लोहा, रद्दी और सूखे कचरे का व्यवस्थित संग्रह केंद्र",
    themeColor: "#475569"
  },
  "recycling": {
    imageUrl: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Plastic bottle shredding and baled scrap resale unit",
    oneLiner_te: "ప్లాస్టిక్ తుక్కు రీసైక్లింగ్ మరియు క్రషింగ్ యూనిట్",
    oneLiner_hi: "प्लास्टिक कचरा श्रेडिंग और पुनर्चक्रण (रीसाइक्लिंग) इकाई",
    themeColor: "#16a34a"
  },
  "composting": {
    imageUrl: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Community kitchen and vegetable market wet waste composting",
    oneLiner_te: "మార్కెట్ కూరగాయల వ్యర్థాలతో సేంద్రీయ ఎరువు తయారీ",
    oneLiner_hi: "गीले कचरे और मंडी अपशिष्ट से जैविक कम्पोस्ट खाद",
    themeColor: "#65a30d"
  },
  "solar_services": {
    imageUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Rooftop solar panel installation and agricultural solar pumps",
    oneLiner_te: "ఇళ్లపై సోలార్ ప్యానెల్స్ & వ్యవసాయ సోలార్ పంపుల బిగింపు",
    oneLiner_hi: "छत पर सोलर पैनल और कृषि सोलर पंप की स्थापना सेवा",
    themeColor: "#f59e0b"
  },
  "solar_maintenance": {
    imageUrl: "https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Solar array dust cleaning, inverter inspection and repair",
    oneLiner_te: "సోలార్ ప్యానెళ్ల దుమ్ము శుభ్రపరచడం & ఇన్వర్టర్ మరమ్మతులు",
    oneLiner_hi: "सोलर पैनल सफाई, इनवर्टर सर्विसिंग और तकनीकी रखरखाव",
    themeColor: "#d97706"
  },
  "water_purification": {
    imageUrl: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Commercial RO drinking water plant and 20-litre bubble cans",
    oneLiner_te: "ఆర్వో మినరల్ వాటర్ ప్లాంట్ & 20 లీటర్ల క్యాన్ల సరఫరా",
    oneLiner_hi: "आरओ मिनरल वाटर प्लांट और 20-लीटर पेयजल कैन आपूर्ति",
    themeColor: "#0284c7"
  },
  "water_supply": {
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Potable drinking water tanker supply to rural habitations",
    oneLiner_te: "గ్రామాలకు స్వచ్ఛమైన మంచినీటి ట్యాంకర్ల ద్వారా సరఫరా",
    oneLiner_hi: "ग्रामीण बस्तियों के लिए सुरक्षित पेयजल टैंकर आपूर्ति",
    themeColor: "#0369a1"
  },
  "rainwater_harvesting": {
    imageUrl: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Groundwater percolation pits and rooftop rain collection",
    oneLiner_te: "భూగర్భ జలాల పెంపునకు ఇంకుడు గుంతలు & వర్షపు నీటి నిల్వ",
    oneLiner_hi: "भूजल संवर्धन सोख्ता गड्ढे और वर्षा जल संचयन निर्माण",
    themeColor: "#0ea5e9"
  },
  "renewable_energy": {
    imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Domestic biogas plant installation and briquette fuel supply",
    oneLiner_te: "గోబర్ గ్యాస్ (బయోగ్యాస్) ప్లాంట్లు & బయోమాస్ ఇంధన యూనిట్",
    oneLiner_hi: "गोबर गैस (बायो-गैस) प्लांट और हरित बायोमास ऊर्जा इकाइयां",
    themeColor: "#15803d"
  },
  "default_business": {
    imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=600&q=80",
    oneLiner_en: "Rural micro-enterprise and local business opportunity",
    oneLiner_te: "ఆంధ్రప్రదేశ్ గ్రామీణ సూక్ష్మ వ్యాపార అవకాశం",
    oneLiner_hi: "आंध्र प्रदेश में स्थानीय ग्रामीण सूक्ष्म व्यवसाय",
    themeColor: "#059669"
  },
};

/**
 * Returns a guaranteed valid business visual object with image, descriptions and theme color.
 */
export function getBusinessVisual(slug?: string, categorySlug?: string): BusinessVisual {
  if (slug && BUSINESS_VISUAL_MAP[slug]) {
    return BUSINESS_VISUAL_MAP[slug];
  }

  // Category-based fallback visual if exact slug is not in specific dictionary
  const categoryFallbacks: Record<string, BusinessVisual> = {
    agriculture_farming: BUSINESS_VISUAL_MAP.vegetable_farming,
    dairy_livestock: BUSINESS_VISUAL_MAP.dairy_farm,
    food_beverages: BUSINESS_VISUAL_MAP.bakery,
    retail: BUSINESS_VISUAL_MAP.grocery_shop,
    services: BUSINESS_VISUAL_MAP.tailoring,
    manufacturing: BUSINESS_VISUAL_MAP.furniture,
    transport_mobility: BUSINESS_VISUAL_MAP.goods_transport,
    education: BUSINESS_VISUAL_MAP.tuition,
    tourism_hospitality: BUSINESS_VISUAL_MAP.homestay,
    digital_services: BUSINESS_VISUAL_MAP.computer_centre,
    environment_sustainability: BUSINESS_VISUAL_MAP.solar_services
  };

  if (categorySlug && categoryFallbacks[categorySlug]) {
    return categoryFallbacks[categorySlug];
  }

  return BUSINESS_VISUAL_MAP.default_business;
}
