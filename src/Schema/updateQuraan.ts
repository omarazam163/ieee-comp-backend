import { check, checkSchema, Schema } from "express-validator";

// Update quraan shcema
export const CheckCalenderQuraan = checkSchema({
  date: {
    exists: { options: { values: "falsy" } },
    isDate: true,
    errorMessage: "date is required",
  },
  numberOfPages: {
    exists: { options: { values: "falsy" } },
    isInt: { options: { min: 1, max: 604 } },
    errorMessage: "numberOfPages is required",
  },
});

