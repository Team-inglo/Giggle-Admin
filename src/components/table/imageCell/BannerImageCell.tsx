import { useState } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CTableDataCell,
} from "@coreui/react";

export default function BannerImageCell({ imageUrl }: { imageUrl: string }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <CTableDataCell className="text-center">
        <CButton color="primary" size="sm" onClick={() => setVisible(true)}>
          대표이미지
        </CButton>
      </CTableDataCell>

      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        size="lg"
        backdrop="static"
        alignment="center"
      >
        <CModalHeader></CModalHeader>
        <CModalBody className="text-center">
          <img
            src={imageUrl}
            alt="대표이미지"
            style={{ maxWidth: "100%", maxHeight: "500px" }}
          />
        </CModalBody>
      </CModal>
    </>
  );
}
