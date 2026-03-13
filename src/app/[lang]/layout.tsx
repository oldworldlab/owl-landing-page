import { Header } from "@/components/layout/header";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { Footer } from "@/components/layout/footer";
import { Preloader } from "@/components/layout/preloader";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function RootLayout({ children, params }: LayoutProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg"
        >
          Skip to content
        </a>
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Preloader />
          <Header dictionary={dictionary} />
          <MobileMenu dictionary={dictionary} />
          <main id="main-content" className="bg-zinc-100 dark:bg-black">
            {children}
          </main>
          <Footer dictionary={dictionary} />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
