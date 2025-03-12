"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckCalenderMorning = void 0;
const express_validator_1 = require("express-validator");
// Update quraan shcema
exports.CheckCalenderMorning = (0, express_validator_1.checkSchema)({
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
//# sourceMappingURL=updateMorning.js.map