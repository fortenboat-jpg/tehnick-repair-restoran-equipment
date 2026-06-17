"use client";

import { useMemo, useState } from "react";
import {
  Languages, Search, Phone, MessageSquare, Mail, MapPin, UserRound,
  FileText, Wrench, Send, DollarSign, TrendingUp, Users, Star,
  Megaphone, Database
} from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, LineChart, Line, CartesianGrid
} from "recharts";

const UI = {
  ru: {
    langButton: "English",
    heroBadge: "Флорида · сервис коммерческой кухни",
    title: "CRM для ремонта ресторанного оборудования",
    subtitle: "Полностью двуязычная система: база клиентов, рассылки, flat-rate прайсбук, estimate/work order и прогноз выручки.",
    heroCardTitle: "CRM + Estimate + Маркетинг",
    heroCardText: "Лиды → заявки → ремонты → постоянные клиенты",

    statsClients: "Клиентов",
    statsPipeline: "Потенциал",
    statsAvgTicket: "Средний чек",
    statsRecurring: "Постоянных",

    crmTitle: "База клиентов",
    crmDesc: "Рестораны, кафе, бары, пекарни, фудтраки, магазины и коммерческие кухни.",
    searchPlaceholder: "Поиск: пицца, холодильник, Тампа, Google Maps...",
    allStatuses: "Все статусы",
    allSources: "Все источники",

    funnel: "Воронка",
    sources: "Источники лидов",
    revenue: "Выручка",

    forecastTitle: "Прогноз выручки",
    forecastDesc: "Сколько лидов и заказов нужно для цели $5k–10k в день.",
    dailyTarget: "Цель в день",
    avgTicket: "Средний чек",
    closeRate: "Конверсия %",
    jobsNeeded: "Нужно заказов",
    leadsNeeded: "Нужно лидов",

    estimateTitle: "Estimate / Work Order",
    estimateDesc: "Документ: клиент, адрес, источник, техник, оборудование, виды работ, цена и условия.",
    business: "Бизнес",
    serviceLocation: "Адрес работы",
    technician: "Техник",
    equipmentPriceBook: "Прайсбук по типам техники",
    workScope: "Виды работ / Flat-rate услуги",
    calculation: "Расчет",
    servicesTotal: "Сумма услуг",
    partsMaterials: "Запчасти / материалы",
    tax: "Налог %",
    discount: "Скидка",
    total: "Итого",
    copyEstimate: "Скопировать Estimate",

    marketingTitle: "Email-маркетинг",
    marketingDesc: "Письма для холодной базы, follow-up, профилактики и постоянных клиентов.",
    campaign: "Кампания",
    subject: "Тема письма",
    emailBody: "Текст письма",
    copyEmail: "Скопировать письмо",

    noEmail: "Email не указан",
    customerStatus: "Статус клиента",
    notes: "Заметки",
    leadSource: "Источник лида",
    assignedTech: "Назначенный техник",
    reportedIssue: "Заявленная проблема",
    workToPerform: "Работы к выполнению",
    priceBreakdown: "Расчет стоимости",
    termsTitle: "Условия",
    estimateHeader: "ESTIMATE НА РЕМОНТ КОММЕРЧЕСКОГО РЕСТОРАННОГО ОБОРУДОВАНИЯ",
    terms: "Этот estimate не является финальным invoice. Итоговая цена может измениться после диагностики, если обнаружены дополнительные неисправности, утечки, электрические проблемы, недоступные детали или потребуется повторный визит. Запчасти и материалы оплачиваются отдельно, если не указано иначе.",
    copied: "Скопировано",

    status: {
      lead: "Лид",
      contacted: "Связались",
      estimate_sent: "Estimate отправлен",
      follow_up: "Follow-up",
      customer: "Клиент",
      vip: "VIP клиент",
      lost: "Потерян"
    },

    businessTypes: {
      pizza: "Пиццерия",
      bakery: "Пекарня",
      icecream: "Магазин мороженого",
      deli: "Дели / сэндвичи",
      foodtruck: "Фудтрак",
      bargrill: "Бар и гриль"
    },

    equipment: {
      walkin_cooler: "Walk-in холодильная камера",
      oven: "Коммерческая печь",
      ice_machine: "Льдогенератор",
      prep_table: "Холодильный prep table",
      fryer: "Фритюрница",
      dishwasher: "Посудомоечная машина",
      walkin_freezer: "Walk-in морозильная камера",
      reachin_cooler: "Вертикальный холодильник",
      mixer: "Коммерческий миксер",
      slicer: "Слайсер",
      espresso: "Кофемашина / эспрессо"
    },

    equipmentGroups: {
      refrigeration: "Холодильное оборудование",
      hotside: "Горячая линия / плиты",
      foodprep: "Подготовка продуктов",
      dishbev: "Мойка / напитки"
    },

    service: {
      diagnostic_general: "Диагностика / выезд",
      walkin_diag: "Диагностика walk-in камеры",
      ice_diag: "Диагностика льдогенератора",
      defrost: "Разморозка / удаление льда",
      coil_clean: "Чистка конденсатора / испарителя",
      leak_search: "Поиск утечки фреона",
      recharge: "Заправка фреоном / материалы",
      fan_motor: "Замена вентилятора",
      thermostat_ref: "Замена термостата / контроллера",
      compressor_diag: "Диагностика компрессора",
      compressor_replace: "Замена компрессора",
      oven_diag: "Диагностика печи",
      fryer_diag: "Диагностика фритюрницы",
      gas_check: "Проверка газового клапана / горелки / розжига",
      igniter: "Замена розжига",
      gas_valve: "Замена газового клапана",
      thermostat_hot: "Замена термостата горячей линии",
      mixer_diag: "Диагностика миксера / слайсера",
      mixer_repair: "Ремонт коммерческого миксера",
      slicer_repair: "Ремонт слайсера",
      dish_diag: "Диагностика посудомойки",
      dish_pump: "Ремонт насоса / мотора посудомойки",
      dish_heater: "Ремонт нагревателя / booster",
      emergency: "Срочный выезд / приоритет",
      pm_monthly: "Ежемесячная профилактика"
    },

    categories: {
      general: "Общее",
      refrigeration: "Холодильное",
      maintenance: "Профилактика",
      priority: "Срочность",
      hotside: "Горячая линия",
      foodprep: "Подготовка продуктов",
      dishwashing: "Посудомойки"
    },

    campaigns: {
      cold: "Холодная рассылка",
      followup: "Follow-up после звонка",
      maintenance: "Профилактика 30/90 дней",
      vip: "Постоянное обслуживание"
    }
  },

  en: {
    langButton: "Русский",
    heroBadge: "Florida · commercial kitchen service",
    title: "Restaurant Equipment Repair CRM",
    subtitle: "Fully bilingual system: customer database, email outreach, flat-rate price book, estimate/work order, and revenue forecast.",
    heroCardTitle: "CRM + Estimate + Marketing",
    heroCardText: "Leads → jobs → repairs → recurring customers",

    statsClients: "Clients",
    statsPipeline: "Pipeline",
    statsAvgTicket: "Average ticket",
    statsRecurring: "Recurring",

    crmTitle: "Client Database",
    crmDesc: "Restaurants, cafes, bars, bakeries, food trucks, stores, and commercial kitchens.",
    searchPlaceholder: "Search: pizza, cooler, Tampa, Google Maps...",
    allStatuses: "All statuses",
    allSources: "All sources",

    funnel: "Funnel",
    sources: "Lead Sources",
    revenue: "Revenue",

    forecastTitle: "Revenue Forecast",
    forecastDesc: "How many leads and jobs are needed to reach $5k–10k per day.",
    dailyTarget: "Daily target",
    avgTicket: "Average ticket",
    closeRate: "Close rate %",
    jobsNeeded: "Jobs needed",
    leadsNeeded: "Leads needed",

    estimateTitle: "Estimate / Work Order",
    estimateDesc: "Document: customer, address, source, technician, equipment, scope, price, and terms.",
    business: "Business",
    serviceLocation: "Service location",
    technician: "Technician",
    equipmentPriceBook: "Equipment price book",
    workScope: "Work scope / Flat-rate services",
    calculation: "Calculation",
    servicesTotal: "Services total",
    partsMaterials: "Parts / materials",
    tax: "Tax %",
    discount: "Discount",
    total: "Total",
    copyEstimate: "Copy Estimate",

    marketingTitle: "Email Marketing",
    marketingDesc: "Templates for cold outreach, follow-up, maintenance, and recurring customers.",
    campaign: "Campaign",
    subject: "Subject",
    emailBody: "Email body",
    copyEmail: "Copy email",

    noEmail: "No email",
    customerStatus: "Customer status",
    notes: "Notes",
    leadSource: "Lead source",
    assignedTech: "Assigned technician",
    reportedIssue: "Reported issue",
    workToPerform: "Work to be performed",
    priceBreakdown: "Price breakdown",
    termsTitle: "Terms",
    estimateHeader: "COMMERCIAL RESTAURANT EQUIPMENT REPAIR ESTIMATE",
    terms: "This estimate is not a final invoice. Final price may change after diagnostics if additional failures, leaks, electrical issues, unavailable parts, or follow-up visits are required. Parts and materials are billed separately unless stated otherwise.",
    copied: "Copied",

    status: {
      lead: "Lead",
      contacted: "Contacted",
      estimate_sent: "Estimate sent",
      follow_up: "Follow-up",
      customer: "Customer",
      vip: "VIP customer",
      lost: "Lost"
    },

    businessTypes: {
      pizza: "Pizza Restaurant",
      bakery: "Bakery",
      icecream: "Ice Cream Shop",
      deli: "Deli / Sandwich Shop",
      foodtruck: "Food Truck",
      bargrill: "Bar & Grill"
    },

    equipment: {
      walkin_cooler: "Walk-in Cooler",
      oven: "Commercial Oven",
      ice_machine: "Ice Machine",
      prep_table: "Refrigerated Prep Table",
      fryer: "Fryer",
      dishwasher: "Commercial Dishwasher",
      walkin_freezer: "Walk-in Freezer",
      reachin_cooler: "Reach-in Cooler",
      mixer: "Commercial Mixer",
      slicer: "Meat Slicer",
      espresso: "Coffee / Espresso Machine"
    },

    equipmentGroups: {
      refrigeration: "Refrigeration",
      hotside: "Cooking / Hot Side",
      foodprep: "Food Preparation",
      dishbev: "Dishwashing / Beverage"
    },

    service: {
      diagnostic_general: "Diagnostic / service call",
      walkin_diag: "Walk-in diagnostic",
      ice_diag: "Ice machine diagnostic",
      defrost: "Defrost / ice removal",
      coil_clean: "Condenser / evaporator cleaning",
      leak_search: "Refrigerant leak search",
      recharge: "Refrigerant recharge / materials",
      fan_motor: "Fan motor replacement",
      thermostat_ref: "Thermostat / control replacement",
      compressor_diag: "Compressor diagnostic",
      compressor_replace: "Compressor replacement",
      oven_diag: "Oven diagnostic",
      fryer_diag: "Fryer diagnostic",
      gas_check: "Gas valve / burner / igniter check",
      igniter: "Igniter replacement",
      gas_valve: "Gas valve replacement",
      thermostat_hot: "Hot-side thermostat replacement",
      mixer_diag: "Mixer / slicer diagnostic",
      mixer_repair: "Commercial mixer repair",
      slicer_repair: "Slicer repair",
      dish_diag: "Dishwasher diagnostic",
      dish_pump: "Dishwasher pump / motor repair",
      dish_heater: "Heater / booster repair",
      emergency: "Same-day / emergency priority",
      pm_monthly: "Monthly preventive maintenance"
    },

    categories: {
      general: "General",
      refrigeration: "Refrigeration",
      maintenance: "Maintenance",
      priority: "Priority",
      hotside: "Hot Side",
      foodprep: "Food Prep",
      dishwashing: "Dishwashing"
    },

    campaigns: {
      cold: "Cold outreach",
      followup: "Post-call follow-up",
      maintenance: "30/90 day maintenance",
      vip: "Recurring service offer"
    }
  }
};

