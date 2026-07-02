"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  Languages,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Star,
  TimerReset
} from "lucide-react";
import { businessTypes, equipmentTypes } from "./data";

const heroImage = "/images/equipment/hero-commercial-kitchen.jpg";

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
    request: "Request Service",
    emergency: "Emergency 24/7",
    callNow: "Call Now",
    company: "Forten Commercial Equipment Services",
    kicker: "Commercial Kitchen Equipment Repair & Maintenance",
    title: "Commercial Restaurant Equipment Repair",
    subheadline: [
      "Commercial Refrigeration",
      "Cooking Equipment",
      "Ice Machines",
      "Walk-in Coolers",
      "Walk-in Freezers",
      "Dishwashers",
      "Mixers",
      "Preventive Maintenance"
    ],
    heroBody: "Premium equipment repair for restaurants, cafes, bakeries, bars, hotels, grocery stores, food trucks, and commercial kitchens across Tampa Bay and Central Florida.",
    trustStats: ["Diagnostics from $159", "Fast estimate after diagnostic", "Commercial equipment specialists"],
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
        equipment: "Pitco fryer, Frymaster fryer, gas and electric fryers",
        text: "Ignition, burners, thermostats, baskets, oil temperature issues, safety controls, and fryer line downtime."
      },
      {
        title: "Commercial Ovens",
        equipment: "Convection oven, Rational oven, commercial oven",
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
        equipment: "Hobart mixer, meat slicer, food processor",
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
    processEyebrow: "Service process",
    processTitle: "A clear workflow from request to repair.",
    process: [
      ["Request", "Send equipment details and urgency."],
      ["Technician Visit", "On-site inspection and readings."],
      ["Mentor Diagnosis", "Senior review of findings when needed."],
      ["Quote", "Flat-rate repair plan after diagnostic."],
      ["Payment", "Approval and payment before repair."],
      ["Repair", "Repair completed and documented."]
    ],
    brandsEyebrow: "Brands we service",
    brandsTitle: "Commercial brands your kitchen already depends on.",
    brands: ["True", "Traulsen", "Hoshizaki", "Manitowoc", "Frymaster", "Pitco", "Vulcan", "Blodgett", "Hobart", "Beverage-Air", "Turbo Air", "Delfield"],
    emergencyTitle: "Equipment down during service?",
    emergencyText: "Refrigeration failures, no-heat fryers, ovens down, dish machines not sanitizing, and ice machines out of production are prioritized as urgent service requests.",
    whyEyebrow: "Why Forten",
    whyTitle: "Built for commercial kitchens, not household repair.",
    why: [
      "Commercial restaurant equipment focus",
      "Diagnostics from $159",
      "Flat-rate quote after inspection",
      "Photos, readings, and documented findings",
      "Warranty and terms listed clearly",
      "Tampa Bay / Central Florida service area"
    ],
    reviewsEyebrow: "Customer reviews",
    reviewsTitle: "Operators need fast, clear answers.",
    reviews: [
      ["Restaurant Manager", "Forten documented the walk-in issue, explained the compressor problem, and gave us a clear quote before repair."],
      ["Bakery Owner", "Our mixer was down before morning production. The diagnostic was organized and the repair plan was easy to approve."],
      ["Hotel Food Service", "Professional communication, clear photos, and a clean invoice. Exactly what we need for commercial equipment service."]
    ],
    areaEyebrow: "Service area",
    areaTitle: "Tampa Bay and Central Florida commercial kitchens.",
    areaText: "Serving restaurants, cafes, bakeries, bars, hotels, grocery stores, food trucks, farms, and institutional kitchens.",
    faqTitle: "Common Questions",
    faq: [
      ["What equipment do you repair?", "Commercial refrigeration, cooking equipment, grills, ice machines, dishwashers, food prep, beverage equipment, and preventive maintenance."],
      ["How much is diagnostics?", "Diagnostics start at $159. A repair quote is prepared after inspection."],
      ["Do you offer emergency service?", "Yes. Critical failures that stop service or risk product loss are prioritized."],
      ["Do you use hourly pricing?", "Forten uses clear flat-rate repair quotes after diagnostics whenever possible."]
    ],
    formTitle: "Request Commercial Equipment Service",
    formHint: "Tell us what failed, where the equipment is located, and how urgent the issue is.",
    success: "Request received. Forten will contact you soon.",
    error: "Request saved locally. Telegram notification is not configured or unavailable.",
    fields: {
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
      submit: "Send request"
    },
    urgencyOptions: ["Emergency", "Same day", "This week", "Preventive maintenance"],
    contactLines: ["Tampa Bay / Central Florida", "service@forten.example", "(813) 555-0101"],
    footer: "Commercial Kitchen Equipment Repair & Maintenance"
  },
  ru: {
    lang: "English",
    nav: ["Услуги", "Оборудование", "Процесс", "FAQ", "Контакты"],
    request: "Оставить заявку",
    emergency: "Срочно 24/7",
    callNow: "Позвонить",
    company: "Forten Commercial Equipment Services",
    kicker: "Ремонт и обслуживание коммерческого кухонного оборудования",
    title: "Ремонт коммерческого ресторанного оборудования",
    subheadline: [
      "Коммерческое холодильное оборудование",
      "Тепловое оборудование",
      "Льдогенераторы",
      "Walk-in coolers",
      "Walk-in freezers",
      "Посудомоечные машины",
      "Миксеры",
      "Профилактическое обслуживание"
    ],
    heroBody: "Премиальный сервис для ресторанов, кафе, пекарен, баров, отелей, продуктовых магазинов, фудтраков и коммерческих кухонь в Tampa Bay и Central Florida.",
    trustStats: ["Диагностика от $159", "Быстрая смета после диагностики", "Специалисты по коммерческому оборудованию"],
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
        equipment: "Hobart mixer, meat slicer, food processor",
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
    processEyebrow: "Процесс сервиса",
    processTitle: "Понятный путь от заявки до ремонта.",
    process: [
      ["Заявка", "Вы отправляете оборудование и срочность."],
      ["Визит техника", "Осмотр на объекте и показания."],
      ["Диагностика ментора", "Старший специалист проверяет выводы при необходимости."],
      ["Смета", "Фиксированный план ремонта после диагностики."],
      ["Оплата", "Одобрение и оплата перед ремонтом."],
      ["Ремонт", "Ремонт выполнен и задокументирован."]
    ],
    brandsEyebrow: "Бренды",
    brandsTitle: "Коммерческие бренды, от которых зависит ваша кухня.",
    brands: ["True", "Traulsen", "Hoshizaki", "Manitowoc", "Frymaster", "Pitco", "Vulcan", "Blodgett", "Hobart", "Beverage-Air", "Turbo Air", "Delfield"],
    emergencyTitle: "Оборудование остановило сервис?",
    emergencyText: "Поломки холодильного оборудования, фритюрницы без нагрева, печи в простое, посудомойки без санитарной температуры и льдогенераторы без льда получают приоритет.",
    whyEyebrow: "Почему Forten",
    whyTitle: "Сервис для коммерческих кухонь, а не бытовой ремонт.",
    why: [
      "Фокус на коммерческом ресторанном оборудовании",
      "Диагностика от $159",
      "Фиксированная смета после осмотра",
      "Фото, показания и понятные выводы",
      "Гарантия и условия указаны ясно",
      "Зона сервиса Tampa Bay / Central Florida"
    ],
    reviewsEyebrow: "Отзывы клиентов",
    reviewsTitle: "Операторам нужны быстрые и ясные ответы.",
    reviews: [
      ["Менеджер ресторана", "Forten зафиксировал проблему walk-in cooler, объяснил неисправность компрессора и дал понятную смету до ремонта."],
      ["Владелец пекарни", "Наш миксер остановился перед утренним производством. Диагностика была организованной, а план ремонта легко одобрить."],
      ["Отель, food service", "Профессиональная коммуникация, понятные фото и аккуратный счет. Именно это нужно для коммерческого сервиса."]
    ],
    areaEyebrow: "Зона сервиса",
    areaTitle: "Коммерческие кухни Tampa Bay и Central Florida.",
    areaText: "Обслуживаем рестораны, кафе, пекарни, бары, отели, продуктовые магазины, фудтраки, фермы и институциональные кухни.",
    faqTitle: "Частые вопросы",
    faq: [
      ["Какое оборудование вы ремонтируете?", "Коммерческое холодильное, тепловое, грили, льдогенераторы, посудомойки, оборудование подготовки, напитков и профилактику."],
      ["Сколько стоит диагностика?", "Диагностика начинается от $159. Смета на ремонт готовится после осмотра."],
      ["Есть ли срочный сервис?", "Да. Критические поломки, которые останавливают сервис или создают риск потери продуктов, получают приоритет."],
      ["Вы работаете по часам?", "Forten по возможности использует понятные фиксированные сметы после диагностики."]
    ],
    formTitle: "Заявка на сервис коммерческого оборудования",
    formHint: "Опишите, что сломалось, где находится оборудование и насколько срочно нужен сервис.",
    success: "Заявка получена. Forten скоро свяжется с вами.",
    error: "Заявка сохранена локально. Telegram не настроен или временно недоступен.",
    fields: {
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
      submit: "Отправить заявку"
    },
    urgencyOptions: ["Срочно", "Сегодня", "На этой неделе", "Профилактическое обслуживание"],
    contactLines: ["Tampa Bay / Central Florida", "service@forten.example", "(813) 555-0101"],
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
  const t = copy[lang] || copy.en;
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
    try {
      const stored = JSON.parse(localStorage.getItem("fortenLeads") || "[]");
      localStorage.setItem("fortenLeads", JSON.stringify([lead, ...stored]));
    } catch {}

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

  const visibleServiceCards = normalizeServiceCards(t.serviceCards, lang);

  return (
    <main className="premiumPublic">
      <header className="premiumNav">
        <a className="premiumBrand" href="/">
          <span className="mark">F</span>
          <span><strong>FORTEN</strong><small>{t.kicker}</small></span>
        </a>
        <nav>
          <a href="#services">{t.nav[0]}</a>
          <a href="#equipment">{t.nav[1]}</a>
          <a href="#process">{t.nav[2]}</a>
          <a href="#faq">{t.nav[3]}</a>
          <a href="#contact">{t.nav[4]}</a>
          <a className="navRequest" href="#lead-form">{t.request}</a>
          <button type="button" onClick={switchLang}><Languages size={17} />{t.lang}</button>
        </nav>
      </header>

      <section className="premiumHero">
        <Image className="premiumHeroImage" src={heroImage} alt={t.title} fill priority sizes="100vw" />
        <div className="heroContent">
          <p className="eyebrow">{t.company}</p>
          <h1>{t.title}</h1>
          <div className="heroSubGrid">
            {t.subheadline.map((item) => <span key={item}><BadgeCheck size={16} />{item}</span>)}
          </div>
          <p>{t.heroBody}</p>
          <div className="heroActions">
            <a className="primary" href="#lead-form">{t.request}<ArrowRight size={18} /></a>
            <a className="secondary emergencyButton" href="#lead-form"><TimerReset size={17} />{t.emergency}</a>
            <a className="secondary callButton" href="tel:+18135550101"><Phone size={17} />{t.callNow}</a>
          </div>
        </div>
        <aside className="heroServiceGlass">
          <div><Clock size={20} /><span>24/7</span></div>
          <strong>{t.trustStats[0]}</strong>
          {t.trustStats.slice(1).map((item) => <p key={item}><ShieldCheck size={16} />{item}</p>)}
        </aside>
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

      <section id="equipment" className="premiumSection equipmentStrip">
        <div className="premiumSectionHead">
          <p className="eyebrow">{t.brandsEyebrow}</p>
          <h2>{t.brandsTitle}</h2>
        </div>
        <div className="brandWall">
          {t.brands.map((brand) => <span key={brand}>{brand}</span>)}
        </div>
      </section>

      <section id="process" className="premiumSection processPremium">
        <div className="premiumSectionHead">
          <p className="eyebrow">{t.processEyebrow}</p>
          <h2>{t.processTitle}</h2>
        </div>
        <div className="premiumProcessGrid">
          {t.process.map(([title, text], index) => (
            <article key={title}>
              <b>{String(index + 1).padStart(2, "0")}</b>
              <h3>{title}</h3>
              <p>{text}</p>
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
        <a className="primary" href="#lead-form">{t.request}<ArrowRight size={18} /></a>
      </section>

      <section className="premiumSection splitPremium">
        <div>
          <p className="eyebrow">{t.whyEyebrow}</p>
          <h2>{t.whyTitle}</h2>
        </div>
        <div className="whyGrid">
          {t.why.map((item) => <span key={item}><ShieldCheck size={18} />{item}</span>)}
        </div>
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
          <span>Tampa</span>
          <span>St. Petersburg</span>
          <span>Clearwater</span>
          <span>Lakeland</span>
          <span>Orlando Area</span>
        </div>
      </section>

      <section id="faq" className="premiumSection faqPremium">
        <div className="premiumSectionHead">
          <p className="eyebrow">FAQ</p>
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
          <div className="contactLine"><Phone size={17} /> <span>{t.contactLines[2]}</span></div>
        </div>
        <form className="leadForm premiumLeadForm" onSubmit={submitLead}>
          <Field label={t.fields.businessName} value={form.businessName} onChange={(v) => update("businessName", v)} required />
          <Field label={t.fields.contact} value={form.contact} onChange={(v) => update("contact", v)} required />
          <Field label={t.fields.phone} value={form.phone} onChange={(v) => update("phone", v)} required />
          <Field label={t.fields.email} type="email" value={form.email} onChange={(v) => update("email", v)} />
          <Field label={t.fields.address} value={form.address} onChange={(v) => update("address", v)} />
          <Select label={t.fields.businessType} value={form.businessType} options={businessTypes} labels={businessLabels[lang]} onChange={(v) => update("businessType", v)} />
          <Select label={t.fields.equipment} value={form.equipment} options={equipmentTypes} labels={equipmentLabels[lang]} onChange={(v) => update("equipment", v)} />
          <Select label={t.fields.urgency} value={form.urgency} options={t.urgencyOptions} onChange={(v) => update("urgency", v)} />
          <div className="full"><label>{t.fields.issue}</label><textarea value={form.issue} onChange={(event) => update("issue", event.target.value)} required /></div>
          <div className="full"><label>{t.fields.notes}</label><textarea value={form.notes} onChange={(event) => update("notes", event.target.value)} /></div>
          <button className="submitLead" type="submit"><Send size={18} />{t.fields.submit}</button>
          {message && <p className="formMessage">{message}</p>}
        </form>
      </section>

      <footer className="premiumFooter">
        <a className="premiumBrand" href="/">
          <span className="mark">F</span>
          <span><strong>FORTEN</strong><small>{t.footer}</small></span>
        </a>
        <a href="tel:+18135550101"><Phone size={17} />{t.contactLines[2]}</a>
      </footer>

    </main>
  );
}

function Field({ label, value, onChange, type = "text", required = false }) {
  return <div><label>{label}</label><input required={required} type={type} value={value} onChange={(event) => onChange(event.target.value)} /></div>;
}

function Select({ label, value, options, labels, onChange }) {
  return <div><label>{label}</label><select value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option} value={option}>{labels?.[option] || option}</option>)}</select></div>;
}

function normalizeServiceCards(cards, lang) {
  if (Array.isArray(cards) && cards.length === serviceImages.length) return cards;
  if (lang !== "ru" || !Array.isArray(cards)) return cards || [];
  return [
    cards[0],
    {
      title: "Коммерческие фритюрницы",
      equipment: "Pitco fryer, Frymaster fryer, газовые и электрические фритюрницы",
      text: "Розжиг, горелки, термостаты, корзины, температура масла, системы безопасности и простой линии."
    },
    {
      title: "Коммерческие печи",
      equipment: "Convection oven, Rational oven, коммерческая печь",
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
