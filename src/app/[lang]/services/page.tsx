import type { Metadata } from "next";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { locales } from "@/middleware";
import { ServicesOverview } from "@/components/sections/services/services-overview";

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
    alternates: {
      canonical: `/${lang}/services`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `/${l}/services`]),
      ),
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

  return (
    <section className="flex flex-col">
      <ServicesOverview dictionary={dictionary.services} />
    </section>
  );
}
