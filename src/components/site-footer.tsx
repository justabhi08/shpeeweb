import Link from "next/link";
import { Mail, MapPin, Smartphone } from "lucide-react";
import { NewsletterForm } from "./newsletter-form";

const payments = ["visa.png", "master-card.png", "amex.png", "discover.png", "paypal.png"];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="footer-logo" aria-label="shpee home">
            <span className="brand-wordmark">shpee</span>
          </Link>
          <ul className="footer-contact-list">
            <li><Smartphone size={18} /><span /><a href="tel:+919470831646">+91 94708 31646</a></li>
            <li><Mail size={18} /><span /><a href="mailto:supportshpee@gmail.com">supportshpee@gmail.com</a></li>
            <li><MapPin size={18} /><span /><a href="https://www.google.com/maps?q=Farda,+Munger,+Bihar,+India" target="_blank" rel="noreferrer">Farda, Munger, Bihar, India</a></li>
          </ul>
          <div className="social-links">
            <a href="https://www.facebook.com/Sky-Dukan-144565492864021" target="_blank" rel="noreferrer" aria-label="Facebook"><b>f</b></a>
            <a href="https://www.instagram.com/skydukan" target="_blank" rel="noreferrer" aria-label="Instagram"><b>◎</b></a>
            <a href="https://twitter.com/SkyDukan" target="_blank" rel="noreferrer" aria-label="Twitter"><b>𝕏</b></a>
            <a href="https://www.youtube.com/channel/UCSonPDBIvkOjsuNBkybYxEw" target="_blank" rel="noreferrer" aria-label="YouTube"><b>▶</b></a>
          </div>
        </div>
        <div className="footer-column">
          <h3>Shopping</h3>
          <Link href="/track-order">Track order</Link>
          <Link href="/products">All products</Link>
          <Link href="/products?category=1">Hot selling</Link>
        </div>
        <div className="footer-column">
          <h3>Information</h3>
          <Link href="/about">About Us</Link>
          <Link href="/terms">Term &amp; Policy</Link>
          <Link href="/contact">Contact us</Link>
          <Link href="/account">Admin Login</Link>
        </div>
        <div className="footer-newsletter">
          <h3>Newsletter</h3>
          <p>Become the first to know about offers, new collections and interior trends.</p>
          <NewsletterForm />
          <p className="footer-location"><MapPin size={17} /> Farda, Munger, Bihar, India</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="site-container footer-bottom-inner">
          <p>Copyright © 2026 shpee. All Rights Reserved.</p>
          <div className="payment-list">
            {payments.map((payment) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={`/images/payment/${payment}`} alt={payment.replace(".png", "")} key={payment} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
