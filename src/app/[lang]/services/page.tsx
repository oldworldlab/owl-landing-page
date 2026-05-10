import type { Metadata } from "next";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { JsonLd } from "@/components/seo/json-ld";
import { ServicesOverview } from "@/components/sections/services/services-overview";
import { absoluteUrl, localizedLanguages, siteConfig } from "@/config/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.services.title,
    description: dict.meta.services.description,
    openGraph: {
      title: dict.meta.services.title,
      description: dict.meta.services.description,
      url: absoluteUrl(`/${lang}/services`),
      images: [absoluteUrl(siteConfig.openGraphImage)],
    },
    alternates: {
      canonical: `/${lang}/services`,
      languages: localizedLanguages("/services"),
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const provider = {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
  };

  return (
    <section className="flex flex-col">
      <JsonLd
        id="services-structured-data"
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: dictionary.meta.services.title,
          url: absoluteUrl(`/${lang}/services`),
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@type": "Service",
                name: dictionary.services.hero.slides.first.title,
                description:
                  dictionary.services.services.additive.caseStudy.description,
                serviceType: "Industrial AI automation",
                provider,
              },
            },
            {
              "@type": "ListItem",
              position: 2,
              item: {
                "@type": "Service",
                name: dictionary.services.hero.slides.second.title,
                description:
                  dictionary.services.services.robotics.caseStudy.description,
                serviceType: "Robotics and hardware integration",
                provider,
              },
            },
            {
              "@type": "ListItem",
              position: 3,
              item: {
                "@type": "Service",
                name: dictionary.services.hero.slides.third.title,
                description:
                  dictionary.services.services.digital.caseStudy.description,
                serviceType: "Software automation and simulation",
                provider,
              },
            },
          ],
        }}
      />
      <ServicesOverview dictionary={dictionary.services} />
    </section>
  );
}
