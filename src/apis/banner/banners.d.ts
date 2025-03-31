// 배너 목록 조회
export interface GetBannersParams {
    page?: number;
    size?: number;
    keyword?: string; // 예: 검색어 (optional)
}

export interface Banner {
    id: string;
    title: string;
    role: "GUEST" | "USER" | "OWNER";
    registered_at: string;
    img_url: string;
  }

  export interface PageInfo {
    current_page: number;
    current_items: number;
    page_size: number;
    total_pages: number;
    total_items: number;
  }
  
  export interface GetBannersResponse {
    banners: Banner[];
    page_info: PageInfo;
  }

  export interface BannerDetail {
    id: string;
    title: string;
    role: "GUEST" | "USER" | "OWNER";
    img_url: string;
    content: string;
  }

// 배너 생성, 수정, 삭제
// 배너 역할 Enum
export type BannerRole = 'USER' | 'OWNER' | 'GUEST';

// 배너 공통 필드
export interface BannerBase {
  title: string;
  content: string;
  role: BannerRole;
}

// 생성 요청 (image는 필수)
export interface CreateBannerRequest extends BannerBase {
  image: File;
}

// 수정 요청 (image는 선택)
export interface EditBannerRequest extends BannerBase {
  id: number;
  image?: File | null;
}