import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import { getSettings } from "@/lib/cosmic";

export const generateMetadata = async () => {
  const settings = await getSettings();
  return {
    title: settings.metadata.title,
    description: settings.metadata.description,
  };
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
