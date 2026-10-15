import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, PackageSearch, UserRound } from "lucide-react";
import { PageTitle } from "@/components/page-title";

export const metadata: Metadata = { title: "My Account" };

export default function AccountPage() {
  return (
    <main>
      <PageTitle title="My Account" />
      <section className="account-page-section">
        <div className="site-container account-page-grid">
          <div className="account-page-card"><UserRound size={34} /><h2>Login</h2><p>Access your account and manage your profile.</p><form><input type="email" placeholder="Email address" required /><input type="password" placeholder="Password" required /><button className="primary-button" type="submit">Login <ArrowRight size={17} /></button></form></div>
          <div className="account-page-card"><PackageSearch size={34} /><h2>Need your order?</h2><p>You can track a guest order using the order number and checkout email.</p><Link href="/track-order" className="outline-button">Track Order <ArrowRight size={17} /></Link><Link href="/products" className="text-button">Continue shopping</Link></div>
        </div>
      </section>
    </main>
  );
}
