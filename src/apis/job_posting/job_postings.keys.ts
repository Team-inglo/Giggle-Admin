export const jobPostingsKeys = {
  all: ["jobPostings"] as const,
  list: (params: any) => [...jobPostingsKeys.all, "list", params] as const,
  summary: (range: { start_date: string; end_date: string }) =>
    [...jobPostingsKeys.all, "summary", range] as const,
};
