import { verfiyToken } from "./../midlewares/veriftToken";
import { Router } from "express";
import { calenderContoller } from "../controllers/Calender.controller";
import { CheckCalenderQuraan } from "../Schema/updateQuraan";
import { CheckCalenderEvening } from "../Schema/updateEvening";
import { CheckCalenderMorning } from "../Schema/updateMorning";
import { body } from "express-validator";

export const calenderRouter = Router();

calenderRouter.put(
  "/updateQuraan",
  CheckCalenderQuraan,
  verfiyToken,
  calenderContoller.updateDayQuraan
);

calenderRouter.put(
  "/updateAzkarMorning",
  CheckCalenderMorning,
  verfiyToken,
  calenderContoller.updateAzkarMorning
);

calenderRouter.put(
  "/updateAzkarEvening",
  CheckCalenderEvening,
  verfiyToken,
  calenderContoller.updateAzkarEvening
);

calenderRouter.get(
  "/getAllUserDates",
  verfiyToken,
  calenderContoller.getAllUserDates
);

calenderRouter.get(
  "/getSpecificDate/:date",
  verfiyToken,
  calenderContoller.getSpecificDate
);

calenderRouter.patch(
  "/updateBookMark",
  [
    body("bookMark")
      .exists()
      .withMessage("bookMark is required")
      .isInt({ min: 1, max: 614 })
      .withMessage("bookMark must be an integer between 1 and 614"),
  ],
  verfiyToken,
  calenderContoller.updateBookMark
);

calenderRouter.get("/getBookmark", verfiyToken, calenderContoller.getBookmark);
