import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCol,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilChartLine,
} from '@coreui/icons'

import MainChart from '@views/dashboard/MainChart'
import StartEndDate from '@components/date/StartEndDate'
import DashboardCard from '@components/card/DashboardCard'

const Dashboard = () => {
  const cardGroupData = [
    {
      title: "신규 회원",
      data: {
        user_sign_up_info: {
          count: 150,
          prior_period_count: 120,
          prior_period_comparison: 25.0
        },
        accumulated_user_sign_up_info: {
          count: 3250,
          prior_period_count: 3100,
          prior_period_comparison: 4.84
        },
        owner_sign_up_info: {
          count: 40,
          prior_period_count: 55,
          prior_period_comparison: -27.27
        },
        accumulated_owner_sign_up_info: {
          count: 875,
          prior_period_count: 850,
          prior_period_comparison: 2.94
        }
      }
    },
    {
      title: "탈퇴 회원",
      data: {
        user_sign_up_info: {
          count: 150,
          prior_period_count: 120,
          prior_period_comparison: 25.0
        },
        accumulated_user_sign_up_info: {
          count: 3250,
          prior_period_count: 3100,
          prior_period_comparison: 4.84
        },
        owner_sign_up_info: {
          count: 40,
          prior_period_count: 55,
          prior_period_comparison: -27.27
        },
        accumulated_owner_sign_up_info: {
          count: 875,
          prior_period_count: 850,
          prior_period_comparison: 2.94
        }
      }
    },
  ];

  return (
    <>
     {/* 상단 타이틀 */}
     <CRow>
  {cardGroupData.map((group, groupIndex) => (
    <CCol key={groupIndex} xs={12} xl={6}>
      <CCard className="mb-4">
        <CRow className="mb-3">
          <CCol className="d-flex align-items-center gap-2">
            <CIcon icon={cilChartLine} size="lg" />
            <h5 className="mb-0 fw-semibold">{group.title}</h5>
          </CCol>

          {/* 기간 선택 */}
          <StartEndDate
            groupIndex={groupIndex}
            startDate="2025-01-28"
            endDate="2025-01-28"
          />
        </CRow>

        {/* 카드 4개 */}
        <CRow className="g-4">
            <DashboardCard
              key={1}
              index={1}
              title={group.title}
              total_value={group.data?.accumulated_owner_sign_up_info.count}
              a_name={group.data?.accumulated_owner_sign_up_info.count}
              a_value={group.data?.accumulated_owner_sign_up_info.count}
              b_name={group.data?.accumulated_owner_sign_up_info.count}
              b_value={group.data?.accumulated_owner_sign_up_info.count}
            />
        </CRow>
      </CCard>
    </CCol>
  ))}
</CRow>

{/* chart 영역 */}
<CRow>
  {/* 첫 번째 차트 */}
  <CCol xs={12} xl={6}>
    <CCard className="mb-4">
      <CCardBody>
        <div className="d-flex flex-wrap align-items-center justify-content-between mb-3">
          <div className="me-3 mb-2">
            <h4 className="card-title mb-0">기간별 순 사용자</h4>
          </div>
          <div className="me-3 mb-2">
            <StartEndDate
              groupIndex={1}
              startDate="2025-01-28"
              endDate="2025-01-28"
            />
          </div>
          <div className="mb-2">
            <CButtonGroup>
              {['Day', 'Month', 'Year'].map((value) => (
                <CButton
                  color="outline-secondary"
                  key={value}
                  active={value === 'Month'}
                >
                  {value}
                </CButton>
              ))}
            </CButtonGroup>
          </div>
        </div>
        <MainChart />
      </CCardBody>
    </CCard>
  </CCol>

  {/* 두 번째 차트 */}
  <CCol xs={12} xl={6}>
    <CCard className="mb-4">
      <CCardBody>
        <div className="d-flex flex-wrap align-items-center justify-content-between mb-3">
          <div className="me-3 mb-2">
            <h4 className="card-title mb-0">페이지별 조회수</h4>
          </div>
          <div className="me-3 mb-2">
            <StartEndDate
              groupIndex={2}
              startDate="2025-01-28"
              endDate="2025-01-28"
            />
          </div>
          <div className="mb-2">
            <CButtonGroup>
              {['Day', 'Month', 'Year'].map((value) => (
                <CButton
                  color="outline-secondary"
                  key={value}
                  active={value === 'Day'}
                >
                  {value}
                </CButton>
              ))}
            </CButtonGroup>
          </div>
        </div>
        <MainChart />
      </CCardBody>
    </CCard>
  </CCol>
</CRow>

    </>
  )
}

export default Dashboard
