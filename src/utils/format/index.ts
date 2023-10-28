import unidecode from "unidecode";

export function removeDiacritics(text: string): string {
  return unidecode(text);
}

export function dateTimeToMinutes(value: string): number {
  var parts = value.split(/[:.]/);
  var totalMinutes = 0;

  if (parts.length === 3) {
    // Đối với định dạng "hh:mm:ss"
    totalMinutes =
      parseInt(parts[0]) * 60 + parseInt(parts[1]) + parseInt(parts[2]) / 60;
  } else if (parts.length === 4) {
    // Đối với định dạng "dd.hh:mm:ss"
    totalMinutes =
      parseInt(parts[0]) * 24 * 60 +
      parseInt(parts[1]) * 60 +
      parseInt(parts[2]) +
      parseInt(parts[3]) / 60;
  } else {
    // Chuỗi không hợp lệ
    return 0;
  }
  return Math.round(totalMinutes);
}
