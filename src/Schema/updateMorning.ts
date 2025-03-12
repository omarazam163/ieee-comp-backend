import { check, checkSchema, Schema } from "express-validator";

// Update quraan shcema
export const CheckCalenderMorning = checkSchema({
  date: {
    exists: { options: { values: "falsy" } },
    isDate: true,
    errorMessage: "date is required",
  },
  morningAzkar: {
    exists: { options: { values: "null" } },
    isBoolean: true,
    errorMessage: "morningAzkar is required",
  }
});
