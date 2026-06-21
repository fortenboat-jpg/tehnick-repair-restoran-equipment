"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Bot,
  Boxes,
  ClipboardList,
  FileText,
  Gauge,
  Languages,
  Map,
  Megaphone,
  Paperclip,
  Receipt,
  Settings,
  ShieldCheck,
  Smartphone,
  Truck,
  Users,
  Wrench
} from "lucide-react";
import {
  invoiceStatuses,
  paymentMethods,
  roles,
  sampleCustomers,
  sampleEquipment,
  sampleInventory,
  sampleInvoices,
  sampleKpi,
  sampleQuotes,
  sampleReports,
  sampleTickets,
  ticketStatuses
} from "./v2Data";

const sectionByTab = {
  Dashboard: "/admin",
  Tickets: "/admin/tickets",
  Dispatch: "/admin/dispatch",
  Technician: "/admin/technician",
  Mentor: "/admin/mentor",
  Quotes: "/admin/quotes",
  Invoices: "/admin/invoices",
  Customers: "/admin/customers",
  Equipment: "/admin/equipment",
  Inventory: "/admin/inventory",
  Reports: "/admin/reports",
  KPI: "/admin/kpi",
  AI: "/admin/ai",
  "Lead Collector": "/admin/lead-collector",
  Settings: "/admin/settings"
};

const navKeys = Object.keys(sectionByTab);

const text = {
  en: {
    lang: "Русский",
    title: "FORTEN SERVICE CRM V2",
    subtitle: "Field Service Management Platform",
    website: "Public Website",
    checking: "Checking private access...",
    nav: {
      Dashboard: "Dashboard",
      Tickets: "Tickets",
      Dispatch: "Dispatch",
      Technician: "Technician",
      Mentor: "Mentor Center",
      Quotes: "Quotes",
      Invoices: "Invoices",
      Customers: "Customer History",
      Equipment: "Equipment Database",
      Inventory: "Inventory",
      Reports: "Daily Reports",
      KPI: "KPI",
      AI: "AI Assistant",
      "Lead Collector": "Lead Collector",
      Settings: "Settings"
    },
    rolesTitle: "Roles",
    workflowTitle: "Service Workflow",
    statusTitle: "Ticket Status Pipeline",
    dashboardLead: "Website request creates a service ticket, dispatch assigns a technician, mentor reviews diagnostics, sales creates the quote, invoice follows approval, and repair closes the ticket.",
    kpis: ["Open Tickets", "Today's Diagnostics", "Pending Quotes", "Unpaid Invoices", "Revenue This Month", "Technician Performance"],
    labels: {
      status: "Status",
      customer: "Customer",
      business: "Business",
      address: "Address",
      equipment: "Equipment",
      technician: "Technician",
      mentor: "Mentor",
      photos: "Photos",
      videos: "Videos",
      model: "Model",
      serial: "Serial Number",
      manufacturer: "Manufacturer",
      diagnostic: "Diagnostic Notes",
      mentorDiagnosis: "Mentor Diagnosis",
      quoteTotal: "Quote Total",
      invoiceStatus: "Invoice Status",
      rootCause: "Root Cause",
      recommendedRepair: "Recommended Repair",
      parts: "Parts",
      materials: "Materials",
      warranty: "Warranty Recommendation",
      notes: "Notes",
      paymentMethod: "Payment Method",
      total: "Total",
      qty: "Qty",
      location: "Location",
      history: "History",
      date: "Date",
      mileage: "Mileage",
      expenses: "Expenses",
      signatures: "Signatures"
      ,
      timeline: "Timeline",
      attachments: "Attachments",
      documents: "Documents",
      installationDate: "Installation Date",
      warrantyStatus: "Warranty Status",
      previousQuotes: "Previous Quotes",
      previousInvoices: "Previous Invoices",
      balanceDue: "Balance Due",
      payments: "Payments",
      scope: "Scope Of Work",
      refrigerant: "Refrigerant",
      terms: "Terms & Conditions",
      signature: "Customer Signature"
    },
    actions: {
      assign: "Assign Technician",
      openTicket: "Open Ticket",
      save: "Save Ticket",
      mentor: "Request Mentor",
      quote: "Generate Quote",
      route: "Start Route",
      arrived: "Arrived",
      diagnostic: "Start Diagnostic",
      upload: "Upload Photos",
      repair: "Start Repair",
      finish: "Finish Repair",
      report: "Generate Report",
      approvePlan: "Approve Repair Plan",
      approve: "Approve",
      reject: "Reject",
      revision: "Request Revision",
      pdf: "Generate PDF",
      previewPdf: "Preview PDF",
      paid: "Mark Paid",
      collect: "Start Collection",
      noRecords: "No records yet"
    },
    modules: {
      tickets: "Ticket list and detail",
      dispatch: "Dispatch board",
      technician: "Technician mobile app view",
      mentor: "Mentor Center",
      quotes: "Quotes",
      invoices: "Invoices",
      customers: "Customer History",
      equipment: "Equipment Database",
      inventory: "Inventory",
      reports: "Daily Reports",
      kpi: "KPI",
      ai: "AI Assistant placeholder",
      collector: "Google Places lead collection placeholder",
      settings: "Company settings and access"
    },
    quoteSections: ["Labor", "Parts", "Refrigerant", "Trip Charge", "Tax", "Total"],
    aiItems: ["Photo analysis", "Diagnostic help", "Quote creation", "Invoice creation", "Report generation", "Similar repair history search", "Preliminary repair cost estimate"],
    collectorText: "Google Places collection will use GOOGLE_PLACES_API_KEY later. Phase 1 keeps this as a controlled placeholder.",
    settingsText: "Configure roles, ADMIN_PASSWORD, Telegram lead alerts, tax defaults, quote terms, payment methods, and language preferences.",
    autoDeduct: "Auto-deduct from ticket placeholder",
    pdfExport: "PDF export placeholder"
  },
  ru: {
    lang: "English",
    title: "FORTEN SERVICE CRM V2",
    subtitle: "Платформа управления выездным сервисом",
    website: "Публичный сайт",
    checking: "Проверка закрытого доступа...",
    nav: {
      Dashboard: "Панель",
      Tickets: "Тикеты",
      Dispatch: "Диспетчер",
      Technician: "Техник",
      Mentor: "Ментор",
      Quotes: "Сметы",
      Invoices: "Счета",
      Customers: "История клиентов",
      Equipment: "Оборудование",
      Inventory: "Склад",
      Reports: "Дневные отчеты",
      KPI: "KPI",
      AI: "AI помощник",
      "Lead Collector": "Сбор лидов",
      Settings: "Настройки"
    },
    rolesTitle: "Роли",
    workflowTitle: "Рабочий процесс сервиса",
    statusTitle: "Статусы тикетов",
    dashboardLead: "Заявка с сайта создает сервисный тикет, диспетчер назначает техника, ментор проверяет диагностику, менеджер готовит смету, после одобрения идет счет, оплата, ремонт и закрытие тикета.",
    kpis: ["Открытые тикеты", "Диагностики сегодня", "Сметы на одобрении", "Неоплаченные счета", "Выручка за месяц", "Эффективность техников"],
    labels: {
      status: "Статус",
      customer: "Клиент",
      business: "Бизнес",
      address: "Адрес",
      equipment: "Оборудование",
      technician: "Техник",
      mentor: "Ментор",
      photos: "Фото",
      videos: "Видео",
      model: "Модель",
      serial: "Серийный номер",
      manufacturer: "Производитель",
      diagnostic: "Заметки диагностики",
      mentorDiagnosis: "Диагноз ментора",
      quoteTotal: "Сумма сметы",
      invoiceStatus: "Статус счета",
      rootCause: "Причина неисправности",
      recommendedRepair: "Рекомендованный ремонт",
      parts: "Запчасти",
      materials: "Материалы",
      warranty: "Рекомендация по гарантии",
      notes: "Заметки",
      paymentMethod: "Метод оплаты",
      total: "Итого",
      qty: "Кол-во",
      location: "Локация",
      history: "История",
      date: "Дата",
      mileage: "Пробег",
      expenses: "Расходы",
      signatures: "Подписи"
      ,
      timeline: "История статусов",
      attachments: "Вложения",
      documents: "Документы",
      installationDate: "Дата установки",
      warrantyStatus: "Статус гарантии",
      previousQuotes: "Предыдущие сметы",
      previousInvoices: "Предыдущие счета",
      balanceDue: "Баланс к оплате",
      payments: "Платежи",
      scope: "Объем работ",
      refrigerant: "Хладагент",
      terms: "Условия",
      signature: "Подпись клиента"
    },
    actions: {
      assign: "Назначить техника",
      openTicket: "Открыть тикет",
      save: "Сохранить тикет",
      mentor: "Запросить ментора",
      quote: "Создать смету",
      route: "Начать маршрут",
      arrived: "Прибыл",
      diagnostic: "Начать диагностику",
      upload: "Загрузить фото",
      repair: "Начать ремонт",
      finish: "Завершить ремонт",
      report: "Создать отчет",
      approvePlan: "Одобрить план ремонта",
      approve: "Одобрить",
      reject: "Отклонить",
      revision: "Запросить правку",
      pdf: "Создать PDF",
      previewPdf: "Предпросмотр PDF",
      paid: "Отметить оплату",
      collect: "Начать сбор",
      noRecords: "Пока нет записей"
    },
    modules: {
      tickets: "Список тикетов и детали",
      dispatch: "Диспетчерская доска",
      technician: "Мобильный вид техника",
      mentor: "Центр ментора",
      quotes: "Сметы",
      invoices: "Счета",
      customers: "История клиентов",
      equipment: "База оборудования",
      inventory: "Склад",
      reports: "Дневные отчеты",
      kpi: "KPI",
      ai: "AI помощник",
      collector: "Заготовка сбора лидов из Google Places",
      settings: "Настройки компании и доступа"
    },
    quoteSections: ["Работа", "Запчасти", "Хладагент", "Выезд", "Налог", "Итого"],
    aiItems: ["Анализ фото", "Помощь с диагностикой", "Создание сметы", "Создание счета", "Создание отчета", "Поиск похожих ремонтов", "Предварительная оценка стоимости"],
    collectorText: "Позже сбор Google Places будет использовать GOOGLE_PLACES_API_KEY. В Phase 1 это контролируемая заготовка.",
    settingsText: "Настройка ролей, ADMIN_PASSWORD, Telegram уведомлений, налогов, условий сметы, методов оплаты и языка.",
    autoDeduct: "Заготовка автосписания по тикету",
    pdfExport: "Заготовка экспорта PDF"
  }
};

