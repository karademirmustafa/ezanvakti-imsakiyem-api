import { PrayerTimePeriods } from "../constants/enums";
import moment from "moment-timezone";


export function calculateDateRange(period: string, startDateStr?: string) {
  const startDate = startDateStr ? new Date(startDateStr) : new Date();
  const endDate = new Date(startDate);

  switch (period) {
    case PrayerTimePeriods.DAILY:
      break;
    case PrayerTimePeriods.WEEKLY:
      endDate.setDate(startDate.getDate() + 7);
      break;
    case PrayerTimePeriods.MONTHLY:
      endDate.setMonth(startDate.getMonth() + 1);
      break;
    case PrayerTimePeriods.YEARLY:
      endDate.setFullYear(startDate.getFullYear() + 1);
      break;
    case PrayerTimePeriods.RANGE:
      break;
    default:
      throw new Error("Invalid period. Allowed values: daily, weekly, monthly, yearly, range.");
  }

  return { startDate, endDate };
}


// Türkiye için varsayılan zaman dilimi
const DEFAULT_TIMEZONE = "Europe/Istanbul";

/**
 * Verilen tarihi belirli bir zaman dilimine çevirir ve günün başlangıç/bitiş saatini ayarlar.
 * @param date - Tarih (string veya Date)
 * @param timezone - Zaman dilimi (opsiyonel, varsayılan Türkiye)
 * @param isEndOfDay - Gün sonu için true, gün başı için false (varsayılan)
 * @returns Ayarlanmış tarih (Date)
 */
export const adjustDateToTimezone = (
  date: Date | string,
  timezone: string = DEFAULT_TIMEZONE,
  isEndOfDay: boolean = false
): Date => {
  if (!date) throw new Error("Geçersiz tarih");

  const momentDate = moment.tz(date, timezone);

  // Eğer gün sonu isteniyorsa 23:59:59.999'a ayarlar
  const adjustedDate = isEndOfDay
    ? momentDate.endOf("day").toDate()
    : momentDate.startOf("day").toDate();

  return adjustedDate;
};
