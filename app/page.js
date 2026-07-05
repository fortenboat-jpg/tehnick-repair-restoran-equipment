"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Languages,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Star,
  TimerReset,
  Wrench
} from "lucide-react";
import { businessTypes, equipmentTypes } from "./data";
import {
  createWebsiteLead,
  storeWebsiteLeadAndTicket
} from "./leadStorage";

const heroImage = "/images/equipment/hero-commercial-kitchen.jpg?v=clean";
const logoImage = "/images/equipment/Logo.jpg?v=brand";
const businessPhoneDisplay = "(813) 444-2434";
const businessPhoneHref = "tel:+18134442434";

const serviceImages = [
  "/images/equipment/refrigeration.jpg",
  "/images/equipment/fryer.jpg",
  "/images/equipment/oven.jpg",
  "/images/equipment/griddle.jpg",
  "/images/equipment/ice-machine.jpg",
  "/images/equipment/dishwasher.jpg",
  "/images/equipment/hood-ventilation.jpg",
  "/images/equipment/rooftop-exhaust-fan.jpg",
  "/images/equipment/mixer-slicer.jpg",
  "/images/equipment/beverage.jpg",
  "/images/equipment/compressor.jpg",
  "/images/equipment/diagnostics.jpg",
  "/images/equipment/maintenance.jpg"
];

