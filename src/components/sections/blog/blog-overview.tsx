"use client";

import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/data/blogPosts";
import type { PostMetadata } from "@/lib/blog";

interface BlogOverviewProps {
  posts: (BlogPost & { metadata: PostMetadata })[];
  dictionary: {
    blog: {
      title: string;
      subtitle: string;
      readMore: string;
    };
  };
  lang: string;
}

export function BlogOverview({ posts, dictionary, lang }: BlogOverviewProps) {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container">
        <h1 className="text-xl font-semibold sm:text-2xl">
          <span className="flex flex-col">
            <span className="text-foreground">{dictionary.blog.title}</span>
            <span className="text-muted-foreground">
              {dictionary.blog.subtitle}
            </span>
          </span>
        </h1>

        {/* Featured post */}
        <div className="relative mt-8 overflow-hidden rounded-3xl bg-background shadow-[2px_4px_12px_rgba(0,0,0,0.08)] dark:shadow-[2px_4px_12px_rgba(0,0,0,0.3)]">
          {posts[0] && (
            <Link
              href={`/${lang}/blog/${posts[0].date.split("-").slice(0, 2).join("/")}/${posts[0].id}`}
              className="group grid md:grid-cols-2"
            >
              <div className="relative aspect-video md:aspect-auto md:h-full">
                <Image
                  src={posts[0].image}
                  alt={posts[0].metadata.title}
                  fill
                  className="object-cover transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <p className="text-sm text-muted-foreground">
                  {new Date(posts[0].date).toLocaleDateString(lang, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h2 className="mt-4 text-xl font-semibold text-foreground">
                  {posts[0].metadata.title}
                </h2>
                <p className="mt-4 text-pretty text-base text-muted-foreground">
                  {posts[0].metadata.excerpt}
                </p>
                <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                  {dictionary.blog.readMore}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </Link>
          )}
        </div>

        {/* More Posts Grid */}
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(1).map((post) => (
            <div
              key={post.id}
              className="overflow-hidden rounded-3xl bg-background shadow-[2px_4px_12px_rgba(0,0,0,0.08)] dark:shadow-[2px_4px_12px_rgba(0,0,0,0.3)]"
            >
              <Link
                href={`/${lang}/blog/${post.date.split("-").slice(0, 2).join("/")}/${post.id}`}
                className="group block"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={post.image}
                    alt={post.metadata.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-muted-foreground">
                    {new Date(post.date).toLocaleDateString(lang, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {post.metadata.title}
                  </h3>
                  <p className="mt-2 text-pretty text-sm text-muted-foreground">
                    {post.metadata.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                    {dictionary.blog.readMore}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
