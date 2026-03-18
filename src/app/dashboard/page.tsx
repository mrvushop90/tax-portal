const stats = [
  {
    label: "Clients",
    value: "1,284",
    change: "+8.2%",
    detail: "Active client records",
  },
  {
    label: "Returns",
    value: "342",
    change: "+24",
    detail: "In preparation this week",
  },
  {
    label: "Revenue",
    value: "$84,900",
    change: "+12.6%",
    detail: "Collected this month",
  },
  {
    label: "Pending Submissions",
    value: "18",
    change: "-5",
    detail: "Awaiting review or transmit",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(135deg,#ffffff_0%,#eff6ff_48%,#eef2ff_100%)] p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
              Dashboard
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Welcome back to your tax operations command center.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Monitor return workflows, client activity, submission queues, and
              firm performance from a single premium workspace designed for
              high-trust financial operations.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
                Filing Status
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-950">
                94% on schedule
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
                Queue Health
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-950">
                Stable processing
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.28)] backdrop-blur"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.label}
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
                  {stat.value}
                </p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                {stat.change}
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-500">
              {stat.detail}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.28)] backdrop-blur sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
                Overview
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                Current operational snapshot
              </h3>
            </div>
            <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
              Live metrics
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-950 p-5 text-white">
              <p className="text-sm text-slate-300">Ready to transmit</p>
              <p className="mt-2 text-3xl font-semibold">126</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Awaiting documents</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">43</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Review turnaround</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">
                1.8 days
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.28)] backdrop-blur sm:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
            Team Note
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
            Submission queue is under control
          </h3>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Priority returns are moving through review on schedule, and pending
            e-file submissions have decreased compared with the prior cycle.
            Continue document follow-up for incomplete client files.
          </p>
        </article>
      </section>
    </div>
  );
}
