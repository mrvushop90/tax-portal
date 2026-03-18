export const quickClientStatuses = ["active", "pending", "archived"] as const;

export type QuickClientStatus = (typeof quickClientStatuses)[number];

export function isQuickClientStatus(
  value: string | null | undefined,
): value is QuickClientStatus {
  if (!value) {
    return false;
  }

  return quickClientStatuses.includes(value.trim().toLowerCase() as QuickClientStatus);
}
