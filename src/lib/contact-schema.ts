export const CONTACT_ROLES = [
  "Shipowner / Executive",
  "Fleet Manager",
  "DPA (Designated Person Ashore)",
  "Quality / HSE Manager",
  "Master / Deck Officer",
  "Consultancy Bureau / Auditor",
  "Other",
] as const;

export const FLEET_SIZES = [
  "1–5 vessels",
  "6–15 vessels",
  "16–40 vessels",
  "40+ vessels",
  "Consultancy bureau (multiple clients)",
] as const;

export type ContactField =
  | "fullName"
  | "company"
  | "role"
  | "email"
  | "phone"
  | "fleetSize"
  | "message"
  | "consent";

export type ContactPayload = {
  fullName: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  fleetSize: string;
  message: string;
  consent: boolean;
  pageUrl: string;
  /** Honeypot — must stay empty. */
  website: string;
};

export type FieldErrors = Partial<Record<ContactField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(payload: Partial<ContactPayload>): FieldErrors {
  const errors: FieldErrors = {};
  const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

  if (text(payload.fullName).length < 2) {
    errors.fullName = "Please enter your full name.";
  }
  if (text(payload.company).length < 2) {
    errors.company = "Please enter your company name.";
  }
  if (text(payload.role).length === 0) {
    errors.role = "Please select your role.";
  }

  const email = text(payload.email);
  if (email.length === 0) {
    errors.email = "Please enter your work email address.";
  } else if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    errors.email = "Please enter a valid email address.";
  }

  const phone = text(payload.phone);
  if (phone.length > 40) {
    errors.phone = "Please enter a shorter phone number.";
  }

  const message = text(payload.message);
  if (message.length < 10) {
    errors.message = "Please tell us a little more (at least 10 characters).";
  } else if (message.length > 4000) {
    errors.message = "Please keep your message under 4000 characters.";
  }

  if (payload.consent !== true) {
    errors.consent = "Please confirm you agree to be contacted.";
  }

  return errors;
}
