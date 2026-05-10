"use client";

import { ContactForm } from "./contact-form";
import { ContactFAQ } from "./contact-faq";

interface ContactContentProps {
  dictionary: {
    title: {
      main: string;
      sub: string;
    };
    form: {
      title: string;
      description: string;
      emailLabel: string;
      subjectHint: string;
      detailsTitle: string;
      details: string[];
      submit: string;
    };
    faq: {
      title: string;
      items: {
        question: string;
        answer: string;
      }[];
    };
  };
}

export function ContactContent({ dictionary }: ContactContentProps) {
  return (
    <div className="container py-24">
      <h1 className="mb-8 text-xl font-semibold sm:text-2xl">
        <span className="flex flex-col">
          <span className="text-foreground">{dictionary.title.main}</span>
          <span className="text-muted-foreground">{dictionary.title.sub}</span>
        </span>
      </h1>

      <div className="grid gap-8 md:grid-cols-[1.5fr_1fr]">
        <div className="overflow-hidden rounded-3xl bg-background p-6 shadow-[2px_4px_12px_rgba(0,0,0,0.08)] dark:shadow-[2px_4px_12px_rgba(0,0,0,0.3)]">
          <ContactForm dictionary={dictionary.form} />
        </div>
        <div className="overflow-hidden rounded-3xl bg-background p-6 shadow-[2px_4px_12px_rgba(0,0,0,0.08)] dark:shadow-[2px_4px_12px_rgba(0,0,0,0.3)]">
          <ContactFAQ dictionary={dictionary.faq} />
        </div>
      </div>
    </div>
  );
}
