import { notFound } from "next/navigation";
import AdminApp from "../AdminApp";

export const metadata = {
  title: "Forten Admin",
  robots: { index: false, follow: false }
};

const tabBySection = {
  leads: "Leads",
  dispatch: "Dispatch",
  tickets: "Tickets",
  mentor: "Mentor",
  customers: "Customers",
  quotes: "Quotes",
  estimates: "Quotes",
  "work-orders": "Work Orders",
  invoices: "Invoices",
  marketing: "Marketing",
  equipment: "Customers",
  settings: "Settings"
};

export default function AdminSectionPage({ params }) {
  const tab = tabBySection[params.section];
  if (!tab) notFound();
  return <AdminApp initialTab={tab} />;
}
