const capabilities = [
  "Secure access",
  "Smart document upload",
  "Client management",
  "E-file returns",
  "Status tracking",
  "Reporting",
];

const highlights = [
  {
    label: "Encryption",
    value: "Bank-grade",
  },
  {
    label: "Workflow",
    value: "Real-time",
  },
  {
    label: "Platform",
    value: "E-file ready",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#e0e7ff_0%,#f8fafc_35%,#eef2ff_100%)]">
      <div className="mx-auto flex min-h-screen max-w-7xl items-stretch px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/80 shadow-[0_35px_90px_-35px_rgba(15,23,42,0.35)] backdrop-blur xl:grid-cols-[1.15fr_0.85fr]">
          <section className="relative overflow-hidden bg-[linear-gradient(135deg,#081225_0%,#102549_45%,#3f2b96_100%)] px-6 py-8 text-white sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <div className="absolute inset-0">
              <div className="absolute left-[-4rem] top-[-3rem] h-40 w-40 rounded-full bg-cyan-400/15 blur-3xl" />
              <div className="absolute right-[-5rem] top-1/3 h-56 w-56 rounded-full bg-violet-400/20 blur-3xl" />
              <div className="absolute bottom-[-5rem] left-1/3 h-56 w-56 rounded-full bg-sky-300/10 blur-3xl" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_30%,rgba(255,255,255,0.02))]" />
            </div>

            <div className="relative z-10 flex h-full flex-col">
              <div className="flex items-center justify-between gap-4">
                <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-950">
                    EP
                  </span>
                  <div>
                    <p className="text-sm font-semibold tracking-wide text-white">
                      EFile Prime
                    </p>
                    <p className="text-xs text-slate-300">
                      Modern tax operations platform
                    </p>
                  </div>
                </div>

                <div className="hidden rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-100 sm:block">
                  Trusted filing workspace
                </div>
              </div>

              <div className="mt-10 max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-200/90">
                  Premium Tax Software
                </p>
                <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                  Secure filing infrastructure for modern tax firms.
                </h1>
                <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                  Deliver a higher-trust client experience with secure access,
                  guided uploads, real-time status visibility, and professional
                  e-file workflows in one refined workspace.
                </p>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {highlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/8 px-4 py-4 backdrop-blur-sm"
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-[1.75rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Platform capabilities
                    </p>
                    <p className="mt-1 text-sm text-slate-300">
                      Purpose-built for secure tax operations and client
                      servicing.
                    </p>
                  </div>
                  <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">
                    Available across devices
                  </p>
                </div>

                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3 text-sm font-medium text-slate-100"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-300/15 text-cyan-100">
                        <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
                      </span>
                      <span>{capability}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="flex items-center justify-center bg-white px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <div className="w-full max-w-md">
              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.25)] sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
                      Sign In
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950">
                      Access your filing hub
                    </h2>
                  </div>
                  <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                    SOC-ready
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-500">
                  Sign in to manage clients, review return status, and monitor
                  firm activity from a single secure platform.
                </p>

                <form className="mt-8 space-y-5">
                  <div className="space-y-2">
                    <label
                      htmlFor="accountName"
                      className="text-sm font-medium text-slate-700"
                    >
                      Account Name
                    </label>
                    <input
                      id="accountName"
                      name="accountName"
                      type="text"
                      autoComplete="username"
                      placeholder="name@firmportal.com"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-950 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <label
                        htmlFor="password"
                        className="text-sm font-medium text-slate-700"
                      >
                        Password
                      </label>
                      <button
                        type="button"
                        className="text-xs font-medium text-sky-700 transition hover:text-sky-800"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-950 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="firmName"
                      className="text-sm font-medium text-slate-700"
                    >
                      Firm Name
                    </label>
                    <input
                      id="firmName"
                      name="firmName"
                      type="text"
                      autoComplete="organization"
                      placeholder="Enter your firm name"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-950 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
                  >
                    Login to EFile Prime
                  </button>
                </form>

                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                  <span className="mt-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <p>
                    Protected login with encrypted firm credentials and secure
                    session controls.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
