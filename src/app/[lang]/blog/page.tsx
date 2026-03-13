import type { Metadata } from "next";
import { blogPosts } from "@/data/blogPosts";
import { getPostMetadata } from "@/lib/blog";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { locales } from "@/middleware";
import { BlogOverview } from "@/components/sections/blog/blog-overview";

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
    alternates: {
      canonical: `/${lang}/blog`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `/${l}/blog`]),
      ),
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
