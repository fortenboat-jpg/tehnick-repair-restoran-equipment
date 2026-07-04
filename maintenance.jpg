import { FileText, Receipt, ShieldCheck, Wrench } from "lucide-react";

export const metadata = {
  title: "Forten Customer Portal",
  robots: { index: false, follow: false }
};

const modules = [
  ["Quotes", "Future customer quote review and approval area.", FileText],
  ["Invoices", "Future invoice balance, payment status, and receipt access.", Receipt],
  ["Equipment", "Future equipment list with model, serial, warranty, and photos.", Wrench],
  ["Service History", "Future repair timeline, diagnostics, invoices, and warranty notes.", ShieldCheck]
];

export default function PortalPreparationPage() {
  return (
    <main className="siteShell">
      <section className="panel heroAdmin">
        <p className="eyebrow">Customer Portal</p>
        <h1>Forten Customer Portal</h1>
        <p>Architecture placeholder for future customer access. Login is not implemented yet.</p>
      </section>
      <section className="section">
        <div className="serviceGrid">
          {modules.map(([title, text, Icon]) => (
            <article className="serviceCard" key={title}>
              <Icon size={24} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
