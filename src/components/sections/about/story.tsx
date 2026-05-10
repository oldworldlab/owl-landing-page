"use client";

import Image from "next/image";
import innovation from "../../../../public/images/about/innovation.webp";
import { ExternalLink } from "lucide-react";

interface StoryProps {
  dictionary: {
    story: {
      title: {
        main: string;
        sub: string;
      };
      quote: string;
      early: {
        title: string;
        description: string;
        founder: {
          name: string;
          background: string;
          vision: string;
          link: string;
          learnMore: string;
        };
      };
      journey: {
        description: string;
        title: string;
      };
      current: {
        title: string;
        description: string;
      };
    };
  };
}

export function Story({ dictionary }: StoryProps) {
  return (
    <div className="container py-24">
      {/* Section Title */}
      <h1 className="mb-8 text-xl font-semibold sm:text-2xl">
        <span className="flex flex-col">
          <span className="text-foreground">{dictionary.story.title.main}</span>
          <span className="text-muted-foreground">
            {dictionary.story.title.sub}
          </span>
        </span>
      </h1>

      <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Combined Company & Founder Story */}
        <div className="relative col-span-1 overflow-hidden rounded-3xl bg-background p-6 shadow-[2px_4px_12px_rgba(0,0,0,0.08)] dark:shadow-[2px_4px_12px_rgba(0,0,0,0.3)]">
          <div className="flex h-full flex-col justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground">
                {dictionary.story.early.title}
              </h3>
              <p className="mt-2 text-pretty text-sm text-muted-foreground">
                {dictionary.story.early.description}
              </p>
              <h4 className="mt-4 text-base font-semibold text-foreground">
                {dictionary.story.early.founder.name}
              </h4>
              <p className="mt-2 text-pretty text-sm text-muted-foreground">
                {dictionary.story.early.founder.background}
              </p>
              <p className="mt-2 text-pretty text-sm text-muted-foreground">
                {dictionary.story.early.founder.vision}
              </p>
              <a
                href={dictionary.story.early.founder.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {dictionary.story.early.founder.learnMore}
                <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative overflow-hidden rounded-3xl">
          <Image
            src={innovation}
            alt="Innovation at Old World Labs"
            className="h-full w-full object-cover"
            priority
          />
        </div>

        {/* Journey & Current Work */}
        <div className="relative col-span-1 overflow-hidden rounded-3xl bg-background p-6 shadow-[2px_4px_12px_rgba(0,0,0,0.08)] dark:shadow-[2px_4px_12px_rgba(0,0,0,0.3)]">
          <div className="flex h-full flex-col justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground">
                {dictionary.story.journey.title}
              </h3>
              <p className="mt-2 text-pretty text-sm text-muted-foreground">
                {dictionary.story.journey.description}
              </p>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                {dictionary.story.current.title}
              </h3>
              <p className="mt-2 text-pretty text-sm text-muted-foreground">
                {dictionary.story.current.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="mt-8">
        <blockquote className="relative mx-auto max-w-2xl text-center">
          <p className="text-base italic text-muted-foreground sm:text-lg">
            &ldquo;{dictionary.story.quote}&rdquo;
          </p>
        </blockquote>
      </div>
    </div>
  );
}
