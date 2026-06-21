import { notFound } from "next/navigation";
import AdminApp from "../AdminApp";

export const metadata = {
  title: "Forten Admin",
  robots: { index: false, follow: false }
};

const tabBySection = {
  tickets: "Tickets",
  dispatch: "Dispatch",
  technician: "Technician",
  mentor: "Mentor",
  quotes: "Quotes",
  estimates: "Quotes",
  invoices: "Invoices",
  customers: "Customers",
  equipment: "Equipment",
  inventory: "Inventory",
  reports: "Reports",
  kpi: "KPI",
  ai: "AI",
  "lead-collector": "Lead Collector",
  settings: "Settings"
};

export default function AdminSectionPage({ params }) {
  const tab = tabBySection[params.section];
  if (!tab) notFound();
  return <AdminApp initialTab={tab} />;
}
