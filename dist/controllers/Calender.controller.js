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
exports.calenderContoller = void 0;
const prismaClient_1 = require("../models/prismaClient");
const validateResult_1 = require("../helpers/validateResult");
let updateCalenderDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(0, validateResult_1.validateResult)(req, res))
            return;
        if (!(yield DateExists(req.body.date))) {
            yield prismaClient_1.client.days.create({
                data: {
                    Date: new Date(req.body.date),
                },
            });
        }
        yield prismaClient_1.client.userDays.upsert({
            where: {
                userId_DayId: {
                    DayId: new Date(req.body.date),
                    userId: req.body.user.id,
                },
            },
            update: {
                endPage: req.body.endPage,
                morningAzkar: req.body.morningAzkar,
                eveningAzkar: req.body.eveningAzkar,
            },
            create: {
                userId: req.body.user.id,
                DayId: new Date(req.body.date),
                endPage: req.body.endPage,
                startPage: req.body.startPage,
            },
        });
        yield prismaClient_1.client.user.update({
            where: {
                id: req.body.user.id
            },
            data: {
                lastUpdated: new Date(),
                lastPage: req.body.endPage
            }
        });
        res.status(200).json({ status: 200, message: "success" }).send();
    }
    catch (err) {
        res.status(500).json({ status: 500, message: err.message }).send();
    }
});
const DateExists = (date) => __awaiter(void 0, void 0, void 0, function* () {
    let day = yield prismaClient_1.client.days.findFirst({
        where: {
            Date: new Date(date),
        },
    });
    return day ? true : false;
});
const getAllUserDates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let Days = yield prismaClient_1.client.user.findFirst({
        where: {
            id: req.body.user.id
        },
        select: {
            id: true,
            userName: true,
            UserDays: {
                select: {
                    DayId: true,
                    startPage: true,
                    endPage: true,
                    eveningAzkar: true,
                    morningAzkar: true
                }
            }
        }
    });
    res.status(200).json(Days).send();
});
exports.calenderContoller = { AddCalenderDay: updateCalenderDay, getAllUserDates };
//# sourceMappingURL=Calender.controller.js.map