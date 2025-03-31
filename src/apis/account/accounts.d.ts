// accounts.d.ts

// 로그인
export interface LoginRequest {
  serial_id: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}


// 토큰 재발급
export interface ReissueTokenRequest {
    access_token: string;
}

export interface ReissueTokenResponse {
    access_token: string;
    refresh_token: string;
}
  
// 회원 목록 조회
export interface GetAccountsParams {
    page?: number;
    size?: number;
    keyword?: string; // 예: 검색어 (optional)
}

export interface Account {
    id: string;
    email: string;
    user_type: "USER" | "OWNER";
    name: string;
    birth: string;
    gender: "MALE" | "FEMALE" | "NONE";
    nationality: string;
    address: string;
    visa: "D_2_1" | "D_2_2" | "D_2_3" | "D_2_4" | "D_2_6" | "D_2_7" | "D_2_8" | "D_4_1" | "D_4_7" | "F_2";
    phone_number: string;
    language: string;
    sign_up_date: string;
  }

  export interface PageInfo {
    current_page: number;
    current_items: number;
    page_size: number;
    total_pages: number;
    total_items: number;
  }
  
  export interface GetAccountsResponse {
    accounts: Account[];
    page_info: PageInfo;
  }