"use client";

import { useMemo, useState } from "react";
import {
  Languages, Search, Phone, MessageSquare, Mail, MapPin, Building2, UserRound,
  FileText, Wrench, Send, DollarSign, TrendingUp, Users, CheckCircle2,
  CalendarClock, Star, Megaphone, ClipboardCheck, Calculator, Database,
  Snowflake, Flame, Utensils, Coffee, ShieldCheck
} from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, LineChart, Line, CartesianGrid
} from "recharts";

const I18N = {
  ru: {
    switch: "English",
    title: "Restaurant Repair CRM",
    subtitle: "База клиентов, рассылки, flat-rate прайсбук, estimate/work order и прогноз выручки для ремонта ресторанного оборудования.",
    crm: "База клиентов",
    crmDesc: "Рестораны, кафе, бары, bakery, deli, food truck, grocery и все коммерческие кухни.",
    estimate: "Estimate / Work Order",
    estimateDesc: "Профессиональный документ: клиент, адрес, источник, техник, оборудование, работы, цена и условия.",
    priceBook: "Flat-Rate Прайсбук",
    priceBookDesc: "Средние коммерческие цены по Флориде как стартовая модель. Все цены можно менять.",
    marketing: "Email-маркетинг",
    marketingDesc: "Письма для холодной базы, follow-up и перевода клиентов в постоянных.",
    forecast: "Revenue Forecast",
    forecastDesc: "Сколько лидов и заказов нужно для цели $5k–10k в день.",
    search: "Поиск: pizza, cooler, Tampa, Google Maps...",
    all: "Все",
    status: "Статус",
    source: "Источник",
    customer: "Клиент",
    vip: "VIP клиент",
    lead: "Лид",
    followUp: "Follow up",
    contacted: "Contacted",
    estimateSent: "Estimate sent",
    lost: "Lost",
    business: "Бизнес",
    contact: "Контакт",
    serviceLocation: "Адрес работы",
    leadSource: "Источник лида",
    technician: "Техник",
    equipment: "Оборудование",
    issue: "Проблема",
    workScope: "Виды работ",
    pricing: "Расчет цены",
    selectedClient: "Выбранный клиент",
    estimateNo: "Estimate #",
    date: "Дата",
    validUntil: "Действителен до",
    diagnostic: "Диагностика",
    priority: "Срочность",
    parts: "Запчасти",
    materials: "Материалы / фреон",
    trip: "Дорога",
    discount: "Скидка",
    tax: "Налог",
    total: "Итого",
    copyEstimate: "Скопировать Estimate",
    copyEmail: "Скопировать письмо",
    emailCampaign: "Кампания",
    subject: "Тема письма",
    emailBody: "Текст письма",
    targetDaily: "Цель в день",
    averageTicket: "Средний чек",
    closeRate: "Конверсия",
    leadsNeeded: "Нужно лидов",
    jobsNeeded: "Нужно заказов",
    statsClients: "Клиентов",
    statsPipeline: "Pipeline",
    statsAvgTicket: "Средний чек",
    statsRecurring: "Постоянных",
    terms: "Estimate не является финальным invoice. Финальная цена может измениться после диагностики, если обнаружены дополнительные неисправности, утечки, электрические проблемы, недоступные детали или требуется повторный визит. Запчасти и материалы оплачиваются отдельно, если не указано иначе.",
    docHeader: "COMMERCIAL RESTAURANT EQUIPMENT REPAIR ESTIMATE",
    campaigns: {
      cold: "Холодное письмо",
      followup: "Follow-up после звонка",
      maintenance: "Профилактика 30/90 дней",
      vip: "Предложение постоянного обслуживания"
    }
  },
  en: {
    switch: "Русский",
    title: "Restaurant Repair CRM",
    subtitle: "Client database, email outreach, flat-rate price book, estimate/work order, and revenue forecast for restaurant equipment repair.",
    crm: "Client Database",
    crmDesc: "Restaurants, cafes, bars, bakeries, delis, food trucks, grocery stores, and commercial kitchens.",
    estimate: "Estimate / Work Order",
    estimateDesc: "Professional document: customer, address, source, technician, equipment, scope, price, and terms.",
    priceBook: "Flat-Rate Price Book",
    priceBookDesc: "Average Florida commercial pricing as a starting model. All prices are editable.",
    marketing: "Email Marketing",
    marketingDesc: "Templates for cold outreach, follow-up, and converting clients into recurring customers.",
    forecast: "Revenue Forecast",
    forecastDesc: "How many leads and jobs are needed to reach $5k–10k per day.",
    search: "Search: pizza, cooler, Tampa, Google Maps...",
    all: "All",
    status: "Status",
    source: "Source",
    customer: "Customer",
    vip: "VIP customer",
    lead: "Lead",
    followUp: "Follow up",
    contacted: "Contacted",
    estimateSent: "Estimate sent",
    lost: "Lost",
    business: "Business",
    contact: "Contact",
    serviceLocation: "Service location",
    leadSource: "Lead source",
    technician: "Technician",
    equipment: "Equipment",
    issue: "Issue",
    workScope: "Work scope",
    pricing: "Price calculation",
    selectedClient: "Selected client",
    estimateNo: "Estimate #",
    date: "Date",
    validUntil: "Valid until",
    diagnostic: "Diagnostic",
    priority: "Priority",
    parts: "Parts",
    materials: "Materials / refrigerant",
    trip: "Trip",
    discount: "Discount",
    tax: "Tax",
    total: "Total",
    copyEstimate: "Copy Estimate",
    copyEmail: "Copy email",
    emailCampaign: "Campaign",
    subject: "Email subject",
    emailBody: "Email body",
    targetDaily: "Daily target",
    averageTicket: "Average ticket",
    closeRate: "Close rate",
    leadsNeeded: "Leads needed",
    jobsNeeded: "Jobs needed",
    statsClients: "Clients",
    statsPipeline: "Pipeline",
    statsAvgTicket: "Avg ticket",
    statsRecurring: "Recurring",
    terms: "This estimate is not a final invoice. Final price may change after diagnostics if additional failures, leaks, electrical issues, unavailable parts, or follow-up visits are required. Parts and materials are billed separately unless stated otherwise.",
    docHeader: "COMMERCIAL RESTAURANT EQUIPMENT REPAIR ESTIMATE",
    campaigns: {
      cold: "Cold outreach",
      followup: "Post-call follow-up",
      maintenance: "30/90 day maintenance",
      vip: "Recurring service offer"
    }
  }
};

