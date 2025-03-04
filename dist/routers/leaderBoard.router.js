"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaderBoaerdRouter = void 0;
const express_1 = require("express");
const leaderBoard_controller_1 = require("../controllers/leaderBoard.controller");
exports.leaderBoaerdRouter = (0, express_1.Router)();
exports.leaderBoaerdRouter.get("/:page", leaderBoard_controller_1.leaderBoardController.getLeaderBoard);
