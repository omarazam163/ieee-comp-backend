"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResult = void 0;
const express_validator_1 = require("express-validator");
const validateResult = (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res
            .status(400)
            .json({ status: 400, errors: errors.array()[0].msg })
            .send();
        return false;
    }
    else {
        return true;
    }
};
exports.validateResult = validateResult;
//# sourceMappingURL=validateResult.js.map