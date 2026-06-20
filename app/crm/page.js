"use client";

import { useEffect, useMemo, useState } from "react";
import { BarChart3, ClipboardList, FileText, Languages, Megaphone, Plus, Receipt, Settings, Users, Wrench } from "lucide-react";
import { businessTypes, equipmentTypes, estimateTemplates, leadSources, leadStatuses, sampleLead } from "../data";

const ui = {
  en: {
    lang: "Русский",
    title: "Forten CRM",
    subtitle: "Commercial kitchen repair operations",
    nav: ["Dashboard", "Leads", "Customers", "Estimates", "Work Orders", "Invoices", "Equipment History", "Marketing", "Settings"],
    kpis: ["Open leads", "Approved estimates", "Active work orders", "Invoice pipeline"],
    newLead: "New lead",
    saveLead: "Save lead",
    customerCard: "Customer card",
    equipmentHistory: "Equipment history",
    estimateBuilder: "Smart Estimate Builder",
    workOrders: "Work Orders",
    invoices: "Invoices",
    marketing: "Marketing",
    settings: "Settings",
    downloadPdf: "Download PDF",
    emailPdf: "Email PDF to customer",
    convertWorkOrder: "Convert to Work Order",
    convertInvoice: "Convert to Invoice",
    leadCollector: "Lead Collector",
    website: "Website",
    pipeline: "Pipeline",
    quoteNo: "Quote #",
    date: "Date",
    noRecords: "No records yet.",
    approvedOnly: "Approve the estimate first to convert it.",
    placeholders: {
      marketing: "Campaign list, follow-up reminders, VIP customer offers, and preventive maintenance outreach will live here.",
      settings: "Company profile, tax rate, Telegram status, planned Google Places key, estimate terms, and user preferences."
    },
    labels: {
      businessName: "Business name", contact: "Contact", phone: "Phone", email: "Email", address: "Address", businessType: "Business type",
      equipment: "Equipment", urgency: "Urgency", issue: "Issue", notes: "Notes", source: "Source", status: "Status",
      type: "Type", manufacturer: "Manufacturer", model: "Model", serial: "Serial number", photos: "Photos placeholder",
      finding: "Diagnostic findings", repair: "Recommended repair", scope: "Scope of work", warranty: "Warranty", terms: "Terms",
      subtotal: "Subtotal", tax: "Tax", discount: "Discount", total: "Total", nextService: "Next service date"
    }
  },
  ru: {
    lang: "English",
    title: "Forten CRM",
    subtitle: "Операционная система ремонта коммерческих кухонь",
    nav: ["Панель", "Лиды", "Клиенты", "Сметы", "Наряды", "Счета", "История оборудования", "Маркетинг", "Настройки"],
    kpis: ["Открытые лиды", "Одобренные сметы", "Активные наряды", "Счета в работе"],
    newLead: "Новый лид",
    saveLead: "Сохранить лид",
    customerCard: "Карточка клиента",
    equipmentHistory: "История оборудования",
    estimateBuilder: "Умный конструктор смет",
    workOrders: "Наряды",
    invoices: "Счета",
    marketing: "Маркетинг",
    settings: "Настройки",
    downloadPdf: "Скачать PDF",
    emailPdf: "Отправить PDF клиенту",
    convertWorkOrder: "Создать наряд",
    convertInvoice: "Создать счет",
    leadCollector: "Сбор лидов",
    website: "Сайт",
    pipeline: "Воронка",
    quoteNo: "Номер сметы",
    date: "Дата",
    noRecords: "Пока нет записей.",
    approvedOnly: "Сначала переведите смету в статус Approved.",
    placeholders: {
      marketing: "Здесь будут кампании, напоминания, предложения VIP-клиентам и рассылки по профилактическому обслуживанию.",
      settings: "Профиль компании, налог, статус Telegram, будущий ключ Google Places, условия сметы и настройки пользователя."
    },
    labels: {
      businessName: "Название бизнеса", contact: "Контакт", phone: "Телефон", email: "Email", address: "Адрес", businessType: "Тип бизнеса",
      equipment: "Оборудование", urgency: "Срочность", issue: "Проблема", notes: "Заметки", source: "Источник", status: "Статус",
      type: "Тип", manufacturer: "Производитель", model: "Модель", serial: "Серийный номер", photos: "Место для фото",
      finding: "Результаты диагностики", repair: "Рекомендованный ремонт", scope: "Объем работ", warranty: "Гарантия", terms: "Условия",
      subtotal: "Сумма", tax: "Налог", discount: "Скидка", total: "Итого", nextService: "Следующий сервис"
    }
  }
};

