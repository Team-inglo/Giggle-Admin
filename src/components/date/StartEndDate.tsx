import {
    CCol,
    CFormInput,
    CFormLabel,
} from '@coreui/react'

export default function StartEndDate({
    groupIndex,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
}) {
  return (
    <>
        <CCol md="auto" className="ms-auto d-flex gap-3">
      <div>
        <CFormLabel htmlFor={`start-date-${groupIndex}`}>시작일</CFormLabel>
        <CFormInput
          id={`start-date-${groupIndex}`}
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <CFormLabel htmlFor={`end-date-${groupIndex}`}>종료일</CFormLabel>
        <CFormInput
          id={`end-date-${groupIndex}`}
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
    </CCol>
    </>
  )
}
