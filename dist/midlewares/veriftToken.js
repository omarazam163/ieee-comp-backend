"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verfiyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prismaClient_1 = require("../models/prismaClient");
let verfiyToken = (req, res, next) => {
    const token = req.headers["token"];
    if (!token)
        res.status(401).json({ status: 401, message: "Access Denied:token not found" }).send();
    else {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, prismaClient_1.apiKey);
            req.body.user = decoded;
            next();
        }
        catch (err) {
            res.status(401).json({ status: 401, message: "Access Denied:invalid token" }).send();
        }
    }
};
exports.verfiyToken = verfiyToken;
//# sourceMappingURL=veriftToken.js.map