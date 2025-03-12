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
let updateDayQuraan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(0, validateResult_1.validateResult)(req, res))
            return;
        let theDateNorm = new Date(req.body.date + "T00:00:00"); // Forces local time interpretation
        theDateNorm.setHours(12, 0, 0, 0);
        yield DateExists(theDateNorm);
        yield prismaClient_1.client.userDays.upsert({
            where: {
                userId_DayId: {
                    DayId: theDateNorm,
                    userId: req.body.user.id,
                },
            },
            update: {
                startPage: req.body.startPage,
                endPage: req.body.endPage,
            },
            create: {
                userId: req.body.user.id,
                DayId: theDateNorm,
                endPage: req.body.endPage,
                startPage: req.body.startPage,
            },
        });
        yield prismaClient_1.client.user.update({
            where: {
                id: req.body.user.id,
            },
            data: {
                lastUpdated: new Date(),
                lastPage: req.body.endPage,
            },
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
            Date: date,
        },
    });
    if (!day) {
        yield prismaClient_1.client.days.create({
            data: {
                Date: date,
            },
        });
    }
});
let updateAzkarMorning = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //check for errors and nomlize dater
        if (!(0, validateResult_1.validateResult)(req, res))
            return;
        let theDateNorm = new Date(req.body.date);
        theDateNorm.setHours(12, 0, 0, 0);
        DateExists(theDateNorm);
        //adds the DayUser if not exist
        yield prismaClient_1.client.userDays.upsert({
            where: {
                userId_DayId: {
                    DayId: theDateNorm,
                    userId: req.body.user.id,
                },
            },
            update: {
                morningAzkar: req.body.morningAzkar,
            },
            create: {
                userId: req.body.user.id,
                DayId: theDateNorm,
                morningAzkar: req.body.morningAzkar,
            },
        });
        res.status(200).json({ status: 200, message: "success" }).send();
    }
    catch (err) {
        res.status(500).json({ status: 500, message: err.message }).send();
    }
});
let updateAzkarEvening = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //check for errors and nomlize dater
        if (!(0, validateResult_1.validateResult)(req, res))
            return;
        let theDateNorm = new Date(req.body.date);
        theDateNorm.setHours(12, 0, 0, 0);
        DateExists(theDateNorm);
        //adds the DayUser if not exist
        yield prismaClient_1.client.userDays.upsert({
            where: {
                userId_DayId: {
                    DayId: theDateNorm,
                    userId: req.body.user.id,
                },
            },
            update: {
                eveningAzkar: req.body.eveningAzkar,
            },
            create: {
                userId: req.body.user.id,
                DayId: theDateNorm,
                eveningAzkar: req.body.eveningAzkar,
            },
        });
        res.status(200).json({ status: 200, message: "success" }).send();
    }
    catch (err) {
        res.status(500).json({ status: 500, message: err.message }).send();
    }
});
const getAllUserDates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let Days = yield prismaClient_1.client.user.findFirst({
        where: {
            id: req.body.user.id,
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
                    morningAzkar: true,
                },
            },
        },
    });
    res.status(200).json(Days).send();
});
const getSpecificDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let theDateNorm = new Date(req.body.date);
        theDateNorm.setHours(12, 0, 0, 0);
        if (!(0, validateResult_1.validateResult)(req, res))
            return;
        const day = yield prismaClient_1.client.userDays.findUnique({
            where: {
                userId_DayId: {
                    userId: req.body.user.id,
                    DayId: theDateNorm,
                },
            },
        });
        if (day)
            res.status(200).json({ message: "success", data: day }).send();
        else {
            yield prismaClient_1.client.days.upsert({
                where: {
                    Date: theDateNorm,
                },
                update: {},
                create: {
                    Date: theDateNorm,
                },
            });
            const newDay = yield prismaClient_1.client.userDays.create({
                data: {
                    userId: req.body.user.id,
                    DayId: new Date(req.body.date),
                },
            });
            res.status(200).json({ message: "success", data: newDay });
        }
    }
    catch (err) {
        res.status(500).json({ status: 500, message: err.message }).send();
    }
});
const updateBookMark = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(0, validateResult_1.validateResult)(req, res))
            return;
        console.log(req.body.bookMark);
        yield prismaClient_1.client.user.update({
            where: {
                id: req.body.user.id,
            },
            data: {
                lastUpdated: new Date(),
                bookMark: req.body.bookMark,
            },
        });
        res.status(200).json({ status: 200, message: "success" }).send();
    }
    catch (err) {
        res.status(500).json({ status: 500, message: err.message }).send();
    }
});
const getBookmark = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(0, validateResult_1.validateResult)(req, res))
            return;
        const data = yield prismaClient_1.client.user.findUnique({
            where: {
                id: req.body.user.id,
            },
            select: {
                bookMark: true,
            },
        });
        res.status(200).json({ status: 200, data: data }).send();
    }
    catch (err) {
        res.status(500).json({ status: 500, message: err.message }).send();
    }
});
exports.calenderContoller = {
    updateDayQuraan,
    getAllUserDates,
    getSpecificDate,
    updateAzkarMorning,
    updateAzkarEvening,
    updateBookMark,
    getBookmark,
};
//# sourceMappingURL=Calender.controller.js.map