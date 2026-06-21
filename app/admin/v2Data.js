export const roles = [
  "Administrator",
  "Dispatcher",
  "Mentor",
  "Technician",
  "Sales Manager",
  "Customer"
];

export const ticketStatuses = [
  "NEW LEAD",
  "ASSIGNED",
  "ON THE WAY",
  "ARRIVED",
  "DIAGNOSTIC",
  "MENTOR REVIEW",
  "QUOTE GENERATED",
  "WAITING APPROVAL",
  "APPROVED",
  "INVOICE SENT",
  "PAID",
  "REPAIR IN PROGRESS",
  "COMPLETED",
  "CLOSED",
  "CANCELLED"
];

export const paymentMethods = ["Card", "ACH", "Zelle", "Check", "Cash"];
export const invoiceStatuses = ["Unpaid", "Paid", "Partial"];

export const sampleCustomers = [
  {
    id: "cust-1001",
    businessName: "Bayside Grill",
    contact: "Maria Lopez",
    phone: "(813) 555-0144",
    email: "maria@bayside.example",
    address: "401 Harbor Ave, Tampa, FL",
    rating: 4.9,
    repairHistory: ["Walk-in cooler compressor diagnostic", "Fryer ignition repair"],
    invoiceHistory: ["INV-2026-000311 paid", "INV-2026-000288 paid"],
    photos: "Before/after photos stored with service records",
    warrantyWork: "90-day labor warranty on approved repairs"
  },
  {
    id: "cust-1002",
    businessName: "Central Florida Bakery",
    contact: "Alex Kim",
    phone: "(407) 555-0198",
    email: "ops@cfbakery.example",
    address: "88 Market St, Lakeland, FL",
    rating: 4.8,
    repairHistory: ["Mixer drive inspection", "Oven temperature calibration"],
    invoiceHistory: ["INV-2026-000307 partial"],
    photos: "Inspection photos and serial plates attached",
    warrantyWork: "Parts warranty depends on manufacturer"
  }
];

export const sampleEquipment = [
  {
    id: "eq-1001",
    customerId: "cust-1001",
    customer: "Bayside Grill",
    equipmentType: "Walk-in cooler",
    type: "Walk-in cooler",
    manufacturer: "True",
    model: "TWC-96",
    serial: "TR-44921-FL",
    location: "Back kitchen",
    installationDate: "2022-04-12",
    warrantyStatus: "Out of manufacturer warranty",
    photos: ["Serial plate", "Evaporator coil", "Compressor compartment"],
    serviceHistory: [
      { date: "2026-05-18", title: "Diagnostic", detail: "Low suction pressure and warm box temperature documented.", quote: "Q-2026-000118", invoice: "INV-2026-000288" },
      { date: "2026-06-04", title: "Compressor quote", detail: "Replacement compressor and drier quoted after mentor review.", quote: "Q-2026-000125", invoice: "Pending" }
    ],
    previousQuotes: ["Q-2026-000118", "Q-2026-000125"],
    previousInvoices: ["INV-2026-000288"],
    nextService: "2026-08-01"
  },
  {
    id: "eq-1002",
    customerId: "cust-1002",
    customer: "Central Florida Bakery",
    equipmentType: "Commercial mixer",
    type: "Commercial mixer",
    manufacturer: "Hobart",
    model: "HL600",
    serial: "HB-88217",
    location: "Prep room",
    installationDate: "2021-10-03",
    warrantyStatus: "Manufacturer warranty expired",
    photos: ["Serial plate", "Gear case", "Bowl lift assembly"],
    serviceHistory: [
      { date: "2026-06-10", title: "Drive belt replacement", detail: "Replaced worn belt and tested mixer under dough load.", quote: "Q-2026-000119", invoice: "INV-2026-000307" }
    ],
    previousQuotes: ["Q-2026-000119"],
    previousInvoices: ["INV-2026-000307"],
    nextService: "2026-09-10"
  },
  {
    id: "eq-1003",
    customerId: "cust-1001",
    customer: "Bayside Grill",
    equipmentType: "Commercial fryer",
    type: "Commercial fryer",
    manufacturer: "Pitco",
    model: "SG14",
    serial: "PT-77291",
    location: "Cook line",
    installationDate: "2023-02-20",
    warrantyStatus: "90-day labor warranty on latest repair",
    photos: ["Thermostat access", "Pilot assembly", "After repair temperature test"],
    serviceHistory: [
      { date: "2026-06-14", title: "Thermostat repair", detail: "Replaced thermostat, cleaned burner and pilot, verified oil recovery.", quote: "Q-2026-000127", invoice: "INV-2026-000127" }
    ],
    previousQuotes: ["Q-2026-000127"],
    previousInvoices: ["INV-2026-000127"],
    nextService: "2026-10-14"
  }
];

