"use client";

import { useEffect, useMemo, useState } from "react";
import { BarChart3, ClipboardList, FileText, Languages, Megaphone, Receipt, Settings, ShieldCheck, Users, Wrench } from "lucide-react";
import { businessTypes, equipmentTypes, leadSources, leadStatuses, sampleLead } from "../data";

const workflow = ["Lead", "Dispatch", "Service Ticket", "Mentor Review", "Quote", "Customer Approval", "Invoice", "Repair", "Completed"];
const navKeys = ["Dashboard", "Leads", "Dispatch", "Tickets", "Mentor", "Quotes", "Invoices", "Marketing", "Lead Collector", "Customers", "Settings"];
const ticketStatuses = ["Lead", "Dispatch", "Service Ticket", "Mentor Review", "Quote", "Customer Approval", "Invoice", "Repair", "Completed"];
const invoiceStatuses = ["Unpaid", "Paid", "Partial"];

const ui = {
  en: {
    lang: "Русский",
    title: "Forten Admin",
    subtitle: "Commercial equipment repair workflow",
    website: "Website",
    nav: ["Dashboard", "Leads", "Dispatch", "Tickets", "Mentor", "Quotes", "Invoices", "Marketing", "Lead Collector", "Customers", "Settings"],
    kpis: ["Open leads", "Tickets in workflow", "Mentor reviews", "Invoice pipeline"],
    workflow,
    labels: {
      businessName: "Business Name", customer: "Customer", contact: "Contact", phone: "Phone", email: "Email", address: "Address", businessType: "Business Type",
      equipment: "Equipment Type", manufacturer: "Manufacturer", model: "Model", serial: "Serial Number", problem: "Problem Description",
      technician: "Technician", status: "Status", notes: "Notes", source: "Source", urgency: "Urgency",
      ticketNumber: "Ticket Number", diagnosticNotes: "Diagnostic Notes", temperatureReadings: "Temperature Readings",
      pressureReadings: "Pressure Readings", voltageReadings: "Voltage Readings", photos: "Uploaded Photos", videos: "Uploaded Videos",
      additionalNotes: "Additional Notes", rootCause: "Root Cause", recommendedRepair: "Recommended Repair", partsRequired: "Parts Required",
      materialsRequired: "Materials Required", warrantyRecommendation: "Warranty Recommendation", mentorNotes: "Mentor Notes",
      quoteNumber: "Quote Number", scope: "Scope of Work", parts: "Parts", materials: "Materials", warranty: "Warranty", terms: "Terms",
      diagnostic: "Diagnostic Findings", discount: "Discount", tax: "Tax", subtotal: "Subtotal", total: "Total",
      invoiceNumber: "Invoice Number", completedWork: "Completed Work"
    },
    actions: {
      saveLead: "Save Lead", dispatch: "Move to Dispatch", createTicket: "Create Ticket", saveTicket: "Save Ticket",
      sendMentor: "Send To Mentor", generateQuote: "Generate Quote", approveRepair: "Approve Repair Plan",
      approveQuote: "Customer Approved", generateInvoice: "Generate Invoice", generatePdf: "Generate PDF", markPaid: "Mark Paid",
      save: "Save", noRecords: "No records yet."
    },
    headings: {
      leads: "Leads", dispatch: "Dispatch Board", tickets: "Service Ticket", mentor: "Mentor Review",
      quotes: "Quote Generator", invoices: "Invoices", customers: "Customers", marketing: "Marketing", settings: "Settings"
    },
    placeholders: {
      marketing: "Preventive maintenance campaigns, lost lead follow-ups, VIP customer outreach, and seasonal equipment reminders.",
      settings: "Company profile, ADMIN_PASSWORD, Telegram status, tax defaults, quote terms, and user preferences."
    }
  },
  ru: {
    lang: "English",
    title: "Админ-панель Forten",
    subtitle: "Рабочий процесс ремонта коммерческого оборудования",
    website: "Сайт",
    nav: ["Панель", "Лиды", "Диспетчер", "Тикеты", "Ментор", "Сметы", "Счета", "Маркетинг", "Сбор лидов", "Клиенты", "Настройки"],
    kpis: ["Открытые лиды", "Тикеты в работе", "Проверки ментора", "Счета в работе"],
    workflow: ["Лид", "Диспетчер", "Сервисный тикет", "Проверка ментора", "Смета", "Одобрение клиента", "Счет", "Ремонт", "Завершено"],
    labels: {
      businessName: "Название бизнеса", customer: "Клиент", contact: "Контакт", phone: "Телефон", email: "Email", address: "Адрес", businessType: "Тип бизнеса",
      equipment: "Тип оборудования", manufacturer: "Производитель", model: "Модель", serial: "Серийный номер", problem: "Описание проблемы",
      technician: "Техник", status: "Статус", notes: "Заметки", source: "Источник", urgency: "Срочность",
      ticketNumber: "Номер тикета", diagnosticNotes: "Заметки диагностики", temperatureReadings: "Температурные показания",
      pressureReadings: "Показания давления", voltageReadings: "Показания напряжения", photos: "Загруженные фото", videos: "Загруженные видео",
      additionalNotes: "Дополнительные заметки", rootCause: "Причина неисправности", recommendedRepair: "Рекомендованный ремонт", partsRequired: "Нужные запчасти",
      materialsRequired: "Нужные материалы", warrantyRecommendation: "Рекомендация по гарантии", mentorNotes: "Заметки ментора",
      quoteNumber: "Номер сметы", scope: "Объем работ", parts: "Запчасти", materials: "Материалы", warranty: "Гарантия", terms: "Условия",
      diagnostic: "Результаты диагностики", discount: "Скидка", tax: "Налог", subtotal: "Сумма", total: "Итого",
      invoiceNumber: "Номер счета", completedWork: "Выполненные работы"
    },
    actions: {
      saveLead: "Сохранить лид", dispatch: "Передать диспетчеру", createTicket: "Создать тикет", saveTicket: "Сохранить тикет",
      sendMentor: "Отправить ментору", generateQuote: "Создать смету", approveRepair: "Одобрить план ремонта",
      approveQuote: "Клиент одобрил", generateInvoice: "Создать счет", generatePdf: "Создать PDF", markPaid: "Отметить оплаченным",
      save: "Сохранить", noRecords: "Пока нет записей."
    },
    headings: {
      leads: "Лиды", dispatch: "Диспетчерская доска", tickets: "Сервисный тикет", mentor: "Проверка ментора",
      quotes: "Генератор смет", invoices: "Счета", customers: "Клиенты", marketing: "Маркетинг", settings: "Настройки"
    },
    placeholders: {
      marketing: "Кампании профилактического обслуживания, возврат потерянных лидов, предложения VIP-клиентам и сезонные напоминания.",
      settings: "Профиль компании, ADMIN_PASSWORD, статус Telegram, налог по умолчанию, условия смет и настройки пользователя."
    }
  }
};

