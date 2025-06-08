import React from "react";
import UserManagement from "@views/user/UserManagement";
import BannerManagement from "@views/banner/BannerManagement";
import Login from "@pages/login/Login";
import BannerEditor from "@views/banner/BannerEditor";
import SchoolManagement from "@views/school/SchoolManagement";
import SchoolEditor from "@views/school/SchoolEditor";
import CareerEditor from "@views/career/CareerEditor";
import CareerManagement from "@views/career/CareerManagement";
import NotificationManagement from "@views/notification/NotificationManagement";
import NotificationEditor from "@views/notification/NotificationEditor";
import JobPostingManagement from "@views/jobposting/JobPostingManagement";
import AnnouncementStats from "@views/announcement/AnnouncementStats";
import TermManagement from "@views/term/TermManagement";
import TermEditor from "@views/term/TermEditor";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

const routes = [
  { path: "/", exact: true, name: "홈" },
  { path: "/login", name: "로그인", element: Login },
  /* 대시보드 */
  { path: "/dashboard", name: "대시보드", element: Dashboard },

  /* 공고 신청 */
  {
    path: "/announcement-stats",
    name: "신청통계",
    element: AnnouncementStats,
    exact: true,
  },

  /* 공고 */
  {
    path: "/job-posting-management",
    name: "공고관리",
    element: JobPostingManagement,
    exact: true,
  },

  /* 커리어 */
  {
    path: "/career-management",
    name: "커리어관리",
    element: CareerManagement,
    exact: true,
  },
  {
    path: "/career-create",
    name: "커리어생성",
    element: CareerEditor,
    exact: true,
  },
  {
    path: "/career-editor/:id",
    name: "커리어수정",
    element: CareerEditor,
    exact: true,
  },

  /* 회원 */
  {
    path: "/user-management",
    name: "회원관리",
    element: UserManagement,
    exact: true,
  },

  /* 배너/팝업 */
  {
    path: "/banner-management",
    name: "배너관리",
    element: BannerManagement,
    exact: true,
  },
  {
    path: "/banner-create",
    name: "배너생성",
    element: BannerEditor,
    exact: true,
  },
  {
    path: "/banner-editor/:id",
    name: "배너수정",
    element: BannerEditor,
    exact: true,
  },

  /* 알림 */
  {
    path: "/notification-management",
    name: "알림관리",
    element: NotificationManagement,
    exact: true,
  },
  {
    path: "/notification-create",
    name: "알림생성",
    element: NotificationEditor,
    exact: true,
  },

  /* 알림 */
  {
    path: "/terms-management",
    name: "약관관리",
    element: TermManagement,
    exact: true,
  },
  { path: "/terms-create", name: "약관생성", element: TermEditor, exact: true },

  /* 학교 */
  {
    path: "/school-management",
    name: "학교관리",
    element: SchoolManagement,
    exact: true,
  },
  {
    path: "/school-create",
    name: "학교생성",
    element: SchoolEditor,
    exact: true,
  },
  {
    path: "/school-editor/:id",
    name: "학교수정",
    element: SchoolEditor,
    exact: true,
  },
];

export default routes;
