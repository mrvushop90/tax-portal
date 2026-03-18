"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const navigation = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Clients", href: "/dashboard/clients" },
  { label: "Returns", href: "#" },
  { label: "Submissions", href: "#" },
  { label: "Reports", href: "#" },
  { label: "Settings", href: "#" },
];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#dbeafe_0%,#f8fafc_35%,#eef2ff_100%)]">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col gap-4 p-4 sm:gap-6 sm:p-6 lg:flex-row lg:p-8">
        <aside className="w-full overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(180deg,#0f172a_0%,#172554_55%,#1e1b4b_100%)] text-white shadow-[0_30px_80px_-35px_rgba(15,23,42,0.45)] lg:max-w-xs">
          <div className="border-b border-white/10 px-6 py-6 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sm font-semibold text-slate-950">
                EP
              </div>
              <div>
                <p className="text-base font-semibold tracking-wide">
                  EFile Prime
                </p>
                <p className="text-sm text-slate-300">
                  Tax operations platform
                </p>
              </div>
            </div>
          </div>

          <div className="px-4 py-5 sm:px-5">
            <p className="px-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
              Navigation
            </p>
            <nav className="mt-4 grid gap-2">
              {navigation.map((item) => {
                const isActive =
                  item.href !== "#" &&
                  (pathname === item.href ||
                    pathname.startsWith(`${item.href}/`));

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-white text-slate-950 shadow-[0_16px_30px_-18px_rgba(15,23,42,0.5)]"
                        : "text-slate-200 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        isActive ? "bg-emerald-500" : "bg-slate-500"
                      }`}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mx-4 mb-4 mt-auto rounded-[1.5rem] border border-white/10 bg-white/8 p-5 backdrop-blur sm:mx-5 sm:mb-5">
            <p className="text-sm font-semibold text-white">
              Secure workspace
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Centralized filing, client records, and submission monitoring in
              one protected environment.
            </p>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-4 sm:gap-6">
          <header className="flex flex-col gap-4 rounded-[2rem] border border-slate-200/80 bg-white/80 px-5 py-5 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.35)] backdrop-blur sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
                Modern Tax Platform
              </p>
              <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl">
                EFile Prime Workspace
              </h1>
            </div>

            <div className="flex items-center gap-3 self-start rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm lg:self-auto">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                AD
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  User Menu
                </p>
                <p className="text-xs text-slate-500">
                  Account controls placeholder
                </p>
              </div>
            </div>
          </header>

          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
