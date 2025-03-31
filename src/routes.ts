import React from 'react'
import UserManagement from '@views/user/UserManagement'
import BannerManagement from '@views/banner/BannerManagement'
import Login from '@pages/login/Login'
import BannerEditor from '@views/banner/BannerEditor'
import SchoolManagement from '@views/school/SchoolManagement'
import SchoolEditor from '@views/school/SchoolEditor'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const routes = [
  { path: '/', exact: true, name: '홈' },
  { path: '/login', name: '대시보드', element: Login },
  { path: '/dashboard', name: '대시보드', element: Dashboard },
  
  { path: '/user-management', name: '회원관리', element: UserManagement, exact: true },

  { path: '/banner-management', name: '배너관리', element: BannerManagement, exact: true },
  { path: '/banner-create', name: '배너생성', element: BannerEditor, exact: true },
  { path: '/banner-editor/:id', name: '배너수정', element: BannerEditor, exact: true },
  
  { path: '/school-management', name: '학교관리', element: SchoolManagement, exact: true },
  { path: '/school-create', name: '학교생성', element: SchoolEditor, exact: true },
  { path: '/school-editor/:id', name: '학교수정', element: SchoolEditor, exact: true },
]

export default routes
