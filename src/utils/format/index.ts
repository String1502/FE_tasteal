import unidecode from "unidecode";

export function removeDiacritics(text: string): string {
  return unidecode(text);
}

export function dateTimeToMinutes(value: string | number): number {
  if (typeof value === "number") {
    return value;
  }
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

export function dateToDDMMYYYY(date: Date | undefined): string {
  if (!date) {
    return "";
  }
  const day = formatNumberWithLeadingZero(date.getDate());
  const month = formatNumberWithLeadingZero(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatNumberWithLeadingZero(number: number): string {
  return number < 10 ? `0${number}` : `${number}`;
}
