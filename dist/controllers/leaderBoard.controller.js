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
exports.leaderBoardController = void 0;
const prismaClient_1 = require("../models/prismaClient");
let getLeaderBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pageNumber = parseInt(req.params["page"] || '0');
        let pageSize = 10;
        let users = yield prismaClient_1.client.user.findMany({
            take: pageSize,
            skip: pageNumber * pageSize,
            orderBy: {
                score: "desc",
            },
            select: {
                userName: true,
                name: true,
                lastUpdated: true,
                score: true,
            },
        });
        res.status(200).json({ status: 200, data: users }).send();
    }
    catch (err) {
        res.status(404).json({ status: 404, message: "page number is required" }).send();
    }
});
exports.leaderBoardController = { getLeaderBoard };
//# sourceMappingURL=leaderBoard.controller.js.map