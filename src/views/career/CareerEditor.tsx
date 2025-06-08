import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CButton,
} from "@coreui/react";
import {
  useCareerDetailQuery,
  useCreateCareerMutation,
  useUpdateCareerMutation,
} from "@apis/career_posting/career_postings";

export default function CareerEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const { data, isLoading } = useCareerDetailQuery(id ?? "", isEditMode);
  const updateMutation = useUpdateCareerMutation(); // 수정
  const createMutation = useCreateCareerMutation();

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [form, setForm] = useState({
    title: "",
    career_category: "ACTIVITY",
    host_name: "",
    organizer_name: "",
    address: "",
    recruitment_start_date: "",
    recruitment_end_date: "",
    reward: 0,
    visa: [] as string[],
    recruitment_number: 0,
    education: "BACHELOR",
    preferred_conditions: "",
    details: "",
    application_url: "",
  });

  const handleChange = (key: keyof typeof form, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (data && isEditMode) {
      setForm({
        title: data.title,
        career_category: data.career_category ?? "ACTIVITY",
        host_name: data.host_name ?? "",
        organizer_name: data.organizer_name ?? "",
        address: data.address ?? "",
        recruitment_start_date: data.recruitment_start_date ?? "",
        recruitment_end_date: data.recruitment_end_date ?? "",
        reward: data.reward ?? 0,
        visa: data.visa ?? [],
        recruitment_number: data.recruitment_number ?? 0,
        education: data.education ?? "BACHELOR",
        preferred_conditions: data.preferred_conditions ?? "",
        details: data.details ?? "",
        application_url: data.application_url ?? "",
      });
    }
  }, [data, isEditMode]);

  const validateForm = () => {
    if (!form.title.trim()) return "제목을 입력해주세요.";
    if (!form.career_category) return "카테고리를 선택해주세요.";
    if (!form.education) return "학력을 선택해주세요.";
    if (!form.details.trim()) return "상세 내용을 입력해주세요.";
    if (!form.application_url.trim()) return "지원 링크를 입력해주세요.";
    if (!form.recruitment_start_date) return "모집 시작일을 선택해주세요.";
    if (!form.recruitment_end_date) return "모집 종료일을 선택해주세요.";
    if (
      new Date(form.recruitment_start_date) >
      new Date(form.recruitment_end_date)
    )
      return "모집 시작일은 모집 종료일보다 앞서야 합니다.";
    if (form.reward < 0) return "보상 금액은 0 이상이어야 합니다.";
    if (form.recruitment_number < 0) return "모집 인원은 0 이상이어야 합니다.";
    if (form.visa.length === 0) return "하나 이상의 비자 유형을 선택해주세요.";
    return null;
  };

  const handleSave = () => {
    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }

    const payload = {
      ...form,
      image: imageFiles,
    };

    if (isEditMode && id) {
      updateMutation.mutate(
        { data: payload, id }, // ✅ 객체 형태로 전달해야 함
        {
          onSuccess: () => {
            alert("커리어 수정 완료");
            navigate("/career-management");
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          alert("커리어 등록 완료");
          navigate("/career-management");
        },
      });
    }
  };

  return (
    <CCard className="mb-4">
      <CCardHeader>{isEditMode ? "수정" : "등록"}</CCardHeader>
      <CCardBody>
        <CForm className="row g-3">
          <CCol xs={12}>
            <CFormLabel>제목 *</CFormLabel>
            <CFormInput
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
            />
          </CCol>

          <CCol xs={12}>
            <CFormLabel>카테고리 *</CFormLabel>
            <CFormSelect
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              required
            >
              <option value="">선택</option>
              <option value="ACTIVITY">ACTIVITY</option>
              <option value="PROGRAM">PROGRAM</option>
              <option value="CONTEST">CONTEST</option>
              <option value="CLUB">CLUB</option>
            </CFormSelect>
          </CCol>

          <CCol xs={6}>
            <CFormLabel>주최</CFormLabel>
            <CFormInput
              value={form.host_name}
              onChange={(e) => handleChange("host_name", e.target.value)}
            />
          </CCol>
          <CCol xs={6}>
            <CFormLabel>주관</CFormLabel>
            <CFormInput
              value={form.organizer_name}
              onChange={(e) => handleChange("organizer_name", e.target.value)}
            />
          </CCol>

          <CCol xs={12}>
            <CFormLabel>주소</CFormLabel>
            <CFormInput
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </CCol>

          <CCol xs={6}>
            <CFormLabel>모집 시작일</CFormLabel>
            <CFormInput
              type="date"
              value={form.recruitment_start_date}
              onChange={(e) =>
                handleChange("recruitment_start_date", e.target.value)
              }
            />
          </CCol>
          <CCol xs={6}>
            <CFormLabel>모집 종료일</CFormLabel>
            <CFormInput
              type="date"
              value={form.recruitment_end_date}
              onChange={(e) =>
                handleChange("recruitment_end_date", e.target.value)
              }
            />
          </CCol>

          <CCol xs={6}>
            <CFormLabel>보상 (원)</CFormLabel>
            <CFormInput
              type="number"
              value={form.reward}
              onChange={(e) => handleChange("reward", Number(e.target.value))}
            />
          </CCol>

          <CCol xs={6}>
            <CFormLabel>모집 인원</CFormLabel>
            <CFormInput
              type="number"
              value={form.recruitment_number}
              onChange={(e) =>
                handleChange("recruitment_number", Number(e.target.value))
              }
            />
          </CCol>

          <CCol xs={12}>
            <CFormLabel>비자 유형</CFormLabel>
            <div className="d-flex flex-wrap gap-2">
              {[
                "D_2_1",
                "D_2_2",
                "D_2_3",
                "D_2_4",
                "D_2_6",
                "D_2_7",
                "D_2_8",
                "D_4_1",
                "D_4_7",
                "D_2",
                "D_4",
                "D_10",
                "C_4",
                "F_2",
                "F_4",
                "F_5",
                "F_6",
                "H_1",
              ].map((visa) => (
                <CFormCheck
                  key={visa}
                  label={visa}
                  value={visa}
                  checked={form.visa.includes(visa)}
                  onChange={(e) => {
                    const value = e.target.value;
                    handleChange(
                      "visa",
                      form.visa.includes(value)
                        ? form.visa.filter((v) => v !== value)
                        : [...form.visa, value]
                    );
                  }}
                />
              ))}
            </div>
          </CCol>

          <CCol xs={12}>
            <CFormLabel>학력 *</CFormLabel>
            <CFormSelect
              value={form.education}
              onChange={(e) => handleChange("education", e.target.value)}
              required
            >
              <option value="">선택</option>
              <option value="HIGHSCHOOL">고등학교</option>
              <option value="ASSOCIATE">전문학사</option>
              <option value="BACHELOR">학사</option>
            </CFormSelect>
          </CCol>

          <CCol xs={12}>
            <CFormLabel>우대 조건</CFormLabel>
            <CFormInput
              value={form.preferred_conditions}
              onChange={(e) =>
                handleChange("preferred_conditions", e.target.value)
              }
            />
          </CCol>

          <CCol xs={12}>
            <CFormLabel>상세 내용</CFormLabel>
            <CFormTextarea
              value={form.details}
              onChange={(e) => handleChange("details", e.target.value)}
              rows={5}
            />
          </CCol>

          <CCol xs={12}>
            <CFormLabel>지원 링크</CFormLabel>
            <CFormInput
              value={form.application_url}
              onChange={(e) => handleChange("application_url", e.target.value)}
            />
          </CCol>

          <CCol xs={12}>
            <CFormLabel>이미지 업로드</CFormLabel>
            <CFormInput
              type="file"
              multiple
              onChange={(e) => setImageFiles(Array.from(e.target.files ?? []))}
            />
          </CCol>

          <CCol xs={12} className="text-end">
            <CButton
              color="light"
              onClick={() => navigate("/career-management")}
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
}
