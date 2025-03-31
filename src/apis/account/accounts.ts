import { APIResponse } from "@apis/common";
import { LoginRequest, LoginResponse, ReissueTokenRequest, ReissueTokenResponse, GetAccountsParams, GetAccountsResponse } from "@apis/account/accounts.d";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@apis/axiosInstance";

/* login (POST)
  로그인 API
*/
export async function postLogin(data: LoginRequest): Promise<LoginResponse> {
  const formData = new FormData();
  formData.append("serial_id", data.serial_id);
  formData.append("password", data.password);

  const response = await axiosInstance.post<APIResponse<LoginResponse>>("/api/v1/auth/login", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data;
}

export function useLoginMutation() {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: postLogin,
  });
}

/* reissue (POST)
  토큰 재발급 API
*/
export async function postReissueToken(data: ReissueTokenRequest): Promise<ReissueTokenResponse> {
  const response = await axiosInstance.post<APIResponse<ReissueTokenResponse>>(
    "/accounts/reissue",
    data
  );
  return response.data.data;
}

/*
  회원 목록 조회 API (GET)
 */
  export async function getAccounts(params: GetAccountsParams): Promise<GetAccountsResponse> {
    const response = await axiosInstance.get<APIResponse<GetAccountsResponse>>("/api/v1/admins/accounts/overviews", {
      params,
    });
    return response.data.data;
  }

  export function useAccountsQuery(params: GetAccountsParams) {
    return useQuery({
      queryKey: ["accounts", params], // params에 따라 캐시가 분리됨
      queryFn: () => getAccounts(params),
      staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    });
  }