"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_controller_1 = require("../controllers/user.controller");
const uniqueEmail_1 = require("../helpers/uniqueEmail");
const uniqueUserName_1 = require("../helpers/uniqueUserName");
const veriftToken_1 = require("../midlewares/veriftToken");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/register", (0, express_validator_1.body)("name").exists({ checkFalsy: true }).isLength({ min: 3 }), (0, express_validator_1.body)("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .custom((email) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, uniqueEmail_1.uniqueEmail)(email); })), (0, express_validator_1.body)("password").exists({ checkFalsy: true }).isLength({ min: 6 }), (0, express_validator_1.body)("userName")
    .exists({ checkFalsy: true })
    .isLength({ min: 3 })
    .custom((userName) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, uniqueUserName_1.uniqueUserName)(userName); })), user_controller_1.userController.AddNewUser);
exports.userRouter.post("/login", (0, express_validator_1.body)("email").exists({ values: "falsy" }).withMessage("email is required").isEmail().withMessage("email is required"), (0, express_validator_1.body)("password").exists({ values: "falsy" }).withMessage("password is required")
    .isLength({ min: 6 }).withMessage("password is required"), user_controller_1.userController.SignIn);
exports.userRouter.get("/getScore/:id", user_controller_1.userController.GetUserScore);
exports.userRouter.patch("/updatescore", veriftToken_1.verfiyToken, user_controller_1.userController.updateScore);
//# sourceMappingURL=user.router.js.map