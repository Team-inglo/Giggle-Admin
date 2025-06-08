import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@apis/axiosInstance";
import type {
  GetSchoolsParams,
  SchoolRequest,
  SchoolDetail,
  GetSchoolsResponse,
} from "@api/school/schools.d";
import { APIResponse } from "@apis/common";

// -------------------- 목록 조회 --------------------
export async function getSchools(
  params: GetSchoolsParams
): Promise<GetSchoolsResponse> {
  const response = await axiosInstance.get<APIResponse<GetSchoolsResponse>>(
    "/api/v1/admins/schools/overviews",
    { params }
  );
  return response.data.data;
}

export function useSchoolsQuery(params: GetSchoolsParams) {
  return useQuery({
    queryKey: ["schools", params],
    queryFn: () => getSchools(params),
    staleTime: 1000 * 60 * 5,
  });
}

// -------------------- 상세 조회 --------------------
export async function getSchoolDetail(id: string): Promise<SchoolDetail> {
  const response = await axiosInstance.get<APIResponse<SchoolDetail>>(
    `/api/v1/admins/schools/${id}/details`
  );
  return response.data.data;
}

export function useSchoolDetailQuery(id: string) {
  return useQuery({
    queryKey: ["schoolDetail", id],
    queryFn: () => getSchoolDetail(id),
    staleTime: 1000 * 60 * 5,
  });
}

// -------------------- 생성 --------------------
export async function createSchool(data: SchoolRequest): Promise<void> {
  await axiosInstance.post("/api/v1/admins/schools", data);
}

export function useCreateSchoolMutation() {
  return useMutation({
    mutationFn: createSchool,
  });
}

// -------------------- 수정 --------------------
export async function editSchool(
  id: number,
  data: SchoolRequest
): Promise<void> {
  await axiosInstance.put(`/api/v1/admins/schools/${id}`, data);
}

export function useEditSchoolMutation() {
  return useMutation({
    mutationFn: ({ id, ...data }: { id: number } & SchoolRequest) =>
      editSchool(id, data),
  });
}

// -------------------- 삭제 --------------------
export async function deleteSchool(id: number): Promise<void> {
  await axiosInstance.delete(`/api/v1/admins/schools/${id}`);
}

export function useDeleteSchoolMutation() {
  return useMutation({
    mutationFn: deleteSchool,
  });
}
