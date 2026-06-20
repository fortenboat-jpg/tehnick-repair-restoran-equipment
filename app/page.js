"use client";

import { useState } from "react";
import { ArrowRight, Building2, CheckCircle2, Languages, Mail, MapPin, Phone, Send, Wrench } from "lucide-react";
import { businessTypes, equipmentTypes, leadSources } from "./data";

const copy = {
  en: {
    lang: "Русский",
    navServices: "Services",
    navCustomers: "Customers",
    navCrm: "CRM",
    title: "Forten Commercial Equipment Services",
    tagline: "Commercial Kitchen Equipment Repair & Maintenance",
    hero: "Fast, organized service for restaurants and commercial kitchens: diagnostics, flat-rate estimates, work orders, invoices, and equipment history in one Forten platform.",
    request: "Request service",
    openCrm: "Open CRM",
    baseDiagnostic: "base diagnostic",
    servicesTitle: "Equipment We Service",
    customersTitle: "Built For",
    formTitle: "New Service Request",
    formHint: "The request is saved for the CRM and sent to Telegram when the bot variables are configured.",
    success: "Request received. Forten will contact you soon.",
    error: "Saved locally. Telegram notification is not configured or unavailable.",
    businessName: "Business name",
    contact: "Contact person",
    phone: "Phone",
    email: "Email",
    address: "Service address",
    businessType: "Business type",
    equipment: "Equipment",
    urgency: "Urgency",
    issue: "Issue",
    notes: "Notes",
    source: "Lead source",
    submit: "Send request",
    proof: ["Flat-rate repair estimates", "Bilingual RU/EN customer documents", "Equipment history for every customer"],
    urgencyOptions: ["Emergency", "Same day", "This week", "Preventive maintenance"],
    serviceText: {
      "Refrigeration equipment": "Walk-ins, reach-ins, prep tables, ice machines, freezers.",
      "Cooking equipment": "Fryers, ovens, ranges, griddles, grills and holding equipment.",
      "Food preparation": "Mixers, slicers, processors and prep-line equipment.",
      Warewashing: "Dishwashers, glasswashers, boosters and wash systems.",
      "Beverage equipment": "Coffee, beverage, ice and bar support equipment.",
      "Preventive maintenance": "Scheduled inspections, cleaning, calibration and service plans."
    },
    targetCustomers: ["Restaurants", "Cafes", "Bakeries", "Bars", "Food trucks", "Farms", "Hotels", "Grocery stores", "Commercial kitchens"]
  },
  ru: {
    lang: "English",
    navServices: "Услуги",
    navCustomers: "Клиенты",
    navCrm: "CRM",
    title: "Forten Commercial Equipment Services",
    tagline: "Ремонт и обслуживание коммерческого кухонного оборудования",
    hero: "Быстрый и организованный сервис для ресторанов и коммерческих кухонь: диагностика, фиксированные сметы, наряды, счета и история оборудования в одной платформе Forten.",
    request: "Оставить заявку",
    openCrm: "Открыть CRM",
    baseDiagnostic: "базовая диагностика",
    servicesTitle: "Оборудование, которое мы обслуживаем",
    customersTitle: "Для кого",
    formTitle: "Новая заявка на сервис",
    formHint: "Заявка сохраняется для CRM и отправляется в Telegram, если переменные бота настроены.",
    success: "Заявка получена. Forten скоро свяжется с вами.",
    error: "Заявка сохранена локально. Telegram не настроен или временно недоступен.",
    businessName: "Название бизнеса",
    contact: "Контактное лицо",
    phone: "Телефон",
    email: "Email",
    address: "Адрес обслуживания",
    businessType: "Тип бизнеса",
    equipment: "Оборудование",
    urgency: "Срочность",
    issue: "Проблема",
    notes: "Заметки",
    source: "Источник лида",
    submit: "Отправить заявку",
    proof: ["Сметы ремонта по фиксированной цене", "Документы для клиента на RU/EN", "История оборудования для каждого клиента"],
    urgencyOptions: ["Срочно", "Сегодня", "На этой неделе", "Плановое обслуживание"],
    serviceText: {
      "Refrigeration equipment": "Холодильные камеры, шкафы, prep table, льдогенераторы, морозильники.",
      "Cooking equipment": "Фритюрницы, печи, плиты, грили и тепловое оборудование.",
      "Food preparation": "Миксеры, слайсеры, процессоры и оборудование подготовки.",
      Warewashing: "Посудомоечные машины, стаканомойки, бойстеры и моечные системы.",
      "Beverage equipment": "Кофе, напитки, лед и оборудование бара.",
      "Preventive maintenance": "Плановые проверки, очистка, калибровка и сервисные планы."
    },
    targetCustomers: ["Рестораны", "Кафе", "Пекарни", "Бары", "Фудтраки", "Фермы", "Отели", "Продуктовые магазины", "Коммерческие кухни"]
  }
};

const serviceLabels = {
  en: {
    "Refrigeration equipment": "Refrigeration equipment",
    "Cooking equipment": "Cooking equipment",
    "Food preparation": "Food preparation",
    Warewashing: "Warewashing",
    "Beverage equipment": "Beverage equipment",
    "Preventive maintenance": "Preventive maintenance"
  },
  ru: {
    "Refrigeration equipment": "Холодильное оборудование",
    "Cooking equipment": "Тепловое оборудование",
    "Food preparation": "Подготовка продуктов",
    Warewashing: "Моечное оборудование",
    "Beverage equipment": "Оборудование для напитков",
    "Preventive maintenance": "Профилактическое обслуживание"
  }
};

