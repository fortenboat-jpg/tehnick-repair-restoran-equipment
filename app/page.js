"use client";

import { useState } from "react";
import { ArrowRight, Building2, CheckCircle2, Clock, Languages, Mail, MapPin, Phone, Send, ShieldCheck, Wrench } from "lucide-react";
import { businessTypes, equipmentTypes } from "./data";

const copy = {
  en: {
    lang: "Русский",
    nav: { services: "Services", equipment: "Equipment", industries: "Industries", about: "About", contact: "Contact", request: "Request Service" },
    title: "Forten Commercial Equipment Services",
    tagline: "Commercial Kitchen Equipment Repair & Maintenance",
    hero: "Reliable repair and maintenance for restaurants, cafes, hotels, grocery stores, bakeries, food trucks, and commercial kitchens.",
    request: "Request service",
    call: "Call Forten",
    servicesTitle: "Commercial Kitchen Repair Services",
    equipmentTitle: "Equipment Categories",
    industriesTitle: "Industries Served",
    whyTitle: "Why Forten",
    formTitle: "Request Service",
    formHint: "Tell us what is happening. Forten will contact you to schedule diagnostics and prepare a fast estimate after inspection.",
    success: "Request received. Forten will contact you soon.",
    error: "Request saved locally. Telegram notification is not configured or unavailable.",
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
    submit: "Send request",
    trust: ["24/7 Emergency Service", "Diagnostics from $159", "Commercial Kitchen Equipment Repair", "Licensed/Insured placeholder", "Fast Estimate After Diagnostic"],
    urgencyOptions: ["Emergency", "Same day", "This week", "Preventive maintenance"],
    serviceCards: [
      ["Refrigeration", "Walk-ins, reach-ins, prep tables, freezers, ice machines."],
      ["Cooking", "Fryers, ovens, ranges, griddles, grills, and hot holding."],
      ["Food preparation", "Mixers, slicers, processors, prep-line equipment."],
      ["Warewashing", "Dishwashers, glasswashers, boosters, and wash systems."],
      ["Beverage", "Coffee, beverage, ice, and bar support equipment."],
      ["Preventive maintenance", "Scheduled checks, cleaning, calibration, and service plans."]
    ],
    why: ["Flat-rate estimates after diagnostic", "Clear warranty and repair scope", "Commercial kitchen focus", "Organized equipment service history"],
    contactLines: ["Tampa Bay commercial service area", "service@forten.example", "(813) 555-0101"]
    ,
    eyebrow: { services: "Forten", equipment: "Equipment", industries: "Industries", about: "Forten", request: "Service request" }
  },
  ru: {
    lang: "English",
    nav: { services: "Услуги", equipment: "Оборудование", industries: "Отрасли", about: "О компании", contact: "Контакты", request: "Заявка" },
    title: "Forten Commercial Equipment Services",
    tagline: "Ремонт и обслуживание коммерческого кухонного оборудования",
    hero: "Надежный ремонт и обслуживание для ресторанов, кафе, отелей, продуктовых магазинов, пекарен, фудтраков и коммерческих кухонь.",
    request: "Оставить заявку",
    call: "Позвонить Forten",
    servicesTitle: "Сервис коммерческого кухонного оборудования",
    equipmentTitle: "Категории оборудования",
    industriesTitle: "Кого мы обслуживаем",
    whyTitle: "Почему Forten",
    formTitle: "Заявка на сервис",
    formHint: "Опишите проблему. Forten свяжется с вами, назначит диагностику и подготовит быструю смету после осмотра.",
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
    submit: "Отправить заявку",
    trust: ["Экстренный сервис 24/7", "Диагностика от $159", "Ремонт коммерческой кухни", "Лицензия/страховка: место для данных", "Быстрая смета после диагностики"],
    urgencyOptions: ["Срочно", "Сегодня", "На этой неделе", "Плановое обслуживание"],
    serviceCards: [
      ["Холодильное оборудование", "Камеры, шкафы, prep table, морозильники, льдогенераторы."],
      ["Тепловое оборудование", "Фритюрницы, печи, плиты, грили и тепловые линии."],
      ["Подготовка продуктов", "Миксеры, слайсеры, процессоры и prep-линии."],
      ["Моечное оборудование", "Посудомоечные машины, стаканомойки, бойстеры и моечные системы."],
      ["Оборудование для напитков", "Кофе, напитки, лед и оборудование бара."],
      ["Профилактика", "Плановые проверки, очистка, калибровка и сервисные планы."]
    ],
    why: ["Фиксированная смета после диагностики", "Понятная гарантия и объем работ", "Фокус на коммерческих кухнях", "Организованная история обслуживания"],
    contactLines: ["Коммерческий сервис в Tampa Bay", "service@forten.example", "(813) 555-0101"],
    eyebrow: { services: "Forten", equipment: "Оборудование", industries: "Отрасли", about: "Forten", request: "Заявка на сервис" }
  }
};

