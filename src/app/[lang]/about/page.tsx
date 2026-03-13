import type { Metadata } from "next";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { locales } from "@/middleware";
import { Gallery } from "@/components/sections/about/gallery";
import { Story } from "@/components/sections/about/story";
import { Timeline } from "@/components/sections/about/timeline";

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
    alternates: {
      canonical: `/${lang}/about`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `/${l}/about`]),
      ),
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
      <Story dictionary={dictionary.about} />
      <Timeline dictionary={dictionary.about} />
      <Gallery dictionary={dictionary.about} />
    </div>
  );
}
