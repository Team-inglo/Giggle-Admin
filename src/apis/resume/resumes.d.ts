export type VisaCode =
  | "D_2_1"
  | "D_2_2"
  | "D_2_3"
  | "D_2_4"
  | "D_2_6"
  | "D_2_7"
  | "D_2_8"
  | "D_4_1"
  | "D_4_7"
  | "F_2";

export type Gender = "MALE" | "FEMALE" | "NONE";

export type EducationLevel =
  | "BACHELOR"
  | "ASSOCIATE"
  | "HIGHSCHOOL"
  | "MASTER"
  | "DOCTOR";

export interface VisaInfo {
  visa: VisaCode;
  description: string;
}

export interface PersonalInformation {
  gender: Gender;
  nationality?: string;
  birth?: string; // yyyy.MM.dd
  main_address?: string;
  detailed_address?: string;
  phone_number: string;
  email: string;
}

export interface WorkExperience {
  id: number;
  title: string;
  workplace: string;
  description: string;
  start_date: string; // yyyy-MM-dd
  end_date?: string;
  duration: number; // 일 기준
}

export interface Education {
  id: number;
  education_level: EducationLevel;
  school_name: string;
  major: string;
  start_date: string;
  end_date: string;
  grade: number;
}

export interface LanguageEtc {
  id: number;
  laguage_name: string;
  level: number;
}

export interface LanguageInfo {
  topik: number;
  social_integration: number;
  sejong_institute: number;
  etc?: LanguageEtc[];
}

export interface ResumeDetail {
  profile_img_url: string;
  name: string;
  visa: VisaInfo;
  personal_information: PersonalInformation;
  introduction?: string;
  work_experience?: WorkExperience[];
  education?: Education[];
  languages: LanguageInfo;
}
