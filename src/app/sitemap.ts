import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blogPosts";
import { LOCALES, SITE_URL } from "@/config/site";

const staticRoutes = [
  { route: "", priority: 1, changeFrequency: "monthly" },
  { route: "/services", priority: 0.95, changeFrequency: "monthly" },
  { route: "/contact", priority: 0.9, changeFrequency: "monthly" },
  { route: "/about", priority: 0.75, changeFrequency: "yearly" },
  { route: "/blog", priority: 0.7, changeFrequency: "monthly" },
] as const;

const SITE_LAST_MODIFIED = new Date("2026-05-10");

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages for each locale
  for (const { route, priority, changeFrequency } of staticRoutes) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_URL}/${locale}${route}`,
        lastModified: SITE_LAST_MODIFIED,
        changeFrequency,
        priority,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${SITE_URL}/${l}${route}`]),
          ),
        },
      });
    }
  }

  // Blog posts
  for (const post of blogPosts) {
    const [year, month] = post.date.split("-");
    for (const locale of post.translations) {
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${year}/${month}/${post.id}`,
        lastModified: new Date(post.date),
        changeFrequency: "yearly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            post.translations.map((l) => [
              l,
              `${SITE_URL}/${l}/blog/${year}/${month}/${post.id}`,
            ]),
          ),
        },
      });
    }
  }

  return entries;
}
