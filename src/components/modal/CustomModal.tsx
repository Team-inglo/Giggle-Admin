import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import React from "react";

export default function CustomModal({ title, content, option, is_calcel }) {
  return (
    <CModal
      visible={deleteModalVisible}
      onClose={() => setDeleteModalVisible(false)}
    >
      <CModalHeader closeButton>
        <CModalTitle>삭제 확인</CModalTitle>
      </CModalHeader>
      <CModalBody>
        선택한 회원을 정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setDeleteModalVisible(false)}>
          취소
        </CButton>
        <CButton color="danger" onClick={handleConfirmDelete}>
          삭제
        </CButton>
      </CModalFooter>
    </CModal>
  );
}
