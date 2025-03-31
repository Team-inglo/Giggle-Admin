import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useNavigate } from 'react-router-dom'
import { getAccessToken, getRefreshToken } from '../utils/tokenUtil';

const DefaultLayout = () => {
  const navigate = useNavigate();
  const isLoggedIn = getAccessToken();

  useEffect(() => {
    if (!getAccessToken()) {
      navigate('/login')
    }
  }, [isLoggedIn, navigate])

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
