import type { Metadata } from "next";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { JsonLd } from "@/components/seo/json-ld";
import { Gallery } from "@/components/sections/about/gallery";
import { Story } from "@/components/sections/about/story";
import { Timeline } from "@/components/sections/about/timeline";
import { absoluteUrl, localizedLanguages, siteConfig } from "@/config/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.about.title,
    description: dict.meta.about.description,
    openGraph: {
      title: dict.meta.about.title,
      description: dict.meta.about.description,
      url: absoluteUrl(`/${lang}/about`),
      images: [absoluteUrl(siteConfig.openGraphImage)],
    },
    alternates: {
      canonical: `/${lang}/about`,
      languages: localizedLanguages("/about"),
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div className="flex flex-col">
      <JsonLd
        id="about-organization"
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: dictionary.meta.about.title,
          description: dictionary.meta.about.description,
          url: absoluteUrl(`/${lang}/about`),
          mainEntity: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
            logo: absoluteUrl("/logo_dark.svg"),
            email: siteConfig.email,
            foundingDate: siteConfig.founded,
            founder: {
              "@type": "Person",
              name: siteConfig.founder,
            },
            sameAs: siteConfig.sameAs,
          },
        }}
      />
      <Story dictionary={dictionary.about} />
      <Timeline dictionary={dictionary.about} />
      <Gallery dictionary={dictionary.about} />
    </div>
  );
}
