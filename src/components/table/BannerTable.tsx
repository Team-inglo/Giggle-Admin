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
import BannerImageCell from "./imageCell/BannerImageCell";

export default function BannerTable({
  bannerData,
  pageData,
  currentPage,
  onPageChange,
  selectedIds,
  setSelectedIds,
}) {
  const navigate = useNavigate();

  const totalPages = Math.ceil((pageData?.total_items ?? 0) / 10);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allIds = bannerData.map((item) => item.id);
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
                    bannerData.length > 0 &&
                    bannerData.every((item) => selectedIds.includes(item.id))
                  }
                  onChange={handleSelectAll}
                />
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">
                번호
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">
                제목
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">
                표시 대상
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">
                등록일
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">
                대표 이미지 미리보기
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">
                상세보기
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {bannerData.map((item, index) => (
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
                  <div>{item.title}</div>{" "}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {" "}
                  <div>{item.role}</div>{" "}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {" "}
                  <div>{item.registered_at}</div>{" "}
                </CTableDataCell>

                <BannerImageCell imageUrl={item.img_url} />

                <CTableDataCell>
                  <CButton
                    color="primary"
                    size="sm"
                    onClick={() => navigate(`/banner-editor/${item.id}`)}
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
