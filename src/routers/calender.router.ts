import { verfiyToken } from "./../midlewares/veriftToken";
import { Router } from "express";
import { calenderContoller } from "../controllers/Calender.controller";
import { CheckCalender } from "../Schema/calenderScema";
import { body } from "express-validator";

export const calenderRouter = Router();

calenderRouter.post(
  "/update",
  CheckCalender,
  verfiyToken,
  calenderContoller.updateCalenderDay
);

calenderRouter.get(
  "/getAllUserDates",
  verfiyToken,
  calenderContoller.getAllUserDates
);

calenderRouter.get(
  "/getSpecificDate",
  body("date").exists({values:"falsy"}).withMessage("date is required").isDate().withMessage("date is required"),
  verfiyToken,
  calenderContoller.getSpecificDate
);