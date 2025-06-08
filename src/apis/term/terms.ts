import { axiosInstance } from "@apis/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { CreateTermRequest } from "@apis/term/terms.d";

/**
 * 약관 생성 (POST)
 */
export async function createTerm(data: CreateTermRequest): Promise<void> {
  await axiosInstance.post("/api/v1/admins/terms", data);
}

export function useCreateTermMutation() {
  return useMutation({
    mutationFn: createTerm,
  });
}
