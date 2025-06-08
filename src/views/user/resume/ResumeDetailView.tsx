// src/views/member/ResumeDetailView.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useResumeDetailQuery } from "@apis/resume/resumes.api";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CSpinner,
} from "@coreui/react";

const ResumeDetailView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: resume, isLoading } = useResumeDetailQuery(id ?? "");

  if (isLoading || !resume) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <CSpinner color="primary" />
      </div>
    );
  }

  const {
    name,
    email,
    phone,
    gender,
    birth_date,
    education,
    experience,
    skills,
    summary,
    portfolio_url,
    created_at,
  } = resume;

  return (
    <div>
      <CButton color="light" onClick={() => navigate(-1)} className="mb-3">
        ← 목록으로
      </CButton>

      <CCard className="mb-4">
        <CCardHeader>기본 정보</CCardHeader>
        <CCardBody>
          <CRow className="mb-2">
            <CCol md={4}>
              <strong>이름</strong>
            </CCol>
            <CCol>{name}</CCol>
          </CRow>
          <CRow className="mb-2">
            <CCol md={4}>
              <strong>이메일</strong>
            </CCol>
            <CCol>{email}</CCol>
          </CRow>
          <CRow className="mb-2">
            <CCol md={4}>
              <strong>전화번호</strong>
            </CCol>
            <CCol>{phone}</CCol>
          </CRow>
          <CRow className="mb-2">
            <CCol md={4}>
              <strong>성별</strong>
            </CCol>
            <CCol>{gender}</CCol>
          </CRow>
          <CRow>
            <CCol md={4}>
              <strong>생년월일</strong>
            </CCol>
            <CCol>{birth_date}</CCol>
          </CRow>
        </CCardBody>
      </CCard>

      {summary && (
        <CCard className="mb-4">
          <CCardHeader>자기소개</CCardHeader>
          <CCardBody>
            <p>{summary}</p>
          </CCardBody>
        </CCard>
      )}

      {education?.length > 0 && (
        <CCard className="mb-4">
          <CCardHeader>학력</CCardHeader>
          <CCardBody>
            {education.map((edu, idx) => (
              <div key={idx} className="mb-3">
                <strong>{edu.school_name}</strong> ({edu.major})
                <div>
                  {edu.start_date} ~ {edu.end_date || "재학 중"}
                </div>
              </div>
            ))}
          </CCardBody>
        </CCard>
      )}

      {experience?.length > 0 && (
        <CCard className="mb-4">
          <CCardHeader>경력</CCardHeader>
          <CCardBody>
            {experience.map((exp, idx) => (
              <div key={idx} className="mb-3">
                <strong>{exp.company_name}</strong> - {exp.position}
                <div>
                  {exp.start_date} ~ {exp.end_date || "재직 중"}
                </div>
                <div>{exp.description}</div>
              </div>
            ))}
          </CCardBody>
        </CCard>
      )}

      {skills?.length > 0 && (
        <CCard className="mb-4">
          <CCardHeader>기술 스택</CCardHeader>
          <CCardBody>
            <ul className="mb-0">
              {skills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </CCardBody>
        </CCard>
      )}

      {portfolio_url && (
        <CCard className="mb-4">
          <CCardHeader>포트폴리오</CCardHeader>
          <CCardBody>
            <a href={portfolio_url} target="_blank" rel="noopener noreferrer">
              {portfolio_url}
            </a>
          </CCardBody>
        </CCard>
      )}

      <div className="text-end text-muted">최초 등록일: {created_at}</div>
    </div>
  );
};

export default ResumeDetailView;
