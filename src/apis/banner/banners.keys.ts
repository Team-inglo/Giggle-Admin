// 배너 목록 조회
export const bannersKeys = {
  all: ["banners"] as const,
  list: (params: any) => [...bannersKeys.all, params] as const,
};

export const bannerDetailKeys = {
  all: ["bannerDetail"] as const,
  detail: (id: string) => [...bannerDetailKeys.all, id] as const,
};
