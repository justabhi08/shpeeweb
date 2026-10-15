"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { heroSlides } from "@/data/catalog";

export function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((index) => (index + 1) % heroSlides.length), 4000);
    return () => window.clearInterval(timer);
  }, []);

  function move(direction: number) {
    setActive((index) => (index + direction + heroSlides.length) % heroSlides.length);
  }

  return (
    <section className="hero-section">
      <div className="site-container hero-grid">
        <div className="hero-slider">
          <div className="hero-slides" style={{ transform: `translateX(-${active * 100}%)` }}>
            {heroSlides.map((slide) => (
              <Link href={`/products?category=${slide.category}`} className="hero-slide" key={slide.image} aria-label={slide.label}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={slide.image} alt={slide.label} />
              </Link>
            ))}
          </div>
          <button className="slider-arrow slider-prev" type="button" onClick={() => move(-1)} aria-label="Previous slide"><ChevronLeft size={22} /></button>
          <button className="slider-arrow slider-next" type="button" onClick={() => move(1)} aria-label="Next slide"><ChevronRight size={22} /></button>
          <div className="slider-dots">
            {heroSlides.map((slide, index) => (
              <button className={index === active ? "active" : ""} type="button" onClick={() => setActive(index)} key={slide.image} aria-label={`Go to slide ${index + 1}`} />
            ))}
          </div>
        </div>
        <Link href="/products?category=1" className="hero-side-banner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/skbanner/side-banner.jpg" alt="shpee special products" />
        </Link>
      </div>
    </section>
  );
}