const blankLead = {
  businessName: "",
  contact: "",
  phone: "",
  email: "",
  address: "",
  businessType: "Restaurant",
  equipment: "Refrigeration equipment",
  urgency: "Same day",
  issue: "",
  notes: "",
  source: "Manual",
  status: "New Lead"
};

function seedCustomers() {
  return [
    {
      id: "cust-1001",
      businessName: "Demo Pizza Tampa",
      contact: "Manager",
      phone: "(813) 555-0101",
      email: "manager@example.com",
      address: "Tampa, FL",
      vip: false,
      equipment: [
        {
          id: "eq-1",
          type: "Walk-in cooler",
          manufacturer: "True / Walk-in system",
          model: "Unknown",
          serial: "Unknown",
          photos: "Photo upload placeholder",
          history: [
            {
              date: "2026-06-19",
              diagnostic: "Temperature above safe range; compressor start issue.",
              repair: "Quoted compressor replacement.",
              parts: "Compressor, filter drier, refrigerant",
              total: 4269,
              nextService: "2026-09-19"
            }
          ]
        }
      ]
    }
  ];
}

export default function CrmPage() {
  const [lang, setLang] = useState("en");
  const [tab, setTab] = useState("Dashboard");
  const [leads, setLeads] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [draftLead, setDraftLead] = useState(blankLead);
  const [estimate, setEstimate] = useState(makeEstimate(estimateTemplates[0]));
  const [workOrders, setWorkOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const t = ui[lang];
  const nav = ui.en.nav.map((key, index) => ({ key, label: t.nav[index] }));

  useEffect(() => {
    const savedLeads = JSON.parse(localStorage.getItem("fortenLeads") || "[]");
    setLeads(savedLeads.length ? savedLeads : [sampleLead]);
    setCustomers(JSON.parse(localStorage.getItem("fortenCustomers") || "null") || seedCustomers());
    setWorkOrders(JSON.parse(localStorage.getItem("fortenWorkOrders") || "[]"));
    setInvoices(JSON.parse(localStorage.getItem("fortenInvoices") || "[]"));
  }, []);

  useEffect(() => { if (leads.length) localStorage.setItem("fortenLeads", JSON.stringify(leads)); }, [leads]);
  useEffect(() => { if (customers.length) localStorage.setItem("fortenCustomers", JSON.stringify(customers)); }, [customers]);
  useEffect(() => { localStorage.setItem("fortenWorkOrders", JSON.stringify(workOrders)); }, [workOrders]);
  useEffect(() => { localStorage.setItem("fortenInvoices", JSON.stringify(invoices)); }, [invoices]);

  const totals = useMemo(() => calculate(estimate), [estimate]);
  const approved = leads.filter((lead) => lead.status === "Approved").length;
  const kpis = [leads.filter((lead) => !["Completed", "Customer", "VIP Customer", "Lost"].includes(lead.status)).length, approved, workOrders.length, `$${invoices.reduce((sum, inv) => sum + inv.total, 0).toFixed(0)}`];

  function addLead() {
    const lead = { ...draftLead, id: `lead-${Date.now()}`, createdAt: new Date().toISOString().slice(0, 10) };
    setLeads([lead, ...leads]);
    setDraftLead(blankLead);
  }

  function updateLead(id, key, value) {
    setLeads(leads.map((lead) => lead.id === id ? { ...lead, [key]: value } : lead));
  }

  function applyTemplate(id) {
    const template = estimateTemplates.find((item) => item.id === id);
    setEstimate(makeEstimate(template));
  }

  function convertToWorkOrder() {
    if (estimate.status !== "Approved") return;
    setWorkOrders([{ id: `wo-${Date.now()}`, estimateNo: estimate.number, customer: estimate.customer, status: "Scheduled", total: totals.total }, ...workOrders]);
  }

  function convertToInvoice(order) {
    setInvoices([{ id: `inv-${Date.now()}`, workOrder: order.id, customer: order.customer, status: "Draft", total: order.total }, ...invoices]);
    setWorkOrders(workOrders.map((item) => item.id === order.id ? { ...item, status: "Completed" } : item));
  }

  async function downloadPdf() {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "pt", format: "letter" });
    const line = (label, value, y) => {
      doc.setFont("helvetica", "bold"); doc.text(label, 48, y);
      doc.setFont("helvetica", "normal"); doc.text(String(value || ""), 190, y);
    };
    doc.setFillColor(10, 31, 68); doc.rect(0, 0, 612, 98, "F");
    doc.setFillColor(245, 124, 32); doc.circle(58, 48, 24, "F");
    doc.setTextColor(255, 255, 255); doc.setFontSize(25); doc.setFont("helvetica", "bold"); doc.text("F", 50, 57);
    doc.setFontSize(18); doc.text("FORTEN", 96, 42);
    doc.setFontSize(10); doc.setFont("helvetica", "normal"); doc.text("Commercial Equipment Services", 96, 60);
    doc.text(lang === "ru" ? "Ремонт и обслуживание коммерческого кухонного оборудования" : "Commercial Kitchen Equipment Repair & Maintenance", 96, 76);
    doc.setTextColor(10, 31, 68); doc.setFontSize(18); doc.setFont("helvetica", "bold"); doc.text(lang === "ru" ? "СМЕТА НА РЕМОНТ" : "REPAIR ESTIMATE", 48, 132);
    doc.setFontSize(10); line(lang === "ru" ? "Номер" : "Quote number", estimate.number, 166);
    line(lang === "ru" ? "Дата" : "Date", estimate.date, 184);
    line(lang === "ru" ? "Клиент" : "Customer", estimate.customer, 210);
    line(lang === "ru" ? "Адрес" : "Location", estimate.location, 228);
    line(lang === "ru" ? "Оборудование" : "Equipment", estimate.equipment, 246);
    line(t.labels.finding, lang === "ru" ? estimate.findingRu : estimate.findingEn, 278);
    line(t.labels.repair, lang === "ru" ? estimate.repairRu : estimate.repairEn, 314);
    doc.setFont("helvetica", "bold"); doc.text(lang === "ru" ? "Цена" : "Price table", 48, 360);
    let y = 386;
    estimate.items.forEach((item, index) => {
      doc.setFont("helvetica", "normal");
      doc.text(`${index + 1}. ${lang === "ru" ? item.ru : item.en}`, 54, y);
      doc.text(`$${(item.qty * item.price).toFixed(2)}`, 500, y);
      y += 18;
    });
    y += 12;
    doc.setFont("helvetica", "bold"); doc.text(`${t.labels.subtotal}: $${totals.subtotal.toFixed(2)}`, 380, y); y += 18;
    doc.text(`${t.labels.tax}: $${totals.tax.toFixed(2)}`, 380, y); y += 18;
    doc.text(`${t.labels.discount}: $${estimate.discount.toFixed(2)}`, 380, y); y += 22;
    doc.setTextColor(245, 124, 32); doc.setFontSize(16); doc.text(`${t.labels.total}: $${totals.total.toFixed(2)}`, 380, y);
    doc.setTextColor(10, 31, 68); doc.setFontSize(10);
    doc.text(t.labels.warranty, 48, y + 42); doc.setFont("helvetica", "normal"); doc.text(lang === "ru" ? estimate.warrantyRu : estimate.warrantyEn, 48, y + 58, { maxWidth: 500 });
    doc.setFont("helvetica", "bold"); doc.text(t.labels.terms, 48, y + 100); doc.setFont("helvetica", "normal"); doc.text(lang === "ru" ? estimate.termsRu : estimate.termsEn, 48, y + 116, { maxWidth: 500 });
    doc.line(48, 724, 250, 724); doc.line(330, 724, 550, 724);
    doc.text(lang === "ru" ? "Имя клиента" : "Customer name", 48, 742); doc.text(lang === "ru" ? "Подпись / дата" : "Signature / date", 330, 742);
    doc.save(`${estimate.number}-forten-${lang}.pdf`);
  }

  return (
    <main className="crmShell">
      <aside className="sidebar">
        <a className="brand crmBrand" href="/"><span className="mark">F</span><span><strong>FORTEN</strong><small>{t.subtitle}</small></span></a>
        {nav.map((item) => <button className={tab === item.key ? "active" : ""} key={item.key} onClick={() => setTab(item.key)}>{iconFor(item.key)}{item.label}</button>)}
        <a className="collectorLink" href="/crm/lead-collector">{t.leadCollector}</a>
        <button onClick={() => setLang(lang === "en" ? "ru" : "en")}><Languages size={17} />{t.lang}</button>
      </aside>

      <section className="crmMain">
        <header className="crmHeader"><div><h1>{t.title}</h1><p>{t.subtitle}</p></div><a className="secondary" href="/">{t.website}</a></header>

        {tab === "Dashboard" && (
          <>
            <div className="kpiGrid">
              {t.kpis.map((label, index) => <article className="kpi" key={label}><span>{label}</span><strong>{kpis[index]}</strong><i style={{ width: `${45 + index * 13}%` }} /></article>)}
            </div>
            <div className="dashboardGrid">
              <section className="panel chartPanel">
                <div className="panelHeader"><h2>{t.pipeline}</h2><span className="statusPill">Live CRM</span></div>
                <div className="barChart">
                  {leadStatuses.slice(0, 6).map((status, index) => <span key={status} style={{ height: `${32 + index * 10}%` }}><b>{status}</b></span>)}
                </div>
              </section>
              <section className="panel activityPanel">
                <div className="panelHeader"><h2>{t.newLead}</h2><span className="statusPill">{leads.length}</span></div>
                <div className="leadList">{leads.slice(0, 3).map((lead) => <LeadCard key={lead.id} t={t} lead={lead} update={updateLead} />)}</div>
              </section>
            </div>
          </>
        )}

        {tab === "Leads" && (
          <div className="moduleGrid">
            <section className="panel">
              <h2>{t.newLead}</h2>
              <LeadFields t={t} lead={draftLead} setLead={(key, value) => setDraftLead({ ...draftLead, [key]: value })} />
              <button className="primary" onClick={addLead}><Plus size={17} />{t.saveLead}</button>
            </section>
            <section className="panel widePanel">
              <h2>{t.pipeline}</h2>
              <div className="leadList">{leads.map((lead) => <LeadCard key={lead.id} t={t} lead={lead} update={updateLead} />)}</div>
            </section>
          </div>
        )}

        {tab === "Customers" && <CustomerPanel t={t} customers={customers} setCustomers={setCustomers} />}
        {tab === "Equipment History" && <CustomerPanel t={t} customers={customers} setCustomers={setCustomers} historyOnly />}

        {tab === "Estimates" && (
          <section className="panel">
            <div className="panelHeader"><h2>{t.estimateBuilder}</h2><div className="buttonRow"><button className="secondary" onClick={downloadPdf}>{t.downloadPdf}</button><button className="secondary muted">{t.emailPdf}</button><button className="secondary muted" onClick={convertToWorkOrder}>{t.convertWorkOrder}</button></div></div>
            <div className="estimateTools">
              {estimateTemplates.map((template) => <button key={template.id} onClick={() => applyTemplate(template.id)}>{lang === "ru" ? template.ru : template.en}</button>)}
            </div>
            <EstimateForm t={t} lang={lang} estimate={estimate} setEstimate={setEstimate} totals={totals} />
            {estimate.status !== "Approved" && <p className="hint">{t.approvedOnly}</p>}
          </section>
        )}

        {tab === "Work Orders" && <section className="panel"><h2>{t.workOrders}</h2><RecordList records={workOrders} action={convertToInvoice} actionLabel={t.convertInvoice} emptyText={t.noRecords} /></section>}
        {tab === "Invoices" && <section className="panel"><h2>{t.invoices}</h2><RecordList records={invoices} emptyText={t.noRecords} /></section>}
        {tab === "Marketing" && <Placeholder title={t.marketing} text={t.placeholders.marketing} icon={<Megaphone />} />}
        {tab === "Settings" && <Placeholder title={t.settings} text={t.placeholders.settings} icon={<Settings />} />}
      </section>
    </main>
  );
}

