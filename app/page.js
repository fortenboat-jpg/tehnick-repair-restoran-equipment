"use client";

import { useState } from "react";
import {
  ArrowRight,
  Building2,
  Camera,
  CheckCircle2,
  Clock,
  Coffee,
  Flame,
  HelpCircle,
  Languages,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Snowflake,
  Utensils,
  WashingMachine,
  Wrench
} from "lucide-react";
import { businessTypes, equipmentTypes } from "./data";

const serviceVisuals = [
  { Icon: Snowflake, en: "Walk-in cooler / freezer", ru: "Walk-in cooler / freezer" },
  { Icon: Flame, en: "Fryer / oven / griddle", ru: "Фритюр / печь / griddle" },
  { Icon: Utensils, en: "Mixer / slicer / prep table", ru: "Миксер / слайсер / prep table" },
  { Icon: WashingMachine, en: "Commercial dishwasher", ru: "Посудомоечная машина" },
  { Icon: Coffee, en: "Ice / beverage / espresso", ru: "Лед / напитки / эспрессо" },
  { Icon: Wrench, en: "Technician diagnostics", ru: "Диагностика техника" }
];

const copy = {
  en: {
    lang: "Русский",
    nav: { services: "Services", equipment: "Equipment", process: "Process", faq: "FAQ", contact: "Contact", request: "Request Service" },
    title: "Commercial kitchen equipment repair that keeps service moving.",
    company: "Forten Commercial Equipment Services",
    tagline: "Commercial Kitchen Equipment Repair & Maintenance",
    hero: "Premium restaurant equipment repair for Tampa Bay and Central Florida: refrigeration, cooking, warewashing, food prep, beverage equipment, diagnostics, quotes, and repairs.",
    request: "Request Service",
    call: "Call Now",
    heroStats: ["24/7 Emergency Service", "Diagnostics from $159", "Fast quote after inspection"],
    servicesTitle: "Repair service for every critical station",
    servicesIntro: "From a warm walk-in cooler to a fryer that will not hold temperature, Forten handles the equipment your kitchen depends on.",
    equipmentTitle: "Equipment We Service",
    processTitle: "How Service Works",
    emergencyTitle: "Emergency kitchen equipment down?",
    emergencyText: "Send a request now. We prioritize refrigeration failures, cooking line outages, warewashing problems, and equipment issues that stop service.",
    inspectionTitle: "Diagnostics with clear visual documentation",
    trustTitle: "Why restaurant operators call Forten",
    faqTitle: "Common Questions",
    formTitle: "Request Commercial Equipment Service",
    formHint: "Tell us what equipment failed and how urgent it is. Forten will contact you to schedule diagnostics and prepare a clear repair quote after inspection.",
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
    issue: "What is happening?",
    notes: "Access notes or preferred time",
    submit: "Send request",
    urgencyOptions: ["Emergency", "Same day", "This week", "Preventive maintenance"],
    serviceCards: [
      ["Refrigeration repair", "Walk-in coolers, freezers, reach-ins, prep tables, ice machines.", "Protect food safety and get temperatures back under control."],
      ["Cooking equipment", "Fryers, ovens, ranges, griddles, grills, hot holding.", "Keep the line running with clear diagnostics and repair plans."],
      ["Food preparation", "Mixers, slicers, processors, prep-line equipment.", "Restore prep speed and reduce downtime before service."],
      ["Warewashing", "Dishwashers, glasswashers, boosters, pumps, wash systems.", "Fix sanitation-critical equipment with practical repair options."],
      ["Beverage equipment", "Coffee, beverage, ice, and bar support equipment.", "Support bars, cafes, hotels, and high-volume service counters."],
      ["Preventive maintenance", "Cleaning, inspection, calibration, and recurring service plans.", "Catch failures early and extend equipment life."]
    ],
    process: ["Request", "Technician Visit", "Mentor Diagnosis", "Quote", "Payment", "Repair"],
    inspections: [
      ["Before inspection", "Photos and readings document the issue before repair."],
      ["Diagnostic findings", "Temperature, pressure, voltage, and technician notes are captured."],
      ["After repair", "Repair result and warranty notes are documented for the customer."]
    ],
    trust: ["Commercial kitchen focus", "Flat-rate quote after diagnostic", "Clear scope, parts, materials, warranty", "Tampa Bay / Central Florida service", "Emergency response for critical failures", "Organized service history for repeat customers"],
    faq: [
      ["What equipment do you repair?", "Refrigeration, cooking equipment, food prep, warewashing, beverage equipment, and preventive maintenance for commercial kitchens."],
      ["How much is diagnostics?", "Base diagnostic pricing starts at $159. The repair quote is prepared after inspection."],
      ["Do you offer emergency service?", "Yes. Emergency requests are prioritized for equipment failures that stop service or risk product loss."],
      ["Do you give hourly pricing?", "Forten prefers clear flat-rate repair quotes after diagnostics instead of open-ended hourly estimates."]
    ],
    contactLines: ["Tampa Bay / Central Florida", "service@forten.example", "(813) 555-0101"]
    ,
    tags: { services: "Forten Service", equipment: "Equipment", process: "Service Flow", emergency: "Emergency Service", documentation: "Documentation", trust: "Trust", contact: "Contact" },
    heroVisual: ["Walk-in cooler", "Reach-in cooler", "Compressor access", "Control board"],
    inspectionVisuals: ["Compressor / fan motor", "Control board readings", "Before / after repair"]
  },
  ru: {
    lang: "English",
    nav: { services: "Услуги", equipment: "Оборудование", process: "Процесс", faq: "FAQ", contact: "Контакты", request: "Заявка" },
    title: "Ремонт коммерческого кухонного оборудования, чтобы сервис не останавливался.",
    company: "Forten Commercial Equipment Services",
    tagline: "Ремонт и обслуживание коммерческого кухонного оборудования",
    hero: "Премиальный сервис для ресторанного оборудования в Tampa Bay и Central Florida: холодильное, тепловое, моечное, подготовка продуктов, напитки, диагностика, сметы и ремонт.",
    request: "Оставить заявку",
    call: "Позвонить",
    heroStats: ["Экстренный сервис 24/7", "Диагностика от $159", "Быстрая смета после осмотра"],
    servicesTitle: "Ремонт для каждой важной зоны кухни",
    servicesIntro: "Если Walk-in cooler греется, фритюрница не держит температуру или посудомойка остановилась, Forten помогает вернуть кухню в работу.",
    equipmentTitle: "Оборудование, которое мы обслуживаем",
    processTitle: "Как проходит сервис",
    emergencyTitle: "Оборудование остановило кухню?",
    emergencyText: "Оставьте заявку сейчас. Мы приоритизируем поломки холодильного оборудования, тепловой линии, моечной зоны и любые неисправности, которые мешают сервису.",
    inspectionTitle: "Диагностика с понятной визуальной фиксацией",
    trustTitle: "Почему операторы ресторанов выбирают Forten",
    faqTitle: "Частые вопросы",
    formTitle: "Заявка на сервис коммерческого оборудования",
    formHint: "Опишите, какое оборудование не работает и насколько срочно нужен сервис. Forten свяжется с вами, назначит диагностику и подготовит понятную смету после осмотра.",
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
    issue: "Что произошло?",
    notes: "Доступ к объекту или удобное время",
    submit: "Отправить заявку",
    urgencyOptions: ["Срочно", "Сегодня", "На этой неделе", "Плановое обслуживание"],
    serviceCards: [
      ["Холодильное оборудование", "Walk-in cooler, морозильники, шкафы, prep table, льдогенераторы.", "Вернуть температуру в норму и защитить продукты."],
      ["Тепловое оборудование", "Фритюрницы, печи, плиты, griddle, грили, тепловые шкафы.", "Стабилизировать линию с понятной диагностикой и планом ремонта."],
      ["Подготовка продуктов", "Миксеры, слайсеры, процессоры и prep-линии.", "Сократить простой и восстановить скорость подготовки."],
      ["Моечное оборудование", "Посудомоечные машины, стаканомойки, бойстеры, насосы.", "Ремонт критичного санитарного оборудования."],
      ["Оборудование для напитков", "Кофе, напитки, лед и оборудование бара.", "Поддержка баров, кафе, отелей и сервисных стоек."],
      ["Профилактика", "Очистка, проверка, калибровка и регулярные сервисные планы.", "Раннее выявление проблем и продление срока службы."]
    ],
    process: ["Заявка", "Визит техника", "Диагностика ментора", "Смета", "Оплата", "Ремонт"],
    inspections: [
      ["До осмотра", "Фото и показания фиксируют проблему до ремонта."],
      ["Результаты диагностики", "Температура, давление, напряжение и заметки техника сохраняются."],
      ["После ремонта", "Результат ремонта и гарантийные заметки фиксируются для клиента."]
    ],
    trust: ["Фокус на коммерческих кухнях", "Фиксированная смета после диагностики", "Понятный объем работ, запчасти, материалы и гарантия", "Сервис Tampa Bay / Central Florida", "Экстренная реакция на критичные поломки", "История обслуживания для постоянных клиентов"],
    faq: [
      ["Какое оборудование вы ремонтируете?", "Холодильное, тепловое, подготовку продуктов, моечное оборудование, оборудование для напитков и профилактическое обслуживание коммерческих кухонь."],
      ["Сколько стоит диагностика?", "Базовая диагностика начинается от $159. Смета на ремонт готовится после осмотра."],
      ["Есть ли экстренный сервис?", "Да. Срочные заявки получают приоритет, если поломка останавливает сервис или создает риск потери продуктов."],
      ["Вы работаете по часам?", "Forten предпочитает понятные фиксированные сметы после диагностики вместо открытой почасовой оценки."]
    ],
    contactLines: ["Tampa Bay / Central Florida", "service@forten.example", "(813) 555-0101"]
    ,
    tags: { services: "Сервис Forten", equipment: "Оборудование", process: "Процесс сервиса", emergency: "Срочный сервис", documentation: "Документация", trust: "Доверие", contact: "Контакты" },
    heroVisual: ["Walk-in cooler", "Reach-in cooler", "Доступ к компрессору", "Плата управления"],
    inspectionVisuals: ["Компрессор / мотор вентилятора", "Показания платы управления", "До / после ремонта"]
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

const equipmentIcons = [Snowflake, Flame, Utensils, WashingMachine, Coffee, Wrench];

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
          <a href="#process">{t.nav.process}</a>
          <a href="#faq">{t.nav.faq}</a>
          <a href="#contact">{t.nav.contact}</a>
          <a href="#lead-form">{t.nav.request}</a>
          <button onClick={switchLang}><Languages size={17} />{t.lang}</button>
        </nav>
      </header>

      <section className="heroBand publicHero">
        <div className="heroCopy">
          <p className="eyebrow">{t.company}</p>
          <h1>{t.title}</h1>
          <p>{t.hero}</p>
          <div className="heroActions">
            <a className="primary" href="#lead-form">{t.request}<ArrowRight size={18} /></a>
            <a className="secondary" href="tel:+18135550101"><Phone size={17} />{t.call}</a>
          </div>
          <div className="heroStatRow">
            {t.heroStats.map((item) => <span key={item}><CheckCircle2 size={17} />{item}</span>)}
          </div>
        </div>
        <div className="heroVisualPanel">
          <div className="heroPhotoFrame">
            <div className="heroPhotoBadge"><Clock size={18} />24/7</div>
            <div className="coolerCabinet">
              <span>{t.heroVisual[0]}</span>
              <span>{t.heroVisual[1]}</span>
            </div>
            <div className="serviceAccessPanel">
              <Wrench size={22} />
              <span>{t.heroVisual[2]}</span>
            </div>
            <div className="controlBoardCard">
              <span>{t.heroVisual[3]}</span>
              <i /><i /><i />
            </div>
          </div>
          <div className="diagnosticCard">
            <strong>$159</strong>
            <span>{lang === "ru" ? "диагностика от" : "diagnostics from"}</span>
          </div>
        </div>
      </section>

      <section id="services" className="section imageSection">
        <div className="sectionIntro">
          <p className="eyebrow">{t.tags.services}</p>
          <h2>{t.servicesTitle}</h2>
          <p>{t.servicesIntro}</p>
        </div>
        <div className="serviceImageGrid">
          {t.serviceCards.map(([title, text, detail], index) => (
            <article className="imageServiceCard" key={title}>
              <div className={`cardMedia equipmentMedia media-${index}`}>
                {(() => {
                  const Icon = serviceVisuals[index]?.Icon || Wrench;
                  return <Icon size={38} />;
                })()}
                <span>{serviceVisuals[index]?.[lang]}</span>
              </div>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
                <span>{detail}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="equipment" className="section equipmentShowcase">
        <div className="sectionIntro">
          <p className="eyebrow">{t.tags.equipment}</p>
          <h2>{t.equipmentTitle}</h2>
        </div>
        <div className="equipmentGrid">
          {equipmentTypes.map((item, index) => {
            const Icon = equipmentIcons[index] || Wrench;
            return <article className="equipmentTile" key={item}><Icon size={28} /><span>{equipmentLabels[lang][item]}</span></article>;
          })}
        </div>
      </section>

      <section id="process" className="section processSection">
        <div className="sectionIntro">
          <p className="eyebrow">{t.tags.process}</p>
          <h2>{t.processTitle}</h2>
        </div>
        <div className="processRail">
          {t.process.map((step, index) => <article className="processStep" key={step}><b>{index + 1}</b><span>{step}</span></article>)}
        </div>
      </section>

      <section className="emergencyBand">
        <div>
          <p className="eyebrow">{t.tags.emergency}</p>
          <h2>{t.emergencyTitle}</h2>
          <p>{t.emergencyText}</p>
        </div>
        <a className="primary" href="#lead-form">{t.request}<ArrowRight size={18} /></a>
      </section>

      <section className="section inspectionSection">
        <div className="sectionIntro">
          <p className="eyebrow">{t.tags.documentation}</p>
          <h2>{t.inspectionTitle}</h2>
        </div>
        <div className="inspectionGrid">
          {t.inspections.map(([title, text], index) => <article className={`inspectionCard inspection-${index}`} key={title}><div><Camera size={24} /><span>{t.inspectionVisuals[index]}</span></div><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="section trustSection">
        <div className="sectionIntro">
          <p className="eyebrow">{t.tags.trust}</p>
          <h2>{t.trustTitle}</h2>
        </div>
        <div className="trustGrid">
          {t.trust.map((item) => <span key={item}><ShieldCheck size={18} />{item}</span>)}
        </div>
      </section>

      <section id="faq" className="section faqSection">
        <div className="sectionIntro">
          <p className="eyebrow">FAQ</p>
          <h2>{t.faqTitle}</h2>
        </div>
        <div className="faqGrid">
          {t.faq.map(([question, answer]) => <article className="faqItem" key={question}><HelpCircle size={22} /><h3>{question}</h3><p>{answer}</p></article>)}
        </div>
      </section>

      <section id="lead-form" className="leadSection contactShowcase">
        <div id="contact" className="contactPanel">
          <p className="eyebrow">{t.tags.contact}</p>
          <h2>{t.formTitle}</h2>
          <p>{t.formHint}</p>
          <div className="contactLine"><MapPin size={17} /> <span>{t.contactLines[0]}</span></div>
          <div className="contactLine"><Mail size={17} /> <span>{t.contactLines[1]}</span></div>
          <div className="contactLine"><Phone size={17} /> <span>{t.contactLines[2]}</span></div>
        </div>
        <form className="leadForm formPanel" onSubmit={submitLead}>
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
