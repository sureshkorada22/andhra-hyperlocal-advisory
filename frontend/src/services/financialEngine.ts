/**
 * SIH 2026 Problem Statement SIH26091
 * Module 2: Smart Financial Calculator & Scheme Router
 * Deterministic Financial Logic and Central Scheme Configuration
 */

export interface SchemeDefinition {
  id: 'micro_finance' | 'term_loan';
  name_en: string;
  name_te: string;
  name_hi: string;
  projectCostMin: number;
  projectCostMax: number;
  loanPercentage: number;
  maxLoan: number;
  interestRate: number; // e.g. 0.065 = 6.5%
  tenureYears: number;
  moratoriumMonths: number;
  rangeLabel: string;
  loanSupportLabel: string;
  description_en: string;
  description_te: string;
  description_hi: string;
}

export const SCHEME_CONFIG: Record<'MICRO_FINANCE' | 'TERM_LOAN', SchemeDefinition> = {
  MICRO_FINANCE: {
    id: 'micro_finance',
    name_en: 'Micro Finance Scheme',
    name_te: 'మైక్రో ఫైనాన్స్ పథకం',
    name_hi: 'माइक्रो फाइनेंस योजना',
    projectCostMin: 0,
    projectCostMax: 140000, // Up to ₹1.40 lakh
    loanPercentage: 0.90, // Up to 90% of project cost
    maxLoan: 125000, // ₹1.25 lakh
    interestRate: 0.065, // 6.5% p.a.
    tenureYears: 3, // 3 years
    moratoriumMonths: 3, // 3 months
    rangeLabel: 'Up to ₹1.40 Lakh',
    loanSupportLabel: 'Up to 90%',
    description_en: 'Targeted for micro-scale rural self-employment and small village retail enterprises.',
    description_te: 'గ్రామీణ స్వయం ఉపాధి మరియు చిన్న తరహా గ్రామ రిటైల్ వ్యాపారాల కోసం రూపొందించబడింది.',
    description_hi: 'ग्रामीण सूक्ष्म स्व-रोजगार और छोटे खुदरा उद्यमों के लिए विशेष रूप से तैयार की गई योजना।'
  },
  TERM_LOAN: {
    id: 'term_loan',
    name_en: 'Term Loan Scheme',
    name_te: 'టర్మ్ లోన్ పథకం',
    name_hi: 'टर्म लोन योजना',
    projectCostMin: 140000.01,
    projectCostMax: 5000000, // Above ₹1.40 lakh to ₹50 lakh
    loanPercentage: 0.90, // Up to 90% of project cost
    maxLoan: 4500000, // ₹45 lakh
    interestRate: 0.08, // 8% p.a.
    tenureYears: 7, // 7 years
    moratoriumMonths: 6, // 6 months
    rangeLabel: 'Above ₹1.40 Lakh to ₹50 Lakh',
    loanSupportLabel: 'Up to 90%',
    description_en: 'For small and medium rural commercial enterprises, equipment procurement, and infrastructure.',
    description_te: 'చిన్న మరియు మధ్య తరహా గ్రామీణ వాణిజ్య సంస్థలు, యంత్రాల కొనుగోలు మరియు మౌలిక సదుపాయాల కోసం.',
    description_hi: 'छोटे और मध्यम ग्रामीण वाणिज्यिक उद्यमों, उपकरण खरीद और बुनियादी ढांचे के लिए उपयुक्त योजना।'
  }
};

export const SCHEME_MAX_LIMIT = 5000000; // ₹50 Lakh ceiling

export interface RepaymentScheduleItem {
  quarter: number;
  quarterLabel: string;
  period: number;
  periodLabel: string;
  isMoratorium: boolean;
  openingPrincipal: number;
  principalRepaid: number;
  interest: number;
  totalRepayment: number;
  closingPrincipal: number;
  // Aliases for compatibility
  openingBalance: number;
  repaymentAmount: number;
  principalComponent: number;
  interestComponent: number;
  closingBalance: number;
  notes?: string;
}

export interface OperationalCostItem {
  id: string;
  name_en: string;
  name_te: string;
  name_hi: string;
  amount: number;
  isEstimated: boolean;
  notes_en: string;
  notes_te: string;
  notes_hi: string;
}

export interface WorkingCapitalItem {
  id: string;
  name_en: string;
  name_te: string;
  name_hi: string;
  amount: number;
  isEstimated?: boolean;
  notes_en: string;
  notes_te: string;
  notes_hi: string;
}

export interface FinancialRoadmap {
  isValid: boolean;
  errorMessage?: string;
  exceedsLimit: boolean;
  limitWarning?: string;
  limitGuidance?: string;
  availableMargin: number;
  totalProjectCost: number;
  maximumLoan: number;
  rawCalculatedLoan: number;
  isLoanCapped: boolean;
  ownContributionPct: number;
  loanPortionPct: number;
  scheme: SchemeDefinition | null;
  schemeId: string | null;
  schemeName: string;
  interestRatePct: number;
  tenureYears: number;
  moratoriumMonths: number;
  indicativeMonthlyEmi: number;
  indicativeQuarterlyInstallment: number;
  disclaimer: string;
  sourceTransparency: string;
}

export interface BudgetBreakdownItem {
  id: string;
  category_en: string;
  category_te: string;
  category_hi: string;
  defaultPct: number;
  amount: number;
  description_en: string;
  description_te: string;
  description_hi: string;
}

/**
 * Standard reducing-balance installment calculation.
 * E = P * r * (1 + r)^n / ((1 + r)^n - 1)
 */
export function calculateReducingBalanceInstallment(
  principal: number,
  annualRate: number,
  tenureYears: number,
  installmentsPerYear: number = 12
): number {
  if (principal <= 0 || tenureYears <= 0 || installmentsPerYear <= 0) return 0;
  const r = annualRate / installmentsPerYear;
  const n = tenureYears * installmentsPerYear;
  if (r === 0) return Math.round((principal / n) * 100) / 100;
  const factor = Math.pow(1 + r, n);
  const installment = principal * (r * factor) / (factor - 1);
  return Math.round(installment * 100) / 100;
}

/**
 * Deterministic Financial Roadmap & Scheme Router.
 * Core Formula:
 *   Available Margin Capital = 10% of Total Project Cost
 *   Total Project Cost = Available Margin Capital / 0.10
 *   Maximum Loan Amount = 90% of Total Project Cost (capped at Scheme Max Loan)
 */
