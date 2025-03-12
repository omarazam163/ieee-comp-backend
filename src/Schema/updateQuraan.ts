import { check, checkSchema, Schema } from "express-validator";

// Update quraan shcema
export const CheckCalenderQuraan = checkSchema({
  date: {
    exists: { options: { values: "falsy" } },
    isDate: true,
    errorMessage: "date is required",
  },
  startPage: {
    exists: { options: { values: "falsy" } },
    isInt: { options: { min: 1, max: 614 } },
    errorMessage: "startPage is required",
  },
  endPage: {
    exists: { options: { values: "falsy" } },
    isInt: { options: { min: 1, max: 614 } },
    errorMessage: "endPage is required",
    custom: {
      options: (value: number, { req }) => {
        if (value < req.body.startPage) {
          throw new Error("endPage should be greater than startPage");
        }
        return true;
      },
    },
  }
});

