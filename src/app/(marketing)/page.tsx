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
    absolute: "Maridots | Pre-Launch Technical Preview & Architecture Research",
  },
  description:
    "Maridots is an international cross-border technology research initiative in maritime compliance and risk architecture, jointly managed with administrative oversight in Tunisia. Internal prototypes for technical evaluation — not for sale or licence.",
  alternates: { canonical: "/" },
};

const ORGANISATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ResearchProject",
  name: "Maridots",
  url: "https://maridots.com",
  logo: "https://maridots.com/logo.png",
  description:
    "International cross-border technology research initiative into maritime compliance and risk architecture. Jointly developed and managed with administrative oversight in Tunisia. Non-commercial; prototypes are not offered for sale or licence.",
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
