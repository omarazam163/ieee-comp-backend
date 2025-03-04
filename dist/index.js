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
exports.App.use("/api/user", user_router_1.userRouter);
exports.App.use("/api/leaderboard", leaderBoard_router_1.leaderBoaerdRouter);
const PORT = process.env.PORT || 3000;
exports.App.get("/ping", (req, res) => {
    res.send("pong");
});
exports.App.use(globalErrorHandler_1.GlobalErrorHandler);
exports.App.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});
exports.default = exports.App;
//# sourceMappingURL=index.js.map