export const adminNotificationKeys = {
  all: ["adminNotifications"] as const,
  list: (params: any) => [...adminNotificationKeys.all, params] as const,
};
