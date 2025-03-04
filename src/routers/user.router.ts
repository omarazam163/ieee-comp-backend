import { Router } from "express";
import { body } from "express-validator";
import { userController } from "../controllers/user.controller";
import { uniqueEmail } from "../helpers/uniqueEmail";
import { uniqueUserName } from "../helpers/uniqueUserName";
import { verfiyToken } from "../midlewares/veriftToken";
export const userRouter = Router();

userRouter.post(
  "/register",
  body("name").exists({ checkFalsy: true }).isLength({ min: 3 }),
  body("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .custom(async (email: string) => await uniqueEmail(email)),
  body("password").exists({ checkFalsy: true }).isLength({ min: 6 }),
  body("userName")
    .exists({ checkFalsy: true })
    .isLength({ min: 3 })
    .custom(async (userName: string) => await uniqueUserName(userName)),
  userController.AddNewUser
);

userRouter.post(
  "/login",
  body("email").exists({ checkFalsy: true }).isEmail(),
  body("password").exists({ checkFalsy: true }).isLength({ min: 6 }),
  userController.SignIn
);

userRouter.get("/getScore/:id", userController.GetUserScore);

userRouter.patch("/updatescore", verfiyToken, userController.upddateScore);
