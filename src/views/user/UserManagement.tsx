import { useEffect, useState } from "react";
import {
  CButton,
  CCardTitle,
  CCol,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import UserTable from "@components/table/UserTable";
import { useAccountsQuery } from "@apis/account/accounts";
import getFormattedDate from "@utils/formatDateUtil";

const UserManagement = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [userData, setUserData] = useState([]);
  const [pageData, setPageData] = useState([]);

  const today = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(today.getMonth() - 4);

  const [startDate, setStartDate] = useState(getFormattedDate(oneMonthAgo));
  const [endDate, setEndDate] = useState(getFormattedDate(today));

  const { data, isLoading, isError } = useAccountsQuery({
    page: page,
    size: 10,
    search: search,
    start_date: startDate,
    end_data: endDate,
  });

  useEffect(() => {
    if (data) {
      setUserData(data.accounts); // 필터링 대상은 accounts 배열
      setPageData(data.page_info);
    }
  }, [data]);

  // 검색 초기화
  const handleReset = () => {
    setSearch("");
  };

  return (
    <>
      <CRow className="mb-3 justify-content-between">
        {/* 왼쪽 - 삭제 버튼 */}
        <CCol md="auto" className="d-flex align-items-end">
          <CButton color="light">삭제</CButton>
        </CCol>

        {/* 오른쪽 - 기간, 검색, 조회/초기화 */}
        <CCol md="auto" className="d-flex align-items-end gap-3">
          {/* 기간 */}
          <CCol className="d-flex flex-column">
            <CFormLabel>기간</CFormLabel>
            <div className="d-flex gap-2">
              <CFormInput
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span className="align-self-center">~</span>
              <CFormInput
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </CCol>

          {/* 검색 */}
          <CCol className="flex-grow-1">
            <CFormLabel htmlFor="search">검색</CFormLabel>
            <CInputGroup>
              <CFormInput
                id="search"
                placeholder="검색"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
              />
              <CInputGroupText>
                <CIcon icon="cilSearch" />
              </CInputGroupText>
            </CInputGroup>
          </CCol>

          {/* 조회/초기화 버튼 */}
          <CCol md="auto" className="d-flex gap-2">
            <CButton color="light" onClick={handleReset}>
              초기화
            </CButton>
          </CCol>
        </CCol>
      </CRow>
      <UserTable
        userData={userData}
        pageData={pageData}
        currentPage={page}
        onPageChange={(newPage) => setPage(newPage)}
      />
      <CRow>
        <CCol xs></CCol>
      </CRow>
    </>
  );
};

export default UserManagement;

// <ManagementTable data="" />
