import "./globals.css";

export const metadata = {
  title: "Cosmic Slideshow",
  description: "Cosmic CMS Product Updates Slideshow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
