import { APIResponse } from "@apis/common";
import {
  GetBannersParams,
  GetBannersResponse,
  GetBannerDetail,
  BannerBase,
  CreateBannerRequest,
  EditBannerRequest,
} from "@apis/banner/banners.d";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@apis/axiosInstance";

/*
  배너 목록 조회 API (GET)
 */
export async function getBanners(
  params: GetBannersParams
): Promise<GetBannersResponse> {
  const response = await axiosInstance.get<APIResponse<GetBannersResponse>>(
    "/api/v1/admins/banners/overviews",
    {
      params,
    }
  );
  return response.data.data;
}

export function useBannersQuery(params: GetBannersParams) {
  return useQuery({
    queryKey: ["banners", params], // params에 따라 캐시가 분리됨
    queryFn: () => getBanners(params),
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
  });
}

/*
  배너 상세 조회 API (GET)
 */
export async function getBannerDetail(id: string): Promise<GetBannerDetail> {
  const response = await axiosInstance.get<APIResponse<GetBannerDetail>>(
    `/api/v1/admins/banners/${id}/details`
  );
  return response.data.data;
}

export function useBannerDetailQuery(id: string, enabled = true) {
  return useQuery({
    queryKey: ["bannerDetail", id],
    queryFn: () => getBannerDetail(id),
    enabled,
    staleTime: 1000 * 60 * 5,
  });
}

// 공통 form data
export const makeBannerFormData = ({
  title,
  content,
  role,
  image,
}: BannerBase & { image?: File | null }) => {
  const formData = new FormData();

  // JSON 객체를 Blob으로 감싸서 "body" 파트로 추가
  const jsonBlob = new Blob([JSON.stringify({ title, content, role })], {
    type: "application/json",
  });
  formData.append("body", jsonBlob);

  // 이미지가 있을 경우 같이 첨부
  if (image) {
    formData.append("image", image);
  }

  return formData;
};

// 배너 생성
export async function createBanner(data: CreateBannerRequest): Promise<void> {
  const formData = makeBannerFormData(data);
  await axiosInstance.post("/api/v1/admins/banners", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function useCreateBannerMutation() {
  return useMutation({
    mutationFn: createBanner,
  });
}

// 배너 수정
export async function editBanner(data: EditBannerRequest): Promise<void> {
  const { id, ...rest } = data;
  const formData = makeBannerFormData(rest);
  await axiosInstance.put(`/api/v1/admins/banners/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function useEditBannerMutation() {
  return useMutation({
    mutationFn: editBanner,
  });
}

// 배너 제거
export async function deleteBanner(id: number): Promise<void> {
  await axiosInstance.delete(`/api/v1/admins/banners/${id}`);
}

export function useDeleteBannerMutation() {
  return useMutation({
    mutationFn: deleteBanner,
  });
}
