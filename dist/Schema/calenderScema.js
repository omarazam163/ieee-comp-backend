"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckCalender = void 0;
const express_validator_1 = require("express-validator");
exports.CheckCalender = (0, express_validator_1.checkSchema)({
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
            options: (value, { req }) => {
                if (value < req.body.startPage) {
                    throw new Error("endPage should be greater than startPage");
                }
                return true;
            },
        },
    },
    morningAzkar: {
        exists: { options: { values: "null" } },
        isBoolean: true,
        errorMessage: "morningAzkar is required",
    },
    eveningAzkar: {
        exists: { options: { values: "null" } },
        isBoolean: true,
        errorMessage: "eveningAzkar is required",
    },
});
//# sourceMappingURL=calenderScema.js.map