import { injectable, inject } from "inversify";
import { PrayerTimeRepository } from "../repositories/prayer-time.repository";
import { adjustDateToTimezone } from "../utils/date.util";

@injectable()
export class PrayerService {
  constructor(
    @inject(PrayerTimeRepository)
    private prayerTimeRepo: PrayerTimeRepository
  ) {}

  // async getPrayerTimes(districtId: string, date: Date = new Date()) {
  //   const prayerTimes = await this.prayerTimeRepo.findByDistrictAndDate(
  //     districtId,
  //     date
  //   );

  //   if (!prayerTimes) throw new Error("Namaz vakitleri bulunamadı");

  //   return prayerTimes;
  // }

  
async getPrayerTimesBetweenDates(
  districtId: string,
  startDate: Date,
  endDate: Date,
  skip?: number,
  limit?: number
): Promise<any[]> {
  const adjustedStartDate = adjustDateToTimezone(startDate);
  const adjustedEndDate = adjustDateToTimezone(endDate, "Europe/Istanbul", true);

  return this.prayerTimeRepo.findBetweenDates(
    districtId,
    adjustedStartDate,
    adjustedEndDate,
    skip,
    limit
  );
}

  async countPrayerTimesBetweenDates(
    districtId: string,
    startDate: Date,
    endDate: Date
  ): Promise<number> {
    const filter = {
      district_id: districtId,
      date: { $gte: startDate, $lte: endDate },
    };
    return this.prayerTimeRepo.countDocuments(filter);
  }
  // async getWeeklyPrayerTimes(districtId: string) {
  //   const today = new Date();
  //   const endDate = new Date(today);
  //   endDate.setDate(today.getDate() + 7);
  //   return this.getPrayerTimesBetweenDates(districtId, today, endDate);
  // }

  // async getMonthlyPrayerTimes(districtId: string) {
  //   const today = new Date();
  //   const endDate = new Date(today);
  //   endDate.setMonth(today.getMonth() + 1);
  //   return this.getPrayerTimesBetweenDates(districtId, today, endDate);
  // }

  // async getYearlyPrayerTimes(districtId: string) {
  //   const today = new Date();
  //   const endDate = new Date(today);
  //   endDate.setFullYear(today.getFullYear() + 1);
  //   return this.getPrayerTimesBetweenDates(districtId, today, endDate);
  // }
}
