import LeadCollectorClient from "./LeadCollectorClient";

export const metadata = {
  title: "Forten Lead Collector",
  robots: { index: false, follow: false }
};

export default function AdminLeadCollectorPage() {
  return <LeadCollectorClient />;
}
