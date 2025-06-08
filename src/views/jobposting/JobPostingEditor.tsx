import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CButton,
} from "@coreui/react";
import {
  useCreateJobPostingMutation,
  useEditJobPostingMutation,
  useJobPostingDetailQuery,
} from "@apis/job-posting/job_postings";

const JobPostingEditor = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const navigate = useNavigate();

  const { data } = useJobPostingDetailQuery(id ?? "", { enabled: isEditMode });
  const createJobPostingMutation = useCreateJobPostingMutation();
  const editJobPostingMutation = useEditJobPostingMutation();

  const [title, setTitle] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [employmentType, setEmploymentType] = useState("PARTTIME");
  const [hourlyRate, setHourlyRate] = useState("");

  useEffect(() => {
    if (data && isEditMode) {
      setTitle(data.title);
      setJobCategory(data.job_category);
      setEmploymentType(data.employment_type);
      setHourlyRate(String(data.hourly_rate));
    }
  }, [data, isEditMode]);

  const handleSave = () => {
    const formPayload = {
      title,
      job_category: jobCategory,
      employment_type: employmentType,
      hourly_rate: Number(hourlyRate),
    };

    if (isEditMode && id) {
      editJobPostingMutation.mutate(
        { id: Number(id), ...formPayload },
        {
          onSuccess: () => {
            alert("수정되었습니다");
            navigate("/job-posting-management");
          },
        }
      );
    } else {
      createJobPostingMutation.mutate(formPayload, {
        onSuccess: () => {
          alert("등록되었습니다");
          navigate("/job-posting-management");
        },
      });
    }
  };

  return (
    <CCard className="mb-4">
      <CCardHeader>{isEditMode ? "공고 수정" : "공고 등록"}</CCardHeader>
      <CCardBody>
        <CForm className="row g-3">
          <CCol xs={12}>
            <CFormLabel>제목 *</CFormLabel>
            <CFormInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목 입력"
            />
          </CCol>

          <CCol xs={12}>
            <CFormLabel>직무 *</CFormLabel>
            <CFormInput
              value={jobCategory}
              onChange={(e) => setJobCategory(e.target.value)}
              placeholder="직무 입력"
            />
          </CCol>

          <CCol xs={12}>
            <CFormLabel>고용형태 *</CFormLabel>
            <CFormSelect
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
            >
              <option value="PARTTIME">파트타임</option>
              <option value="INTERNSHIP">인턴십</option>
            </CFormSelect>
          </CCol>

          <CCol xs={12}>
            <CFormLabel>시급 *</CFormLabel>
            <CFormInput
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
            />
          </CCol>

          <CCol xs={12} className="text-end">
            <CButton
              color="light"
              onClick={() => navigate("/job-posting-management")}
            >
              취소
            </CButton>
            <CButton color="dark" className="ms-2" onClick={handleSave}>
              {isEditMode ? "수정" : "저장"}
            </CButton>
          </CCol>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default JobPostingEditor;
