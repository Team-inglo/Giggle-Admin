import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
} from "@coreui/react";
import HtmlEditor from "@components/html/HtmlEditor";
import { useCreateAdminNotificationMutation } from "@apis/admin_notification/admin_notifications";

const NotificationEditor = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("ALL");
  const [htmlCode, setHtmlCode] = useState("");
  const createMutation = useCreateAdminNotificationMutation();

  const handleSave = () => {
    createMutation.mutate(
      { title, target, content: htmlCode },
      {
        onSuccess: () => {
          alert("알림이 등록되었습니다");
          navigate("/notification-management");
        },
      }
    );
  };

  return (
    <CCard>
      <CCardHeader>알림 생성</CCardHeader>
      <CCardBody>
        <CForm className="row g-3">
          <CCol xs={12}>
            <CFormLabel>제목 *</CFormLabel>
            <CFormInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </CCol>

          <CCol xs={12}>
            <CFormLabel>대상 *</CFormLabel>
            <div className="d-flex gap-3">
              {["ALL", "USER", "OWNER"].map((role) => (
                <CFormLabel key={role}>
                  <input
                    type="radio"
                    name="target"
                    checked={target === role}
                    onChange={() => setTarget(role)}
                  />{" "}
                  {role}
                </CFormLabel>
              ))}
            </div>
          </CCol>

          <CCol xs={12}>
            <HtmlEditor htmlCode={htmlCode} setHtmlCode={setHtmlCode} />
          </CCol>

          <CCol xs={12} className="text-end">
            <CButton
              color="light"
              onClick={() => navigate("/notification-management")}
            >
              취소
            </CButton>
            <CButton color="dark" className="ms-2" onClick={handleSave}>
              저장
            </CButton>
          </CCol>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default NotificationEditor;
