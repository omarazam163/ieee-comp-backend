"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalErrorHandler = void 0;
const GlobalErrorHandler = (err, req, res, next) => {
    res.status(500).json({ status: 500, message: err.message }).send();
};
exports.GlobalErrorHandler = GlobalErrorHandler;
//# sourceMappingURL=globalErrorHandler.js.map