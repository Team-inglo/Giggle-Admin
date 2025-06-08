// 약관 종류 Enum
export type TermType =
  | "PERSONAL_SERVICE_TERMS"
  | "PRIVACY_POLICY"
  | "LOCATION_BASED_TERMS"
  | "ENTERPRISE_SERVICE_TERMS";

/**
 * 약관 추가 Request 인터페이스
 */
export interface CreateTermRequest {
  term_type: TermType;
  version: number;
  content: string;
}
