/**
 * SIH 2026 Problem Statement SIH26091
 * Official AP Sector Cost Benchmarks & Project Cost Methodology Service
 * Grounded in NABARD AP State Focus Paper, AP Animal Husbandry Dept, APFPS, and MSME Benchmarks.
 * STRICT ZERO FABRICATION POLICY.
 */

export interface CostComponentItem {
  id: string;
  name_en: string;
  name_te: string;
  name_hi: string;
  amount: number;
  icon: string;
  description_en: string;
  description_te: string;
}

export type CostDataStatus = 'verified' | 'estimated' | 'user_entered' | 'unavailable';

export interface BusinessCostProfile {
  categorySlug: string;
  businessPattern: string; // keyword match pattern
  title_en: string;
  title_te: string;
  title_hi: string;
  defaultProjectCost: number;
  status: CostDataStatus;
  source: string;
  dataYear: string;
  methodology: string;
  limitation: string;
  components: CostComponentItem[];
}

export const AP_OFFICIAL_COST_BENCHMARKS: BusinessCostProfile[] = [
  // 1. Commercial Vegetable & Horticulture Farming (1 Acre Drip Unit)
  {
    categorySlug: 'agriculture_farming',
    businessPattern: 'vegetable|horticulture|tomato|chilli|farming|crop|agri|కూరగాయ|వ్యవసాయ|తోట',
    title_en: 'Commercial Vegetable Farming (1 Acre Drip Unit)',
    title_te: 'వాణిజ్య కూరగాయల సాగు యూనిట్ (1 ఎకరం బిందు సేద్యం)',
    title_hi: 'वाणिज्यिक सब्जी की खेती (1 एकड़ ड्रिप इकाई)',
    defaultProjectCost: 120000,
    status: 'verified',
    source: 'Dept of Horticulture, Govt of AP & NABARD Unit Cost Guidelines',
    dataYear: '2023-24',
    methodology: 'Official NABARD model for 1-acre commercial vegetable cultivation including land bed preparation, drip micro-irrigation, certified hybrid seeds/seedlings, transport crates, and crop management.',
    limitation: 'Seed and seedling costs fluctuate with seasonal market demand; yield depends on local monsoon and groundwater recharge.',
    components: [
      {
        id: 'infra_trellis',
        name_en: 'Land Prep, Raised Beds & Trellis Setup',
        name_te: 'భూమి తయారీ, మడులు & పందిరి నిర్మాణం',
        name_hi: 'भूमि की तैयारी, क्यारियां और मचान निर्माण',
        amount: 25000,
        icon: '🏗️',
        description_en: 'Deep plowing, raised bed shaping, bamboo/GI wire trellising for creeper vegetables',
        description_te: 'లోతు దుక్కి, ఎత్తైన మడులు మరియు వెదురు/వైర్ పందిరి నిర్మాణం'
      },
      {
        id: 'equipment',
        name_en: 'Drip Micro-Irrigation & Fertigation Venturi',
        name_te: 'బిందు సేద్యం (Drip) & ఫెర్టిగేషన్ పరికరాలు',
        name_hi: 'ड्रिप सिंचाई प्रणाली और फर्टिगेशन वेंच्युरी',
        amount: 35000,
        icon: '🛠️',
        description_en: 'Inline drip laterals, screen filter, control valves, and fertigation venturi injector',
        description_te: 'ఇన్‌లైన్ డ్రిప్ పైపులు, స్క్రీన్ ఫిల్టర్ మరియు ఎరువుల అందించే వెంట్చూరి'
      },
      {
        id: 'stock_seeds',
        name_en: 'Certified Hybrid Seeds, Seedlings & Bio-Fertilizers',
        name_te: 'హైబ్రిడ్ విత్తనాలు, నారు & సేంద్రీయ ఎరువులు',
        name_hi: 'प्रमाणित हाइब्रिड बीज, पौधे और जैव उर्वरक',
        amount: 32000,
        icon: '📦',
        description_en: 'High-yield hybrid vegetable seedlings, neem cake, bio-fertilizers, and micronutrients',
        description_te: 'అధిక దిగుబడినిచ్చే కూరగాయల నారు, వేపపిండి, వర్మికంపోస్ట్ మరియు సూక్ష్మపోషకాలు'
      },
      {
        id: 'transport',
        name_en: 'Plastic Harvest Crates & Mandi Freight',
        name_te: 'ప్లాస్టిక్ క్రేట్లు & మార్కెట్ రవాణా',
        name_hi: 'प्लास्टिक क्रेट और मंडी परिवहन',
        amount: 8000,
        icon: '🚚',
        description_en: 'Food-grade harvesting crates and auto-freight to nearest APMC market yard',
        description_te: 'కూరగాయల నిల్వ ప్లాస్టిక్ క్రేట్లు మరియు సమీప రైతు బజార్/మార్కెట్‌కు రవాణా'
      },
      {
        id: 'working_capital',
        name_en: 'Labor Wages & Seasonal Plant Protection',
        name_te: 'కూలీల ఖర్చులు & సస్యరక్షణ నిధి',
        name_hi: 'मजदूरी और मौसमी फसल सुरक्षा',
        amount: 20000,
        icon: '💼',
        description_en: '1-cycle labor buffer for intercultural weeding, harvesting, and pest management',
        description_te: 'కలుపు తీత, పంట కోత కూలీల ఖర్చులు మరియు జీవ నియంత్రణ మందుల నిధి'
      }
    ]
  },

  // 2. Dairy Farming / Milch Animals
  {
    categorySlug: 'dairy_livestock',
    businessPattern: 'dairy|milk|buffalo|cattle|cow|livestock|పాడి|గేదె|ఆవు',
    title_en: 'Mini Dairy Unit (2 Milch Animals)',
    title_te: 'మినీ డెయిరీ యూనిట్ (2 పాడి పశువులు)',
    title_hi: 'मिनी डेयरी इकाई (2 दुधारू पशु)',
    defaultProjectCost: 140000,
    status: 'verified',
    source: 'Dept of Animal Husbandry, Govt of AP & NABARD Unit Cost Schedule',
    dataYear: '2023-24',
    methodology: 'Official NABARD model for 2-animal Graded Murrah / Crossbred milch unit including animal acquisition, cattle shed, transit, and initial feed.',
    limitation: 'Actual procurement cost varies with milk yield capacity (litres/day), lactation cycle, and prevailing livestock market yard auction rates.',
    components: [
      {
        id: 'infra_shed',
        name_en: 'Cattle Shed & Flooring Setup',
        name_te: 'పశువుల పాక & నేల నిర్మాణం',
        name_hi: 'पशु शेड और फर्श निर्माण',
        amount: 25000,
        icon: '🏗️',
        description_en: 'Thatched / asbestos roofing with concrete flooring and drainage channel',
        description_te: 'కాంక్రీట్ ఫ్లోరింగ్ మరియు డ్రైనేజ్ సౌకర్యంతో కూడిన పాక'
      },
      {
        id: 'equipment',
        name_en: 'Chaff Cutter, Cans & Utensils',
        name_te: 'గడ్డి కట్టర్ & పాల క్యాన్లు',
        name_hi: 'कुट्टी कटर और दूध के डिब्बे',
        amount: 15000,
        icon: '🛠️',
        description_en: 'Manual chaff cutter, stainless steel milking pails, and 20L transit cans',
        description_te: 'చేతి గడ్డి కోత యంత్రం, స్టెయిన్‌లెస్ స్టీల్ పాల క్యాన్లు'
      },
      {
        id: 'stock_animals',
        name_en: '2 Graded Milch Buffaloes / Cows',
        name_te: '2 నాణ్యమైన పాడి గేదెలు / ఆవులు',
        name_hi: '2 दुधारू भैंस / गाय खरीद',
        amount: 85000,
        icon: '📦',
        description_en: 'Procurement of 2 healthy milch animals in 1st/2nd lactation with female calf',
        description_te: 'మొదటి లేదా రెండవ ఈతలో ఉన్న 2 ఆరోగ్యకరమైన పాడి పశువులు'
      },
      {
        id: 'transport',
        name_en: 'Animal Transport & Vet Check',
        name_te: 'రవాణా & పశువైద్య పరీక్షలు',
        name_hi: 'पशु परिवहन और स्वास्थ्य जांच',
        amount: 5000,
        icon: '🚚',
        description_en: 'Transport from shandy/market and preliminary veterinary certification',
        description_te: 'సంత నుండి గ్రామానికి రవాణా మరియు ప్రారంభ ఆరోగ్య ధృవీకరణ'
      },
      {
        id: 'working_capital',
        name_en: 'Initial Feed, Fodder & Insurance',
        name_te: 'ప్రారంభ దాణా, మేత & బీమా',
        name_hi: 'शुरुआती चारा, आहार और पशु बीमा',
        amount: 10000,
        icon: '💼',
        description_en: '1-month concentrate feed reserve and mandatory 1-year animal insurance premium',
        description_te: 'మొదటి నెలకు అవసరమైన పశుగ్రాసం, దాణా మరియు 1-సంవత్సరం పశువుల బీమా'
      }
    ]
  },

  // 2. Poultry Broiler Farming
  {
    categorySlug: 'dairy_livestock',
    businessPattern: 'poultry|broiler|chicken|birds|కోళ్ళ|ఫారం',
    title_en: 'Commercial Broiler Poultry (1,000 Birds)',
    title_te: 'వాణిజ్య బ్రాయిలర్ కోళ్ళ పెంపకం (1,000 కోళ్ళు)',
    title_hi: 'वाणिज्यिक ब्रायलर पोल्ट्री (1,000 पक्षी)',
    defaultProjectCost: 280000,
    status: 'verified',
    source: 'AP Directorate of Animal Husbandry & NABARD State Focus Paper',
    dataYear: '2023-24',
    methodology: 'Standard deep-litter broiler farm model for rural entrepreneurs with brooding equipment, waterers, and biosecurity.',
    limitation: 'Day-old chick (DOC) rates and commercial poultry mash feed prices fluctuate with open market soy/maize prices.',
    components: [
      {
        id: 'infra_shed',
        name_en: 'Deep Litter Poultry Shed (1,000 sq ft)',
        name_te: 'కోళ్ళ షెడ్ నిర్మాణం (1,000 చ.అ.)',
        name_hi: 'पोल्ट्री शेड निर्माण (1,000 वर्ग फुट)',
        amount: 120000,
        icon: '🏗️',
        description_en: 'Semi-permanent poultry shed with wire netting and curtain ventilation',
        description_te: 'వైర్ మెష్, కర్టెన్లతో కూడిన సెమీ-పక్కా పౌల్ట్రీ షెడ్'
      },
      {
        id: 'equipment',
        name_en: 'Brooders, Feeders & Automatic Drinkers',
        name_te: 'ఫీడర్లు & వాటరర్ పరికరాలు',
        name_hi: 'ब्रूडर, फीडर और स्वचालित ड्रिंकर',
        amount: 35000,
        icon: '🛠️',
        description_en: 'Electric/gas brooder hoods, bell drinkers, and galvanized hanging feeders',
        description_te: 'హ్యాంగింగ్ ఫీడర్లు, బెల్ వాటరర్లు మరియు బ్రూడింగ్ లైట్లు'
      },
      {
        id: 'stock_chicks',
        name_en: '1,000 Day-Old Chicks & Vaccines',
        name_te: '1,000 కోడిపిల్లలు (DOC) & టీకాలు',
        name_hi: '1,000 एक दिवसीय चूजे और टीके',
        amount: 45000,
        icon: '📦',
        description_en: 'Commercial broiler day-old chicks batch plus Marek/Ranikhet/Gumboro vaccines',
        description_te: 'హ్యాచరీ నుండి 1,000 బ్రాయిలర్ చిక్స్ మరియు అవసరమైన టీకాలు'
      },
      {
        id: 'transport',
        name_en: 'Chicks & Feed Logistics',
        name_te: 'రవాణా ఖర్చులు',
        name_hi: 'चूजे और दाना परिवहन',
        amount: 15000,
        icon: '🚚',
        description_en: 'Transportation from hatchery and local feed mill delivery',
        description_te: 'హ్యాచరీ మరియు ఫీడ్ మిల్లు నుండి షెడ్ వరకు రవాణా'
      },
      {
        id: 'working_capital',
        name_en: 'Feed Reserve for 1st Crop Cycle (40 Days)',
        name_te: 'మొదటి బ్యాచ్ మేత నిర్వహణ నిధి (40 రోజులు)',
        name_hi: 'पहले बैच का दाना और कार्यशील पूंजी',
        amount: 65000,
        icon: '💼',
        description_en: 'Pre-starter, starter, and finisher commercial mash feed for first cycle',
        description_te: 'మొదటి బ్యాచ్ 40 రోజుల ఎదుగుదలకు అవసరమైన స్టార్టర్ & ఫినిషర్ దాణా'
      }
    ]
  },

  // 3. Kirana / Rural Retail Store
  {
    categorySlug: 'retail',
    businessPattern: 'kirana|grocery|retail|provision|general store|కిరాణా|సరుకులు',
    title_en: 'Village Kirana & Provision Store',
    title_te: 'గ్రామీణ కిరాణా & నిత్యావసర సరుకుల దుకాణం',
    title_hi: 'ग्रामीण किराना और जनरल स्टोर',
    defaultProjectCost: 120000,
    status: 'estimated',
    source: 'Directorate of Economics & Statistics (DES) AP & Rural MSME Trade Benchmark',
    dataYear: '2023-24',
    methodology: 'Derived from median village retail store setup requirements and wholesale distributor initial stocking benchmarks in Andhra Pradesh.',
    limitation: 'Inventory cost varies directly with shop carpet area and chosen product mix (groceries, packaged food, grains).',
    components: [
      {
        id: 'infra_racks',
        name_en: 'Shop Racks, Counter & Shelving',
        name_te: 'షాపు ర్యాక్లు, కౌంటర్ & షెల్వింగ్',
        name_hi: 'दुकान की रैक, काउंटर और अलमारियां',
        amount: 20000,
        icon: '🏗️',
        description_en: 'Wooden/steel storage racks, display counter, and illuminated name board',
        description_te: 'వస్తువుల అమరికకు స్టీల్/చెక్క ర్యాక్లు మరియు కౌంటర్'
      },
      {
        id: 'equipment',
        name_en: 'Electronic Weighing Scale & POS Billing',
        name_te: 'ఎలక్ట్రానిక్ బరువు త్రాసు & బిల్లింగ్',
        name_hi: 'इलेक्ट्रॉनिक तराजू और पीओएस सिस्टम',
        amount: 15000,
        icon: '🛠️',
        description_en: 'Legal metrology certified digital scale and basic smartphone billing scanner',
        description_te: 'ప్రభుత్వ గుర్తింపు పొందిన డిజిటల్ త్రాసు మరియు బిల్లింగ్ పరికరం'
      },
      {
        id: 'stock_fmcg',
        name_en: 'Initial Stock (Grains, Pulses, Oils, FMCG)',
        name_te: 'ప్రారంభ కిరాణా సరుకుల స్టాక్',
        name_hi: 'प्रारंभिक किराना स्टॉक (अनाज, दालें, तेल)',
        amount: 65000,
        icon: '📦',
        description_en: 'Wholesale procurement of rice, dals, cooking oils, soaps, spices, and snacks',
        description_te: 'హోల్‌సేల్ మార్కెట్ నుండి బియ్యం, పప్పులు, నూనెలు, సబ్బులు, నిత్యావసరాలు'
      },
      {
        id: 'transport',
        name_en: 'Wholesale Stock Freight & Transit',
        name_te: 'రవాణా & లోడింగ్ ఖర్చులు',
        name_hi: 'थोक माल ढुलाई और परिवहन',
        amount: 5000,
        icon: '🚚',
        description_en: 'Auto-rickshaw/tempo freight from nearest APMC market yard / wholesale town',
        description_te: 'సమీప టౌన్ హోల్‌సేల్ మార్కెట్ నుండి దుకాణానికి సరుకు రవాణా'
      },
      {
        id: 'working_capital',
        name_en: 'Working Capital & Daily Cash Float',
        name_te: 'రోజువారీ నిర్వహణ నిధి (Working Capital)',
        name_hi: 'दैनिक कार्यशील पूंजी और नकद प्रवाह',
        amount: 15000,
        icon: '💼',
        description_en: 'Cash buffer for daily replenishment of fast-moving items and small customer credit',
        description_te: 'రోజువారీ అత్యవసర సరుకుల కొనుగోలుకు మరియు మార్జిన్ నగదు'
      }
    ]
  },

  // 4. Tailoring & Apparel Boutique
  {
    categorySlug: 'services',
    businessPattern: 'tailor|garment|boutique|apparel|textile|stitching|కుట్టు|టైలరింగ్',
    title_en: 'Micro Tailoring & Apparel Unit',
    title_te: 'టైలరింగ్ & వస్త్ర కుట్టు యూనిట్',
    title_hi: 'माइक्रो टेलरिंग और सिलाई इकाई',
    defaultProjectCost: 90000,
    status: 'estimated',
    source: 'AP Khadi & Village Industries Board (KVIB) / PMEGP SHG Profile',
    dataYear: '2023-24',
    methodology: 'Standard 2-machine micro-tailoring unit model based on KVIB and rural self-help group livelihood project profiles.',
    limitation: 'Machine costs depend on manual foot-treadle vs high-speed motorized industrial direct-drive sewing machine.',
    components: [
      {
        id: 'infra_table',
        name_en: 'Cutting Table, Ironing Board & Rack',
        name_te: 'కటింగ్ టేబుల్, ఇస్త్రీ బోర్డు & ర్యాక్',
        name_hi: 'कटिंग टेबल, इस्त्री बोर्ड और रैक',
        amount: 15000,
        icon: '🏗️',
        description_en: 'Large plywood cutting table, heavy steam iron, and cloth storage shelves',
        description_te: 'వస్త్రాల కటింగ్ టేబుల్, స్టీమ్ ఐరన్ బాక్స్ మరియు బట్టల ర్యాక్'
      },
      {
        id: 'equipment',
        name_en: 'Motorized Sewing Machine + Overlock Machine',
        name_te: 'మోటరైజ్డ్ కుట్టు మిషన్ + ఇంటర్‌లాక్ మిషన్',
        name_hi: 'मोटराइज्ड सिलाई मशीन और इंटरलॉक मशीन',
        amount: 45000,
        icon: '🛠️',
        description_en: '1 high-speed industrial lockstitch machine and 1 3-thread overlock/pico machine',
        description_te: '1 మోటారు కుట్టు మిషన్ మరియు 1 ఓవర్‌లాక్/పికో మిషన్'
      },
      {
        id: 'stock_haberdashery',
        name_en: 'Linings, Threads, Zippers & Accessories',
        name_te: 'లైనింగ్స్, దారాలు, జిప్పులు, లేస్‌లు',
        name_hi: 'अस्तर कपड़ा, धागे, जिपर और सामान',
        amount: 18000,
        icon: '📦',
        description_en: 'Initial bulk inventory of matching sewing threads, canvas, hooks, buttons, and cloth rolls',
        description_te: 'రకరకాల రంగుల దారపు రీల్స్, బటన్స్, క్యాన్వాస్, లైనింగ్ క్లాత్'
      },
      {
        id: 'transport',
        name_en: 'Machine Transport & Setup',
        name_te: 'మిషన్ల రవాణా & ఫిట్టింగ్',
        name_hi: 'मशीन परिवहन और इंस्टालेशन',
        amount: 4000,
        icon: '🚚',
        description_en: 'Delivery and technician installation of industrial machines',
        description_te: 'టెక్నీషియన్ ద్వారా మిషన్ల ఫిట్టింగ్ మరియు రవాణా'
      },
      {
        id: 'working_capital',
        name_en: 'Working Capital & Power Reserve',
        name_te: 'విద్యుత్ & నిర్వహణ ఖర్చులు',
        name_hi: 'बिजली और कार्यशील पूंजी',
        amount: 8000,
        icon: '💼',
        description_en: 'Buffer for initial commercial power charges and spare needle replacement',
        description_te: 'ప్రారంభ కరెంట్ బిల్లులు మరియు సూదులు, ఆయిల్ ఖర్చులు'
      }
    ]
  },

  // 5. Small Bakery & Confectionery
  {
    categorySlug: 'food_processing',
    businessPattern: 'bakery|baking|bread|cake|confectionery|బేకరీ|రొట్టెలు|స్వీట్లు',
    title_en: 'Village Bakery & Confectionery Unit',
    title_te: 'గ్రామీణ బేకరీ & కన్ఫెక్షనరీ యూనిట్',
    title_hi: 'ग्रामीण बेकरी और कन्फेक्शनरी इकाई',
    defaultProjectCost: 220000,
    status: 'estimated',
    source: 'AP Food Processing Society (APFPS) & PMFME Micro Enterprise Guidelines',
    dataYear: '2023-24',
    methodology: 'Derived from PMFME micro baking enterprise guidelines for rural / peri-urban clusters in AP.',
    limitation: 'Equipment cost depends on electric vs gas rotary rack oven and three-phase power availability.',
    components: [
      {
        id: 'infra_kitchen',
        name_en: 'Bakehouse Hygiene Setup & Display Glass Counter',
        name_te: 'బేకింగ్ గది ఏర్పాటు & గాజు డిస్‌ప్లే కౌంటర్',
        name_hi: 'बेकिंग रूम सेटअप और ग्लास डिस्प्ले काउंटर',
        amount: 45000,
        icon: '🏗️',
        description_en: 'Stainless steel preparation table, wash basin, and front glass display showcase',
        description_te: 'స్టీల్ టేబుల్, వాష్ బేసిన్ మరియు ముందు భాగంలో గ్లాస్ షోకేస్'
      },
      {
        id: 'equipment',
        name_en: 'Deck Oven, Spiral Dough Mixer & Trays',
        name_te: 'డెక్ ఒవెన్, పిండి మిక్సర్ & బేకింగ్ ట్రేలు',
        name_hi: 'डेक ओवन, आटा मिक्सर और बेकिंग ट्रे',
        amount: 95000,
        icon: '🛠️',
        description_en: 'Single deck commercial gas/electric baking oven, 10kg spiral mixer, and 30 baking pans',
        description_te: 'కమర్షియల్ బేకింగ్ ఒవెన్, పిండి కలుపు మిక్సర్ మరియు ట్రేలు'
      },
      {
        id: 'stock_raw',
        name_en: 'Flour, Yeast, Butter, Sugar & Packing',
        name_te: 'మైదా, ఈస్ట్, వెన్న, చక్కెర & ప్యాకింగ్ మెటీరియల్',
        name_hi: 'मैदा, यीस्ट, मक्खन, चीनी और पैकेजिंग',
        amount: 35000,
        icon: '📦',
        description_en: 'Initial bulk bags of refined wheat flour, vegetable shortening, sugar, flavors, and bread wraps',
        description_te: 'ప్రారంభ మైదా బస్తాలు, చక్కెర, ఈస్ట్, వెన్న మరియు ప్యాకింగ్ కవర్లు'
      },
      {
        id: 'transport',
        name_en: 'Heavy Oven Transit & Electrical Line Work',
        name_te: 'ఒవెన్ రవాణా & విద్యుత్ కనెక్షన్',
        name_hi: 'ओवन परिवहन और बिजली फिटिंग',
        amount: 15000,
        icon: '🚚',
        description_en: 'Freight of heavy bakery machinery and commercial load electrical wiring',
        description_te: 'భారీ ఒవెన్ రవాణా మరియు కమర్షియల్ కరెంట్ వైరింగ్'
      },
      {
        id: 'working_capital',
        name_en: 'Fuel (LPG/Power) & Daily Operations Buffer',
        name_te: 'గ్యాస్ సిలిండర్లు & నిర్వహణ నిధి',
        name_hi: 'गैस सिलेंडर और दैनिक कार्यशील पूंजी',
        amount: 30000,
        icon: '💼',
        description_en: 'Reserve for commercial LPG cylinders, power bills, and initial unsold bread absorption',
        description_te: 'వాణిజ్య గ్యాస్ సిలిండర్లు, కరెంట్ బిల్లులు మరియు ప్రారంభ నిర్వహణ'
      }
    ]
  },

  // 6. Mobile Sales & Repair Store
  {
    categorySlug: 'digital_services',
    businessPattern: 'mobile|phone|repair|electronics|మొబైల్|రిపేర్',
    title_en: 'Mobile Sales, Accessories & Service Center',
    title_te: 'మొబైల్ సేల్స్, సర్వీస్ & రిపేరింగ్ సెంటర్',
    title_hi: 'मोबाइल बिक्री और सर्विसिंग सेंटर',
    defaultProjectCost: 110000,
    status: 'estimated',
    source: 'MSME Digital Services Livelihood Profile & AP Electronic Trade Benchmark',
    dataYear: '2023-24',
    methodology: 'Benchmark toolkit and spare component requirement for rural multi-brand mobile repair centers.',
    limitation: 'Accessory inventory requirements vary according to local 4G/5G smartphone penetration in the mandal.',
    components: [
      {
        id: 'infra_shop',
        name_en: 'Repair Workstation, Showcase & Lighting',
        name_te: 'రిపేర్ వర్క్‌స్టేషన్ & డిస్‌ప్లే షోకేస్',
        name_hi: 'रिपेयर वर्कस्टेशन और डिस्प्ले शोकेस',
        amount: 25000,
        icon: '🏗️',
        description_en: 'Anti-static ESD workbench, magnifier lamp, and locked glass accessory showcases',
        description_te: 'రిపేర్ బల్ల, మాగ్నిఫైయర్ లైట్ మరియు గ్లాస్ షోకేస్'
      },
      {
        id: 'equipment',
        name_en: 'SMD Rework Station, Multimeter & Toolkits',
        name_te: 'SMD హాట్ ఎయిర్ గన్, మల్టీమీటర్ & టూల్కిట్స్',
        name_hi: 'एसएमडी रिवर्क स्टेशन, मल्टीमीटर और टूलकिट',
        amount: 28000,
        icon: '🛠️',
        description_en: 'Micro-soldering station, DC power supply, LCD screen separator, and precision screwdrivers',
        description_te: 'మైక్రో సోల్డరింగ్ స్టేషన్, స్క్రీన్ సెపరేటర్ మరియు రిపేర్ టూల్స్'
      },
      {
        id: 'stock_accessories',
        name_en: 'Chargers, Cables, Earphones & Screen Guards',
        name_te: 'చార్జర్లు, కేబుల్స్, హెడ్‌ఫోన్స్, గ్లాస్ గార్డులు',
        name_hi: 'चार्जर, डेटा केबल, इयरफोन और ग्लास गार्ड',
        amount: 38000,
        icon: '📦',
        description_en: 'Fast chargers, USB-C/Lightning cables, neckbands, replacement screens, and pouches',
        description_te: 'ఫాస్ట్ చార్జర్లు, కేబుల్స్, బ్లూటూత్ ఇయర్‌ఫోన్లు మరియు స్క్రీన్ గార్డులు'
      },
      {
        id: 'transport',
        name_en: 'Spares Delivery & Courier Freight',
        name_te: 'స్పేర్స్ కొరియర్ & రవాణా ఖర్చులు',
        name_hi: 'स्पेयर पार्ट्स कूरियर और परिवहन',
        amount: 4000,
        icon: '🚚',
        description_en: 'Express courier delivery charges for smartphone display panels and batteries',
        description_te: 'విజయవాడ/వైజాగ్ మార్కెట్ నుండి మొబైల్ స్పేర్స్ కొరియర్ ఖర్చులు'
      },
      {
        id: 'working_capital',
        name_en: 'Cash Float & Software Tool Licenses',
        name_te: 'సాఫ్ట్‌వేర్ ఫ్లాషింగ్ & నిర్వహణ నిధి',
        name_hi: 'सॉफ्टवेयर टूल लाइसेंस और कार्यशील पूंजी',
        amount: 15000,
        icon: '💼',
        description_en: 'Buffer for online firmware flashing tool credits, utility bills, and emergency spares stock',
        description_te: 'ఆన్‌లైన్ ఫ్లాషింగ్ క్రెడిట్స్ మరియు అత్యవసర స్పేర్ పార్ట్స్ కొనుగోలు నిధి'
      }
    ]
  }
];

