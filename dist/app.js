"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const user_router_1 = require("./routers/user.router");
const leaderBoard_router_1 = require("./routers/leaderBoard.router");
const globalErrorHandler_1 = require("./helpers/globalErrorHandler");
exports.App = (0, express_1.default)();
exports.App.use(express_1.default.json());
exports.App.use("/user", user_router_1.userRouter);
exports.App.use("/leaderboard", leaderBoard_router_1.leaderBoaerdRouter);
let port = 3000;
exports.App.use(globalErrorHandler_1.GlobalErrorHandler);
exports.App.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
