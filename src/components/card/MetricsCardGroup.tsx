import { CCard, CCardBody, CCol, CRow } from "@coreui/react";

interface MetricCardProps {
  title: string;
  value: number | string;
  comparisonValue: number;
  percentage: number;
  isIncrease?: boolean;
}

const MetricCard = ({
  title,
  value,
  comparisonValue,
  percentage,
  isIncrease = false,
}: MetricCardProps) => {
  const percentageColor = isIncrease ? "text-success" : "text-danger";
  const arrow = isIncrease ? "▲" : "▼";

  return (
    <CCard className="h-100">
      <CCardBody>
        <div className="fw-semibold mb-2">{title}</div>
        <div className="fs-2 fw-bold mb-3">{value.toLocaleString()}</div>
        <div className="d-flex flex-column gap-1 small text-body-secondary">
          <div>
            • 직전 기간 총 가입 수{" "}
            <span className="fw-bold">{comparisonValue}</span>
          </div>
          <div>
            • 직전 기간 대비{" "}
            <span className={`fw-bold ${percentageColor}`}>
              {arrow} {Math.abs(percentage)}%
            </span>
          </div>
        </div>
      </CCardBody>
    </CCard>
  );
};

interface CardGroupProps {
  data: {
    title: string;
    value: number;
    comparisonValue: number;
    percentage: number;
    isIncrease?: boolean;
  }[];
}

const MetricsCardGroup = ({ data }: CardGroupProps) => {
  if (data.length === 1) {
    return <MetricCard {...data[0]} />;
  }

  return (
    <CRow className="g-4">
      {data.map((item, idx) => (
        <CCol md={6} key={idx}>
          <MetricCard {...item} />
        </CCol>
      ))}
    </CRow>
  );
};

export default MetricsCardGroup;
