import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import SchoolTable from "@components/table/SchoolTable";
import { useDeleteSchoolMutation, useSchoolsQuery } from "@apis/school/schools";

const SchoolManagement = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]); // 선택된 유저 id 목록

  const [schoolData, setSchoolData] = useState([]);
  const [pageData, setPageData] = useState([]);

  const { mutate: deleteSchoolMutate } = useDeleteSchoolMutation();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useSchoolsQuery({
    page: page,
    size: 10,
    search: search,
  });

  useEffect(() => {
    if (data) {
      setSchoolData(data.accounts);
      setPageData(data.page_info);
    }
  }, [data]);

  const handleDelete = () => {
    if (selectedIds.length !== 1) {
      alert("하나의 항목만 선택해주세요.");
      return;
    }
  
    const confirmDelete = confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;
  
    deleteSchoolMutate(Number(selectedIds[0]), {
      onSuccess: () => {
        alert("삭제되었습니다.");
        queryClient.invalidateQueries({ queryKey: ['schools'] }); // ✅ banners → schools
        setSelectedIds([]);
      },
    });
  };

  // 검색 초기화
  const handleReset = () => {
    setSearch("");
  };

  return (
    <>
      <CRow className="mb-3 justify-content-between">
        {/* 왼쪽 - 삭제 버튼 */}
        <CCol md="auto" className="d-flex align-items-end gap-3">
          <CButton color="light" onClick={handleDelete}>
            삭제
          </CButton>
          <CButton color="black" onClick={() => navigate("/school-create")}>
            추가
          </CButton>
        </CCol>

        {/* 오른쪽 - 기간, 검색, 조회/초기화 */}
        <CCol md="auto" className="d-flex align-items-end gap-3">
          {/* 검색 */}
          <CCol className="flex-grow-1">
            <CFormLabel htmlFor="search">검색</CFormLabel>
            <CInputGroup>
              <CFormInput
                id="search"
                placeholder="검색"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
              />
              <CInputGroupText>
                <CIcon icon="cilSearch" />
              </CInputGroupText>
            </CInputGroup>
          </CCol>

          {/* 조회/초기화 버튼 */}
          <CCol md="auto" className="d-flex gap-2">
            <CButton color="light" onClick={handleReset}>
              초기화
            </CButton>
          </CCol>
        </CCol>
      </CRow>

      <SchoolTable
        schoolData={schoolData}
        pageData={pageData}
        currentPage={page}
        onPageChange={(newPage) => setPage(newPage)}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />

      <CRow>
        <CCol xs></CCol>
      </CRow>
    </>
  );
};

export default SchoolManagement;
