"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { categories, getCategoryName, products } from "@/data/catalog";
import { ProductCard } from "./product-card";

type SortOption = "best" | "low" | "high" | "name";
const PAGE_SIZE = 12;
const discountOptions = [
  { label: "10% - 20%", min: 10, max: 20 },
  { label: "20% - 30%", min: 20, max: 30 },
  { label: "30% - 50%", min: 30, max: 50 },
  { label: "50% & Above", min: 50, max: 100 },
];

export function ProductsView({ initialCategory = 0, initialQuery = "" }: { initialCategory?: number; initialQuery?: string }) {
  const catalogMax = Math.ceil(Math.max(...products.map((product) => product.DP)) / 500) * 500;
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState(initialQuery);
  const [searchDraft, setSearchDraft] = useState(initialQuery);
  const [maxPrice, setMaxPrice] = useState(catalogMax);
  const [discount, setDiscount] = useState<number | null>(null);
  const [sort, setSort] = useState<SortOption>("best");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("en-IN");
    const discountBand = discount === null ? null : discountOptions[discount];
    const result = products.filter((product) => {
      const categoryMatch = category === 0
        || (category === 1 && product.IsHotSellingProduct)
        || product.CategoryIds.includes(category);
      const text = `${product.PName} ${product.PCode} ${product.CategoryName} ${product.Title}`.toLocaleLowerCase("en-IN");
      const productDiscount = product.MRP ? ((product.MRP - product.DP) / product.MRP) * 100 : 0;
      return categoryMatch
        && (!normalizedQuery || text.includes(normalizedQuery))
        && product.DP <= maxPrice
        && (!discountBand || (productDiscount >= discountBand.min && productDiscount <= discountBand.max));
    });

    if (sort === "low") result.sort((a, b) => a.DP - b.DP);
    if (sort === "high") result.sort((a, b) => b.DP - a.DP);
    if (sort === "name") result.sort((a, b) => a.PName.localeCompare(b.PName));
    return result;
  }, [category, discount, maxPrice, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const visible = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const start = filtered.length ? (safePage - 1) * PAGE_SIZE + 1 : 0;
  const end = Math.min(safePage * PAGE_SIZE, filtered.length);
  const hasFilters = category !== 0 || query !== "" || discount !== null || maxPrice < catalogMax;

  function changeCategory(id: number) {
    setCategory(id);
    setPage(1);
    setFiltersOpen(false);
  }

  function clearFilters() {
    setCategory(0);
    setQuery("");
    setSearchDraft("");
    setMaxPrice(catalogMax);
    setDiscount(null);
    setSort("best");
    setPage(1);
  }

  const filterContent = (
    <>
      <div className="filter-header">
        <h3>Filter By</h3>
        {hasFilters ? <button type="button" onClick={clearFilters}>× Clear all</button> : null}
        <button className="mobile-filter-close" type="button" onClick={() => setFiltersOpen(false)} aria-label="Close filters"><X size={20} /></button>
      </div>
      <div className="filter-widget">
        <h4>Categories <ChevronDown size={18} /></h4>
        <div className="filter-category-list">
          {categories.map((item) => (
            <button type="button" className={category === item.id ? "active" : ""} onClick={() => changeCategory(item.id)} key={item.id}>
              <span>{item.name}</span>
              <small>{item.id === 0 ? products.length : item.id === 1 ? products.filter((product) => product.IsHotSellingProduct).length : products.filter((product) => product.CategoryIds.includes(item.id)).length}</small>
            </button>
          ))}
        </div>
      </div>
      <div className="filter-widget">
        <h4>Price <ChevronDown size={18} /></h4>
        <input className="price-range" type="range" min="0" max={catalogMax} step="50" value={maxPrice} onChange={(event) => { setMaxPrice(Number(event.target.value)); setPage(1); }} />
        <div className="price-values"><span>₹0</span><strong>₹{maxPrice.toLocaleString("en-IN")}</strong></div>
      </div>
      <div className="filter-widget">
        <h4>Discount <ChevronDown size={18} /></h4>
        <div className="discount-list">
          {discountOptions.map((option, index) => (
            <button type="button" className={discount === index ? "active" : ""} onClick={() => { setDiscount(discount === index ? null : index); setPage(1); }} key={option.label}>
              <span className="fake-checkbox" /> {option.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <section className="catalog-section">
      <div className="site-container">
        <div className="catalog-search-row">
          <form onSubmit={(event) => { event.preventDefault(); setQuery(searchDraft); setPage(1); }}>
            <input value={searchDraft} onChange={(event) => setSearchDraft(event.target.value)} placeholder="Search within products..." />
            <button type="submit" aria-label="Search products"><Search size={18} /></button>
          </form>
        </div>
        <div className="catalog-layout">
          <aside className="filter-sidebar">{filterContent}</aside>
          <button className={`filter-backdrop ${filtersOpen ? "show" : ""}`} onClick={() => setFiltersOpen(false)} aria-label="Close filters" />
          <aside className={`mobile-filter-drawer ${filtersOpen ? "show" : ""}`}>{filterContent}</aside>

          <div className="catalog-main">
            <div className="catalog-title-row">
              <div>
                <p>Explore our collection</p>
                <h2>{category ? getCategoryName(category) : query ? `Results for “${query}”` : "OUR PRODUCTS"}</h2>
              </div>
              <div className="catalog-controls">
                <button type="button" className="filter-button" onClick={() => setFiltersOpen(true)}><SlidersHorizontal size={18} /> Filter</button>
                <label className="sort-select">
                  <span>Sort By:</span>
                  <select value={sort} onChange={(event) => { setSort(event.target.value as SortOption); setPage(1); }}>
                    <option value="best">Best selling</option>
                    <option value="low">Price: Low to High</option>
                    <option value="high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                  <ChevronDown size={16} />
                </label>
              </div>
            </div>
            <div className="catalog-count">Showing {start}–{end} of {filtered.length} products</div>
            {visible.length ? (
              <div className="catalog-grid">
                {visible.map((product, index) => <ProductCard product={product} featuredIndex={index} key={product.Id} />)}
              </div>
            ) : (
              <div className="no-products">
                <ShoppingEmptyIcon />
                <h3>Product Not Available.</h3>
                <p>Try removing a filter or searching for another product.</p>
                <button className="outline-button" type="button" onClick={clearFilters}>Clear filters</button>
              </div>
            )}
            {totalPages > 1 ? (
              <div className="pagination">
                <button disabled={safePage === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>‹</button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).filter((number) => number === 1 || number === totalPages || Math.abs(number - safePage) <= 1).map((number, index, array) => (
                  <span key={number}>
                    {index > 0 && number - array[index - 1] > 1 ? <i>…</i> : null}
                    <button className={safePage === number ? "active" : ""} onClick={() => setPage(number)}>{number}</button>
                  </span>
                ))}
                <button disabled={safePage === totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))}>›</button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function ShoppingEmptyIcon() {
  return <span className="empty-icon"><Search size={30} /></span>;
}
