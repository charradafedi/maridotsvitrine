import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy notice",
  description:
    "What Maridots does with the details submitted through maridots.com. Messages are handled by the international team with administrative oversight in Tunisia.",
  robots: { index: false, follow: true },
};

const SECTIONS = [
  {
    heading: "1. Who handles your data",
    body: "Maridots is an international cross-border technology research initiative jointly developed and managed with administrative oversight in Tunisia. Messages sent through this site are processed by the international team and reach the info@maridots.com mailbox. For any question about your data, write to info@maridots.com.",
  },
  {
    heading: "2. What we collect",
    body: "Only what you type into the contact form: name, company, role, work email, optional telephone number, optional fleet size, and your message — together with the time of submission and the page the enquiry came from. There are no marketing cookies, no advertising trackers, and no visitor profiling on this site.",
  },
  {
    heading: "3. Why we collect it",
    body: "Solely so the international team can reply to you and hold a private technical research conversation about the prototypes. Your details are not used for sales, marketing, profiling, or automated follow-up; they are not sold, rented, or shared for advertising; and no contract of any kind is concluded through this site.",
  },
  {
    heading: "4. Who processes it for us",
    body: "Form submissions are delivered by email through Resend (Resend, Inc.), our transactional email provider, and are then held in the international team mailbox. Hosting and content delivery providers process standard technical request data such as IP address and user agent in their server logs. [Placeholder — name the hosting provider once deployment is final.]",
  },
  {
    heading: "5. How long we keep it",
    body: "Correspondence is kept for as long as the conversation is relevant to the research, and deleted on request or once the exchange is closed. Ask us to delete it at any time and we will.",
  },
  {
    heading: "6. Your choices",
    body: "You can ask us what we hold about you, ask us to correct or delete it, ask us to stop contacting you, or withdraw the consent you gave when submitting the form — at any time, by writing to info@maridots.com. Where data protection law grants you further rights, including the right to complain to a supervisory authority, those rights apply in full.",
  },
  {
    heading: "7. International handling",
    body: "Because the initiative is managed across borders — including administrative oversight in Tunisia — and uses service providers that may process data outside your country of residence, correspondence may be handled in more than one jurisdiction, under the safeguards those providers make available. [Placeholder — confirm the final provider set and their transfer mechanisms before launch.]",
  },
  {
    heading: "8. Changes",
    body: "This notice covers the research phase of the initiative and would be replaced by a full privacy policy before any service were ever offered commercially. No such service is offered today.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
      <p className="eyebrow">Privacy</p>
      <h1 className="display mt-3 text-4xl text-ink">Privacy notice</h1>
      <p className="mt-4 leading-7 text-ink-muted">
        What happens to the details you submit through maridots.com during the
        research phase. Messages are handled by the international team with
        administrative oversight in Tunisia.
      </p>

      <div className="card mt-8 border-ocean-200 bg-ocean-50/60 p-6">
        <div className="flex items-start gap-3">
          <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-ocean-600 ring-1 ring-ocean-100">
            <ShieldCheck className="size-4.5" />
          </span>
          <div>
            <h2 className="font-semibold text-ink">The short version</h2>
            <p className="mt-2 leading-7 text-ink-muted">
              We collect only what you put in the contact form, use it solely
              to reply and to hold a research conversation, never sell or share
              it for advertising, and delete it whenever you ask.
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
