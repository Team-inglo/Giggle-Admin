import {
    CButton,
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
import { useNavigate } from "react-router-dom";
  
  export default function SchoolTable({
    schoolData,
    pageData,
    currentPage,
    onPageChange,
    selectedIds,
    setSelectedIds
  }) {

    const navigate = useNavigate()
;  
    const totalPages = Math.ceil((pageData?.total_items ?? 0) / 10);
  
    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        const allIds = schoolData.map((item) => item.id);
        setSelectedIds(allIds);
      } else {
        setSelectedIds([]);
      }
    };
  
    const handleSelectRow = (id: string) => {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    };
  
    return (
      <CCard className="mb-4">
        <CCardBody>
          <CCardTitle>전체 {pageData.total_items}</CCardTitle>
  
          {/* 테이블 시작.. */}
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead className="text-nowrap">
              <CTableRow>
                <CTableHeaderCell className="text-center">
                  <input
                    type="checkbox"
                    checked={
                        schoolData.length > 0 &&
                        schoolData.every((item) => selectedIds.includes(item.id))
                    }
                    onChange={handleSelectAll}
                  />
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  번호
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  학교명
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  학교 전화번호
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  외국인 담당센터 기관명
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  외국인 담당센터 담당자명
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  외국인 담당센터 번호
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  외국인 담당센터 주소
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  상세보기
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {schoolData.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell className="text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => handleSelectRow(item.id)}
                    />
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {" "}
                    <div>{index + 1}</div>{" "}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {" "}
                    <div>{item.school_name}</div>{" "}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {" "}
                    <div>{item.school_phone_number}</div>{" "}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {" "}
                    <div>{item.institute_name}</div>{" "}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {" "}
                    <div>{item.coordinator_name}</div>{" "}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {" "}
                    <div>{item.coordinator_phone_number}</div>{" "}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {" "}
                    <div>{item.address_detail}</div>{" "}
                  </CTableDataCell>
                <CTableDataCell>
                  <CButton 
                  color="primary" 
                  size="sm"
                  onClick={() => navigate(`/school-editor/${item.id}`)}
                  >
                    상세보기
                  </CButton>
                </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
  
          {/* 페이지네이션 */}
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
  