const copy = {
  en: {
    lang: "Русский",
    nav: ["Services", "Equipment", "Process", "FAQ", "Contact"],
    request: "Schedule Service",
    emergency: "Priority Dispatch",
    company: "Forten Commercial Equipment Services",
    heroBrandLine: "Commercial Equipment Services",
    kicker: "Commercial Kitchen Equipment Repair & Maintenance",
    title: "Commercial Restaurant Equipment Repair",
    heroTitleLines: ["Commercial", "Restaurant", "Equipment Repair"],
    subheadline: [
      "Commercial Refrigeration",
      "Cooking Equipment",
      "Ice Machines",
      "Walk-in Coolers",
      "Walk-in Freezers",
      "Dishwashers",
      "Mixers",
      "Hood & Ventilation",
      "Preventive Maintenance"
    ],
    heroBody: "Commercial kitchen equipment repair and maintenance for restaurants, cafes, bakeries, hotels, food trucks, grocery stores and commercial kitchens across Tampa Bay and Central Florida.",
    heroBadges: ["Priority Dispatch", "Fast Response", "Commercial Equipment Specialists"],
    stats: ["Dispatcher-Led Service", "Fast On-Site Diagnostics", "Commercial Equipment Specialists", "Tampa Bay & Central Florida"],
    servicesEyebrow: "Equipment repair categories",
    servicesTitle: "We repair the machines that keep service running.",
    servicesBody: "Every service category is focused on commercial restaurant equipment, from refrigeration failures to cooking line breakdowns and preventive maintenance.",
    serviceCards: [
      {
        title: "Commercial Refrigeration",
        equipment: "Walk-in cooler, reach-in cooler, display refrigerator",
        text: "Temperature issues, compressors, evaporators, fan motors, controls, doors, gaskets, and prep tables."
      },
      {
        title: "Commercial Fryers",
        equipment: "Gas fryer, electric fryer, high-volume commercial fryers",
        text: "Ignition, burners, thermostats, baskets, oil temperature issues, safety controls, and fryer line downtime."
      },
      {
        title: "Commercial Ovens",
        equipment: "Convection oven, combi oven, commercial oven",
        text: "Ovens, ranges, sensors, controls, fans, ignition systems, airflow problems, and inconsistent heat."
      },
      {
        title: "Grills & Charbroilers",
        equipment: "Flat top grill, griddle, charbroiler",
        text: "Uneven heat, burner failures, pilots, thermostats, gas valves, and surface temperature problems."
      },
      {
        title: "Ice Machines",
        equipment: "Commercial ice machine",
        text: "Low ice production, harvest cycle issues, water valves, sensors, pumps, cleaning, and sanitation problems."
      },
      {
        title: "Commercial Dishwashers",
        equipment: "Conveyor dishwasher, door dishwasher",
        text: "Wash pumps, rinse systems, boosters, heaters, leaks, drain issues, and warewashing temperature failures."
      },
      {
        title: "Hood Ventilation",
        equipment: "Commercial hood ventilation and make-up air",
        text: "Hood airflow issues, grease capture problems, make-up air concerns, and kitchen ventilation service coordination."
      },
      {
        title: "Rooftop Exhaust Fans",
        equipment: "Rooftop exhaust fan, upblast fan, belt drive",
        text: "Exhaust fan motors, belts, bearings, switches, vibration, airflow problems, and rooftop service documentation."
      },
      {
        title: "Food Preparation Equipment",
        equipment: "Commercial mixer, meat slicer, food processor",
        text: "Drive systems, belts, switches, guards, motors, attachments, slicer carriages, and prep production downtime."
      },
      {
        title: "Beverage Equipment",
        equipment: "Espresso machine, commercial beverage cooler",
        text: "Cafe equipment, beverage refrigeration, bar coolers, pumps, valves, temperature controls, and service counters."
      },
      {
        title: "HVAC & Refrigeration",
        equipment: "Compressors, condensers, evaporators",
        text: "Refrigeration racks, condenser units, evaporator coils, fan motors, capacitors, relays, and control boards."
      },
      {
        title: "Diagnostics",
        equipment: "Technician testing with multimeter",
        text: "Temperature, pressure, voltage, photos, videos, mentor review, root-cause notes, and clear repair planning."
      },
      {
        title: "Preventive Maintenance",
        equipment: "Technician servicing kitchen equipment",
        text: "Scheduled cleaning, inspection, calibration, wear checks, service history, and next-service recommendations."
      }
    ],
    processEyebrow: "How We Work",
    processTitle: "A clear field-service path from scheduling to follow-up support.",
    process: [
      ["Schedule Service", "Send equipment details, location, and preferred service time."],
      ["Dispatcher Review", "Your request enters the dispatch queue for review."],
      ["On-Site Diagnostics", "A technician inspects the unit and documents readings."],
      ["Quote Approval", "You approve a flat-rate estimate before repair work begins."],
      ["Professional Repair", "Repair is completed, documented, and backed by clear warranty terms."],
      ["Follow-Up Support", "Forten keeps service history organized for future visits."]
    ],
    coverageEyebrow: "Equipment coverage",
    coverageTitle: "We Service All Major Commercial Equipment Types",
    coverageText: "Forten works with commercial kitchen equipment across many manufacturers and configurations. If your restaurant, cafe, bakery, bar, hotel, grocery store, food truck, or commercial kitchen depends on it, we can diagnose and service it.",
    coverageCategories: ["Refrigeration", "Freezers", "Ice Machines", "Fryers", "Ovens", "Griddles", "Dishwashers", "Mixers", "Slicers", "Beverage Equipment", "Hood & Ventilation", "Preventive Maintenance"],
    emergencyTitle: "Equipment down during service?",
    emergencyText: "Refrigeration failures, no-heat fryers, ovens down, dish machines not sanitizing, and ice machines out of production are prioritized as urgent service requests.",
    whyEyebrow: "Why Forten",
    whyTitle: "Built for commercial kitchens, not household repair.",
    why: [
      "Fast Response",
      "Professional Diagnostics",
      "Commercial Equipment Specialists",
      "Preventive Maintenance",
      "Flat-Rate Estimates",
      "Restaurant Equipment Experts"
    ],
    reviewsEyebrow: "Customer reviews",
    reviewsTitle: "Operators need fast, clear answers.",
    reviews: [
      ["Restaurant Manager", "Forten documented the walk-in issue, explained the compressor problem, and gave us a clear quote before repair."],
      ["Bakery Owner", "Our mixer was down before morning production. The diagnostic was organized and the repair plan was easy to approve."],
      ["Hotel Food Service", "Professional communication, clear photos, and a clean invoice. Exactly what we need for commercial equipment service."]
    ],
    areaEyebrow: "Service area",
    areaTitle: "Service Areas",
    areaText: "Commercial kitchen equipment service across Tampa Bay, the Gulf Coast, and Central Florida.",
    serviceAreas: ["Tampa", "St. Petersburg", "Clearwater", "Brandon", "Wesley Chapel", "Lakeland", "Sarasota", "Orlando", "Central Florida"],
    faqTitle: "Common Questions",
    faq: [
      ["What equipment do you repair?", "Commercial refrigeration, cooking equipment, grills, ice machines, dishwashers, food prep, beverage equipment, and preventive maintenance."],
      ["How do diagnostics work?", "Forten performs fast on-site diagnostics and prepares a clear repair quote after inspection."],
      ["Do you prioritize urgent equipment failures?", "Yes. Critical failures that stop service or risk product loss are prioritized by dispatch."],
      ["Do you use hourly pricing?", "Forten uses clear flat-rate repair quotes after diagnostics whenever possible."]
    ],
    formTitle: "Schedule Commercial Equipment Service",
    formHint: "Tell us what failed, where the equipment is located, and how urgent the issue is.",
    success: "Your request has been received. A Forten dispatcher will contact you shortly.",
    error: "Request saved locally. Telegram notification is not configured or unavailable.",
    fields: {
      businessName: "Business name",
      contact: "Contact name",
      phone: "Phone",
      email: "Email",
      address: "Service address",
      businessType: "Business type",
      equipment: "Equipment type",
      brand: "Equipment brand",
      model: "Equipment model",
      urgency: "Urgency",
      issue: "Problem description",
      contactMethod: "Preferred contact method",
      notes: "Preferred service time",
      submit: "Schedule Service"
    },
    contactMethods: ["Phone", "Email"],
    confirmation: {
      title: "Thank You!",
      subtitle: "Your service request has been successfully received.",
      ticket: "Ticket Number",
      timeline: [
        "Your request has been received.",
        "It has been added to our dispatch queue.",
        "A dispatcher will review your request.",
        "We will contact you by phone or email shortly.",
        "Technician will be scheduled"
      ],
      nextTitle: "What happens next?",
      urgentTitle: "",
      phoneLabel: ""
    },
    urgencyOptions: ["Priority dispatch", "Same day", "This week", "Preventive maintenance"],
    contactLines: ["Tampa Bay & Central Florida", "service@forten.example", "(813) 444-2434"],
    footer: "Commercial Kitchen Equipment Repair & Maintenance"
  },
  ru: {
    lang: "English",
    nav: ["Услуги", "Оборудование", "Процесс", "Вопросы", "Контакты"],
    request: "Оставить заявку",
    emergency: "Приоритетная диспетчеризация",
    company: "Forten Commercial Equipment Services",
    heroBrandLine: "Сервис коммерческого оборудования",
    kicker: "Ремонт и обслуживание коммерческого кухонного оборудования",
    title: "Ремонт коммерческого ресторанного оборудования",
    heroTitleLines: ["Коммерческое", "Ресторанное", "Оборудование"],
    subheadline: [
      "Коммерческое холодильное оборудование",
      "Тепловое оборудование",
      "Льдогенераторы",
      "Walk-in coolers",
      "Walk-in freezers",
      "Посудомоечные машины",
      "Миксеры",
      "Вытяжка и вентиляция",
      "Профилактическое обслуживание"
    ],
    heroBody: "Ремонт и обслуживание коммерческого кухонного оборудования для ресторанов, кафе, пекарен, отелей, фудтраков, продуктовых магазинов и коммерческих кухонь в Tampa Bay и Central Florida.",
    heroBadges: ["Приоритетная диспетчеризация", "Быстрый отклик", "Специалисты по коммерческому оборудованию"],
    stats: ["Диспетчерская обработка", "Быстрая выездная диагностика", "Специалисты по коммерческому оборудованию", "Tampa Bay и Central Florida"],
    servicesEyebrow: "Категории ремонта",
    servicesTitle: "Мы ремонтируем оборудование, на котором держится сервис.",
    servicesBody: "Каждая категория сфокусирована на коммерческом ресторанном оборудовании: холодильные поломки, тепловая линия, мойка и профилактика.",
    serviceCards: [
      {
        title: "Коммерческое холодильное оборудование",
        equipment: "Walk-in cooler, reach-in cooler, витринный холодильник",
        text: "Температура, компрессоры, испарители, моторы вентиляторов, контроллеры, двери, уплотнители и prep tables."
      },
      {
        title: "Тепловое оборудование",
        equipment: "Фритюрница, коммерческая печь, convection oven",
        text: "Газовые и электрические фритюрницы, печи, плиты, пилоты, горелки, розжиг, датчики, термостаты и управление."
      },
      {
        title: "Грили и charbroilers",
        equipment: "Flat top grill, griddle, charbroiler",
        text: "Неровный нагрев, горелки, пилоты, термостаты, газовые клапаны и проблемы температуры поверхности."
      },
      {
        title: "Льдогенераторы",
        equipment: "Коммерческий ice machine",
        text: "Низкое производство льда, цикл сброса, клапаны воды, датчики, насосы, очистка и санитарные проблемы."
      },
      {
        title: "Коммерческие посудомоечные машины",
        equipment: "Conveyor dishwasher, door dishwasher",
        text: "Насосы мойки, ополаскивание, booster, нагреватели, протечки, слив и проблемы температуры мойки."
      },
      {
        title: "Оборудование подготовки продуктов",
        equipment: "Коммерческий миксер, meat slicer, food processor",
        text: "Приводы, ремни, выключатели, защита, моторы, насадки, каретки слайсеров и простой подготовки."
      },
      {
        title: "Оборудование для напитков",
        equipment: "Espresso machine, beverage cooler",
        text: "Кофейное оборудование, барное охлаждение, beverage coolers, насосы, клапаны, температурные контроллеры и стойки."
      },
      {
        title: "HVAC и холодильные системы",
        equipment: "Компрессоры, конденсаторы, испарители",
        text: "Холодильные racks, конденсаторные блоки, испарители, моторы вентиляторов, конденсаторы, реле и платы."
      },
      {
        title: "Диагностика",
        equipment: "Техник с мультиметром",
        text: "Температура, давление, напряжение, фото, видео, проверка ментором, причина поломки и понятный план ремонта."
      },
      {
        title: "Профилактическое обслуживание",
        equipment: "Техник обслуживает кухонное оборудование",
        text: "Плановая очистка, проверка, калибровка, контроль износа, история сервиса и рекомендации по следующему визиту."
      }
    ],
    processEyebrow: "Как мы работаем",
    processTitle: "Понятный путь от заявки до ремонта с гарантией.",
    process: [
      ["Заявка на сервис", "Вы отправляете оборудование, адрес и удобное время."],
      ["Визит техника", "Техник осматривает оборудование и фиксирует показания."],
      ["Быстрая диагностика", "Результаты оформляются в понятный план ремонта."],
      ["Одобрение сметы", "Вы утверждаете фиксированную смету до начала ремонта."],
      ["Ремонт и гарантия", "Ремонт выполняется, документируется и сопровождается условиями гарантии."]
    ],
    coverageEyebrow: "Охват оборудования",
    coverageTitle: "Мы обслуживаем все основные виды коммерческого оборудования",
    coverageText: "Forten работает с коммерческим кухонным оборудованием разных производителей и конфигураций. Если от этого оборудования зависит работа вашего ресторана, кафе, пекарни, бара, отеля, магазина, фудтрака или коммерческой кухни — мы можем провести диагностику и обслуживание.",
    coverageCategories: ["Холодильное оборудование", "Морозильники", "Льдогенераторы", "Фритюрницы", "Печи", "Грили и griddles", "Посудомоечные машины", "Миксеры", "Слайсеры", "Оборудование для напитков", "Вытяжка и вентиляция", "Профилактическое обслуживание"],
    emergencyTitle: "Оборудование остановило сервис?",
    emergencyText: "Поломки холодильного оборудования, фритюрницы без нагрева, печи в простое, посудомойки без санитарной температуры и льдогенераторы без льда получают приоритет.",
    whyEyebrow: "Почему Forten",
    whyTitle: "Сервис для коммерческих кухонь, а не бытовой ремонт.",
    why: [
      "Быстрый выезд",
      "Фиксированные сметы",
      "Диагностика с поддержкой ментора",
      "Фокус на коммерческом оборудовании",
      "Профессиональная документация",
      "Планы профилактического обслуживания"
    ],
    reviewsEyebrow: "Отзывы клиентов",
    reviewsTitle: "Операторам нужны быстрые и ясные ответы.",
    reviews: [
      ["Менеджер ресторана", "Forten зафиксировал проблему walk-in cooler, объяснил неисправность компрессора и дал понятную смету до ремонта."],
      ["Владелец пекарни", "Наш миксер остановился перед утренним производством. Диагностика была организованной, а план ремонта легко одобрить."],
      ["Отель, food service", "Профессиональная коммуникация, понятные фото и аккуратный счет. Именно это нужно для коммерческого сервиса."]
    ],
    areaEyebrow: "Зона сервиса",
    areaTitle: "Зоны обслуживания",
    areaText: "Обслуживаем коммерческие кухни в Tampa Bay, на Gulf Coast и в Central Florida.",
    serviceAreas: ["Tampa", "St. Petersburg", "Clearwater", "Brandon", "Wesley Chapel", "Lakeland", "Sarasota", "Orlando", "Central Florida"],
    faqTitle: "Частые вопросы",
    faq: [
      ["Какое оборудование вы ремонтируете?", "Коммерческое холодильное, тепловое, грили, льдогенераторы, посудомойки, оборудование подготовки, напитков и профилактику."],
      ["Как проходит диагностика?", "Forten выполняет быструю выездную диагностику и готовит понятную смету после осмотра."],
      ["Есть ли срочный сервис?", "Да. Критические поломки, которые останавливают сервис или создают риск потери продуктов, получают приоритет."],
      ["Вы работаете по часам?", "Forten по возможности использует понятные фиксированные сметы после диагностики."]
    ],
    formTitle: "Заявка на сервис коммерческого оборудования",
    formHint: "Опишите, что сломалось, где находится оборудование и насколько срочно нужен сервис.",
    success: "Ваша заявка получена. Диспетчер Forten скоро свяжется с вами.",
    error: "Заявка сохранена локально. Telegram не настроен или временно недоступен.",
    fields: {
      businessName: "Название бизнеса",
      contact: "Имя контакта",
      phone: "Телефон",
      email: "Email",
      address: "Адрес",
      businessType: "Тип бизнеса",
      equipment: "Тип оборудования",
      urgency: "Срочность",
      issue: "Описание проблемы",
      notes: "Предпочтительное время сервиса",
      submit: "Отправить заявку"
    },
    urgencyOptions: ["Приоритетная диспетчеризация", "Сегодня", "На этой неделе", "Профилактическое обслуживание"],
    contactLines: ["Tampa Bay и Central Florida", "service@forten.example", "(813) 444-2434"],
    footer: "Ремонт и обслуживание коммерческого кухонного оборудования"
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

const equipmentLabels = {
  en: Object.fromEntries(equipmentTypes.map((item) => [item, item])),
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
  const [submittedLead, setSubmittedLead] = useState(null);
  const [isLeadModalOpen, setLeadModalOpen] = useState(false);
  const t = copy[lang] || copy.en;
  const [form, setForm] = useState({
    businessName: "",
    contact: "",
    phone: "",
    email: "",
    address: "",
    businessType: businessTypes[0],
    equipment: equipmentTypes[0],
    brand: "",
    model: "",
    urgency: t.urgencyOptions[1],
    issue: "",
    preferredContactMethod: "Phone",
    notes: "",
    source: "Website",
    status: "NEW LEAD"
  });

  function update(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function switchLang() {
    const nextLang = lang === "en" ? "ru" : "en";
    setLang(nextLang);
    setForm((current) => ({ ...current, urgency: copy[nextLang].urgencyOptions[1] }));
  }

  function openLeadModal() {
    setLeadModalOpen(true);
  }

  function closeLeadModal() {
    setLeadModalOpen(false);
  }

  async function submitLead(event) {
    event.preventDefault();
    let existingLeads = [];
    try {
      existingLeads = JSON.parse(localStorage.getItem("fortenLeads") || "[]");
    } catch {}
    const lead = createWebsiteLead(form, Array.isArray(existingLeads) ? existingLeads : []);
    storeWebsiteLeadAndTicket(lead);
    setSubmittedLead(lead);
    setLeadModalOpen(true);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead)
      });
      setMessage(response.ok ? successText(lang) : t.error);
    } catch {
      setMessage(successText(lang));
    }
  }

  const visibleServiceCards = normalizeServiceCards(t.serviceCards, lang);
  const leadForm = (
    <form className="leadForm premiumLeadForm modalLeadForm" onSubmit={submitLead}>
      <Field label={t.fields.businessName} value={form.businessName} onChange={(v) => update("businessName", v)} required />
      <Field label={t.fields.contact} value={form.contact} onChange={(v) => update("contact", v)} required />
      <Field label={t.fields.phone} value={form.phone} onChange={(v) => update("phone", v)} required />
      <Field label={t.fields.email} type="email" value={form.email} onChange={(v) => update("email", v)} />
      <Field label={t.fields.address} value={form.address} onChange={(v) => update("address", v)} />
      <Select label={t.fields.businessType} value={form.businessType} options={businessTypes} labels={businessLabels[lang]} onChange={(v) => update("businessType", v)} />
      <Select label={t.fields.equipment} value={form.equipment} options={equipmentTypes} labels={equipmentLabels[lang]} onChange={(v) => update("equipment", v)} />
      <Field label={fieldText(lang, "brand")} value={form.brand} onChange={(v) => update("brand", v)} />
      <Field label={fieldText(lang, "model")} value={form.model} onChange={(v) => update("model", v)} />
      <Select label={t.fields.urgency} value={form.urgency} options={t.urgencyOptions} onChange={(v) => update("urgency", v)} />
      <Select label={fieldText(lang, "contactMethod")} value={form.preferredContactMethod} options={["Phone", "Email"]} labels={contactMethodLabels(lang)} onChange={(v) => update("preferredContactMethod", v)} />
      <div className="full"><label>{t.fields.issue}</label><textarea value={form.issue} onChange={(event) => update("issue", event.target.value)} required /></div>
      <div className="full"><label>{t.fields.notes}</label><textarea value={form.notes} onChange={(event) => update("notes", event.target.value)} /></div>
      <button className="submitLead" type="submit"><Send size={18} />{scheduleText(lang)}</button>
      {message && <p className="formMessage">{message}</p>}
    </form>
  );

  return (
    <main className="premiumPublic">
      <header className="premiumNav">
        <a className="premiumBrand" href="/">
          <span className="publicLogoWrap">
            <Image src={logoImage} alt="Forten Service" width={320} height={160} priority />
          </span>
          <span><strong>FORTEN</strong><small>{t.kicker}</small></span>
        </a>
        <nav>
          <a href="#services">{t.nav[0]}</a>
          <a href="#equipment">{t.nav[1]}</a>
          <a href="#process">{t.nav[2]}</a>
          <a href="#faq">{t.nav[3]}</a>
          <a href="#contact">{t.nav[4]}</a>
          <button className="navRequest navSchedule" type="button" onClick={openLeadModal}>{scheduleText(lang)}</button>
          <button type="button" onClick={switchLang}><Languages size={17} />{t.lang}</button>
        </nav>
      </header>

      <section className="premiumHero">
        <Image className="premiumHeroImage" src={heroImage} alt={t.title} fill priority sizes="100vw" />
        <div className="heroContent">
          <h1 aria-label={t.title}>
            {t.heroTitleLines.map((line, index) => (
              <span className={index === 1 ? "heroTitleAccent" : undefined} key={line}>{line}</span>
            ))}
          </h1>
          <div className="heroSubGrid">
            {t.subheadline.map((item) => <span key={item}><BadgeCheck size={16} />{item}</span>)}
          </div>
          <p className="heroBody">{t.heroBody}</p>
          <div className="heroActions">
            <button className="primary" type="button" onClick={openLeadModal}>{scheduleText(lang)}<ArrowRight size={18} /></button>
            <button className="secondary emergencyButton" type="button" onClick={openLeadModal}><TimerReset size={17} />{t.emergency}</button>
          </div>
        </div>
        <aside className="heroBadgeStack" aria-label={t.trustStats?.[0] || t.company}>
          {t.heroBadges.map((item, index) => (
            <span key={item}>{index === 0 ? <TimerReset size={17} /> : <ShieldCheck size={17} />}{item}</span>
          ))}
        </aside>
      </section>

      <section className="premiumSection splitPremium whyFortenSection">
        <div>
          <p className="eyebrow">{t.whyEyebrow}</p>
          <h2>{t.whyTitle}</h2>
        </div>
        <div className="whyGrid">
          {t.why.map((item, index) => <span key={item}><WhyIcon index={index} />{item}</span>)}
        </div>
      </section>

      <section className="heroStatsStrip" aria-label={t.stats[0]}>
        {t.stats.map((item) => <span key={item}><BadgeCheck size={18} />{item}</span>)}
      </section>

      <section id="process" className="premiumSection processPremium">
        <div className="premiumSectionHead">
          <p className="eyebrow">{t.processEyebrow}</p>
          <h2>{t.processTitle}</h2>
        </div>
        <div className="premiumProcessGrid">
          {t.process.map(([title, text], index) => (
            <article key={title}>
              <b>{index + 1}</b>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="equipment" className="premiumSection equipmentStrip brandStrip">
        <div className="premiumSectionHead">
          <p className="eyebrow">{t.coverageEyebrow}</p>
          <h2>{t.coverageTitle}</h2>
          <p>{t.coverageText}</p>
        </div>
        <div className="brandWall">
          {t.coverageCategories.map((category) => <span key={category}><b>{category.slice(0, 1)}</b>{category}</span>)}
        </div>
      </section>

      <section id="services" className="premiumSection darkSection">
        <div className="premiumSectionHead">
          <p className="eyebrow">{t.servicesEyebrow}</p>
          <h2>{t.servicesTitle}</h2>
          <p>{t.servicesBody}</p>
        </div>
        <div className="premiumServiceGrid">
          {visibleServiceCards.map((service, index) => (
            <article className="premiumServiceCard" key={service.title}>
              <div className="premiumServicePhoto">
                <Image src={serviceImages[index] || serviceImages[0]} alt={`${service.title} - ${service.equipment}`} fill sizes="(max-width: 820px) 100vw, 50vw" loading="lazy" />
                <span>{service.equipment}</span>
              </div>
              <div className="premiumServiceBody">
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="premiumEmergency">
        <div>
          <p className="eyebrow">{t.emergency}</p>
          <h2>{t.emergencyTitle}</h2>
          <p>{t.emergencyText}</p>
        </div>
        <button className="primary" type="button" onClick={openLeadModal}>{scheduleText(lang)}<ArrowRight size={18} /></button>
      </section>

      <section className="premiumSection reviewsSection">
        <div className="premiumSectionHead">
          <p className="eyebrow">{t.reviewsEyebrow}</p>
          <h2>{t.reviewsTitle}</h2>
        </div>
        <div className="reviewsGrid">
          {t.reviews.map(([name, quote]) => (
            <article key={name}>
              <div className="stars"><Star /><Star /><Star /><Star /><Star /></div>
              <p>{quote}</p>
              <strong>{name}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="premiumSection areaSection">
        <div>
          <p className="eyebrow">{t.areaEyebrow}</p>
          <h2>{t.areaTitle}</h2>
          <p>{t.areaText}</p>
        </div>
        <div className="serviceMap">
          {t.serviceAreas.map((area) => <span key={area}>{area}</span>)}
        </div>
      </section>

      <section id="faq" className="premiumSection faqPremium">
        <div className="premiumSectionHead">
          <p className="eyebrow">{t.nav[3]}</p>
          <h2>{t.faqTitle}</h2>
        </div>
        <div className="faqGrid">
          {t.faq.map(([question, answer]) => <article className="faqItem" key={question}><h3>{question}</h3><p>{answer}</p></article>)}
        </div>
      </section>

      <section id="lead-form" className="premiumLeadSection">
        <div id="contact" className="premiumContactPanel">
          <p className="eyebrow">{t.company}</p>
          <h2>{t.formTitle}</h2>
          <p>{t.formHint}</p>
          <div className="contactLine"><MapPin size={17} /> <span>{t.contactLines[0]}</span></div>
          <div className="contactLine"><Mail size={17} /> <span>{t.contactLines[1]}</span></div>
          <div className="contactLine"><Phone size={17} /> <span>{businessPhoneDisplay}</span></div>
        </div>
        <div className="schedulePrompt">
          <h3>{scheduleText(lang)}</h3>
          <p>{modalIntroText(lang)}</p>
          <button className="primary" type="button" onClick={openLeadModal}>{scheduleText(lang)}<ArrowRight size={18} /></button>
        </div>
      </section>

      <footer className="premiumFooter">
        <a className="premiumBrand" href="/">
          <span className="publicLogoWrap footerLogoWrap">
            <Image src={logoImage} alt="Forten Service" width={320} height={160} />
          </span>
          <span><strong>FORTEN</strong><small>{t.footer}</small></span>
        </a>
        <a href={businessPhoneHref}><Phone size={17} />{businessPhoneDisplay}</a>
      </footer>

      {isLeadModalOpen && (
        <div className="leadModalBackdrop" role="presentation" onMouseDown={closeLeadModal}>
          <section className="leadModal" role="dialog" aria-modal="true" aria-label={t.formTitle} onMouseDown={(event) => event.stopPropagation()}>
            <button className="modalClose" type="button" aria-label="Close" onClick={closeLeadModal}>×</button>
            {submittedLead ? <ConfirmationPanel lang={lang} lead={submittedLead} /> : (
              <>
                <div className="modalLeadHeader">
                  <p className="eyebrow">{t.company}</p>
                  <h2>{t.formTitle}</h2>
                  <p>{modalIntroText(lang)}</p>
                </div>
                {leadForm}
              </>
            )}
          </section>
        </div>
      )}

    </main>
  );
}

function Field({ label, value, onChange, type = "text", required = false }) {
  return <div><label>{label}</label><input required={required} type={type} value={value} onChange={(event) => onChange(event.target.value)} /></div>;
}

function Select({ label, value, options, labels, onChange }) {
  return <div><label>{label}</label><select value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option} value={option}>{labels?.[option] || option}</option>)}</select></div>;
}

function ConfirmationPanel({ lang, lead }) {
  const text = confirmationText(lang);
  return (
    <article className="leadConfirmation">
      <span className="confirmationIcon">✓</span>
      <h2>{text.title}</h2>
      <p>{text.subtitle}</p>
      <p>{dispatcherContactText(lang)}</p>
      <div className="ticketNumberBox">
        <span>{text.ticket}</span>
        <strong>{lead.ticketNumber}</strong>
      </div>
    </article>
  );
}

function successText(lang) {
  return lang === "ru"
    ? "Ваша заявка получена. Диспетчер Forten скоро свяжется с вами."
    : "Your request has been received. A Forten dispatcher will contact you shortly.";
}

function scheduleText(lang) {
  return lang === "ru" ? "Заказать услугу" : "Schedule Service";
}

function modalIntroText(lang) {
  return lang === "ru"
    ? "Оставьте данные оборудования, и диспетчер Forten свяжется с вами для планирования сервиса."
    : "Submit the equipment details and a Forten dispatcher will contact you shortly to coordinate service.";
}

function dispatcherContactText(lang) {
  return lang === "ru"
    ? "Диспетчер Forten скоро свяжется с вами."
    : "A Forten dispatcher will contact you shortly.";
}

function WhyIcon({ index }) {
  const icons = [TimerReset, BadgeCheck, ShieldCheck, Wrench, ArrowRight, Star];
  const Icon = icons[index % icons.length];
  return <Icon size={20} />;
}

function confirmationText(lang) {
  if (lang === "ru") {
    return {
      title: "Спасибо!",
      subtitle: "Ваша заявка на сервис успешно получена.",
      ticket: "Номер заявки"
    };
  }
  return {
    title: "Thank You!",
    subtitle: "Your service request has been successfully received.",
    ticket: "Ticket Number"
  };
}

function fieldText(lang, key) {
  const labels = {
    en: {
      brand: "Equipment brand",
      model: "Equipment model",
      contactMethod: "Preferred contact method"
    },
    ru: {
      brand: "Бренд оборудования",
      model: "Модель оборудования",
      contactMethod: "Предпочтительный способ связи"
    }
  };
  return labels[lang]?.[key] || labels.en[key];
}

function contactMethodLabels(lang) {
  return lang === "ru"
    ? { Phone: "Телефон", Email: "Email" }
    : { Phone: "Phone", Email: "Email" };
}

function normalizeServiceCards(cards, lang) {
  if (Array.isArray(cards) && cards.length === serviceImages.length) return cards;
  if (lang !== "ru" || !Array.isArray(cards)) return cards || [];
  return [
    cards[0],
    {
      title: "Коммерческие фритюрницы",
      equipment: "Газовые и электрические коммерческие фритюрницы",
      text: "Розжиг, горелки, термостаты, корзины, температура масла, системы безопасности и простой линии."
    },
    {
      title: "Коммерческие печи",
      equipment: "Convection oven, combi oven, коммерческая печь",
      text: "Печи, плиты, датчики, управление, вентиляторы, розжиг, воздушный поток и нестабильный нагрев."
    },
    cards[2],
    cards[3],
    cards[4],
    {
      title: "Вытяжная вентиляция",
      equipment: "Коммерческий hood ventilation и make-up air",
      text: "Проблемы воздушного потока, улавливание жира, приточный воздух и координация сервиса вентиляции."
    },
    {
      title: "Крышные вытяжные вентиляторы",
      equipment: "Rooftop exhaust fan, upblast fan, belt drive",
      text: "Моторы, ремни, подшипники, выключатели, вибрация, воздушный поток и документация работ на крыше."
    },
    ...cards.slice(5)
  ].filter(Boolean);
}
