import { revalidatePath } from "next/cache";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { formatSsn } from "../client-form-data";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

function formatValue(value: string | null) {
  return value && value.trim() ? value : "Not provided";
}

function formatDate(value: Date | null) {
  return value ? dateFormatter.format(value) : "Not provided";
}

function DetailItem({
  label,
  value,
}: Readonly<{
  label: string;
  value: string;
}>) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-900">{value}</p>
    </div>
  );
}

export default async function ClientDetailPage({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ confirmDelete?: string }>;
}>) {
  const { id } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  const client = await db.client.findUnique({
    where: { id },
  });

  if (!client) {
    notFound();
  }

  const showDeleteConfirmation =
    resolvedSearchParams?.confirmDelete === "true";

  async function deleteClient() {
    "use server";

    await db.client.deleteMany({
      where: { id },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/clients");
    redirect("/dashboard/clients");
  }

  const fullName = `${client.firstName} ${client.lastName}`.trim();
  const location = [client.city, client.state, client.zip]
    .filter((value): value is string => Boolean(value))
    .join(", ");

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(135deg,#ffffff_0%,#eff6ff_48%,#eef2ff_100%)] p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
              Client Profile
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              {fullName}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Review contact information, tax engagement details, and internal
              notes for this client record.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard/clients"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200"
            >
              Back to Clients
            </Link>
            <Link
              href={`/dashboard/clients/${client.id}/edit`}
              className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
            >
              Edit Client
            </Link>
            {showDeleteConfirmation ? (
              <Link
                href={`/dashboard/clients/${client.id}`}
                className="inline-flex items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 px-5 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 focus:outline-none focus:ring-4 focus:ring-rose-100"
              >
                Cancel Delete
              </Link>
            ) : (
              <Link
                href={`/dashboard/clients/${client.id}?confirmDelete=true`}
                className="inline-flex items-center justify-center rounded-2xl border border-rose-200 bg-white px-5 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-50 focus:outline-none focus:ring-4 focus:ring-rose-100"
              >
                Delete Client
              </Link>
            )}
          </div>
        </div>
      </section>

      {showDeleteConfirmation ? (
        <section className="rounded-[1.75rem] border border-rose-200 bg-[linear-gradient(135deg,#fff1f2_0%,#ffffff_100%)] p-6 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.28)] sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-700">
                Delete Confirmation
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                Delete {fullName}?
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                This permanently removes the client record from the dashboard.
                Use the final delete action only if you are certain.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/dashboard/clients/${client.id}`}
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200"
              >
                Keep Client
              </Link>
              <form action={deleteClient}>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-2xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-100"
                >
                  Confirm Delete
                </button>
              </form>
            </div>
          </div>
        </section>
      ) : null}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.28)] backdrop-blur">
          <p className="text-sm font-medium text-slate-500">Status</p>
          <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {client.status ?? "Intake Started"}
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-500">
            Current intake or preparation stage.
          </p>
        </article>
        <article className="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.28)] backdrop-blur">
          <p className="text-sm font-medium text-slate-500">Tax Year</p>
          <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {client.taxYear ?? "Not set"}
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-500">
            Assigned filing year for this engagement.
          </p>
        </article>
        <article className="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.28)] backdrop-blur">
          <p className="text-sm font-medium text-slate-500">Created</p>
          <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {dateFormatter.format(client.createdAt)}
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-500">
            Original record creation date.
          </p>
        </article>
        <article className="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.28)] backdrop-blur">
          <p className="text-sm font-medium text-slate-500">Last Updated</p>
          <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {dateFormatter.format(client.updatedAt)}
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-500">
            Most recent database update.
          </p>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[1.75rem] border border-slate-200/80 bg-white/95 p-6 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.28)] backdrop-blur sm:p-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
              Contact Details
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              Client Information
            </h3>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <DetailItem label="First Name" value={client.firstName} />
            <DetailItem label="Last Name" value={client.lastName} />
            <DetailItem label="Email" value={formatValue(client.email)} />
            <DetailItem label="Phone" value={formatValue(client.phone)} />
            <DetailItem
              label="Date of Birth"
              value={formatDate(client.dateOfBirth)}
            />
            <DetailItem
              label="SSN"
              value={client.ssn ? formatSsn(client.ssn) : "Not provided"}
            />
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-slate-200/80 bg-white/95 p-6 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.28)] backdrop-blur sm:p-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
              Address
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              Mailing Information
            </h3>
          </div>
          <div className="mt-6 grid gap-4">
            <DetailItem label="Street Address" value={formatValue(client.address)} />
            <DetailItem label="Location" value={location || "Not provided"} />
          </div>
        </section>
      </section>

      <section className="rounded-[1.75rem] border border-slate-200/80 bg-white/95 p-6 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.28)] backdrop-blur sm:p-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
            Internal Notes
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
            Engagement Notes
          </h3>
        </div>
        <p className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 text-sm leading-7 text-slate-700">
          {client.notes?.trim() ? client.notes : "No notes have been added for this client."}
        </p>
      </section>
    </div>
  );
}
