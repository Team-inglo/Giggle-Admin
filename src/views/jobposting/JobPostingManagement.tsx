import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CButton, CCol, CFormInput, CFormLabel, CRow } from "@coreui/react";
import { useJobPostingsQuery } from "@apis/job_posting/job_postings";
import { useQueryClient } from "@tanstack/react-query";
import JobPostingTable from "@components/table/JobPostingTable";

const JobPostingManagement = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [tableData, setTableData] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    total_items: 0,
    total_pages: 1,
  });

  const { data } = useJobPostingsQuery({ page, size: 10, search });

  useEffect(() => {
    if (data) {
      setTableData(data.job_postings);
      setPageInfo({
        total_items: data.page_info.total_items,
        total_pages: data.page_info.total_pages,
      });
    }
  }, [data]);

  const handleReset = () => setSearch("");

  return (
    <>
      <CRow className="mb-3 justify-content-between">
        <CCol md="auto" className="d-flex align-items-end gap-3">
          <CButton
            color="black"
            onClick={() => navigate("/job-posting-editor/create")}
          >
            추가
          </CButton>
        </CCol>

        <CCol md="auto" className="d-flex align-items-end gap-3">
          <CCol className="flex-grow-1">
            <CFormLabel htmlFor="search">검색</CFormLabel>
            <CFormInput
              id="search"
              placeholder="제목 검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </CCol>

          <CCol md="auto">
            <CButton color="light" onClick={handleReset}>
              초기화
            </CButton>
          </CCol>
        </CCol>
      </CRow>

      <JobPostingTable
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

export default JobPostingManagement;