export function calculateFinancialRoadmap(marginCapital: number | string | null | undefined): FinancialRoadmap {
  let margin = 0;
  if (marginCapital !== null && marginCapital !== undefined) {
    const parsed = typeof marginCapital === 'string' ? parseFloat(marginCapital.replace(/,/g, '')) : marginCapital;
    if (!isNaN(parsed) && parsed > 0) {
      margin = parsed;
    }
  }

  if (margin <= 0) {
    return {
      isValid: false,
      errorMessage: 'Please enter a valid margin contribution greater than ₹0.',
      exceedsLimit: false,
      availableMargin: 0,
      totalProjectCost: 0,
      maximumLoan: 0,
      rawCalculatedLoan: 0,
      isLoanCapped: false,
      ownContributionPct: 10,
      loanPortionPct: 90,
      scheme: null,
      schemeId: null,
      schemeName: 'N/A',
      interestRatePct: 0,
      tenureYears: 0,
      moratoriumMonths: 0,
      indicativeMonthlyEmi: 0,
      indicativeQuarterlyInstallment: 0,
      disclaimer: 'Indicative repayment estimate based on reducing balance method.',
      sourceTransparency: 'Scheme parameters based on SIH 2026 Problem Statement SIH26091.'
    };
  }

  const totalProjectCost = Math.round((margin / 0.10) * 100) / 100;
  const rawLoanAmount = Math.round((totalProjectCost * 0.90) * 100) / 100;

  // Case 6: Above ₹50 Lakh limit
  if (totalProjectCost > SCHEME_MAX_LIMIT) {
    return {
      isValid: true,
      exceedsLimit: true,
      limitWarning: 'Your calculated project cost is above ₹50 lakh, which is outside the project-cost range specified for the schemes in this problem statement.',
      limitGuidance: 'Please consider reducing the proposed project scale or verify applicable financing options with the concerned agency.',
      availableMargin: margin,
      totalProjectCost,
      maximumLoan: rawLoanAmount,
      rawCalculatedLoan: rawLoanAmount,
      isLoanCapped: false,
      ownContributionPct: 10,
      loanPortionPct: 90,
      scheme: null,
      schemeId: null,
      schemeName: 'Outside SIH-defined scheme range',
      interestRatePct: 0,
      tenureYears: 0,
      moratoriumMonths: 0,
      indicativeMonthlyEmi: 0,
      indicativeQuarterlyInstallment: 0,
      disclaimer: 'Calculated project cost exceeds standard micro & term loan boundaries.',
      sourceTransparency: 'Scheme parameters based on SIH 2026 Problem Statement SIH26091.'
    };
  }

  // Scheme Routing (Micro Finance vs Term Loan)
  const scheme = totalProjectCost <= SCHEME_CONFIG.MICRO_FINANCE.projectCostMax
    ? SCHEME_CONFIG.MICRO_FINANCE
    : SCHEME_CONFIG.TERM_LOAN;

  // Cap maximum loan to scheme defined maximum loan
  const cappedLoan = Math.min(rawLoanAmount, scheme.maxLoan);
  const isLoanCapped = cappedLoan < rawLoanAmount;

  const indicativeMonthlyEmi = calculateReducingBalanceInstallment(
    cappedLoan,
    scheme.interestRate,
    scheme.tenureYears,
    12
  );

  const indicativeQuarterlyInstallment = calculateReducingBalanceInstallment(
    cappedLoan,
    scheme.interestRate,
    scheme.tenureYears,
    4
  );

  return {
    isValid: true,
    exceedsLimit: false,
    availableMargin: margin,
    totalProjectCost,
    maximumLoan: cappedLoan,
    rawCalculatedLoan: rawLoanAmount,
    isLoanCapped,
    ownContributionPct: 10,
    loanPortionPct: 90,
    scheme,
    schemeId: scheme.id,
    schemeName: scheme.name_en,
    interestRatePct: scheme.interestRate * 100,
    tenureYears: scheme.tenureYears,
    moratoriumMonths: scheme.moratoriumMonths,
    indicativeMonthlyEmi,
    indicativeQuarterlyInstallment,
    disclaimer: 'Indicative repayment estimate based on standard reducing-balance method. Actual repayment terms may be determined by the concerned financing agency.',
    sourceTransparency: 'Scheme parameters derived from SIH 2026 Problem Statement SIH26091 (Micro Finance Scheme & Term Loan Scheme). Please verify with the State Channelizing Agency (SCA) or financing authority before application.'
  };
}

/**
 * Generates reducing-balance repayment schedule with moratorium grace period accounting.
 * Supports Monthly and Quarterly view toggles.
 */
export function generateRepaymentSchedule(
  loanAmount: number,
  annualInterestRate: number,
  tenureYears: number,
  moratoriumMonths: number,
  frequency: 'monthly' | 'quarterly' = 'quarterly'
): RepaymentScheduleItem[] {
  if (loanAmount <= 0 || tenureYears <= 0) return [];

  const installmentsPerYear = frequency === 'quarterly' ? 4 : 12;
  const periodLabel = frequency === 'quarterly' ? 'Quarter' : 'Month';
  const periodsInMoratorium = frequency === 'quarterly' ? Math.ceil(moratoriumMonths / 3) : moratoriumMonths;
  const totalRepaymentPeriods = tenureYears * installmentsPerYear;

  const r = annualInterestRate / installmentsPerYear;
  const regularInstallment = calculateReducingBalanceInstallment(
    loanAmount,
    annualInterestRate,
    tenureYears,
    installmentsPerYear
  );

  const schedule: RepaymentScheduleItem[] = [];
  let balance = loanAmount;

  // 1. Moratorium Grace Periods (No principal repayment due)
  for (let m = 1; m <= periodsInMoratorium; m++) {
    const qNum = m;
    const label = `${periodLabel} ${m} (Moratorium)`;
    const roundedBal = Math.round(balance * 100) / 100;
    schedule.push({
      quarter: qNum,
      quarterLabel: label,
      period: m,
      periodLabel: label,
      isMoratorium: true,
      openingPrincipal: roundedBal,
      principalRepaid: 0,
      interest: 0,
      totalRepayment: 0,
      closingPrincipal: roundedBal,
      openingBalance: roundedBal,
      repaymentAmount: 0,
      principalComponent: 0,
      interestComponent: 0,
      closingBalance: roundedBal,
      notes: 'Moratorium grace period — no regular principal repayment due.'
    });
  }

  // 2. Regular Amortization Periods
  for (let i = 1; i <= totalRepaymentPeriods; i++) {
    const interest = Math.round(balance * r * 100) / 100;
    let principalComp: number;
    let payment: number;

    if (i === totalRepaymentPeriods) {
      principalComp = Math.round(balance * 100) / 100;
      payment = Math.round((principalComp + interest) * 100) / 100;
      balance = 0;
    } else {
      payment = regularInstallment;
      principalComp = Math.round((payment - interest) * 100) / 100;
      balance = Math.max(0, Math.round((balance - principalComp) * 100) / 100);
    }

    const prevClosing = schedule.length > 0 ? schedule[schedule.length - 1].closingPrincipal : loanAmount;
    const periodIdx = periodsInMoratorium + i;
    const label = `${periodLabel} ${periodIdx}`;

    schedule.push({
      quarter: periodIdx,
      quarterLabel: label,
      period: periodIdx,
      periodLabel: label,
      isMoratorium: false,
      openingPrincipal: prevClosing,
      principalRepaid: principalComp,
      interest: interest,
      totalRepayment: payment,
      closingPrincipal: balance,
      openingBalance: prevClosing,
      repaymentAmount: payment,
      principalComponent: principalComp,
      interestComponent: interest,
      closingBalance: balance,
      notes: i === totalRepaymentPeriods ? 'Final installment — loan balance fully settled (₹0)' : 'Regular reducing-balance installment'
    });
  }

  return schedule;
}

/**
 * Helper to detect business domain from slug, category slug, or name.
 */
export function detectBusinessDomain(key?: string): string {
  if (!key) return 'general';
  const norm = key.toLowerCase();
  if (norm.includes('dairy') || norm.includes('milk') || norm.includes('livestock') || norm.includes('cattle') || norm.includes('buffalo') || norm.includes('పాడి')) {
    return 'dairy';
  }
  if (norm.includes('tailor') || norm.includes('garment') || norm.includes('textile') || norm.includes('apparel') || norm.includes('stitch') || norm.includes('కుట్టు')) {
    return 'tailoring';
  }
  if (norm.includes('repair') || norm.includes('mobile') || norm.includes('electronics') || norm.includes('electrical') || norm.includes('మొబైల్')) {
    return 'mobile_repair';
  }
  if (norm.includes('kirana') || norm.includes('grocery') || norm.includes('retail') || norm.includes('provision') || norm.includes('కిరాణా')) {
    return 'kirana';
  }
  if (norm.includes('agri') || norm.includes('farm') || norm.includes('crop') || norm.includes('horticulture') || norm.includes('వ్యవసాయం')) {
    return 'agriculture';
  }
  if (norm.includes('poultry') || norm.includes('fish') || norm.includes('aqua') || norm.includes('కోళ్ళ') || norm.includes('చేపల')) {
    return 'poultry_fisheries';
  }
  if (norm.includes('food') || norm.includes('bakery') || norm.includes('eatery') || norm.includes('restaurant') || norm.includes('tiffin') || norm.includes('హోటల్')) {
    return 'food_eatery';
  }
  if (norm.includes('handicraft') || norm.includes('artisan') || norm.includes('handloom') || norm.includes('pottery') || norm.includes('చేనేత')) {
    return 'handicrafts';
  }
  return 'general';
}