export const sampleTickets = [
  {
    id: "ticket-125",
    ticketNumber: "FS-2026-000125",
    status: "MENTOR REVIEW",
    customerId: "cust-1001",
    equipmentId: "eq-1001",
    customer: "Maria Lopez",
    businessName: "Bayside Grill",
    address: "401 Harbor Ave, Tampa, FL",
    equipment: "Walk-in cooler",
    manufacturer: "True",
    model: "TWC-96",
    serial: "TR-44921-FL",
    problem: "Walk-in cooler is at 52F and product is warming.",
    technician: "Ivan Petrov",
    mentor: "Senior Mentor",
    diagnosticNotes: "Compressor starts then trips. Condenser coil cleaned. Suction pressure low, voltage stable.",
    temperatureReadings: "Box 52F, supply 48F",
    pressureReadings: "Low side 18 psi, high side 205 psi",
    voltageReadings: "208V stable under load",
    photos: "6 inspection photos",
    videos: "1 compressor startup video",
    mentorDiagnosis: "Likely weak compressor with possible restriction. Replace compressor and drier, pressure test, evacuate, recharge.",
    quoteTotal: 4289,
    invoiceStatus: "Unpaid",
    gpsTime: "Route start placeholder saved 09:10",
    beforeAfter: "Before/after photos pending",
    attachments: {
      photos: ["Serial plate", "Compressor compartment", "Evaporator coil", "Temperature display"],
      videos: ["Compressor startup video"],
      documents: ["Diagnostic worksheet"]
    },
    timeline: [
      ["Created", "2026-06-21 08:42"],
      ["Assigned", "2026-06-21 08:55"],
      ["On The Way", "2026-06-21 09:10"],
      ["Arrived", "2026-06-21 09:38"],
      ["Diagnostic", "2026-06-21 10:05"],
      ["Mentor Review", "2026-06-21 10:42"],
      ["Quote Generated", "Pending"],
      ["Approved", "Pending"],
      ["Invoice Sent", "Pending"],
      ["Paid", "Pending"],
      ["Repair Started", "Pending"],
      ["Completed", "Pending"],
      ["Closed", "Pending"]
    ]
  },
  {
    id: "ticket-126",
    ticketNumber: "FS-2026-000126",
    status: "ASSIGNED",
    customerId: "cust-1002",
    equipmentId: "eq-1002",
    customer: "Alex Kim",
    businessName: "Central Florida Bakery",
    address: "88 Market St, Lakeland, FL",
    equipment: "Commercial mixer",
    manufacturer: "Hobart",
    model: "HL600",
    serial: "HB-88217",
    problem: "Mixer makes grinding noise under dough load.",
    technician: "Nina Santos",
    mentor: "Senior Mentor",
    diagnosticNotes: "Assigned for afternoon diagnostic.",
    temperatureReadings: "-",
    pressureReadings: "-",
    voltageReadings: "120V outlet verified",
    photos: "Photos pending",
    videos: "Videos pending",
    mentorDiagnosis: "Pending mentor review.",
    quoteTotal: 0,
    invoiceStatus: "Not generated",
    gpsTime: "Not started",
    beforeAfter: "Pending",
    attachments: {
      photos: ["Upload placeholder"],
      videos: ["Upload placeholder"],
      documents: ["Diagnostic form placeholder"]
    },
    timeline: [
      ["Created", "2026-06-21 11:15"],
      ["Assigned", "2026-06-21 11:22"],
      ["On The Way", "Pending"],
      ["Arrived", "Pending"],
      ["Diagnostic", "Pending"],
      ["Mentor Review", "Pending"],
      ["Quote Generated", "Pending"],
      ["Approved", "Pending"],
      ["Invoice Sent", "Pending"],
      ["Paid", "Pending"],
      ["Repair Started", "Pending"],
      ["Completed", "Pending"],
      ["Closed", "Pending"]
    ]
  },
  {
    id: "ticket-127",
    ticketNumber: "FS-2026-000127",
    status: "PAID",
    customerId: "cust-1001",
    equipmentId: "eq-1003",
    customer: "Maria Lopez",
    businessName: "Bayside Grill",
    address: "401 Harbor Ave, Tampa, FL",
    equipment: "Commercial fryer",
    manufacturer: "Pitco",
    model: "SG14",
    serial: "PT-77291",
    problem: "Fryer does not hold temperature during rush.",
    technician: "Ivan Petrov",
    mentor: "Heat Team",
    diagnosticNotes: "Thermostat drift confirmed. Pilot assembly dirty.",
    temperatureReadings: "Oil set 350F, actual swings 305-365F",
    pressureReadings: "Gas pressure 6.5 in WC",
    voltageReadings: "24V control circuit stable",
    photos: "4 inspection photos",
    videos: "1 flame pattern video",
    mentorDiagnosis: "Replace thermostat and clean burner/pilot assembly.",
    quoteTotal: 779,
    invoiceStatus: "Paid",
    gpsTime: "Arrived 11:35",
    beforeAfter: "Before/after photos ready",
    attachments: {
      photos: ["Before flame pattern", "Thermostat access", "After temperature test"],
      videos: ["Pilot flame test"],
      documents: ["Signed service report", "Paid invoice"]
    },
    timeline: [
      ["Created", "2026-06-14 09:05"],
      ["Assigned", "2026-06-14 09:18"],
      ["On The Way", "2026-06-14 10:55"],
      ["Arrived", "2026-06-14 11:35"],
      ["Diagnostic", "2026-06-14 12:05"],
      ["Mentor Review", "2026-06-14 12:25"],
      ["Quote Generated", "2026-06-14 13:10"],
      ["Approved", "2026-06-14 13:22"],
      ["Invoice Sent", "2026-06-14 15:40"],
      ["Paid", "2026-06-14 15:55"],
      ["Repair Started", "2026-06-14 14:05"],
      ["Completed", "2026-06-14 15:30"],
      ["Closed", "2026-06-14 16:10"]
    ]
  }
];

