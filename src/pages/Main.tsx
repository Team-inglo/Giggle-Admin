import AppSidebar from '@components/AppSidebar'
import AppHeader from '@components/AppHeader'
import AppFooter from '@components/AppFooter'
import AppContent from '@components/AppContent'
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Main() {
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