const statusRu = {
  "NEW LEAD": "НОВЫЙ ЛИД",
  ASSIGNED: "НАЗНАЧЕН",
  "ON THE WAY": "В ПУТИ",
  ARRIVED: "ПРИБЫЛ",
  DIAGNOSTIC: "ДИАГНОСТИКА",
  "MENTOR REVIEW": "ПРОВЕРКА МЕНТОРА",
  "QUOTE GENERATED": "СМЕТА СОЗДАНА",
  "WAITING APPROVAL": "ОЖИДАЕТ ОДОБРЕНИЯ",
  APPROVED: "ОДОБРЕНО",
  "INVOICE SENT": "СЧЕТ ОТПРАВЛЕН",
  PAID: "ОПЛАЧЕНО",
  "REPAIR IN PROGRESS": "РЕМОНТ В РАБОТЕ",
  COMPLETED: "ЗАВЕРШЕНО",
  CLOSED: "ЗАКРЫТО",
  CANCELLED: "ОТМЕНЕНО"
};

const paymentRu = { Card: "Карта", ACH: "ACH", Zelle: "Zelle", Check: "Чек", Cash: "Наличные" };
const invoiceRu = { Unpaid: "Не оплачен", Paid: "Оплачен", Partial: "Частично" };

export default function AdminApp({ initialTab = "Dashboard" }) {
  const [lang, setLang] = useState("en");
  const [tab, setTab] = useState(initialTab);
  const [authorized, setAuthorized] = useState(null);
  const [tickets, setTickets] = useState(sampleTickets);
  const [customers] = useState(sampleCustomers);
  const [equipment] = useState(sampleEquipment);
  const [inventory] = useState(sampleInventory);
  const [quotes, setQuotes] = useState(sampleQuotes);
  const [invoices, setInvoices] = useState(sampleInvoices);
  const [reports] = useState(sampleReports);
  const [selectedTicketId, setSelectedTicketId] = useState(sampleTickets[0].id);
  const t = text[lang];

  useEffect(() => {
    if (localStorage.getItem("fortenAdminSession") === "active") setAuthorized(true);
    else {
      setAuthorized(false);
      window.location.href = "/admin/login";
    }
  }, []);

  useEffect(() => {
    if (!authorized) return;
    const storedTickets = readStore("fortenV2Tickets", sampleTickets);
    const websiteTickets = ticketsFromLeads(readStore("fortenLeads", []));
    setTickets(mergeBy([...websiteTickets, ...storedTickets], "ticketNumber"));
    setQuotes(readStore("fortenV2Quotes", sampleQuotes));
    setInvoices(readStore("fortenV2Invoices", sampleInvoices));
  }, [authorized]);

  useEffect(() => { if (authorized) localStorage.setItem("fortenV2Tickets", JSON.stringify(tickets)); }, [authorized, tickets]);
  useEffect(() => { if (authorized) localStorage.setItem("fortenV2Quotes", JSON.stringify(quotes)); }, [authorized, quotes]);
  useEffect(() => { if (authorized) localStorage.setItem("fortenV2Invoices", JSON.stringify(invoices)); }, [authorized, invoices]);

  const selectedTicket = tickets.find((ticket) => ticket.id === selectedTicketId) || tickets[0];
  const dashboardKpis = useMemo(() => [
    tickets.filter((ticket) => !["CLOSED", "CANCELLED"].includes(ticket.status)).length,
    tickets.filter((ticket) => ["DIAGNOSTIC", "MENTOR REVIEW"].includes(ticket.status)).length,
    quotes.filter((quote) => quote.status === "WAITING APPROVAL").length,
    invoices.filter((invoice) => invoice.status !== "Paid").length,
    `$${sum(invoices, "total")}`,
    "92%"
  ], [tickets, quotes, invoices]);

  function go(nextTab) {
    setTab(nextTab);
    if (sectionByTab[nextTab]) window.history.pushState(null, "", sectionByTab[nextTab]);
  }

  function patchTicket(id, changes) {
    setTickets((items) => items.map((ticket) => ticket.id === id ? { ...ticket, ...changes } : ticket));
  }

  function updateStatus(ticket, status) {
    patchTicket(ticket.id, {
      status,
      gpsTime: ["ON THE WAY", "ARRIVED"].includes(status) ? `${status} placeholder saved ${new Date().toLocaleTimeString()}` : ticket.gpsTime,
      timeline: updateTimeline(ticket.timeline, status)
    });
  }

  function generateQuote(ticket) {
    const existing = quotes.find((quote) => quote.ticketNumber === ticket.ticketNumber);
    const quote = existing || quoteFromTicket(ticket);
    setQuotes((items) => upsert(items, quote, "quoteNumber"));
    patchTicket(ticket.id, { status: "QUOTE GENERATED", quoteTotal: quote.total, timeline: updateTimeline(ticket.timeline, "QUOTE GENERATED") });
    go("Quotes");
  }

  function approveQuote(quote, status) {
    setQuotes((items) => items.map((item) => item.quoteNumber === quote.quoteNumber ? { ...item, status } : item));
    const nextTicketStatus = status === "APPROVED" ? "APPROVED" : status === "REJECTED" ? "MENTOR REVIEW" : "WAITING APPROVAL";
    setTickets((items) => items.map((ticket) => ticket.ticketNumber === quote.ticketNumber ? { ...ticket, status: nextTicketStatus, timeline: updateTimeline(ticket.timeline, nextTicketStatus) } : ticket));
  }

  function generateInvoice(quote) {
    const invoice = invoiceFromQuote(quote);
    setInvoices((items) => upsert(items, invoice, "invoiceNumber"));
    setTickets((items) => items.map((ticket) => ticket.ticketNumber === quote.ticketNumber ? { ...ticket, status: "INVOICE SENT", invoiceStatus: "Unpaid", timeline: updateTimeline(ticket.timeline, "INVOICE SENT") } : ticket));
    go("Invoices");
  }

  function markPaid(invoice) {
    setInvoices((items) => items.map((item) => item.invoiceNumber === invoice.invoiceNumber ? { ...item, status: "Paid", balanceDue: 0, payments: item.payments?.length ? item.payments : [{ method: item.paymentMethod || "Card", amount: item.total, date: new Date().toISOString().slice(0, 10) }] } : item));
    setTickets((items) => items.map((ticket) => ticket.ticketNumber === invoice.ticketNumber ? { ...ticket, status: "PAID", invoiceStatus: "Paid", timeline: updateTimeline(ticket.timeline, "PAID") } : ticket));
  }

  async function generateQuotePdf(quote, preview = false) {
    const ticket = tickets.find((item) => item.ticketNumber === quote.ticketNumber);
    const eq = equipment.find((item) => item.id === (quote.equipmentId || ticket?.equipmentId));
    await createServicePdf("quote", { quote, ticket, equipment: eq, t }, preview);
  }

  async function generateInvoicePdf(invoice, preview = false) {
    const ticket = tickets.find((item) => item.ticketNumber === invoice.ticketNumber);
    const eq = equipment.find((item) => item.id === (invoice.equipmentId || ticket?.equipmentId));
    await createServicePdf("invoice", { invoice, ticket, equipment: eq, t }, preview);
  }

  if (!authorized) {
    return <main className="adminGate"><section className="panel"><span className="mark">F</span><h1>Forten Admin</h1><p>{t.checking}</p></section></main>;
  }

  return (
    <main className="crmShell">
      <aside className="sidebar">
        <a className="brand crmBrand" href="/"><span className="mark">F</span><span><strong>FORTEN</strong><small>{t.subtitle}</small></span></a>
        {navKeys.map((key) => (
          <button className={tab === key ? "active" : ""} key={key} onClick={() => go(key)}>
            {iconFor(key)}{t.nav[key]}
          </button>
        ))}
        <button onClick={() => setLang(lang === "en" ? "ru" : "en")}><Languages size={17} />{t.lang}</button>
      </aside>
      <section className="crmMain">
        <header className="crmHeader">
          <div><h1>{t.title}</h1><p>{t.subtitle}</p></div>
          <a className="secondary" href="/">{t.website}</a>
        </header>
        {tab === "Dashboard" && <Dashboard t={t} lang={lang} kpis={dashboardKpis} tickets={tickets} quotes={quotes} invoices={invoices} go={go} />}
        {tab === "Tickets" && <TicketsPanel t={t} lang={lang} tickets={tickets} equipment={equipment} selectedTicket={selectedTicket} setSelectedTicketId={setSelectedTicketId} patchTicket={patchTicket} updateStatus={updateStatus} generateQuote={generateQuote} />}
        {tab === "Dispatch" && <DispatchPanel t={t} lang={lang} tickets={tickets} patchTicket={patchTicket} openTicket={(ticket) => { setSelectedTicketId(ticket.id); go("Tickets"); }} />}
        {tab === "Technician" && <TechnicianPanel t={t} lang={lang} ticket={selectedTicket} updateStatus={updateStatus} generateQuote={generateQuote} />}
        {tab === "Mentor" && <MentorPanel t={t} lang={lang} tickets={tickets} customers={customers} equipment={equipment} patchTicket={patchTicket} generateQuote={generateQuote} />}
        {tab === "Quotes" && <QuotesPanel t={t} lang={lang} quotes={quotes} approveQuote={approveQuote} generateInvoice={generateInvoice} generateQuotePdf={generateQuotePdf} />}
        {tab === "Invoices" && <InvoicesPanel t={t} lang={lang} invoices={invoices} setInvoices={setInvoices} markPaid={markPaid} generateInvoicePdf={generateInvoicePdf} />}
        {tab === "Customers" && <CustomersPanel t={t} customers={customers} equipment={equipment} invoices={invoices} tickets={tickets} />}
        {tab === "Equipment" && <EquipmentPanel t={t} equipment={equipment} tickets={tickets} />}
        {tab === "Inventory" && <InventoryPanel t={t} inventory={inventory} />}
        {tab === "Reports" && <ReportsPanel t={t} reports={reports} />}
        {tab === "KPI" && <KpiPanel t={t} lang={lang} kpi={sampleKpi} />}
        {tab === "AI" && <AiPanel t={t} />}
        {tab === "Lead Collector" && <LeadCollectorPanel t={t} />}
        {tab === "Settings" && <SettingsPanel t={t} lang={lang} />}
      </section>
    </main>
  );
}

