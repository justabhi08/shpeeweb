import type { Metadata } from "next";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageTitle } from "@/components/page-title";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <main>
      <PageTitle title="Contact Us" />
      <section className="contact-section">
        <div className="site-container contact-grid">
          <div className="contact-info">
            <h2>Visit Our Store</h2>
            <div className="contact-info-item"><MapPin size={22} /><div><strong>Office Address:</strong><a href="https://www.google.com/maps?q=Farda,+Munger,+Bihar,+India" target="_blank" rel="noreferrer">Farda, Munger, Bihar, India</a></div></div>
            <div className="contact-info-item"><Phone size={22} /><div><strong>Contact Number:</strong><a href="tel:+919470831646">+91 94708 31646</a></div></div>
            <div className="contact-info-item"><Mail size={22} /><div><strong>Email:</strong><a href="mailto:supportshpee@gmail.com">supportshpee@gmail.com</a></div></div>
            <div className="contact-info-item"><Clock3 size={22} /><div><strong>Opening Hour:</strong><p>Mon - Sat: 10:00 am to 07:00 pm<br />Sun: Closed</p></div></div>
          </div>
          <div className="contact-form-card">
            <h2>Get In Touch</h2>
            <p>Have questions about shpee? Our dedicated support team is here to help you with inquiries about products, orders, or business opportunities.</p>
            <ContactForm />
          </div>
        </div>
        <div className="contact-map">
          <iframe title="shpee office map - Farda, Munger, Bihar" src="https://maps.google.com/maps?q=Farda%2C%20Munger%2C%20Bihar%2C%20India&z=13&output=embed" width="100%" height="440" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        </div>
      </section>
    </main>
  );
}
