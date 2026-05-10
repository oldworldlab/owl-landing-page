import type { Metadata } from "next";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { JsonLd } from "@/components/seo/json-ld";
import { ContactContent } from "@/components/sections/contact/contact-content";
import { absoluteUrl, localizedLanguages, siteConfig } from "@/config/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
    openGraph: {
      title: dict.meta.contact.title,
      description: dict.meta.contact.description,
      url: absoluteUrl(`/${lang}/contact`),
      images: [absoluteUrl(siteConfig.openGraphImage)],
    },
    alternates: {
      canonical: `/${lang}/contact`,
      languages: localizedLanguages("/contact"),
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <>
      <JsonLd
        id="contact-structured-data"
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: dictionary.meta.contact.title,
          description: dictionary.meta.contact.description,
          url: absoluteUrl(`/${lang}/contact`),
          mainEntity: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
            email: siteConfig.email,
            contactPoint: {
              "@type": "ContactPoint",
              email: siteConfig.email,
              contactType: "sales",
              availableLanguage: ["English"],
            },
          },
        }}
      />
      <ContactContent dictionary={dictionary.contact} />
    </>
  );
}
