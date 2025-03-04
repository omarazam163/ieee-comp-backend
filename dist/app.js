"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = require("./routers/user.router");
const leaderBoard_router_1 = require("./routers/leaderBoard.router");
const globalErrorHandler_1 = require("./helpers/globalErrorHandler");
let app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/user", user_router_1.userRouter);
app.use("/leaderboard", leaderBoard_router_1.leaderBoaerdRouter);
let port = 3000;
app.use(globalErrorHandler_1.GlobalErrorHandler);
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
