import Link from "next/link";
import type { ReactNode } from "react";

const clientTypes = [
  "Individual",
  "Married Filing Jointly",
  "Business",
] as const;

const engagementStatuses = [
  "Intake Started",
  "Awaiting Documents",
  "In Progress",
  "Ready to File",
] as const;

const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

function Section({
  eyebrow,
  title,
  description,
  children,
}: Readonly<{
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}>) {
  return (
    <section className="rounded-[1.75rem] border border-slate-200/80 bg-white/95 p-6 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.28)] backdrop-blur sm:p-7">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
          {eyebrow}
        </p>
        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Field({
  id,
  label,
  helper,
  children,
}: Readonly<{
  id: string;
  label: string;
  helper?: string;
  children: React.ReactNode;
}>) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      {children}
      {helper ? <p className="text-xs leading-5 text-slate-500">{helper}</p> : null}
    </div>
  );
}

const inputClassName =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-950 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100";

export default function NewClientPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(135deg,#ffffff_0%,#eff6ff_48%,#eef2ff_100%)] p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
              Client Intake
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              New Client
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Capture core taxpayer, contact, and engagement information in a
              structured intake flow designed for high-trust tax operations.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
            Secure intake draft only. No database connection yet.
          </div>
        </div>
      </section>

      <form className="space-y-6">
        <Section
          eyebrow="Section 1"
          title="Client Type"
          description="Select the engagement structure to tailor intake and filing workflow expectations."
        >
          <div className="grid gap-3 md:grid-cols-3">
            {clientTypes.map((type) => (
              <label
                key={type}
                className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-sky-300 hover:bg-white"
              >
                <input
                  type="radio"
                  name="clientType"
                  value={type}
                  defaultChecked={type === "Individual"}
                  className="mt-1 h-4 w-4 border-slate-300 text-sky-600 focus:ring-sky-500"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-950">{type}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {type === "Business"
                      ? "Use for entity-based returns and business client records."
                      : type === "Married Filing Jointly"
                        ? "Includes spouse information and joint taxpayer intake."
                        : "Standard individual taxpayer intake and annual filing setup."}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="Section 2"
          title="Primary Contact Information"
          description="Use the primary taxpayer or business contact details for communication and portal access."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field
              id="firstName"
              label="First Name"
              helper="Enter the legal first name used for tax documents."
            >
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Enter first name"
                className={inputClassName}
              />
            </Field>

            <Field
              id="lastName"
              label="Last Name"
              helper="Use the legal surname or business contact surname."
            >
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Enter last name"
                className={inputClassName}
              />
            </Field>

            <Field
              id="phone"
              label="Phone"
              helper="Primary number for client follow-up and filing questions."
            >
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(555) 555-5555"
                className={inputClassName}
              />
            </Field>

            <Field
              id="email"
              label="Email"
              helper="Used for secure notifications and document requests."
            >
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@client.com"
                className={inputClassName}
              />
            </Field>
          </div>
        </Section>

        <Section
          eyebrow="Section 3"
          title="Taxpayer Basic Information"
          description="Capture key identity details required for preparing and validating the engagement."
        >
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <Field
              id="dateOfBirth"
              label="Date of Birth"
              helper="Use the taxpayer’s legal date of birth."
            >
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                className={inputClassName}
              />
            </Field>

            <Field
              id="ssn"
              label="SSN"
              helper="Store securely after backend integration is added."
            >
              <input
                id="ssn"
                name="ssn"
                type="text"
                inputMode="numeric"
                placeholder="XXX-XX-XXXX"
                className={inputClassName}
              />
            </Field>

            <Field
              id="occupation"
              label="Occupation"
              helper="Helpful for deduction context and return notes."
            >
              <input
                id="occupation"
                name="occupation"
                type="text"
                placeholder="Enter occupation"
                className={inputClassName}
              />
            </Field>

            <Field
              id="taxYear"
              label="Tax Year"
              helper="Select the filing year for this engagement."
            >
              <select id="taxYear" name="taxYear" defaultValue="2025" className={inputClassName}>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </Field>
          </div>
        </Section>

        <Section
          eyebrow="Section 4"
          title="Spouse Information"
          description="Complete this section for Married Filing Jointly engagements. Leave blank for individual or business returns."
        >
          <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Optional section UI. Include spouse details only when applicable.
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field
              id="spouseFirstName"
              label="Spouse First Name"
              helper="Required for joint individual returns."
            >
              <input
                id="spouseFirstName"
                name="spouseFirstName"
                type="text"
                placeholder="Enter spouse first name"
                className={inputClassName}
              />
            </Field>

            <Field
              id="spouseLastName"
              label="Spouse Last Name"
              helper="Use the legal surname shown on tax documents."
            >
              <input
                id="spouseLastName"
                name="spouseLastName"
                type="text"
                placeholder="Enter spouse last name"
                className={inputClassName}
              />
            </Field>
          </div>
        </Section>

        <Section
          eyebrow="Section 5"
          title="Address"
          description="Mailing address used for notices, return records, and jurisdictional filing details."
        >
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div className="md:col-span-2 xl:col-span-4">
              <Field
                id="addressLine1"
                label="Address Line 1"
                helper="Primary street address or business mailing address."
              >
                <input
                  id="addressLine1"
                  name="addressLine1"
                  type="text"
                  placeholder="Enter street address"
                  className={inputClassName}
                />
              </Field>
            </div>

            <Field id="city" label="City">
              <input
                id="city"
                name="city"
                type="text"
                placeholder="Enter city"
                className={inputClassName}
              />
            </Field>

            <Field id="state" label="State">
              <select id="state" name="state" defaultValue="CA" className={inputClassName}>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </Field>

            <Field id="zip" label="ZIP">
              <input
                id="zip"
                name="zip"
                type="text"
                inputMode="numeric"
                placeholder="Enter ZIP"
                className={inputClassName}
              />
            </Field>
          </div>
        </Section>

        <Section
          eyebrow="Section 6"
          title="Tax Engagement Details"
          description="Set filing context and workflow status so the team can triage and prepare the return efficiently."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field
              id="engagementTaxYear"
              label="Tax Year"
              helper="This controls which annual return cycle the client belongs to."
            >
              <select
                id="engagementTaxYear"
                name="engagementTaxYear"
                defaultValue="2025"
                className={inputClassName}
              >
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </Field>

            <Field
              id="status"
              label="Status"
              helper="Choose the current intake or preparation stage."
            >
              <select id="status" name="status" defaultValue="Intake Started" className={inputClassName}>
                {engagementStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </Section>

        <Section
          eyebrow="Section 7"
          title="Notes"
          description="Capture intake observations, document gaps, or special handling instructions for the internal team."
        >
          <Field
            id="notes"
            label="Notes"
            helper="Internal notes only. Example: extension expected, organizer sent, or missing identity verification."
          >
            <textarea
              id="notes"
              name="notes"
              rows={6}
              placeholder="Add intake notes, document requests, or filing instructions"
              className={`${inputClassName} resize-y`}
            />
          </Field>
        </Section>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            href="/dashboard/clients"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            Save Client
          </button>
        </div>
      </form>
    </div>
  );
}
