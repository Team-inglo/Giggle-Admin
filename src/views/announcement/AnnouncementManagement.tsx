// src/views/user-owner-job-posting/UserOwnerJobPostingManagement.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useUserOwnerJobPostingsQuery } from "@apis/user-owner-job-posting/user_owner_job_postings.api";
import UserOwnerJobPostingTable from "@components/table/UserOwnerJobPostingTable";

const AnnouncementManagement = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const { data } = useUserOwnerJobPostingsQuery({ page, size: 10, search });

  const [tableData, setTableData] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    total_items: 0,
    total_pages: 1,
  });

  useEffect(() => {
    if (data) {
      setTableData(data.job_postings);
      setPageInfo(data.page_info);
    }
  }, [data]);

  const handleReset = () => setSearch("");

  return (
    <>
      <CRow className="mb-3 justify-content-between">
        <CCol md="auto" className="d-flex align-items-end gap-3">
          <CFormLabel htmlFor="search">검색</CFormLabel>
          <CInputGroup>
            <CFormInput
              id="search"
              placeholder="공고 제목/회원 이름"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <CInputGroupText>
              <CIcon icon="cilSearch" />
            </CInputGroupText>
          </CInputGroup>
          <CButton color="light" onClick={handleReset}>
            초기화
          </CButton>
        </CCol>
      </CRow>

      <UserOwnerJobPostingTable
        jobPostingData={tableData}
        pageData={pageInfo}
        currentPage={page}
        onPageChange={(newPage) => setPage(newPage)}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />
    </>
  );
};

export default AnnouncementManagement;
