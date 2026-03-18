import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { ClientForm } from "../client-form";
import { getClientDataFromFormData } from "../client-form-data";
import { db } from "@/lib/db";

async function createClient(formData: FormData) {
  "use server";

  const clientData = getClientDataFromFormData(formData);

  if (!clientData.firstName || !clientData.lastName) {
    redirect("/dashboard/clients/new?error=missing-required-fields");
  }

  await db.client.create({
    data: clientData,
  });

  revalidatePath("/dashboard/clients");
  redirect("/dashboard/clients");
}

export default async function NewClientPage({
  searchParams,
}: Readonly<{
  searchParams?: Promise<{ error?: string }>;
}>) {
  const params = searchParams ? await searchParams : undefined;
  const showError = params?.error === "missing-required-fields";

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
            Secure intake connected to the live client database.
          </div>
        </div>
      </section>

      {showError ? (
        <div className="rounded-[1.5rem] border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
          First name and last name are required to create a client record.
        </div>
      ) : null}

      <ClientForm
        action={createClient}
        cancelHref="/dashboard/clients"
        submitLabel="Save Client"
      />
    </div>
  );
}
