// 커리어 리스트 조회 + 상세보기 + 등록/수정 Editor 컴포넌트

import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
  CButton,
} from "@coreui/react";
import { useNavigate } from "react-router-dom";

// 리스트 UI
export default function CareerTable({
  careerData,
  pageData,
  currentPage,
  onPageChange,
  selectedIds,
  setSelectedIds,
}: {
  careerData: any[];
  pageData: { total_items: number; total_pages: number };
  currentPage: number;
  onPageChange: (page: number) => void;
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const navigate = useNavigate();

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allIds = careerData.map((item) => item.id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const totalPages = pageData?.total_pages ?? 1;

  return (
    <CCard className="mb-4">
      <CCardBody>
        <CCardTitle>커리어 공고 목록 ({careerData?.length})</CCardTitle>
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead className="text-nowrap">
            <CTableRow>
              <CTableHeaderCell className="text-center">
                <input
                  type="checkbox"
                  checked={
                    careerData.length > 0 &&
                    careerData.every((item) => selectedIds.includes(item.id))
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
                카테고리
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">
                상태
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">
                남은 기간
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">
                마감일
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">
                등록일
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">
                자세히
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {careerData.map((item, index) => (
              <CTableRow key={item.id}>
                <CTableDataCell className="text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => handleSelectRow(item.id)}
                  />
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {index + 1}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {item.title}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {item.career_category}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {item.status}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {item.left_days}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {item.recruitment_end_date}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {item.created_at}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <CButton
                    color="info"
                    size="sm"
                    onClick={() => navigate(`/career-editor/${item.id}`)}
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
