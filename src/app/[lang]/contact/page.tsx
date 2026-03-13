import type { Metadata } from "next";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { locales } from "@/middleware";
import { ContactContent } from "@/components/sections/contact/contact-content";

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
    alternates: {
      canonical: `/${lang}/contact`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `/${l}/contact`]),
      ),
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

  return <ContactContent dictionary={dictionary.contact} />;
}