const optionLabels = {
  en: {
    business: Object.fromEntries(businessTypes.map((item) => [item, item])),
    equipment: Object.fromEntries(equipmentTypes.map((item) => [item, item])),
    source: Object.fromEntries(leadSources.map((item) => [item, item])),
    leadStatus: Object.fromEntries(leadStatuses.map((item) => [item, item])),
    ticketStatus: Object.fromEntries(ticketStatuses.map((item) => [item, item])),
    invoiceStatus: Object.fromEntries(invoiceStatuses.map((item) => [item, item]))
  },
  ru: {
    business: { Restaurant: "Ресторан", Cafe: "Кафе", Bakery: "Пекарня", Bar: "Бар", "Food truck": "Фудтрак", Farm: "Ферма", Hotel: "Отель", "Grocery store": "Продуктовый магазин", "Commercial kitchen": "Коммерческая кухня" },
    equipment: { "Refrigeration equipment": "Холодильное оборудование", "Cooking equipment": "Тепловое оборудование", "Food preparation": "Подготовка продуктов", Warewashing: "Моечное оборудование", "Beverage equipment": "Оборудование для напитков", "Preventive maintenance": "Профилактическое обслуживание" },
    source: { Website: "Сайт", "Google Places": "Google Places", Referral: "Рекомендация", "Phone Call": "Звонок", Facebook: "Facebook", Manual: "Вручную" },
    leadStatus: { "New Lead": "Новый лид", Contacted: "Контакт установлен", "Diagnostic Scheduled": "Диагностика назначена", "Estimate Sent": "Смета отправлена", Approved: "Одобрено", Scheduled: "Запланировано", "In Progress": "В работе", Completed: "Завершено", Customer: "Клиент", "VIP Customer": "VIP клиент", Lost: "Потерян" },
    ticketStatus: Object.fromEntries(ticketStatuses.map((item, index) => [item, ui.ru.workflow[index]])),
    invoiceStatus: { Unpaid: "Не оплачен", Paid: "Оплачен", Partial: "Частично" }
  }
};

