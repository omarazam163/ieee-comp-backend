"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calenderRouter = void 0;
const veriftToken_1 = require("./../midlewares/veriftToken");
const express_1 = require("express");
const Calender_controller_1 = require("../controllers/Calender.controller");
const updateQuraan_1 = require("../Schema/updateQuraan");
const updateEvening_1 = require("../Schema/updateEvening");
const updateMorning_1 = require("../Schema/updateMorning");
const express_validator_1 = require("express-validator");
exports.calenderRouter = (0, express_1.Router)();
exports.calenderRouter.put("/updateQuraan", updateQuraan_1.CheckCalenderQuraan, veriftToken_1.verfiyToken, Calender_controller_1.calenderContoller.updateDayQuraan);
exports.calenderRouter.put("/updateAzkarMorning", updateMorning_1.CheckCalenderMorning, veriftToken_1.verfiyToken, Calender_controller_1.calenderContoller.updateAzkarMorning);
exports.calenderRouter.put("/updateAzkarEvening", updateEvening_1.CheckCalenderEvening, veriftToken_1.verfiyToken, Calender_controller_1.calenderContoller.updateAzkarEvening);
exports.calenderRouter.get("/getAllUserDates", veriftToken_1.verfiyToken, Calender_controller_1.calenderContoller.getAllUserDates);
exports.calenderRouter.get("/getSpecificDate/:date", veriftToken_1.verfiyToken, Calender_controller_1.calenderContoller.getSpecificDate);
exports.calenderRouter.patch("/updateBookMark", [
    (0, express_validator_1.body)("bookMark")
        .exists()
        .withMessage("bookMark is required")
        .isInt({ min: 1, max: 614 })
        .withMessage("bookMark must be an integer between 1 and 614"),
], veriftToken_1.verfiyToken, Calender_controller_1.calenderContoller.updateBookMark);
exports.calenderRouter.get("/getBookmark", veriftToken_1.verfiyToken, Calender_controller_1.calenderContoller.getBookmark);
//# sourceMappingURL=calender.router.js.map