import {
  GetJobPostingsParams,
  GetJobPostingsResponse,
  JobPostingRegistrationSummary,
} from "./job_postings.d";
import { axiosInstance } from "@apis/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { APIResponse, DateRange } from "@apis/common";
import { jobPostingsKeys } from "@apis/job_posting/job_postings.keys";

// 공고 목록 조회
export async function getJobPostings(
  params: GetJobPostingsParams
): Promise<GetJobPostingsResponse> {
  const response = await axiosInstance.get<APIResponse<GetJobPostingsResponse>>(
    "/api/v1/admins/job-postings/overviews",
    {
      params,
    }
  );
  return response.data.data;
}

export function useJobPostingsQuery(params: GetJobPostingsParams) {
  return useQuery({
    queryKey: jobPostingsKeys.list(params),
    queryFn: () => getJobPostings(params),
    staleTime: 1000 * 60 * 5,
  });
}

// 공고 등록 수 요약 조회
export async function getJobPostingSummary(
  params: DateRange
): Promise<JobPostingRegistrationSummary> {
  const response = await axiosInstance.get<
    APIResponse<{
      job_posting_registration_info: JobPostingRegistrationSummary;
    }>
  >("/api/v1/admins/job-postings/summaries", {
    params: params,
  });
  return response.data.data.job_posting_registration_info;
}

export function useJobPostingSummaryQuery(params: DateRange) {
  return useQuery({
    queryKey: jobPostingsKeys.summary(params),
    queryFn: () => getJobPostingSummary(params),
    staleTime: 1000 * 60 * 10,
  });
}
