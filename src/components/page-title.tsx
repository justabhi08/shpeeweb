import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageTitle({ title }: { title: string }) {
  return (
    <section className="page-title-section">
      <div className="site-container">
        <h1>{title}</h1>
        <div className="breadcrumbs">
          <Link href="/">Home</Link><ChevronRight size={15} /><span>{title}</span>
        </div>
      </div>
    </section>
  );
}