/**
 * Business-Context Aware Operational Costs Outline.
 * Produces planning categories tailored specifically to the user's selected business.
 * Explicitly labeled as 'Planning estimate'.
 */
export function getDefaultOperationalCosts(
  projectCost: number,
  businessKey?: string
): OperationalCostItem[] {
  const safeCost = Math.max(0, projectCost);
  const domain = detectBusinessDomain(businessKey);

  if (domain === 'dairy') {
    return [
      {
        id: 'cattle_feed',
        name_en: 'Cattle Feed & Green Fodder',
        name_te: 'పశుగ్రాసం & దాణా (Feed)',
        name_hi: 'पशु आहार और हरा चारा',
        amount: Math.round(safeCost * 0.14),
        isEstimated: true,
        notes_en: 'Planning estimate: Daily balanced cattle concentrate, dry straw, and green fodder rations',
        notes_te: 'ప్రణాళికా అంచనా: పశువుల పోషక దాణా, ఎండుగడ్డి మరియు పచ్చిమేత ఖర్చులు',
        notes_hi: 'योजना अनुमान: पशु आहार, सूखा भूसा और हरा चारा'
      },
      {
        id: 'veterinary_care',
        name_en: 'Veterinary Expenses & Vaccines',
        name_te: 'పశువైద్యం & టీకాలు (Veterinary)',
        name_hi: 'पशु चिकित्सा, टीके और दवाएं',
        amount: Math.round(safeCost * 0.05),
        isEstimated: true,
        notes_en: 'Planning estimate: Regular deworming, periodic vaccinations, and routine veterinary visits',
        notes_te: 'ప్రణాళికా అంచనా: క్రమం తప్పకుండా నులిపురుగుల నివారణ, టీకాలు మరియు డాక్టర్ ఫీజులు',
        notes_hi: 'योजना अनुमान: नियमित टीकाकरण, कृमिनाशक और पशु चिकित्सक शुल्क'
      },
      {
        id: 'milk_transport',
        name_en: 'Transportation & Milk Delivery',
        name_te: 'పాల రవాణా & క్యాన్లు (Transportation)',
        name_hi: 'दूध परिवहन और कैन आपूर्ति',
        amount: Math.round(safeCost * 0.04),
        isEstimated: true,
        notes_en: 'Planning estimate: Daily transit to milk cooperative chilling centre / local delivery routes',
        notes_te: 'ప్రణాళికా అంచనా: స్థానిక పాల శీతలీకరణ కేంద్రం లేదా కస్టమర్లకు రవాణా ఖర్చులు',
        notes_hi: 'योजना अनुमान: दुग्ध शीतलन केंद्र तक दैनिक परिवहन और आपूर्ति'
      },
      {
        id: 'shed_electricity',
        name_en: 'Electricity & Aeration/Cooling',
        name_te: 'షెడ్ విద్యుత్ & కూలింగ్ (Electricity)',
        name_hi: 'शेड बिजली और वेंटिलेशन',
        amount: Math.round(safeCost * 0.03),
        isEstimated: true,
        notes_en: 'Planning estimate: Water pump power, shed fans/coolers, and chilling equipment electricity',
        notes_te: 'ప్రణాళికా అంచనా: నీటి మోటారు, షెడ్ ఫ్యాన్లు మరియు కూలింగ్ పరికరాల విద్యుత్ బిల్లు',
        notes_hi: 'योजना अनुमान: पानी की मोटर, पंखे और कूलिंग उपकरण बिजली'
      },
      {
        id: 'shed_maintenance',
        name_en: 'Shed Maintenance & Sanitization',
        name_te: 'షెడ్ నిర్వహణ & పరిశుభ్రత (Maintenance)',
        name_hi: 'शेड रखरखाव और स्वच्छता',
        amount: Math.round(safeCost * 0.03),
        isEstimated: true,
        notes_en: 'Planning estimate: Disinfectants, lime wash, drainage cleaning, and milking gear upkeep',
        notes_te: 'ప్రణాళికా అంచనా: క్రిమిసంహారకాలు, సున్నం వేయడం, కాలువల పరిశుభ్రత మరియు పరికరాల రిపేర్లు',
        notes_hi: 'योजना अनुमान: कीटाणुनाशक, शेड मरम्मत और स्वच्छता'
      },
      {
        id: 'labor_milking',
        name_en: 'Milking & Farm Assistance',
        name_te: 'పాల పిండడం & ఫారం సహాయం (Labor)',
        name_hi: 'दुग्ध दोहन व सहायक मजदूरी',
        amount: Math.round(safeCost * 0.05),
        isEstimated: true,
        notes_en: 'Planning estimate: Skilled milker wages and barn cleaning helpers compensation',
        notes_te: 'ప్రణాళికా అంచనా: పాలు పితికే వారి వేతనం మరియు షెడ్ శుభ్రం చేసే సహాయకుల కూలీ',
        notes_hi: 'योजना अनुमान: दुग्ध दोहन श्रमिक और शेड सहायक मजदूरी'
      }
    ];
  }

  if (domain === 'tailoring') {
    return [
      {
        id: 'fabric_materials',
        name_en: 'Fabric & Material Procurement',
        name_te: 'వస్త్రాలు & ముడి సరుకు (Fabric/Material)',
        name_hi: 'कपड़ा, अस्तर और बुनियादी सामग्री',
        amount: Math.round(safeCost * 0.16),
        isEstimated: true,
        notes_en: 'Planning estimate: Initial cloth rolls, lining material, canvas, and seasonal textiles',
        notes_te: 'ప్రణాళికా అంచనా: ప్రారంభ వస్త్రాల రోల్స్, లైనింగ్ క్లాత్ మరియు ముడి సరుకు నిల్వ',
        notes_hi: 'योजना अनुमान: कपड़ा थान, अस्तर और सिलाई सामग्री'
      },
      {
        id: 'machine_equipment',
        name_en: 'Machine & Equipment Maintenance',
        name_te: 'కుట్టు మిషన్లు & పరికరాలు (Machine/Equipment)',
        name_hi: 'सिलाई मशीन व उपकरण रखरखाव',
        amount: Math.round(safeCost * 0.04),
        isEstimated: true,
        notes_en: 'Planning estimate: Sewing machine servicing, motor oil, sharp cutting shears, and needles',
        notes_te: 'ప్రణాళికా అంచనా: మిషన్ ఆయిలింగ్, సూదులు, కత్తెరలు మరియు మోటారు సర్వీసింగ్',
        notes_hi: 'योजना अनुमान: मशीन ऑयलिंग, सुई, कैंची और मोटर मरम्मत'
      },
      {
        id: 'electricity_power',
        name_en: 'Electricity & Steam Ironing',
        name_te: 'విద్యుత్ & ఇస్త్రీ (Electricity)',
        name_hi: 'दुकान बिजली और स्टीम प्रेस',
        amount: Math.round(safeCost * 0.03),
        isEstimated: true,
        notes_en: 'Planning estimate: Commercial lighting, sewing motors, and steam press electricity',
        notes_te: 'ప్రణాళికా అంచనా: వర్క్‌షాప్ లైటింగ్, ఎలక్ట్రిక్ మిషన్లు మరియు స్టీమ్ ఐరన్ విద్యుత్ ఖర్చు',
        notes_hi: 'योजना अनुमान: वाणिज्यिक रोशनी, इलेक्ट्रिक मोटर और स्टीम प्रेस'
      },
      {
        id: 'shop_rent',
        name_en: 'Shop / Workspace Rent',
        name_te: 'దుకాణం అద్దె (Shop Rent)',
        name_hi: 'दुकान या कार्यशाला का किराया',
        amount: Math.round(safeCost * 0.05),
        isEstimated: true,
        notes_en: 'Planning estimate: Market street retail booth or village tailoring shop premises rental',
        notes_te: 'ప్రణాళికా అంచనా: బజారులో లేదా సెంటర్‌లో దుకాణం నెలవారీ అద్దె',
        notes_hi: 'योजना अनुमान: बाजार में दुकान या टेलरिंग शेड का किराया'
      },
      {
        id: 'notions_accessories',
        name_en: 'Threads, Zippers & Notions',
        name_te: 'దారాలు, బటన్లు & జిప్పులు (Maintenance/Accessories)',
        name_hi: 'धागे, बटन, जिपर और सहायक सामान',
        amount: Math.round(safeCost * 0.04),
        isEstimated: true,
        notes_en: 'Planning estimate: High-strength embroidery threads, buttons, elastic, hooks, and zippers',
        notes_te: 'ప్రణాళికా అంచనా: కుట్టు దారాలు, బటన్లు, ఎలాస్టిక్, హుక్స్ మరియు జిప్పుల ఖర్చులు',
        notes_hi: 'योजना अनुमान: सिलाई धागे, बटन, हुक और जिपर सामग्री'
      }
    ];
  }

  if (domain === 'mobile_repair') {
    return [
      {
        id: 'repair_tools',
        name_en: 'Repair Tools & Diagnostic Kits',
        name_te: 'మరమ్మతు సాధనాలు (Tools)',
        name_hi: 'मरम्मत उपकरण और टेस्टिंग किट',
        amount: Math.round(safeCost * 0.08),
        isEstimated: true,
        notes_en: 'Planning estimate: SMD hot air rework station, digital multimeters, screw kits, and microscope',
        notes_te: 'ప్రణాళికా అంచనా: హాట్ ఎయిర్ రీవర్క్ స్టేషన్, మల్టీమీటర్లు, స్క్రూడ్రైవర్ కిట్లు మరియు బూతద్దం',
        notes_hi: 'योजना अनुमान: सोल्डरिंग स्टेशन, मल्टीमीटर, स्क्रू किट और परीक्षण उपकरण'
      },
      {
        id: 'spare_parts',
        name_en: 'Spare Parts & Screens Inventory',
        name_te: 'స్పేర్ పార్ట్స్ & డిస్ప్లేలు (Spare Parts)',
        name_hi: 'स्पेयर पार्ट्स, स्क्रीन और बैटरी स्टॉक',
        amount: Math.round(safeCost * 0.14),
        isEstimated: true,
        notes_en: 'Planning estimate: Fast-moving smartphone displays, replacement batteries, charging ports, and ICs',
        notes_te: 'ప్రణాళికా అంచనా: డిస్ప్లే స్క్రీన్లు, ఒరిజినల్ బ్యాటరీలు, ఛార్జింగ్ పోర్టులు మరియు స్పేర్ పార్ట్స్',
        notes_hi: 'योजना अनुमान: स्मार्टफोन डिस्प्ले, बैटरी, चार्जिंग जैक और आईसी'
      },
      {
        id: 'electricity_power',
        name_en: 'Electricity & Test Bench Power',
        name_te: 'విద్యుత్ & టెస్టింగ్ బెంచ్ (Electricity)',
        name_hi: 'दुकान बिजली व टेस्टिंग बेंच',
        amount: Math.round(safeCost * 0.03),
        isEstimated: true,
        notes_en: 'Planning estimate: Continuous power for testing equipment, soldering irons, and shop lighting',
        notes_te: 'ప్రణాళికా అంచనా: టెస్టింగ్ పరికరాలు, లైటింగ్ మరియు సోల్డరింగ్ స్టేషన్ల విద్యుత్ బిల్లు',
        notes_hi: 'योजना अनुमान: निरंतर बिजली, टेस्टिंग बेंच और दुकान की रोशनी'
      },
      {
        id: 'shop_rent',
        name_en: 'Shop / Rent-Related Operating Cost',
        name_te: 'షాప్ అద్దె & నిర్వహణ (Shop Rent Operating Cost)',
        name_hi: 'दुकान का किराया व परिचालन लागत',
        amount: Math.round(safeCost * 0.05),
        isEstimated: true,
        notes_en: 'Planning estimate: Commercial counter rent on main road, showcase security, and signage',
        notes_te: 'ప్రణాళికా అంచనా: ప్రధాన రహదారి వద్ద సర్వీస్ సెంటర్ అద్దె మరియు మెయింటెనెన్స్',
        notes_hi: 'योजना अनुमान: मुख्य सड़क पर दुकान का किराया और काउंटर रखरखाव'
      },
      {
        id: 'consumables',
        name_en: 'Adhesives, Flux & Software Tools',
        name_te: 'సాఫ్ట్‌వేర్ & కన్జ్యూమబుల్స్ (Consumables)',
        name_hi: 'गोंद, फ्लक्स और सॉफ्टवेयर टूल्स',
        amount: Math.round(safeCost * 0.03),
        isEstimated: true,
        notes_en: 'Planning estimate: B7000 display glues, soldering flux, isopropyl alcohol, and flashing dongles',
        notes_te: 'ప్రణాళికా అంచనా: డిస్ప్లే గ్లూ, సోల్డరింగ్ ఫ్లక్స్, క్లీనింగ్ ఆల్కహాల్ మరియు సాఫ్ట్‌వేర్ డోంగిల్స్',
        notes_hi: 'योजना अनुमान: डिस्प्ले गोंद, सोल्डरिंग फ्लक्स और सॉफ्टवेयर टूल्स'
      }
    ];
  }

  if (domain === 'kirana') {
    return [
      {
        id: 'wholesale_supplies',
        name_en: 'Wholesale Grocery Stock Procurement',
        name_te: 'కిరాణా మొత్తం సరుకులు (Stock Supplies)',
        name_hi: 'थोक किराना स्टॉक खरीद',
        amount: Math.round(safeCost * 0.17),
        isEstimated: true,
        notes_en: 'Planning estimate: Grains, pulses, cooking oils, packaged foods, and household essentials',
        notes_te: 'ప్రణాళికా అంచనా: బియ్యం, పప్పులు, వంట నూనెలు, సబ్బులు మరియు నిత్యావసర సరుకుల కొనుగోలు',
        notes_hi: 'योजना अनुमान: अनाज, दालें, तेल, साबुन और दैनिक आवश्यक किराना'
      },
      {
        id: 'shop_rent',
        name_en: 'Store Premises Rent',
        name_te: 'కిరాణా దుకాణం అద్దె (Store Rent)',
        name_hi: 'किराना दुकान का किराया',
        amount: Math.round(safeCost * 0.05),
        isEstimated: true,
        notes_en: 'Planning estimate: Village centre or residential street shop space monthly lease',
        notes_te: 'ప్రణాళికా అంచనా: గ్రామ సెంటర్‌లో కిరాణా దుకాణం నెలవారీ అద్దె',
        notes_hi: 'योजना अनुमान: गांव के मुख्य स्थान पर दुकान का मासिक किराया'
      },
      {
        id: 'refrigeration_electricity',
        name_en: 'Electricity & Deep Freezers / Lighting',
        name_te: 'విద్యుత్ & డీప్ ఫ్రీజర్ (Electricity)',
        name_hi: 'बिजली, डीप फ्रीजर और रोशनी',
        amount: Math.round(safeCost * 0.04),
        isEstimated: true,
        notes_en: 'Planning estimate: Beverage cooler, dairy refrigerator, shop lighting, and billing machine',
        notes_te: 'ప్రణాళికా అంచనా: పాలు, కూల్‌డ్రింక్స్ ఫ్రిజ్ మరియు దుకాణం లైటింగ్ విద్యుత్ ఖర్చు',
        notes_hi: 'योजना अनुमान: रेफ्रिजरेटर, डीप फ्रीजर और दुकान की बिजली'
      },
      {
        id: 'transportation',
        name_en: 'Transportation from Mandi / Wholesale Hub',
        name_te: 'రవాణా & హమాలి (Transportation)',
        name_hi: 'थोक मंडी से माल ढुलाई और परिवहन',
        amount: Math.round(safeCost * 0.04),
        isEstimated: true,
        notes_en: 'Planning estimate: Weekly auto/tempo freight from district market yard and loading labor',
        notes_te: 'ప్రణాళికా అంచనా: హోల్‌సేల్ మార్కెట్ నుండి సరుకుల ఆటో రవాణా మరియు హమాలి ఖర్చులు',
        notes_hi: 'योजना अनुमान: थोक बाजार से साप्ताहिक माल ढुलाई व हम्माली'
      },
      {
        id: 'packaging_weighing',
        name_en: 'Packaging Bags & Weighing Maintenance',
        name_te: 'ప్యాకింగ్ బ్యాగులు & తూకం యంత్రం (Packaging/Maintenance)',
        name_hi: 'पैकेजिंग बैग और वजन कांटा रखरखाव',
        amount: Math.round(safeCost * 0.02),
        isEstimated: true,
        notes_en: 'Planning estimate: Paper/cloth bags, carton tapes, and digital scale annual certification',
        notes_te: 'ప్రణాళికా అంచనా: ప్యాకింగ్ కవర్లు, బ్యాగులు మరియు డిజిటల్ కాటా సర్వీసింగ్',
        notes_hi: 'योजना अनुमान: कैरी बैग, पैकेजिंग और डिजिटल तौल कांटा'
      }
    ];
  }

  if (domain === 'agriculture') {
    return [
      {
        id: 'seeds_fertilizers',
        name_en: 'Certified Seeds, Fertilizers & Nutrients',
        name_te: 'నాణ్యమైన విత్తనాలు & ఎరువులు (Seeds/Fertilizers)',
        name_hi: 'प्रमाणित बीज, खाद और उर्वरक',
        amount: Math.round(safeCost * 0.12),
        isEstimated: true,
        notes_en: 'Planning estimate: High-yielding variety seeds, bio-fertilizers, organic manure, and micronutrients',
        notes_te: 'ప్రణాళికా అంచనా: అధిక దిగుబడి విత్తనాలు, సేంద్రీయ ఎరువులు మరియు పోషకాలు',
        notes_hi: 'योजना अनुमान: उच्च उपज वाले बीज, जैव उर्वरक और खाद'
      },
      {
        id: 'irrigation_power',
        name_en: 'Irrigation & Pump Fuel / Electricity',
        name_te: 'సాగునీరు, డీజిల్ & విద్యుత్ (Irrigation/Power)',
        name_hi: 'सिंचाई, डीजल और कृषि बिजली',
        amount: Math.round(safeCost * 0.06),
        isEstimated: true,
        notes_en: 'Planning estimate: Borewell submersible electricity, drip line upkeep, and diesel engine fuel',
        notes_te: 'ప్రణాళికా అంచనా: బోరుబావి విద్యుత్ బిల్లు, డ్రిప్ లైన్ల మెయింటెనెన్స్ మరియు ఆయిల్ ఖర్చులు',
        notes_hi: 'योजना अनुमान: नलकूप बिजली, ड्रिप सिंचाई और पंप ईंधन'
      },
      {
        id: 'tractor_equipment',
        name_en: 'Equipment Rental & Tractor Services',
        name_te: 'ట్రాక్టర్ అద్దె & పరికరాలు (Equipment Rental)',
        name_hi: 'ट्रैक्टर और कृषि यंत्र किराया',
        amount: Math.round(safeCost * 0.05),
        isEstimated: true,
        notes_en: 'Planning estimate: Ploughing, rotavator, seed-drill hiring, and sprayer maintenance',
        notes_te: 'ప్రణాళికా అంచనా: పొలం దుక్కి, రోటవేటర్ మరియు స్ప్రేయర్ల అద్దె/సర్వీసింగ్',
        notes_hi: 'योजना अनुमान: जुताई, रोटावेटर और छिड़काव यंत्र किराया'
      },
      {
        id: 'farm_labor',
        name_en: 'Farm Labor & Harvesting Operations',
        name_te: 'వ్యవసాయ కూలీల ఖర్చులు (Labor)',
        name_hi: 'कृषि मजदूर और कटाई लागत',
        amount: Math.round(safeCost * 0.07),
        isEstimated: true,
        notes_en: 'Planning estimate: Sowing, transplanting, weeding, and seasonal harvest labor compensation',
        notes_te: 'ప్రణాళికా అంచనా: నాట్లు వేయడం, కలుపు తీత మరియు పంట కోత కూలీల వేతనాలు',
        notes_hi: 'योजना अनुमान: बुवाई, निराई और फसल कटाई मजदूरी'
      }
    ];
  }

  // Fallback: Standard Micro-Enterprise Baseline
  return [
    {
      id: 'raw_materials',
      name_en: 'Raw Materials & Supplies',
      name_te: 'ముడి సరుకులు & సామాగ్రి',
      name_hi: 'कच्चा माल और सामग्री',
      amount: Math.round(safeCost * 0.12),
      isEstimated: true,
      notes_en: 'Planning estimate: Initial batch of production inputs & supplies',
      notes_te: 'ప్రణాళికా అంచనా: ప్రారంభ ఉత్పత్తికి అవసరమైన ముడి పదార్థాలు',
      notes_hi: 'योजना अनुमान: उत्पादन के लिए प्रारंभिक कच्चा माल'
    },
    {
      id: 'labour',
      name_en: 'Labour & Assistant Wages',
      name_te: 'కార్మికుల వేతనాలు',
      name_hi: 'मजदूरी और वेतन',
      amount: Math.round(safeCost * 0.08),
      isEstimated: true,
      notes_en: 'Planning estimate: Helper and skilled worker compensation',
      notes_te: 'ప్రణాళికా అంచనా: సహాయకులు మరియు నైపుణ్యం కలిగిన కార్మికుల వేతనాలు',
      notes_hi: 'योजना अनुमान: सहायक और कुशल श्रमिकों का वेतन'
    },
    {
      id: 'rent',
      name_en: 'Shop / Workspace Rent',
      name_te: 'దుకాణం / స్థలం అద్దె',
      name_hi: 'दुकान का किराया',
      amount: Math.round(safeCost * 0.04),
      isEstimated: true,
      notes_en: 'Planning estimate: Premises or workspace monthly rental',
      notes_te: 'ప్రణాళికా అంచనా: వ్యాపార స్థలం లేదా షెడ్ అద్దె',
      notes_hi: 'योजना अनुमान: दुकान या कार्यस्थल का किराया'
    },
    {
      id: 'utilities',
      name_en: 'Electricity / Utilities',
      name_te: 'విద్యుత్ / యుటిలిటీస్',
      name_hi: 'बिजली / उपयोगिताएं',
      amount: Math.round(safeCost * 0.03),
      isEstimated: true,
      notes_en: 'Planning estimate: Commercial power, water & fuels',
      notes_te: 'ప్రణాళికా అంచనా: విద్యుత్, నీరు మరియు ఇంధన ఖర్చులు',
      notes_hi: 'योजना अनुमान: बिजली, पानी और ईंधन'
    },
    {
      id: 'transportation',
      name_en: 'Transportation & Logistics',
      name_te: 'రవాణా & లాజిస్టిక్స్',
      name_hi: 'परिवहन और ढुलाई',
      amount: Math.round(safeCost * 0.03),
      isEstimated: true,
      notes_en: 'Planning estimate: Freight for procurement & deliveries',
      notes_te: 'ప్రణాళికా అంచనా: సరుకుల రవాణా మరియు సరఫరా ఖర్చులు',
      notes_hi: 'योजना अनुमान: माल ढुलाई और वितरण'
    },
    {
      id: 'maintenance',
      name_en: 'Equipment Maintenance',
      name_te: 'నిర్వహణ & మరమ్మతులు',
      name_hi: 'रखरखाव और मरम्मत',
      amount: Math.round(safeCost * 0.02),
      isEstimated: true,
      notes_en: 'Planning estimate: Equipment servicing and minor repairs',
      notes_te: 'ప్రణాళికా అంచనా: యంత్రాల సర్వీసింగ్ మరియు మరమ్మతులు',
      notes_hi: 'योजना अनुमान: उपकरण सर्विसिंग और मरम्मत'
    }
  ];
}

