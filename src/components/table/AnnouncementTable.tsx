// src/components/table/UserOwnerJobPostingTable.tsx
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

const AnnouncementTable = ({
  jobPostingData,
  pageData,
  currentPage,
  onPageChange,
  selectedIds,
  setSelectedIds,
}) => {
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
              <CTableHeaderCell className="text-center">
                회원 이름
              </CTableHeaderCell>
              <CTableHeaderCell className="text-center">
                지원 공고
              </CTableHeaderCell>
              <CTableHeaderCell className="text-center">
                신청일
              </CTableHeaderCell>
              <CTableHeaderCell className="text-center">상태</CTableHeaderCell>
              <CTableHeaderCell className="text-center">상세</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {jobPostingData.map((item) => (
              <CTableRow key={item.id}>
                <CTableDataCell className="text-center">
                  {item.user_name}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {item.job_posting_title}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {item.applied_at}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {item.status}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <CButton
                    size="sm"
                    color="primary"
                    onClick={() =>
                      navigate(`/user-owner-job-posting/${item.id}`)
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
};

export default AnnouncementTable;
