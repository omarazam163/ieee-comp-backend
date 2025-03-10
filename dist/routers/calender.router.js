"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calenderRouter = void 0;
const veriftToken_1 = require("./../midlewares/veriftToken");
const express_1 = require("express");
const Calender_controller_1 = require("../controllers/Calender.controller");
const calenderScema_1 = require("../Schema/calenderScema");
exports.calenderRouter = (0, express_1.Router)();
exports.calenderRouter.post("/update", calenderScema_1.CheckCalender, veriftToken_1.verfiyToken, Calender_controller_1.calenderContoller.AddCalenderDay);
exports.calenderRouter.get("/getAllUserDates", veriftToken_1.verfiyToken, Calender_controller_1.calenderContoller.getAllUserDates);
//# sourceMappingURL=calender.router.js.map