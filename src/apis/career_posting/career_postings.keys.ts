/** 
 커리어 리스트 조회 keys
 **/
export const careerKeys = {
  all: ["careers"] as const,
  list: (params: any) => [...careerKeys.all, params] as const,
};

/** 
 커리어 상세 조회 keys
 **/
export const careerDetailKeys = {
  all: ["careerDetail"] as const,
  detail: (id: number | string) => [...careerDetailKeys.all, id] as const,
};
