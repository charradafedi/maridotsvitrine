import type { Metadata } from "next";

import { Audiences } from "@/components/marketing/audiences";
import { Contact } from "@/components/marketing/contact";
import { ExecutiveDashboard } from "@/components/marketing/executive-dashboard";
import { FirmValues } from "@/components/marketing/firm-values";
import { Hero } from "@/components/marketing/hero";
import { Integration } from "@/components/marketing/integration";
import { Knowledge } from "@/components/marketing/knowledge";
import { Modules } from "@/components/marketing/modules";
import { Plans } from "@/components/marketing/plans";
import { Security } from "@/components/marketing/security";
import { Solution } from "@/components/marketing/solution";
import { Support } from "@/components/marketing/support";

export const metadata: Metadata = {
  title: {
    absolute: "Maridots | Enterprise Pilot Program · Maritime Compliance & Risk",
  },
  description:
    "Maridots is evaluating strategic deployment partners through a managed enterprise pilot program for maritime compliance and risk control, with administrative oversight in Tunisia. Published architectures are for evaluation and partner onboarding — not for open commercial licensing or public purchase.",
  alternates: { canonical: "/" },
};

const ORGANISATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Maridots",
  url: "https://maridots.com",
  logo: "https://maridots.com/logo.png",
  description:
    "Enterprise maritime compliance and risk platform in a managed pilot program. Architectures and prototypes are shared for evaluation and partner onboarding; not offered for open commercial licensing or public purchase.",
  email: "info@maridots.com",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static, trusted JSON-LD describing the organisation for search engines.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANISATION_SCHEMA) }}
      />
      <Hero />
      <FirmValues />
      <Solution />
      <Modules />
      <Knowledge />
      <Integration />
      <ExecutiveDashboard />
      <Security />
      <Support />
      <Audiences />
      <Plans />
      <Contact />
    </>
  );
}