function Dashboard({ t, lang, kpis, tickets, quotes, invoices, go }) {
  return (
    <>
      <section className="panel heroAdmin">
        <p className="eyebrow">{t.workflowTitle}</p>
        <h2>{t.title}</h2>
        <p>{t.dashboardLead}</p>
        <div className="workflowChips">{ticketStatuses.slice(0, 9).map((status) => <span key={status}>{labelStatus(status, lang)}</span>)}</div>
      </section>
      <div className="kpiGrid">{t.kpis.map((label, index) => <article className="kpi" key={label}><span>{label}</span><strong>{kpis[index]}</strong><i style={{ width: `${46 + index * 12}%` }} /></article>)}</div>
      <section className="panel chartPanel">
        <div className="panelHeader"><h2>{t.statusTitle}</h2><span className="statusPill">V2</span></div>
        <div className="barChart">{ticketStatuses.slice(0, 10).map((status, index) => <span key={status} style={{ height: `${30 + (index % 5) * 11}%` }}><b>{labelStatus(status, lang)}</b></span>)}</div>
      </section>
      <div className="dashboardGrid">
        <MiniModule title={t.modules.tickets} value={tickets[0]?.ticketNumber} action={t.actions.openTicket} onClick={() => go("Tickets")} />
        <MiniModule title={t.modules.quotes} value={`$${sum(quotes, "total")}`} action={t.actions.quote} onClick={() => go("Quotes")} />
        <MiniModule title={t.modules.invoices} value={`$${sum(invoices, "total")}`} action={t.actions.paid} onClick={() => go("Invoices")} />
      </div>
    </>
  );
}

