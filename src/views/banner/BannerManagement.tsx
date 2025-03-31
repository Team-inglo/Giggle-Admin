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
import { useBannersQuery } from "@apis/banner/banners";
import BannerTable from "@components/table/BannerTable";
import { useDeleteBannerMutation } from "@apis/banner/banners";
import { useQueryClient } from "@tanstack/react-query";

const BannerManagement = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]); // 선택된 유저 id 목록

  const [bannerData, setBannerData] = useState([]);
  const [pageData, setPageData] = useState([]);

  const { mutate: deleteBanner } = useDeleteBannerMutation();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useBannersQuery({
    page: page,
    size: 10,
    search: search,
  });

  useEffect(() => {
    if (data) {
      setBannerData(data.banners);
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

    deleteBanner(Number(selectedIds[0]), {
      onSuccess: () => {
        alert("삭제되었습니다.");
        queryClient.invalidateQueries({ queryKey: ["banners"] }); // 리스트 다시 불러오기
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
          <CButton color="black" onClick={() => navigate("/banner-create")}>
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

      <BannerTable
        bannerData={bannerData}
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

export default BannerManagement;
