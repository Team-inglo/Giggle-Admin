import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom'
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
} from '@coreui/react';
import HtmlEditor from '@components/html/HtmlEditor';
import { useBannerDetailQuery, useCreateBannerMutation, useEditBannerMutation } from '@apis/banner/banners';

const BannerEditor = () => {
  // id
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isEditMode = !!id;
  const { data, isLoading } = useBannerDetailQuery(id ?? '');

  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('전체');
  const [htmlCode, setHtmlCode] = useState('');
  const [previewHtml, setPreviewHtml] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const createBannerMutation = useCreateBannerMutation();
  const editBannerMutation = useEditBannerMutation();

  // 💡 상세 데이터 들어오면 상태 세팅
  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setTarget(data.role);
      setHtmlCode(data.content);
      setImageUrl(data.img_url); // 서버에서 image_url로 내려온다고 가정
    }
  }, [data]);

  // 생성/수정 메서드
  const handleSave = () => {
    const formPayload = {
      title,
      content: htmlCode,
      role: target,
      image: imageFile, // imageUrl은 미리보기용, imageFile은 실제 등록용
    };

    if (isEditMode) {
      editBannerMutation.mutate(
        { id, ...formPayload },
        {
          onSuccess: () => {
            alert('배너가 수정되었습니다');
            navigate('/banner-management');
          },
        }
      );
    } else {
      createBannerMutation.mutate(formPayload, {
        onSuccess: () => {
          alert('배너가 등록되었습니다');
          navigate('/banner-management');
        },
      });
    }
  }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setImageFile(file); // ✅ 등록용 파일
        const imageUrl = URL.createObjectURL(file);
        setImageUrl(imageUrl); // ✅ 미리보기 용
      }
    };

  const handlePreview = () => {
    setPreviewHtml(htmlCode);
  };

  return (
    <div>
      <CCard className="mb-4">
        <CCardHeader>배너관리</CCardHeader>
        <CCardBody>
          <CForm className="row g-3">
            <CCol xs={12}>
              <CFormLabel>제목 *</CFormLabel>
              <CFormInput
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력해주세요"
              />
            </CCol>

            <CCol xs={12}>
              <CFormLabel>표시 대상 *</CFormLabel>
              <div className="d-flex gap-3">
                {['GUEST', 'USER', 'OWNER'].map((label) => (
                  <CFormCheck
                    key={label}
                    type="radio"
                    name="target"
                    id={`target-${label}`}
                    label={label}
                    checked={target === label}
                    onChange={() => setTarget(label)}
                  />
                ))}
              </div>
            </CCol>

            <CCol xs={12}>
              <CFormLabel>대표이미지 *</CFormLabel>
              <CFormInput type="file" accept="image/*" onChange={handleImageUpload} />
            </CCol>

            <CCol xs={12} className="text-end">
              <CButton 
                color="light"
                onClick={() => navigate('/banner-management')}
              >취소</CButton>
              <CButton 
                color="dark" 
                className="ms-2"
                onClick={handleSave}
                >
                {isEditMode ? "수정" : "저장"}
              </CButton>
              <CButton color="secondary" className="ms-2">
                목록
              </CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>

      <CRow>
        {/* html editor */}
        <CCol md={8}>
        <HtmlEditor htmlCode={htmlCode} setHtmlCode={setHtmlCode} />
        </CCol>

        <CCol md={4}>
          <CCard className="h-100">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <span>미리보기</span>
              <CButton color="light" size="sm" onClick={handlePreview}>
                미리보기
              </CButton>
            </CCardHeader>
            <CCardBody style={{ minHeight: '300px' }}>
              <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
              {imageUrl && <img src={imageUrl} alt="대표이미지" style={{ maxWidth: '100%', marginTop: '1rem' }} />}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default BannerEditor;