/**
 * Business-Context Aware Working Capital Requirement.
 * Allocates liquid capital buffers specifically tailored to the business category.
 * Explicitly labeled as 'Planning estimate'.
 */
export function getDefaultWorkingCapital(
  projectCost: number,
  businessKey?: string
): WorkingCapitalItem[] {
  const safeCost = Math.max(0, projectCost);
  const domain = detectBusinessDomain(businessKey);

  if (domain === 'dairy') {
    return [
      {
        id: 'milk_procure_float',
        name_en: 'Daily Milk Procurement & Spot Payments',
        name_te: 'రోజువారీ పాల సేకరణ నగదు నిల్వ (Procurement)',
        name_hi: 'दैनिक दूध खरीद और नकद भुगतान',
        amount: Math.round(safeCost * 0.10),
        notes_en: 'Planning estimate: Liquid cash reserve to pay local milk producers on spot every evening',
        notes_te: 'ప్రణాళికా అంచనా: ప్రతిరోజూ పాలు పోసే రైతులకు అక్కడికక్కడే చెల్లించడానికి నగదు',
        notes_hi: 'योजना अनुमान: स्थानीय दुग्ध उत्पादकों को नकद भुगतान हेतु नकदी'
      },
      {
        id: 'feed_stock_buffer',
        name_en: 'Bulk Fodder & Feed Inventory Buffer',
        name_te: 'దాణా & ఎండుగడ్డి నిల్వ బఫర్ (Feed Stock)',
        name_hi: 'पशु आहार व सूखा चारा स्टॉक बफर',
        amount: Math.round(safeCost * 0.08),
        notes_en: 'Planning estimate: Advance procurement of oil cakes, bran, and dry grass to protect against price spikes',
        notes_te: 'ప్రణాళికా అంచనా: ధరల పెరుగుదల నుంచి రక్షణగా దాణా మరియు ఎండుగడ్డి ముందస్తు నిల్వ',
        notes_hi: 'योजना अनुमान: मूल्य वृद्धि से बचाव के लिए अग्रिम चारा स्टॉक'
      },
      {
        id: 'vet_emergency',
        name_en: 'Veterinary Emergency Reserve',
        name_te: 'పశువైద్య అత్యవసర నిధి (Vet Emergency)',
        name_hi: 'आपातकालीन पशु चिकित्सा रिज़र्व',
        amount: Math.round(safeCost * 0.05),
        notes_en: 'Planning estimate: Dedicated buffer for unexpected illness, calf care, and urgent antibiotic treatment',
        notes_te: 'ప్రణాళికా అంచనా: ఊహించని వ్యాధులు మరియు దూడల సంరక్షణ కోసం ప్రత్యేక అత్యవసర నిధి',
        notes_hi: 'योजना अनुमान: अचानक बीमारी या आपातकालीन चिकित्सा के लिए फंड'
      },
      {
        id: 'chilling_transit_buffer',
        name_en: 'Dairy Union Payment Cycle Buffer',
        name_te: 'డెయిరీ యూనియన్ చెల్లింపుల సైకిల్ బఫర్ (Payment Cycle)',
        name_hi: 'डेयरी यूनियन भुगतान चक्र बफर',
        amount: Math.round(safeCost * 0.05),
        notes_en: 'Planning estimate: Operating liquidity to bridge the 10-15 day dairy union payment settlement cycle',
        notes_te: 'ప్రణాళికా అంచనా: డెయిరీ యూనియన్ నుంచి వచ్చే 15 రోజుల చెల్లింపుల గడువు కోసం బఫర్',
        notes_hi: 'योजना अनुमान: डेयरी संघ से भुगतान में 10-15 दिन की देरी के लिए बफर'
      }
    ];
  }

  if (domain === 'tailoring') {
    return [
      {
        id: 'cloth_stock_buffer',
        name_en: 'Fabric & Cloth Inventory Buffer',
        name_te: 'వస్త్రాలు & ముడి సరుకు నిల్వ (Cloth Buffer)',
        name_hi: 'कपड़ा व अस्तर इन्वेंटरी बफर',
        amount: Math.round(safeCost * 0.10),
        notes_en: 'Planning estimate: Rolling inventory of premium cottons, school uniform cloths, and fancy linings',
        notes_te: 'ప్రణాళికా అంచనా: కాటన్ వస్త్రాలు, యూనిఫాం క్లాత్ మరియు లైనింగ్ మెటీరియల్ నిల్వ',
        notes_hi: 'योजना अनुमान: सूती कपड़ा, यूनिफॉर्म थान और अस्तर स्टॉक'
      },
      {
        id: 'custom_order_buffer',
        name_en: 'Custom Order Delivery Buffer',
        name_te: 'ఆర్డర్ల డెలివరీ సైకిల్ బఫర్ (Order Cycle)',
        name_hi: 'ऑर्डर डिलीवरी व ग्राहक क्रेडिट बफर',
        amount: Math.round(safeCost * 0.07),
        notes_en: 'Planning estimate: Liquidity to finance tailoring work until customer final fitting and collection',
        notes_te: 'ప్రణాళికా అంచనా: కస్టమర్లు బట్టలు తీసుకుని బిల్లు చెల్లించే వరకు నిర్వహణ నిధులు',
        notes_hi: 'योजना अनुमान: डिलीवरी और पूर्ण भुगतान होने तक कार्यशील पूंजी'
      },
      {
        id: 'operating_cash',
        name_en: 'Day-to-Day Operating Cash',
        name_te: 'రోజువారీ నిర్వహణ నగదు (Operating Cash)',
        name_hi: 'दैनिक दुकान नकदी',
        amount: Math.round(safeCost * 0.06),
        notes_en: 'Planning estimate: Ready cash for matching threads, urgent trims, packaging, and tea/petty costs',
        notes_te: 'ప్రణాళికా అంచనా: మ్యాచింగ్ దారాలు, లేస్‌లు మరియు రోజువారీ చిన్న ఖర్చుల కోసం చేతిలో నగదు',
        notes_hi: 'योजना अनुमान: मैचिंग धागे, बटन और दैनिक फुटकर खर्च'
      },
      {
        id: 'needle_spare_buffer',
        name_en: 'Machine Needle & Parts Buffer',
        name_te: 'సూదులు & స్పేర్ పార్ట్స్ నిల్వ (Machine Spares)',
        name_hi: 'मशीन सुई और स्पेयर पार्ट्स बफर',
        amount: Math.round(safeCost * 0.04),
        notes_en: 'Planning estimate: Emergency bobbin cases, machine needles, and motor belt replacements',
        notes_te: 'ప్రణాళికా అంచనా: అత్యవసర బాబిన్లు, సూదులు మరియు మిషన్ బెల్టుల నిల్వ',
        notes_hi: 'योजना अनुमान: आपातकालीन बॉबिन, सुइयां और बेल्ट स्पेयर'
      }
    ];
  }

  if (domain === 'mobile_repair') {
    return [
      {
        id: 'fast_moving_spares',
        name_en: 'Fast-Moving Screens & Batteries Inventory',
        name_te: 'స్పేర్ పార్ట్స్ ఇన్వెంటరీ నిల్వ (Parts Inventory)',
        name_hi: 'फास्ट-मूविंग डिस्प्ले व बैटरी इन्वेंटरी',
        amount: Math.round(safeCost * 0.12),
        isEstimated: true,
        notes_en: 'Planning estimate: Buffer stock of top 10 smartphone model displays and replacement batteries',
        notes_te: 'ప్రణాళికా అంచనా: ఎక్కువగా అమ్ముడయ్యే మోడళ్ల డిస్ప్లేలు మరియు బ్యాటరీల నిల్వ',
        notes_hi: 'योजना अनुमान: प्रमुख मोबाइल मॉडलों के डिस्प्ले और बैटरी का स्टॉक'
      },
      {
        id: 'express_courier_reserve',
        name_en: 'Component Sourcing & Courier Reserve',
        name_te: 'కొరియర్ & సరుకు ఆర్డర్ల నిధి (Courier/Sourcing)',
        name_hi: 'पार्ट्स कूरियर और तत्काल खरीद फंड',
        amount: Math.round(safeCost * 0.06),
        isEstimated: true,
        notes_en: 'Planning estimate: Ready funds to place same-day express orders from district wholesale markets',
        notes_te: 'ప్రణాళికా అంచనా: జిల్లా హోల్‌సేల్ మార్కెట్ నుంచి అర్జెంట్ స్పేర్ పార్ట్స్ తెప్పించే నిధి',
        notes_hi: 'योजना अनुमान: तत्काल पार्ट्स मंगवाने के लिए कूरियर व खरीद फंड'
      },
      {
        id: 'daily_cash_float',
        name_en: 'Daily Cash Drawer Float',
        name_te: 'కౌంటర్ నిర్వహణ నగదు (Daily Cash)',
        name_hi: 'दैनिक कैश काउंटर फ्लोट',
        amount: Math.round(safeCost * 0.05),
        isEstimated: true,
        notes_en: 'Planning estimate: Small change and working cash for customer exchanges and minor counter purchases',
        notes_te: 'ప్రణాళికా అంచనా: కస్టమర్ల చేతిమార్పులు మరియు కౌంటర్ నిర్వహణ నగదు',
        notes_hi: 'योजना अनुमान: ग्राहकों के लेन-देन और फुटकर सामान हेतु नकदी'
      }
    ];
  }

  if (domain === 'kirana') {
    return [
      {
        id: 'shelf_stock_inventory',
        name_en: 'Shelf Stock Inventory Buffer',
        name_te: 'దుకాణ సరుకుల నిల్వ బఫర్ (Shelf Stock)',
        name_hi: 'दुकान शेल्फ इन्वेंटरी बफर',
        amount: Math.round(safeCost * 0.12),
        isEstimated: true,
        notes_en: 'Planning estimate: Continuous buffer of staples, soaps, spices, and cooking oils',
        notes_te: 'ప్రణాళికా అంచనా: నిత్యావసరాలు, సబ్బులు, నూనెలు మరియు పప్పుల నిల్వ',
        notes_hi: 'योजना अनुमान: दाल, तेल, मसाले और दैनिक किराना इन्वेंटरी'
      },
      {
        id: 'customer_khata_buffer',
        name_en: 'Customer Khata Credit Buffer',
        name_te: 'గ్రాహకుల ఖాతా క్రెడిట్ సైకిల్ బఫర్ (Credit Buffer)',
        name_hi: 'ग्राहक खाता उधार चक्र बफर',
        amount: Math.round(safeCost * 0.07),
        isEstimated: true,
        notes_en: 'Planning estimate: Working capital buffer to bridge village customer monthly khata payment cycles',
        notes_te: 'ప్రణాళికా అంచనా: గ్రామస్తుల నెలవారీ ఖాతా అప్పులను తట్టుకోవడానికి వర్కింగ్ క్యాపిటల్',
        notes_hi: 'योजना अनुमान: ग्रामीण ग्राहकों की मासिक उधारी चक्र को संभालने हेतु फंड'
      },
      {
        id: 'daily_cash_float',
        name_en: 'Daily Cash Counter Float',
        name_te: 'కౌంటర్ రోజువారీ నగదు (Daily Cash)',
        name_hi: 'दैनिक गल्ला नकदी',
        amount: Math.round(safeCost * 0.05),
        isEstimated: true,
        notes_en: 'Planning estimate: Day-to-day cash drawer for morning milk/bread supplier payments',
        notes_te: 'ప్రణాళికా అంచనా: ఉదయం పాలు, బ్రెడ్ వంటి తాజా సరుకులకు నగదు చెల్లింపులు',
        notes_hi: 'योजना अनुमान: सुबह के ताजा सामान हेतु दैनिक नकद भुगतान'
      }
    ];
  }

  if (domain === 'agriculture') {
    return [
      {
        id: 'seasonal_advance',
        name_en: 'Sowing Season Input Advance',
        name_te: 'విత్తన సీజన్ ముందస్తు ఖర్చులు (Season Advance)',
        name_hi: 'बुवाई पूर्व इनपुट अग्रिम फंड',
        amount: Math.round(safeCost * 0.11),
        isEstimated: true,
        notes_en: 'Planning estimate: Advance fund for bulk procurement of seeds, basal fertilizer, and tilling',
        notes_te: 'ప్రణాళికా అంచనా: విత్తనాలు, మొదటి విడత ఎరువులు మరియు దుక్కి పనుల ముందస్తు నిధి',
        notes_hi: 'योजना अनुमान: बुवाई पूर्व बीज व खाद की अग्रिम खरीद हेतु पूंजी'
      },
      {
        id: 'crop_holding_buffer',
        name_en: 'Post-Harvest Holding Buffer',
        name_te: 'పంట నిల్వ & మార్కెట్ బఫర్ (Crop Holding)',
        name_hi: 'फसल भंडारण व बाजार बफर',
        amount: Math.round(safeCost * 0.07),
        isEstimated: true,
        notes_en: 'Planning estimate: Liquidity to avoid distress selling immediately after harvest',
        notes_te: 'ప్రణాళికా అంచనా: మంచి రేటు వచ్చే వరకు పంటను నిల్వ ఉంచే ఆర్థిక వెసులుబాటు',
        notes_hi: 'योजना अनुमान: उचित मूल्य मिलने तक फसल भंडारण हेतु कार्यशील पूंजी'
      },
      {
        id: 'irrigation_emergency',
        name_en: 'Emergency Irrigation & Fuel Reserve',
        name_te: 'అత్యవసర సాగునీరు & ఇంధనం (Emergency Reserve)',
        name_hi: 'आपातकालीन सिंचाई व ईंधन रिज़र्व',
        amount: Math.round(safeCost * 0.05),
        isEstimated: true,
        notes_en: 'Planning estimate: Backup diesel pump hire or transformer repair during critical dry spells',
        notes_te: 'ప్రణాళికా అంచనా: ఎండ తీవ్రత లేదా మోటారు చెడిపోయినప్పుడు అత్యవసర సాగునీటి ఏర్పాట్లు',
        notes_hi: 'योजना अनुमान: सूखे के दौरान आपातकालीन सिंचाई व मोटर मरम्मत'
      }
    ];
  }

  // Fallback: Standard Working Capital Outline
  return [
    {
      id: 'initial_inventory',
      name_en: 'Initial Inventory & Stock Buffer',
      name_te: 'ప్రారంభ నిల్వ (ఇన్వెంటరీ)',
      name_hi: 'प्रारंभिक स्टॉक/इन्वेंटरी',
      amount: Math.round(safeCost * 0.10),
      notes_en: 'Planning estimate: Stock for retail shelves or wholesale dispatch',
      notes_te: 'ప్రణాళికా అంచనా: అమ్మకాలకు సిద్ధంగా ఉంచే ప్రారంభ సరుకు నిల్వ',
      notes_hi: 'योजना अनुमान: बिक्री के लिए तैयार प्रारंभिक माल'
    },
    {
      id: 'raw_material_req',
      name_en: 'Raw Material Requirement',
      name_te: 'ముడి సరుకు అవసరం',
      name_hi: 'कच्चे माल की आवश्यकता',
      amount: Math.round(safeCost * 0.08),
      notes_en: 'Planning estimate: Sufficient raw inputs to sustain production cycles',
      notes_te: 'ప్రణాళికా అంచనా: ఉత్పత్తి చక్రానికి అవసరమైన ముడి పదార్థాలు',
      notes_hi: 'योजना अनुमान: उत्पादन चक्र को बनाए रखने के लिए आवश्यक सामग्री'
    },
    {
      id: 'operating_cash',
      name_en: 'Day-to-Day Operating Cash',
      name_te: 'రోజువారీ నిర్వహణ నగదు',
      name_hi: 'दैनिक परिचालन नकदी',
      amount: Math.round(safeCost * 0.05),
      notes_en: 'Planning estimate: Cash in hand for daily transactions and petty payments',
      notes_te: 'ప్రణాళికా అంచనా: రోజువారీ లావాదేవీలకు చేతిలో నగదు',
      notes_hi: 'योजना अनुमान: दैनिक खर्चों के लिए हाथ में नकदी'
    },
    {
      id: 'sales_cycle_buffer',
      name_en: 'Receivables / Sales-Cycle Buffer',
      name_te: 'రిసీవబుల్స్ / సేల్స్ సైకిల్ బఫర్',
      name_hi: 'प्राप्य / बिक्री चक्र बफर',
      amount: Math.round(safeCost * 0.04),
      notes_en: 'Planning estimate: Cashflow buffer to bridge customer credit periods',
      notes_te: 'ప్రణాళికా అంచనా: వినియోగదారుల చెల్లింపుల జాప్యం కోసం బఫర్ నిధులు',
      notes_hi: 'योजना अनुमान: ग्राहकों से भुगतान में देरी को प्रबंधित करने के लिए बफर'
    }
  ];
}


