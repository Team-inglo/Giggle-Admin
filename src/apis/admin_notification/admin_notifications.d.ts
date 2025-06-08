import { PageInfo } from "@apis/common";

// 알림 수신 대상 역할
export type AdminNotificationRole = "GUEST" | "USER" | "OWNER";

// 알림 생성 요청
export interface CreateAdminNotificationRequest {
  title: string;
  message: string;
  role: AdminNotificationRole;
  is_advertisment: boolean;
}

// 알림 조회 요청 파라미터
export interface GetAdminNotificationsParams {
  page: number;
  size: number;
  search?: string;
  start_date?: string; // yyyy-MM-dd
  end_date?: string;
  filter_type?: "role";
  filter?: AdminNotificationRole;
  sort_type?: "registered_at";
  sort?: "ASC" | "DSEC";
}

// 알림 단일 항목
export interface AdminNotificationItem {
  id: number;
  title: string;
  message: string;
  role: AdminNotificationRole;
  is_advertisment: boolean;
  registered_at: string;
}

// 알림 리스트 응답
export interface GetAdminNotificationsResponse {
  notifications: AdminNotificationItem[];
  page_info: PageInfo;
}
