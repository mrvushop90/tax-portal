"use client";

import Link from "next/link";
import { useState } from "react";

type ClientStatus =
  | "In Progress"
  | "Awaiting Documents"
  | "Ready to File"
  | "Filed";

type ClientRecord = {
  name: string;
  type: "Individual" | "Business" | "Trust";
  phone: string;
  email: string;
  taxYear: string;
  status: ClientStatus;
  lastUpdated: string;
};

const clients: ClientRecord[] = [
  {
    name: "Olivia Bennett",
    type: "Individual",
    phone: "(415) 555-0184",
    email: "olivia.bennett@northfieldmail.com",
    taxYear: "2025",
    status: "Ready to File",
    lastUpdated: "Mar 16, 2026",
  },
  {
    name: "Harbor View Dental Group",
    type: "Business",
    phone: "(206) 555-0142",
    email: "finance@harborviewdental.com",
    taxYear: "2025",
    status: "Awaiting Documents",
    lastUpdated: "Mar 15, 2026",
  },
  {
    name: "Marcus Chen",
    type: "Individual",
    phone: "(310) 555-0167",
    email: "marcus.chen@clientmail.com",
    taxYear: "2025",
    status: "In Progress",
    lastUpdated: "Mar 14, 2026",
  },
  {
    name: "Willow Creek Holdings LLC",
    type: "Business",
    phone: "(512) 555-0138",
    email: "tax@willowcreekholdings.com",
    taxYear: "2025",
    status: "Filed",
    lastUpdated: "Mar 13, 2026",
  },
  {
    name: "Sofia Ramirez Family Trust",
    type: "Trust",
    phone: "(602) 555-0115",
    email: "admin@ramireztrust.org",
    taxYear: "2025",
    status: "Awaiting Documents",
    lastUpdated: "Mar 12, 2026",
  },
  {
    name: "Eastline Creative Studio",
    type: "Business",
    phone: "(718) 555-0191",
    email: "ops@eastlinecreative.co",
    taxYear: "2025",
    status: "Ready to File",
    lastUpdated: "Mar 11, 2026",
  },
  {
    name: "Naomi Patel",
    type: "Individual",
    phone: "(408) 555-0176",
    email: "naomi.patel@clientmail.com",
    taxYear: "2025",
    status: "In Progress",
    lastUpdated: "Mar 10, 2026",
  },
  {
    name: "Summit Ridge Properties",
    type: "Business",
    phone: "(303) 555-0129",
    email: "accounting@summitridgeprop.com",
    taxYear: "2025",
    status: "Ready to File",
    lastUpdated: "Mar 9, 2026",
  },
];

const summaries = [
  {
    label: "Total Clients",
    value: "1,284",
    detail: "All active firm relationships",
  },
  {
    label: "Active Returns",
    value: "342",
    detail: "Currently open engagements",
  },
  {
    label: "Awaiting Documents",
    value: "57",
    detail: "Missing uploads or signatures",
  },
  {
    label: "Ready to File",
    value: "126",
    detail: "Prepared and ready for transmit",
  },
];

const statusStyles: Record<ClientStatus, string> = {
  "In Progress": "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
  "Awaiting Documents":
    "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200",
  "Ready to File":
    "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  Filed: "bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200",
};

export default function ClientsPage() {
  const [query, setQuery] = useState("");

  const normalized = query.trim().toLowerCase();
  const filteredClients = normalized
    ? clients.filter((client) =>
        [
          client.name,
          client.type,
          client.phone,
          client.email,
          client.taxYear,
          client.status,
        ].some((value) => value.toLowerCase().includes(normalized)),
      )
    : clients;

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(135deg,#ffffff_0%,#eff6ff_48%,#eef2ff_100%)] p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
              Client Operations
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Clients
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Manage client records, return readiness, document collection, and
              filing progress in one organized view.
            </p>
          </div>

          <Link
            href="/dashboard/clients/new"
            className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            New Client
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaries.map((summary) => (
          <article
            key={summary.label}
            className="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.28)] backdrop-blur"
          >
            <p className="text-sm font-medium text-slate-500">
              {summary.label}
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
              {summary.value}
            </p>
            <p className="mt-4 text-sm leading-6 text-slate-500">
              {summary.detail}
            </p>
          </article>
        ))}
      </section>

      <section className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/95 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.28)] backdrop-blur">
        <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 sm:px-7 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
              Client Directory
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              Search and review client activity
            </h3>
          </div>

          <div className="w-full max-w-md">
            <label htmlFor="client-search" className="sr-only">
              Search clients
            </label>
            <input
              id="client-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by client, email, phone, year, or status"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-slate-50/90">
              <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                <th className="px-6 py-4 sm:px-7">Client Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Tax Year</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Updated</th>
                <th className="px-6 py-4 text-right sm:px-7">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr
                  key={`${client.name}-${client.email}`}
                  className="border-b border-slate-100 text-sm text-slate-700 transition hover:bg-slate-50/80"
                >
                  <td className="px-6 py-4 sm:px-7">
                    <div>
                      <p className="font-semibold text-slate-950">
                        {client.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Primary tax contact
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">{client.type}</td>
                  <td className="px-6 py-4">{client.phone}</td>
                  <td className="px-6 py-4">{client.email}</td>
                  <td className="px-6 py-4">{client.taxYear}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[client.status]}`}
                    >
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{client.lastUpdated}</td>
                  <td className="px-6 py-4 text-right sm:px-7">
                    <button
                      type="button"
                      className="text-sm font-semibold text-sky-700 transition hover:text-sky-800"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredClients.length === 0 ? (
          <div className="px-6 py-10 text-center sm:px-7">
            <p className="text-base font-semibold text-slate-900">
              No clients match your search.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Try a name, email, phone number, or tax status.
            </p>
          </div>
        ) : null}
      </section>
    </div>
  );
}