const STATUSES = ["Lead", "Contacted", "Estimate Sent", "Follow Up", "Customer", "VIP Customer", "Lost"];

const CLIENTS = [
  { id:1, business:"Demo Pizza Tampa", type:"Pizza Restaurant", contact:"Manager", phone:"(813) 555-0101", email:"manager@example.com", address:"Tampa, FL", city:"Tampa", source:"Google Maps", status:"Lead", equipment:"Walk-in Cooler", issue:"Cooler temperature rising", totalRevenue:0, avgTicket:1200, lastVisit:"", nextService:"", notes:"Good target for refrigeration PM" },
  { id:2, business:"Bay Bakery Brandon", type:"Bakery", contact:"Owner", phone:"(813) 555-0102", email:"owner@example.com", address:"Brandon, FL", city:"Brandon", source:"Yelp", status:"Contacted", equipment:"Commercial Oven", issue:"Oven not holding temperature", totalRevenue:0, avgTicket:900, lastVisit:"", nextService:"", notes:"Hot-side lead" },
  { id:3, business:"Clearwater Ice Cream", type:"Ice Cream Shop", contact:"Store Manager", phone:"(727) 555-0103", email:"", address:"Clearwater, FL", city:"Clearwater", source:"Phone Call", status:"Estimate Sent", equipment:"Ice Machine", issue:"Ice machine not making ice", totalRevenue:1200, avgTicket:1200, lastVisit:"2026-06-12", nextService:"2026-09-12", notes:"Good recurring maintenance client" },
  { id:4, business:"St Pete Deli", type:"Deli", contact:"Kitchen Manager", phone:"(727) 555-0104", email:"", address:"St Petersburg, FL", city:"St Petersburg", source:"Facebook", status:"Follow Up", equipment:"Prep Table", issue:"Prep table not cooling", totalRevenue:480, avgTicket:480, lastVisit:"2026-06-08", nextService:"", notes:"Call again at 10 AM" },
  { id:5, business:"Riverview Food Truck", type:"Food Truck", contact:"Owner", phone:"(813) 555-0105", email:"foodtruck@example.com", address:"Riverview, FL", city:"Riverview", source:"Referral", status:"Customer", equipment:"Fryer", issue:"Fryer and cooler service", totalRevenue:1650, avgTicket:825, lastVisit:"2026-06-10", nextService:"2026-07-10", notes:"Convert to monthly maintenance" },
  { id:6, business:"Downtown Bar & Grill", type:"Bar / Grill", contact:"General Manager", phone:"(813) 555-0110", email:"gm@example.com", address:"Tampa, FL", city:"Tampa", source:"Website", status:"VIP Customer", equipment:"Dishwasher", issue:"Dishwasher heating issue", totalRevenue:5200, avgTicket:1300, lastVisit:"2026-06-15", nextService:"2026-07-15", notes:"VIP, multi-equipment customer" }
];

