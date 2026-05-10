import type { Metadata } from "next";
import { blogPosts } from "@/data/blogPosts";
import { getPostMetadata } from "@/lib/blog";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { BlogOverview } from "@/components/sections/blog/blog-overview";
import { absoluteUrl, localizedLanguages, siteConfig } from "@/config/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.blog.title,
    description: dict.meta.blog.description,
    openGraph: {
      title: dict.meta.blog.title,
      description: dict.meta.blog.description,
      url: absoluteUrl(`/${lang}/blog`),
      images: [absoluteUrl(siteConfig.openGraphImage)],
    },
    alternates: {
      canonical: `/${lang}/blog`,
      languages: localizedLanguages("/blog"),
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  // Only show posts that have a translation for the current language
  const availablePosts = blogPosts.filter((post) =>
    post.translations.includes(lang),
  );

  const postsWithMetadata = await Promise.all(
    availablePosts.map(async (post) => ({
      ...post,
      metadata: await getPostMetadata(post.id, lang),
    })),
  );

  return (
    <BlogOverview
      posts={postsWithMetadata}
      dictionary={dictionary}
      lang={lang}
    />
  );
}
