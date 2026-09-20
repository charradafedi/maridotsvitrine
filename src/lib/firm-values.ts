/**
 * The five canonical Maridots firm values. Anywhere the site presents "what we
 * stand for" — hero strip, footer trust row — it reads from this list. Modules,
 * knowledge, integrations, and support are capabilities and live in their own
 * sections; they are deliberately not values.
 */
export const FIRM_VALUES = [
  {
    id: "compliance",
    label: "Compliance",
    detail: "Certificates, audits, and regulatory control in one system",
  },
  {
    id: "offline-audits",
    label: "Offline audits",
    detail: "Run and complete audits with limited connectivity; sync when online",
  },
  {
    id: "risk",
    label: "Risk management",
    detail: "Snap Hazards → Reports → CAPA → Bowtie / Fishbone → PTW",
  },
  {
    id: "flexibility",
    label: "High flexibility",
    detail: "Modular research scopes, fleet-to-bureau workspace perspectives",
  },
  {
    id: "security",
    label: "Appreciated security",
    detail:
      "RBAC, signed approvals, PIN-authenticated high-liability actions, full traceability",
  },
] as const;