function TicketsPanel({ t, lang, tickets, equipment, selectedTicket, setSelectedTicketId, patchTicket, updateStatus, generateQuote }) {
  const set = (key, value) => patchTicket(selectedTicket.id, { [key]: value });
  const linkedEquipment = equipment.find((item) => item.id === selectedTicket.equipmentId);
  return (
    <div className="moduleGrid">
      <section className="panel">
        <h2>{t.modules.tickets}</h2>
        <div className="recordList">{tickets.map((ticket) => (
          <button className={`ticketRow ${selectedTicket.id === ticket.id ? "active" : ""}`} key={ticket.id} onClick={() => setSelectedTicketId(ticket.id)}>
            <strong>{ticket.ticketNumber}</strong><span>{ticket.businessName}</span><em>{labelStatus(ticket.status, lang)}</em>
          </button>
        ))}</div>
      </section>
      <section className="panel widePanel">
        <div className="panelHeader">
          <h2>{selectedTicket.ticketNumber}</h2>
          <div className="buttonRow"><button className="secondary" onClick={() => updateStatus(selectedTicket, "MENTOR REVIEW")}>{t.actions.mentor}</button><button className="primary" onClick={() => generateQuote(selectedTicket)}>{t.actions.quote}</button></div>
        </div>
        <TicketDetail t={t} lang={lang} ticket={selectedTicket} equipment={linkedEquipment} />
        <AttachmentSystem t={t} attachments={selectedTicket.attachments} />
        <Timeline t={t} items={timelineFor(selectedTicket)} />
        <div className="fieldGrid">
          <Select label={t.labels.status} value={selectedTicket.status} options={ticketStatuses} labels={statusLabels(lang)} onChange={(v) => set("status", v)} />
          <Select label={t.labels.equipment} value={selectedTicket.equipmentId || ""} options={equipment.map((item) => item.id)} labels={Object.fromEntries(equipment.map((item) => [item.id, `${item.customer} | ${item.type} ${item.serial}`]))} onChange={(v) => {
            const eq = equipment.find((item) => item.id === v);
            patchTicket(selectedTicket.id, { equipmentId: v, equipment: eq?.type || selectedTicket.equipment, manufacturer: eq?.manufacturer || "", model: eq?.model || "", serial: eq?.serial || "" });
          }} />
          <Field label={t.labels.technician} value={selectedTicket.technician} onChange={(v) => set("technician", v)} />
          <Field label={t.labels.mentor} value={selectedTicket.mentor} onChange={(v) => set("mentor", v)} />
          <Field label={t.labels.manufacturer} value={selectedTicket.manufacturer} onChange={(v) => set("manufacturer", v)} />
          <Field label={t.labels.model} value={selectedTicket.model} onChange={(v) => set("model", v)} />
          <Field label={t.labels.serial} value={selectedTicket.serial} onChange={(v) => set("serial", v)} />
          <div className="full"><label>{t.labels.diagnostic}</label><textarea value={selectedTicket.diagnosticNotes} onChange={(event) => set("diagnosticNotes", event.target.value)} /></div>
          <div className="full"><label>{t.labels.mentorDiagnosis}</label><textarea value={selectedTicket.mentorDiagnosis} onChange={(event) => set("mentorDiagnosis", event.target.value)} /></div>
        </div>
      </section>
    </div>
  );
}

function TicketDetail({ t, lang, ticket, equipment }) {
  const rows = [
    [t.labels.status, labelStatus(ticket.status, lang)],
    [t.labels.customer, ticket.customer],
    [t.labels.business, ticket.businessName],
    [t.labels.address, ticket.address],
    [t.labels.equipment, ticket.equipment],
    [t.labels.location, equipment?.location],
    [t.labels.installationDate, equipment?.installationDate],
    [t.labels.warrantyStatus, equipment?.warrantyStatus],
    [t.labels.technician, ticket.technician],
    [t.labels.mentor, ticket.mentor],
    [t.labels.photos, ticket.photos],
    [t.labels.videos, ticket.videos],
    [t.labels.manufacturer, ticket.manufacturer],
    [t.labels.model, ticket.model],
    [t.labels.serial, ticket.serial],
    [t.labels.diagnostic, ticket.diagnosticNotes],
    [t.labels.mentorDiagnosis, ticket.mentorDiagnosis],
    [t.labels.quoteTotal, ticket.quoteTotal ? `$${ticket.quoteTotal}` : "-"],
    [t.labels.invoiceStatus, invoiceStatusLabel(ticket.invoiceStatus, lang)]
  ];
  return <div className="detailGrid">{rows.map(([label, value]) => <Read key={label} label={label} value={value} />)}</div>;
}

