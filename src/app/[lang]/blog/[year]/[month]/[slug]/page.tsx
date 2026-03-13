import type { Metadata } from "next";
import { blogPosts } from "@/data/blogPosts";
import { getPostData, getPostMetadata } from "@/lib/blog";
import { notFound } from "next/navigation";
import { BlogPostContent } from "@/components/sections/blog/blog-post-content";
import { BlogShare } from "@/components/sections/blog/blog-share";
import { getDictionary } from "@/app/[lang]/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; year: string; month: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, year, month, slug } = await params;
  const post = blogPosts.find((p) => p.id === slug);
  if (!post) return {};
  const metadata = await getPostMetadata(slug, lang);
  return {
    title: metadata.title,
    description: metadata.excerpt,
    openGraph: {
      type: "article",
      publishedTime: post.date,
      images: post.image ? [{ url: post.image }] : undefined,
    },
    alternates: {
      canonical: `/${lang}/blog/${year}/${month}/${slug}`,
      languages: Object.fromEntries(
        post.translations.map((l) => [
          l,
          `/${l}/blog/${year}/${month}/${slug}`,
        ]),
      ),
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ lang: string; year: string; month: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dictionary = await getDictionary(lang);
  const post = blogPosts.find((p) => p.id === slug);

  if (!post) {
    return notFound();
  }

  const postData = await getPostData(slug, lang);
  const url = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div>
      <h1 className="mb-8 text-xl font-semibold sm:text-2xl">
        <span className="flex flex-col">
          <span className="text-foreground">{postData.title}</span>
          <span className="text-muted-foreground">
            {dictionary.blog.article}
          </span>
        </span>
      </h1>
      <BlogPostContent post={post} postData={postData} lang={lang} />
      <BlogShare
        title={postData.title}
        url={url}
        dictionary={dictionary.blog.share}
      />
    </div>
  );
}
