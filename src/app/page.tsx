import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroCarousel } from "@/components/hero-carousel";
import { ProductCard } from "@/components/product-card";
import { categoryShowcase, hotProducts, promoBanners, specialProducts } from "@/data/catalog";

export default function HomePage() {
  return (
    <main>
      <HeroCarousel />

      <section className="home-section category-section">
        <div className="site-container">
          <div className="section-heading"><h2>Shop By Category</h2></div>
          <div className="category-showcase">
            {categoryShowcase.map((category) => (
              <Link href={`/products?category=${category.id}`} className="category-card" key={category.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={category.image} alt={category.name} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section hot-section">
        <div className="site-container">
          <div className="section-heading"><h2>Hot Selling Products</h2></div>
          <div className="product-rail">
            {hotProducts.map((product, index) => <ProductCard product={product} hot featuredIndex={index} key={product.Id} />)}
          </div>
        </div>
      </section>

      <section className="home-section promo-section">
        <div className="site-container promo-grid">
          {promoBanners.map((banner) => (
            <Link href={`/products?category=${banner.category}`} key={banner.image}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={banner.image} alt={banner.label} />
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section products-home-section">
        <div className="site-container">
          <div className="section-heading"><h2>Our Products</h2></div>
          <div className="featured-products-grid">
            {specialProducts.map((product, index) => <ProductCard product={product} featuredIndex={index} key={product.Id} />)}
          </div>
          <div className="view-more-wrap">
            <Link href="/products" className="outline-arrow-button">View More <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
