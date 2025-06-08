import { PageInfo } from "@apis/common";

export type ApplicationStep =
  | "RESUME_UNDER_REVIEW"
  | "WAITING_FOR_INTERVIEW"
  | "FILLING_OUT_DOCUMENTS"
  | "DOCUMENT_UNDER_REVIEW"
  | "APPLICATION_IN_PROGRESS"
  | "APPLICATION_SUCCESS"
  | "APPLICATION_REJECTED"
  | "RESUME_REJECTED"
  | "PENDING"
  | "REGISTRATION_RESULTS";

export interface GetUserOwnerJobPostingsParams {
  page: number;
  size: number;
  search?: string;
  start_date?: string; // yyyy-MM-dd
  end_date?: string;
  filter_type?: "step";
  filter?: ApplicationStep;
  sort_type?: "application_date" | "end_date";
  sort?: "ASC" | "DESC";
}

export interface UserOwnerJobPostingItem {
  user_owner_job_posting_id: number;
  job_posting_id: number;
  title: string;
  step: ApplicationStep;
  serial_id: string;
  name: string;
  application_date: string;
  end_date?: string;
  memo?: string;
}

export interface GetUserOwnerJobPostingsResponse {
  user_owner_job_postings: UserOwnerJobPostingItem[];
  page_info: PageInfo;
}

export interface CountSummary {
  count: number;
  prior_period_count: number;
  prior_period_comparison: number;
}

// 메모, 누적 신청

export interface PatchUserOwnerJobPostingMemoRequest {
  memo: string | null;
}

export interface GetUserOwnerJobPostingsBriefResponse {
  apply_info: {
    count: number;
  };
  accept_per_reject_ratio: {
    accept: number;
    reject: number;
  };
}
