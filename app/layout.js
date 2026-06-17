import "./globals.css";

export const metadata = {
  title: "Restaurant Repair CRM",
  description: "Bilingual CRM for restaurant equipment repair"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
