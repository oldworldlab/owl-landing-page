import { Navigation } from "@/types/nav";
import { Nav } from "./nav";
import { CONTACT_EMAIL, contactMailto } from "@/config/site";

interface FooterProps {
  dictionary: {
    header: {
      nav: Navigation;
    };
    footer: {
      copyright: string;
    };
  };
}

export function Footer({ dictionary }: FooterProps) {
  return (
    <footer className="bg-background">
      <div className="container flex flex-col items-center py-16">
        <Nav dictionary={dictionary.header.nav} variant="footer" />
        <a
          href={contactMailto()}
          className="mt-6 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {CONTACT_EMAIL}
        </a>
        <div className="mt-4 text-sm text-muted-foreground">
          {dictionary.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
