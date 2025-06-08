import { PageInfo } from "@apis/common";

export type JobCategory =
  | "GENERAL_INTERPRETATION_TRANSLATION"
  | "FOOD_SERVICE_ASSISTANT"
  | "GENERAL_ADMINISTRATIVE_SUPPORT"
  | "ENGLISH_KIDS_CAFE"
  | "GENERAL_CAFE"
  | "PART_TIME_WORK"
  | "TOUR_GUIDE_AND_DUTY_FREE_ASSISTANT"
  | "MANUFACTURING";

export type DayOfWeek =
  | "WEEKDAYS"
  | "WEEKEND"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY"
  | "NEGOTIABLE";

export type EmploymentType = "PARTTIME" | "INTERNSHIP";

export type Gender = "MALE" | "FEMALE" | "NONE";

export type EducationLevel = "BACHELOR" | "ASSOCIATE" | "HIGHSCHOOL";

export type VisaType =
  | "D_2_1"
  | "D_2_2"
  | "D_2_3"
  | "D_2_4"
  | "D_2_6"
  | "D_2_7"
  | "D_2_8"
  | "D_4_1"
  | "D_4_7"
  | "D_2"
  | "D_4"
  | "D_10"
  | "C_4"
  | "F_2"
  | "F_4"
  | "F_5"
  | "F_6"
  | "H_1";

// 목록 조회 파라미터
export interface GetJobPostingsParams {
  page: number;
  size: number;
  search?: string;
  start_date?: string;
  end_date?: string;
  filter_type?:
    | "job_category"
    | "employment_type"
    | "gender"
    | "education_level"
    | "visa";
  filter?: string;
  sort_type?:
    | "hourly_rate"
    | "recruitment_dead_line"
    | "age_restriction"
    | "registration_date";
  sort?: "ASC" | "DESC";
}

// 요일/시간 정보
export interface WorkDayTime {
  day_of_week: DayOfWeek;
  work_start_time?: string; // HH:mm
  work_end_time?: string; // HH:mm
}

// 공고 항목
export interface JobPostingItem {
  job_posting_id: number;
  title: string;
  job_category: JobCategory;
  work_day_times: WorkDayTime[];
  hourly_rate: number;
  employment_type: EmploymentType;
  address: string;
  recruitment_dead_line?: string;
  recruitment_number?: number;
  gender: Gender;
  age_restriction?: number;
  education_level: EducationLevel;
  visa: VisaType[];
  registration_date: string;
}

// 공고 리스트 응답
export interface GetJobPostingsResponse {
  job_postings: JobPostingItem[];
  page_info: PageInfo;
}

// 등록 수 요약 응답
export interface JobPostingRegistrationSummary {
  count: number;
  prior_period_count: number;
  prior_period_comparison: number;
}