const blankLead = { businessName: "", contact: "", phone: "", email: "", address: "", businessType: "Restaurant", equipment: "Refrigeration equipment", urgency: "Same day", issue: "", notes: "", source: "Manual", status: "New Lead" };
const blankTicket = { ticketNumber: "TKT-1001", customer: "", businessName: "", address: "", equipment: "Refrigeration equipment", manufacturer: "", model: "", serial: "", problem: "", technician: "", status: "Service Ticket", diagnosticNotes: "", temperatureReadings: "", pressureReadings: "", voltageReadings: "", photos: "", videos: "", additionalNotes: "" };
const blankReview = { ticketNumber: "", rootCause: "", recommendedRepair: "", partsRequired: "", materialsRequired: "", warrantyRecommendation: "", mentorNotes: "", approved: false };

export default function AdminApp({ initialTab = "Dashboard" }) {
  const [lang, setLang] = useState("en");
  const [tab, setTab] = useState(initialTab);
  const [authorized, setAuthorized] = useState(null);
  const [leads, setLeads] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [leadDraft, setLeadDraft] = useState(blankLead);
  const [ticketDraft, setTicketDraft] = useState(blankTicket);
  const [reviewDraft, setReviewDraft] = useState(blankReview);
  const t = ui[lang];
  const nav = navKeys.map((key, index) => ({ key, label: t.nav[index] }));

  useEffect(() => {
    if (localStorage.getItem("fortenAdminSession") === "active") setAuthorized(true);
    else {
      setAuthorized(false);
      window.location.href = "/admin/login";
    }
  }, []);

  useEffect(() => {
    if (!authorized) return;
    setLeads(JSON.parse(localStorage.getItem("fortenLeads") || "[]").concat([]).length ? JSON.parse(localStorage.getItem("fortenLeads") || "[]") : [sampleLead]);
    setTickets(JSON.parse(localStorage.getItem("fortenTickets") || "[]"));
    setReviews(JSON.parse(localStorage.getItem("fortenMentorReviews") || "[]"));
    setQuotes(JSON.parse(localStorage.getItem("fortenQuotes") || "[]"));
    setInvoices(JSON.parse(localStorage.getItem("fortenInvoices") || "[]"));
    setCustomers(JSON.parse(localStorage.getItem("fortenCustomers") || "[]"));
  }, [authorized]);

  useEffect(() => { if (authorized && leads.length) localStorage.setItem("fortenLeads", JSON.stringify(leads)); }, [authorized, leads]);
  useEffect(() => { if (authorized) localStorage.setItem("fortenTickets", JSON.stringify(tickets)); }, [authorized, tickets]);
  useEffect(() => { if (authorized) localStorage.setItem("fortenMentorReviews", JSON.stringify(reviews)); }, [authorized, reviews]);
  useEffect(() => { if (authorized) localStorage.setItem("fortenQuotes", JSON.stringify(quotes)); }, [authorized, quotes]);
  useEffect(() => { if (authorized) localStorage.setItem("fortenInvoices", JSON.stringify(invoices)); }, [authorized, invoices]);
  useEffect(() => { if (authorized) localStorage.setItem("fortenCustomers", JSON.stringify(customers)); }, [authorized, customers]);

  const invoicePipeline = invoices.reduce((sum, item) => sum + Number(item.total || 0), 0);
  const kpis = [leads.filter((lead) => lead.status !== "Lost").length, tickets.length, reviews.filter((item) => !item.approved).length, `$${invoicePipeline.toFixed(0)}`];

  function addLead() {
    const lead = { ...leadDraft, id: `lead-${Date.now()}`, createdAt: new Date().toISOString().slice(0, 10) };
    setLeads([lead, ...leads]);
    setLeadDraft(blankLead);
  }

  function updateLead(id, key, value) {
    setLeads(leads.map((lead) => lead.id === id ? { ...lead, [key]: value } : lead));
  }

  function moveLeadToDispatch(lead) {
    updateLead(lead.id, "status", "Contacted");
    const ticket = ticketFromLead(lead, "Dispatch");
    setTickets([ticket, ...tickets]);
    setTab("Dispatch");
  }

  function saveTicket() {
    const next = tickets.some((ticket) => ticket.ticketNumber === ticketDraft.ticketNumber)
      ? tickets.map((ticket) => ticket.ticketNumber === ticketDraft.ticketNumber ? ticketDraft : ticket)
      : [{ ...ticketDraft }, ...tickets];
    setTickets(next);
  }

  function sendToMentor(ticket = ticketDraft) {
    const nextTicket = { ...ticket, status: "Mentor Review" };
    setTickets(upsertBy(tickets, nextTicket, "ticketNumber"));
    if (!reviews.some((review) => review.ticketNumber === ticket.ticketNumber)) {
      setReviews([{ ...blankReview, ticketNumber: ticket.ticketNumber, mentorNotes: ticket.diagnosticNotes }, ...reviews]);
    }
    setTicketDraft(nextTicket);
    setReviewDraft({ ...blankReview, ticketNumber: ticket.ticketNumber, mentorNotes: ticket.diagnosticNotes });
    setTab("Mentor");
  }

  function approveRepairPlan() {
    const review = { ...reviewDraft, approved: true };
    setReviews(upsertBy(reviews, review, "ticketNumber"));
    setTickets(tickets.map((ticket) => ticket.ticketNumber === review.ticketNumber ? { ...ticket, status: "Quote" } : ticket));
  }

  function generateQuote(ticket = ticketDraft) {
    const review = reviews.find((item) => item.ticketNumber === ticket.ticketNumber) || reviewDraft;
    const quote = quoteFrom(ticket, review);
    setQuotes(upsertBy(quotes, quote, "quoteNumber"));
    setTickets(tickets.map((item) => item.ticketNumber === ticket.ticketNumber ? { ...item, status: "Quote" } : item));
    setTab("Quotes");
  }

  function approveQuote(quote) {
    setQuotes(quotes.map((item) => item.quoteNumber === quote.quoteNumber ? { ...item, status: "Customer Approval" } : item));
  }

  function generateInvoice(quote) {
    const invoice = invoiceFromQuote(quote);
    setInvoices(upsertBy(invoices, invoice, "invoiceNumber"));
    setQuotes(quotes.map((item) => item.quoteNumber === quote.quoteNumber ? { ...item, status: "Invoice" } : item));
    setTickets(tickets.map((ticket) => ticket.ticketNumber === quote.ticketNumber ? { ...ticket, status: "Invoice" } : ticket));
    setTab("Invoices");
  }

  function markPaid(invoice) {
    setInvoices(invoices.map((item) => item.invoiceNumber === invoice.invoiceNumber ? { ...item, status: "Paid" } : item));
    setTickets(tickets.map((ticket) => ticket.ticketNumber === invoice.ticketNumber ? { ...ticket, status: "Repair" } : ticket));
  }

  async function generatePdf(title, rows) {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "pt", format: "letter" });
    doc.setFillColor(10, 31, 68); doc.rect(0, 0, 612, 92, "F");
    doc.setFillColor(245, 124, 32); doc.circle(58, 46, 23, "F");
    doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(24); doc.text("F", 50, 55);
    doc.setFontSize(18); doc.text("FORTEN", 94, 40);
    doc.setFontSize(10); doc.setFont("helvetica", "normal"); doc.text("Commercial Equipment Services", 94, 58);
    doc.setTextColor(10, 31, 68); doc.setFont("helvetica", "bold"); doc.setFontSize(18); doc.text(title, 48, 132);
    let y = 168;
    rows.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold"); doc.text(label, 48, y);
      doc.setFont("helvetica", "normal"); doc.text(doc.splitTextToSize(String(value || "-"), 350), 210, y);
      y += 26;
    });
    doc.save(`${title.replaceAll(" ", "-")}.pdf`);
  }

  if (!authorized) {
    return <main className="adminGate"><section className="panel"><span className="mark">F</span><h1>Forten Admin</h1><p>Checking private access...</p></section></main>;
  }

  return (
    <main className="crmShell">
      <aside className="sidebar">
        <a className="brand crmBrand" href="/"><span className="mark">F</span><span><strong>FORTEN</strong><small>{t.subtitle}</small></span></a>
        {nav.map((item) => item.key === "Lead Collector"
          ? <a className="collectorLink" href="/admin/lead-collector" key={item.key}>{iconFor(item.key)}{item.label}</a>
          : <button className={tab === item.key ? "active" : ""} key={item.key} onClick={() => setTab(item.key)}>{iconFor(item.key)}{item.label}</button>)}
        <button onClick={() => setLang(lang === "en" ? "ru" : "en")}><Languages size={17} />{t.lang}</button>
      </aside>
      <section className="crmMain">
        <header className="crmHeader"><div><h1>{t.title}</h1><p>{t.subtitle}</p></div><a className="secondary" href="/">{t.website}</a></header>
        {tab === "Dashboard" && <Dashboard t={t} kpis={kpis} tickets={tickets} />}
        {tab === "Leads" && <LeadsPanel t={t} lang={lang} leads={leads} draft={leadDraft} setDraft={setLeadDraft} addLead={addLead} updateLead={updateLead} moveLeadToDispatch={moveLeadToDispatch} />}
        {tab === "Dispatch" && <DispatchPanel t={t} tickets={tickets} setTicketDraft={setTicketDraft} setTab={setTab} />}
        {tab === "Tickets" && <TicketPanel t={t} lang={lang} ticket={ticketDraft} setTicket={setTicketDraft} saveTicket={saveTicket} sendToMentor={sendToMentor} generateQuote={generateQuote} />}
        {tab === "Mentor" && <MentorPanel t={t} reviews={reviews} review={reviewDraft} setReview={setReviewDraft} tickets={tickets} approveRepairPlan={approveRepairPlan} />}
        {tab === "Quotes" && <QuotesPanel t={t} quotes={quotes} approveQuote={approveQuote} generateInvoice={generateInvoice} generatePdf={generatePdf} />}
        {tab === "Invoices" && <InvoicesPanel t={t} lang={lang} invoices={invoices} setInvoices={setInvoices} markPaid={markPaid} generatePdf={generatePdf} />}
        {tab === "Customers" && <CustomersPanel t={t} customers={customers} />}
        {tab === "Marketing" && <Placeholder title={t.headings.marketing} text={t.placeholders.marketing} icon={<Megaphone />} />}
        {tab === "Settings" && <Placeholder title={t.headings.settings} text={t.placeholders.settings} icon={<Settings />} />}
      </section>
    </main>
  );
}

