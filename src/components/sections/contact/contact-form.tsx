import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL, contactMailto } from "@/config/site";
import { Mail } from "lucide-react";

interface ContactFormProps {
  dictionary: {
    title: string;
    description: string;
    emailLabel: string;
    subjectHint: string;
    detailsTitle: string;
    details: string[];
    submit: string;
  };
}

export function ContactForm({ dictionary }: ContactFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-base font-semibold text-foreground">
          {dictionary.title}
        </h2>
        <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
          {dictionary.description}
        </p>
      </div>

      <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {dictionary.emailLabel}
        </p>
        <a
          href={contactMailto()}
          className="mt-2 inline-flex items-center gap-2 break-all text-base font-semibold text-foreground transition-colors hover:text-violet-500"
        >
          <Mail className="h-4 w-4 shrink-0" />
          {CONTACT_EMAIL}
        </a>
        <p className="mt-3 text-sm text-muted-foreground">
          {dictionary.subjectHint}
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-foreground">
          {dictionary.detailsTitle}
        </h3>
        <ul className="mt-3 space-y-2">
          {dictionary.details.map((detail) => (
            <li
              key={detail}
              className="flex gap-3 text-sm text-muted-foreground"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button asChild variant="outline">
        <a href={contactMailto()}>{dictionary.submit}</a>
      </Button>
    </div>
  );
}