const STATUS_KEYS = ["lead", "contacted", "estimate_sent", "follow_up", "customer", "vip", "lost"];

const CLIENTS = [
  { id:1, business:"Demo Pizza Tampa", typeKey:"pizza", contact:"Manager", phone:"(813) 555-0101", email:"manager@example.com", address:"Tampa, FL", city:"Tampa", source:"Google Maps", statusKey:"lead", equipmentKey:"walkin_cooler", issueRu:"Температура в холодильной камере растет", issueEn:"Cooler temperature rising", avgTicket:1200, notesRu:"Хороший клиент для профилактики холодильников", notesEn:"Good target for refrigeration maintenance" },
  { id:2, business:"Bay Bakery Brandon", typeKey:"bakery", contact:"Owner", phone:"(813) 555-0102", email:"owner@example.com", address:"Brandon, FL", city:"Brandon", source:"Yelp", statusKey:"contacted", equipmentKey:"oven", issueRu:"Печь не держит температуру", issueEn:"Oven not holding temperature", avgTicket:900, notesRu:"Лид по горячей линии", notesEn:"Hot-side lead" },
  { id:3, business:"Clearwater Ice Cream", typeKey:"icecream", contact:"Store Manager", phone:"(727) 555-0103", email:"", address:"Clearwater, FL", city:"Clearwater", source:"Phone Call", statusKey:"estimate_sent", equipmentKey:"ice_machine", issueRu:"Льдогенератор не делает лед", issueEn:"Ice machine not making ice", avgTicket:1200, notesRu:"Можно перевести в регулярное обслуживание", notesEn:"Good recurring maintenance target" },
  { id:4, business:"St Pete Deli", typeKey:"deli", contact:"Kitchen Manager", phone:"(727) 555-0104", email:"", address:"St Petersburg, FL", city:"St Petersburg", source:"Facebook", statusKey:"follow_up", equipmentKey:"prep_table", issueRu:"Prep table плохо охлаждает", issueEn:"Prep table not cooling", avgTicket:480, notesRu:"Перезвонить утром", notesEn:"Call again in the morning" },
  { id:5, business:"Riverview Food Truck", typeKey:"foodtruck", contact:"Owner", phone:"(813) 555-0105", email:"foodtruck@example.com", address:"Riverview, FL", city:"Riverview", source:"Referral", statusKey:"customer", equipmentKey:"fryer", issueRu:"Сервис фритюрницы и холодильника", issueEn:"Fryer and cooler service", avgTicket:825, notesRu:"Предложить ежемесячное обслуживание", notesEn:"Offer monthly maintenance" },
  { id:6, business:"Downtown Bar & Grill", typeKey:"bargrill", contact:"General Manager", phone:"(813) 555-0110", email:"gm@example.com", address:"Tampa, FL", city:"Tampa", source:"Website", statusKey:"vip", equipmentKey:"dishwasher", issueRu:"Посудомойка плохо греет воду", issueEn:"Dishwasher heating issue", avgTicket:1300, notesRu:"VIP клиент, несколько единиц техники", notesEn:"VIP multi-equipment customer" }
];