export default function HomePage() {
  const [lang, setLang] = useState("en");
  const [message, setMessage] = useState("");
  const t = copy[lang];
  const [form, setForm] = useState({
    businessName: "",
    contact: "",
    phone: "",
    email: "",
    address: "",
    businessType: businessTypes[0],
    equipment: equipmentTypes[0],
    urgency: t.urgencyOptions[1],
    issue: "",
    notes: "",
    source: "Website",
    status: "New Lead"
  });

  function update(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submitLead(event) {
    event.preventDefault();
    const lead = { ...form, id: `lead-${Date.now()}`, createdAt: new Date().toISOString().slice(0, 10) };
    const stored = JSON.parse(localStorage.getItem("fortenLeads") || "[]");
    localStorage.setItem("fortenLeads", JSON.stringify([lead, ...stored]));

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead)
      });
      setMessage(response.ok ? t.success : t.error);
    } catch {
      setMessage(t.error);
    }
  }

  return (
    <main className="siteShell">
      <header className="siteNav">
        <a className="brand" href="/">
          <span className="mark">F</span>
          <span><strong>FORTEN</strong><small>{t.tagline}</small></span>
        </a>
        <nav>
          <a href="#services">{t.navServices}</a>
          <a href="#customers">{t.navCustomers}</a>
          <a href="/crm">{t.navCrm}</a>
          <button onClick={() => setLang(lang === "en" ? "ru" : "en")}><Languages size={17} />{t.lang}</button>
        </nav>
      </header>

      <section className="heroBand">
        <div className="heroCopy">
          <p className="eyebrow">{t.tagline}</p>
          <h1>{t.title}</h1>
          <p>{t.hero}</p>
          <div className="heroActions">
            <a className="primary" href="#lead-form">{t.request}<ArrowRight size={18} /></a>
            <a className="secondary" href="/crm">{t.openCrm}</a>
          </div>
          <div className="proofRow">
            {t.proof.map((item) => <span key={item}><CheckCircle2 size={16} />{item}</span>)}
          </div>
        </div>
        <div className="kitchenPanel">
          <div className="panelTop"><Wrench size={24} /><span>24/7</span></div>
          <div className="gauge"><span>159</span><small>{t.baseDiagnostic}</small></div>
          <div className="miniCards">
            <span>PDF</span><span>CRM</span><span>WO</span><span>INV</span>
          </div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="sectionHead">
          <p className="eyebrow">Forten</p>
          <h2>{t.servicesTitle}</h2>
        </div>
        <div className="serviceGrid">
          {equipmentTypes.map((service) => (
            <article className="serviceCard" key={service}>
              <Wrench size={24} />
              <h3>{serviceLabels[lang][service]}</h3>
              <p>{t.serviceText[service]}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="customers" className="section split">
        <div>
          <p className="eyebrow">CRM-ready</p>
          <h2>{t.customersTitle}</h2>
        </div>
        <div className="customerChips">
          {t.targetCustomers.map((customer) => <span key={customer}><Building2 size={16} />{customer}</span>)}
        </div>
      </section>

      <section id="lead-form" className="leadSection">
        <div>
          <p className="eyebrow">Lead intake</p>
          <h2>{t.formTitle}</h2>
          <p>{t.formHint}</p>
          <div className="contactLine"><Phone size={17} /> <span>(813) 555-0101</span></div>
          <div className="contactLine"><Mail size={17} /> <span>service@forten.example</span></div>
          <div className="contactLine"><MapPin size={17} /> <span>Tampa Bay commercial service area</span></div>
        </div>
        <form className="leadForm" onSubmit={submitLead}>
          <Field label={t.businessName} value={form.businessName} onChange={(v) => update("businessName", v)} required />
          <Field label={t.contact} value={form.contact} onChange={(v) => update("contact", v)} required />
          <Field label={t.phone} value={form.phone} onChange={(v) => update("phone", v)} required />
          <Field label={t.email} type="email" value={form.email} onChange={(v) => update("email", v)} />
          <Field label={t.address} value={form.address} onChange={(v) => update("address", v)} />
          <Select label={t.businessType} value={form.businessType} options={businessTypes} onChange={(v) => update("businessType", v)} />
          <Select label={t.equipment} value={form.equipment} options={equipmentTypes} labels={serviceLabels[lang]} onChange={(v) => update("equipment", v)} />
          <Select label={t.urgency} value={form.urgency} options={t.urgencyOptions} onChange={(v) => update("urgency", v)} />
          <Select label={t.source} value={form.source} options={leadSources} onChange={(v) => update("source", v)} />
          <div className="full"><label>{t.issue}</label><textarea value={form.issue} onChange={(e) => update("issue", e.target.value)} required /></div>
          <div className="full"><label>{t.notes}</label><textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} /></div>
          <button className="submitLead" type="submit"><Send size={18} />{t.submit}</button>
          {message && <p className="formMessage">{message}</p>}
        </form>
      </section>
    </main>
  );
}

function Field({ label, value, onChange, type = "text", required = false }) {
  return <div><label>{label}</label><input required={required} type={type} value={value} onChange={(event) => onChange(event.target.value)} /></div>;
}

function Select({ label, value, options, labels, onChange }) {
  return (
    <div>
      <label>{label}</label>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option} value={option}>{labels?.[option] || option}</option>)}
      </select>
    </div>
  );
}
