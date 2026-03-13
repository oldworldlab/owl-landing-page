import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://oldworldlabs.com"),
  title: {
    default: "Old World Labs",
    template: "%s | Old World Labs",
  },
  description: "Advanced Additive Solutions | Robotics & Unreal Development",
  openGraph: {
    type: "website",
    siteName: "Old World Labs",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
