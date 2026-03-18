"use client";

import Link from "next/link";
import { useState } from "react";

type ClientListItem = {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  taxYear: string;
  status: string;
  lastUpdated: string;
};

const statusStyles: Record<string, string> = {
  "In Progress": "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
  "Awaiting Documents":
    "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200",
  "Ready to File":
    "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  Filed: "bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200",
  "Intake Started":
    "bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200",
};

function getStatusStyle(status: string) {
  return (
    statusStyles[status] ??
    "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200"
  );
}

export function ClientsDirectory({
  clients,
}: Readonly<{
  clients: ClientListItem[];
}>) {
  const [query, setQuery] = useState("");

  const normalized = query.trim().toLowerCase();
  const filteredClients = normalized
    ? clients.filter((client) =>
        [
          client.name,
          client.phone,
          client.email,
          client.city,
          client.state,
          client.taxYear,
          client.status,
        ].some((value) => value.toLowerCase().includes(normalized)),
      )
    : clients;

  return (
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
            placeholder="Search by client, email, phone, location, year, or status"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-slate-50/90">
            <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              <th className="px-6 py-4 sm:px-7">Client Name</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Tax Year</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Last Updated</th>
              <th className="px-6 py-4 text-right sm:px-7">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr
                key={client.id}
                className="border-b border-slate-100 text-sm text-slate-700 transition hover:bg-slate-50/80"
              >
                <td className="px-6 py-4 sm:px-7">
                  <div>
                    <Link
                      href={`/dashboard/clients/${client.id}`}
                      className="font-semibold text-slate-950 transition hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-200"
                    >
                      {client.name}
                    </Link>
                    <p className="mt-1 text-xs text-slate-500">
                      Primary tax contact
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">{client.phone}</td>
                <td className="px-6 py-4">{client.email}</td>
                <td className="px-6 py-4">
                  {`${client.city}${client.city && client.state ? ", " : ""}${client.state}` ||
                    "N/A"}
                </td>
                <td className="px-6 py-4">{client.taxYear}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(client.status)}`}
                  >
                    {client.status}
                  </span>
                </td>
                <td className="px-6 py-4">{client.lastUpdated}</td>
                <td className="px-6 py-4 text-right sm:px-7">
                  <Link
                    href={`/dashboard/clients/${client.id}`}
                    className="text-sm font-semibold text-sky-700 transition hover:text-sky-800"
                  >
                    View
                  </Link>
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
            Try a name, email, phone number, location, or tax status.
          </p>
        </div>
      ) : null}
    </section>
  );
}