const TECHS = [
  { name:"Alex - Commercial Equipment Tech", phone:"+1 (689) 220-8902", area:"Tampa Bay", role:"Refrigeration / kitchen equipment" },
  { name:"Refrigeration Specialist", phone:"", area:"Tampa / Brandon / Riverview", role:"Walk-in coolers / freezers / ice machines" },
  { name:"Hot Side Technician", phone:"", area:"Tampa Bay", role:"Ovens / fryers / grills / gas equipment" }
];

const EQUIPMENT_GROUPS = [
  { group:"Refrigeration", icon:"Snowflake", items:[
    { name:"Walk-in Cooler", diag:199, typical:1200 },
    { name:"Walk-in Freezer", diag:199, typical:1500 },
    { name:"Reach-in Cooler", diag:159, typical:850 },
    { name:"Prep Table", diag:159, typical:750 },
    { name:"Ice Machine", diag:189, typical:950 },
    { name:"Display Case", diag:159, typical:800 }
  ]},
  { group:"Cooking / Hot Side", icon:"Flame", items:[
    { name:"Commercial Oven", diag:159, typical:900 },
    { name:"Fryer", diag:159, typical:800 },
    { name:"Grill / Griddle", diag:159, typical:750 },
    { name:"Range / Stove", diag:159, typical:850 },
    { name:"Steamer", diag:159, typical:950 }
  ]},
  { group:"Food Prep", icon:"Utensils", items:[
    { name:"Commercial Mixer", diag:159, typical:650 },
    { name:"Meat Slicer", diag:159, typical:550 },
    { name:"Food Processor", diag:159, typical:450 },
    { name:"Vacuum Sealer", diag:159, typical:500 }
  ]},
  { group:"Dishwashing / Beverage", icon:"Coffee", items:[
    { name:"Commercial Dishwasher", diag:159, typical:950 },
    { name:"Glass Washer", diag:159, typical:750 },
    { name:"Coffee Machine", diag:159, typical:600 },
    { name:"Espresso Machine", diag:189, typical:900 }
  ]}
];

