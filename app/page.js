"use client";

import { useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import {
  Languages, FileText, Wrench, Building2, UserRound, MapPin, Phone,
  Mail, ClipboardCheck, Calculator, Download, ShieldCheck, Camera,
  CheckCircle2, PlusCircle, Trash2
} from "lucide-react";

const UI = {
  ru: {
    switch: "English",
    title: "Forten CRM + Smart Estimate",
    subtitle: "Профессиональный estimate/work order для ремонта коммерческого кухонного оборудования: диагностика, работы, материалы, гарантия и PDF для клиента.",
    badge: "Forten Commercial Equipment Services",
    company: "Forten Commercial Equipment Services",
    tagline: "Ремонт и обслуживание коммерческого кухонного оборудования",
    serviceLine: "Холодильное • Тепловое • Подготовка продуктов • Моечное • Напиточное оборудование",
    customer: "Клиент",
    equipment: "Оборудование",
    diagnostic: "Диагностика",
    repairScope: "Что делаем",
    price: "Расчет стоимости",
    warranty: "Гарантия",
    pdf: "PDF Estimate",
    businessName: "Название бизнеса",
    contact: "Контактное лицо",
    phone: "Телефон",
    email: "Email",
    address: "Адрес объекта",
    equipmentType: "Тип оборудования",
    manufacturer: "Производитель",
    model: "Модель",
    serial: "Серийный номер",
    symptom: "Жалоба клиента",
    finding: "Что выявила диагностика",
    recommendation: "Рекомендация техника",
    estimateNo: "Estimate №",
    date: "Дата",
    validUntil: "Действителен до",
    technician: "Техник",
    addItem: "Добавить строку",
    generatePdf: "Скачать PDF",
    total: "Итого",
    subtotal: "Subtotal",
    tax: "Налог",
    discount: "Скидка",
    parts: "Запчасти / материалы",
    service: "Работа / услуга",
    qty: "Кол-во",
    unit: "Цена",
    amount: "Сумма",
    notes: "Заметки",
    terms: "Условия",
    termsText: "Estimate не является финальным invoice. Финальная цена может измениться после дополнительной диагностики, если обнаружены скрытые неисправности, недоступные детали, электрические проблемы, утечки или требуется повторный визит. Работы выполняются после подтверждения заказчиком.",
    warrantyText: "90 дней гарантия на выполненные работы. Гарантия производителя на установленные запчасти применяется согласно условиям производителя. Гарантия не действует при вмешательстве третьих лиц или эксплуатации оборудования с нарушениями.",
    compressorTemplate: "Шаблон: замена компрессора",
    mixerTemplate: "Шаблон: ремонт миксера",
    fryerTemplate: "Шаблон: ремонт фритюрницы",
    dishwasherTemplate: "Шаблон: ремонт посудомойки",
    workIncluded: "В работу входит",
    customerApproval: "Подтверждение заказчика",
    signature: "Подпись / дата",
    copied: "Готово",
    equipmentOptions: {
      walkin_cooler: "Walk-in холодильная камера",
      walkin_freezer: "Walk-in морозильная камера",
      reachin: "Вертикальный холодильник / морозильник",
      prep_table: "Холодильный prep table",
      ice_machine: "Льдогенератор",
      oven: "Коммерческая печь / духовой шкаф",
      fryer: "Фритюрница",
      grill: "Гриль / плита / griddle",
      dishwasher: "Посудомоечная машина",
      mixer: "Коммерческий миксер",
      slicer: "Слайсер",
      coffee: "Кофемашина / напиточное оборудование",
      other: "Другое коммерческое кухонное оборудование"
    }
  },
  en: {
    switch: "Русский",
    title: "Forten CRM + Smart Estimate",
    subtitle: "Professional estimate/work order for commercial kitchen equipment service: diagnostics, scope, materials, warranty, and client-ready PDF.",
    badge: "Forten Commercial Equipment Services",
    company: "Forten Commercial Equipment Services",
    tagline: "Commercial Kitchen Equipment Repair & Maintenance",
    serviceLine: "Refrigeration • Cooking • Food Preparation • Warewashing • Beverage Equipment",
    customer: "Customer",
    equipment: "Equipment",
    diagnostic: "Diagnostic",
    repairScope: "Scope of Work",
    price: "Price Breakdown",
    warranty: "Warranty",
    pdf: "PDF Estimate",
    businessName: "Business name",
    contact: "Contact person",
    phone: "Phone",
    email: "Email",
    address: "Service address",
    equipmentType: "Equipment type",
    manufacturer: "Manufacturer",
    model: "Model",
    serial: "Serial number",
    symptom: "Customer complaint",
    finding: "Inspection findings",
    recommendation: "Technician recommendation",
    estimateNo: "Estimate #",
    date: "Date",
    validUntil: "Valid until",
    technician: "Technician",
    addItem: "Add item",
    generatePdf: "Download PDF",
    total: "Total",
    subtotal: "Subtotal",
    tax: "Tax",
    discount: "Discount",
    parts: "Parts / materials",
    service: "Labor / service",
    qty: "Qty",
    unit: "Unit price",
    amount: "Amount",
    notes: "Notes",
    terms: "Terms",
    termsText: "This estimate is not a final invoice. Final price may change after additional diagnostics if hidden failures, unavailable parts, electrical issues, leaks, or follow-up visits are required. Work will be performed after customer approval.",
    warrantyText: "90-day labor warranty on completed work. Manufacturer warranty applies to installed parts according to manufacturer terms. Warranty is void if the system is modified by others or operated outside normal conditions.",
    compressorTemplate: "Template: compressor replacement",
    mixerTemplate: "Template: mixer repair",
    fryerTemplate: "Template: fryer repair",
    dishwasherTemplate: "Template: dishwasher repair",
    workIncluded: "Work includes",
    customerApproval: "Customer Approval",
    signature: "Signature / date",
    copied: "Done",
    equipmentOptions: {
      walkin_cooler: "Walk-in Cooler",
      walkin_freezer: "Walk-in Freezer",
      reachin: "Reach-in Cooler / Freezer",
      prep_table: "Refrigerated Prep Table",
      ice_machine: "Ice Machine",
      oven: "Commercial Oven",
      fryer: "Fryer",
      grill: "Grill / Range / Griddle",
      dishwasher: "Commercial Dishwasher",
      mixer: "Commercial Mixer",
      slicer: "Meat Slicer",
      coffee: "Coffee / Beverage Equipment",
      other: "Other Commercial Kitchen Equipment"
    }
  }
};

const templates = {
  compressor: {
    equipmentType: "walkin_cooler",
    symptomRu: "Холодильная камера не держит температуру. Температура внутри выше нормы для безопасного хранения продуктов.",
    symptomEn: "Walk-in cooler is not maintaining temperature. Box temperature is above safe food storage range.",
    findingRu: "В ходе диагностики выявлен выход из строя компрессора. Компрессор не запускается/перегревается и не способен поддерживать рабочее давление системы охлаждения.",
    findingEn: "Inspection found compressor failure. Compressor is not starting/overheating and is no longer capable of maintaining proper refrigeration system pressure.",
    recommendationRu: "Рекомендуется заменить компрессор, фильтр-осушитель, выполнить проверку герметичности, вакуумирование системы, заправку хладагентом и запуск с проверкой температуры.",
    recommendationEn: "Recommended repair: replace compressor and filter drier, perform leak/pressure test, evacuate system, recharge refrigerant, start up and verify operating temperature.",
    items: [
      { type: "service", nameRu: "Диагностика коммерческого оборудования", nameEn: "Commercial equipment diagnostic", qty: 1, price: 159 },
      { type: "service", nameRu: "Замена компрессора: демонтаж, пайка, установка, запуск", nameEn: "Compressor replacement: removal, brazing, installation, startup", qty: 1, price: 2200 },
      { type: "parts", nameRu: "Компрессор", nameEn: "Compressor", qty: 1, price: 1250 },
      { type: "parts", nameRu: "Фильтр-осушитель", nameEn: "Filter drier", qty: 1, price: 95 },
      { type: "parts", nameRu: "Хладагент / фреон", nameEn: "Refrigerant", qty: 1, price: 480 },
      { type: "parts", nameRu: "Азот, пайка, расходные материалы", nameEn: "Nitrogen, brazing and shop materials", qty: 1, price: 175 },
      { type: "service", nameRu: "Вакуумирование, проверка утечки, запуск и тест температуры", nameEn: "Vacuum, leak test, startup and temperature verification", qty: 1, price: 350 }
    ]
  },
  mixer: {
    equipmentType: "mixer",
    symptomRu: "Миксер шумит, проскальзывает или не запускается под нагрузкой.",
    symptomEn: "Mixer is noisy, slipping, or does not start under load.",
    findingRu: "Диагностика показала износ приводных элементов/ремня/шестерен или электрическую неисправность узла запуска.",
    findingEn: "Inspection found worn drive components/belt/gears or an electrical start component issue.",
    recommendationRu: "Рекомендуется разобрать приводной узел, заменить неисправные детали, проверить работу под нагрузкой и выполнить тест безопасности.",
    recommendationEn: "Recommended repair: disassemble drive assembly, replace failed components, test under load, and perform safety check.",
    items: [
      { type: "service", nameRu: "Диагностика миксера", nameEn: "Mixer diagnostic", qty: 1, price: 159 },
      { type: "service", nameRu: "Ремонт приводного узла миксера", nameEn: "Mixer drive assembly repair", qty: 1, price: 420 },
      { type: "parts", nameRu: "Запчасти миксера / приводные элементы", nameEn: "Mixer parts / drive components", qty: 1, price: 280 },
      { type: "service", nameRu: "Тест под нагрузкой и проверка безопасности", nameEn: "Load test and safety verification", qty: 1, price: 120 }
    ]
  },
  fryer: {
    equipmentType: "fryer",
    symptomRu: "Фритюрница не греет, плохо держит температуру или отключается.",
    symptomEn: "Fryer is not heating, not holding temperature, or shuts off.",
    findingRu: "Диагностика выявила неисправность термостата/розжига/газового клапана или загрязнение горелочного узла.",
    findingEn: "Inspection found thermostat/ignition/gas valve issue or burner assembly contamination.",
    recommendationRu: "Рекомендуется заменить неисправный компонент, очистить горелочный узел, проверить газовую часть и работу температуры.",
    recommendationEn: "Recommended repair: replace failed component, clean burner assembly, check gas system, and verify temperature operation.",
    items: [
      { type: "service", nameRu: "Диагностика фритюрницы", nameEn: "Fryer diagnostic", qty: 1, price: 159 },
      { type: "service", nameRu: "Ремонт системы нагрева / розжига", nameEn: "Heating / ignition system repair", qty: 1, price: 520 },
      { type: "parts", nameRu: "Термостат / розжиг / газовый компонент", nameEn: "Thermostat / igniter / gas component", qty: 1, price: 280 },
      { type: "service", nameRu: "Очистка, запуск и проверка температуры", nameEn: "Cleaning, startup and temperature verification", qty: 1, price: 150 }
    ]
  },
  dishwasher: {
    equipmentType: "dishwasher",
    symptomRu: "Посудомоечная машина не греет воду, плохо моет или выдает ошибку.",
    symptomEn: "Dishwasher is not heating, washing poorly, or showing an error.",
    findingRu: "Диагностика выявила неисправность нагревателя/насоса/датчика или загрязнение системы подачи воды.",
    findingEn: "Inspection found heater/pump/sensor issue or water delivery system contamination.",
    recommendationRu: "Рекомендуется заменить неисправный узел, очистить систему, проверить температуру воды и цикл мойки.",
    recommendationEn: "Recommended repair: replace failed assembly, clean system, verify water temperature and wash cycle operation.",
    items: [
      { type: "service", nameRu: "Диагностика посудомоечной машины", nameEn: "Dishwasher diagnostic", qty: 1, price: 159 },
      { type: "service", nameRu: "Ремонт узла нагрева / насоса", nameEn: "Heater / pump assembly repair", qty: 1, price: 650 },
      { type: "parts", nameRu: "Нагреватель / насос / датчик", nameEn: "Heater / pump / sensor", qty: 1, price: 420 },
      { type: "service", nameRu: "Очистка, запуск и тест цикла мойки", nameEn: "Cleaning, startup and wash cycle test", qty: 1, price: 180 }
    ]
  }
};

export default function Page() {
  const [lang, setLang] = useState("ru");
  const t = UI[lang];

  const [estimate, setEstimate] = useState({
    number: "EST-1001",
    date: new Date().toISOString().slice(0,10),
    validUntil: new Date(Date.now()+30*24*60*60*1000).toISOString().slice(0,10),
    business: "Demo Pizza Tampa",
    contact: "Manager",
    phone: "(813) 555-0101",
    email: "manager@example.com",
    address: "Tampa, FL",
    technician: "Alex - Commercial Equipment Tech",
    equipmentType: "walkin_cooler",
    manufacturer: "True / Walk-in system",
    model: "Unknown",
    serial: "Unknown",
    symptomRu: templates.compressor.symptomRu,
    symptomEn: templates.compressor.symptomEn,
    findingRu: templates.compressor.findingRu,
    findingEn: templates.compressor.findingEn,
    recommendationRu: templates.compressor.recommendationRu,
    recommendationEn: templates.compressor.recommendationEn,
    notesRu: "Работы выполняются после подтверждения estimate заказчиком.",
    notesEn: "Work will be performed after customer approval.",
    taxRate: 0,
    discount: 0,
    items: templates.compressor.items
  });

  const subtotal = useMemo(() => estimate.items.reduce((sum, item) => sum + Number(item.qty || 0) * Number(item.price || 0), 0), [estimate.items]);
  const tax = subtotal * Number(estimate.taxRate || 0) / 100;
  const total = subtotal + tax - Number(estimate.discount || 0);

  function patch(key, value) {
    setEstimate(prev => ({ ...prev, [key]: value }));
  }

  function applyTemplate(key) {
    const tpl = templates[key];
    setEstimate(prev => ({
      ...prev,
      equipmentType: tpl.equipmentType,
      symptomRu: tpl.symptomRu,
      symptomEn: tpl.symptomEn,
      findingRu: tpl.findingRu,
      findingEn: tpl.findingEn,
      recommendationRu: tpl.recommendationRu,
      recommendationEn: tpl.recommendationEn,
      items: tpl.items
    }));
  }

  function updateItem(index, key, value) {
    setEstimate(prev => {
      const items = [...prev.items];
      items[index] = { ...items[index], [key]: value };
      return { ...prev, items };
    });
  }

  function addItem() {
    setEstimate(prev => ({
      ...prev,
      items: [...prev.items, { type: "service", nameRu: "Новая услуга", nameEn: "New service", qty: 1, price: 0 }]
    }));
  }

  function removeItem(index) {
    setEstimate(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }));
  }

  function makePdf() {
    const doc = new jsPDF({ unit: "pt", format: "letter" });
    const W = 612;
    let y = 36;

    const navy = [15, 23, 42];
    const blue = [37, 99, 235];
    const orange = [249, 115, 22];
    const gray = [100, 116, 139];

    function money(v) { return "$" + Number(v || 0).toFixed(2); }
    function text(str, x, yy, size=10, color=navy, style="normal", maxWidth=520) {
      doc.setFont("helvetica", style);
      doc.setFontSize(size);
      doc.setTextColor(...color);
      const lines = doc.splitTextToSize(String(str || ""), maxWidth);
      doc.text(lines, x, yy);
      return yy + lines.length * (size + 3);
    }
    function line(x1, yy, x2) {
      doc.setDrawColor(226, 232, 240);
      doc.line(x1, yy, x2, yy);
    }
    function section(title) {
      y += 18;
      doc.setFillColor(239, 246, 255);
      doc.roundedRect(36, y-13, 540, 24, 6, 6, "F");
      y = text(title, 48, y+3, 11, blue, "bold");
      y += 6;
    }
    function checkLine(str) {
      doc.setTextColor(...blue);
      doc.setFontSize(11);
      doc.text("✓", 48, y);
      y = text(str, 66, y, 10, navy, "normal", 480) + 2;
    }

    // Header
    doc.setFillColor(...navy);
    doc.roundedRect(36, 30, 540, 86, 12, 12, "F");
    doc.setFillColor(...orange);
    doc.circle(72, 73, 24, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(255,255,255);
    doc.text("F", 64, 82);
    doc.setFontSize(18);
    doc.text("FORTEN", 108, 62);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Commercial Equipment Services", 108, 80);
    doc.text("Commercial Kitchen Equipment Repair & Maintenance", 108, 96);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(estimate.number, 430, 60);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`${t.date}: ${estimate.date}`, 430, 78);
    doc.text(`${t.validUntil}: ${estimate.validUntil}`, 430, 94);

    y = 145;
    doc.setTextColor(...navy);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(lang === "ru" ? "ESTIMATE / ПРЕДЛОЖЕНИЕ НА РЕМОНТ" : "REPAIR ESTIMATE / WORK ORDER", 36, y);
    y += 20;
    y = text(t.serviceLine, 36, y, 10, gray, "normal", 540);

    // Customer / equipment
    section(t.customer);
    y = text(`${t.businessName}: ${estimate.business}`, 48, y, 10, navy, "bold");
    y = text(`${t.contact}: ${estimate.contact}   ${t.phone}: ${estimate.phone}`, 48, y);
    y = text(`${t.email}: ${estimate.email}   ${t.address}: ${estimate.address}`, 48, y);
    y = text(`${t.technician}: ${estimate.technician}`, 48, y);

    section(t.equipment);
    y = text(`${t.equipmentType}: ${t.equipmentOptions[estimate.equipmentType]}`, 48, y, 10, navy, "bold");
    y = text(`${t.manufacturer}: ${estimate.manufacturer}   ${t.model}: ${estimate.model}   ${t.serial}: ${estimate.serial}`, 48, y);

    section(t.diagnostic);
    y = text(`${t.symptom}: ${lang === "ru" ? estimate.symptomRu : estimate.symptomEn}`, 48, y, 10, navy, "normal", 500);
    y += 4;
    y = text(`${t.finding}: ${lang === "ru" ? estimate.findingRu : estimate.findingEn}`, 48, y, 10, navy, "normal", 500);
    y += 4;
    y = text(`${t.recommendation}: ${lang === "ru" ? estimate.recommendationRu : estimate.recommendationEn}`, 48, y, 10, navy, "normal", 500);

    section(t.workIncluded);
    estimate.items.forEach(item => {
      checkLine(lang === "ru" ? item.nameRu : item.nameEn);
      if (y > 690) { doc.addPage(); y = 50; }
    });

    section(t.price);
    const startY = y;
    doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(...gray);
    doc.text("#", 48, y); doc.text(lang === "ru" ? "Описание" : "Description", 72, y); doc.text(t.qty, 372, y); doc.text(t.unit, 430, y); doc.text(t.amount, 500, y);
    y += 10; line(48, y, 550); y += 14;

    doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(...navy);
    estimate.items.forEach((item, i) => {
      const name = lang === "ru" ? item.nameRu : item.nameEn;
      doc.text(String(i+1), 48, y);
      doc.text(doc.splitTextToSize(name, 285), 72, y);
      doc.text(String(item.qty), 380, y);
      doc.text(money(item.price), 430, y);
      doc.text(money(item.qty * item.price), 500, y);
      y += Math.max(18, doc.splitTextToSize(name, 285).length * 12);
      if (y > 700) { doc.addPage(); y = 50; }
    });

    y += 8; line(350, y, 550); y += 16;
    doc.setFont("helvetica", "normal"); doc.setFontSize(10);
    doc.text(`${t.subtotal}: ${money(subtotal)}`, 390, y); y += 16;
    doc.text(`${t.tax}: ${money(tax)}`, 390, y); y += 16;
    doc.text(`${t.discount}: -${money(estimate.discount)}`, 390, y); y += 18;
    doc.setFont("helvetica", "bold"); doc.setFontSize(16); doc.setTextColor(...orange);
    doc.text(`${t.total}: ${money(total)}`, 390, y); y += 12;

    if (y > 600) { doc.addPage(); y = 50; }
    section(t.warranty);
    y = text(t.warrantyText, 48, y, 10, navy, "normal", 500);
    section(t.terms);
    y = text(t.termsText, 48, y, 9, gray, "normal", 500);

    y += 28;
    doc.setFont("helvetica", "bold"); doc.setFontSize(11); doc.setTextColor(...navy);
    doc.text(t.customerApproval, 48, y);
    y += 34;
    line(48, y, 275);
    line(330, y, 550);
    doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(...gray);
    doc.text(lang === "ru" ? "Имя заказчика" : "Customer name", 48, y+14);
    doc.text(t.signature, 330, y+14);

    doc.save(`${estimate.number}-Forten-Estimate-${lang}.pdf`);
  }

  return (
    <main className="shell">
      <section className="hero">
        <div>
          <div className="topLine">
            <span className="eyebrow">{t.badge}</span>
            <button className="langBtn" onClick={() => setLang(lang === "ru" ? "en" : "ru")}><Languages size={18}/>{t.switch}</button>
          </div>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>
        <div className="heroCard">
          <div className="logoMark">F</div>
          <div><b>FORTEN</b><span>Commercial Equipment Services</span></div>
        </div>
      </section>

      <section className="quickTemplates">
        <button onClick={() => applyTemplate("compressor")}><Wrench size={18}/>{t.compressorTemplate}</button>
        <button onClick={() => applyTemplate("mixer")}><Wrench size={18}/>{t.mixerTemplate}</button>
        <button onClick={() => applyTemplate("fryer")}><Wrench size={18}/>{t.fryerTemplate}</button>
        <button onClick={() => applyTemplate("dishwasher")}><Wrench size={18}/>{t.dishwasherTemplate}</button>
        <button className="downloadBtn" onClick={makePdf}><Download size={18}/>{t.generatePdf}</button>
      </section>

      <section className="grid">
        <div className="card">
          <h2><Building2 size={22}/>{t.customer}</h2>
          <div className="formGrid">
            <Input label={t.estimateNo} value={estimate.number} onChange={v => patch("number", v)} />
            <Input label={t.date} type="date" value={estimate.date} onChange={v => patch("date", v)} />
            <Input label={t.validUntil} type="date" value={estimate.validUntil} onChange={v => patch("validUntil", v)} />
            <Input label={t.businessName} value={estimate.business} onChange={v => patch("business", v)} />
            <Input label={t.contact} value={estimate.contact} onChange={v => patch("contact", v)} />
            <Input label={t.phone} value={estimate.phone} onChange={v => patch("phone", v)} />
            <Input label={t.email} value={estimate.email} onChange={v => patch("email", v)} />
            <Input label={t.address} value={estimate.address} onChange={v => patch("address", v)} />
            <Input label={t.technician} value={estimate.technician} onChange={v => patch("technician", v)} />
          </div>
        </div>

        <div className="card">
          <h2><Wrench size={22}/>{t.equipment}</h2>
          <div className="formGrid">
            <div>
              <label>{t.equipmentType}</label>
              <select value={estimate.equipmentType} onChange={e => patch("equipmentType", e.target.value)}>
                {Object.keys(t.equipmentOptions).map(k => <option key={k} value={k}>{t.equipmentOptions[k]}</option>)}
              </select>
            </div>
            <Input label={t.manufacturer} value={estimate.manufacturer} onChange={v => patch("manufacturer", v)} />
            <Input label={t.model} value={estimate.model} onChange={v => patch("model", v)} />
            <Input label={t.serial} value={estimate.serial} onChange={v => patch("serial", v)} />
          </div>
        </div>

        <div className="card wide">
          <h2><ClipboardCheck size={22}/>{t.diagnostic}</h2>
          <label>{t.symptom}</label>
          <textarea value={lang === "ru" ? estimate.symptomRu : estimate.symptomEn} onChange={e => patch(lang === "ru" ? "symptomRu" : "symptomEn", e.target.value)} />
          <label>{t.finding}</label>
          <textarea value={lang === "ru" ? estimate.findingRu : estimate.findingEn} onChange={e => patch(lang === "ru" ? "findingRu" : "findingEn", e.target.value)} />
          <label>{t.recommendation}</label>
          <textarea value={lang === "ru" ? estimate.recommendationRu : estimate.recommendationEn} onChange={e => patch(lang === "ru" ? "recommendationRu" : "recommendationEn", e.target.value)} />
        </div>

        <div className="card wide">
          <div className="cardHeader">
            <h2><Calculator size={22}/>{t.price}</h2>
            <button className="secondaryBtn" onClick={addItem}><PlusCircle size={18}/>{t.addItem}</button>
          </div>

          <div className="items">
            {estimate.items.map((item, i) => (
              <div className="itemRow" key={i}>
                <select value={item.type} onChange={e => updateItem(i, "type", e.target.value)}>
                  <option value="service">{t.service}</option>
                  <option value="parts">{t.parts}</option>
                </select>
                <input value={lang === "ru" ? item.nameRu : item.nameEn} onChange={e => updateItem(i, lang === "ru" ? "nameRu" : "nameEn", e.target.value)} />
                <input type="number" value={item.qty} onChange={e => updateItem(i, "qty", Number(e.target.value))} />
                <input type="number" value={item.price} onChange={e => updateItem(i, "price", Number(e.target.value))} />
                <b>{"$" + (item.qty * item.price).toFixed(2)}</b>
                <button className="iconBtn" onClick={() => removeItem(i)}><Trash2 size={16}/></button>
              </div>
            ))}
          </div>

          <div className="totals">
            <div><span>{t.subtotal}</span><b>{"$" + subtotal.toFixed(2)}</b></div>
            <div><span>{t.tax}</span><input type="number" value={estimate.taxRate} onChange={e => patch("taxRate", Number(e.target.value))}/></div>
            <div><span>{t.discount}</span><input type="number" value={estimate.discount} onChange={e => patch("discount", Number(e.target.value))}/></div>
            <div className="grand"><span>{t.total}</span><b>{"$" + total.toFixed(2)}</b></div>
          </div>
        </div>

        <div className="card">
          <h2><ShieldCheck size={22}/>{t.warranty}</h2>
          <p>{t.warrantyText}</p>
          <h3>{t.terms}</h3>
          <p>{t.termsText}</p>
        </div>

        <div className="card previewCard">
          <h2><FileText size={22}/>{t.pdf}</h2>
          <div className="pdfPreview">
            <div className="pdfHead">
              <div className="logoMark small">F</div>
              <div><b>FORTEN</b><span>{t.tagline}</span></div>
            </div>
            <h3>{estimate.number}</h3>
            <p>{estimate.business}</p>
            <p>{t.equipmentOptions[estimate.equipmentType]}</p>
            <p>{lang === "ru" ? estimate.findingRu : estimate.findingEn}</p>
            <div className="previewTotal">{"$" + total.toFixed(2)}</div>
          </div>
          <button className="downloadWide" onClick={makePdf}><Download size={18}/>{t.generatePdf}</button>
        </div>
      </section>
    </main>
  );
}

function Input({ label, value, onChange, type = "text" }) {
  return <div><label>{label}</label><input type={type} value={value} onChange={e => onChange(e.target.value)} /></div>;
}
