import type { Metadata } from "next";
import { FlaskConical } from "lucide-react";

export const metadata: Metadata = {
  title: "Research notice",
  description:
    "Maridots is an international cross-border technology research initiative in maritime compliance and risk architecture, jointly managed with administrative oversight in Tunisia. This notice sets out the non-commercial terms on which this site is published.",
  robots: { index: false, follow: true },
};

const SECTIONS = [
  {
    heading: "Nature of the initiative",
    body: "Maridots is an international cross-border technology research initiative in maritime compliance and risk architecture. It is jointly developed and managed with administrative oversight by an international associate based in Tunisia. It is not a local commercial company, a product launch, or a software service for sale. The work consists of internal R&D prototypes built to investigate how compliance, risk, and audit workflows behave when they share a single controlled record.",
  },
  {
    heading: "Administrative & management oversight",
    body: "Day-to-day administrative and management oversight for the initiative sits with our international associate in Tunisia. All public inquiries, technical evaluation discussions, and pilot feedback are processed by the international team through info@maridots.com. There is no domestic German corporate entity, commercial register entry, VAT identifier, or local provider establishment behind this site.",
  },
  {
    heading: "What the prototypes are",
    body: "The material shown here consists of internal research prototypes: an executive dashboard exploring fleet KPIs and AI-assisted prioritisation, an asset and certificate register, crewing with STCW work and rest hours, the risk chain from Snap Hazards through incident reports, CAPA, Bowtie barriers, Fishbone RCA and Management of Change to PSC readiness and Permit to Work, audit and document control including audits captured with limited connectivity, Knowledge & Reference archives, a consultancy bureau workspace, and a data migration hub. They are research artefacts used for technical discussion, not products, and not offered for use, licence, or sale.",
  },
  {
    heading: "Non-commercial status",
    body: "No commercial activity is conducted through this site. There is no checkout, no ordering, no price list, no subscription, no licensing, and no transaction of any kind. Nothing published here constitutes an offer, a quotation, an invitation to contract, or a commitment to supply software or services, and no binding agreement can be concluded through this page. The prototypes are not made available for operational use.",
  },
  {
    heading: "Why we publish it",
    body: "Research of this kind is only useful if practitioners review it. The initiative is published so that shipowners, fleet managers, DPAs, quality managers, HSE officers, masters, auditors, and academic researchers can examine the approach and tell us where it does not match practice. Their input shapes the direction of the research.",
  },
  {
    heading: "How to take part",
    body: "Participation is by correspondence only. Write to info@maridots.com to arrange a technical discussion or to contribute a practitioner or academic perspective. Discussions are conducted directly between people on the international team, free of charge, with no commitment on either side and no commercial follow-up.",
  },
  {
    heading: "Illustrative data",
    body: "All dashboards, KPI figures, analytics, and records shown on this site use illustrative research data and are labelled as such. They do not represent any vessel, fleet, organisation, crew member, or audit outcome, and no operational data from any third party is published here.",
  },
  {
    heading: "Feedback and confidentiality",
    body: "Feedback offered during a discussion informs the direction of the research. Information you choose to share is used only for that discussion, is handled by the international team, is not passed to third parties, and is deleted on request.",
  },
  {
    heading: "Intellectual property",
    body: "The prototypes, content, design, and materials published on this site remain the property of the initiative and its contributors. Reproduction, adaptation, or redistribution beyond personal review requires prior written consent.",
  },
  {
    heading: "Accuracy and liability",
    body: "This is research material. Prototypes, interfaces, and descriptions change without notice, no warranty is given as to accuracy, completeness, or timeliness, and nothing published here should be relied upon for any operational, regulatory, or compliance decision. This site links to external resources over whose content the initiative has no control and for which no responsibility is accepted.",
  },
  {
    heading: "Contact",
    body: "Questions about this notice or the research are handled by the international team: info@maridots.com · https://maridots.com",
  },
];

export default function ProjectNoticePage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
      <p className="eyebrow">Notice</p>
      <h1 className="display mt-3 text-4xl text-ink">Research notice</h1>
      <p className="mt-4 leading-7 text-ink-muted">
        International cross-border research with administrative oversight in
        Tunisia — what the prototypes are, and the non-commercial terms on which
        this site is published.
      </p>

      <div className="card mt-8 border-ocean-200 bg-ocean-50/60 p-6">
        <div className="flex items-start gap-3">
          <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-ocean-600 ring-1 ring-ocean-100">
            <FlaskConical className="size-4.5" />
          </span>
          <div>
            <h2 className="font-semibold text-ink">
              International cross-border R&amp;D · Tunisia administrative
              oversight
            </h2>
            <p className="mt-2 leading-7 text-ink-muted">
              Maridots is jointly developed and managed with administrative
              oversight in Tunisia. Everything shown here is an internal research
              prototype for technical discussion. Nothing is sold, licensed, or
              made available for operational use through this page. Inquiries
              reach the international team at info@maridots.com.
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