const FLAT_RATE_BOOK = [
  { id:"diagnostic_general", category:"General", equipment:"All restaurant equipment", service:"Diagnostic / service call", price:159, min:159, max:159 },
  { id:"walkin_diag", category:"Refrigeration", equipment:"Walk-in Cooler / Freezer", service:"Walk-in diagnostic", price:199, min:199, max:249 },
  { id:"ice_diag", category:"Refrigeration", equipment:"Ice Machine", service:"Ice machine diagnostic", price:189, min:189, max:249 },
  { id:"defrost", category:"Refrigeration", equipment:"Coolers / freezers", service:"Defrost / ice removal", price:249, min:249, max:499 },
  { id:"coil_clean", category:"Maintenance", equipment:"Refrigeration", service:"Condenser / evaporator coil cleaning", price:249, min:199, max:399 },
  { id:"leak_search", category:"Refrigeration", equipment:"Coolers / freezers", service:"Leak search", price:399, min:349, max:699 },
  { id:"recharge", category:"Refrigeration", equipment:"Coolers / freezers", service:"Refrigerant recharge / materials", price:699, min:499, max:1499 },
  { id:"fan_motor", category:"Refrigeration", equipment:"Coolers / freezers", service:"Fan motor replacement", price:599, min:349, max:899 },
  { id:"thermostat_ref", category:"Refrigeration", equipment:"Refrigeration", service:"Thermostat / control replacement", price:499, min:299, max:799 },
  { id:"compressor_diag", category:"Refrigeration", equipment:"Refrigeration", service:"Compressor diagnostic", price:299, min:249, max:399 },
  { id:"compressor_replace", category:"Refrigeration", equipment:"Walk-in / reach-in", service:"Compressor replacement", price:4200, min:2500, max:7000 },
  { id:"oven_diag", category:"Hot Side", equipment:"Commercial oven", service:"Oven diagnostic", price:159, min:159, max:199 },
  { id:"fryer_diag", category:"Hot Side", equipment:"Fryer", service:"Fryer diagnostic", price:159, min:159, max:199 },
  { id:"gas_check", category:"Hot Side", equipment:"Gas equipment", service:"Gas valve / burner / igniter check", price:299, min:249, max:499 },
  { id:"igniter", category:"Hot Side", equipment:"Oven / fryer", service:"Igniter replacement", price:499, min:299, max:699 },
  { id:"gas_valve", category:"Hot Side", equipment:"Gas equipment", service:"Gas valve replacement", price:899, min:499, max:1499 },
  { id:"thermostat_hot", category:"Hot Side", equipment:"Oven / fryer / grill", service:"Thermostat replacement", price:599, min:299, max:799 },
  { id:"mixer_diag", category:"Food Prep", equipment:"Mixer / slicer", service:"Mixer / slicer diagnostic", price:159, min:159, max:199 },
  { id:"mixer_repair", category:"Food Prep", equipment:"Commercial mixer", service:"Mixer repair", price:699, min:299, max:1499 },
  { id:"slicer_repair", category:"Food Prep", equipment:"Meat slicer", service:"Slicer repair", price:499, min:299, max:999 },
  { id:"dish_diag", category:"Dishwashing", equipment:"Dishwasher", service:"Dishwasher diagnostic", price:159, min:159, max:199 },
  { id:"dish_pump", category:"Dishwashing", equipment:"Dishwasher", service:"Pump / motor repair", price:899, min:499, max:1999 },
  { id:"dish_heater", category:"Dishwashing", equipment:"Dishwasher", service:"Heater / booster repair", price:799, min:399, max:1499 },
  { id:"emergency", category:"Priority", equipment:"All", service:"Same-day / emergency priority fee", price:175, min:75, max:250 },
  { id:"pm_monthly", category:"Maintenance", equipment:"Multiple equipment", service:"Monthly preventive maintenance visit", price:299, min:249, max:599 }
];

const CAMPAIGN_TYPES = ["cold", "followup", "maintenance", "vip"];

