import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blogPosts";

const locales = ["en", "de", "es", "ru", "ja", "zh", "fr"];
const BASE_URL = "https://oldworldlabs.com";

const staticRoutes = ["", "/about", "/services", "/contact", "/blog"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages for each locale
  for (const route of staticRoutes) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}${route}`]),
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
        url: `${BASE_URL}/${locale}/blog/${year}/${month}/${post.id}`,
        lastModified: new Date(post.date),
        alternates: {
          languages: Object.fromEntries(
            post.translations.map((l) => [
              l,
              `${BASE_URL}/${l}/blog/${year}/${month}/${post.id}`,
            ]),
          ),
        },
      });
    }
  }

  return entries;
}
