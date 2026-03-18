import Link from "next/link";
import { ClientsDirectory } from "./clients-directory";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export default async function ClientsPage() {
  const clients = await db.client.findMany({
    orderBy: { updatedAt: "desc" },
  });

  const summaries = [
    {
      label: "Total Clients",
      value: clients.length.toLocaleString("en-US"),
      detail: "All client records in the database",
    },
    {
      label: "Active Returns",
      value: clients
        .filter((client) =>
          client.status
            ? ["In Progress", "Awaiting Documents", "Ready to File"].includes(
                client.status,
              )
            : false,
        )
        .length.toLocaleString("en-US"),
      detail: "Currently open engagements",
    },
    {
      label: "Awaiting Documents",
      value: clients
        .filter((client) => client.status === "Awaiting Documents")
        .length.toLocaleString("en-US"),
      detail: "Missing uploads or signatures",
    },
    {
      label: "Ready to File",
      value: clients
        .filter((client) => client.status === "Ready to File")
        .length.toLocaleString("en-US"),
      detail: "Prepared and ready for transmit",
    },
  ];

  const directoryClients = clients.map((client) => ({
    id: client.id,
    name: `${client.firstName} ${client.lastName}`.trim(),
    phone: client.phone ?? "N/A",
    email: client.email ?? "N/A",
    city: client.city ?? "",
    state: client.state ?? "",
    taxYear: client.taxYear ? String(client.taxYear) : "N/A",
    status: client.status ?? "Intake Started",
    lastUpdated: dateFormatter.format(client.updatedAt),
  }));

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

      <ClientsDirectory clients={directoryClients} />
    </div>
  );
}
