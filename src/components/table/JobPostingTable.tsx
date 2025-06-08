import {
  CCard,
  CCardBody,
  CCardTitle,
  CPagination,
  CPaginationItem,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from "@coreui/react";
import { useNavigate } from "react-router-dom";

type JobPosting = {
  job_posting_id: number;
  title: string;
  job_category: string;
  employment_type: string;
  hourly_rate: number;
  registration_date: string;
};

type PageData = {
  total_pages: number;
  total_items: number;
};

type JobPostingTableProps = {
  jobPostingData: JobPosting[];
  pageData: PageData;
  currentPage: number;
  onPageChange: (page: number) => void;
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function JobPostingTable({
  jobPostingData,
  pageData,
  currentPage,
  onPageChange,
  selectedIds,
  setSelectedIds,
}: JobPostingTableProps) {
  const navigate = useNavigate();
  const totalPages = pageData?.total_pages ?? 1;

  const handleSelectRow = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <CCard className="mb-4">
      <CCardBody>
        <CCardTitle>전체 {pageData.total_items}</CCardTitle>
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell className="text-center">제목</CTableHeaderCell>
              <CTableHeaderCell className="text-center">직무</CTableHeaderCell>
              <CTableHeaderCell className="text-center">
                고용형태
              </CTableHeaderCell>
              <CTableHeaderCell className="text-center">시급</CTableHeaderCell>
              <CTableHeaderCell className="text-center">
                등록일
              </CTableHeaderCell>
              <CTableHeaderCell className="text-center">상세</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {jobPostingData.map((item, index) => (
              <CTableRow key={item.job_posting_id}>
                <CTableDataCell className="text-center">
                  {item.title}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {item.job_category}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {item.employment_type}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {item.hourly_rate}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {item.registration_date}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <CButton
                    size="sm"
                    color="primary"
                    onClick={() =>
                      navigate(`/job-posting-editor/${item.job_posting_id}`)
                    }
                  >
                    보기
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        <CPagination align="center" className="mt-4">
          <CPaginationItem
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            &laquo;
          </CPaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <CPaginationItem
              key={i + 1}
              active={currentPage === i + 1}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </CPaginationItem>
          ))}
          <CPaginationItem
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            &raquo;
          </CPaginationItem>
        </CPagination>
      </CCardBody>
    </CCard>
  );
}
