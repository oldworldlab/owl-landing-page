"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { InView } from "@/components/ui/in-view";
import { ExternalLink } from "lucide-react";

interface TimelineProps {
  dictionary: {
    timeline: {
      title: {
        main: string;
        sub: string;
      };
      events: Array<{
        year: string;
        title: string;
        details: string[];
        links?: Array<{
          url: string;
          title: string;
        }>;
      }>;
    };
  };
}

export function Timeline({ dictionary }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 60%"],
  });

  return (
    <div ref={containerRef} className="container mx-auto py-24">
      <InView>
        <h2 className="mb-16 text-xl font-semibold sm:text-2xl">
          <span className="flex flex-col">
            <span className="text-foreground">
              {dictionary.timeline.title.main}
            </span>
            <span className="text-muted-foreground">
              {dictionary.timeline.title.sub}
            </span>
          </span>
        </h2>
      </InView>

      <div ref={ref} className="relative">
        {dictionary.timeline.events.map((event, index) => (
          <motion.div
            key={event.year}
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div
              className={`group relative flex flex-col gap-4 pb-8 pt-4 sm:flex-row sm:items-center sm:pb-12 sm:pt-6 ${
                index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
              }`}
            >
              {/* Content Card */}
              <div className="relative ml-8 w-[calc(100%-2rem)] overflow-hidden rounded-2xl bg-background p-6 shadow-[2px_4px_12px_rgba(0,0,0,0.08)] dark:shadow-[2px_4px_12px_rgba(0,0,0,0.3)] sm:ml-0 sm:w-[calc(50%-2rem)] sm:p-6">
                <div className="flex h-full flex-col justify-between">
                  {/* Year Badge */}
                  <div
                    className={`mb-3 flex ${
                      index % 2 === 0
                        ? "sm:absolute sm:left-4 sm:top-4 sm:justify-start"
                        : "sm:absolute sm:right-4 sm:top-4 sm:justify-end"
                    }`}
                  >
                    <span className="text-sm font-medium text-muted-foreground">
                      {event.year}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3
                      className={`text-base font-semibold text-foreground ${
                        index % 2 === 0 ? "sm:text-right" : "sm:text-left"
                      }`}
                    >
                      {event.title}
                    </h3>
                    <div
                      className={`mt-2 space-y-1 text-sm text-muted-foreground ${
                        index % 2 === 0 ? "sm:text-right" : "sm:text-left"
                      }`}
                    >
                      {event.details.map((detail, i) => (
                        <p key={i} className="leading-relaxed">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>

                  {event.links && (
                    <div
                      className={`mt-4 flex flex-col gap-2 ${
                        index % 2 === 0 ? "sm:items-end" : "sm:items-start"
                      }`}
                    >
                      {event.links.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                        >
                          {link.title}
                          <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Timeline Node */}
              <div className="absolute left-2 top-6 flex h-4 w-4 -translate-x-1/2 items-center justify-center sm:left-1/2 sm:top-1/2 sm:-translate-y-1/2">
                <div className="absolute h-2 w-2 rounded-full bg-background shadow-[0_0_0_3px_hsl(var(--background)),0_0_0_5px_hsl(var(--violet-500))]" />
                <div className="absolute h-1.5 w-1.5 rounded-full bg-violet-500" />
              </div>

              {/* Spacer */}
              <div className="hidden w-[calc(50%-2rem)] sm:block" />
            </div>
          </motion.div>
        ))}

        {/* Timeline Line */}
        <div
          style={{ height: height + "px" }}
          className="absolute left-2 top-0 w-px overflow-hidden bg-gradient-to-b from-transparent via-violet-500/20 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] sm:left-1/2 sm:-translate-x-1/2"
        >
          <motion.div
            style={{
              height: useTransform(scrollYProgress, [0, 1], [0, height]),
              opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]),
            }}
            className="absolute inset-x-0 top-0 w-px rounded-full bg-gradient-to-t from-violet-500/40 from-[0%] via-violet-500/40 via-[10%] to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
