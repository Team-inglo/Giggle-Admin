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
} from "@coreui/react";

export default function NotificationTable({
  data,
  pageInfo,
  currentPage,
  onPageChange,
}) {
  return (
    <CCard>
      <CCardBody>
        <CCardTitle>전체 {pageInfo.total_items}</CCardTitle>
        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>제목</CTableHeaderCell>
              <CTableHeaderCell>대상</CTableHeaderCell>
              <CTableHeaderCell>등록일</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {data.map((item) => (
              <CTableRow key={item.id}>
                <CTableDataCell>{item.title}</CTableDataCell>
                <CTableDataCell>{item.target}</CTableDataCell>
                <CTableDataCell>{item.created_at}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        <CPagination align="center" className="mt-3">
          <CPaginationItem
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            &laquo;
          </CPaginationItem>
          {Array.from({ length: pageInfo.total_pages }, (_, i) => (
            <CPaginationItem
              key={i}
              active={currentPage === i + 1}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </CPaginationItem>
          ))}
          <CPaginationItem
            disabled={currentPage === pageInfo.total_pages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            &raquo;
          </CPaginationItem>
        </CPagination>
      </CCardBody>
    </CCard>
  );
}
