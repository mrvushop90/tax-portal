"use client";

import { quickClientStatuses } from "./client-status-options";

export function QuickStatusSelect({
  defaultValue,
}: Readonly<{
  defaultValue: string;
}>) {
  return (
    <select
      name="status"
      defaultValue={defaultValue}
      onChange={(event) => {
        if (event.currentTarget.value) {
          event.currentTarget.form?.requestSubmit();
        }
      }}
      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm capitalize text-slate-950 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100 sm:max-w-[11rem]"
      aria-label="Update client status"
    >
      {defaultValue === "" ? (
        <option value="" disabled>
          Change status
        </option>
      ) : null}
      {quickClientStatuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}
