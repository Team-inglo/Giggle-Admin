// 학교 목록 조회
export interface GetSchoolsParams {
    page?: number;
    size?: number;
    keyword?: string; // 예: 검색어 (optional)
}

export interface School {
    id: string;
    school_name: string;
    school_phone_number: string;
    institute_name: string;
    coordinator_name: string;
    coordinator_phone_number: string;
    address_detail: string;
  }

  export interface PageInfo {
    current_page: number;
    current_items: number;
    page_size: number;
    total_pages: number;
    total_items: number;
  }

  export interface GetSchoolsResponse {
    accounts: School[];
    page_info: PageInfo;
  }

// 학교 상세 조회
export interface AddressResponse {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    region_4depth_name?: string; // optional
    address_detail: string;
    longitude: number;
    latitude: number;
  }
  
  export interface SchoolDetail {
    id: string;
    school_name: string;
    school_phone_number: string;
    is_metropolitan: boolean;
    institute_name: string;
    coordinator_name: string;
    coordinator_phone_number: string;
    address: AddressResponse;
  }

// 학교 생성/수정
export interface AddressRequest {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    region_4depth_name?: string; // 선택적 필드
    address_detail: string;
    longitude: number;
    latitude: number;
  }
  
  export interface SchoolRequest {
    school_name: string;
    school_phone_number: string;
    is_metropolitan: boolean;
    institute_name: string;
    coordinator_name: string;
    coordinator_phone_number: string;
    address: AddressRequest;
  }
  