function AttachmentSystem({ t, attachments = {} }) {
  const groups = [
    [t.labels.photos, attachments.photos || []],
    [t.labels.videos, attachments.videos || []],
    [t.labels.documents, attachments.documents || []]
  ];
  return <section className="subPanel"><div className="panelHeader"><h3>{t.labels.attachments}</h3><span className="statusPill">{groups.reduce((count, [, items]) => count + items.length, 0)}</span></div><div className="attachmentGrid">{groups.map(([title, items]) => <article key={title}><strong><Paperclip size={17} />{title}</strong><span>{items.length} {t.labels.attachments}</span><div>{items.map((item) => <em key={item}>{item}</em>)}</div><button className="secondary" type="button">{t.actions.upload}</button></article>)}</div></section>;
}

function Timeline({ t, items = [] }) {
  return <section className="subPanel"><h3>{t.labels.timeline}</h3><div className="timeline">{items.map(([name, time]) => <article key={name} className={time === "Pending" ? "pending" : ""}><b>{name}</b><span>{time}</span></article>)}</div></section>;
}

function DispatchPanel({ t, lang, tickets, patchTicket, openTicket }) {
  return <section className="panel"><div className="panelHeader"><h2>{t.modules.dispatch}</h2><span className="statusPill">{tickets.length}</span></div><div className="dispatchBoard">{tickets.map((ticket) => <article className="dispatchCard" key={ticket.id}><strong>{ticket.ticketNumber}</strong><h3>{ticket.businessName}</h3><p>{ticket.address}</p><p>{ticket.problem}</p><Select label={t.labels.technician} value={ticket.technician} options={["Ivan Petrov", "Nina Santos", "Carlos Reed"]} onChange={(v) => patchTicket(ticket.id, { technician: v, status: "ASSIGNED" })} /><span className="statusPill">{labelStatus(ticket.status, lang)}</span><button className="primary" onClick={() => openTicket(ticket)}>{t.actions.openTicket}</button></article>)}</div></section>;
}

function TechnicianPanel({ t, lang, ticket, updateStatus, generateQuote }) {
  const actions = [
    [t.actions.route, "ON THE WAY"],
    [t.actions.arrived, "ARRIVED"],
    [t.actions.diagnostic, "DIAGNOSTIC"],
    [t.actions.upload, "DIAGNOSTIC"],
    [t.actions.mentor, "MENTOR REVIEW"],
    [t.actions.quote, "QUOTE GENERATED"],
    [t.actions.repair, "REPAIR IN PROGRESS"],
    [t.actions.finish, "COMPLETED"],
    [t.actions.report, "CLOSED"]
  ];
  return <section className="panel technicianShell"><p className="eyebrow">{t.modules.technician}</p><h2>{ticket.ticketNumber}</h2><h3>{ticket.businessName}</h3><p>{ticket.address}</p><span className="statusPill">{labelStatus(ticket.status, lang)}</span><div className="mobileActions">{actions.map(([label, status]) => <button className={status === "QUOTE GENERATED" ? "primary" : "secondary"} key={label} onClick={() => status === "QUOTE GENERATED" ? generateQuote(ticket) : updateStatus(ticket, status)}>{label}</button>)}</div><TicketDetail t={t} lang={lang} ticket={ticket} /></section>;
}

function MentorPanel({ t, lang, tickets, customers, equipment, patchTicket, generateQuote }) {
  const active = tickets.filter((ticket) => ["MENTOR REVIEW", "DIAGNOSTIC"].includes(ticket.status));
  const [drafts, setDrafts] = useState({});
  function setField(ticket, key, value) {
    setDrafts((items) => ({ ...items, [ticket.id]: { ...(items[ticket.id] || {}), [key]: value } }));
  }
  return <section className="panel"><div className="panelHeader"><h2>{t.modules.mentor}</h2><span className="statusPill">{active.length}</span></div><div className="recordList">{active.map((ticket) => {
    const draft = drafts[ticket.id] || {};
    const customer = customers.find((item) => item.id === ticket.customerId);
    const eq = equipment.find((item) => item.customerId === ticket.customerId);
    return <article className="customerCard" key={ticket.id}><div className="panelHeader"><h3>{ticket.ticketNumber}</h3><span className="statusPill">{labelStatus(ticket.status, lang)}</span></div><div className="detailGrid"><Read label={t.labels.photos} value={ticket.photos} /><Read label={t.labels.videos} value={ticket.videos} /><Read label={t.labels.diagnostic} value={ticket.diagnosticNotes} /><Read label={t.labels.customer} value={customer?.repairHistory.join("; ")} /><Read label={t.labels.equipment} value={eq?.serviceHistory.join("; ")} /></div><div className="fieldGrid"><Field label={t.labels.rootCause} value={draft.rootCause || ""} onChange={(v) => setField(ticket, "rootCause", v)} /><Field label={t.labels.recommendedRepair} value={draft.recommendedRepair || ticket.mentorDiagnosis} onChange={(v) => setField(ticket, "recommendedRepair", v)} /><Field label={t.labels.parts} value={draft.parts || ""} onChange={(v) => setField(ticket, "parts", v)} /><Field label={t.labels.materials} value={draft.materials || ""} onChange={(v) => setField(ticket, "materials", v)} /><Field label={t.labels.warranty} value={draft.warranty || ""} onChange={(v) => setField(ticket, "warranty", v)} /><div className="full"><label>{t.labels.notes}</label><textarea value={draft.notes || ""} onChange={(e) => setField(ticket, "notes", e.target.value)} /></div></div><div className="buttonRow"><button className="secondary" onClick={() => patchTicket(ticket.id, { status: "QUOTE GENERATED", mentorDiagnosis: draft.recommendedRepair || ticket.mentorDiagnosis })}>{t.actions.approvePlan}</button><button className="primary" onClick={() => generateQuote({ ...ticket, mentorDiagnosis: draft.recommendedRepair || ticket.mentorDiagnosis })}>{t.actions.quote}</button></div></article>;
  })}</div></section>;
}

