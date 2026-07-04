import AdminApp from "./AdminApp";

export const metadata = {
  title: "Forten Admin",
  robots: { index: false, follow: false }
};

export default function AdminPage() {
  return <AdminApp />;
}
