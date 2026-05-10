import type { Metadata } from "next";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { JsonLd } from "@/components/seo/json-ld";
import { Hero } from "@/components/sections/hero";
import { TechSlider } from "@/components/sections/tech-slider";
import { Benefits } from "@/components/sections/benefits";
import { Industries } from "@/components/sections/industries";
import { AboutTeaser } from "@/components/sections/about-teaser";
import { ContactTeaser } from "@/components/sections/contact/contact-teaser";
import { absoluteUrl, localizedLanguages, siteConfig } from "@/config/site";

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
    openGraph: {
      title: dict.meta.home.title,
      description: dict.meta.home.description,
      url: absoluteUrl(`/${lang}`),
      images: [absoluteUrl(siteConfig.openGraphImage)],
    },
    alternates: {
      canonical: `/${lang}`,
      languages: localizedLanguages(),
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
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl("/logo_dark.svg"),
    email: siteConfig.email,
    foundingDate: siteConfig.founded,
    founder: {
      "@type": "Person",
      name: siteConfig.founder,
    },
    description: siteConfig.description,
    sameAs: siteConfig.sameAs,
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: lang,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <div className="flex flex-col">
      <JsonLd
        id="home-structured-data"
        data={[organizationJsonLd, websiteJsonLd]}
      />
      <Hero dictionary={dictionary} lang={lang} />
      <TechSlider />
      <Benefits dictionary={dictionary} />
      <AboutTeaser dictionary={dictionary} lang={lang} />
      <Industries dictionary={dictionary} />
      <ContactTeaser dictionary={dictionary.contact} />
    </div>
  );
}
