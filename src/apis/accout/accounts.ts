import { APIResponse } from "@apis/common";
import { ReissueTokenRequest, ReissueTokenResponse } from "@apis/account/accounts.d";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@apis/axiosInstance";
import { authKeys } from "@/api/account/accounts.keys";

/* reissue (POST)
  토큰 재발급 API
*/
async function postReissueToken(data: ReissueTokenRequest): Promise<ReissueTokenResponse> {
  const response = await axiosInstance.post<APIResponse<ReissueTokenResponse>>(
    "/accounts/reissue",
    data
  );
  return response.data.data;
}

export function useReissueTokenMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: ReissueTokenRequest) => postReissueToken(data),
    onSuccess: (newData) => {
      // 성공 시, 필요하다면 관련 캐시 갱신
      queryClient.setQueryData(authKeys.reissue(), newData);
    },
    onError: (error) => {
      // 에러 핸들링 (예: 로그아웃 처리, 토스트 알림 등)
      console.error("Reissue token failed", error);
    },
  });

  return { reissueTokenMutation: mutation };
}