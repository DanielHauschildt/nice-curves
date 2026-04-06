import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nice Curves",
  description: "Pure SVG + CSS animated mathematical curves",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}>
      <body className="h-svh flex bg-background text-foreground">
        <main className="flex-1 overflow-y-auto pb-14 md:pb-0">{children}</main>
        <AppSidebar />
      </body>
    </html>
  );
}
