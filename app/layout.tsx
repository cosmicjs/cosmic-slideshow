import "./globals.css";

export const metadata = {
  title: "Cosmic 2024 Year End Wrap Up",
  description: "Cosmic 2024 Year End Wrap Up Slideshow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
