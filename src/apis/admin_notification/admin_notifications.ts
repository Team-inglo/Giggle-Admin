import {
  CreateAdminNotificationRequest,
  GetAdminNotificationsParams,
  GetAdminNotificationsResponse,
} from "@apis/admin_notification/admin_notifications.d";
import { axiosInstance } from "@apis/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { APIResponse } from "@apis/common";

/**
 * 어드민 알림 생성 (POST)
 */
export async function createAdminNotification(
  data: CreateAdminNotificationRequest
): Promise<void> {
  await axiosInstance.post("/api/v1/admins/admin-notifications", data);
}

export function useCreateAdminNotificationMutation() {
  return useMutation({
    mutationFn: createAdminNotification,
  });
}

/**
 * 어드민 알림 목록 조회 (GET)
 */
export async function getAdminNotifications(
  params: GetAdminNotificationsParams
): Promise<GetAdminNotificationsResponse> {
  const response = await axiosInstance.get<
    APIResponse<GetAdminNotificationsResponse>
  >("/api/v1/admins/admin-notifications/overviews", {
    params,
  });
  return response.data.data;
}

export function useAdminNotificationsQuery(
  params: GetAdminNotificationsParams
) {
  return useQuery({
    queryKey: ["adminNotifications", params],
    queryFn: () => getAdminNotifications(params),
    staleTime: 1000 * 60 * 5,
  });
}
