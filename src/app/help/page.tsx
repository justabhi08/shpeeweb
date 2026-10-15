import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { PageTitle } from "@/components/page-title";

export const metadata: Metadata = { title: "Help & FAQs" };

const faqs = [
  ["How can I place an order?", "Browse Products, open a product page, choose your quantity and add it to the cart. Open the cart, continue to checkout and enter your delivery information."],
  ["How can I track my order?", "Open Track Order from the top bar or footer, then enter the order number and email address used at checkout."],
  ["Which payment methods are available?", "Cash on Delivery is available in this storefront. Available methods may vary according to your delivery location and order."],
  ["How can I contact customer support?", "Call us at +91 94708 31646, email supportshpee@gmail.com, or send a message from the Contact Us page. Our office is in Farda, Munger, Bihar, India."],
  ["Can I search by category?", "Yes. Use the All Category menu, the homepage category tiles, or category filters on the Products page."],
  ["Are product prices inclusive of taxes?", "The payable product amount is displayed in your cart and order summary. Any applicable delivery or additional charge is shown before order placement."],
];

export default function HelpPage() {
  return (
    <main>
      <PageTitle title="Help & FAQs" />
      <section className="faq-section">
        <div className="site-container faq-layout">
          <div><p className="section-eyebrow">Frequently asked questions</p><h2>How can we help?</h2><p>Find quick answers about shopping, payment and order tracking.</p></div>
          <div className="faq-list">{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
        </div>
        <div className="site-container help-contact-band"><div><Phone size={24} /><span><small>Call us</small><a href="tel:+919470831646">+91 94708 31646</a></span></div><div><Mail size={24} /><span><small>Email our team</small><a href="mailto:supportshpee@gmail.com">supportshpee@gmail.com</a></span></div></div>
      </section>
    </main>
  );
}
