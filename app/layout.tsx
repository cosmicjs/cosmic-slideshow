import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import cosmic from "@/lib/cosmic";

export const generateMetadata = async () => {
  const { object: settings } = await cosmic.objects
    .findOne({
      type: "settings",
      slug: "settings",
    })
    .props(`metadata`);
  const { metadata } = settings;
  return {
    title: metadata.title,
    description: metadata.description,
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
