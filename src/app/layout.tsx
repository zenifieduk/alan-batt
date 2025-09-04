import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideNavigation from "@/components/SideNavigation";
import SidebarProvider from "@/components/SidebarProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alan Batt - Development Showcase & Technology Platform",
  description: "Innovative development capabilities and technology platform showcasing modern solutions and AI integrations",
  other: {
    "color-scheme": "light only",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: "light only" }}>
      <head>
        <meta name="color-scheme" content="light only" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
        style={{ colorScheme: "light only" }}
      >
        <SidebarProvider>
          <SideNavigation />
          <div className="transition-all duration-300 ease-in-out" id="main-content">
            {children}
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