function Dashboard({ t, kpis, tickets }) {
  return <><div className="kpiGrid">{t.kpis.map((label, index) => <article className="kpi" key={label}><span>{label}</span><strong>{kpis[index]}</strong><i style={{ width: `${48 + index * 12}%` }} /></article>)}</div><section className="panel chartPanel"><div className="panelHeader"><h2>{t.headings.dispatch}</h2><span className="statusPill">Workflow</span></div><div className="barChart">{t.workflow.map((step, index) => <span key={step} style={{ height: `${28 + ((index % 5) * 12)}%` }}><b>{step}</b></span>)}</div><div className="recordList">{tickets.slice(0, 4).map((ticket) => <Record key={ticket.ticketNumber} cells={[ticket.ticketNumber, ticket.businessName, ticket.technician, ticket.status]} />)}</div></section></>;
}

function LeadsPanel({ t, lang, leads, draft, setDraft, addLead, updateLead, moveLeadToDispatch }) {
  return <div className="moduleGrid"><section className="panel"><h2>{t.headings.leads}</h2><LeadFields t={t} lang={lang} lead={draft} setLead={(key, value) => setDraft({ ...draft, [key]: value })} /><button className="primary" onClick={addLead}>{t.actions.saveLead}</button></section><section className="panel widePanel"><h2>{t.actions.dispatch}</h2><div className="leadList">{leads.map((lead) => <article className="leadCard" key={lead.id}><div><strong>{lead.businessName}</strong><span>{lead.contact} | {lead.phone}</span><p>{lead.issue}</p></div><Select label={t.labels.status} value={lead.status} options={leadStatuses} labels={optionLabels[lang].leadStatus} onChange={(v) => updateLead(lead.id, "status", v)} /><button className="secondary" onClick={() => moveLeadToDispatch(lead)}>{t.actions.dispatch}</button></article>)}</div></section></div>;
}

