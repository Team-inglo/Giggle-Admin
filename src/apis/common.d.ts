// default response type
export interface ErrorResponse {
    code: string;
    message: string;
  }
  
export interface APIResponse<T> {
    success: boolean;
    data: T | null;  // 데이터가 없을 경우 null을 처리
    error: ErrorResponse | null;  // 에러가 있을 경우, 에러 정보 포함 (없으면 null)
}