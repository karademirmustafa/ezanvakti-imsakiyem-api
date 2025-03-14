import { controller, httpGet } from "inversify-express-utils";
import { inject } from "inversify";
import { PrayerService } from "../services/prayer-time.service";
import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { prayerTimeValidationSchemas } from "../validations/prayer-time.validation";
import { validate } from "../middlewares/validation.middleware";
import { MESSAGES } from "../constants/messages.constants";
import { calculateDateRange } from "../utils/date.util";
import { PrayerTimePeriods } from "../constants/enums";

@controller("/api/prayer-times")
export class PrayerTimeController extends BaseController {
  constructor(
    @inject(PrayerService)
    private prayerService: PrayerService
  ) {
    super();
  }

  @httpGet(
    "/:districtId/:period?",
    validate(prayerTimeValidationSchemas.getPrayerTimes)
  )
  async getPrayerTimes(req: Request, res: Response) {
    const { districtId, period } = req.params;

    const startDateQuery = req.query.startDate as string;
    const endDateQuery = req.query.endDate as string;

    let startDate, endDate;

    if (startDateQuery && endDateQuery) {
      startDate = new Date(startDateQuery);
      endDate = new Date(endDateQuery);
    } else if (period === PrayerTimePeriods.RANGE) {
      return res.error("Her ikiside olmak zorunda startDate & endDate", 400);
    } else {
      ({ startDate, endDate } = calculateDateRange(
        period || PrayerTimePeriods.MONTHLY,
        startDateQuery
      ));
    }

    const page = parseInt(req.query.page as string) || null;
    const limit = parseInt(req.query.limit as string) || null;

    let prayerTimes;
    let totalCount;

    if (page && limit) {
      const skip = (page - 1) * limit;
      [prayerTimes, totalCount] = await Promise.all([
        this.prayerService.getPrayerTimesBetweenDates(
          districtId,
          startDate,
          endDate,
          skip,
          limit
        ),
        this.prayerService.countPrayerTimesBetweenDates(
          districtId,
          startDate,
          endDate
        ),
      ]);
      res.paginate(
        prayerTimes,
        totalCount,
        page,
        limit,
        MESSAGES.ENDPOINT.PRAYER_TIMES_FETCHED
      );
    } else {
      prayerTimes = await this.prayerService.getPrayerTimesBetweenDates(
        districtId,
        startDate,
        endDate
      );
      res.success(prayerTimes, MESSAGES.ENDPOINT.PRAYER_TIMES_FETCHED, 200, {
        totalCount: prayerTimes.length,
      });
    }
  }
}
