import type { Metadata } from "next";
import { Award, BadgeCheck, Building2, UsersRound } from "lucide-react";
import { PageTitle } from "@/components/page-title";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <main>
      <PageTitle title="About Us" />
      <section className="about-section">
        <div className="site-container">
          <div className="about-heading">
            <h1>About Us</h1>
            <p>ISO 9001-2008 Certified Company | A Venture of Moral Group of Companies</p>
          </div>
          <div className="about-story">
            <p className="about-kicker">POWERING DREAMS WITH QUALITY PRODUCTS &amp; SERVICES</p>
            <p>The <strong>shpee</strong> marketplace is operated by Moral Group Of Company, which started its operations in the year 2012, and is one of the leading direct selling companies dealing in a world-class product range and many sectors of work. The company started with the aim of creating self-employment opportunities by promoting quality products and quality services for the overall development of people and society. Due to excellence in business, effective work across many sectors, introducing the best business opportunity to its associates and creating wealth and self-employment, shpee was awarded the “BHARTIYA UDYOG RATNA AWARD” on 9th March 2013. This growth pattern speaks volumes about the quality of the products, the marketing plan and the management that has built such a rewarding and sustainable system.</p>
            <p><strong>shpee</strong> is constantly expanding its product range and offering a wide range of quality products. It is an ISO 9001-2008 certified company and a venture of the renowned Moral Group of Companies. With its office at Farda, Munger, Bihar, India, the group works across 28 states and 2 union territories with a multi-functional approach. With more than 7 lakh members, 120+ branch offices, 1200+ franchisees and a 1500-person workforce, shpee believes in offering world-class service levels to every customer. Our services are founded on achievement, accuracy and honesty, with the aim of providing better service and customer satisfaction. shpee believes in empowering its members with the opportunity to lead lives shaped by their dreams.</p>
          </div>
          <div className="about-stats">
            <div><UsersRound size={30} /><strong>7 Lakh+</strong><span>Community Members</span></div>
            <div><Building2 size={30} /><strong>120+</strong><span>Branch Offices</span></div>
            <div><BadgeCheck size={30} /><strong>1200+</strong><span>Franchisees</span></div>
            <div><Award size={30} /><strong>ISO</strong><span>9001-2008 Certified</span></div>
          </div>
        </div>
      </section>
    </main>
  );
}
