import Image from "next/image"
import React from "react"

export function Gallery() {
  const images = [
    {
      src: "/images/gallery_main.jpg",
      alt: "Life at Hostel Main",
      className: "md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto",
    },
    {
      src: "/images/gallery_cultural.jpg",
      alt: "Cultural Activities",
      className: "md:col-span-2 aspect-[16/9] md:aspect-auto",
    },
    {
      src: "/images/gallery_dining.jpg",
      alt: "Dining Hall",
      className: "aspect-[4/3] md:aspect-auto",
    },
    {
      src: "/images/gallery_prayer.jpg",
      alt: "Prayer Ceremony",
      className: "aspect-[4/3] md:aspect-auto",
    },
  ]

  return (
    <section id="gallery" className="py-20 md:py-28 bg-white font-gujarati">
      <div className="max-w-[1280px] mx-auto px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-16 text-center">
          છાત્રાલય જીવનની ઝલક
        </h2>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[600px]">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`overflow-hidden rounded-3xl shadow-lg relative ${img.className}`}
            >
              <Image
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                src={img.src}
                fill={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
