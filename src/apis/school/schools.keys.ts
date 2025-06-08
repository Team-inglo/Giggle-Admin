export const schoolsKeys = {
  all: ["schools"] as const,
  list: (params: any) => [...schoolsKeys.all, "list", params] as const,
  detail: (id: string | number) => [...schoolsKeys.all, "detail", id] as const,
};
