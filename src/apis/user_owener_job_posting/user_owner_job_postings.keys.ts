export const userOwnerJobPostingsKeys = {
  all: ["userOwnerJobPostings"] as const,
  list: (params: any) =>
    [...userOwnerJobPostingsKeys.all, "list", params] as const,
  successSummary: (range: { start_date: string; end_date: string }) =>
    [...userOwnerJobPostingsKeys.all, "success_summary", range] as const,
  applySummary: (range: { start_date: string; end_date: string }) =>
    [...userOwnerJobPostingsKeys.all, "apply_summary", range] as const,
  briefs: () => [...userOwnerJobPostingsKeys.all, "briefs"] as const,
};
