import { Response } from "express";
import "../types/express";
import { MESSAGES } from "../constants/messages.constants";
import { buildPaginationQuery } from "../utils/query.util";

export function extendResponse() {
  return (req: any, res: Response, next: any) => {
    // Başarılı yanıt için success metodu
    res.success = function (
      data: any = null,
      message: string = MESSAGES.RESPONSE.SUCCESS,
      statusCode: number = 200,
      meta: any = {}
    ) {
      this.status(statusCode).json({
        success: true,
        code:statusCode,
        message: message,
        data: data,
        meta,
      });
    };

    // Pagination desteği için paginate metodu
    res.paginate = function (
      data: any[] = [],
      totalCount: number,
      page: number,
      limit: number,
      message: string = MESSAGES.RESPONSE.SUCCESS,
      statusCode: number = 200
    ) {
      const totalPages = Math.ceil(totalCount / limit);
      this.status(statusCode).json({
        success: true,
        code: statusCode,
        message: message,
        data: data,
        meta: {
          pagination: {
            currentPage: page,
            totalPages: totalPages,
            totalItems: totalCount,
            nextPage:
              page < totalPages
                ? `${req.originalUrl.split("?")[0]}?${buildPaginationQuery(req.query, page + 1, limit)}`
                : null,
            prevPage:
              page > 1
                ? `${req.originalUrl.split("?")[0]}?${buildPaginationQuery(req.query, page - 1, limit)}`
                : null,
          },
        },
      });
      
    };

    // Hata yanıtı için error metodu
    res.error = function (
      message: string = MESSAGES.ERROR.INTERNAL_SERVER_ERROR,
      statusCode: number = 500,
      details?: any
    ) {
      this.status(statusCode).json({
        success: false,
        message: message,
        error: {
          code: statusCode,
          details: details || "No additional details available",
        },
      });
    };

    // Doğrulama hatası yanıtı
    res.validationError = function (
      errors: any[],
      message: string = MESSAGES.ERROR.VALIDATION_FAILED
    ) {
      this.status(400).json({
        success: false,
        code:400,
        message: message,
        errors: errors,
      });
    };

    // Yetkilendirme hatası yanıtı
    res.unauthorized = function (
      message: string = MESSAGES.ERROR.UNAUTHORIZED
    ) {
      this.status(401).json({
        success: false,
        code:401,
        message: message,
      });
    };

    // Kaynak bulunamadı yanıtı
    res.notFound = function (message: string = MESSAGES.ERROR.NOT_FOUND) {
      this.status(404).json({
        success: false,
        code:404,
        message: message,
      });
    };

    // Çakışma hatası yanıtı
    res.conflict = function (message: string = MESSAGES.ERROR.CONFLICT) {
      this.status(409).json({
        success: false,
        code:409,
        message: message,
      });
    };
    // Rate limit hatası yanıtı
    res.rateLimitExceeded = function () {
      this.status(429).json({
        success: false,
        code:429,
        message: MESSAGES.ERROR.RATE_LIMIT_EXCEEDED,
      });
    };

    next();
  };
}
