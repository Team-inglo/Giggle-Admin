// 커리어 카테고리
export type CareerCategory = "ACTIVITY" | "PROGRAM" | "CONTEST" | "CLUB";

// 비자 타입
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

// 학력 타입
export type EducationLevel = "BACHELOR" | "ASSOCIATE" | "HIGHSCHOOL";

// 정렬 방식
export type CareerSorting = "POPULAR" | "RECENT";

// 커리어 상태
export type CareerStatus = "PRE_RECRUTMENT" | "RECRUITING" | "CLOSED";

/** 
 커리어 추가 Request 인터페이스 
 **/
export interface CreateCareerRequest {
  title: string;
  career_category?: CareerCategory;
  host_name?: string;
  organizer_name?: string;
  address?: string;
  recruitment_start_date?: string;
  recruitment_end_date?: string;
  reward?: number;
  visa?: VisaType[];
  recruitment_number?: number;
  education: EducationLevel;
  preferred_conditions?: string;
  details?: string;
  application_url: string;
  image: File[]; // formData로 처리됨
}

/** 
 커리어 리스트 조회 Request 인터페이스 
 **/
export interface GetCareerListParams {
  page?: number;
  size?: number;
  search?: string;
  sorting?: string;
  category?: string;
}
/** 
 커리어 리스트 Response 인터페이스 
 **/
export interface CareerListItem {
  id: number;
  title: string;
  career_category: CareerCategory;
  visa: VisaType[];
  host_name: string;
  organizer_name: string;
  left_days: string;
  status: CareerStatus;
  recruitment_start_date: string;
  recruitment_end_date: string;
  created_at: string;
}

export interface GetCareerListResponse {
  carrer_list: CareerListItem[];
  has_next: boolean;
}

/** 
 커리어 상세 조회 Respones 인터페이스 
 **/
export interface CareerDetail {
  img_urls: string[] | null;
  title: string;
  carrer_category?: CareerCategory;
  host_name?: string;
  organizer_name?: string;
  address?: string;
  recruitment_start_date?: string;
  recruitment_end_date?: string;
  reward?: number;
  visa?: VisaType[];
  recruitment_number?: number;
  education: EducationLevel;
  preferred_conditions?: string;
  details?: string;
  application_url: string;
}
