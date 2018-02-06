export function formatDateTime(datetime) {
  return datetime.split(".")[0].replace("T", " ");
}
