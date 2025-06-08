import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@apis/axiosInstance";
import { APIResponse } from "@apis/common";
import { ResumeDetail } from "apis/resume/resumes.d";
import { resumeKeys } from "@apis/resume/resumes.keys";

export async function getResumeDetail(
  id: string | number
): Promise<ResumeDetail> {
  const response = await axiosInstance.get<APIResponse<ResumeDetail>>(
    `/api/v1/admins/resumes/${id}/details`
  );
  return response.data.data;
}

export function useResumeDetailQuery(id: string | number) {
  return useQuery({
    queryKey: resumeKeys.detail(id),
    queryFn: () => getResumeDetail(id),
    staleTime: 1000 * 60 * 5,
  });
}
