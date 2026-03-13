"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, TouchEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import advancedAdditiveSolutions from "../../../public/images/hero/advanced-additive-solutions-hero.webp";
import robotics from "../../../public/images/hero/robotics-hero.webp";
import unrealDevelopment from "../../../public/images/hero/unreal-development-hero.webp";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface HeroProps {
  dictionary: {
    hero: {
      title: {
        main: string;
        sub: string;
      };
      slides: {
        first: { title: string; subtitle: string };
        second: { title: string; subtitle: string };
        third: { title: string; subtitle: string };
      };
      cta: {
        primary: string;
        secondary: string;
      };
      scroll: string;
      swipe: string;
    };
  };
  lang: string;
}

export function Hero({ dictionary, lang }: HeroProps) {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const services = [
    {
      image: advancedAdditiveSolutions,
      title: dictionary.hero.slides.first.title,
      subtitle: dictionary.hero.slides.first.subtitle,
      id: "additive-solutions",
    },
    {
      image: robotics,
      title: dictionary.hero.slides.second.title,
      subtitle: dictionary.hero.slides.second.subtitle,
      id: "robotics-automation",
    },
    {
      image: unrealDevelopment,
      title: dictionary.hero.slides.third.title,
      subtitle: dictionary.hero.slides.third.subtitle,
      id: "unreal-development",
    },
  ];

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 75;
    if (touchStart - touchEnd > swipeThreshold) {
      // Swipe left
      scrollRight();
    }
    if (touchStart - touchEnd < -swipeThreshold) {
      // Swipe right
      scrollLeft();
    }
  };

  const scrollLeft = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const scrollRight = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <section className="relative min-h-screen pb-24">
      {/* Desktop Version */}
      <div className="container hidden h-[90vh] items-center md:flex">
        <div className="mt-24 h-[75vh] w-full flex-col overflow-hidden rounded-3xl shadow-[2px_4px_12px_rgba(0,0,0,0.08)] dark:shadow-[2px_4px_12px_rgba(0,0,0,0.3)] md:flex md:flex-row">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative flex-1 overflow-hidden"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <Link
                href={`/${lang}/services#${service.id}`}
                className="block h-full w-full"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className={cn(
                      "object-cover transition-all duration-500",
                      hoveredIndex === index && "scale-[1.015]",
                    )}
                  />
                  {/* Dark Overlay */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-black/60 transition-opacity duration-500",
                      hoveredIndex === index ? "opacity-20" : "opacity-60",
                    )}
                  />
                </div>

                {/* Content */}
                <div className="relative flex h-full items-center justify-center px-4 text-center">
                  <div className="max-w-[300px]">
                    <motion.h2
                      className="text-2xl font-bold text-white sm:text-3xl"
                      animate={{
                        y: hoveredIndex === index ? -10 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {service.title}
                    </motion.h2>
                    <motion.p
                      className="mx-auto mt-2 text-sm text-white sm:text-base"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                        y: hoveredIndex === index ? 0 : 10,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {service.subtitle}
                    </motion.p>
                    <motion.div
                      className="mx-auto mt-4 h-[2px] w-0 bg-white"
                      animate={{
                        width: hoveredIndex === index ? "100px" : "0px",
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile Version */}
      <div className="relative md:hidden">
        <div className="container py-20">
          <div className="relative h-[80vh] overflow-hidden rounded-3xl shadow-[2px_4px_12px_rgba(0,0,0,0.08)] dark:shadow-[2px_4px_12px_rgba(0,0,0,0.3)]">
            <div
              className="relative h-full w-full"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {services.map(
                  (service, index) =>
                    index === currentIndex && (
                      <motion.div
                        key={service.id}
                        className="absolute inset-0 h-full w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut",
                        }}
                      >
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover"
                          priority
                        />
                        <div className="absolute inset-0 bg-black/60" />
                        <motion.div
                          className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex max-w-[300px] flex-col items-center">
                            <h2 className="text-2xl font-bold text-white sm:text-3xl">
                              {service.title}
                            </h2>
                            <p className="mx-auto mt-2 text-sm text-white sm:text-base">
                              {service.subtitle}
                            </p>
                            <div className="mx-auto mt-4 h-[2px] w-24 bg-white" />
                          </div>
                          <button
                            onClick={() =>
                              router.push(`/${lang}/services#${service.id}`)
                            }
                            className="mt-8 flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                          >
                            {dictionary.hero.cta.primary}
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </motion.div>
                      </motion.div>
                    ),
                )}
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-4">
              <button
                onClick={scrollLeft}
                disabled={isAnimating}
                aria-label="Previous slide"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 disabled:opacity-50"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={scrollRight}
                disabled={isAnimating}
                aria-label="Next slide"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 disabled:opacity-50"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - only show on desktop */}
      <div className="hidden md:block">
        <motion.div
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-xs font-light uppercase tracking-widest text-foreground/50">
            {dictionary.hero.scroll}
          </span>
          <motion.div
            className="h-12 w-[1px] bg-foreground/20"
            animate={{
              scaleY: [0, 1],
              originY: 0,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
