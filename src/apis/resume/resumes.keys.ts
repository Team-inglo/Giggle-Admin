export const resumeKeys = {
  all: ["resumes"] as const,
  detail: (id: number | string) => [...resumeKeys.all, "detail", id] as const,
};
