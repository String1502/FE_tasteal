import { LunarDate } from '@nghiavuive/lunar_date_vi';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import unidecode from 'unidecode';

dayjs.extend(utc);

export function removeDiacritics(text: string): string {
  return unidecode(text);
}
export function convertToSnakeCase(text: string): string {
  return text
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/\s+/g, '_')
    .toLowerCase();
}
export function dateTimeToMinutes(value: string | number | Date): number {
  if (typeof value === 'string') {
    const parts = value.split(/[:.]/);
    let totalMinutes = 0;

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
  if (typeof value === 'number') {
    return value;
  }
  if (value instanceof Date) {
    return value.getHours() * 60 + value.getMinutes();
  }
  return 0;
}

export function dateToDDMMYYYY(date: string | Date | undefined): string {
  if (!date) {
    return '';
  }
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const day = formatNumberWithLeadingZero(date.getDate());
  const month = formatNumberWithLeadingZero(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatNumberWithLeadingZero(number: number): string {
  return number < 10 ? `0${number}` : `${number}`;
}

export function convertLunarToSolarDate(lunarDate: Date) {
  const lunarDate_Real = new LunarDate({
    year: lunarDate.getFullYear(),
    month: lunarDate.getMonth() + 1,
    day: lunarDate.getDate(),
  });
  lunarDate_Real.init();

  return new Date(lunarDate_Real.toSolarDate().toDate());
}