export default function Page() {
  const [lang, setLang] = useState("ru");
  const tx = I18N[lang];
  const [clients, setClients] = useState(CLIENTS);
  const [selected, setSelected] = useState(CLIENTS[0]);
  const [tech, setTech] = useState(TECHS[0]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [selectedServices, setSelectedServices] = useState(["diagnostic_general"]);
  const [customParts, setCustomParts] = useState(0);
  const [customDiscount, setCustomDiscount] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [campaign, setCampaign] = useState("cold");
  const [forecast, setForecast] = useState({ target: 5000, avgTicket: 1200, closeRate: 12 });

  const filteredClients = useMemo(() => clients.filter(c => {
    const blob = Object.values(c).join(" ").toLowerCase();
    return (!query || blob.includes(query.toLowerCase())) &&
      (!statusFilter || c.status === statusFilter) &&
      (!sourceFilter || c.source === sourceFilter);
  }), [clients, query, statusFilter, sourceFilter]);

  const pickedServices = useMemo(() => FLAT_RATE_BOOK.filter(s => selectedServices.includes(s.id)), [selectedServices]);

  const serviceTotal = pickedServices.reduce((sum, s) => sum + s.price, 0);
  const subtotal = serviceTotal + Number(customParts || 0);
  const tax = subtotal * Number(taxRate || 0) / 100;
  const total = subtotal + tax - Number(customDiscount || 0);

  const stats = useMemo(() => {
    const recurring = clients.filter(c => c.status === "Customer" || c.status === "VIP Customer").length;
    const pipeline = clients.reduce((sum,c)=>sum + (c.status === "Lead" || c.status === "Contacted" || c.status === "Estimate Sent" ? c.avgTicket : 0), 0);
    const avg = Math.round(clients.reduce((sum,c)=>sum+c.avgTicket,0)/clients.length);
    return { clients: clients.length, recurring, pipeline, avg };
  }, [clients]);

  const statusData = STATUSES.map(s => ({ name: statusLabel(tx, s), count: clients.filter(c=>c.status===s).length }));
  const sourceData = Array.from(new Set(clients.map(c=>c.source))).map(s=>({ name:s, value:clients.filter(c=>c.source===s).length }));
  const revenueData = [
    { day:"Mon", revenue:1200 }, { day:"Tue", revenue:2600 }, { day:"Wed", revenue:4200 },
    { day:"Thu", revenue:6100 }, { day:"Fri", revenue:7800 }
  ];

  const jobsNeeded = Math.ceil(Number(forecast.target || 0) / Math.max(1, Number(forecast.avgTicket || 1)));
  const leadsNeeded = Math.ceil(jobsNeeded / Math.max(0.01, Number(forecast.closeRate || 1)/100));

  const estimateText = buildEstimate({ tx, selected, tech, pickedServices, customParts, tax, customDiscount, total });
  const email = buildEmail({ lang, tx, selected, campaign });

  function toggleService(id) {
    setSelectedServices(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
  }

  function copy(text) {
    navigator.clipboard.writeText(text);
    alert(lang === "ru" ? "Скопировано" : "Copied");
  }

  function updateClientStatus(id, status) {
    setClients(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    if (selected.id === id) setSelected({ ...selected, status });
  }

  return (
    <main className="shell">
      <section className="hero">
        <div>
          <div className="topLine">
            <div className="eyebrow">Florida · Commercial Kitchen Service</div>
            <button className="langBtn" onClick={()=>setLang(lang === "ru" ? "en" : "ru")}><Languages size={18}/>{tx.switch}</button>
          </div>
          <h1>{tx.title}</h1>
          <p>{tx.subtitle}</p>
        </div>
        <div className="heroCard"><Database size={38}/><div><b>CRM + Estimate + Marketing</b><span>Leads → jobs → recurring customers</span></div></div>
      </section>

      <section className="statsGrid">
        <Stat icon={Users} label={tx.statsClients} value={stats.clients}/>
        <Stat icon={TrendingUp} label={tx.statsPipeline} value={money(stats.pipeline)}/>
        <Stat icon={DollarSign} label={tx.statsAvgTicket} value={money(stats.avg)}/>
        <Stat icon={Star} label={tx.statsRecurring} value={stats.recurring}/>
      </section>

      <section className="grid">
        <div className="card clientsCard">
          <div className="cardHeader"><div><h2>{tx.crm}</h2><p>{tx.crmDesc}</p></div></div>
          <div className="filters">
            <div className="searchBox"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={tx.search}/></div>
            <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
              <option value="">{tx.all} {tx.status}</option>
              {STATUSES.map(s=><option key={s} value={s}>{statusLabel(tx,s)}</option>)}
            </select>
            <select value={sourceFilter} onChange={e=>setSourceFilter(e.target.value)}>
              <option value="">{tx.all} {tx.source}</option>
              {Array.from(new Set(clients.map(c=>c.source))).map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="clientList">
            {filteredClients.map(c=>(
              <article className={"clientCard " + (selected.id===c.id ? "active" : "")} key={c.id} onClick={()=>setSelected(c)}>
                <div className="clientTop"><div><h3>{c.business}</h3><p><MapPin size={14}/> {c.city} · {c.type}</p></div><span className="badge">{statusLabel(tx,c.status)}</span></div>
                <div className="mini"><span><UserRound size={14}/> {c.contact}</span><span><Send size={14}/> {c.source}</span><span><Wrench size={14}/> {c.equipment}</span></div>
                <div className="issue">{c.issue}</div>
                <div className="clientFooter">
                  <b>{money(c.avgTicket)}</b>
                  <div className="actions">
                    <a href={`tel:${c.phone}`}><Phone size={16}/></a>
                    <a href={`sms:${c.phone}`}><MessageSquare size={16}/></a>
                    {c.email && <a href={`mailto:${c.email}`}><Mail size={16}/></a>}
                  </div>
                </div>
                <div className="statusButtons">
                  {["Contacted","Estimate Sent","Customer","VIP Customer"].map(s=><button key={s} onClick={(e)=>{e.stopPropagation(); updateClientStatus(c.id, s)}}>{statusLabel(tx,s)}</button>)}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="card">
          <h2>Funnel</h2>
          <div className="chartBox"><ResponsiveContainer width="100%" height={220}><BarChart data={statusData}><XAxis dataKey="name" tick={{fontSize:10}}/><YAxis allowDecimals={false}/><Tooltip/><Bar dataKey="count" radius={[10,10,0,0]}/></BarChart></ResponsiveContainer></div>
        </div>

        <div className="card">
          <h2>Sources</h2>
          <div className="chartBox"><ResponsiveContainer width="100%" height={220}><PieChart><Pie data={sourceData} dataKey="value" nameKey="name" outerRadius={80} label/><Tooltip/></PieChart></ResponsiveContainer></div>
        </div>

        <div className="card">
          <h2>Revenue</h2>
          <div className="chartBox"><ResponsiveContainer width="100%" height={220}><LineChart data={revenueData}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="day"/><YAxis/><Tooltip/><Line type="monotone" dataKey="revenue" strokeWidth={3}/></LineChart></ResponsiveContainer></div>
        </div>

        <div className="card forecastCard">
          <h2>{tx.forecast}</h2><p>{tx.forecastDesc}</p>
          <div className="forecastGrid">
            <Num label={tx.targetDaily} value={forecast.target} onChange={v=>setForecast({...forecast,target:v})}/>
            <Num label={tx.averageTicket} value={forecast.avgTicket} onChange={v=>setForecast({...forecast,avgTicket:v})}/>
            <Num label={tx.closeRate + " %"} value={forecast.closeRate} onChange={v=>setForecast({...forecast,closeRate:v})}/>
          </div>
          <div className="forecastResult">
            <div><span>{tx.jobsNeeded}</span><b>{jobsNeeded}</b></div>
            <div><span>{tx.leadsNeeded}</span><b>{leadsNeeded}</b></div>
          </div>
        </div>

        <div className="card estimateCard">
          <div className="cardHeader"><div><h2>{tx.estimate}</h2><p>{tx.estimateDesc}</p></div><div className="iconBox"><FileText/></div></div>

          <div className="infoGrid">
            <Info title={tx.business} lines={[selected.business, selected.type, selected.contact, selected.phone, selected.email || "No email"]}/>
            <Info title={tx.serviceLocation} lines={[selected.address, selected.city, selected.source, statusLabel(tx, selected.status)]}/>
            <div className="infoBox"><h3>{tx.technician}</h3><select value={tech.name} onChange={e=>setTech(TECHS.find(t=>t.name===e.target.value))}>{TECHS.map(t=><option key={t.name}>{t.name}</option>)}</select><p>{tech.role}</p><p>{tech.area}</p></div>
          </div>

          <h3 className="sectionTitle">{tx.priceBook}</h3>
          <div className="equipmentGroups">
            {EQUIPMENT_GROUPS.map(g => (
              <div className="equipmentGroup" key={g.group}>
                <h4>{iconFor(g.icon)} {g.group}</h4>
                {g.items.map(item => <div className="equipmentLine" key={item.name}><span>{item.name}</span><b>{money(item.diag)} diag · avg {money(item.typical)}</b></div>)}
              </div>
            ))}
          </div>

          <h3 className="sectionTitle">{tx.workScope}</h3>
          <div className="servicesGrid">
            {FLAT_RATE_BOOK.map(s=>(
              <button className={"serviceItem " + (selectedServices.includes(s.id) ? "selected" : "")} key={s.id} onClick={()=>toggleService(s.id)}>
                <b>{s.service}</b>
                <span>{s.category} · {s.equipment}</span>
                <strong>{money(s.price)}</strong>
                <small>range {money(s.min)}–{money(s.max)}</small>
              </button>
            ))}
          </div>

          <h3 className="sectionTitle">{tx.pricing}</h3>
          <div className="calcGrid">
            <Read label="Services total" value={money(serviceTotal)}/>
            <Num label={tx.parts} value={customParts} onChange={setCustomParts}/>
            <Num label={tx.tax + " %"} value={taxRate} onChange={setTaxRate}/>
            <Num label={tx.discount} value={customDiscount} onChange={setCustomDiscount}/>
          </div>

          <div className="priceBox"><span>{tx.total}</span><b>{money(total)}</b><small>Services {money(serviceTotal)} · Parts/materials {money(customParts)} · Tax {money(tax)} · Discount {money(customDiscount)}</small></div>

          <textarea className="documentText" readOnly value={estimateText}/>
          <button className="primaryBtn full" onClick={()=>copy(estimateText)}>{tx.copyEstimate}</button>
        </div>

        <div className="card marketingCard">
          <div className="cardHeader"><div><h2>{tx.marketing}</h2><p>{tx.marketingDesc}</p></div><div className="iconBox"><Megaphone/></div></div>
          <label>{tx.emailCampaign}</label>
          <select value={campaign} onChange={e=>setCampaign(e.target.value)}>
            {CAMPAIGN_TYPES.map(c=><option key={c} value={c}>{tx.campaigns[c]}</option>)}
          </select>
          <label>{tx.subject}</label>
          <input readOnly value={email.subject}/>
          <label>{tx.emailBody}</label>
          <textarea className="emailText" readOnly value={email.body}/>
          <button className="primaryBtn full" onClick={()=>copy(email.subject + "\n\n" + email.body)}>{tx.copyEmail}</button>
        </div>
      </section>
    </main>
  );
}

function statusLabel(tx, s) {
  const map = {
    "Lead": tx.lead, "Contacted": tx.contacted, "Estimate Sent": tx.estimateSent,
    "Follow Up": tx.followUp, "Customer": tx.customer, "VIP Customer": tx.vip, "Lost": tx.lost
  };
  return map[s] || s;
}

function buildEstimate({tx, selected, tech, pickedServices, customParts, tax, customDiscount, total}) {
  const today = new Date().toISOString().slice(0,10);
  const no = "EST-" + today.replaceAll("-","") + "-" + selected.id.toString().padStart(3,"0");
  return `${tx.docHeader}

${tx.estimateNo}: ${no}
${tx.date}: ${today}

CUSTOMER
Business: ${selected.business}
Type: ${selected.type}
Contact: ${selected.contact}
Phone: ${selected.phone}
Email: ${selected.email || "N/A"}

SERVICE LOCATION
${selected.address}
City / Area: ${selected.city}

LEAD / CRM
Lead source: ${selected.source}
Customer status: ${statusLabel(tx, selected.status)}
Notes: ${selected.notes}

ASSIGNED TECHNICIAN
Technician: ${tech.name}
Phone: ${tech.phone || "N/A"}
Area: ${tech.area}
Specialty: ${tech.role}

REPORTED ISSUE
Equipment: ${selected.equipment}
Issue: ${selected.issue}

WORK TO BE PERFORMED
${pickedServices.map((s,i)=>`${i+1}. ${s.service} — ${s.equipment} — ${money(s.price)} (typical range ${money(s.min)}–${money(s.max)})`).join("\n")}

PRICE BREAKDOWN
Services subtotal: ${money(pickedServices.reduce((sum,s)=>sum+s.price,0))}
Parts / materials / refrigerant allowance: ${money(customParts)}
Tax: ${money(tax)}
Discount: -${money(customDiscount)}

ESTIMATED TOTAL: ${money(total)}

TERMS
${tx.terms}`;
}

function buildEmail({lang, tx, selected, campaign}) {
  if (lang === "ru") {
    const bodyMap = {
      cold: `Здравствуйте, ${selected.contact}.\n\nМы обслуживаем и ремонтируем коммерческое ресторанное оборудование во Флориде: холодильники, walk-in cooler/freezer, ice machine, плиты, fryer, oven, dishwasher, mixer, slicer и другое оборудование кухни.\n\nДиагностика от $159. Возможен срочный выезд. Также предлагаем профилактическое обслуживание, чтобы оборудование не остановилось в самый загруженный день.\n\nЕсли у вас есть техника, которая плохо охлаждает, не греет, шумит, течет или периодически отключается — можем помочь.\n\nСпасибо.`,
      followup: `Здравствуйте, ${selected.contact}.\n\nЯ хотел уточнить по вашему оборудованию: ${selected.equipment}. Если проблема еще актуальна, мы можем подготовить estimate и назначить техника.\n\nДиагностика от $159. Работаем с ресторанным холодильным, горячим и кухонным оборудованием.\n\nСпасибо.`,
      maintenance: `Здравствуйте, ${selected.contact}.\n\nНапоминаем о профилактическом обслуживании ресторанного оборудования. Регулярная чистка конденсатора, проверка температуры, вентиляторов, льда, утечек и электрических соединений помогает избежать дорогого аварийного ремонта.\n\nМожем предложить monthly / quarterly maintenance для вашего бизнеса.\n\nСпасибо.`,
      vip: `Здравствуйте, ${selected.contact}.\n\nДля постоянных клиентов мы можем предложить приоритетный сервис, плановое обслуживание и быстрый emergency response для холодильников, морозильников, ice machine, fryer, oven, dishwasher и другой техники.\n\nЭто помогает снизить простои кухни и расходы на аварийный ремонт.\n\nСпасибо.`
    };
    return { subject: `Restaurant equipment repair service — ${selected.business}`, body: bodyMap[campaign] };
  }
  const bodyMap = {
    cold: `Hello ${selected.contact},\n\nWe service and repair commercial restaurant equipment in Florida: walk-in coolers/freezers, ice machines, ovens, fryers, dishwashers, mixers, slicers, and other kitchen equipment.\n\nDiagnostics start at $159. Emergency service is available. We also offer preventive maintenance to help avoid equipment failure during busy hours.\n\nIf your equipment is not cooling, not heating, leaking, noisy, or shutting down, we can help.\n\nThank you.`,
    followup: `Hello ${selected.contact},\n\nI wanted to follow up regarding your ${selected.equipment}. If the issue is still active, we can prepare an estimate and assign a technician.\n\nDiagnostics start at $159. We service refrigeration, hot-side, and general commercial kitchen equipment.\n\nThank you.`,
    maintenance: `Hello ${selected.contact},\n\nThis is a reminder about preventive maintenance for your restaurant equipment. Regular condenser cleaning, temperature checks, fan checks, leak checks, and electrical inspections can help prevent expensive emergency repairs.\n\nWe can offer monthly or quarterly maintenance for your business.\n\nThank you.`,
    vip: `Hello ${selected.contact},\n\nFor recurring customers, we can offer priority service, scheduled maintenance, and faster emergency response for coolers, freezers, ice machines, fryers, ovens, dishwashers, and other restaurant equipment.\n\nThis helps reduce downtime and emergency repair costs.\n\nThank you.`
  };
  return { subject: `Restaurant equipment repair service — ${selected.business}`, body: bodyMap[campaign] };
}

function Stat({ icon: Icon, label, value }) { return <div className="statCard"><div className="statIcon"><Icon size={22}/></div><span>{label}</span><b>{value}</b></div>; }
function Info({ title, lines }) { return <div className="infoBox"><h3>{title}</h3>{lines.map((l,i)=><p key={i}>{l}</p>)}</div>; }
function Num({ label, value, onChange }) { return <div><label>{label}</label><input type="number" value={value} onChange={e=>onChange(Number(e.target.value))}/></div>; }
function Read({ label, value }) { return <div><label>{label}</label><input readOnly value={value}/></div>; }
function money(v) { return "$" + Number(v || 0).toFixed(2); }
function iconFor(name) {
  if (name === "Snowflake") return "❄️";
  if (name === "Flame") return "🔥";
  if (name === "Utensils") return "🍴";
  if (name === "Coffee") return "☕";
  return "🔧";
}
