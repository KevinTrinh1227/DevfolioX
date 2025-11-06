import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "../config/siteConfig";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: siteConfig.name + " – " + siteConfig.title,
  description: siteConfig.tagline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Analytics />
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
