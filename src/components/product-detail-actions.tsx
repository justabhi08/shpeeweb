"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useStore } from "./store-context";

export function ProductDetailActions({ productId }: { productId: number }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useStore();

  return (
    <div className="detail-actions">
      <div className="detail-quantity">
        <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity"><Minus size={17} /></button>
        <span>{quantity}</span>
        <button type="button" onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity"><Plus size={17} /></button>
      </div>
      <button type="button" className="primary-button add-cart-button" onClick={() => addToCart(productId, quantity)}>
        <ShoppingBag size={19} /> Add to cart
      </button>
      <button type="button" className="buy-now-button" onClick={() => addToCart(productId, quantity)}>Buy now</button>
    </div>
  );
}
