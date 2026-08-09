import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Oxanium } from "next/font/google";
import "./globals.css";

import { ToastProvider } from "@/components/shared/ToastProvider";
import { ThemeProvider } from "@/components/theme/theme-provider";

const oxanium = Oxanium({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: "Professional developer portfolio of Tahajib Munna, showcasing modern web applications, full-stack projects, technical skills, and development work.",
  keywords: [
    siteConfig.name,
    siteConfig.title,
    siteConfig.subtitle,
    "Full Stack Developer",
    "Web Developer",
    "Frontend Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "MongoDB Developer",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    title: `Tahajib Munna | Full-Stack Web Developer`,
    description: "Professional developer portfolio of Tahajib Munna, showcasing modern web applications, full-stack projects, technical skills, and development work.",
    siteName: `${siteConfig.name} Portfolio`,
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: `Tahajib Munna Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Tahajib Munna | Full-Stack Web Developer`,
    description: "Professional developer portfolio of Tahajib Munna, showcasing modern web applications, full-stack projects, technical skills, and development work.",
    images: ["/profile.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        oxanium.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToastProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
