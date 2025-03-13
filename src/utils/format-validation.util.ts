import * as Joi from "joi";
export const formatValidationErrors = (
  details: Joi.ValidationErrorItem[] | string[]
) => {
  if (Array.isArray(details)) {
    return details.map((detail) => detail.message || detail).join(", ");
  }
  if (typeof details[0] === 'string') {
    return (details as string[]).join(", ");
  }
  throw new Error("Invalid details type");
};
