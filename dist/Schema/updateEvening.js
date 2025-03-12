"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckCalenderEvening = void 0;
const express_validator_1 = require("express-validator");
// Update quraan shcema
exports.CheckCalenderEvening = (0, express_validator_1.checkSchema)({
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
//# sourceMappingURL=updateEvening.js.map