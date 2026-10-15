import type { Metadata } from "next";
import { PageTitle } from "@/components/page-title";
import { ProductsView } from "@/components/products-view";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse all shpee healthcare, FMCG, personal care, household, agro, auto and fashion products.",
};

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string; q?: string }> }) {
  const params = await searchParams;
  return (
    <main>
      <PageTitle title="Products" />
      <ProductsView initialCategory={Number(params.category ?? 0) || 0} initialQuery={params.q ?? ""} />
    </main>
  );
}
