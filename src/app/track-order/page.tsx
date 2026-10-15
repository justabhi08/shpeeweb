import type { Metadata } from "next";
import { PageTitle } from "@/components/page-title";
import { TrackOrderView } from "@/components/track-order-view";

export const metadata: Metadata = { title: "Track Order" };

export default function TrackOrderPage() {
  return <main><PageTitle title="Track Order" /><section className="track-section"><div className="site-container"><TrackOrderView /></div></section></main>;
}
