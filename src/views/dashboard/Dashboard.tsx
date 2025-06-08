import { CCard, CCol, CRow } from "@coreui/react";
import StartEndDate from "@components/date/StartEndDate";
import MetricsCardGroup from "@components/card/MetricsCardGroup";
import {
  useSignUpSummaryQuery,
  useWithdrawalSummaryQuery,
} from "@apis/account/accounts";
import { useState } from "react";
import {
  useSuccessfulMatchesQuery,
  useUserOwnerJobPostingApplySummaryQuery,
  useUserOwnerJobPostingsBriefsQuery,
} from "@apis/user_owener_job_posting/user_owner_job_postings";
import { useJobPostingSummaryQuery } from "@apis/job_posting/job_postings";

const Dashboard = () => {
  /**
   * 다중 카드 그룹의 날짜 범위 상태 관리
   */
  const [dateRanges, setDateRanges] = useState<
    Record<number, { title: string; start_date: string; end_date: string }>
  >({
    0: { title: "신규 회원", start_date: "2025-01-01", end_date: "2025-06-30" },
    1: { title: "탈퇴 회원", start_date: "2025-01-01", end_date: "2025-06-30" },
    2: {
      title: "공고 등록 수",
      start_date: "2025-01-01",
      end_date: "2025-06-30",
    },
    3: {
      title: "공고 신청 수",
      start_date: "2025-01-01",
      end_date: "2025-06-30",
    },
    4: {
      title: "매칭 등록 수",
      start_date: "2025-01-01",
      end_date: "2025-06-30",
    },
    5: {
      title: "인재 연락 수",
      start_date: "2025-01-01",
      end_date: "2025-06-30",
    },
  });

  const handleDateChange = (
    groupIndex: number,
    field: "start_date" | "end_date",
    value: string
  ) => {
    setDateRanges((prev) => ({
      ...prev,
      [groupIndex]: {
        ...prev[groupIndex],
        [field]: value,
      },
    }));
  };

  const { data: signUpSummary, isLoading: isSignUpLoading } =
    useSignUpSummaryQuery({
      start_date: dateRanges[0].start_date,
      end_date: dateRanges[0].end_date,
    });

  const { data: withdrawalSummary, isLoading: isWithdrawalLoading } =
    useWithdrawalSummaryQuery({
      start_date: dateRanges[1].start_date,
      end_date: dateRanges[1].end_date,
    });

  const { data: briefsData, isLoading: isBriefsLoading } =
    useUserOwnerJobPostingsBriefsQuery();

  const { data: applySummary, isLoading: isApplyLoading } =
    useUserOwnerJobPostingApplySummaryQuery({
      start_date: dateRanges[3].start_date,
      end_date: dateRanges[3].end_date,
    });

  const { data: successSummary, isLoading: isSuccessLoading } =
    useSuccessfulMatchesQuery({
      start_date: dateRanges[4].start_date,
      end_date: dateRanges[4].end_date,
    });

  const { data: jobSummary, isLoading: isJobSummaryLoading } =
    useJobPostingSummaryQuery({
      start_date: dateRanges[5].start_date,
      end_date: dateRanges[5].end_date,
    });

  if (
    isSignUpLoading ||
    isWithdrawalLoading ||
    isBriefsLoading ||
    isApplyLoading ||
    isSuccessLoading ||
    isJobSummaryLoading
  )
    return <div>로딩 중...</div>;

  return (
    <>
      {/* 상단 타이틀 */}
      <CRow>
        {/* 신규 회원 */}
        <CCol key={0} xs={12} xl={6}>
          <CCard className="mb-4 p-4">
            <CRow className="mb-3">
              <CCol className="d-flex align-items-center gap-2">
                <h5 className="mb-0 fw-semibold">{dateRanges[0].title}</h5>
              </CCol>

              {/* 기간 선택 */}
              <StartEndDate
                groupIndex={0}
                startDate={dateRanges[0].start_date}
                endDate={dateRanges[0].end_date}
                onChange={handleDateChange}
              />
            </CRow>

            {/* 카드 4개 */}
            <MetricsCardGroup
              data={[
                {
                  title: "신규 외국인 가입 수",
                  value: signUpSummary.user_sign_up_info.count,
                  comparisonValue:
                    signUpSummary.user_sign_up_info.prior_period_count,
                  percentage:
                    signUpSummary.user_sign_up_info.prior_period_comparison,
                  isIncrease:
                    signUpSummary.user_sign_up_info.prior_period_comparison > 0,
                },
                {
                  title: "누적 외국인 가입 수",
                  value: signUpSummary.accumulated_user_sign_up_info.count,
                  comparisonValue:
                    signUpSummary.accumulated_user_sign_up_info
                      .prior_period_count,
                  percentage:
                    signUpSummary.accumulated_user_sign_up_info
                      .prior_period_comparison,
                  isIncrease:
                    signUpSummary.accumulated_user_sign_up_info
                      .prior_period_comparison > 0,
                },
                {
                  title: "신규 고용주 가입 수",
                  value: signUpSummary.owner_sign_up_info.count,
                  comparisonValue:
                    signUpSummary.owner_sign_up_info.prior_period_count,
                  percentage:
                    signUpSummary.owner_sign_up_info.prior_period_comparison,
                  isIncrease:
                    signUpSummary.owner_sign_up_info.prior_period_comparison >
                    0,
                },
                {
                  title: "누적 고용주 가입 수",
                  value: signUpSummary.accumulated_owner_sign_up_info.count,
                  comparisonValue:
                    signUpSummary.accumulated_owner_sign_up_info
                      .prior_period_count,
                  percentage:
                    signUpSummary.accumulated_owner_sign_up_info
                      .prior_period_comparison,
                  isIncrease:
                    signUpSummary.accumulated_owner_sign_up_info
                      .prior_period_comparison > 0,
                },
              ]}
            />
          </CCard>
        </CCol>

        {/* 탈퇴 회원 */}
        <CCol key={1} xs={12} xl={6}>
          <CCard className="mb-4 p-4">
            <CRow className="mb-3">
              <CCol className="d-flex align-items-center gap-2">
                <h5 className="mb-0 fw-semibold">{dateRanges[1].title}</h5>
              </CCol>

              {/* 기간 선택 */}
              <StartEndDate
                groupIndex={1}
                startDate={dateRanges[1].start_date}
                endDate={dateRanges[1].end_date}
                onChange={handleDateChange}
              />
            </CRow>

            {/* 카드 4개 */}
            <MetricsCardGroup
              data={[
                {
                  title: "신규 외국인 탈퇴 수",
                  value: withdrawalSummary.user_withdrawal_info.count,
                  comparisonValue:
                    withdrawalSummary.user_withdrawal_info.prior_period_count,
                  percentage:
                    withdrawalSummary.user_withdrawal_info
                      .prior_period_comparison,
                  isIncrease:
                    withdrawalSummary.user_withdrawal_info
                      .prior_period_comparison > 0,
                },
                {
                  title: "누적 외국인 탈퇴 수",
                  value:
                    withdrawalSummary.accumulated_user_withdrawal_info.count,
                  comparisonValue:
                    withdrawalSummary.accumulated_user_withdrawal_info
                      .prior_period_count,
                  percentage:
                    withdrawalSummary.accumulated_user_withdrawal_info
                      .prior_period_comparison,
                  isIncrease:
                    withdrawalSummary.accumulated_user_withdrawal_info
                      .prior_period_comparison > 0,
                },
                {
                  title: "신규 고용주 탈퇴 수",
                  value: withdrawalSummary.owner_withdrawal_info.count,
                  comparisonValue:
                    withdrawalSummary.owner_withdrawal_info.prior_period_count,
                  percentage:
                    withdrawalSummary.owner_withdrawal_info
                      .prior_period_comparison,
                  isIncrease:
                    withdrawalSummary.owner_withdrawal_info
                      .prior_period_comparison > 0,
                },
                {
                  title: "누적 고용주 탈퇴 수",
                  value:
                    withdrawalSummary.accumulated_owner_withdrawal_info.count,
                  comparisonValue:
                    withdrawalSummary.accumulated_owner_withdrawal_info
                      .prior_period_count,
                  percentage:
                    withdrawalSummary.accumulated_owner_withdrawal_info
                      .prior_period_comparison,
                  isIncrease:
                    withdrawalSummary.accumulated_owner_withdrawal_info
                      .prior_period_comparison > 0,
                },
              ]}
            />
          </CCard>
        </CCol>
      </CRow>

      {/* chart 영역 */}

      <CRow>
        {/* 첫 번째 차트 */}
        {/*
	<CCol xs={12} xl={6}>
		<CCard className="mb-4 p-4">
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
	*/}
        {/* 두 번째 차트 */}
        {/* 
	<CCol xs={12} xl={6}>
		<CCard className="mb-4 p-4">
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
	*/}

        {/* 공고 등록 수 */}
        <CCol key={2} xs={12} xl={3}>
          <CCard className="mb-4 p-4">
            <CRow className="mb-3">
              <CCol className="d-flex align-items-center gap-2">
                <h5 className="mb-0 fw-semibold">{dateRanges[2].title}</h5>
              </CCol>

              {/* 기간 선택 */}
              <StartEndDate
                groupIndex={2}
                startDate={dateRanges[2].start_date}
                endDate={dateRanges[2].end_date}
                onChange={handleDateChange}
              />
            </CRow>

            {/* 카드 4개 */}
            <MetricsCardGroup
              data={[
                {
                  title: "기간동안 공고 등록 수",
                  value: jobSummary?.job_posting_registration_info?.count ?? 0,
                  comparisonValue:
                    jobSummary?.job_posting_registration_info
                      ?.prior_period_count ?? 0,
                  percentage:
                    jobSummary?.job_posting_registration_info
                      ?.prior_period_comparison ?? 0,
                  isIncrease:
                    (jobSummary?.job_posting_registration_info
                      ?.prior_period_comparison ?? 0) > 0,
                },
              ]}
            />
          </CCard>
        </CCol>

        {/* 공고 신청 수 */}
        <CCol key={3} xs={12} xl={3}>
          <CCard className="mb-4 p-4">
            <CRow className="mb-3">
              <CCol className="d-flex align-items-center gap-2">
                <h5 className="mb-0 fw-semibold">{dateRanges[3].title}</h5>
              </CCol>

              {/* 기간 선택 */}
              <StartEndDate
                groupIndex={3}
                startDate={dateRanges[3].start_date}
                endDate={dateRanges[3].end_date}
                onChange={handleDateChange}
              />
            </CRow>

            {/* 카드 4개 */}
            <MetricsCardGroup
              data={[
                {
                  title: "기간동안 신규 등록 수",
                  value: applySummary?.user_owner_job_posting_info?.count ?? 0,
                  comparisonValue:
                    applySummary?.user_owner_job_posting_info
                      ?.prior_period_count ?? 0,
                  percentage:
                    applySummary?.user_owner_job_posting_info
                      ?.prior_period_comparison ?? 0,
                  isIncrease:
                    (applySummary?.user_owner_job_posting_info
                      ?.prior_period_comparison ?? 0) > 0,
                },
              ]}
            />
          </CCard>
        </CCol>

        {/* 매칭 성공 수 */}
        <CCol key={4} xs={12} xl={3}>
          <CCard className="mb-4 p-4">
            <CRow className="mb-3">
              <CCol className="d-flex align-items-center gap-2">
                <h5 className="mb-0 fw-semibold">{dateRanges[4].title}</h5>
              </CCol>

              {/* 기간 선택 */}
              <StartEndDate
                groupIndex={4}
                startDate={dateRanges[4].start_date}
                endDate={dateRanges[4].end_date}
                onChange={handleDateChange}
              />
            </CRow>

            {/* 카드 4개 */}
            <MetricsCardGroup
              data={[
                {
                  title: "기간동안 매칭 성공 수",
                  value: successSummary?.successful_mateches_info?.count ?? 0,
                  comparisonValue:
                    successSummary?.successful_mateches_info
                      ?.prior_period_count ?? 0,
                  percentage:
                    successSummary?.successful_mateches_info
                      ?.prior_period_comparison ?? 0,
                  isIncrease:
                    (successSummary?.successful_mateches_info
                      ?.prior_period_comparison ?? 0) > 0,
                },
              ]}
            />
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
