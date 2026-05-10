"use client";

import { useMobileMenu } from "@/stores/mobile-menu";
import { ThemeToggle } from "./actions/theme-toggle";
import { LanguageSwitcher } from "./actions/language-switcher";
import { Nav } from "./nav";
import { Navigation } from "@/types/nav";
import { CONTACT_EMAIL, contactMailto } from "@/config/site";

interface MobileMenuProps {
  dictionary: {
    header: {
      logo: string;
      nav: Navigation;
      actions: {
        getQuote: string;
      };
    };
    mobile: {
      getInTouch: {
        title: string;
        description: string;
      };
    };
  };
}

export function MobileMenu({ dictionary }: MobileMenuProps) {
  const { isOpen, close } = useMobileMenu();

  return (
    <div
      className={`fixed inset-0 z-30 bg-background/95 backdrop-blur-lg transition-opacity duration-200 ${
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <div className="h-full pt-[calc(0.5rem+2.75rem)]">
        <div className="container flex h-full flex-col p-8">
          {/* Get in Touch Section */}
          <div className="mb-16 space-y-3">
            <h3 className="text-lg">{dictionary.mobile.getInTouch.title}</h3>
            <p className="text-sm text-muted-foreground">
              {dictionary.mobile.getInTouch.description}
            </p>
            <a
              href={contactMailto()}
              className="inline-flex text-sm font-medium text-foreground transition-colors hover:text-violet-500"
              onClick={close}
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          {/* Navigation */}
          <div className="flex-1">
            <Nav
              dictionary={dictionary.header.nav}
              variant="mobile"
              onNavigate={close}
            />

            {/* Social Icons */}
            <div className="mt-8 flex items-center gap-6">
              <a
                href="https://x.com/NickLiverman"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-[#1DA1F2]">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/nickliverman/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-[#0A66C2]">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@oldworldlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-[#FF0000]">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex items-center justify-start pt-8">
            {/* Controls */}
            <div className="flex items-center gap-6">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
