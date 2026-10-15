"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  Car,
  ChevronDown,
  CircleHelp,
  Flame,
  Grid2X2,
  HeartPulse,
  Mail,
  MapPin,
  Menu,
  PackageSearch,
  Phone,
  Search,
  Shirt,
  ShoppingBag,
  ShoppingBasket,
  Sparkles,
  SprayCan,
  UserRound,
  Wheat,
  X,
} from "lucide-react";
import { categories, formatPrice } from "@/data/catalog";
import { useStore } from "./store-context";

const categoryIcons = [Grid2X2, Flame, Sparkles, ShoppingBasket, SprayCan, Wheat, Car, HeartPulse, Shirt];

function SearchForm({ compact = false, onDone }: { compact?: boolean; onDone?: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("0");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (category !== "0") params.set("category", category);
    if (query.trim()) params.set("q", query.trim());
    router.push(`/products${params.size ? `?${params.toString()}` : ""}`);
    onDone?.();
  }

  return (
    <form className={compact ? "header-search compact" : "header-search"} onSubmit={submit}>
      {!compact ? (
        <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Product category">
          {categories.map((item) => <option value={item.id} key={item.id}>{item.shortName}</option>)}
        </select>
      ) : null}
      {!compact ? <span className="search-divider" /> : null}
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search for products..."
        aria-label="Search products"
      />
      <button type="submit" aria-label="Search"><Search size={20} /></button>
    </form>
  );
}

export function SiteHeader() {
  const { cartCount, cartTotal, setCartOpen, setAccountOpen, setSearchOpen } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="topbar">
        <div className="site-container topbar-inner">
          <div className="topbar-group">
            <a href="tel:+919470831646"><Phone size={14} /> Call us: +91 94708 31646</a>
            <span className="topbar-separator" />
            <a href="mailto:supportshpee@gmail.com"><Mail size={14} /> <span>Email us:</span> supportshpee@gmail.com</a>
            <span className="topbar-separator location-separator" />
            <span className="topbar-location"><MapPin size={14} /> Farda, Munger, Bihar, India</span>
          </div>
          <div className="topbar-group topbar-right">
            <button type="button" onClick={() => setAccountOpen(true)}>Register</button>
            <Link href="/help"><CircleHelp size={14} /> Help &amp; FAQs</Link>
            <Link href="/track-order"><PackageSearch size={14} /> Track Order</Link>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="site-container header-main">
          <button className="mobile-menu-button" type="button" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu size={25} />
          </button>
          <Link href="/" className="site-logo" aria-label="shpee home">
            <span className="brand-wordmark">shpee</span>
          </Link>
          <div className="desktop-search"><SearchForm /></div>
          <div className="header-actions">
            <button className="account-action" type="button" onClick={() => setAccountOpen(true)}>
              <span className="action-icon"><UserRound size={25} /></span>
              <span><small>Welcome</small><strong>Login / Register</strong></span>
            </button>
            <button className="cart-action" type="button" onClick={() => setCartOpen(true)}>
              <span className="action-icon cart-icon"><ShoppingBag size={25} /><b>{cartCount}</b></span>
              <span><small>Your cart</small><strong>{formatPrice(cartTotal)}</strong></span>
            </button>
            <button className="mobile-search-button" type="button" onClick={() => setSearchOpen(true)} aria-label="Search">
              <Search size={24} />
            </button>
          </div>
        </div>

        <div className="nav-band">
          <div className="site-container nav-inner">
            <details className="category-menu">
              <summary><Menu size={21} /><strong>All Category</strong><ChevronDown size={17} /></summary>
              <div className="category-popover">
                {categories.map((category, index) => {
                  const Icon = categoryIcons[index] ?? Grid2X2;
                  return (
                    <Link href={category.id ? `/products?category=${category.id}` : "/products"} key={category.id}>
                      <Icon size={20} /><span>{category.name}</span>
                    </Link>
                  );
                })}
              </div>
            </details>
            <nav className="main-nav" aria-label="Main navigation">
              <Link href="/">HOME</Link>
              <Link href="/about">ABOUT US</Link>
              <Link href="/products">PRODUCTS</Link>
              <Link href="/contact">CONTACT US</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className={`mobile-menu-panel ${mobileOpen ? "open" : ""}`} aria-hidden={!mobileOpen}>
        <button className="drawer-backdrop" aria-label="Close menu" onClick={() => setMobileOpen(false)} />
        <aside>
          <div className="mobile-menu-head">
            <Link href="/" aria-label="shpee home" onClick={() => setMobileOpen(false)}><span className="brand-wordmark">shpee</span></Link>
            <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={24} /></button>
          </div>
          <div className="mobile-search-inline"><SearchForm compact onDone={() => setMobileOpen(false)} /></div>
          <nav className="mobile-nav">
            <Link href="/" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link href="/about" onClick={() => setMobileOpen(false)}>About Us</Link>
            <Link href="/products" onClick={() => setMobileOpen(false)}>Products</Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)}>Contact Us</Link>
            <Link href="/track-order" onClick={() => setMobileOpen(false)}>Track Order</Link>
          </nav>
          <p className="mobile-category-title">Shop by category</p>
          <div className="mobile-categories">
            {categories.slice(1).map((category) => (
              <Link href={`/products?category=${category.id}`} key={category.id} onClick={() => setMobileOpen(false)}>{category.name}</Link>
            ))}
          </div>
          <div className="mobile-contact">
            <a href="tel:+919470831646"><Phone size={18} /> +91 94708 31646</a>
            <a href="mailto:supportshpee@gmail.com"><Mail size={18} /> supportshpee@gmail.com</a>
            <span><MapPin size={18} /> Farda, Munger, Bihar, India</span>
          </div>
        </aside>
      </div>
    </>
  );
}

export function MobileToolbar() {
  const { cartCount, setCartOpen, setAccountOpen, setSearchOpen } = useStore();
  return (
    <nav className="mobile-toolbar" aria-label="Mobile quick navigation">
      <Link href="/products"><ShoppingBag size={21} /><span>Shop</span></Link>
      <button type="button" onClick={() => setSearchOpen(true)}><Search size={21} /><span>Search</span></button>
      <button type="button" onClick={() => setAccountOpen(true)}><UserRound size={21} /><span>Account</span></button>
      <button type="button" onClick={() => setCartOpen(true)} className="toolbar-cart"><ShoppingBasket size={21} /><b>{cartCount}</b><span>Cart</span></button>
    </nav>
  );
}
