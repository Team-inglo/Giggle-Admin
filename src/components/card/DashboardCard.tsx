import {
    CBadge,
    CCard,
    CCardBody,
    CCardTitle,
    CCol,
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'
  import {
    cilArrowThickTop
  } from '@coreui/icons'

export default function DashboardCard({index, title, total_value, a_name, a_value, b_name, b_value}) {
  return (
    <>
                    <CCol key={index} xs={12} sm={6}>
                      <CCard className="h-100">
                        <CCardBody>
                          <CCardTitle className="fw-semibold">{title}</CCardTitle>
                          <CCardTitle className="fw-bold mt-2">{total_value}</CCardTitle>
    
                          <div className="mt-3">
                            <div className="d-flex justify-content-between align-items-center">
                              <span className="text-body-secondary small">{a_name}</span>
                              <CBadge color="secondary" className="px-2">{a_value}</CBadge>
                            </div>
    
                            <div className="d-flex justify-content-between align-items-center mt-1">
                              <span className="text-body-secondary small">{b_name}</span>
                              <span className="text-danger small">
                                <CIcon icon={cilArrowThickTop} className="me-1" />
                                {b_value}
                              </span>
                            </div>
                          </div>
                        </CCardBody>
                      </CCard>
                    </CCol>
    </>
  )
}
