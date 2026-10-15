"use client";

import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { displayProductName, formatPrice, type Product } from "@/data/catalog";

export function ProductCard({ product, hot = false, featuredIndex = 0 }: { product: Product; hot?: boolean; featuredIndex?: number }) {
  const discount = product.MRP > 0 ? ((product.MRP - product.DP) / product.MRP) * 100 : 0;
  const badge = featuredIndex % 3 === 0 ? "Hot" : featuredIndex % 3 === 1 ? "New" : "Sale";

  return (
    <article className={`product-card ${hot ? "product-card-hot" : ""}`}>
      <div className="product-image-wrap">
        <Link href={`/product/${product.Id}`} className="product-image-link">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.ProductImage} alt={displayProductName(product.PName)} loading="lazy" />
        </Link>
        {!hot ? <span className={`product-badge badge-${badge.toLowerCase()}`}>{discount >= 30 ? "Sale" : badge}</span> : null}
        <Link href={`/product/${product.Id}`} className="product-buy-button">Buy Now <ArrowRight size={17} /></Link>
      </div>
      <div className="product-card-info">
        <div className="product-rating" aria-label="5 out of 5 stars">
          {[0, 1, 2, 3, 4].map((star) => <Star size={13} fill="currentColor" key={star} />)}
        </div>
        <Link href={`/product/${product.Id}`} className="product-name">{displayProductName(product.PName)}</Link>
        {!hot ? (
          <div className="product-price">
            {product.MRP > product.DP ? <del>{formatPrice(product.MRP)}</del> : null}
            <strong>{formatPrice(product.DP)}</strong>
          </div>
        ) : null}
      </div>
    </article>
  );
}
