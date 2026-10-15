import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ShieldCheck, Star, Truck } from "lucide-react";
import { ProductDetailActions } from "@/components/product-detail-actions";
import { ProductCard } from "@/components/product-card";
import { displayProductName, formatPrice, getProduct, products } from "@/data/catalog";

export function generateStaticParams() {
  return products.map((product) => ({ id: String(product.Id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Product not found" };
  return { title: displayProductName(product.PName), description: product.Description.slice(0, 155) };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();
  const related = products
    .filter((item) => item.Id !== product.Id && item.CategoryIds.some((category) => product.CategoryIds.includes(category)))
    .slice(0, 4);

  return (
    <main>
      <div className="detail-breadcrumb-wrap">
        <div className="site-container breadcrumbs">
          <Link href="/">Home</Link><ChevronRight size={15} /><Link href="/products">Products</Link><ChevronRight size={15} /><span>{displayProductName(product.PName)}</span>
        </div>
      </div>
      <section className="product-detail-section">
        <div className="site-container product-detail-grid">
          <div className="product-detail-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.ProductImage} alt={displayProductName(product.PName)} />
          </div>
          <div className="product-detail-info">
            <p className="detail-category">{product.CategoryName}</p>
            <div className="detail-rating">
              {[0, 1, 2, 3, 4].map((star) => <Star size={15} fill="currentColor" key={star} />)}
              <span>5.0</span>
            </div>
            <h1>{displayProductName(product.PName)}</h1>
            <div className="detail-price">
              {product.MRP > product.DP ? <del>{formatPrice(product.MRP)}</del> : null}
              <strong>{formatPrice(product.DP)}</strong>
              {product.MRP > product.DP ? <span>Save {Math.round(((product.MRP - product.DP) / product.MRP) * 100)}%</span> : null}
            </div>
            <p className="detail-summary">{product.Description.split(/\r?\n/)[0] || product.Title}</p>
            <ProductDetailActions productId={product.Id} />
            <div className="detail-meta">
              <p><span>SKU:</span> {product.PCode}</p>
              <p><span>Category:</span> {product.CategoryName}</p>
              <p><span>Business Volume:</span> {product.BV}</p>
            </div>
            <div className="detail-benefits">
              <div><Truck size={24} /><span><strong>Fast delivery</strong><small>Across serviceable locations</small></span></div>
              <div><ShieldCheck size={24} /><span><strong>Quality assured</strong><small>Authentic shpee product</small></span></div>
            </div>
          </div>
        </div>
      </section>
      <section className="product-description-section">
        <div className="site-container">
          <h2>Product Description</h2>
          <div className="description-copy">
            <h3>{product.Title || displayProductName(product.PName)}</h3>
            {product.Description.split(/\r?\n/).filter(Boolean).map((line, index) => <p key={`${index}-${line.slice(0, 20)}`}>{line}</p>)}
          </div>
        </div>
      </section>
      {related.length ? (
        <section className="home-section related-section">
          <div className="site-container">
            <div className="section-heading"><h2>You May Also Like</h2></div>
            <div className="related-grid">{related.map((item, index) => <ProductCard product={item} featuredIndex={index} key={item.Id} />)}</div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
