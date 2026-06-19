import "./globals.css";

export const metadata = {
  title: "Forten CRM Estimate",
  description: "Smart PDF estimate system for commercial kitchen equipment service"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
