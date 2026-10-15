import type { Metadata } from "next";
import { PageTitle } from "@/components/page-title";

export const metadata: Metadata = { title: "Term & Policy" };

const sections = [
  ["Acceptance of Terms", "This agreement governs access to and use of products and services provided and administered by shpee and its associated companies, agents, suppliers and licensors. By purchasing, using or accessing the services, members accept these terms and the applicable privacy policy."],
  ["General Use of the Service", "Members agree to use the service only for lawful purposes and in accordance with applicable laws. Access credentials must be protected, and account activity remains the responsibility of the registered member."],
  ["Charges and Billing", "Applicable charges, product prices and payment terms are shown before confirmation. shpee may update its prices and service charges, and all purchases remain subject to availability and successful payment or cash-on-delivery acceptance."],
  ["Taxes", "Members and customers are responsible for taxes, duties and government charges that apply to their purchases or use of services, except where these are expressly included in the displayed price."],
  ["Support Services", "Support is available through the official contact channels published on this website. Response times may vary based on the nature and volume of requests."],
  ["Member Registration / Privacy Policy", "Information supplied during registration, checkout or support requests is handled according to our privacy practices. We use this information to fulfil orders, provide service, prevent misuse and meet legal obligations."],
  ["Member Conduct", "Members must not use the website to distribute unlawful, harmful, misleading, infringing or abusive content, interfere with website security, or attempt unauthorised access to systems or other accounts."],
  ["Third Party Content", "Links or services provided by third parties are offered for convenience. shpee is not responsible for the availability, accuracy, acts or omissions of independent third-party services."],
  ["Disclaimer of Warranties", "Services are provided on an available basis. Product information is prepared with care, but colours, packaging and presentation may vary. Nothing in these terms limits rights that cannot be excluded under applicable law."],
  ["Limitation of Liability", "To the extent permitted by law, liability is limited to direct losses arising from the relevant purchase. shpee is not liable for indirect, incidental or consequential losses caused by events outside reasonable control."],
  ["Data Privacy and Security", "Reasonable administrative and technical safeguards are used to protect personal information. Users should keep their passwords confidential and notify support if they suspect unauthorised access."],
  ["Termination / Cancellation", "Accounts or services may be restricted for breach of these terms, fraud, abuse or legal requirements. Order cancellation requests are subject to processing status, product category and applicable return policies."],
  ["Governing Law and Dispute Resolution", "These terms are governed by the laws of India. Disputes will be handled by the competent courts and authorities having jurisdiction over the company’s registered operations."],
];

export default function TermsPage() {
  return (
    <main>
      <PageTitle title="Term & Policy" />
      <section className="policy-section">
        <div className="site-container policy-card">
          <h2>shpee Terms of Use</h2>
          <p className="policy-updated">Please read these terms carefully before using this website.</p>
          {sections.map(([title, copy], index) => (
            <section key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{copy}</p></div></section>
          ))}
        </div>
      </section>
    </main>
  );
}