export const sampleQuotes = [
  {
    id: "quote-125",
    quoteNumber: "Q-2026-000125",
    ticketNumber: "FS-2026-000125",
    customer: "Bayside Grill",
    customerAddress: "401 Harbor Ave, Tampa, FL",
    equipment: "True walk-in cooler TWC-96",
    equipmentId: "eq-1001",
    status: "WAITING APPROVAL",
    labor: 1450,
    parts: 1850,
    refrigerant: 420,
    tripCharge: 159,
    tax: 410,
    total: 4289,
    diagnosis: "Compressor trips under load with low suction pressure.",
    repairPlan: "Replace compressor and filter drier, leak test, evacuate, recharge, verify temperature.",
    scope: "Recover refrigerant, replace compressor and drier, pressure test, evacuate, recharge, verify box temperature, document readings.",
    materials: "Filter drier, brazing supplies, nitrogen, vacuum pump materials",
    warranty: "90-day labor warranty and manufacturer warranty on installed parts.",
    terms: "Customer approval required before repair. Hidden failures or inaccessible components may require a revised quote.",
    signature: "Customer signature placeholder"
  }
];

export const sampleInvoices = [
  {
    id: "invoice-127",
    invoiceNumber: "INV-2026-000127",
    quoteNumber: "Q-2026-000127",
    ticketNumber: "FS-2026-000127",
    customer: "Bayside Grill",
    equipment: "Pitco fryer SG14",
    equipmentId: "eq-1003",
    completedWork: "Replaced thermostat, cleaned pilot and burner assembly, verified recovery temperature.",
    parts: 280,
    materials: 40,
    discount: 0,
    tax: 58,
    total: 779,
    status: "Paid",
    paymentMethod: "Card",
    payments: [{ method: "Card", amount: 779, date: "2026-06-14" }],
    balanceDue: 0
  }
];

export const sampleInventory = [
  { id: "inv-01", category: "Compressors", item: "1/2 HP compressor", quantity: 2, location: "Tampa van 1" },
  { id: "inv-02", category: "Motors", item: "Evaporator fan motor", quantity: 6, location: "Main shelf" },
  { id: "inv-03", category: "Capacitors", item: "Run/start capacitor kit", quantity: 18, location: "Technician vans" },
  { id: "inv-04", category: "Contactors", item: "2-pole contactor", quantity: 9, location: "Main shelf" },
  { id: "inv-05", category: "Thermostats", item: "Commercial thermostat", quantity: 5, location: "Tampa van 2" },
  { id: "inv-06", category: "Sensors", item: "Temperature probe", quantity: 8, location: "Main shelf" },
  { id: "inv-07", category: "Refrigerant", item: "R-448A cylinder", quantity: 3, location: "Locked cage" },
  { id: "inv-08", category: "Fittings", item: "Copper fittings assortment", quantity: 24, location: "Parts bins" },
  { id: "inv-09", category: "Consumables", item: "Cleaner, brazing rod, zip ties", quantity: 40, location: "Shop stock" }
];

export const sampleReports = [
  {
    id: "report-01",
    date: "2026-06-20",
    technician: "Ivan Petrov",
    locations: "Tampa, Brandon",
    time: "8.5 hours",
    mileage: "74 miles",
    materials: "Thermostat, cleaner, fittings",
    expenses: "$32 parking/supplies",
    payments: "$779 card",
    photos: "Before/after attached",
    signatures: "Customer signature placeholder"
  }
];

export const sampleKpi = {
  jobsCount: 18,
  averageTicket: 1240,
  diagnosticTime: "54 min",
  repairTime: "2.7 hr",
  sales: 28600,
  callbacks: 2,
  returns: 1,
  customerRating: 4.8
};
