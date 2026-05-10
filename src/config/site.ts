export const SITE_URL = "https://oldworldlabs.com";
export const CONTACT_EMAIL = "info@oldworldlabs.com";
export const CONTACT_SUBJECT = "Project inquiry: AI automation";
export const DEFAULT_LOCALE = "en";
export const LOCALES = ["en", "de", "es", "ru", "ja", "zh", "fr"] as const;

export const siteConfig = {
  name: "Old World Labs",
  legalName: "Old World Labs",
  url: SITE_URL,
  email: CONTACT_EMAIL,
  founded: "2012",
  founder: "Nick Liverman",
  description:
    "Old World Labs designs AI automation systems for industrial hardware, robotics, software workflows, simulations, and advanced manufacturing environments.",
  keywords: [
    "AI automation",
    "industrial automation",
    "robotics integration",
    "hardware automation",
    "software automation",
    "AI agents",
    "digital twins",
    "advanced manufacturing",
  ],
  openGraphImage: "/images/hero/robotics-hero.webp",
  sameAs: [
    "https://www.nickliverman.com",
    "https://www.youtube.com/@oldworldlabs",
    "https://x.com/NickLiverman",
    "https://www.linkedin.com/in/nickliverman/",
  ],
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function localizedLanguages(route = "") {
  return {
    ...Object.fromEntries(
      LOCALES.map((locale) => [locale, `/${locale}${route}`]),
    ),
    "x-default": `/${DEFAULT_LOCALE}${route}`,
  };
}

export function contactMailto() {
  const params = new URLSearchParams({
    subject: CONTACT_SUBJECT,
  });

  return `mailto:${CONTACT_EMAIL}?${params.toString()}`;
}
