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
// import { useTermsQuery } from '@apis/terms/terms';
import TermTable from "@components/table/TermTable";

const TermManagement = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [terms, setTerms] = useState([]);
  const [pageInfo, setPageInfo] = useState({ total_items: 0, total_pages: 1 });

  // ❗ 더미 데이터 주입
  useEffect(() => {
    const dummyTerms = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `이용약관 ${i + 1}`,
      description: `이것은 ${i + 1}번째 이용약관 설명입니다.`,
      created_at: `2025-06-${(i % 30) + 1}`.padStart(10, "0"),
      updated_at: `2025-06-${(i % 30) + 2}`.padStart(10, "0"),
    }));

    setTerms(dummyTerms);
    setPageInfo({ total_items: 30, total_pages: 3 });
  }, [page, search]);

  const handleReset = () => setSearch("");

  return (
    <>
      <CRow className="mb-3 justify-content-between">
        <CCol md="auto" className="d-flex align-items-end gap-3">
          <CButton
            color="black"
            onClick={() => navigate("/term-editor/create")}
          >
            추가
          </CButton>
        </CCol>

        <CCol md="auto" className="d-flex align-items-end gap-3">
          <CCol className="flex-grow-1">
            <CFormLabel htmlFor="search">검색</CFormLabel>
            <CInputGroup>
              <CFormInput
                id="search"
                placeholder="약관명 검색"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <CInputGroupText>
                <CIcon icon="cilSearch" />
              </CInputGroupText>
            </CInputGroup>
          </CCol>
          <CCol md="auto">
            <CButton color="light" onClick={handleReset}>
              초기화
            </CButton>
          </CCol>
        </CCol>
      </CRow>

      <TermTable
        termData={terms}
        pageData={pageInfo}
        currentPage={page}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </>
  );
};

export default TermManagement;
