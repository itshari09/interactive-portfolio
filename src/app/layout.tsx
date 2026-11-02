import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sri Hari — AI/ML Engineer & Developer",
  description: "Portfolio of Sri Hari: AI/ML, software development, and creative technology.",
  applicationName: "Sri Hari Portfolio",
  openGraph: {
    title: "Sri Hari — AI/ML Engineer & Developer",
    description: "Building intelligent software and digital experiences.",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
