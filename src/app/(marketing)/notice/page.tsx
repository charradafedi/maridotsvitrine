import type { Metadata } from "next";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Pilot program notice",
  description:
    "Maridots is a Tunisia-led, pre-incorporation pilot program for maritime compliance and risk. Architectures and prototypes are shared for evaluation and co-creation only — not for open commercial licensing or public purchase.",
  robots: { index: false, follow: true },
};

const SECTIONS = [
  {
    heading: "Nature of the project",
    body: "Maridots is an internationally oriented maritime compliance and risk platform in a managed pre-commercial phase. Governance sits primarily with a Tunisian team, with development support as needed. No corporate entity or tax registration has been established yet. This site presents a controlled preview so selected organisations worldwide can evaluate revenue assurance and operational performance — and join pilot co-creation. We believe sophisticated capability should be within reach of every enterprise, not only those priced for the largest fleets.",
  },
  {
    heading: "Governance",
    body: "Day-to-day direction and stewardship sit with the Tunisia-led Maridots team, operating with an international vision for fleet operators and bureaux. All inquiries, pilot discussions, and co-creation correspondence are handled through info@maridots.com. There is no German corporate entity, commercial register entry, VAT identifier, or local provider establishment behind this site.",
  },
  {
    heading: "What is published here",
    body: "Material on this site includes managed-preview architectures and prototypes spanning executive fleet intelligence, asset and certificate control, crewing and STCW work and rest hours, the risk chain from Snap Hazards through incident reports, CAPA, Bowtie barriers, Fishbone RCA and Management of Change to PSC readiness and Permit to Work, audit and document control (including limited-connectivity capture), Knowledge & Reference archives, a consultancy bureau workspace, and a data migration hub. These artefacts are shared strictly for evaluation and co-creation. They are not products offered for open commercial use, licence, or sale.",
  },
  {
    heading: "Commercial status",
    body: "No open commercial activity is conducted through this site. There is no checkout, ordering flow, public price list, automated subscription, or self-serve licensing. Nothing published here constitutes an offer, quotation, invitation to contract, or commitment to supply software or services. No binding commercial agreement can be concluded through this page. Because no corporate tax registration exists yet, engagement is limited to evaluation and co-creation under arrangements agreed directly with the Tunisia-led team.",
  },
  {
    heading: "Purpose of the pilot program",
    body: "We are seeking selective international pilot accounts among shipowners, fleet managers, DPAs, quality and HSE leaders, masters, auditors, and consultancy bureaux. Pilots exist to test the application in real conditions, measure revenue assurance and operational value, and co-create the next iteration — including with operators who have historically been priced out of sophisticated tools. This site does not sell a licence.",
  },
  {
    heading: "How to engage",
    body: "Engagement is by direct correspondence only. Write to info@maridots.com to discuss a pilot, technical alignment, or co-creation. Conversations are conducted by the Tunisia-led team. Participation is selective and subject to mutual agreement; this site does not create any entitlement to access or supply.",
  },
  {
    heading: "Illustrative data",
    body: "All dashboards, KPI figures, analytics, and records shown on this site use illustrative sample data and are labelled as such. They do not represent any vessel, fleet, organisation, crew member, or audit outcome, and no operational data from any third party is published here.",
  },
  {
    heading: "Confidentiality",
    body: "Information you choose to share in a pilot or evaluation discussion is used only for that engagement, is handled by the Tunisia-led team, is not passed to third parties for marketing, and is deleted on request where applicable.",
  },
  {
    heading: "Intellectual property",
    body: "Architectures, prototypes, content, design, and materials published on this site remain the property of the Maridots project and its contributors. Reproduction, adaptation, or redistribution beyond authorised evaluation requires prior written consent.",
  },
  {
    heading: "Accuracy and liability",
    body: "This is a managed preview. Interfaces, modules, and descriptions may change without notice. No warranty is given as to accuracy, completeness, or timeliness. Nothing published here should be relied upon for operational, regulatory, or compliance decisions. External links are provided for convenience; the Maridots project accepts no responsibility for third-party content.",
  },
  {
    heading: "Contact",
    body: "Questions about this notice or the pilot program: info@maridots.com · https://maridots.com",
  },
];

export default function ProjectNoticePage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
      <p className="eyebrow">Notice</p>
      <h1 className="display mt-3 text-4xl text-ink">Pilot program notice</h1>
      <p className="mt-4 leading-7 text-ink-muted">
        Tunisia-led, pre-incorporation pilot program — evaluation and
        co-creation terms, commercial boundaries, and how to engage.
      </p>

      <div className="card mt-8 border-ocean-200 bg-ocean-50/60 p-6">
        <div className="flex items-start gap-3">
          <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-ocean-600 ring-1 ring-ocean-100">
            <Shield className="size-4.5" />
          </span>
          <div>
            <h2 className="font-semibold text-ink">
              Enterprise Pilot Program · Restricted Access
            </h2>
            <p className="mt-2 leading-7 text-ink-muted">
              Maridots is an internationally oriented, Tunisia-led project
              inviting selective pilot partners to test the platform and
              co-create around revenue assurance, efficiency, and security.
              Published architectures, modules, and prototypes are shared
              strictly for evaluation and partner onboarding. They are not
              available for open commercial licensing, public purchase, or
              automated subscription. Sophisticated capability should serve
              every enterprise scale. Pre-incorporation: no corporate tax
              registration yet. Contact{" "}
              <a
                href="mailto:info@maridots.com"
                className="font-medium text-ocean-700 underline-offset-2 hover:underline"
              >
                info@maridots.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 divide-y divide-line-soft border-t border-line-soft">
        {SECTIONS.map((section) => (
          <section
            key={section.heading}
            className="py-7 sm:grid sm:grid-cols-3 sm:gap-8"
          >
            <h2 className="font-semibold text-ink sm:col-span-1">
              {section.heading}
            </h2>
            <p className="mt-2 leading-7 text-ink-muted sm:col-span-2 sm:mt-0">
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
