import { Request, Response, NextFunction } from "express";
import * as Joi from "joi";
import { formatValidationErrors } from "../utils/format-validation.util";
import { ValidationError } from "../errors/validation.error";

interface ValidationSchema {
  query?: Joi.ObjectSchema;
  body?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
}

export function validate(schema: ValidationSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Params doğrulaması
      if (schema.params) {
        const { error: paramsError, value: paramsValue } = schema.params.validate(
          req.params,
          { abortEarly: false, stripUnknown: true }
        );
        if (paramsError) {
          const formattedErrors = formatValidationErrors(paramsError.details);
          throw new ValidationError(
            paramsError.details,
            `Doğrulama hatası: ${formattedErrors}`
          );
        }
        req.params = paramsValue;
      }

      // Query doğrulaması
      if (schema.query) {
        const { error: queryError, value: queryValue } = schema.query.validate(
          req.query,
          { abortEarly: false, stripUnknown: true }
        );
        if (queryError) {
          const formattedErrors = formatValidationErrors(queryError.details);
          throw new ValidationError(
            queryError.details,
            `Doğrulama hatası: ${formattedErrors}`
          );
        }
        req.query = queryValue;
      }

      // Body doğrulaması
      if (schema.body) {
        const { error: bodyError, value: bodyValue } = schema.body.validate(
          req.body,
          { abortEarly: false, stripUnknown: true }
        );
        if (bodyError) {
          const formattedErrors = formatValidationErrors(bodyError.details);
          throw new ValidationError(
            bodyError.details,
            `Doğrulama hatası: ${formattedErrors}`
          );
        }
        req.body = bodyValue;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
