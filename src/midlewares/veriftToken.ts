import { Request, Response, NextFunction } from "express"
import  Jwt  from "jsonwebtoken"
import { apiKey } from '../models/prismaClient';


export let verfiyToken=(req:Request, res:Response, next:NextFunction) => {
    const token = req.headers["token"];
    if(!token)  res.status(401).json({ status: 401, message: "Access Denied:token not found" }).send();
    else
    {
        try
        {
            const decoded = Jwt.verify(token as string, apiKey as string);
            req.body.user = decoded;
            next();
        }
        catch(err)
        {
            res.status(401).json({ status: 401, message: "Access Denied:invalid token" }).send();
        }
    }
}
