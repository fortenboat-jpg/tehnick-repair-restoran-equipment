import { redirect } from "next/navigation";

export const metadata = {
  title: "Forten CRM moved",
  robots: { index: false, follow: false }
};

export default function CrmMovedPage() {
  redirect("/admin");
}