const TECHS = [
  { id:"alex", name:"Alex - Commercial Equipment Tech", phone:"+1 (689) 220-8902", areaRu:"Tampa Bay", areaEn:"Tampa Bay", roleRu:"Холодильное и кухонное оборудование", roleEn:"Refrigeration / kitchen equipment" },
  { id:"ref", name:"Refrigeration Specialist", phone:"", areaRu:"Тампа / Брэндон / Ривервью", areaEn:"Tampa / Brandon / Riverview", roleRu:"Walk-in камеры, морозильники, льдогенераторы", roleEn:"Walk-in coolers, freezers, ice machines" },
  { id:"hot", name:"Hot Side Technician", phone:"", areaRu:"Tampa Bay", areaEn:"Tampa Bay", roleRu:"Печи, фритюрницы, грили, газовое оборудование", roleEn:"Ovens, fryers, grills, gas equipment" }
];

const EQUIPMENT_GROUPS = [
  { groupKey:"refrigeration", items:[
    { equipmentKey:"walkin_cooler", diag:199, typical:1200 },
    { equipmentKey:"walkin_freezer", diag:199, typical:1500 },
    { equipmentKey:"reachin_cooler", diag:159, typical:850 },
    { equipmentKey:"prep_table", diag:159, typical:750 },
    { equipmentKey:"ice_machine", diag:189, typical:950 }
  ]},
  { groupKey:"hotside", items:[
    { equipmentKey:"oven", diag:159, typical:900 },
    { equipmentKey:"fryer", diag:159, typical:800 }
  ]},
  { groupKey:"foodprep", items:[
    { equipmentKey:"mixer", diag:159, typical:650 },
    { equipmentKey:"slicer", diag:159, typical:550 }
  ]},
  { groupKey:"dishbev", items:[
    { equipmentKey:"dishwasher", diag:159, typical:950 },
    { equipmentKey:"espresso", diag:189, typical:900 }
  ]}
];