function makeEstimate(template) {
  return {
    number: `EST-${Date.now().toString().slice(-6)}`,
    date: new Date().toISOString().slice(0, 10),
    status: "Estimate Sent",
    customer: "Demo Pizza Tampa",
    location: "Tampa, FL",
    equipment: template.equipment,
    findingEn: template.findingEn,
    findingRu: template.findingRu,
    repairEn: template.repairEn,
    repairRu: template.repairRu,
    scopeEn: "Flat-rate service includes diagnostic review, repair work, startup test, and service documentation.",
    scopeRu: "Фиксированная услуга включает проверку диагностики, ремонт, запуск и сервисную документацию.",
    warrantyEn: "90-day labor warranty. Manufacturer warranty applies to installed parts.",
    warrantyRu: "90 дней гарантии на работу. Гарантия производителя действует на установленные детали.",
    termsEn: "Customer approval is required before work begins. Hidden failures may require a revised estimate.",
    termsRu: "До начала работ требуется одобрение клиента. Скрытые неисправности могут потребовать обновления сметы.",
    taxRate: 0,
    discount: 0,
    items: template.items.map(([en, ru, qty, price]) => ({ en, ru, qty, price }))
  };
}

function calculate(estimate) {
  const subtotal = estimate.items.reduce((sum, item) => sum + Number(item.qty) * Number(item.price), 0);
  const tax = subtotal * Number(estimate.taxRate || 0) / 100;
  const total = subtotal + tax - Number(estimate.discount || 0);
  return { subtotal, tax, total };
}

