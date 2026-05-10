"use client";

import { Button } from "@/components/ui/button";
import { InView } from "@/components/ui/in-view";
import { contactMailto } from "@/config/site";

interface ContactTeaserProps {
  dictionary: {
    teaser: {
      title: {
        main: string;
        sub: string;
      };
      cta: string;
      description: string;
    };
  };
}

export function ContactTeaser({ dictionary }: ContactTeaserProps) {
  return (
    <section className="container py-24">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <InView className="space-y-8">
          <h2 className="mb-8 text-xl font-semibold sm:text-2xl">
            <span className="flex flex-col">
              <span className="text-foreground">
                {dictionary.teaser.title.main}
              </span>
              <span className="text-muted-foreground">
                {dictionary.teaser.title.sub}
              </span>
            </span>
          </h2>
          <p className="text-pretty text-base text-muted-foreground">
            {dictionary.teaser.description}
          </p>
          <div className="pt-4">
            <Button asChild variant="outline">
              <a href={contactMailto()}>{dictionary.teaser.cta}</a>
            </Button>
          </div>
        </InView>
        <div className="hidden md:block" />
      </div>
    </section>
  );
}