function LeadFields({ t, lang, lead, setLead }) {
  return <div className="fieldGrid"><Field label={t.labels.businessName} value={lead.businessName} onChange={(v) => setLead("businessName", v)} /><Field label={t.labels.contact} value={lead.contact} onChange={(v) => setLead("contact", v)} /><Field label={t.labels.phone} value={lead.phone} onChange={(v) => setLead("phone", v)} /><Field label={t.labels.email} value={lead.email} onChange={(v) => setLead("email", v)} /><Field label={t.labels.address} value={lead.address} onChange={(v) => setLead("address", v)} /><Select label={t.labels.businessType} value={lead.businessType} options={businessTypes} labels={optionLabels[lang].business} onChange={(v) => setLead("businessType", v)} /><Select label={t.labels.equipment} value={lead.equipment} options={equipmentTypes} labels={optionLabels[lang].equipment} onChange={(v) => setLead("equipment", v)} /><Field label={t.labels.urgency} value={lead.urgency} onChange={(v) => setLead("urgency", v)} /><Select label={t.labels.source} value={lead.source} options={leadSources} labels={optionLabels[lang].source} onChange={(v) => setLead("source", v)} /><div className="full"><label>{t.labels.problem}</label><textarea value={lead.issue} onChange={(e) => setLead("issue", e.target.value)} /></div><div className="full"><label>{t.labels.notes}</label><textarea value={lead.notes} onChange={(e) => setLead("notes", e.target.value)} /></div></div>;
}

