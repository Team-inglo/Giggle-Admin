export default function getFormattedDate(date: Date) {
  return date.toISOString().split("T")[0]; // YYYY-MM-DD 형식
}
