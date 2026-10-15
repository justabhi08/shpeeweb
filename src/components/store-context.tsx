"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProduct, type Product } from "@/data/catalog";

type CartLine = { product: Product; quantity: number };

type StoreContextValue = {
  cart: Record<number, number>;
  cartLines: CartLine[];
  cartCount: number;
  cartTotal: number;
  cartOpen: boolean;
  accountOpen: boolean;
  searchOpen: boolean;
  setCartOpen: (open: boolean) => void;
  setAccountOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  addToCart: (id: number, quantity?: number) => void;
  setQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);
const STORAGE_KEY = "shpee-cart";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setCart(JSON.parse(saved) as Record<number, number>);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart, ready]);

  const addToCart = useCallback((id: number, quantity = 1) => {
    setCart((current) => ({ ...current, [id]: (current[id] ?? 0) + Math.max(1, quantity) }));
    setCartOpen(true);
  }, []);

  const setQuantity = useCallback((id: number, quantity: number) => {
    setCart((current) => {
      const next = { ...current };
      if (quantity <= 0) delete next[id];
      else next[id] = quantity;
      return next;
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  }, []);

  const clearCart = useCallback(() => setCart({}), []);

  const cartLines = useMemo(
    () => Object.entries(cart).flatMap(([id, quantity]) => {
      const product = getProduct(id);
      return product ? [{ product, quantity }] : [];
    }),
    [cart],
  );
  const cartCount = cartLines.reduce((sum, line) => sum + line.quantity, 0);
  const cartTotal = cartLines.reduce((sum, line) => sum + line.product.DP * line.quantity, 0);

  const value = useMemo(() => ({
    cart,
    cartLines,
    cartCount,
    cartTotal,
    cartOpen,
    accountOpen,
    searchOpen,
    setCartOpen,
    setAccountOpen,
    setSearchOpen,
    addToCart,
    setQuantity,
    removeFromCart,
    clearCart,
  }), [cart, cartLines, cartCount, cartTotal, cartOpen, accountOpen, searchOpen, addToCart, setQuantity, removeFromCart, clearCart]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
}
