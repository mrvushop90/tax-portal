const statusStyles: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  pending: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
  archived: "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200",
};

const neutralStatusStyle =
  "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200";

export function getStatusBadgeStyle(status: string | null | undefined) {
  const normalizedStatus = status?.trim().toLowerCase();

  return normalizedStatus ? statusStyles[normalizedStatus] ?? neutralStatusStyle : neutralStatusStyle;
}

export function getStatusBadgeLabel(status: string | null | undefined) {
  const trimmedStatus = status?.trim();

  return trimmedStatus || "Unknown";
}
