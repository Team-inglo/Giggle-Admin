// src/components/table/TermTable.tsx
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

export default function TermTable({
  termData,
  pageData,
  currentPage,
  onPageChange,
}) {
  const navigate = useNavigate();
  const totalPages = pageData.total_pages ?? 1;

  return (
    <CCard className="mb-4">
      <CCardBody>
        <CCardTitle>전체 약관 {pageData.total_items}건</CCardTitle>
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell className="text-center">타입</CTableHeaderCell>
              <CTableHeaderCell className="text-center">버전</CTableHeaderCell>
              <CTableHeaderCell className="text-center">
                등록일
              </CTableHeaderCell>
              <CTableHeaderCell className="text-center">상세</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {termData.map((term) => (
              <CTableRow key={`${term.term_type}-${term.version}`}>
                <CTableDataCell className="text-center">
                  {term.term_type}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {term.version}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {term.created_at}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <CButton
                    size="sm"
                    color="primary"
                    onClick={() => navigate(`/term-editor/${term.term_id}`)}
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