/**
 * Standard business cost breakdown template with realistic initial budget allocations.
 */
export function getDefaultCostBreakdown(projectCost: number): BudgetBreakdownItem[] {
  const safeCost = Math.max(0, projectCost);

  // Proportional baseline weights summing to 1.0 (100%)
  const items: Array<{ id: string; en: string; te: string; hi: string; pct: number; desc_en: string; desc_te: string; desc_hi: string }> = [
    {
      id: 'equipment',
      en: 'Equipment / Setup',
      te: 'యంత్రాలు / సెటప్ ఖర్చులు',
      hi: 'उपकरण और सेटअप',
      pct: 0.35,
      desc_en: 'Machinery, processing tools, display units & hardware',
      desc_te: 'యంత్రాలు, ప్రాసెసింగ్ సాధనాలు మరియు హార్డ్‌వేర్',
      desc_hi: 'मशीनरी, प्रसंस्करण उपकरण और हार्डवेयर'
    },
    {
      id: 'raw_materials',
      en: 'Raw Materials',
      te: 'ముడి సరుకులు',
      hi: 'कच्चा माल',
      pct: 0.15,
      desc_en: 'Initial batch of production inputs & supplies',
      desc_te: 'ప్రారంభ ఉత్పత్తికి అవసరమైన ముడి పదార్థాలు',
      desc_hi: 'उत्पादन के लिए प्रारंभिक कच्चा माल'
    },
    {
      id: 'inventory',
      en: 'Initial Inventory',
      te: 'ప్రారంభ నిల్వ (ఇన్వెంటరీ)',
      hi: 'प्रारंभिक स्टॉक/इन्वेंटरी',
      pct: 0.12,
      desc_en: 'Stock for retail shelves or wholesale distribution',
      desc_te: 'అమ్మకాలకు సిద్ధంగా ఉంచే సరుకు నిల్వ',
      desc_hi: 'बिक्री के लिए तैयार प्रारंभिक माल'
    },
    {
      id: 'rent_infra',
      en: 'Infrastructure / Rent',
      te: 'మౌలిక సదుపాయాలు / అద్దె',
      hi: 'बुनियादी ढांचा और किराया',
      pct: 0.10,
      desc_en: 'Shop deposit, renovation, counters & safety fittings',
      desc_te: 'దుకాణం అడ్వాన్స్, షెడ్ నిర్మాణం మరియు మరమ్మతులు',
      desc_hi: 'दुकान अग्रिम, शेड निर्माण और मरम्मत'
    },
    {
      id: 'working_capital',
      en: 'Working Capital Reserve',
      te: 'వర్కింగ్ క్యాపిటల్ నిల్వ',
      hi: 'कार्यशील पूंजी बफर',
      pct: 0.10,
      desc_en: 'Operational cash flow for daily trading & wages',
      desc_te: 'రోజువారీ కార్యకలాపాలు మరియు ఖర్చుల నిల్వ',
      desc_hi: 'दैनिक खर्चों के लिए नकदी बफर'
    },
    {
      id: 'labour',
      en: 'Labour & Helper Wages',
      te: 'కార్మికుల వేతనాలు',
      hi: 'मजदूरी और वेतन',
      pct: 0.06,
      desc_en: 'Initial month salaries for skilled/unskilled helpers',
      desc_te: 'సహాయకులు మరియు కార్మికుల మొదటి నెల వేతనాలు',
      desc_hi: 'शुरुआती महीनों के लिए श्रमिकों का वेतन'
    },
    {
      id: 'transport',
      en: 'Transportation & Logistics',
      te: 'రవాణా మరియు లాజిస్టిక్స్',
      hi: 'परिवहन और लॉजिस्टिक्स',
      pct: 0.04,
      desc_en: 'Freight charges for delivery of stock and goods',
      desc_te: 'సరుకుల రవాణా మరియు డెలివరీ ఖర్చులు',
      desc_hi: 'माल ढुलाई और वितरण शुल्क'
    },
    {
      id: 'utilities',
      en: 'Utilities & Power',
      te: 'విద్యుత్ మరియు యుటిలిటీస్',
      hi: 'बिजली और पानी',
      pct: 0.03,
      desc_en: 'Commercial meter connection, water, fuel',
      desc_te: 'విద్యుత్ కనెక్షన్, ఇంధనం మరియు నీటి ఖర్చులు',
      desc_hi: 'बिजली कनेक्शन, ईंधन और पानी'
    },
    {
      id: 'marketing',
      en: 'Marketing & Signboard',
      te: 'ప్రచారం మరియు నేమ్‌బోర్డ్',
      hi: 'मार्केटिंग और साइनबोर्ड',
      pct: 0.02,
      desc_en: 'Local signage, flyers, opening announcement',
      desc_te: 'షాప్ బోర్డు, కరపత్రాలు మరియు స్థానిక ప్రచారం',
      desc_hi: 'स्थानीय बोर्ड, पर्चे और प्रचार'
    },
    {
      id: 'contingency',
      en: 'Emergency / Contingency',
      te: 'అత్యవసర / ఇతర ఖర్చులు',
      hi: 'आपातकालीन / अन्य खर्च',
      pct: 0.03,
      desc_en: 'Reserve for unexpected licenses or minor repairs',
      desc_te: 'ఊహించని లైసెన్సింగ్ లేదా అత్యవసర ఖర్చుల నిల్వ',
      desc_hi: 'अप्रत्याशित आपातकालीन जरूरतों के लिए रिज़र्व'
    }
  ];

  return items.map((item) => ({
    id: item.id,
    category_en: item.en,
    category_te: item.te,
    category_hi: item.hi,
    defaultPct: item.pct,
    amount: Math.round(safeCost * item.pct),
    description_en: item.desc_en,
    description_te: item.desc_te,
    description_hi: item.desc_hi
  }));
}

/**
 * Clean Indian Currency formatting helper (e.g. ₹10,00,000)
 */
export function formatIndianCurrency(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return '₹0';
  return '₹' + new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);
}