/**
 * Finds the official or benchmark cost profile matching the selected business.
 * If no match, returns a clean 'unavailable' profile requiring manual user entry.
 */
export function resolveBusinessCostProfile(
  businessName: string,
  categorySlug?: string
): BusinessCostProfile {
  const normName = (businessName || '').toLowerCase().trim();
  const normCat = (categorySlug || '').toLowerCase().trim();

  // 1. Try pattern match on business name
  for (const prof of AP_OFFICIAL_COST_BENCHMARKS) {
    const rx = new RegExp(`(${prof.businessPattern})`, 'i');
    if (rx.test(normName)) {
      return prof;
    }
  }

  // 2. Match by category slug fallback
  if (normCat) {
    for (const prof of AP_OFFICIAL_COST_BENCHMARKS) {
      if (prof.categorySlug === normCat) {
        return prof;
      }
    }
  }

  // 2. Fallback when no reliable cost benchmark is published
  return {
    categorySlug: normCat || 'custom_enterprise',
    businessPattern: normName,
    title_en: businessName || 'Proposed Enterprise',
    title_te: businessName || 'ప్రతిపాదిత వ్యాపారం',
    title_hi: businessName || 'प्रस्तावित उद्यम',
    defaultProjectCost: 0,
    status: 'unavailable',
    source: 'No Published Government Benchmark for Custom Unit',
    dataYear: '2024',
    methodology: 'Verified government project-cost norms are unavailable for this specific custom business idea.',
    limitation: 'Entrepreneur must manually enter their actual estimated startup capital requirement based on supplier quotes.',
    components: []
  };
}
