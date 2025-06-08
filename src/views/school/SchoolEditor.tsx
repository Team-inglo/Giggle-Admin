import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CFormInput,
  CFormLabel,
  CFormCheck,
  CButton,
  CCol,
  CRow,
  CForm,
} from "@coreui/react";
import {
  useCreateSchoolMutation,
  useEditSchoolMutation,
  useSchoolDetailQuery,
} from "@apis/school/schools";

const SchoolEditor = () => {
  // id
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isEditMode = !!id;
  const { data, isLoading } = useSchoolDetailQuery(id ?? "");

  const createSchoolMutation = useCreateSchoolMutation();
  const editSchoolMutation = useEditSchoolMutation();

  const [schoolName, setSchoolName] = useState("");
  const [schoolPhoneNumber, setSchoolPhoneNumber] = useState("");
  const [isMetropolitan, setIsMetropolitan] = useState(false);
  const [instituteName, setInstituteName] = useState("");
  const [coordinatorName, setCoordinatorName] = useState("");
  const [coordinatorPhoneNumber, setCoordinatorPhoneNumber] = useState("");

  const [address, setAddress] = useState({
    address_name: "",
    region_1depth_name: "",
    region_2depth_name: "",
    region_3depth_name: "",
    region_4depth_name: "",
    address_detail: "",
    longitude: 0,
    latitude: 0,
  });

  // 💡 상세 데이터 들어오면 상태 세팅
  useEffect(() => {
    if (data) {
      setSchoolName(data.school_name);
      setSchoolPhoneNumber(data.school_phone_number);
      setIsMetropolitan(data.is_metropolitan);
      setInstituteName(data.institute_name);
      setCoordinatorName(data.coordinator_name);
      setCoordinatorPhoneNumber(data.coordinator_phone_number);

      setAddress({
        address_name: data.address.address_name,
        region_1depth_name: data.address.region_1depth_name,
        region_2depth_name: data.address.region_2depth_name,
        region_3depth_name: data.address.region_3depth_name,
        region_4depth_name: data.address.region_4depth_name ?? "",
        address_detail: data.address.address_detail,
        longitude: data.address.longitude,
        latitude: data.address.latitude,
      });
    }
  }, [data]);

  // 생성/수정 메서드
  const handleSave = () => {
    const formPayload: SchoolRequest = {
      school_name: schoolName,
      school_phone_number: schoolPhoneNumber,
      is_metropolitan: isMetropolitan,
      institute_name: instituteName,
      coordinator_name: coordinatorName,
      coordinator_phone_number: coordinatorPhoneNumber,
      address,
    };

    if (isEditMode && id) {
      editSchoolMutation.mutate(
        { id, ...formPayload },
        {
          onSuccess: () => {
            alert("학교 정보가 수정되었습니다");
            navigate("/school-management");
          },
        }
      );
    } else {
      createSchoolMutation.mutate(formPayload, {
        onSuccess: () => {
          alert("학교가 등록되었습니다");
          navigate("/school-management");
        },
      });
    }
  };

  return (
    <div>
      <CCard className="mb-4">
        <CCardHeader>학교관리</CCardHeader>
        <CCardBody>
          <CForm className="row g-3">
            <CCol xs={12}>
              <CFormLabel>제목 *</CFormLabel>
              <CFormInput
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="학교명을 입력해주세요"
              />
            </CCol>

            <CCol xs={12}>
              <CFormLabel>학교전화번호 *</CFormLabel>
              <CFormInput
                type="text"
                value={schoolPhoneNumber}
                onChange={(e) => setSchoolPhoneNumber(e.target.value)}
                placeholder="010-0000-0000"
              />
            </CCol>

            <CCol xs={12}>
              <CFormLabel>수도권/비수도권 *</CFormLabel>
              <div className="d-flex gap-3">
                {[
                  { label: "수도권", value: true },
                  { label: "비수도권", value: false },
                ].map(({ label, value }) => (
                  <CFormCheck
                    key={label}
                    type="radio"
                    name="isMetropolitan"
                    id={`metropolitan-${label}`}
                    label={label}
                    checked={isMetropolitan === value}
                    onChange={() => setIsMetropolitan(value)}
                  />
                ))}
              </div>
            </CCol>

            <CCol xs={12}>
              <CFormLabel>외국인 담당센터 기관명 *</CFormLabel>
              <CFormInput
                type="text"
                value={instituteName}
                onChange={(e) => setInstituteName(e.target.value)}
                placeholder="기관명을 입력해주세요"
              />
            </CCol>

            <CCol xs={12}>
              <CFormLabel>외국인 담당센터 담당자명 *</CFormLabel>
              <CFormInput
                type="text"
                value={coordinatorName}
                onChange={(e) => setCoordinatorName(e.target.value)}
                placeholder="담당자명을 입력해주세요"
              />
            </CCol>

            <CCol xs={12}>
              <CFormLabel>외국인 담당센터 번호 *</CFormLabel>
              <CFormInput
                type="text"
                value={coordinatorPhoneNumber}
                onChange={(e) => setCoordinatorPhoneNumber(e.target.value)}
                placeholder="번호를 입력해주세요"
              />
            </CCol>

            <CCol xs={12}>
              <CFormLabel>외국인 담당센터 주소 *</CFormLabel>
            </CCol>

            <CCol xs={12} className="text-end">
              <CButton
                color="light"
                onClick={() => navigate("/school-management")}
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
    </div>
  );
};

export default SchoolEditor;
