import LoginClient from "./LoginClient";

export const metadata = {
  title: "Forten Admin Login",
  robots: { index: false, follow: false }
};

export default function AdminLoginPage() {
  return <LoginClient />;
}
