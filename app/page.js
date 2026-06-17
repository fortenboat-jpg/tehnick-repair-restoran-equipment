"use client";

import { useMemo, useState } from "react";
import {
  Phone, MessageSquare, Mail, Search, MapPin, Wrench, Snowflake,
  Flame, Coffee, Truck, ClipboardList, DollarSign, TrendingUp,
  Users, CheckCircle2, AlertTriangle, Send
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid
} from "recharts";

const START_LEADS = [
  {
    id: 1,
    name: "Demo Pizza Tampa",
    category: "Pizza Restaurant",
    city: "Tampa",
    phone: "(813) 555-0101",
    email: "manager@example.com",
    address: "Tampa, FL",
    problem: "Walk-in cooler maintenance",
    value: 650,
    status: "New",
    priority: "Hot"
  },
  {
    id: 2,
    name: "Demo Bakery Brandon",
    category: "Bakery",
    city: "Brandon",
    phone: "(813) 555-0102",
    email: "",
    address: "Brandon, FL",
    problem: "Oven / freezer possible lead",
    value: 900,
    status: "Called",
    priority: "Warm"
  },
  {
    id: 3,
    name: "Clearwater Ice Cream",
    category: "Ice Cream Shop",
    city: "Clearwater",
    phone: "(727) 555-0103",
    email: "",
    address: "Clearwater, FL",
    problem: "Freezer / ice machine lead",
    value: 1200,
    status: "Estimate Sent",
    priority: "Hot"
  },
  {
    id: 4,
    name: "St Pete Deli",
    category: "Deli",
    city: "St Petersburg",
    phone: "(727) 555-0104",
    email: "",
    address: "St Petersburg, FL",
    problem: "Prep table not cooling",
    value: 480,
    status: "No Answer",
    priority: "Cold"
  },
  {
    id: 5,
    name: "Riverview Food Truck",
    category: "Food Truck",
    city: "Riverview",
    phone: "(813) 555-0105",
    email: "",
    address: "Riverview, FL",
    problem: "Generator / fryer / cooler service",
    value: 750,
    status: "Won",
    priority: "Hot"
  }
];

const statusColors = {
  New: "badgeBlue",
  Called: "badgePurple",
  "No Answer": "badgeGray",
  "Estimate Sent": "badgeOrange",
  Won: "badgeGreen",
  Lost: "badgeRed"
};

const equipmentIcons = {
  "Walk-in Cooler": Snowflake,
  "Walk-in Freezer": Snowflake,
  "Reach-in Cooler": Snowflake,
  "Prep Table": Coffee,
  "Ice Machine": Snowflake,
  "Commercial Oven": Flame,
  "Fryer": Flame,
  "Dishwasher": Wrench,
  "Other Restaurant Equipment": Wrench
};

