import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { MobileToolbar, SiteHeader } from "@/components/site-header";
import { StoreProvider } from "@/components/store-context";
import { StoreOverlays } from "@/components/store-overlays";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "shpee",
    template: "%s | shpee",
  },
  description: "Shop quality healthcare, FMCG, personal care, household, agro, auto and lifestyle products at shpee.",
  icons: { icon: "/shpee-icon.svg" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
          <StoreOverlays />
          <MobileToolbar />
        </StoreProvider>
      </body>
    </html>
  );
}
