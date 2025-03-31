import React from 'react'
import {
    CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilChart, cilList } from '@coreui/icons'

// 더미 데이터 (백엔드 연동 시 이 부분을 대체)
const applicationTableData = [
    { month: '2024/12', total: 0, accepted: 0, rejected: 0, matched: 0 },
    { month: '2024/11', total: 0, accepted: 0, rejected: 0, matched: 0 },
    { month: '2024/10', total: 0, accepted: 0, rejected: 0, matched: 0 },
    { month: '2024/09', total: 0, accepted: 0, rejected: 0, matched: 0 },
    { month: '2024/08', total: 0, accepted: 0, rejected: 0, matched: 0 },
    { month: '2024/07', total: 0, accepted: 0, rejected: 0, matched: 0 },
  ]

const AnnouncementStats = () => {
  return (
    <>
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <strong>공고 신청관리</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={6}>
                <CCard>
                  <CCardHeader>
                    <CIcon icon={cilChart} className="me-2" />
                    신규신청관리
                  </CCardHeader>
                  <CCardBody>
                    {/* 차트 삽입 또는 컴포넌트 */}
                    <p>그래프 또는 차트 컴포넌트 들어갈 자리</p>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol md={6}>
                <CCard>
                  <CCardHeader>
                    <CIcon icon={cilList} className="me-2" />
                    신청표
                  </CCardHeader>
                  <CCardBody>
                    {/* 신청 데이터 테이블 등 삽입 */}
                    
                    <CTable hover responsive>
  <CTableHead>
    <CTableRow>
      <CTableHeaderCell scope="col">해당 월</CTableHeaderCell>
      <CTableHeaderCell scope="col">총 신청 수</CTableHeaderCell>
      <CTableHeaderCell scope="col">이력서 수락</CTableHeaderCell>
      <CTableHeaderCell scope="col">이력서 미수락</CTableHeaderCell>
      <CTableHeaderCell scope="col">매칭 성공 수</CTableHeaderCell>
    </CTableRow>
  </CTableHead>
  <CTableBody>
    {applicationTableData.map((item, index) => (
      <CTableRow key={index}>
        <CTableHeaderCell scope="row">{item.month}</CTableHeaderCell>
        <CTableDataCell>{item.total}</CTableDataCell>
        <CTableDataCell>{item.accepted}</CTableDataCell>
        <CTableDataCell>{item.rejected}</CTableDataCell>
        <CTableDataCell>
          <CBadge color="success">{item.matched}</CBadge>
        </CTableDataCell>
      </CTableRow>
    ))}
  </CTableBody>
</CTable>


                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </>
  )
}

export default AnnouncementStats