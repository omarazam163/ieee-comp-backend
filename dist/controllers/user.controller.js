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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const express_validator_1 = require("express-validator");
const prismaClient_1 = require("../models/prismaClient");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let AddNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ status: 400, errors: errors.array()[0].msg }).send();
    }
    else {
        let newUser = req.body;
        yield prismaClient_1.client.user.create({ data: newUser });
        res.status(200).json({ status: 200, message: "success" }).send();
    }
});
let SignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ status: 400, errors: errors.array()[0].msg }).send();
        return;
    }
    let user = yield prismaClient_1.client.user.findFirst({
        where: {
            email: req.body.email,
            password: req.body.password,
        },
    });
    if (user) {
        let token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
            userName: user.userName,
            name: user.name,
        }, prismaClient_1.apiKey, {
            expiresIn: "4days",
        });
        res
            .status(200)
            .json({ status: 200, message: "success", token: token })
            .send();
    }
    else {
        res.status(401).json({ status: 401, message: "unauthorized" }).send();
    }
});
let upddateScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.client.user.update({
        where: {
            id: req.body.user.id,
        },
        data: {
            score: { increment: 1 },
            lastUpdated: new Date(),
        },
    });
    res.status(200).json({ status: 200, message: "success" }).send();
});
let GetUserScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params["id"]) {
        let user = yield prismaClient_1.client.$queryRaw `select * from (
                    select "lastUpdated","score","userName","id","name",
                    cast(rank() over(order by score DESC) as Int) as "rank"  from "User")
                    where id=${req.params["id"]}`;
        if (user.length > 0) {
            [user] = user;
            res.status(200).json({
                status: 200,
                data: {
                    userName: user.userName,
                    name: user.name,
                    lastUpdated: user.lastUpdated,
                    score: user.score,
                    rank: user.rank
                },
            });
        }
        else {
            res.status(404).json({ status: 404, message: "not found" }).send();
        }
    }
    else {
        res.status(404).json({ status: 404, message: "not found" }).send();
    }
});
exports.userController = {
    AddNewUser,
    SignIn,
    upddateScore,
    GetUserScore,
};
//# sourceMappingURL=user.controller.js.map