function iconFor(key) {
  const icons = { Dashboard: <BarChart3 />, Leads: <ClipboardList />, Customers: <Users />, Estimates: <FileText />, "Work Orders": <Wrench />, Invoices: <Receipt />, "Equipment History": <Wrench />, Marketing: <Megaphone />, Settings: <Settings /> };
  return icons[key];
}

function LeadFields({ t, lead, setLead }) {
  return <div className="fieldGrid">{["businessName", "contact", "phone", "email", "address", "urgency", "issue", "notes"].map((key) => <Field key={key} label={t.labels[key]} value={lead[key]} onChange={(v) => setLead(key, v)} />)}<Select label={t.labels.businessType} value={lead.businessType} options={businessTypes} onChange={(v) => setLead("businessType", v)} /><Select label={t.labels.equipment} value={lead.equipment} options={equipmentTypes} onChange={(v) => setLead("equipment", v)} /><Select label={t.labels.source} value={lead.source} options={leadSources} onChange={(v) => setLead("source", v)} /><Select label={t.labels.status} value={lead.status} options={leadStatuses} onChange={(v) => setLead("status", v)} /></div>;
}

function LeadCard({ t, lead, update }) {
  return <article className="leadCard"><div><strong>{lead.businessName}</strong><span>{lead.contact} | {lead.phone}</span><p>{lead.issue}</p></div><Select label={t.labels.status} value={lead.status} options={leadStatuses} onChange={(v) => update(lead.id, "status", v)} /><Field label={t.labels.notes} value={lead.notes} onChange={(v) => update(lead.id, "notes", v)} /></article>;
}

