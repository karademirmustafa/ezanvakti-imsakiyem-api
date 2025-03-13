import * as Joi from "joi";
import { MESSAGES } from "../constants/messages.constants";
import { PrayerTimePeriods } from "../constants/enums";

export const prayerTimeValidationSchemas = {
  getPrayerTimes: {
    params: Joi.object({
      districtId: Joi.string().required().messages({
        "string.base": "districtId bir string olmalıdır.",
        "any.required": "districtId zorunludur.",
      }),
      period: Joi.string()
        .valid(...Object.values(PrayerTimePeriods))
        .optional()
        .messages({
          "string.base": "Period bir string olmalıdır.",
          "any.only": "Geçersiz period değeri.",
        }),
    }),
    query: Joi.object({
      date: Joi.date().iso().optional().messages({
        "date.base": MESSAGES.VALIDATION.DATE_BASE,
        "date.format": MESSAGES.VALIDATION.DATE_FORMAT,
      }),
      startDate: Joi.date()
      .iso()
      .messages({
        "date.base": MESSAGES.VALIDATION.START_DATE_BASE,
        "date.format": "Başlangıç tarihi YYYY-MM-DD formatında olmalıdır (örn: 2025-01-01).",
      }),
    endDate: Joi.date()
      .iso()
      .messages({
        "date.base": MESSAGES.VALIDATION.END_DATE_BASE,
        "date.format": "Bitiş tarihi YYYY-MM-DD formatında olmalıdır (örn: 2025-01-31).",
      }),
    page: Joi.number()
      .integer()
      .min(1)
      .optional()
      .messages({
        "number.base": "Sayfa numarası bir sayı olmalıdır.",
        "number.min": "Sayfa numarası en az 1 olmalıdır.",
      }),
    limit: Joi.number()
      .integer()
      .min(1)
      .optional()
      .messages({
        "number.base": "Limit bir sayı olmalıdır.",
        "number.min": "Limit en az 1 olmalıdır.",
      }),
    }),
  },
};