function QuotesPanel({ t, lang, quotes, approveQuote, generateInvoice, generateQuotePdf }) {
  return <section className="panel"><h2>{t.modules.quotes}</h2><div className="recordList">{quotes.map((quote) => <article className="customerCard" key={quote.quoteNumber}><div className="panelHeader"><h3>{quote.quoteNumber}</h3><span className="statusPill">{labelStatus(quote.status, lang)}</span></div><div className="priceTable">{t.quoteSections.map((label, index) => <div key={label}><span>{label}</span><strong>${[quote.labor, quote.parts, quote.refrigerant, quote.tripCharge, quote.tax, quote.total][index]}</strong></div>)}</div><div className="detailGrid"><Read label={t.labels.customer} value={quote.customer} /><Read label={t.labels.equipment} value={quote.equipment} /><Read label={t.labels.diagnostic} value={quote.diagnosis} /><Read label={t.labels.recommendedRepair} value={quote.repairPlan} /><Read label={t.labels.scope} value={quote.scope} /><Read label={t.labels.materials} value={quote.materials} /><Read label={t.labels.warranty} value={quote.warranty} /><Read label={t.labels.terms} value={quote.terms} /></div><div className="signatureBox">{t.labels.signature}</div><div className="buttonRow"><button className="secondary" onClick={() => approveQuote(quote, "APPROVED")}>{t.actions.approve}</button><button className="secondary" onClick={() => approveQuote(quote, "REJECTED")}>{t.actions.reject}</button><button className="secondary" onClick={() => approveQuote(quote, "REVISION REQUESTED")}>{t.actions.revision}</button><button className="secondary" onClick={() => generateQuotePdf(quote, true)}>{t.actions.previewPdf}</button><button className="secondary" onClick={() => generateQuotePdf(quote)}>{t.actions.pdf}</button><button className="primary" onClick={() => generateInvoice(quote)}>{text[lang].nav.Invoices}</button></div></article>)}</div></section>;
}

function InvoicesPanel({ t, lang, invoices, setInvoices, markPaid, generateInvoicePdf }) {
  function patch(invoice, changes) {
    setInvoices((items) => items.map((item) => item.invoiceNumber === invoice.invoiceNumber ? { ...item, ...changes } : item));
  }
  return <section className="panel"><h2>{t.modules.invoices}</h2><div className="recordList">{invoices.map((invoice) => <article className="customerCard" key={invoice.invoiceNumber}><div className="panelHeader"><h3>{invoice.invoiceNumber}</h3><span className="statusPill">{invoiceStatusLabel(invoice.status, lang)}</span></div><div className="fieldGrid"><Read label={t.labels.customer} value={invoice.customer} /><Read label={t.labels.equipment} value={invoice.equipment} /><Read label={t.labels.completedWork || "Completed Work"} value={invoice.completedWork} /><Read label={t.labels.parts} value={`$${invoice.parts}`} /><Read label={t.labels.materials} value={`$${invoice.materials}`} /><Read label={t.labels.payments} value={(invoice.payments || []).map((item) => `${item.method} $${item.amount}`).join(", ") || invoice.paymentMethod} /><Read label={t.labels.balanceDue} value={`$${invoice.balanceDue ?? invoice.total}`} /><Read label={t.labels.total} value={`$${invoice.total}`} /><Select label={t.labels.status} value={invoice.status} options={invoiceStatuses} labels={invoiceLabels(lang)} onChange={(v) => patch(invoice, { status: v })} /><Select label={t.labels.paymentMethod} value={invoice.paymentMethod} options={paymentMethods} labels={paymentLabels(lang)} onChange={(v) => patch(invoice, { paymentMethod: v })} /></div><div className="buttonRow"><button className="secondary" onClick={() => generateInvoicePdf(invoice, true)}>{t.actions.previewPdf}</button><button className="secondary" onClick={() => generateInvoicePdf(invoice)}>{t.actions.pdf}</button><button className="primary" onClick={() => markPaid(invoice)}>{t.actions.paid}</button></div></article>)}</div></section>;
}

function CustomersPanel({ t, customers, equipment, invoices, tickets }) {
  return <section className="panel"><h2>{t.modules.customers}</h2><div className="recordList">{customers.map((customer) => <article className="customerCard" key={customer.id}><h3>{customer.businessName}</h3><p>{customer.contact} | {customer.phone} | {customer.email}</p><p>{customer.address}</p><div className="detailGrid"><Read label={t.labels.history} value={customer.repairHistory.join("; ")} /><Read label={t.modules.invoices} value={customer.invoiceHistory.join("; ")} /><Read label={t.modules.equipment} value={equipment.filter((item) => item.customerId === customer.id).map((item) => `${item.type} ${item.serial}`).join("; ")} /><Read label={t.labels.photos} value={customer.photos} /><Read label={t.labels.warranty} value={customer.warrantyWork} /><Read label={t.modules.tickets} value={tickets.filter((item) => item.customerId === customer.id).map((item) => item.ticketNumber).join(", ")} /></div></article>)}</div></section>;
}

function EquipmentPanel({ t, equipment, tickets }) {
  return <section className="panel"><h2>{t.modules.equipment}</h2><div className="recordList">{equipment.map((item) => <article className="customerCard" key={item.id}><h3>{item.type}</h3><div className="detailGrid"><Read label={t.labels.customer} value={item.customer} /><Read label={t.labels.manufacturer} value={item.manufacturer} /><Read label={t.labels.model} value={item.model} /><Read label={t.labels.serial} value={item.serial} /><Read label={t.labels.location} value={item.location} /><Read label={t.labels.installationDate} value={item.installationDate} /><Read label={t.labels.warrantyStatus} value={item.warrantyStatus} /><Read label={t.labels.photos} value={(item.photos || []).join(", ")} /><Read label={t.labels.previousQuotes} value={(item.previousQuotes || []).join(", ")} /><Read label={t.labels.previousInvoices} value={(item.previousInvoices || []).join(", ")} /></div><Timeline t={t} items={(item.serviceHistory || []).map((history) => [history.title, `${history.date} | ${history.detail} | ${history.quote} | ${history.invoice}`])} /><AttachmentSystem t={t} attachments={{ photos: item.photos || [], videos: [], documents: [...(item.previousQuotes || []), ...(item.previousInvoices || []), ...tickets.filter((ticket) => ticket.equipmentId === item.id).map((ticket) => ticket.ticketNumber)] }} /></article>)}</div></section>;
}

function InventoryPanel({ t, inventory }) {
  return <section className="panel"><div className="panelHeader"><h2>{t.modules.inventory}</h2><span className="statusPill">{t.autoDeduct}</span></div><div className="recordList">{inventory.map((item) => <article className="record" key={item.id}><Boxes size={18} /><span>{item.category}</span><strong>{item.item}</strong><span>{t.labels.qty}: {item.quantity}</span><span>{item.location}</span></article>)}</div></section>;
}

function ReportsPanel({ t, reports }) {
  return <section className="panel"><div className="panelHeader"><h2>{t.modules.reports}</h2><button className="secondary">{t.pdfExport}</button></div><div className="recordList">{reports.map((report) => <article className="customerCard" key={report.id}><h3>{report.technician}</h3><div className="detailGrid">{Object.entries(report).filter(([key]) => key !== "id").map(([key, value]) => <Read key={key} label={reportLabel(t, key)} value={value} />)}</div></article>)}</div></section>;
}

