"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { BlogPost } from "@/data/blogPosts";
import type { PostData } from "@/lib/blog";

interface BlogPostContentProps {
  post: BlogPost;
  postData: PostData;
  lang: string;
}

export function BlogPostContent({
  post,
  postData,
  lang,
}: BlogPostContentProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-3xl bg-background p-8 shadow-[2px_4px_12px_rgba(0,0,0,0.08)] dark:shadow-[2px_4px_12px_rgba(0,0,0,0.3)]"
    >
      <p className="mb-8 text-sm text-muted-foreground">
        {new Date(post.date).toLocaleDateString(lang, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <div
        className={cn(
          "prose max-w-none dark:prose-invert",
          "prose-headings:font-semibold prose-h2:mb-4 prose-h2:mt-8 prose-h2:text-xl",
          "prose-p:text-base prose-p:leading-relaxed prose-p:text-muted-foreground",
          "prose-blockquote:border-l-4 prose-blockquote:border-primary/50 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground",
          "prose-ul:list-disc prose-ul:pl-4 prose-ul:text-muted-foreground",
          "prose-li:my-1 prose-li:text-muted-foreground",
          "prose-strong:font-semibold prose-strong:text-foreground",
        )}
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
    </motion.article>
  );
}