function CustomerPanel({ t, customers, setCustomers, historyOnly = false }) {
  function updateEquipment(customerId, equipmentId, key, value) {
    setCustomers(customers.map((customer) => customer.id !== customerId ? customer : { ...customer, equipment: customer.equipment.map((item) => item.id === equipmentId ? { ...item, [key]: value } : item) }));
  }
  return <section className="panel"><h2>{historyOnly ? t.equipmentHistory : t.customerCard}</h2>{customers.map((customer) => <article className="customerCard" key={customer.id}><div><h3>{customer.businessName}</h3><p>{customer.contact} | {customer.phone} | {customer.email}</p><p>{customer.address}</p></div>{customer.equipment.map((item) => <div className="equipmentBox" key={item.id}><div className="fieldGrid"><Field label={t.labels.type} value={item.type} onChange={(v) => updateEquipment(customer.id, item.id, "type", v)} /><Field label={t.labels.manufacturer} value={item.manufacturer} onChange={(v) => updateEquipment(customer.id, item.id, "manufacturer", v)} /><Field label={t.labels.model} value={item.model} onChange={(v) => updateEquipment(customer.id, item.id, "model", v)} /><Field label={t.labels.serial} value={item.serial} onChange={(v) => updateEquipment(customer.id, item.id, "serial", v)} /><Field label={t.labels.photos} value={item.photos} onChange={(v) => updateEquipment(customer.id, item.id, "photos", v)} /></div><h4>{t.equipmentHistory}</h4>{item.history.map((history) => <div className="historyRow" key={history.date}><b>{history.date}</b><span>{history.diagnostic}</span><span>{history.repair}</span><span>{history.parts}</span><strong>${history.total}</strong><small>{t.labels.nextService}: {history.nextService}</small></div>)}</div>)}</article>)}</section>;
}

