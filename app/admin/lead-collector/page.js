import AdminApp from "../AdminApp";

export const metadata = {
  title: "Forten Lead Collector",
  robots: { index: false, follow: false }
};

export default function AdminLeadCollectorPage() {
  return <AdminApp initialTab="Lead Collector" />;
}