function DispatchPanel({ t, tickets, setTicketDraft, setTab }) {
  const dispatchTickets = tickets.filter((ticket) => ticket.status === "Dispatch");
  return <section className="panel"><h2>{t.headings.dispatch}</h2><div className="recordList">{dispatchTickets.length ? dispatchTickets.map((ticket) => <article className="record" key={ticket.ticketNumber}><ClipboardList size={18} /><span>{ticket.ticketNumber}</span><span>{ticket.businessName}</span><span>{ticket.problem}</span><button className="secondary" onClick={() => { setTicketDraft(ticket); setTab("Tickets"); }}>{t.actions.createTicket}</button></article>) : <p className="hint">{t.actions.noRecords}</p>}</div></section>;
}

function TicketPanel({ t, lang, ticket, setTicket, saveTicket, sendToMentor, generateQuote }) {
  const set = (key, value) => setTicket({ ...ticket, [key]: value });
  return <section className="panel"><div className="panelHeader"><h2>{t.headings.tickets}</h2><div className="buttonRow"><button className="secondary" onClick={saveTicket}>{t.actions.saveTicket}</button><button className="secondary" onClick={() => sendToMentor(ticket)}>{t.actions.sendMentor}</button><button className="primary" onClick={() => generateQuote(ticket)}>{t.actions.generateQuote}</button></div></div><div className="fieldGrid"><Field label={t.labels.ticketNumber} value={ticket.ticketNumber} onChange={(v) => set("ticketNumber", v)} /><Field label={t.labels.customer} value={ticket.customer} onChange={(v) => set("customer", v)} /><Field label={t.labels.businessName} value={ticket.businessName} onChange={(v) => set("businessName", v)} /><Field label={t.labels.address} value={ticket.address} onChange={(v) => set("address", v)} /><Select label={t.labels.equipment} value={ticket.equipment} options={equipmentTypes} labels={optionLabels[lang].equipment} onChange={(v) => set("equipment", v)} /><Field label={t.labels.manufacturer} value={ticket.manufacturer} onChange={(v) => set("manufacturer", v)} /><Field label={t.labels.model} value={ticket.model} onChange={(v) => set("model", v)} /><Field label={t.labels.serial} value={ticket.serial} onChange={(v) => set("serial", v)} /><Field label={t.labels.technician} value={ticket.technician} onChange={(v) => set("technician", v)} /><Select label={t.labels.status} value={ticket.status} options={ticketStatuses} labels={optionLabels[lang].ticketStatus} onChange={(v) => set("status", v)} /><div className="full"><label>{t.labels.problem}</label><textarea value={ticket.problem} onChange={(e) => set("problem", e.target.value)} /></div><div className="full"><h3>{lang === "ru" ? "Раздел техника" : "Technician Section"}</h3></div><Field label={t.labels.temperatureReadings} value={ticket.temperatureReadings} onChange={(v) => set("temperatureReadings", v)} /><Field label={t.labels.pressureReadings} value={ticket.pressureReadings} onChange={(v) => set("pressureReadings", v)} /><Field label={t.labels.voltageReadings} value={ticket.voltageReadings} onChange={(v) => set("voltageReadings", v)} /><Field label={t.labels.photos} value={ticket.photos} onChange={(v) => set("photos", v)} /><Field label={t.labels.videos} value={ticket.videos} onChange={(v) => set("videos", v)} /><div className="full"><label>{t.labels.diagnosticNotes}</label><textarea value={ticket.diagnosticNotes} onChange={(e) => set("diagnosticNotes", e.target.value)} /></div><div className="full"><label>{t.labels.additionalNotes}</label><textarea value={ticket.additionalNotes} onChange={(e) => set("additionalNotes", e.target.value)} /></div></div></section>;
}

