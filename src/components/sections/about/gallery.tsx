"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ImageSlider } from "@/components/ui/image-slider";
import microfluidics from "../../../../public/images/about/microfluidics.webp";
import lab from "../../../../public/images/about/lab.webp";
import modeling from "../../../../public/images/about/modeling.webp";

interface GalleryProps {
  dictionary: {
    gallery: {
      title: string;
      subtitle: string;
      images: {
        [key: string]: string;
      };
    };
  };
}

export function Gallery({ dictionary }: GalleryProps) {
  const images = [
    { src: microfluidics, alt: dictionary.gallery.images.precision },
    { src: lab, alt: dictionary.gallery.images.robotics },
    { src: modeling, alt: dictionary.gallery.images.virtual },
  ];

  return (
    <section className="container py-16 md:py-32">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h1 className="text-xl font-semibold sm:text-2xl">
          <span className="flex flex-col">
            <span className="text-foreground">{dictionary.gallery.title}</span>
            <span className="text-muted-foreground">
              {dictionary.gallery.subtitle}
            </span>
          </span>
        </h1>
      </motion.div>

      {/* Mobile Slider */}
      <div className="block w-full md:hidden">
        <ImageSlider
          images={images.map((image) => ({
            src: image.src,
            alt: image.alt,
            caption: image.alt,
          }))}
        />
      </div>

      {/* Desktop Grid */}
      <div className="hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group aspect-[4/3] overflow-hidden rounded-3xl bg-background shadow-[2px_4px_12px_rgba(0,0,0,0.08)] dark:shadow-[2px_4px_12px_rgba(0,0,0,0.3)]"
          >
            <div className="relative h-full w-full">
              <Image
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <p className="text-sm font-medium">{image.alt}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