function EstimateForm({ t, lang, estimate, setEstimate, totals }) {
  const patch = (key, value) => setEstimate({ ...estimate, [key]: value });
  const updateItem = (index, key, value) => setEstimate({ ...estimate, items: estimate.items.map((item, i) => i === index ? { ...item, [key]: value } : item) });
  return <div><div className="fieldGrid"><Field label={t.quoteNo} value={estimate.number} onChange={(v) => patch("number", v)} /><Field label={t.date} type="date" value={estimate.date} onChange={(v) => patch("date", v)} /><Select label={t.labels.status} value={estimate.status} options={leadStatuses} onChange={(v) => patch("status", v)} /><Field label={t.labels.businessName} value={estimate.customer} onChange={(v) => patch("customer", v)} /><Field label={t.labels.address} value={estimate.location} onChange={(v) => patch("location", v)} /><Field label={t.labels.equipment} value={estimate.equipment} onChange={(v) => patch("equipment", v)} /></div><label>{t.labels.finding}</label><textarea value={lang === "ru" ? estimate.findingRu : estimate.findingEn} onChange={(e) => patch(lang === "ru" ? "findingRu" : "findingEn", e.target.value)} /><label>{t.labels.repair}</label><textarea value={lang === "ru" ? estimate.repairRu : estimate.repairEn} onChange={(e) => patch(lang === "ru" ? "repairRu" : "repairEn", e.target.value)} /><label>{t.labels.scope}</label><textarea value={lang === "ru" ? estimate.scopeRu : estimate.scopeEn} onChange={(e) => patch(lang === "ru" ? "scopeRu" : "scopeEn", e.target.value)} /><div className="priceRows">{estimate.items.map((item, i) => <div className="priceRow" key={i}><input value={lang === "ru" ? item.ru : item.en} onChange={(e) => updateItem(i, lang === "ru" ? "ru" : "en", e.target.value)} /><input type="number" value={item.qty} onChange={(e) => updateItem(i, "qty", Number(e.target.value))} /><input type="number" value={item.price} onChange={(e) => updateItem(i, "price", Number(e.target.value))} /><b>${(item.qty * item.price).toFixed(2)}</b></div>)}</div><div className="totals"><Field label={t.labels.tax} type="number" value={estimate.taxRate} onChange={(v) => patch("taxRate", Number(v))} /><Field label={t.labels.discount} type="number" value={estimate.discount} onChange={(v) => patch("discount", Number(v))} /><strong>{t.labels.subtotal}: ${totals.subtotal.toFixed(2)}</strong><strong>{t.labels.total}: ${totals.total.toFixed(2)}</strong></div><label>{t.labels.warranty}</label><textarea value={lang === "ru" ? estimate.warrantyRu : estimate.warrantyEn} onChange={(e) => patch(lang === "ru" ? "warrantyRu" : "warrantyEn", e.target.value)} /><label>{t.labels.terms}</label><textarea value={lang === "ru" ? estimate.termsRu : estimate.termsEn} onChange={(e) => patch(lang === "ru" ? "termsRu" : "termsEn", e.target.value)} /></div>;
}

function RecordList({ records, action, actionLabel, emptyText }) {
  if (!records.length) return <p className="hint">{emptyText}</p>;
  return <div className="recordList">{records.map((record) => <article className="record" key={record.id}><strong>{record.id}</strong><span>{record.customer}</span><span>{record.status}</span><b>${record.total.toFixed(2)}</b>{action && <button className="secondary" onClick={() => action(record)}>{actionLabel}</button>}</article>)}</div>;
}

function Placeholder({ title, text, icon }) {
  return <section className="panel placeholder"><div>{icon}</div><h2>{title}</h2><p>{text}</p></section>;
}

function Field({ label, value, onChange, type = "text" }) {
  return <div><label>{label}</label><input type={type} value={value} onChange={(event) => onChange(event.target.value)} /></div>;
}

function Select({ label, value, options, onChange }) {
  return <div><label>{label}</label><select value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></div>;
}
