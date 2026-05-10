"use client";

import { InView } from "@/components/ui/in-view";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import advancedAdditiveSolutions from "../../../../public/images/hero/advanced-additive-solutions-hero.webp";
import robotics from "../../../../public/images/hero/robotics-hero.webp";
import unrealDevelopment from "../../../../public/images/hero/unreal-development-hero.webp";

interface ServicesOverviewProps {
  dictionary: {
    title: {
      main: string;
      sub: string;
    };
    description: string;
    hero: {
      slides: {
        first: { title: string; subtitle: string };
        second: { title: string; subtitle: string };
        third: { title: string; subtitle: string };
      };
    };
    services: {
      additive: {
        features: string[];
        caseStudy: {
          title: string;
          description: string;
          link: string;
        };
      };
      robotics: {
        features: string[];
        caseStudy: {
          title: string;
          description: string;
          link: string;
        };
      };
      digital: {
        features: string[];
        caseStudy: {
          title: string;
          description: string;
          link: string;
        };
      };
      viewCaseStudy: string;
    };
  };
}

export function ServicesOverview({ dictionary }: ServicesOverviewProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="container py-24">
        <InView
          className="space-y-8"
          variants={{
            hidden: { opacity: 0, filter: "blur(4px)" },
            visible: { opacity: 1, filter: "blur(0px)" },
          }}
        >
          <h1 className="text-xl font-semibold sm:text-2xl">
            <span className="flex flex-col">
              <span className="text-foreground">{dictionary.title.main}</span>
              <span className="text-muted-foreground">
                {dictionary.title.sub}
              </span>
            </span>
          </h1>
          <p className="text-pretty text-base text-muted-foreground">
            {dictionary.description}
          </p>
        </InView>
      </section>

      {/* Services Sections */}
      <section className="container mb-24">
        <div className="space-y-24">
          {/* Advanced Additive Solutions */}
          <div id="additive-solutions" className="scroll-mt-32">
            <ServiceSection
              title={dictionary.hero.slides.first.title}
              description={dictionary.hero.slides.first.subtitle}
              features={dictionary.services.additive.features}
              image={advancedAdditiveSolutions}
              caseStudy={dictionary.services.additive.caseStudy}
              imagePosition="right"
              showCaseStudy={false}
              dictionary={dictionary}
            />
          </div>

          {/* Robotics & Automation */}
          <div id="robotics-automation" className="scroll-mt-32">
            <ServiceSection
              title={dictionary.hero.slides.second.title}
              description={dictionary.hero.slides.second.subtitle}
              features={dictionary.services.robotics.features}
              image={robotics}
              caseStudy={dictionary.services.robotics.caseStudy}
              imagePosition="left"
              showCaseStudy={true}
              dictionary={dictionary}
            />
          </div>

          {/* Unreal Engine Development */}
          <div id="unreal-development" className="scroll-mt-32">
            <ServiceSection
              title={dictionary.hero.slides.third.title}
              description={dictionary.hero.slides.third.subtitle}
              features={dictionary.services.digital.features}
              image={unrealDevelopment}
              caseStudy={dictionary.services.digital.caseStudy}
              imagePosition="right"
              showCaseStudy={true}
              dictionary={dictionary}
            />
          </div>
        </div>
      </section>
    </>
  );
}

interface ServiceSectionProps {
  title: string;
  description: string;
  features: string[];
  image: string | StaticImageData;
  caseStudy: {
    title: string;
    description: string;
    link: string;
  };
  imagePosition: "left" | "right";
  showCaseStudy: boolean;
  dictionary: {
    services: {
      viewCaseStudy: string;
    };
  };
}

function ServiceSection({
  title,
  description,
  features,
  image,
  caseStudy,
  imagePosition,
  dictionary,
  showCaseStudy,
}: ServiceSectionProps) {
  return (
    <InView
      variants={{
        hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`group flex flex-col sm:flex-row sm:items-center sm:justify-between ${
          imagePosition === "left" ? "sm:flex-row" : "sm:flex-row-reverse"
        }`}
      >
        {/* Main Content */}
        <div className="relative w-full overflow-hidden rounded-2xl bg-background p-6 shadow-[2px_4px_12px_rgba(0,0,0,0.08)] dark:shadow-[2px_4px_12px_rgba(0,0,0,0.3)] sm:w-[calc(50%-1rem)] sm:p-8">
          <div className="flex h-full flex-col justify-between">
            <div>
              <h3 className={"text-base font-semibold text-foreground"}>
                {title}
              </h3>
              <p className={"mt-2 text-pretty text-sm text-muted-foreground"}>
                {description}
              </p>
              <ul className={"mt-6 space-y-3"}>
                {features.map((feature, index) => (
                  <li key={index} className={"flex items-center gap-3"}>
                    <div className="flex h-4 w-4 items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {showCaseStudy && (
              <div className={"mt-8"}>
                <h4 className="text-sm font-medium text-muted-foreground">
                  {caseStudy.title}
                </h4>
                <p className="mt-2 text-pretty text-sm text-muted-foreground">
                  {caseStudy.description}
                </p>
                <Link
                  target="_blank"
                  href={caseStudy.link}
                  className={
                    "group mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  }
                >
                  {dictionary.services.viewCaseStudy}
                  <ArrowRight className={"h-4 w-4 transition-transform"} />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Image */}
        <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted sm:mt-0 sm:w-[calc(50%-1rem)]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
        </div>
      </div>
    </InView>
  );
}