function MentorPanel({ t, reviews, review, setReview, tickets, approveRepairPlan }) {
  const set = (key, value) => setReview({ ...review, [key]: value });
  const ticket = tickets.find((item) => item.ticketNumber === review.ticketNumber) || tickets.find((item) => item.status === "Mentor Review") || {};
  return <section className="panel"><div className="panelHeader"><h2>{t.headings.mentor}</h2><button className="primary" onClick={approveRepairPlan}>{t.actions.approveRepair}</button></div><div className="fieldGrid"><Select label={t.labels.ticketNumber} value={review.ticketNumber} options={tickets.map((item) => item.ticketNumber)} onChange={(v) => setReview(reviews.find((item) => item.ticketNumber === v) || { ...blankReview, ticketNumber: v })} /><Field label={t.labels.photos} value={ticket.photos || ""} onChange={() => {}} /><Field label={t.labels.videos} value={ticket.videos || ""} onChange={() => {}} /><div className="full"><label>{t.labels.diagnosticNotes}</label><textarea value={ticket.diagnosticNotes || ""} readOnly /></div><Field label={t.labels.rootCause} value={review.rootCause} onChange={(v) => set("rootCause", v)} /><Field label={t.labels.recommendedRepair} value={review.recommendedRepair} onChange={(v) => set("recommendedRepair", v)} /><Field label={t.labels.partsRequired} value={review.partsRequired} onChange={(v) => set("partsRequired", v)} /><Field label={t.labels.materialsRequired} value={review.materialsRequired} onChange={(v) => set("materialsRequired", v)} /><Field label={t.labels.warrantyRecommendation} value={review.warrantyRecommendation} onChange={(v) => set("warrantyRecommendation", v)} /><div className="full"><label>{t.labels.mentorNotes}</label><textarea value={review.mentorNotes} onChange={(e) => set("mentorNotes", e.target.value)} /></div></div></section>;
}

function QuotesPanel({ t, quotes, approveQuote, generateInvoice, generatePdf }) {
  return <section className="panel"><h2>{t.headings.quotes}</h2><div className="recordList">{quotes.length ? quotes.map((quote) => <article className="customerCard" key={quote.quoteNumber}><div className="panelHeader"><h3>{quote.quoteNumber}</h3><span className="statusPill">{quote.status}</span></div><div className="fieldGrid"><Read label={t.labels.customer} value={quote.customer} /><Read label={t.labels.equipment} value={quote.equipment} /><Read label={t.labels.diagnostic} value={quote.diagnosticFindings} /><Read label={t.labels.recommendedRepair} value={quote.recommendedRepair} /><Read label={t.labels.scope} value={quote.scope} /><Read label={t.labels.parts} value={quote.parts} /><Read label={t.labels.materials} value={quote.materials} /><Read label={t.labels.warranty} value={quote.warranty} /><Read label={t.labels.terms} value={quote.terms} /><Read label={t.labels.total} value={`$${quote.total.toFixed(2)}`} /></div><div className="buttonRow"><button className="secondary" onClick={() => approveQuote(quote)}>{t.actions.approveQuote}</button><button className="secondary" onClick={() => generateInvoice(quote)}>{t.actions.generateInvoice}</button><button className="primary" onClick={() => generatePdf(quote.quoteNumber, quoteRows(t, quote))}>{t.actions.generatePdf}</button></div></article>) : <p className="hint">{t.actions.noRecords}</p>}</div></section>;
}

function InvoicesPanel({ t, lang, invoices, setInvoices, markPaid, generatePdf }) {
  function patch(invoice, key, value) {
    setInvoices(invoices.map((item) => item.invoiceNumber === invoice.invoiceNumber ? { ...item, [key]: value } : item));
  }
  return <section className="panel"><h2>{t.headings.invoices}</h2><div className="recordList">{invoices.length ? invoices.map((invoice) => <article className="customerCard" key={invoice.invoiceNumber}><div className="panelHeader"><h3>{invoice.invoiceNumber}</h3><Select label={t.labels.status} value={invoice.status} options={invoiceStatuses} labels={optionLabels[lang].invoiceStatus} onChange={(v) => patch(invoice, "status", v)} /></div><div className="fieldGrid"><Read label={t.labels.customer} value={invoice.customer} /><Read label={t.labels.equipment} value={invoice.equipment} /><Field label={t.labels.completedWork} value={invoice.completedWork} onChange={(v) => patch(invoice, "completedWork", v)} /><Field label={t.labels.parts} value={invoice.parts} onChange={(v) => patch(invoice, "parts", v)} /><Field label={t.labels.materials} value={invoice.materials} onChange={(v) => patch(invoice, "materials", v)} /><Field label={t.labels.discount} type="number" value={invoice.discount} onChange={(v) => patch(invoice, "discount", Number(v))} /><Field label={t.labels.tax} type="number" value={invoice.tax} onChange={(v) => patch(invoice, "tax", Number(v))} /><Read label={t.labels.total} value={`$${invoice.total.toFixed(2)}`} /></div><div className="buttonRow"><button className="secondary" onClick={() => generatePdf(invoice.invoiceNumber, invoiceRows(t, invoice))}>{t.actions.generatePdf}</button><button className="primary" onClick={() => markPaid(invoice)}>{t.actions.markPaid}</button></div></article>) : <p className="hint">{t.actions.noRecords}</p>}</div></section>;
}

