import {
  GetUserOwnerJobPostingsParams,
  GetUserOwnerJobPostingsResponse,
  CountSummary,
  PatchUserOwnerJobPostingMemoRequest,
  GetUserOwnerJobPostingsBriefResponse,
} from "@apis/user_owener_job_posting/user_owner_job_postings.d";
import { axiosInstance } from "@apis/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { APIResponse, DateRange } from "@apis/common";
import { userOwnerJobPostingsKeys } from "@apis/user_owener_job_posting/user_owner_job_postings.keys";

// 지원 목록 조회
export async function getUserOwnerJobPostings(
  params: GetUserOwnerJobPostingsParams
): Promise<GetUserOwnerJobPostingsResponse> {
  const response = await axiosInstance.get<
    APIResponse<GetUserOwnerJobPostingsResponse>
  >("/api/v1/admins/user-owner-job-postings/overviews", {
    params,
  });
  return response.data.data;
}

export function useUserOwnerJobPostingsQuery(
  params: GetUserOwnerJobPostingsParams
) {
  return useQuery({
    queryKey: userOwnerJobPostingsKeys.list(params),
    queryFn: () => getUserOwnerJobPostings(params),
    staleTime: 1000 * 60 * 5,
  });
}

// 매칭 성공 수 조회
export async function getSuccessfulMatches(
  params: DateRange
): Promise<CountSummary> {
  const response = await axiosInstance.get<
    APIResponse<{ successful_mateches_info: CountSummary }>
  >("/api/v1/admins/user-owner-job-postings/application-success/summaries", {
    params: params,
  });
  return response.data.data.successful_mateches_info;
}

export function useSuccessfulMatchesQuery(params: DateRange) {
  return useQuery({
    queryKey: userOwnerJobPostingsKeys.successSummary(params),
    queryFn: () => getSuccessfulMatches(params),
    staleTime: 1000 * 60 * 10,
  });
}

// 공고 신청 수 조회
export async function getUserOwnerJobPostingApplySummary(
  params: DateRange
): Promise<CountSummary> {
  const response = await axiosInstance.get<
    APIResponse<{ user_owner_job_posting_info: CountSummary }>
  >("/api/v1/admins/user-owner-job-postings/summaries", {
    params: params,
  });
  return response.data.data.user_owner_job_posting_info;
}

export function useUserOwnerJobPostingApplySummaryQuery(params: DateRange) {
  return useQuery({
    queryKey: userOwnerJobPostingsKeys.applySummary(params),
    queryFn: () => getUserOwnerJobPostingApplySummary(params),
    staleTime: 1000 * 60 * 10,
  });
}

// 1. 메모 수정 (PATCH)
export async function patchUserOwnerJobPostingMemo(
  id: string | number,
  data: PatchUserOwnerJobPostingMemoRequest
): Promise<void> {
  await axiosInstance.patch(
    `/api/v1/admins/user-owner-job-postings/${id}/memo`,
    data
  );
}

export function usePatchUserOwnerJobPostingMemoMutation() {
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string | number;
      data: PatchUserOwnerJobPostingMemoRequest;
    }) => patchUserOwnerJobPostingMemo(id, data),
  });
}

// 2. 누적 신청 통계 조회 (GET)
export async function getUserOwnerJobPostingsBriefs(): Promise<GetUserOwnerJobPostingsBriefResponse> {
  const response = await axiosInstance.get<
    APIResponse<{
      apply_info: { count: number };
      accept_per_reject_ratio: { accept: number; reject: number };
    }>
  >("/api/v1/admins/user-owner-job-postings/briefs");
  return response.data.data;
}

export function useUserOwnerJobPostingsBriefsQuery() {
  return useQuery({
    queryKey: userOwnerJobPostingsKeys.briefs(),
    queryFn: getUserOwnerJobPostingsBriefs,
    staleTime: 1000 * 60 * 10,
  });
}
