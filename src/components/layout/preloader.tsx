"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import logoDark from "../../../public/owl_dark.png";
import logoLight from "../../../public/owl_light.png";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
    }, 1000);

    document.body.style.overflow = "hidden";
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background dark:bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: 0.7, ease: "easeInOut" }}
      onAnimationComplete={() => setIsLoading(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.2,
            ease: "easeOut",
          },
        }}
      >
        <Image
          src={
            mounted
              ? resolvedTheme === "dark"
                ? logoLight
                : logoDark
              : logoDark
          }
          alt="OWL Logo"
          height={60}
          priority
        />
      </motion.div>
    </motion.div>
  );
}
