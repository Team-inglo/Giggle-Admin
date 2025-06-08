// 커리어 추가
import {
  CreateCareerRequest,
  GetCareerListParams,
  GetCareerListResponse,
  CareerDetail,
} from "@apis/career_posting/career_postings.d";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@apis/axiosInstance";
import { APIResponse } from "@apis/common";

// FormData 생성 유틸
const makeCareerFormData = (data: CreateCareerRequest) => {
  const { image, ...body } = data;

  const formData = new FormData();

  // body는 JSON으로 Blob 변환 후 append
  const jsonBlob = new Blob([JSON.stringify(body)], {
    type: "application/json",
  });
  formData.append("body", jsonBlob);

  // 이미지 배열 처리
  image.forEach((file) => {
    formData.append("image", file);
  });

  return formData;
};

/*
  커리어 추가 (POST)
*/
export async function createCareer(data: CreateCareerRequest): Promise<void> {
  const formData = makeCareerFormData(data);
  await axiosInstance.post("/api/v1/admins/careers", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function useCreateCareerMutation() {
  return useMutation({
    mutationFn: createCareer,
  });
}

/*
  커리어 수정 (PUT)
*/
export async function updateCareer({
  data,
  id,
}: {
  data: CreateCareerRequest;
  id: string;
}): Promise<void> {
  const formData = makeCareerFormData(data);
  await axiosInstance.put(`/api/v1/admins/careers/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

// useMutation 그대로 사용
export function useUpdateCareerMutation() {
  return useMutation({
    mutationFn: updateCareer,
  });
}

/*
  커리어 리스트 조회 (GET)
*/
export async function getCareers(
  params: GetCareerListParams
): Promise<GetCareerListResponse> {
  const response = await axiosInstance.get<APIResponse<GetCareerListResponse>>(
    "/api/v1/admins/careers/overviews",
    {
      params: {
        ...params,
      },
    }
  );
  return response.data.data;
}

export function useCareerListQuery(params: GetCareerListParams) {
  return useQuery({
    queryKey: ["careers", params],
    queryFn: () => getCareers(params),
    staleTime: 1000 * 60 * 5,
  });
}

/*
  커리어 상세 조회 (GET)
*/
export async function getCareerDetail(
  id: number | string
): Promise<CareerDetail> {
  const response = await axiosInstance.get<APIResponse<CareerDetail>>(
    `/api/v1/admins/careers/${id}/details`
  );
  return response.data.data;
}

export function useCareerDetailQuery(id: number | string, enabled = true) {
  return useQuery({
    queryKey: ["careerDetail", id],
    queryFn: () => getCareerDetail(id),
    enabled,
    staleTime: 1000 * 60 * 5,
  });
}
