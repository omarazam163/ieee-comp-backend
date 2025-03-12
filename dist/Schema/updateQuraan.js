"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckCalenderQuraan = void 0;
const express_validator_1 = require("express-validator");
// Update quraan shcema
exports.CheckCalenderQuraan = (0, express_validator_1.checkSchema)({
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
//# sourceMappingURL=updateQuraan.js.map