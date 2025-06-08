import { APIResponse, DateRange } from "@apis/common";
import axios from "axios";
import {
  LoginRequest,
  LoginResponse,
  ReissueTokenResponse,
  GetAccountsParams,
  GetAccountsResponse,
  GetSignUpSummaryResponse,
  GetWithdrawalSummaryResponse,
} from "@apis/account/accounts.d";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@apis/axiosInstance";
import { statisticsKeys } from "@apis/account/accounts.keys";
import { getRefreshToken } from "@utils/tokenUtil";

/* login (POST)
  로그인 API
*/
export async function postLogin(data: LoginRequest): Promise<LoginResponse> {
  const formData = new FormData();
  formData.append("serial_id", data.serial_id);
  formData.append("password", data.password);

  const response = await axiosInstance.post<APIResponse<LoginResponse>>(
    "/api/v1/auth/login",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.data;
}

export function useLoginMutation() {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: postLogin,
  });
}

/* login (POST)
  로그아웃 API
*/
export async function postLogout(): Promise<void> {
  await axiosInstance.post("/api/v1/auth/logout", null, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function useLogoutMutation() {
  return useMutation<void, Error>({
    mutationFn: postLogout,
  });
}

/* reissue (POST)
  토큰 재발급 API
*/
export async function postReissueToken(): Promise<ReissueTokenResponse> {
  const response = await axios.post<APIResponse<ReissueTokenResponse>>(
    "/api/v1/auth/reissue/token",
    {
      headers: {
        Authorization: `Bearer ${getRefreshToken()}`,
      },
    }
  );
  return response.data.data;
}

/*
  회원 목록 조회 API (GET)
 */
export async function getAccounts(
  params: GetAccountsParams
): Promise<GetAccountsResponse> {
  const response = await axiosInstance.get<APIResponse<GetAccountsResponse>>(
    "/api/v1/admins/accounts/overviews",
    {
      params,
    }
  );
  return response.data.data;
}

export function useAccountsQuery(params: GetAccountsParams) {
  return useQuery({
    queryKey: ["accounts", params], // params에 따라 캐시가 분리됨
    queryFn: () => getAccounts(params),
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
  });
}

/**
 * 신규 신청 통계 조회 API (GET)
 */
export async function getSignUpSummary(
  params: DateRange
): Promise<GetSignUpSummaryResponse> {
  const response = await axiosInstance.get<
    APIResponse<GetSignUpSummaryResponse>
  >("/api/v1/admins/accounts/sign-up/summaries", { params });
  return response.data.data;
}

export function useSignUpSummaryQuery(params: DateRange) {
  return useQuery({
    queryKey: statisticsKeys.signUp(params),
    queryFn: () => getSignUpSummary(params),
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * 탈퇴 신청 통계 조회 API (GET)
 */
export async function getWithdrawalSummary(
  params: DateRange
): Promise<GetWithdrawalSummaryResponse> {
  const response = await axiosInstance.get<
    APIResponse<GetWithdrawalSummaryResponse>
  >("/api/v1/admins/accounts/withdrawal/summaries", { params });
  return response.data.data;
}

export function useWithdrawalSummaryQuery(params: DateRange) {
  return useQuery({
    queryKey: statisticsKeys.withdrawal(params),
    queryFn: () => getWithdrawalSummary(params),
    staleTime: 1000 * 60 * 5,
  });
}
