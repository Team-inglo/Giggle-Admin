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
  CFormSelect,
  CRow,
} from "@coreui/react";
import HtmlEditor from "@components/html/HtmlEditor";
import { useCreateTermMutation } from "@apis/term/terms";

const TermEditor = () => {
  const navigate = useNavigate();
  const createTermMutation = useCreateTermMutation();

  const [termType, setTermType] = useState("PERSONAL_SERVICE_TERMS");
  const [version, setVersion] = useState("1.0");
  const [htmlCode, setHtmlCode] = useState("");
  const [previewHtml, setPreviewHtml] = useState("");

  const handleSave = () => {
    const payload = {
      term_type: termType,
      version: parseFloat(version),
      content: htmlCode,
    };

    createTermMutation.mutate(payload, {
      onSuccess: () => {
        alert("약관이 등록되었습니다");
        navigate("/term-management"); // 목록화면이 있다면
      },
    });
  };

  return (
    <CCard>
      <CCardHeader>약관 등록</CCardHeader>
      <CCardBody>
        <CForm>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>약관 타입</CFormLabel>
              <CFormSelect
                value={termType}
                onChange={(e) => setTermType(e.target.value)}
                options={[
                  {
                    label: "개인 서비스 이용약관",
                    value: "PERSONAL_SERVICE_TERMS",
                  },
                  { label: "개인정보 처리방침", value: "PRIVACY_POLICY" },
                  {
                    label: "위치기반서비스 약관",
                    value: "LOCATION_BASED_TERMS",
                  },
                  {
                    label: "기업 서비스 이용약관",
                    value: "ENTERPRISE_SERVICE_TERMS",
                  },
                ]}
              />
            </CCol>

            <CCol md={6}>
              <CFormLabel>버전</CFormLabel>
              <CFormInput
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                type="number"
                step="0.1"
              />
            </CCol>
          </CRow>

          <CRow className="mb-4">
            <CCol>
              <CFormLabel>내용</CFormLabel>
              <HtmlEditor htmlCode={htmlCode} setHtmlCode={setHtmlCode} />
            </CCol>
          </CRow>

          <CRow>
            <CCol className="d-flex justify-content-end">
              <CButton color="light" onClick={() => navigate(-1)}>
                취소
              </CButton>
              <CButton color="dark" className="ms-2" onClick={handleSave}>
                저장
              </CButton>
            </CCol>
          </CRow>
        </CForm>

        {/* 미리보기 */}
        <CCard className="mt-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <span>미리보기</span>
            <CButton
              size="sm"
              color="light"
              onClick={() => setPreviewHtml(htmlCode)}
            >
              미리보기
            </CButton>
          </CCardHeader>
          <CCardBody style={{ minHeight: "300px" }}>
            <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
          </CCardBody>
        </CCard>
      </CCardBody>
    </CCard>
  );
};

export default TermEditor;