export default function Page() {
  const [leads, setLeads] = useState(START_LEADS);
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");
  const [selectedLead, setSelectedLead] = useState(START_LEADS[0]);
  const [estimate, setEstimate] = useState({
    equipment: "Walk-in Cooler",
    problem: "Cooler not cooling / diagnostic required",
    serviceCall: 125,
    laborHours: 2,
    laborRate: 95,
    partsCost: 150,
    partsMarkup: 35,
    materials: 0,
    tripFee: 35,
    emergency: 1,
    taxRate: 0
  });

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const blob = Object.values(lead).join(" ").toLowerCase();
      return (!query || blob.includes(query.toLowerCase())) &&
        (!city || lead.city === city) &&
        (!status || lead.status === status);
    });
  }, [leads, query, city, status]);

  const stats = useMemo(() => {
    const pipeline = leads.reduce((sum, l) => sum + Number(l.value || 0), 0);
    const won = leads.filter(l => l.status === "Won").length;
    const estimates = leads.filter(l => l.status === "Estimate Sent").length;
    const hot = leads.filter(l => l.priority === "Hot").length;
    return { pipeline, won, estimates, hot };
  }, [leads]);

  const statusData = useMemo(() => {
    const statuses = ["New", "Called", "No Answer", "Estimate Sent", "Won", "Lost"];
    return statuses.map(s => ({ name: s, count: leads.filter(l => l.status === s).length }));
  }, [leads]);

  const categoryData = useMemo(() => {
    const map = {};
    leads.forEach(l => map[l.category] = (map[l.category] || 0) + 1);
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [leads]);

  const monthlyData = [
    { month: "Mon", calls: 12, estimates: 3 },
    { month: "Tue", calls: 18, estimates: 5 },
    { month: "Wed", calls: 22, estimates: 7 },
    { month: "Thu", calls: 15, estimates: 4 },
    { month: "Fri", calls: 28, estimates: 9 }
  ];

  const total = useMemo(() => {
    const labor = estimate.laborHours * estimate.laborRate * Number(estimate.emergency);
    const parts = estimate.partsCost * (1 + estimate.partsMarkup / 100);
    const subtotal = estimate.serviceCall + labor + parts + estimate.materials + estimate.tripFee;
    const tax = subtotal * estimate.taxRate / 100;
    return { labor, parts, subtotal, tax, total: subtotal + tax };
  }, [estimate]);

  const estimateText = `Estimate for ${selectedLead?.name || "Customer"}

Equipment: ${estimate.equipment}
Reported problem: ${estimate.problem}

Service call / diagnostic: ${money(estimate.serviceCall)}
Labor: ${estimate.laborHours} hour(s) x ${money(estimate.laborRate)}/hr
Parts estimate with markup: ${money(total.parts)}
Materials / refrigerant: ${money(estimate.materials)}
Trip fee: ${money(estimate.tripFee)}
Tax: ${money(total.tax)}

Estimated total: ${money(total.total)}

Note: final price may change after full diagnostic if additional parts, refrigerant leak repair, compressor work, electrical issues, or access problems are found.`;

  function changeLeadStatus(id, newStatus) {
    setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
  }

  function updateEstimate(key, value) {
    setEstimate(prev => ({ ...prev, [key]: value }));
  }

  function copyEstimate() {
    navigator.clipboard.writeText(estimateText);
    alert("Estimate copied");
  }

  const EquipmentIcon = equipmentIcons[estimate.equipment] || Wrench;

  return (
    <main className="shell">
      <section className="hero">
        <div>
          <div className="eyebrow">Tampa Bay commercial repair</div>
          <h1>Restaurant Equipment Repair Dashboard</h1>
          <p>Поиск клиентов, обзвон, статусы, estimate и воронка продаж в одном понятном экране.</p>
        </div>
        <div className="heroCard">
          <Wrench size={36} />
          <div>
            <b>Emergency repair focus</b>
            <span>Walk-in coolers · freezers · ice machines · prep tables</span>
          </div>
        </div>
      </section>

      <section className="statsGrid">
        <Stat icon={Users} label="Всего лидов" value={leads.length} />
        <Stat icon={TrendingUp} label="Pipeline value" value={money(stats.pipeline)} />
        <Stat icon={Send} label="Estimates sent" value={stats.estimates} />
        <Stat icon={CheckCircle2} label="Won clients" value={stats.won} />
      </section>

      <section className="dashboardGrid">
        <div className="card wide">
          <div className="cardHeader">
            <div>
              <h2>Поиск клиентов</h2>
              <p>Фильтруй рестораны, кафе, bakery, food truck и сразу звони.</p>
            </div>
            <button className="primaryBtn">+ Add lead</button>
          </div>

          <div className="filters">
            <div className="searchBox">
              <Search size={18} />
              <input placeholder="pizza, freezer, ice machine, Tampa..." value={query} onChange={e => setQuery(e.target.value)} />
            </div>
            <select value={city} onChange={e => setCity(e.target.value)}>
              <option value="">All cities</option>
              <option>Tampa</option>
              <option>St Petersburg</option>
              <option>Clearwater</option>
              <option>Brandon</option>
              <option>Riverview</option>
              <option>Lakeland</option>
              <option>Sarasota</option>
            </select>
            <select value={status} onChange={e => setStatus(e.target.value)}>
              <option value="">All statuses</option>
              <option>New</option>
              <option>Called</option>
              <option>No Answer</option>
              <option>Estimate Sent</option>
              <option>Won</option>
              <option>Lost</option>
            </select>
          </div>

          <div className="leadList">
            {filteredLeads.map(lead => (
              <article className="leadCard" key={lead.id} onClick={() => setSelectedLead(lead)}>
                <div className="leadTop">
                  <div>
                    <h3>{lead.name}</h3>
                    <p><MapPin size={14} /> {lead.city} · {lead.category}</p>
                  </div>
                  <span className={`badge ${statusColors[lead.status]}`}>{lead.status}</span>
                </div>
                <div className="problemLine"><AlertTriangle size={15} /> {lead.problem}</div>
                <div className="leadFooter">
                  <b>{money(lead.value)}</b>
                  <div className="leadActions">
                    <a href={`tel:${lead.phone}`}><Phone size={16} /></a>
                    <a href={`sms:${lead.phone}`}><MessageSquare size={16} /></a>
                    {lead.email && <a href={`mailto:${lead.email}`}><Mail size={16} /></a>}
                  </div>
                </div>
                <div className="statusButtons">
                  {["Called", "No Answer", "Estimate Sent", "Won"].map(s => (
                    <button key={s} onClick={(e) => { e.stopPropagation(); changeLeadStatus(lead.id, s); }}>{s}</button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="card">
          <h2>Воронка</h2>
          <p>Сколько клиентов на каждом этапе.</p>
          <div className="chartBox">
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={statusData}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h2>Типы клиентов</h2>
          <p>Куда лучше звонить сегодня.</p>
          <div className="chartBox">
            <ResponsiveContainer width="100%" height={230}>
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={82} label />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h2>Активность</h2>
          <p>Звонки и estimates за неделю.</p>
          <div className="chartBox">
            <ResponsiveContainer width="100%" height={230}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="calls" strokeWidth={3} />
                <Line type="monotone" dataKey="estimates" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card estimateCard">
          <div className="cardHeader">
            <div>
              <h2>Калькулятор estimate</h2>
              <p>Выбери клиента и сразу получи цену + текст для отправки.</p>
            </div>
            <div className="estimateIcon"><EquipmentIcon /></div>
          </div>

          <div className="selectedClient">
            <span>Selected client</span>
            <b>{selectedLead?.name}</b>
          </div>

          <label>Equipment</label>
          <select value={estimate.equipment} onChange={e => updateEstimate("equipment", e.target.value)}>
            <option>Walk-in Cooler</option>
            <option>Walk-in Freezer</option>
            <option>Reach-in Cooler</option>
            <option>Prep Table</option>
            <option>Ice Machine</option>
            <option>Commercial Oven</option>
            <option>Fryer</option>
            <option>Dishwasher</option>
            <option>Other Restaurant Equipment</option>
          </select>

          <label>Problem</label>
          <textarea value={estimate.problem} onChange={e => updateEstimate("problem", e.target.value)} />

          <div className="calcGrid">
            <Input label="Service call $" value={estimate.serviceCall} onChange={v => updateEstimate("serviceCall", v)} />
            <Input label="Labor hours" value={estimate.laborHours} step="0.5" onChange={v => updateEstimate("laborHours", v)} />
            <Input label="Labor rate $" value={estimate.laborRate} onChange={v => updateEstimate("laborRate", v)} />
            <Input label="Parts cost $" value={estimate.partsCost} onChange={v => updateEstimate("partsCost", v)} />
            <Input label="Parts markup %" value={estimate.partsMarkup} onChange={v => updateEstimate("partsMarkup", v)} />
            <Input label="Materials $" value={estimate.materials} onChange={v => updateEstimate("materials", v)} />
            <Input label="Trip fee $" value={estimate.tripFee} onChange={v => updateEstimate("tripFee", v)} />
            <Input label="Tax %" value={estimate.taxRate} onChange={v => updateEstimate("taxRate", v)} />
          </div>

          <label>Priority</label>
          <select value={estimate.emergency} onChange={e => updateEstimate("emergency", Number(e.target.value))}>
            <option value={1}>Normal</option>
            <option value={1.25}>Same day +25%</option>
            <option value={1.5}>After hours +50%</option>
            <option value={2}>Emergency/night +100%</option>
          </select>

          <div className="priceBox">
            <span>Estimated total</span>
            <b>{money(total.total)}</b>
            <small>Labor {money(total.labor)} · Parts {money(total.parts)} · Tax {money(total.tax)}</small>
          </div>

          <textarea className="estimateText" value={estimateText} readOnly />
          <button className="primaryBtn full" onClick={copyEstimate}>Copy estimate text</button>
        </div>
      </section>
    </main>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="statCard">
      <div className="statIcon"><Icon size={22} /></div>
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}

function Input({ label, value, onChange, step = "1" }) {
  return (
    <div>
      <label>{label}</label>
      <input type="number" step={step} value={value} onChange={e => onChange(Number(e.target.value))} />
    </div>
  );
}

function money(v) {
  return "$" + Number(v || 0).toFixed(2);
}
