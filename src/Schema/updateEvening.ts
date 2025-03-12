import { check, checkSchema, Schema } from "express-validator";

// Update quraan shcema
export const CheckCalenderEvening = checkSchema({
  date: {
    exists: { options: { values: "falsy" } },
    isDate: true,
    errorMessage: "date is required",
  },
  eveningAzkar: {
    exists: { options: { values: "null" } },
    isBoolean: true,
    errorMessage: "eveningAzkar is required",
  },
});
