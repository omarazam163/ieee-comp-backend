import { verfiyToken } from "./../midlewares/veriftToken";
import { Router } from "express";
import { calenderContoller } from "../controllers/Calender.controller";
import { CheckCalender } from "../Schema/calenderScema";

export const calenderRouter = Router();

calenderRouter.post(
  "/update",
  CheckCalender,
  verfiyToken,
  calenderContoller.AddCalenderDay
);

calenderRouter.get(
  "/getAllUserDates",
  verfiyToken,
  calenderContoller.getAllUserDates
);