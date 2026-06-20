"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Languages, MapPin, Search, Settings } from "lucide-react";

const copy = {
  en: {
    lang: "Русский",
    back: "Back to CRM",
    title: "Lead Collector",
    subtitle: "Future-ready Google Places prospecting workspace",
    query: "Search category",
    location: "Target location",
    radius: "Radius",
    api: "Planned environment variable",
    run: "Preview collection",
    note: "This module is intentionally a placeholder for the MVP. It is ready for GOOGLE_PLACES_API_KEY, deduplication rules, and push-to-leads workflow.",
    columns: ["Business", "Category", "Area", "Status"],
    rows: [
      ["Restaurant sample", "Restaurant", "Tampa, FL", "Ready to review"],
      ["Bakery sample", "Bakery", "St. Petersburg, FL", "Ready to review"],
      ["Hotel kitchen sample", "Hotel", "Clearwater, FL", "Ready to review"]
    ]
  },
  ru: {
    lang: "English",
    back: "Назад в CRM",
    title: "Сбор лидов",
    subtitle: "Будущий рабочий модуль для поиска через Google Places",
    query: "Категория поиска",
    location: "Целевая локация",
    radius: "Радиус",
    api: "Планируемая переменная окружения",
    run: "Предпросмотр сбора",
    note: "В MVP этот модуль оставлен как заготовка. Он подготовлен для GOOGLE_PLACES_API_KEY, правил удаления дублей и отправки найденных компаний в лиды.",
    columns: ["Бизнес", "Категория", "Район", "Статус"],
    rows: [
      ["Пример ресторана", "Ресторан", "Tampa, FL", "Готово к проверке"],
      ["Пример пекарни", "Пекарня", "St. Petersburg, FL", "Готово к проверке"],
      ["Пример кухни отеля", "Отель", "Clearwater, FL", "Готово к проверке"]
    ]
  }
};

export default function LeadCollectorPage() {
  const [lang, setLang] = useState("en");
  const [authorized, setAuthorized] = useState(null);
  const t = copy[lang];

  useEffect(() => {
    const session = localStorage.getItem("fortenAdminSession");
    if (session === "active") {
      setAuthorized(true);
      return;
    }
    setAuthorized(false);
    window.location.href = "/admin/login";
  }, []);

  if (!authorized) {
    return (
      <main className="collectorShell">
        <section className="panel">
          <span className="mark">F</span>
          <h1>Forten Admin</h1>
        </section>
      </main>
    );
  }

  return (
    <main className="collectorShell">
      <header className="collectorHeader">
        <a className="secondary" href="/admin"><ArrowLeft size={17} />{t.back}</a>
        <button className="secondary" onClick={() => setLang(lang === "en" ? "ru" : "en")}><Languages size={17} />{t.lang}</button>
      </header>
      <section className="panel">
        <p className="eyebrow">Google Places</p>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
        <div className="fieldGrid">
          <div><label>{t.query}</label><input defaultValue="restaurants, bakeries, cafes" /></div>
          <div><label>{t.location}</label><input defaultValue="Tampa Bay, FL" /></div>
          <div><label>{t.radius}</label><input defaultValue="25 mi" /></div>
          <div><label>{t.api}</label><input value="GOOGLE_PLACES_API_KEY" readOnly /></div>
        </div>
        <button className="primary"><Search size={17} />{t.run}</button>
        <p className="hint"><Settings size={16} />{t.note}</p>
      </section>
      <section className="panel">
        <div className="recordList">
          {t.rows.map((row) => <article className="record" key={row[0]}><MapPin size={17} />{row.map((cell) => <span key={cell}>{cell}</span>)}</article>)}
        </div>
      </section>
    </main>
  );
}
