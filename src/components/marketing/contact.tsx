"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CircleCheck,
  FlaskConical,
  Globe,
  LoaderCircle,
  Mail,
  Send,
  TriangleAlert,
} from "lucide-react";

import { SectionHeading } from "@/components/marketing/reveal";
import { Reveal } from "@/components/marketing/motion";
import {
  CONTACT_ROLES,
  FLEET_SIZES,
  type FieldErrors,
} from "@/lib/contact-schema";

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setFormError(null);
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.get("fullName"),
          company: data.get("company"),
          role: data.get("role"),
          email: data.get("email"),
          phone: data.get("phone"),
          fleetSize: data.get("fleetSize"),
          message: data.get("message"),
          consent: data.get("consent") === "on",
          website: data.get("website"),
          pageUrl: window.location.href,
        }),
      });

      const result = (await response.json()) as {
        ok: boolean;
        error?: string;
        fieldErrors?: FieldErrors;
      };

      if (!response.ok || !result.ok) {
        setFieldErrors(result.fieldErrors ?? {});
        setFormError(
          result.error ?? "Something went wrong. Please try again in a moment.",
        );
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setFormError(
        "We could not reach the server. Please check your connection or email info@maridots.com directly.",
      );
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="border-t border-line bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Start a research conversation"
          description="Write to info@maridots.com, or leave your details below. Inquiries, technical evaluation discussions, and pilot feedback are processed directly by the international team — with administrative oversight in Tunisia — via that mailbox. Every message is answered personally; there is no sales pipeline."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
          <Reveal>
            <div className="card overflow-hidden">
              <div className="flex items-center gap-2 border-b border-line bg-canvas/70 px-7 py-4">
                <span className="size-2 rounded-full bg-rag-success" />
                <p className="text-xs font-semibold tracking-wide text-ink-muted">
                  International team · info@maridots.com
                </p>
              </div>

              <div className="p-7 sm:p-8">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-10 text-center"
                  >
                    <motion.span
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      className="mx-auto inline-flex size-16 items-center justify-center rounded-full bg-green-50 text-rag-success ring-1 ring-green-200"
                    >
                      <CircleCheck className="size-8" />
                    </motion.span>
                    <h3 className="display mt-6 text-2xl text-ink">
                      Thank you — your message is on its way
                    </h3>
                    <p className="mx-auto mt-3 max-w-md leading-7 text-ink-muted">
                      The international Maridots research team will reply to your
                      work email personally. You can also write directly to
                      info@maridots.com at any time.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-6 text-sm font-semibold text-ocean-700 underline-offset-4 hover:underline"
                    >
                      Send another request
                    </button>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="grid gap-5 sm:grid-cols-2"
                  >
                    {status === "error" && formError ? (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        role="alert"
                        className="flex items-start gap-2.5 rounded-xl bg-red-50 px-4 py-3 ring-1 ring-red-200 sm:col-span-2"
                      >
                        <TriangleAlert className="mt-0.5 size-4 shrink-0 text-rag-danger" />
                        <p className="text-sm text-red-800">{formError}</p>
                      </motion.div>
                    ) : null}

                    <Field
                      label="Full name"
                      name="fullName"
                      required
                      error={fieldErrors.fullName}
                      placeholder="Elena Moros"
                    />
                    <Field
                      label="Company"
                      name="company"
                      required
                      error={fieldErrors.company}
                      placeholder="Aegean Bulk Carriers"
                    />

                    <label className="text-sm">
                      <span className="font-medium text-ink">
                        Role <Required />
                      </span>
                      <select
                        name="role"
                        required
                        defaultValue=""
                        aria-invalid={Boolean(fieldErrors.role)}
                        className="input mt-1.5"
                      >
                        <option value="" disabled>
                          Select your role
                        </option>
                        {CONTACT_ROLES.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                      <FieldError message={fieldErrors.role} />
                    </label>

                    <Field
                      label="Work email"
                      name="email"
                      type="email"
                      required
                      error={fieldErrors.email}
                      placeholder="e.moros@company.com"
                    />
                    <Field
                      label="Phone"
                      name="phone"
                      type="tel"
                      error={fieldErrors.phone}
                      placeholder="Optional"
                    />

                    <label className="text-sm">
                      <span className="font-medium text-ink">Fleet size</span>
                      <select name="fleetSize" defaultValue="" className="input mt-1.5">
                        <option value="">Optional</option>
                        {FLEET_SIZES.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="text-sm sm:col-span-2">
                      <span className="font-medium text-ink">
                        Message <Required />
                      </span>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        aria-invalid={Boolean(fieldErrors.message)}
                        placeholder="12 bulk carriers, ISM audit in March, certificates tracked in spreadsheets and CAPA closure slipping. Happy to look at the risk and audit prototypes and give you feedback."
                        className="input mt-1.5 resize-y"
                      />
                      <FieldError message={fieldErrors.message} />
                    </label>

                    {/* Honeypot — hidden from users, catches naive bots. */}
                    <div className="hidden" aria-hidden="true">
                      <label>
                        Website
                        <input
                          type="text"
                          name="website"
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </label>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="flex items-start gap-2.5 text-sm">
                        <input
                          type="checkbox"
                          name="consent"
                          required
                          aria-invalid={Boolean(fieldErrors.consent)}
                          className="mt-0.5 size-4 rounded border-line accent-[#0284c7]"
                        />
                        <span className="text-ink-muted">
                          I agree that Maridots may store these details and
                          reply to me about this research enquiry. <Required />
                        </span>
                      </label>
                      <FieldError message={fieldErrors.consent} />
                    </div>

                    <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="group inline-flex items-center gap-2 rounded-full bg-ocean-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_-18px_rgba(2,132,199,0.9)] transition-colors hover:bg-ocean-700 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {status === "submitting" ? (
                          <>
                            <LoaderCircle className="size-4 animate-spin" />
                            Sending
                          </>
                        ) : (
                          <>
                            Send message
                            <Send className="size-4 transition-transform group-hover:translate-x-0.5" />
                          </>
                        )}
                      </button>
                      <p className="text-xs text-ink-subtle">
                        Your details are never shared.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="space-y-6">
              <div className="mesh-dark relative overflow-hidden rounded-2xl p-7">
                <div
                  aria-hidden="true"
                  className="grid-fine-dark absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_80%_0%,#000,transparent_70%)]"
                />
                <div className="relative">
                  <h3 className="display text-xl text-white">Maridots</h3>
                  <p className="mt-1.5 text-sm text-slate-400">
                    Streamline Compliance. Safeguard Your Assets.
                  </p>
                  <ul className="mt-6 space-y-4 text-sm">
                    <ContactLine icon={<Mail className="size-4" />} label="Email">
                      <a
                        href="mailto:info@maridots.com"
                        className="text-ocean-200 hover:text-white"
                      >
                        info@maridots.com
                      </a>
                    </ContactLine>
                    <ContactLine icon={<Globe className="size-4" />} label="Web">
                      <a
                        href="https://maridots.com"
                        className="text-ocean-200 hover:text-white"
                      >
                        maridots.com
                      </a>
                    </ContactLine>
                  </ul>
                </div>
              </div>

              <div className="card p-7">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-ocean-50 text-ocean-600 ring-1 ring-ocean-100">
                  <FlaskConical className="size-5" />
                </span>
                <h3 className="mt-5 font-semibold text-ink">
                  International team · human reply only
                </h3>
                <p className="mt-2 leading-7 text-ink-muted">
                  Maridots is an international cross-border research initiative
                  with administrative oversight in Tunisia. The prototypes are
                  not for sale, licence, or subscription. No transaction can be
                  made through this site — just a private technical exchange
                  with the international team at info@maridots.com.
                </p>
                <Link
                  href="/notice"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ocean-700 underline-offset-4 hover:underline"
                >
                  Read the research notice
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Required() {
  return (
    <span className="text-rag-danger" aria-hidden="true">
      *
    </span>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  error,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
}) {
  return (
    <label className="text-sm">
      <span className="font-medium text-ink">
        {label} {required ? <Required /> : null}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        autoComplete={
          name === "fullName"
            ? "name"
            : name === "email"
              ? "email"
              : name === "phone"
                ? "tel"
                : name === "company"
                  ? "organization"
                  : "off"
        }
        className="input mt-1.5"
      />
      <FieldError message={error} />
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <span className="mt-1.5 block text-xs font-medium text-rag-danger">
      {message}
    </span>
  );
}

function ContactLine({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-ocean-200 ring-1 ring-white/10">
        {icon}
      </span>
      <div>
        <p className="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">
          {label}
        </p>
        <p className="mt-1 leading-6 text-white">{children}</p>
      </div>
    </li>
  );
}
