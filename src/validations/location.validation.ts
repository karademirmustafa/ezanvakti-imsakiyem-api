import * as Joi from "joi";
import { MESSAGES } from "../constants/messages.constants";
import { LocationTypes } from "../constants/enums";

const searchQuerySchema = Joi.object({
  q: Joi.string().required().min(1).max(50).messages({
    "string.base": MESSAGES.VALIDATION.STRING_BASE,
    "string.empty": MESSAGES.VALIDATION.STRING_EMPTY,
    "string.min": MESSAGES.VALIDATION.STRING_MIN,
    "string.max": MESSAGES.VALIDATION.STRING_MAX,
    "any.required": MESSAGES.VALIDATION.REQUIRED,
  }),
});

 const paramsValidation = Joi.object({
  type: Joi.string()
    .required()
    .valid(...Object.values(LocationTypes))
    .messages({
      "any.required": MESSAGES.VALIDATION.REQUIRED,
      "any.only": MESSAGES.VALIDATION.INVALID_VALUE,
    }),
  id: Joi.string().optional().messages({
    "string.base": MESSAGES.VALIDATION.STRING_BASE,
  }),
});
export const locationValidationSchemas = {
  paramsValidation:{params:paramsValidation},
  searchQueryValidation: { query: searchQuerySchema },
};