const SERVICES = [
  { id:"diagnostic_general", categoryKey:"general", equipmentKey:"all", price:159, min:159, max:159 },
  { id:"walkin_diag", categoryKey:"refrigeration", equipmentKey:"walkin_cooler", price:199, min:199, max:249 },
  { id:"ice_diag", categoryKey:"refrigeration", equipmentKey:"ice_machine", price:189, min:189, max:249 },
  { id:"defrost", categoryKey:"refrigeration", equipmentKey:"walkin_freezer", price:249, min:249, max:499 },
  { id:"coil_clean", categoryKey:"maintenance", equipmentKey:"walkin_cooler", price:249, min:199, max:399 },
  { id:"leak_search", categoryKey:"refrigeration", equipmentKey:"walkin_cooler", price:399, min:349, max:699 },
  { id:"recharge", categoryKey:"refrigeration", equipmentKey:"walkin_cooler", price:699, min:499, max:1499 },
  { id:"fan_motor", categoryKey:"refrigeration", equipmentKey:"walkin_cooler", price:599, min:349, max:899 },
  { id:"thermostat_ref", categoryKey:"refrigeration", equipmentKey:"reachin_cooler", price:499, min:299, max:799 },
  { id:"compressor_diag", categoryKey:"refrigeration", equipmentKey:"walkin_cooler", price:299, min:249, max:399 },
  { id:"compressor_replace", categoryKey:"refrigeration", equipmentKey:"walkin_cooler", price:4200, min:2500, max:7000 },
  { id:"oven_diag", categoryKey:"hotside", equipmentKey:"oven", price:159, min:159, max:199 },
  { id:"fryer_diag", categoryKey:"hotside", equipmentKey:"fryer", price:159, min:159, max:199 },
  { id:"gas_check", categoryKey:"hotside", equipmentKey:"oven", price:299, min:249, max:499 },
  { id:"igniter", categoryKey:"hotside", equipmentKey:"oven", price:499, min:299, max:699 },
  { id:"gas_valve", categoryKey:"hotside", equipmentKey:"fryer", price:899, min:499, max:1499 },
  { id:"thermostat_hot", categoryKey:"hotside", equipmentKey:"oven", price:599, min:299, max:799 },
  { id:"mixer_diag", categoryKey:"foodprep", equipmentKey:"mixer", price:159, min:159, max:199 },
  { id:"mixer_repair", categoryKey:"foodprep", equipmentKey:"mixer", price:699, min:299, max:1499 },
  { id:"slicer_repair", categoryKey:"foodprep", equipmentKey:"slicer", price:499, min:299, max:999 },
  { id:"dish_diag", categoryKey:"dishwashing", equipmentKey:"dishwasher", price:159, min:159, max:199 },
  { id:"dish_pump", categoryKey:"dishwashing", equipmentKey:"dishwasher", price:899, min:499, max:1999 },
  { id:"dish_heater", categoryKey:"dishwashing", equipmentKey:"dishwasher", price:799, min:399, max:1499 },
  { id:"emergency", categoryKey:"priority", equipmentKey:"all", price:175, min:75, max:250 },
  { id:"pm_monthly", categoryKey:"maintenance", equipmentKey:"all", price:299, min:249, max:599 }
];

const CAMPAIGNS = ["cold", "followup", "maintenance", "vip"];

