import { BaseRepository } from './base.repository';
import PrayerTime, { IPrayerTime } from '../models/prayer-time.model';

export class PrayerTimeRepository extends BaseRepository<IPrayerTime> {
  constructor() {
    super(PrayerTime);
  }

  async findByDistrictAndDate(districtId: string, date: Date) {
    return this.model.findOne({
      district_id: districtId,
      date: {
        $gte: new Date(date.setHours(0, 0, 0, 0)),
        $lt: new Date(date.setHours(23, 59, 59, 999))
      }
    }).lean();
  }
  async findBetweenDates(districtId: string, startDate: Date, endDate: Date, skip?: number, limit?: number): Promise<IPrayerTime[]> {
    return this.model.find({
      district_id: districtId,
      date: { $gte: startDate, $lte: endDate },
    })
      .populate({
        path: 'district_id',
        populate: [
          { path: 'state_id' },
          { path: 'country_id' },
        ],
      })
      .sort({ date: 1 })
      .skip(skip || 0)
      .limit(limit || 0)
      .lean();
  }

  countBetweenDates(districtId: string, startDate: Date, endDate: Date): Promise<number> {
    return this.model.countDocuments({
      district_id: districtId,
      date: { $gte: startDate, $lte: endDate },
    }).exec();
  }
}