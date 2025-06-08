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
import NotificationTable from "@components/table/NotificationTable";
import { useAdminNotificationsQuery } from "@apis/admin_notification/admin_notifications";

const NotificationManagement = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [pageInfo, setPageInfo] = useState({ total_items: 0, total_pages: 1 });

  // const { data } = useAdminNotificationsQuery({ page, size: 10 });
  /*
  useEffect(() => {
    if (data) {
      setTableData(data.notifications);
      setPageInfo({
        total_items: data.page_info.total_items,
        total_pages: data.page_info.total_pages,
      });
    }
  }, [data]);
  */

  return (
    <>
      <CRow className="mb-3 justify-content-between">
        <CCol md="auto" className="d-flex align-items-end gap-3">
          <CButton
            color="black"
            onClick={() => navigate("/notification-editor/create")}
          >
            알림 생성
          </CButton>
        </CCol>
        <CCol md="auto">
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
      </CRow>

      <NotificationTable
        data={tableData}
        pageInfo={pageInfo}
        currentPage={page}
        onPageChange={setPage}
      />
    </>
  );
};

export default NotificationManagement;