export default function Page() {
  const [lang, setLang] = useState("ru");
  const t = UI[lang];
  const [clients, setClients] = useState(CLIENTS);
  const [selected, setSelected] = useState(CLIENTS[0]);
  const [tech, setTech] = useState(TECHS[0]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [selectedServices, setSelectedServices] = useState(["diagnostic_general"]);
  const [parts, setParts] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [campaign, setCampaign] = useState("cold");
  const [forecast, setForecast] = useState({ target: 5000, avgTicket: 1200, closeRate: 12 });

  const filteredClients = useMemo(() => clients.filter(c => {
    const blob = [
      c.business, c.contact, c.phone, c.email, c.address, c.city, c.source,
      t.businessTypes[c.typeKey], t.status[c.statusKey], t.equipment[c.equipmentKey],
      lang === "ru" ? c.issueRu : c.issueEn
    ].join(" ").toLowerCase();
    return (!query || blob.includes(query.toLowerCase())) &&
      (!statusFilter || c.statusKey === statusFilter) &&
      (!sourceFilter || c.source === sourceFilter);
  }), [clients, query, statusFilter, sourceFilter, lang]);

  const pickedServices = SERVICES.filter(s => selectedServices.includes(s.id));
  const servicesTotal = pickedServices.reduce((sum, s) => sum + s.price, 0);
  const tax = (servicesTotal + parts) * taxRate / 100;
  const total = servicesTotal + parts + tax - discount;

  const stats = useMemo(() => {
    const recurring = clients.filter(c => c.statusKey === "customer" || c.statusKey === "vip").length;
    const pipeline = clients
      .filter(c => ["lead", "contacted", "estimate_sent", "follow_up"].includes(c.statusKey))
      .reduce((sum,c)=>sum+c.avgTicket,0);
    const avg = Math.round(clients.reduce((sum,c)=>sum+c.avgTicket,0)/clients.length);
    return { clients: clients.length, recurring, pipeline, avg };
  }, [clients]);

  const statusData = STATUS_KEYS.map(s => ({ name: t.status[s], count: clients.filter(c=>c.statusKey===s).length }));
  const sourceData = Array.from(new Set(clients.map(c=>c.source))).map(s=>({ name:s, value:clients.filter(c=>c.source===s).length }));
  const revenueData = [
    { day: lang === "ru" ? "Пн" : "Mon", revenue:1200 },
    { day: lang === "ru" ? "Вт" : "Tue", revenue:2600 },
    { day: lang === "ru" ? "Ср" : "Wed", revenue:4200 },
    { day: lang === "ru" ? "Чт" : "Thu", revenue:6100 },
    { day: lang === "ru" ? "Пт" : "Fri", revenue:7800 }
  ];

  const jobsNeeded = Math.ceil(Number(forecast.target || 0) / Math.max(1, Number(forecast.avgTicket || 1)));
  const leadsNeeded = Math.ceil(jobsNeeded / Math.max(0.01, Number(forecast.closeRate || 1)/100));

  const estimateText = buildEstimate({ lang, t, selected, tech, pickedServices, parts, tax, discount, total });
  const email = buildEmail({ lang, t, selected, campaign });

  function toggleService(id) {
    setSelectedServices(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
  }

  function copy(text) {
    navigator.clipboard.writeText(text);
    alert(t.copied);
  }

  function updateClientStatus(id, statusKey) {
    setClients(prev => prev.map(c => c.id === id ? { ...c, statusKey } : c));
    if (selected.id === id) setSelected({ ...selected, statusKey });
  }

  return (
    <main className="shell">
      <section className="hero">
        <div>
          <div className="topLine">
            <div className="eyebrow">{t.heroBadge}</div>
            <button className="langBtn" onClick={()=>setLang(lang === "ru" ? "en" : "ru")}><Languages size={18}/>{t.langButton}</button>
          </div>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>
        <div className="heroCard"><Database size={38}/><div><b>{t.heroCardTitle}</b><span>{t.heroCardText}</span></div></div>
      </section>

      <section className="statsGrid">
        <Stat icon={Users} label={t.statsClients} value={stats.clients}/>
        <Stat icon={TrendingUp} label={t.statsPipeline} value={money(stats.pipeline)}/>
        <Stat icon={DollarSign} label={t.statsAvgTicket} value={money(stats.avg)}/>
        <Stat icon={Star} label={t.statsRecurring} value={stats.recurring}/>
      </section>

      <section className="grid">
        <div className="card clientsCard">
          <div className="cardHeader"><div><h2>{t.crmTitle}</h2><p>{t.crmDesc}</p></div></div>
          <div className="filters">
            <div className="searchBox"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t.searchPlaceholder}/></div>
            <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
              <option value="">{t.allStatuses}</option>
              {STATUS_KEYS.map(s=><option key={s} value={s}>{t.status[s]}</option>)}
            </select>
            <select value={sourceFilter} onChange={e=>setSourceFilter(e.target.value)}>
              <option value="">{t.allSources}</option>
              {Array.from(new Set(clients.map(c=>c.source))).map(s=><option key={s}>{s}</option>)}
            </select>
          </div>

          <div className="clientList">
            {filteredClients.map(c=>(
              <article className={"clientCard " + (selected.id===c.id ? "active" : "")} key={c.id} onClick={()=>setSelected(c)}>
                <div className="clientTop">
                  <div><h3>{c.business}</h3><p><MapPin size={14}/> {c.city} · {t.businessTypes[c.typeKey]}</p></div>
                  <span className="badge">{t.status[c.statusKey]}</span>
                </div>
                <div className="mini">
                  <span><UserRound size={14}/> {c.contact}</span>
                  <span><Send size={14}/> {t.leadSource}: {c.source}</span>
                  <span><Wrench size={14}/> {t.equipment[c.equipmentKey]}</span>
                </div>
                <div className="issue">{lang === "ru" ? c.issueRu : c.issueEn}</div>
                <div className="clientFooter">
                  <b>{money(c.avgTicket)}</b>
                  <div className="actions">
                    <a href={`tel:${c.phone}`}><Phone size={16}/></a>
                    <a href={`sms:${c.phone}`}><MessageSquare size={16}/></a>
                    {c.email && <a href={`mailto:${c.email}`}><Mail size={16}/></a>}
                  </div>
                </div>
                <div className="statusButtons">
                  {["contacted","estimate_sent","customer","vip"].map(s=><button key={s} onClick={(e)=>{e.stopPropagation(); updateClientStatus(c.id, s)}}>{t.status[s]}</button>)}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="card">
          <h2>{t.funnel}</h2>
          <div className="chartBox"><ResponsiveContainer width="100%" height={220}><BarChart data={statusData}><XAxis dataKey="name" tick={{fontSize:10}}/><YAxis allowDecimals={false}/><Tooltip/><Bar dataKey="count" radius={[10,10,0,0]}/></BarChart></ResponsiveContainer></div>
        </div>

        <div className="card">
          <h2>{t.sources}</h2>
          <div className="chartBox"><ResponsiveContainer width="100%" height={220}><PieChart><Pie data={sourceData} dataKey="value" nameKey="name" outerRadius={80} label/><Tooltip/></PieChart></ResponsiveContainer></div>
        </div>

        <div className="card">
          <h2>{t.revenue}</h2>
          <div className="chartBox"><ResponsiveContainer width="100%" height={220}><LineChart data={revenueData}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="day"/><YAxis/><Tooltip/><Line type="monotone" dataKey="revenue" strokeWidth={3}/></LineChart></ResponsiveContainer></div>
        </div>

        <div className="card forecastCard">
          <h2>{t.forecastTitle}</h2><p>{t.forecastDesc}</p>
          <div className="forecastGrid">
            <Num label={t.dailyTarget} value={forecast.target} onChange={v=>setForecast({...forecast,target:v})}/>
            <Num label={t.avgTicket} value={forecast.avgTicket} onChange={v=>setForecast({...forecast,avgTicket:v})}/>
            <Num label={t.closeRate} value={forecast.closeRate} onChange={v=>setForecast({...forecast,closeRate:v})}/>
          </div>
          <div className="forecastResult">
            <div><span>{t.jobsNeeded}</span><b>{jobsNeeded}</b></div>
            <div><span>{t.leadsNeeded}</span><b>{leadsNeeded}</b></div>
          </div>
        </div>

        <div className="card estimateCard">
          <div className="cardHeader"><div><h2>{t.estimateTitle}</h2><p>{t.estimateDesc}</p></div><div className="iconBox"><FileText/></div></div>

          <div className="infoGrid">
            <Info title={t.business} lines={[selected.business, t.businessTypes[selected.typeKey], selected.contact, selected.phone, selected.email || t.noEmail]}/>
            <Info title={t.serviceLocation} lines={[selected.address, selected.city, `${t.leadSource}: ${selected.source}`, `${t.customerStatus}: ${t.status[selected.statusKey]}`]}/>
            <div className="infoBox">
              <h3>{t.technician}</h3>
              <select value={tech.id} onChange={e=>setTech(TECHS.find(x=>x.id===e.target.value))}>
                {TECHS.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}
              </select>
              <p>{lang === "ru" ? tech.roleRu : tech.roleEn}</p>
              <p>{lang === "ru" ? tech.areaRu : tech.areaEn}</p>
            </div>
          </div>

          <h3 className="sectionTitle">{t.equipmentPriceBook}</h3>
          <div className="equipmentGroups">
            {EQUIPMENT_GROUPS.map(g => (
              <div className="equipmentGroup" key={g.groupKey}>
                <h4>{t.equipmentGroups[g.groupKey]}</h4>
                {g.items.map(item => <div className="equipmentLine" key={item.equipmentKey}><span>{t.equipment[item.equipmentKey]}</span><b>{money(item.diag)} diag · avg {money(item.typical)}</b></div>)}
              </div>
            ))}
          </div>

          <h3 className="sectionTitle">{t.workScope}</h3>
          <div className="servicesGrid">
            {SERVICES.map(s=>(
              <button className={"serviceItem " + (selectedServices.includes(s.id) ? "selected" : "")} key={s.id} onClick={()=>toggleService(s.id)}>
                <b>{t.service[s.id]}</b>
                <span>{t.categories[s.categoryKey]} · {s.equipmentKey === "all" ? "All" : t.equipment[s.equipmentKey]}</span>
                <strong>{money(s.price)}</strong>
                <small>{money(s.min)}–{money(s.max)}</small>
              </button>
            ))}
          </div>

          <h3 className="sectionTitle">{t.calculation}</h3>
          <div className="calcGrid">
            <Read label={t.servicesTotal} value={money(servicesTotal)}/>
            <Num label={t.partsMaterials} value={parts} onChange={setParts}/>
            <Num label={t.tax} value={taxRate} onChange={setTaxRate}/>
            <Num label={t.discount} value={discount} onChange={setDiscount}/>
          </div>

          <div className="priceBox"><span>{t.total}</span><b>{money(total)}</b><small>{t.servicesTotal}: {money(servicesTotal)} · {t.partsMaterials}: {money(parts)} · {t.tax}: {money(tax)} · {t.discount}: {money(discount)}</small></div>

          <textarea className="documentText" readOnly value={estimateText}/>
          <button className="primaryBtn full" onClick={()=>copy(estimateText)}>{t.copyEstimate}</button>
        </div>

        <div className="card marketingCard">
          <div className="cardHeader"><div><h2>{t.marketingTitle}</h2><p>{t.marketingDesc}</p></div><div className="iconBox"><Megaphone/></div></div>
          <label>{t.campaign}</label>
          <select value={campaign} onChange={e=>setCampaign(e.target.value)}>
            {CAMPAIGNS.map(c=><option key={c} value={c}>{t.campaigns[c]}</option>)}
          </select>
          <label>{t.subject}</label>
          <input readOnly value={email.subject}/>
          <label>{t.emailBody}</label>
          <textarea className="emailText" readOnly value={email.body}/>
          <button className="primaryBtn full" onClick={()=>copy(email.subject + "\n\n" + email.body)}>{t.copyEmail}</button>
        </div>
      </section>
    </main>
  );
}

function buildEstimate({ lang, t, selected, tech, pickedServices, parts, tax, discount, total }) {
  const today = new Date().toISOString().slice(0,10);
  const no = "EST-" + today.replaceAll("-","") + "-" + selected.id.toString().padStart(3,"0");
  const issue = lang === "ru" ? selected.issueRu : selected.issueEn;
  const notes = lang === "ru" ? selected.notesRu : selected.notesEn;
  const role = lang === "ru" ? tech.roleRu : tech.roleEn;
  const area = lang === "ru" ? tech.areaRu : tech.areaEn;

  if (lang === "ru") {
    return `${t.estimateHeader}

${t.estimateTitle}: ${no}
${t.date || "Дата"}: ${today}

${t.business.toUpperCase()}
Название: ${selected.business}
Тип бизнеса: ${t.businessTypes[selected.typeKey]}
Контакт: ${selected.contact}
Телефон: ${selected.phone}
Email: ${selected.email || "N/A"}

${t.serviceLocation.toUpperCase()}
Адрес: ${selected.address}
Город / район: ${selected.city}

CRM
${t.leadSource}: ${selected.source}
${t.customerStatus}: ${t.status[selected.statusKey]}
${t.notes}: ${notes}

${t.assignedTech.toUpperCase()}
${t.technician}: ${tech.name}
Телефон: ${tech.phone || "N/A"}
Зона работы: ${area}
Специализация: ${role}

${t.reportedIssue.toUpperCase()}
${t.equipment[selected.equipmentKey]}
Проблема: ${issue}

${t.workToPerform.toUpperCase()}
${pickedServices.map((s,i)=>`${i+1}. ${t.service[s.id]} — ${t.categories[s.categoryKey]} — ${money(s.price)} (диапазон ${money(s.min)}–${money(s.max)})`).join("\n")}

${t.priceBreakdown.toUpperCase()}
${t.servicesTotal}: ${money(pickedServices.reduce((sum,s)=>sum+s.price,0))}
${t.partsMaterials}: ${money(parts)}
Налог: ${money(tax)}
Скидка: -${money(discount)}

${t.total.toUpperCase()}: ${money(total)}

${t.termsTitle.toUpperCase()}
${t.terms}`;
  }

  return `${t.estimateHeader}

${t.estimateTitle}: ${no}
Date: ${today}

CUSTOMER
Business: ${selected.business}
Business type: ${t.businessTypes[selected.typeKey]}
Contact: ${selected.contact}
Phone: ${selected.phone}
Email: ${selected.email || "N/A"}

SERVICE LOCATION
Address: ${selected.address}
City / Area: ${selected.city}

CRM
${t.leadSource}: ${selected.source}
${t.customerStatus}: ${t.status[selected.statusKey]}
${t.notes}: ${notes}

ASSIGNED TECHNICIAN
${t.technician}: ${tech.name}
Phone: ${tech.phone || "N/A"}
Service area: ${area}
Specialty: ${role}

REPORTED ISSUE
${t.equipment[selected.equipmentKey]}
Issue: ${issue}

WORK TO BE PERFORMED
${pickedServices.map((s,i)=>`${i+1}. ${t.service[s.id]} — ${t.categories[s.categoryKey]} — ${money(s.price)} (range ${money(s.min)}–${money(s.max)})`).join("\n")}

PRICE BREAKDOWN
${t.servicesTotal}: ${money(pickedServices.reduce((sum,s)=>sum+s.price,0))}
${t.partsMaterials}: ${money(parts)}
Tax: ${money(tax)}
Discount: -${money(discount)}

${t.total.toUpperCase()}: ${money(total)}

TERMS
${t.terms}`;
}

function buildEmail({ lang, t, selected, campaign }) {
  const contact = selected.contact;
  const business = selected.business;
  const equipment = t.equipment[selected.equipmentKey];

  if (lang === "ru") {
    const map = {
      cold: {
        subject: `Ремонт ресторанного оборудования — ${business}`,
        body: `Здравствуйте, ${contact}.\n\nМы ремонтируем коммерческое ресторанное оборудование во Флориде: холодильные камеры, морозильники, льдогенераторы, плиты, печи, фритюрницы, посудомойки, миксеры, слайсеры, кофемашины и другое оборудование кухни.\n\nДиагностика от $159. Возможен срочный выезд. Также предлагаем профилактическое обслуживание, чтобы техника не остановилась в самый загруженный день.\n\nЕсли у вас есть оборудование, которое плохо охлаждает, не греет, течет, шумит или отключается — можем помочь.\n\nСпасибо.`
      },
      followup: {
        subject: `Follow-up по оборудованию — ${business}`,
        body: `Здравствуйте, ${contact}.\n\nЯ хотел уточнить по вашему оборудованию: ${equipment}. Если проблема еще актуальна, мы можем подготовить estimate и назначить техника.\n\nДиагностика от $159. Работаем с холодильным, горячим и кухонным оборудованием для ресторанов.\n\nСпасибо.`
      },
      maintenance: {
        subject: `Профилактика ресторанного оборудования — ${business}`,
        body: `Здравствуйте, ${contact}.\n\nНапоминаем о профилактическом обслуживании ресторанного оборудования. Регулярная чистка, проверка температуры, вентиляторов, льда, утечек и электрических соединений помогает избежать дорогого аварийного ремонта.\n\nМожем предложить monthly / quarterly maintenance для вашего бизнеса.\n\nСпасибо.`
      },
      vip: {
        subject: `Приоритетный сервис для постоянных клиентов — ${business}`,
        body: `Здравствуйте, ${contact}.\n\nДля постоянных клиентов мы предлагаем приоритетный сервис, плановое обслуживание и быстрый emergency response для холодильников, морозильников, льдогенераторов, фритюрниц, печей, посудомоек и другой техники.\n\nЭто помогает снизить простой кухни и расходы на аварийный ремонт.\n\nСпасибо.`
      }
    };
    return map[campaign];
  }

  const map = {
    cold: {
      subject: `Restaurant equipment repair — ${business}`,
      body: `Hello ${contact},\n\nWe service and repair commercial restaurant equipment in Florida: walk-in coolers, freezers, ice machines, ovens, fryers, dishwashers, mixers, slicers, coffee machines, and other kitchen equipment.\n\nDiagnostics start at $159. Emergency service is available. We also offer preventive maintenance to help avoid equipment failure during busy hours.\n\nIf your equipment is not cooling, not heating, leaking, noisy, or shutting down, we can help.\n\nThank you.`
    },
    followup: {
      subject: `Follow-up regarding your equipment — ${business}`,
      body: `Hello ${contact},\n\nI wanted to follow up regarding your ${equipment}. If the issue is still active, we can prepare an estimate and assign a technician.\n\nDiagnostics start at $159. We service refrigeration, hot-side, and general commercial kitchen equipment.\n\nThank you.`
    },
    maintenance: {
      subject: `Restaurant equipment preventive maintenance — ${business}`,
      body: `Hello ${contact},\n\nThis is a reminder about preventive maintenance for your restaurant equipment. Regular cleaning, temperature checks, fan checks, ice machine checks, leak checks, and electrical inspections can help prevent expensive emergency repairs.\n\nWe can offer monthly or quarterly maintenance for your business.\n\nThank you.`
    },
    vip: {
      subject: `Priority service for recurring customers — ${business}`,
      body: `Hello ${contact},\n\nFor recurring customers, we offer priority service, scheduled maintenance, and faster emergency response for coolers, freezers, ice machines, fryers, ovens, dishwashers, and other restaurant equipment.\n\nThis helps reduce kitchen downtime and emergency repair costs.\n\nThank you.`
    }
  };
  return map[campaign];
}

function Stat({ icon: Icon, label, value }) { return <div className="statCard"><div className="statIcon"><Icon size={22}/></div><span>{label}</span><b>{value}</b></div>; }
function Info({ title, lines }) { return <div className="infoBox"><h3>{title}</h3>{lines.map((l,i)=><p key={i}>{l}</p>)}</div>; }
function Num({ label, value, onChange }) { return <div><label>{label}</label><input type="number" value={value} onChange={e=>onChange(Number(e.target.value))}/></div>; }
function Read({ label, value }) { return <div><label>{label}</label><input readOnly value={value}/></div>; }
function money(v) { return "$" + Number(v || 0).toFixed(2); }
