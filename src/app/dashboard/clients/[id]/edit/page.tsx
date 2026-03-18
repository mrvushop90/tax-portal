import { revalidatePath } from "next/cache";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { ClientForm } from "../../client-form";
import { getClientDataFromFormData } from "../../client-form-data";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

function toDateInputValue(value: Date | null) {
  if (!value) {
    return "";
  }

  const month = String(value.getUTCMonth() + 1).padStart(2, "0");
  const day = String(value.getUTCDate()).padStart(2, "0");
  const year = value.getUTCFullYear();

  return `${month}/${day}/${year}`;
}

export default async function EditClientPage({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ error?: string }>;
}>) {
  const { id } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  const client = await db.client.findUnique({
    where: { id },
  });

  if (!client) {
    notFound();
  }

  async function updateClient(formData: FormData) {
    "use server";

    const clientData = getClientDataFromFormData(formData);

    if (!clientData.firstName || !clientData.lastName) {
      redirect(`/dashboard/clients/${id}/edit?error=missing-required-fields`);
    }

    await db.client.update({
      where: { id },
      data: clientData,
    });

    revalidatePath("/dashboard/clients");
    revalidatePath(`/dashboard/clients/${id}`);
    redirect(`/dashboard/clients/${id}`);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(135deg,#ffffff_0%,#eff6ff_48%,#eef2ff_100%)] p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
              Client Maintenance
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Edit Client
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Update persisted client information without changing the existing
              intake layout or downstream navigation.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/dashboard/clients/${id}`}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200"
            >
              Back to Profile
            </Link>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
              Saving updates directly to the live client record.
            </div>
          </div>
        </div>
      </section>

      {resolvedSearchParams?.error === "missing-required-fields" ? (
        <div className="rounded-[1.5rem] border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
          First name and last name are required to update a client record.
        </div>
      ) : null}

      <ClientForm
        action={updateClient}
        cancelHref={`/dashboard/clients/${id}`}
        submitLabel="Save Changes"
        values={{
          firstName: client.firstName,
          lastName: client.lastName,
          email: client.email ?? "",
          phone: client.phone ?? "",
          dateOfBirth: toDateInputValue(client.dateOfBirth),
          ssn: client.ssn ?? "",
          address: client.address ?? "",
          city: client.city ?? "",
          state: client.state ?? "CA",
          zip: client.zip ?? "",
          taxYear: client.taxYear ? String(client.taxYear) : "2025",
          engagementTaxYear: client.taxYear ? String(client.taxYear) : "2025",
          status: client.status ?? "Intake Started",
          notes: client.notes ?? "",
        }}
      />
    </div>
  );
}
