"use client";

import Link from "next/link";
import type { ChangeEvent } from "react";
import type { ReactNode } from "react";

import {
  defaultClientFormValues,
  normalizeZip,
  formatSsn,
  type ClientFormValues,
} from "./client-form-data";

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

function capitalizeFirstLetter(value: string) {
  if (!value) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatPhoneNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10);

  if (digits.length === 0) {
    return "";
  }

  if (digits.length <= 3) {
    return `(${digits}`;
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function formatDateOfBirth(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
  event.currentTarget.value = capitalizeFirstLetter(event.currentTarget.value);
}

function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
  event.currentTarget.value = formatPhoneNumber(event.currentTarget.value);
}

function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
  event.currentTarget.value = event.currentTarget.value.toLowerCase();
}

function handleDateOfBirthChange(event: ChangeEvent<HTMLInputElement>) {
  event.currentTarget.value = formatDateOfBirth(event.currentTarget.value);
}

function handleSsnChange(event: ChangeEvent<HTMLInputElement>) {
  event.currentTarget.value = formatSsn(event.currentTarget.value);
}

function handleZipChange(event: ChangeEvent<HTMLInputElement>) {
  event.currentTarget.value = normalizeZip(event.currentTarget.value);
}

export function ClientForm({
  action,
  values,
  cancelHref,
  submitLabel,
}: Readonly<{
  action: (formData: FormData) => void | Promise<void>;
  values?: Partial<ClientFormValues>;
  cancelHref: string;
  submitLabel: string;
}>) {
  const formValues = {
    ...defaultClientFormValues,
    ...values,
    ssn: formatSsn(values?.ssn ?? defaultClientFormValues.ssn),
    zip: normalizeZip(values?.zip ?? defaultClientFormValues.zip),
  };

  return (
    <form action={action} className="space-y-6">
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
                defaultChecked={formValues.clientType === type}
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
              required
              defaultValue={formValues.firstName}
              placeholder="Enter first name"
              onChange={handleNameChange}
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
              required
              defaultValue={formValues.lastName}
              placeholder="Enter last name"
              onChange={handleNameChange}
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
              defaultValue={formValues.phone}
              placeholder="(555) 555-5555"
              onChange={handlePhoneChange}
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
              defaultValue={formValues.email}
              placeholder="name@client.com"
              onChange={handleEmailChange}
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
            helper="Use the taxpayer's legal date of birth."
          >
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="text"
              inputMode="numeric"
              defaultValue={formValues.dateOfBirth}
              placeholder="MM/DD/YYYY"
              maxLength={10}
              onChange={handleDateOfBirthChange}
              className={inputClassName}
            />
          </Field>

          <Field
            id="ssn"
            label="SSN"
            helper="Stored only when intentionally captured for tax processing."
          >
            <input
              id="ssn"
              name="ssn"
              type="text"
              inputMode="numeric"
              defaultValue={formValues.ssn}
              placeholder="XXX-XX-XXXX"
              maxLength={11}
              onChange={handleSsnChange}
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
              defaultValue={formValues.occupation}
              placeholder="Enter occupation"
              className={inputClassName}
            />
          </Field>

          <Field
            id="taxYear"
            label="Tax Year"
            helper="Select the filing year for this engagement."
          >
            <select
              id="taxYear"
              name="taxYear"
              defaultValue={formValues.taxYear}
              className={inputClassName}
            >
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
              defaultValue={formValues.spouseFirstName}
              placeholder="Enter spouse first name"
              onChange={handleNameChange}
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
              defaultValue={formValues.spouseLastName}
              placeholder="Enter spouse last name"
              onChange={handleNameChange}
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
              id="address"
              label="Address Line 1"
              helper="Primary street address or business mailing address."
            >
              <input
                id="address"
                name="address"
                type="text"
                defaultValue={formValues.address}
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
              defaultValue={formValues.city}
              placeholder="Enter city"
              className={inputClassName}
            />
          </Field>

          <Field id="state" label="State">
            <select
              id="state"
              name="state"
              defaultValue={formValues.state}
              className={inputClassName}
            >
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
              defaultValue={formValues.zip}
              placeholder="Enter ZIP"
              maxLength={5}
              onChange={handleZipChange}
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
              defaultValue={formValues.engagementTaxYear}
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
            <select
              id="status"
              name="status"
              defaultValue={formValues.status}
              className={inputClassName}
            >
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
            defaultValue={formValues.notes}
            placeholder="Add intake notes, document requests, or filing instructions"
            className={`${inputClassName} resize-y`}
          />
        </Field>
      </Section>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          href={cancelHref}
          className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
