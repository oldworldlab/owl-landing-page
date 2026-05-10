import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: "Old World Labs | AI Automation for Hardware and Software",
    template: "%s | Old World Labs",
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.founder }],
  creator: siteConfig.founder,
  publisher: siteConfig.name,
  category: "Industrial AI automation",
  openGraph: {
    type: "website",
    siteName: "Old World Labs",
    title: "Old World Labs | AI Automation for Hardware and Software",
    description: siteConfig.description,
    url: siteConfig.url,
    images: [
      {
        url: absoluteUrl(siteConfig.openGraphImage),
        alt: "Old World Labs robotics and industrial automation systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Old World Labs | AI Automation for Hardware and Software",
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.openGraphImage)],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
