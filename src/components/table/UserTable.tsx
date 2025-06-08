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
import { useState } from "react";

export default function UserTable({
  userData,
  pageData,
  currentPage,
  onPageChange,
}) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]); // 선택된 유저 id 목록
  const totalPages = Math.ceil((pageData?.total_items ?? 0) / 10);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allIds = userData.map((item) => item.id);
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
                    userData.length > 0 &&
                    userData.every((item) => selectedIds.includes(item.id))
                  }
                  onChange={handleSelectAll}
                />
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">
                번호
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">
                회원 이메일
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">
                유저타입
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">
                이름
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">
                생년월일
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">
                성별
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">
                국적
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">
                주소지
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">
                비자
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">
                휴대번호
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">
                선택언어
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">
                가입일
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">
                이력서
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {userData.map((item, index) => (
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
                  <div>{item.email}</div>{" "}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {" "}
                  <div>{item.user_type}</div>{" "}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {" "}
                  <div>{item.name}</div>{" "}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {" "}
                  <div>{item.birth}</div>{" "}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {" "}
                  <div>{item.gender}</div>{" "}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {" "}
                  <div>{item.nationality}</div>{" "}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {" "}
                  <div>{item.address}</div>{" "}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {" "}
                  <div>{item.visa}</div>{" "}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {" "}
                  <div>{item.phone_number}</div>{" "}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {" "}
                  <div>{item.language}</div>{" "}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {" "}
                  <div>{item.sign_up_date}</div>{" "}
                </CTableDataCell>
                <CTableDataCell>
                  <CButton color="primary" size="sm">
                    이력서보기
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