function KpiPanel({ t, lang, kpi }) {
  const labels = lang === "ru"
    ? ["Заказы", "Средний чек", "Время диагностики", "Время ремонта", "Продажи", "Повторные вызовы", "Возвраты", "Оценка клиента"]
    : ["Jobs", "Average Ticket", "Diagnostic Time", "Repair Time", "Sales", "Callbacks", "Returns", "Customer Rating"];
  const cards = [[labels[0], kpi.jobsCount], [labels[1], `$${kpi.averageTicket}`], [labels[2], kpi.diagnosticTime], [labels[3], kpi.repairTime], [labels[4], `$${kpi.sales}`], [labels[5], kpi.callbacks], [labels[6], kpi.returns], [labels[7], kpi.customerRating]];
  return <section className="panel"><h2>{t.modules.kpi}</h2><div className="kpiGrid">{cards.map(([label, value], index) => <article className="kpi" key={label}><span>{label}</span><strong>{value}</strong><i style={{ width: `${40 + index * 6}%` }} /></article>)}</div></section>;
}

function AiPanel({ t }) {
  return <section className="panel placeholder"><Bot size={42} /><h2>{t.modules.ai}</h2><div className="trustGrid">{t.aiItems.map((item) => <span key={item}><ShieldCheck size={18} />{item}</span>)}</div></section>;
}

function LeadCollectorPanel({ t }) {
  return <section className="panel placeholder"><Map size={42} /><h2>{t.modules.collector}</h2><p>{t.collectorText}</p><button className="primary">{t.actions.collect}</button></section>;
}

function SettingsPanel({ t, lang }) {
  return <section className="panel"><h2>{t.modules.settings}</h2><p>{t.settingsText}</p><div className="trustGrid">{roles.map((role) => <span key={role}><Users size={18} />{roleLabel(role, lang)}</span>)}</div></section>;
}

function MiniModule({ title, value, action, onClick }) {
  return <article className="serviceCard"><h3>{title}</h3><strong>{value || "-"}</strong><button className="secondary" onClick={onClick}>{action}</button></article>;
}

function Field({ label, value, onChange, type = "text" }) {
  return <div><label>{label}</label><input type={type} value={value || ""} onChange={(event) => onChange(event.target.value)} /></div>;
}

function Read({ label, value }) {
  return <div><label>{label}</label><div className="readBox">{value || "-"}</div></div>;
}

function Select({ label, value, options, labels = {}, onChange }) {
  return <div><label>{label}</label><select value={value || ""} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option} value={option}>{labels[option] || option}</option>)}</select></div>;
}

function iconFor(key) {
  const icons = {
    Dashboard: <BarChart3 />,
    Tickets: <ClipboardList />,
    Dispatch: <Truck />,
    Technician: <Smartphone />,
    Mentor: <Users />,
    Quotes: <FileText />,
    Invoices: <Receipt />,
    Customers: <ShieldCheck />,
    Equipment: <Wrench />,
    Inventory: <Boxes />,
    Reports: <ClipboardList />,
    KPI: <Gauge />,
    AI: <Bot />,
    "Lead Collector": <Megaphone />,
    Settings: <Settings />
  };
  return icons[key] || <ClipboardList />;
}

function quoteFromTicket(ticket) {
  const labor = 1450;
  const parts = ticket.equipment.toLowerCase().includes("cooler") ? 1850 : 420;
  const refrigerant = ticket.equipment.toLowerCase().includes("cooler") ? 420 : 0;
  const tripCharge = 159;
  const tax = Math.round((parts + refrigerant) * 0.07);
  return {
    id: `quote-${Date.now()}`,
    quoteNumber: `Q-${ticket.ticketNumber.replace("FS-", "")}`,
    ticketNumber: ticket.ticketNumber,
    customer: ticket.businessName,
    customerAddress: ticket.address,
    equipment: `${ticket.manufacturer} ${ticket.equipment} ${ticket.model}`.trim(),
    equipmentId: ticket.equipmentId,
    status: "WAITING APPROVAL",
    labor,
    parts,
    refrigerant,
    tripCharge,
    tax,
    total: labor + parts + refrigerant + tripCharge + tax,
    diagnosis: ticket.mentorDiagnosis || ticket.diagnosticNotes,
    repairPlan: ticket.mentorDiagnosis || "Flat-rate repair plan from mentor review.",
    scope: "Diagnostic findings review, repair plan, replacement parts installation, startup test, and final documentation.",
    materials: "Shop materials, cleaners, fittings, and installation supplies as required.",
    warranty: "90-day labor warranty. Installed parts carry manufacturer warranty where applicable.",
    terms: "Customer approval required before repair. Hidden failures or inaccessible components may require revised quote.",
    signature: "Customer signature placeholder"
  };
}

function invoiceFromQuote(quote) {
  return {
    id: `invoice-${Date.now()}`,
    invoiceNumber: `INV-${quote.quoteNumber.replace("Q-", "")}`,
    quoteNumber: quote.quoteNumber,
    ticketNumber: quote.ticketNumber,
    customer: quote.customer,
    equipment: quote.equipment,
    equipmentId: quote.equipmentId,
    completedWork: quote.repairPlan,
    parts: quote.parts,
    materials: quote.refrigerant,
    discount: 0,
    tax: quote.tax,
    total: quote.total,
    status: "Unpaid",
    paymentMethod: "Card",
    payments: [],
    balanceDue: quote.total
  };
}

function readStore(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return Array.isArray(value) && value.length ? value : fallback;
  } catch {
    return fallback;
  }
}

function upsert(list, record, key) {
  return list.some((item) => item[key] === record[key]) ? list.map((item) => item[key] === record[key] ? record : item) : [record, ...list];
}

function mergeBy(list, key) {
  return [...new Map(list.map((item) => [item[key], item])).values()];
}

