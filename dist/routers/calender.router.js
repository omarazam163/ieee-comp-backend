"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calenderRouter = void 0;
const veriftToken_1 = require("./../midlewares/veriftToken");
const express_1 = require("express");
const Calender_controller_1 = require("../controllers/Calender.controller");
const calenderScema_1 = require("../Schema/calenderScema");
const express_validator_1 = require("express-validator");
exports.calenderRouter = (0, express_1.Router)();
exports.calenderRouter.post("/update", calenderScema_1.CheckCalender, veriftToken_1.verfiyToken, Calender_controller_1.calenderContoller.updateCalenderDay);
exports.calenderRouter.get("/getAllUserDates", veriftToken_1.verfiyToken, Calender_controller_1.calenderContoller.getAllUserDates);
exports.calenderRouter.get("/getSpecificDate", (0, express_validator_1.body)("date").exists({ values: "falsy" }).withMessage("date is required").isDate().withMessage("date is required"), veriftToken_1.verfiyToken, Calender_controller_1.calenderContoller.getSpecificDate);
//# sourceMappingURL=calender.router.js.map