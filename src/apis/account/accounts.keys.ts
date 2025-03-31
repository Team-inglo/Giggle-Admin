
// reissue
export const authKeys = {
    all: ['auth'] as const,
    me: () => [...authKeys.all, 'me'] as const,          // 사용자 정보
    reissue: () => [...authKeys.all, 'reissue'] as const, // 토큰 재발급
  };

// 회원 목록 조회
export const accountsKeys = {
  all: ['accounts'] as const,
  list: (params: any) => [...accountsKeys.all, params] as const,
};