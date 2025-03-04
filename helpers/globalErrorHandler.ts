import {ErrorRequestHandler} from "express"

export const GlobalErrorHandler : ErrorRequestHandler = (err, req, res, next) => {
    res.status(500).json({status: 500, message: err.message}).send();
}