const equipmentLabels = {
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

const businessLabels = {
  en: Object.fromEntries(businessTypes.map((item) => [item, item])),
  ru: {
    Restaurant: "Ресторан",
    Cafe: "Кафе",
    Bakery: "Пекарня",
    Bar: "Бар",
    "Food truck": "Фудтрак",
    Farm: "Ферма",
    Hotel: "Отель",
    "Grocery store": "Продуктовый магазин",
    "Commercial kitchen": "Коммерческая кухня"
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

  function switchLang() {
    const nextLang = lang === "en" ? "ru" : "en";
    setLang(nextLang);
    setForm((current) => ({ ...current, urgency: copy[nextLang].urgencyOptions[1] }));
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
          <a href="#services">{t.nav.services}</a>
          <a href="#equipment">{t.nav.equipment}</a>
          <a href="#industries">{t.nav.industries}</a>
          <a href="#about">{t.nav.about}</a>
          <a href="#contact">{t.nav.contact}</a>
          <a href="#lead-form">{t.nav.request}</a>
          <button onClick={switchLang}><Languages size={17} />{t.lang}</button>
        </nav>
      </header>

      <section className="heroBand">
        <div className="heroCopy">
          <p className="eyebrow">{t.tagline}</p>
          <h1>{t.title}</h1>
          <p>{t.hero}</p>
          <div className="heroActions">
            <a className="primary" href="#lead-form">{t.request}<ArrowRight size={18} /></a>
            <a className="secondary" href="tel:+18135550101"><Phone size={17} />{t.call}</a>
          </div>
          <div className="proofRow">
            {t.trust.slice(0, 3).map((item) => <span key={item}><CheckCircle2 size={16} />{item}</span>)}
          </div>
        </div>
        <div className="kitchenPanel">
          <div className="panelTop"><Clock size={24} /><span>24/7</span></div>
          <div className="gauge"><span>159</span><small>{lang === "ru" ? "диагностика от" : "diagnostics from"}</small></div>
          <div className="trustStack">
            {t.trust.map((item, index) => <span key={item}>{index === 3 ? <ShieldCheck size={17} /> : <Wrench size={17} />}{item}</span>)}
          </div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="sectionHead"><p className="eyebrow">{t.eyebrow.services}</p><h2>{t.servicesTitle}</h2></div>
        <div className="serviceGrid">{t.serviceCards.map(([title, text]) => <article className="serviceCard" key={title}><Wrench size={24} /><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section id="equipment" className="section split">
        <div><p className="eyebrow">{t.eyebrow.equipment}</p><h2>{t.equipmentTitle}</h2></div>
        <div className="customerChips">{equipmentTypes.map((item) => <span key={item}><Wrench size={16} />{equipmentLabels[lang][item]}</span>)}</div>
      </section>

      <section id="industries" className="section split">
        <div><p className="eyebrow">{t.eyebrow.industries}</p><h2>{t.industriesTitle}</h2></div>
        <div className="customerChips">{businessTypes.map((item) => <span key={item}><Building2 size={16} />{businessLabels[lang][item]}</span>)}</div>
      </section>

      <section id="about" className="section split">
        <div><p className="eyebrow">{t.eyebrow.about}</p><h2>{t.whyTitle}</h2></div>
        <div className="serviceGrid compactGrid">{t.why.map((item) => <article className="serviceCard" key={item}><CheckCircle2 size={22} /><h3>{item}</h3></article>)}</div>
      </section>

      <section id="lead-form" className="leadSection">
        <div id="contact">
          <p className="eyebrow">{t.eyebrow.request}</p>
          <h2>{t.formTitle}</h2>
          <p>{t.formHint}</p>
          <div className="contactLine"><MapPin size={17} /> <span>{t.contactLines[0]}</span></div>
          <div className="contactLine"><Mail size={17} /> <span>{t.contactLines[1]}</span></div>
          <div className="contactLine"><Phone size={17} /> <span>{t.contactLines[2]}</span></div>
        </div>
        <form className="leadForm" onSubmit={submitLead}>
          <Field label={t.businessName} value={form.businessName} onChange={(v) => update("businessName", v)} required />
          <Field label={t.contact} value={form.contact} onChange={(v) => update("contact", v)} required />
          <Field label={t.phone} value={form.phone} onChange={(v) => update("phone", v)} required />
          <Field label={t.email} type="email" value={form.email} onChange={(v) => update("email", v)} />
          <Field label={t.address} value={form.address} onChange={(v) => update("address", v)} />
          <Select label={t.businessType} value={form.businessType} options={businessTypes} labels={businessLabels[lang]} onChange={(v) => update("businessType", v)} />
          <Select label={t.equipment} value={form.equipment} options={equipmentTypes} labels={equipmentLabels[lang]} onChange={(v) => update("equipment", v)} />
          <Select label={t.urgency} value={form.urgency} options={t.urgencyOptions} onChange={(v) => update("urgency", v)} />
          <div className="full"><label>{t.issue}</label><textarea value={form.issue} onChange={(event) => update("issue", event.target.value)} required /></div>
          <div className="full"><label>{t.notes}</label><textarea value={form.notes} onChange={(event) => update("notes", event.target.value)} /></div>
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
  return <div><label>{label}</label><select value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option} value={option}>{labels?.[option] || option}</option>)}</select></div>;
}
