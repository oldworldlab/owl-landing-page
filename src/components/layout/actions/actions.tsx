"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { MobileToggle } from "./mobile-toggle";
import { useMobileMenu } from "@/stores/mobile-menu";
import { Navigation } from "@/types/nav";
import { contactMailto } from "@/config/site";

interface ActionsProps {
  dictionary: {
    getQuote: string;
    nav: Navigation;
  };
}

export function Actions({ dictionary }: ActionsProps) {
  const { toggle, isOpen } = useMobileMenu();

  return (
    <div className="flex items-center gap-4">
      <MobileToggle isOpen={isOpen} onToggle={toggle} />
      <div className="hidden lg:flex lg:items-center lg:gap-4">
        <LanguageSwitcher />
        <ThemeToggle />
        <Button asChild variant="outline">
          <a href={contactMailto()}>{dictionary.getQuote}</a>
        </Button>
      </div>
    </div>
  );
}
