import "./globals.css";

<meta name="google-site-verification" content="gXHwzW1hPONEIOAw3lQjCxYUCm59DZ1Ms2iChYnIqwE" />

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
