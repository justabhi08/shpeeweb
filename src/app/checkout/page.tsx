import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout-view";
import { PageTitle } from "@/components/page-title";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return <main><PageTitle title="Checkout" /><section className="checkout-section"><div className="site-container"><CheckoutView /></div></section></main>;
}
