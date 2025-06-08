// 커리어 목록 페이지 + 테이블 컴포넌트

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CButton,
  CCol,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useCareerListQuery } from "@apis/career_posting/career_postings";
import { useQueryClient } from "@tanstack/react-query";

import CareerTable from "@components/table/CareerTable";

const CareerManagement = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [careerData, setCareerData] = useState([]);
  const [pageData, setPageData] = useState([]);

  const { data, isLoading } = useCareerListQuery({
    page,
    size: 10,
    search,
    sorting,
    category,
  });

  useEffect(() => {
    if (data) {
      setCareerData(data.career_list ?? []); // undefined 방지
      setPageData(data.page_info ?? { total_items: 0 }); // 최소 기본값
    }
  }, [data, page]);

  if (isLoading) return <div>로딩 중...</div>;

  const handleDelete = () => {
    if (selectedIds.length !== 1) {
      alert("하나의 항목만 선택해주세요.");
      return;
    }

    const confirmDelete = confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    alert("(임시) 삭제되었습니다.");

    /*
    deleteCareer(selectedIds[0], {
      onSuccess: () => {
        alert('삭제되었습니다.');
        queryClient.invalidateQueries({ queryKey: ['careers'] });
        setSelectedIds([]);
      },
    });
    */
  };

  const handleReset = () => {
    setSearch("");
    setSorting("");
    setCategory("");
    setPage(1);
  };

  return (
    <>
      <CRow className="mb-3 justify-content-between">
        <CCol md="auto" className="d-flex align-items-end gap-3">
          <CButton color="light" onClick={handleDelete}>
            삭제
          </CButton>
          <CButton color="black" onClick={() => navigate("/career-create")}>
            추가
          </CButton>
        </CCol>

        <CCol md="auto" className="d-flex align-items-end gap-3">
          <CCol className="flex-grow-1">
            <CFormLabel htmlFor="search">검색</CFormLabel>
            <CInputGroup>
              <CFormInput
                id="search"
                placeholder="제목 검색"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <CInputGroupText>
                <CIcon icon="cilSearch" />
              </CInputGroupText>
            </CInputGroup>
          </CCol>

          {/* 정렬 선택 */}
          <CCol md="auto">
            <CFormLabel htmlFor="sorting">정렬</CFormLabel>
            <CFormSelect
              id="sorting"
              value={sorting}
              onChange={(e) => {
                setSorting(e.target.value);
                setPage(1);
              }}
            >
              <option value="">정렬 선택</option>
              <option value="RECENT">최신순</option>
              <option value="POPULAR">북마크순</option>
            </CFormSelect>
          </CCol>

          {/* 카테고리 선택 */}
          <CCol md="auto">
            <CFormLabel htmlFor="sorting">카테고리</CFormLabel>
            <CFormSelect
              id="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
            >
              <option value="">정렬 선택</option>
              <option value="ACTIVITY">대외활동</option>
              <option value="PROGRAM">프로그램</option>
              <option value="CONTEST">대회</option>
              <option value="CLUB">동아리</option>
            </CFormSelect>
          </CCol>

          <CCol md="auto" className="d-flex gap-2">
            <CButton color="light" onClick={handleReset}>
              초기화
            </CButton>
          </CCol>
        </CCol>
      </CRow>

      <CareerTable
        careerData={careerData}
        pageData={pageData}
        currentPage={page}
        onPageChange={(newPage) => setPage(newPage)}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />
    </>
  );
};

export default CareerManagement;