function ticketsFromLeads(leads) {
  return leads.map((lead, index) => ({
    id: `website-${lead.id || index}`,
    ticketNumber: `FS-2026-W${String(index + 1).padStart(6, "0")}`,
    status: "NEW LEAD",
    customerId: "",
    customer: lead.contact,
    businessName: lead.businessName,
    address: lead.address,
    equipment: lead.equipment,
    equipmentId: "",
    manufacturer: "",
    model: "",
    serial: "",
    problem: lead.issue,
    technician: "",
    mentor: "Senior Mentor",
    diagnosticNotes: lead.notes || "Website request waiting for dispatch.",
    temperatureReadings: "-",
    pressureReadings: "-",
    voltageReadings: "-",
    photos: "Photos pending",
    videos: "Videos pending",
    mentorDiagnosis: "Pending diagnostic and mentor review.",
    quoteTotal: 0,
    invoiceStatus: "Not generated",
    gpsTime: "Not started",
    beforeAfter: "Pending"
    ,
    attachments: { photos: ["Upload placeholder"], videos: ["Upload placeholder"], documents: ["Website request"] },
    timeline: [
      ["Created", new Date().toLocaleString()],
      ["Assigned", "Pending"],
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
  }));
}

function timelineFor(ticket) {
  return ticket.timeline?.length ? ticket.timeline : [
    ["Created", "Pending"],
    ["Assigned", "Pending"],
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
  ];
}

function updateTimeline(timeline, status) {
  const label = statusTitle(status);
  const current = timelineFor({ timeline });
  return current.map(([name, time]) => name === label ? [name, new Date().toLocaleString()] : [name, time]);
}

function statusTitle(status) {
  return {
    "NEW LEAD": "Created",
    ASSIGNED: "Assigned",
    "ON THE WAY": "On The Way",
    ARRIVED: "Arrived",
    DIAGNOSTIC: "Diagnostic",
    "MENTOR REVIEW": "Mentor Review",
    "QUOTE GENERATED": "Quote Generated",
    "WAITING APPROVAL": "Quote Generated",
    APPROVED: "Approved",
    "INVOICE SENT": "Invoice Sent",
    PAID: "Paid",
    "REPAIR IN PROGRESS": "Repair Started",
    COMPLETED: "Completed",
    CLOSED: "Closed"
  }[status] || status;
}

async function createServicePdf(type, data, preview) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const isQuote = type === "quote";
  const record = isQuote ? data.quote : data.invoice;
  const title = isQuote ? "SERVICE QUOTE" : "SERVICE INVOICE";
  let y = 120;

  doc.setFillColor(9, 26, 53);
  doc.rect(0, 0, 612, 86, "F");
  doc.setFillColor(245, 124, 32);
  doc.roundedRect(42, 24, 42, 42, 10, 10, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("F", 57, 53);
  doc.setFontSize(18);
  doc.text("Forten Commercial Equipment Services", 102, 38);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Commercial Kitchen Equipment Repair & Maintenance", 102, 56);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(title, 430, 48);

  doc.setTextColor(9, 26, 53);
  doc.setFontSize(16);
  doc.text(isQuote ? record.quoteNumber : record.invoiceNumber, 42, y);
  y += 28;

  const sections = isQuote ? quotePdfSections(record, data.ticket, data.equipment) : invoicePdfSections(record, data.ticket, data.equipment);
  sections.forEach(([heading, rows]) => {
    if (y > 700) {
      doc.addPage();
      y = 52;
    }
    doc.setFillColor(239, 245, 251);
    doc.rect(42, y - 14, 528, 22, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(heading, 52, y);
    y += 24;
    rows.forEach(([label, value]) => {
      const text = doc.splitTextToSize(String(value || "-"), 340);
      doc.setFont("helvetica", "bold");
      doc.text(label, 52, y);
      doc.setFont("helvetica", "normal");
      doc.text(text, 210, y);
      y += Math.max(18, text.length * 13);
    });
    y += 10;
  });

  doc.setFillColor(245, 124, 32);
  doc.roundedRect(392, y, 178, 42, 8, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(isQuote ? "TOTAL" : "BALANCE DUE", 410, y + 17);
  doc.setFontSize(18);
  doc.text(`$${isQuote ? record.total : (record.balanceDue ?? record.total)}`, 410, y + 35);

  if (isQuote) {
    y += 82;
    doc.setTextColor(9, 26, 53);
    doc.setDrawColor(9, 26, 53);
    doc.line(42, y, 300, y);
    doc.setFontSize(10);
    doc.text("Customer Signature", 42, y + 16);
  }

  const name = `${isQuote ? record.quoteNumber : record.invoiceNumber}.pdf`;
  if (preview) {
    window.open(doc.output("bloburl"), "_blank", "noopener,noreferrer");
  } else {
    doc.save(name);
  }
}

function quotePdfSections(quote, ticket, equipment) {
  return [
    ["Customer Information", [["Customer", quote.customer], ["Service Location", quote.customerAddress || ticket?.address]]],
    ["Equipment Information", [["Equipment", quote.equipment], ["Manufacturer", equipment?.manufacturer || ticket?.manufacturer], ["Model", equipment?.model || ticket?.model], ["Serial Number", equipment?.serial || ticket?.serial], ["Location", equipment?.location]]],
    ["Diagnostic Findings", [["Findings", quote.diagnosis]]],
    ["Recommended Repair", [["Repair Plan", quote.repairPlan], ["Scope Of Work", quote.scope]]],
    ["Parts / Materials / Refrigerant", [["Parts", `$${quote.parts}`], ["Materials", quote.materials], ["Refrigerant", `$${quote.refrigerant}`]]],
    ["Warranty", [["Warranty", quote.warranty]]],
    ["Terms & Conditions", [["Terms", quote.terms]]]
  ];
}

function invoicePdfSections(invoice, ticket, equipment) {
  return [
    ["Invoice Information", [["Invoice Number", invoice.invoiceNumber], ["Customer", invoice.customer]]],
    ["Equipment", [["Equipment", invoice.equipment], ["Manufacturer", equipment?.manufacturer || ticket?.manufacturer], ["Model", equipment?.model || ticket?.model], ["Serial Number", equipment?.serial || ticket?.serial]]],
    ["Completed Work", [["Completed Work", invoice.completedWork]]],
    ["Charges", [["Parts", `$${invoice.parts}`], ["Materials", `$${invoice.materials}`], ["Tax", `$${invoice.tax}`], ["Total", `$${invoice.total}`]]],
    ["Payments", [["Payment Methods", paymentMethods.join(", ")], ["Payments", (invoice.payments || []).map((item) => `${item.method} $${item.amount} ${item.date}`).join(", ") || "No payments recorded"], ["Balance Due", `$${invoice.balanceDue ?? invoice.total}`]]]
  ];
}

function sum(items, key) {
  return items.reduce((total, item) => total + Number(item[key] || 0), 0).toLocaleString();
}

function labelStatus(status, lang) {
  return lang === "ru" ? statusRu[status] || status : status;
}

function statusLabels(lang) {
  return Object.fromEntries(ticketStatuses.map((status) => [status, labelStatus(status, lang)]));
}

function paymentLabels(lang) {
  return lang === "ru" ? paymentRu : {};
}

function invoiceLabels(lang) {
  return lang === "ru" ? invoiceRu : {};
}

function invoiceStatusLabel(status, lang) {
  return lang === "ru" ? invoiceRu[status] || status : status;
}

function reportLabel(t, key) {
  const map = { date: t.labels.date, mileage: t.labels.mileage, expenses: t.labels.expenses, signatures: t.labels.signatures };
  return map[key] || key.charAt(0).toUpperCase() + key.slice(1);
}

function roleLabel(role, lang) {
  if (lang !== "ru") return role;
  return {
    Administrator: "Администратор",
    Dispatcher: "Диспетчер",
    Mentor: "Ментор",
    Technician: "Техник",
    "Sales Manager": "Менеджер продаж",
    Customer: "Клиент"
  }[role] || role;
}
