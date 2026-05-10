import type { Metadata } from "next";
import { blogPosts } from "@/data/blogPosts";
import { getPostData, getPostMetadata } from "@/lib/blog";
import { notFound } from "next/navigation";
import { BlogPostContent } from "@/components/sections/blog/blog-post-content";
import { BlogShare } from "@/components/sections/blog/blog-share";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, siteConfig } from "@/config/site";

const researchCitationUrls = [
  "https://www.nickliverman.com/blog/3d-micro-mirror-lithography-mass-production",
  "https://www.proceedings.com/content/046/046756webtoc.pdf",
  "https://eurekamag.com/research/105/018/105018197.php",
  "https://3dprintingindustry.com/news/owl-unveils-new-nanoscopic-3d-printers-at-ces-39384/",
  "https://3dprint.com/35431/owl-mc-1-mc-2-ces-2015/",
  "https://www.livescience.com/49466-3d-printers-science-applications.html",
  "https://makezine.com/article/digital-fabrication/3d-printing-workshop/the-state-of-3d-printing-and-scanning-after-ces-2014-the-push-for-mainstreaming-begins/",
  "https://americanlibrariesmagazine.org/blogs/the-scoop/3d-printing-at-ces-2014/",
  "https://www.research.va.gov/currents/0818-Researchers-strive-to-make-3D-printed-artificial-lung-to-help-Vets-with-respiratory-disease.cfm",
  "https://patents.justia.com/assignee/old-world-labs",
];

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
      title: metadata.title,
      description: metadata.excerpt,
      url: absoluteUrl(`/${lang}/blog/${year}/${month}/${slug}`),
      publishedTime: post.date,
      images: post.image ? [{ url: absoluteUrl(post.image) }] : undefined,
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
  const [year, month] = post.date.split("-");
  const url = absoluteUrl(`/${lang}/blog/${year}/${month}/${slug}`);
  const isResearchPost = slug === "3d-micro-mirror-lithography-mass-production";

  return (
    <div>
      <JsonLd
        id="article-structured-data"
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: postData.title,
          description: postData.excerpt,
          image: post.image ? absoluteUrl(post.image) : undefined,
          datePublished: post.date,
          dateModified: post.date,
          inLanguage: lang,
          mainEntityOfPage: url,
          author: {
            "@type": "Person",
            name: siteConfig.founder,
          },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            logo: {
              "@type": "ImageObject",
              url: absoluteUrl("/logo_dark.svg"),
            },
          },
          citation: isResearchPost ? researchCitationUrls : undefined,
        }}
      />
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
