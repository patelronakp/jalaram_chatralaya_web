"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import React from "react"

export function Gallery() {
  const t = useTranslations("gallery")

  const images = [
    {
      src: "/images/glimpse-7.jpg",
      alt: "Life at Hostel Main",
      className: "md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto",
      titleKey: "img1.title",
      descKey: "img1.description",
    },
    {
      src: "/images/glimpse-8.jpg",
      alt: "Cultural Activities",
      className: "md:col-span-2 aspect-[16/9] md:aspect-auto",
      titleKey: "img2.title",
      descKey: "img2.description",
    },
    {
      src: "/images/glimpse-9.jpg",
      alt: "Dining Hall",
      className: "aspect-[4/3] md:aspect-auto",
      titleKey: "img3.title",
      descKey: "img3.description",
    },
    {
      src: "/images/glimpse-5.jpg",
      alt: "Prayer Ceremony",
      className: "aspect-[4/3] md:aspect-auto",
      titleKey: "img4.title",
      descKey: "img4.description",
    },
    {
      src: "/images/glimpse-2.jpg",
      alt: "Prayer Ceremony",
      className: "aspect-[4/3] md:aspect-auto",
      titleKey: "img4.title",
      descKey: "img4.description",
    },
    {
      src: "/images/glimpse-3.jpg",
      alt: "Prayer Ceremony",
      className: "aspect-[4/3] md:aspect-auto",
      titleKey: "img4.title",
      descKey: "img4.description",
    },
    {
      src: "/images/glimpse-4.jpg",
      alt: "Prayer Ceremony",
      className: "aspect-[4/3] md:aspect-auto",
      titleKey: "img4.title",
      descKey: "img4.description",
    },
    {
      src: "/images/glimpse-1.jpg",
      alt: "Prayer Ceremony",
      className: "aspect-[4/3] md:aspect-auto",
      titleKey: "img4.title",
      descKey: "img4.description",
    },
  ]

  return (
    <section id="gallery" className="py-20 md:py-28 bg-white font-gujarati">
      <div className="max-w-[1280px] mx-auto px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-16 text-center">
          {t("title")}
        </h2>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[600px]">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`overflow-hidden rounded-3xl shadow-lg relative group ${img.className}`}
            >
              <Image
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                src={img.src}
                fill={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Premium Hover Caption Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white pointer-events-none">
                <h3 className="text-lg md:text-xl font-bold mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 font-gujarati">
                  {t(`items.${img.titleKey}`)}
                </h3>
                <p className="text-sm text-gray-200 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 transition-all font-sans leading-relaxed">
                  {t(`items.${img.descKey}`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
