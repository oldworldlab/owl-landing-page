import type { Metadata } from "next";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { locales } from "@/middleware";
import { Hero } from "@/components/sections/hero";
import { TechSlider } from "@/components/sections/tech-slider";
import { Benefits } from "@/components/sections/benefits";
import { Industries } from "@/components/sections/industries";
import { AboutTeaser } from "@/components/sections/about-teaser";
import { ContactTeaser } from "@/components/sections/contact/contact-teaser";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.home.title,
    description: dict.meta.home.description,
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div className="flex flex-col">
      <Hero dictionary={dictionary} lang={lang} />
      <TechSlider />
      <Benefits dictionary={dictionary} />
      <AboutTeaser dictionary={dictionary} lang={lang} />
      <Industries dictionary={dictionary} />
      <ContactTeaser dictionary={dictionary.contact} lang={lang} />
    </div>
  );
}
