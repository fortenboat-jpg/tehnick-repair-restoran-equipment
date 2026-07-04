export const leadStatuses = [
  "New Lead",
  "Contacted",
  "Diagnostic Scheduled",
  "Estimate Sent",
  "Approved",
  "Scheduled",
  "In Progress",
  "Completed",
  "Customer",
  "VIP Customer",
  "Lost"
];

export const leadSources = [
  "Website",
  "Google Places",
  "Referral",
  "Phone Call",
  "Facebook",
  "Manual"
];

export const equipmentTypes = [
  "Refrigeration equipment",
  "Cooking equipment",
  "Food preparation",
  "Warewashing",
  "Beverage equipment",
  "Preventive maintenance"
];

export const businessTypes = [
  "Restaurant",
  "Cafe",
  "Bakery",
  "Bar",
  "Food truck",
  "Farm",
  "Hotel",
  "Grocery store",
  "Commercial kitchen"
];

export const estimateTemplates = [
  {
    id: "compressor",
    en: "Compressor replacement",
    ru: "Замена компрессора",
    equipment: "Walk-in cooler",
    findingEn: "Compressor is not starting reliably and system pressures are outside normal range.",
    findingRu: "Компрессор не запускается стабильно, давление в системе вне рабочего диапазона.",
    repairEn: "Replace compressor and filter drier, pressure test, evacuate system, recharge refrigerant, and verify temperature.",
    repairRu: "Заменить компрессор и фильтр-осушитель, проверить давление, вакуумировать систему, заправить хладагент и проверить температуру.",
    items: [
      ["Commercial diagnostic", "Диагностика коммерческого оборудования", 1, 159],
      ["Compressor replacement flat-rate service", "Замена компрессора по фиксированной цене", 1, 2200],
      ["Compressor", "Компрессор", 1, 1250],
      ["Filter drier and materials", "Фильтр-осушитель и материалы", 1, 180],
      ["Refrigerant", "Хладагент", 1, 480]
    ]
  },
  {
    id: "ice",
    en: "Ice machine repair",
    ru: "Ремонт льдогенератора",
    equipment: "Ice machine",
    findingEn: "Ice production is low due to scale buildup and a failed water/harvest component.",
    findingRu: "Производительность льда снижена из-за накипи и неисправного узла подачи воды или сброса льда.",
    repairEn: "Clean water circuit, replace failed component, sanitize machine, and test harvest cycle.",
    repairRu: "Очистить водяной контур, заменить неисправный узел, выполнить санитарную обработку и проверить цикл сброса льда.",
    items: [["Commercial diagnostic", "Диагностика коммерческого оборудования", 1, 159], ["Ice machine repair package", "Пакет ремонта льдогенератора", 1, 620], ["Water valve/sensor/materials", "Клапан воды, датчик и материалы", 1, 260]]
  },
  {
    id: "fryer",
    en: "Fryer repair",
    ru: "Ремонт фритюрницы",
    equipment: "Commercial fryer",
    findingEn: "Heating or ignition system is failing and fryer is not holding temperature.",
    findingRu: "Система нагрева или розжига работает нестабильно, фритюрница не держит температуру.",
    repairEn: "Replace failed heating/ignition component, clean burner area, and verify oil temperature.",
    repairRu: "Заменить неисправный узел нагрева или розжига, очистить горелку и проверить температуру масла.",
    items: [["Commercial diagnostic", "Диагностика коммерческого оборудования", 1, 159], ["Fryer heating repair package", "Пакет ремонта нагрева фритюрницы", 1, 520], ["Thermostat/ignition component", "Термостат или узел розжига", 1, 280]]
  },
  {
    id: "oven",
    en: "Oven repair",
    ru: "Ремонт печи",
    equipment: "Commercial oven",
    findingEn: "Oven temperature is inconsistent due to sensor, ignition, or control failure.",
    findingRu: "Температура печи нестабильна из-за датчика, розжига или блока управления.",
    repairEn: "Replace failed component, calibrate temperature, and test bake cycle.",
    repairRu: "Заменить неисправный компонент, откалибровать температуру и проверить цикл выпечки.",
    items: [["Commercial diagnostic", "Диагностика коммерческого оборудования", 1, 159], ["Oven repair package", "Пакет ремонта печи", 1, 580], ["Sensor/control/ignition part", "Датчик, управление или розжиг", 1, 310]]
  },
  {
    id: "dishwasher",
    en: "Dishwasher repair",
    ru: "Ремонт посудомоечной машины",
    equipment: "Commercial dishwasher",
    findingEn: "Wash cycle is failing due to heater, pump, sensor, or water delivery issue.",
    findingRu: "Цикл мойки нарушен из-за нагревателя, насоса, датчика или подачи воды.",
    repairEn: "Replace failed assembly, clean system, verify water temperature and wash cycle.",
    repairRu: "Заменить неисправный узел, очистить систему, проверить температуру воды и цикл мойки.",
    items: [["Commercial diagnostic", "Диагностика коммерческого оборудования", 1, 159], ["Dishwasher repair package", "Пакет ремонта посудомоечной машины", 1, 650], ["Heater/pump/sensor", "Нагреватель, насос или датчик", 1, 420]]
  },
  {
    id: "mixer",
    en: "Mixer repair",
    ru: "Ремонт миксера",
    equipment: "Commercial mixer",
    findingEn: "Mixer drive slips or makes noise under load.",
    findingRu: "Привод миксера проскальзывает или шумит под нагрузкой.",
    repairEn: "Repair drive assembly, replace worn components, and test under load.",
    repairRu: "Отремонтировать привод, заменить изношенные детали и проверить под нагрузкой.",
    items: [["Commercial diagnostic", "Диагностика коммерческого оборудования", 1, 159], ["Mixer drive repair package", "Пакет ремонта привода миксера", 1, 420], ["Drive components", "Детали привода", 1, 280]]
  },
  {
    id: "slicer",
    en: "Slicer repair",
    ru: "Ремонт слайсера",
    equipment: "Commercial slicer",
    findingEn: "Slicer blade drive, carriage, or safety switch requires service.",
    findingRu: "Требуется ремонт привода ножа, каретки или защитного выключателя слайсера.",
    repairEn: "Service drive and carriage, replace failed safety component, sharpen/test operation.",
    repairRu: "Обслужить привод и каретку, заменить неисправный защитный узел, заточить и проверить работу.",
    items: [["Commercial diagnostic", "Диагностика коммерческого оборудования", 1, 159], ["Slicer service package", "Пакет обслуживания слайсера", 1, 360], ["Safety/drive materials", "Защитные или приводные материалы", 1, 190]]
  },
  {
    id: "pm",
    en: "Preventive maintenance",
    ru: "Профилактическое обслуживание",
    equipment: "Kitchen equipment group",
    findingEn: "Preventive maintenance visit for cleaning, inspection, calibration, and service recommendations.",
    findingRu: "Плановое обслуживание: очистка, проверка, калибровка и рекомендации по сервису.",
    repairEn: "Complete checklist service, document equipment condition, and schedule next service date.",
    repairRu: "Выполнить обслуживание по чек-листу, зафиксировать состояние оборудования и назначить следующую дату сервиса.",
    items: [["Commercial diagnostic", "Диагностика коммерческого оборудования", 1, 159], ["Preventive maintenance flat-rate visit", "Профилактический визит по фиксированной цене", 1, 480], ["Cleaning and shop materials", "Материалы для очистки и обслуживания", 1, 95]]
  }
];

export const sampleLead = {
  id: "lead-1001",
  businessName: "Demo Pizza Tampa",
  contact: "Manager",
  phone: "(813) 555-0101",
  email: "manager@example.com",
  address: "Tampa, FL",
  businessType: "Restaurant",
  equipment: "Refrigeration equipment",
  urgency: "Same day",
  issue: "Walk-in cooler is not holding temperature.",
  notes: "Needs diagnostic after lunch rush.",
  source: "Website",
  status: "New Lead",
  createdAt: "2026-06-19"
};