function CustomersPanel({ t, customers }) {
  return <section className="panel"><h2>{t.headings.customers}</h2>{customers.length ? customers.map((customer) => <article className="customerCard" key={customer.id || customer.businessName}><h3>{customer.businessName}</h3><p>{customer.contact} | {customer.phone} | {customer.email}</p><p>{customer.address}</p></article>) : <p className="hint">{t.actions.noRecords}</p>}</section>;
}

function Placeholder({ title, text, icon }) {
  return <section className="panel placeholder"><div>{icon}</div><h2>{title}</h2><p>{text}</p></section>;
}

function Field({ label, value, onChange, type = "text" }) {
  return <div><label>{label}</label><input type={type} value={value || ""} onChange={(event) => onChange(event.target.value)} /></div>;
}

function Read({ label, value }) {
  return <div><label>{label}</label><div className="readBox">{value || "-"}</div></div>;
}

function Select({ label, value, options, labels, onChange }) {
  return <div><label>{label}</label><select value={value || ""} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option} value={option}>{labels?.[option] || option}</option>)}</select></div>;
}

function Record({ cells }) {
  return <article className="record"><ClipboardList size={18} />{cells.map((cell) => <span key={cell}>{cell || "-"}</span>)}</article>;
}

function iconFor(key) {
  const icons = { Dashboard: <BarChart3 />, Leads: <ClipboardList />, Dispatch: <ShieldCheck />, Tickets: <Wrench />, Mentor: <Users />, Quotes: <FileText />, Invoices: <Receipt />, Marketing: <Megaphone />, "Lead Collector": <ClipboardList />, Customers: <Users />, Settings: <Settings /> };
  return icons[key] || <ClipboardList />;
}

function ticketFromLead(lead, status) {
  return { ...blankTicket, ticketNumber: `TKT-${Date.now().toString().slice(-6)}`, customer: lead.contact, businessName: lead.businessName, address: lead.address, equipment: lead.equipment, problem: lead.issue, status };
}

function quoteFrom(ticket, review) {
  const subtotal = 159 + 650;
  const tax = 0;
  return { quoteNumber: `Q-${Date.now().toString().slice(-6)}`, ticketNumber: ticket.ticketNumber, customer: ticket.customer || ticket.businessName, location: ticket.address, equipment: `${ticket.equipment} ${ticket.manufacturer} ${ticket.model}`.trim(), diagnosticFindings: ticket.diagnosticNotes || ticket.problem, recommendedRepair: review.recommendedRepair || ticket.problem, scope: "Diagnostic review, repair work, startup test, and documentation.", parts: review.partsRequired || "Parts to be confirmed", materials: review.materialsRequired || "Shop materials", warranty: review.warrantyRecommendation || "90-day labor warranty", terms: "Customer approval required before repair. Hidden failures may require revised quote.", items: [{ name: "Diagnostic", price: 159 }, { name: "Flat-rate repair", price: 650 }], subtotal, tax, discount: 0, total: subtotal + tax, status: "Quote" };
}

function invoiceFromQuote(quote) {
  return { invoiceNumber: `INV-${Date.now().toString().slice(-6)}`, quoteNumber: quote.quoteNumber, ticketNumber: quote.ticketNumber, customer: quote.customer, equipment: quote.equipment, completedWork: quote.scope, parts: quote.parts, materials: quote.materials, discount: quote.discount || 0, tax: quote.tax || 0, total: quote.total, status: "Unpaid" };
}

function upsertBy(list, record, key) {
  return list.some((item) => item[key] === record[key]) ? list.map((item) => item[key] === record[key] ? record : item) : [record, ...list];
}

function quoteRows(t, quote) {
  return [[t.labels.customer, quote.customer], [t.labels.equipment, quote.equipment], [t.labels.diagnostic, quote.diagnosticFindings], [t.labels.recommendedRepair, quote.recommendedRepair], [t.labels.scope, quote.scope], [t.labels.parts, quote.parts], [t.labels.materials, quote.materials], [t.labels.warranty, quote.warranty], [t.labels.terms, quote.terms], [t.labels.total, `$${quote.total.toFixed(2)}`]];
}

function invoiceRows(t, invoice) {
  return [[t.labels.invoiceNumber, invoice.invoiceNumber], [t.labels.customer, invoice.customer], [t.labels.equipment, invoice.equipment], [t.labels.completedWork, invoice.completedWork], [t.labels.parts, invoice.parts], [t.labels.materials, invoice.materials], [t.labels.total, `$${invoice.total.toFixed(2)}`], [t.labels.status, invoice.status]];
}
