// default response type
export interface ErrorResponse {
  code: string;
  message: string;
}

export interface APIResponse<T> {
  success: boolean;
  data: T | null; // 데이터가 없을 경우 null을 처리
  error: ErrorResponse | null; // 에러가 있을 경우, 에러 정보 포함 (없으면 null)
}

/**
 * 페이지 정보 인터페이스
 */
export interface PageInfo {
  current_page: number;
  current_items: number;
  page_size: number;
  total_pages: number;
  total_items: number;
}

/**
 * startDate와 endDate를 포함하는 인터페이스
 */
export interface DateRange {
  start_date: string;
  end_date: string;
}
