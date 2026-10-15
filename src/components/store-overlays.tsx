"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRight, Minus, Plus, Search, ShoppingBag, Trash2, X } from "lucide-react";
import { categories, displayProductName, formatPrice } from "@/data/catalog";
import { useStore } from "./store-context";

export function StoreOverlays() {
  const {
    cartLines,
    cartCount,
    cartTotal,
    cartOpen,
    accountOpen,
    searchOpen,
    setCartOpen,
    setAccountOpen,
    setSearchOpen,
    setQuantity,
    removeFromCart,
    clearCart,
  } = useStore();
  const router = useRouter();
  const [accountTab, setAccountTab] = useState<"login" | "register">("login");
  const [accountMessage, setAccountMessage] = useState("");
  const [search, setSearch] = useState("");

  function accountSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAccountMessage(accountTab === "login" ? "Login request received." : "Registration request received.");
  }

  function searchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = search.trim();
    router.push(query ? `/products?q=${encodeURIComponent(query)}` : "/products");
    setSearchOpen(false);
  }

  return (
    <>
      <div className={`overlay-layer ${cartOpen ? "show" : ""}`}>
        <button className="overlay-backdrop" aria-label="Close cart" onClick={() => setCartOpen(false)} />
        <aside className="cart-drawer">
          <div className="drawer-title">
            <h2>Shopping cart <span>({cartCount})</span></h2>
            <button type="button" onClick={() => setCartOpen(false)} aria-label="Close cart"><X size={22} /></button>
          </div>
          {cartLines.length ? (
            <>
              <div className="cart-lines">
                {cartLines.map(({ product, quantity }) => (
                  <div className="cart-line" key={product.Id}>
                    <Link href={`/product/${product.Id}`} onClick={() => setCartOpen(false)} className="cart-line-image">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={product.ProductImage} alt={product.PName} />
                    </Link>
                    <div className="cart-line-info">
                      <Link href={`/product/${product.Id}`} onClick={() => setCartOpen(false)}>{displayProductName(product.PName)}</Link>
                      <strong>{formatPrice(product.DP)}</strong>
                      <div className="cart-quantity">
                        <button onClick={() => setQuantity(product.Id, quantity - 1)} aria-label="Decrease quantity"><Minus size={14} /></button>
                        <span>{quantity}</span>
                        <button onClick={() => setQuantity(product.Id, quantity + 1)} aria-label="Increase quantity"><Plus size={14} /></button>
                      </div>
                    </div>
                    <button className="cart-remove" onClick={() => removeFromCart(product.Id)} aria-label="Remove item"><Trash2 size={17} /></button>
                  </div>
                ))}
              </div>
              <div className="cart-summary">
                <div><span>Subtotal ({cartCount} items)</span><strong>{formatPrice(cartTotal)}</strong></div>
                <p>Taxes and shipping calculated at checkout</p>
                <Link href="/checkout" onClick={() => setCartOpen(false)} className="primary-button">Checkout <ArrowRight size={18} /></Link>
                <button type="button" className="text-button" onClick={clearCart}>Clear cart</button>
              </div>
            </>
          ) : (
            <div className="empty-cart">
              <span><ShoppingBag size={38} /></span>
              <h3>Your cart is empty</h3>
              <p>Your cart is currently empty. Let us assist you in finding the right product</p>
              <Link href="/products" onClick={() => setCartOpen(false)} className="primary-button">Start Shopping</Link>
              <Link href="/" onClick={() => setCartOpen(false)} className="outline-button">Back to home</Link>
            </div>
          )}
        </aside>
      </div>

      <div className={`modal-layer ${accountOpen ? "show" : ""}`}>
        <button className="modal-backdrop" aria-label="Close account" onClick={() => setAccountOpen(false)} />
        <section className="account-modal" role="dialog" aria-modal="true" aria-label="Account">
          <button className="modal-close" type="button" onClick={() => setAccountOpen(false)} aria-label="Close"><X size={22} /></button>
          <div className="account-tabs">
            <button className={accountTab === "login" ? "active" : ""} onClick={() => { setAccountTab("login"); setAccountMessage(""); }}>Login</button>
            <button className={accountTab === "register" ? "active" : ""} onClick={() => { setAccountTab("register"); setAccountMessage(""); }}>Register</button>
          </div>
          <h2>{accountTab === "login" ? "Welcome back" : "Create an account"}</h2>
          <p>{accountTab === "login" ? "Sign in to access your account and orders." : "Register to enjoy a faster shopping experience."}</p>
          <form onSubmit={accountSubmit} className="account-form">
            {accountTab === "register" ? <input name="name" placeholder="Full name" required /> : null}
            <input name="email" type="email" placeholder="Email address" required />
            {accountTab === "register" ? <input name="phone" type="tel" placeholder="Phone number" required /> : null}
            <input name="password" type="password" placeholder="Password" minLength={6} required />
            <button type="submit" className="primary-button">{accountTab === "login" ? "Login" : "Register"} <ArrowRight size={18} /></button>
          </form>
          {accountMessage ? <p className="success-message">{accountMessage}</p> : null}
        </section>
      </div>

      <div className={`modal-layer ${searchOpen ? "show" : ""}`}>
        <button className="modal-backdrop" aria-label="Close search" onClick={() => setSearchOpen(false)} />
        <section className="search-modal" role="dialog" aria-modal="true" aria-label="Search products">
          <button className="modal-close" type="button" onClick={() => setSearchOpen(false)} aria-label="Close"><X size={22} /></button>
          <p>What are you looking for?</p>
          <form onSubmit={searchSubmit}>
            <input autoFocus={searchOpen} value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products..." />
            <button type="submit" aria-label="Search"><Search size={22} /></button>
          </form>
          <div className="search-suggestions">
            <span>Popular:</span>
            {categories.slice(3, 7).map((category) => <Link href={`/products?category=${category.id}`} onClick={() => setSearchOpen(false)} key={category.id}>{category.shortName}</Link>)}
          </div>
        </section>
      </div>
    </>
  );
}
