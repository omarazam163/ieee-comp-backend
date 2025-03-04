import { Request, Response } from "express";
import { client } from "../models/prismaClient";
let getLeaderBoard = async (req: Request, res: Response) => {
    let pageNumber:number = parseInt(req.params["page"]||'0');
    let pageSize= 10;
    let users = await client.user.findMany({
        take:pageSize,
        skip:pageNumber*pageSize,
        orderBy: {
            score: "desc",
        },
        select: {
            userName: true,
            name: true,
            lastUpdated: true,
            score: true,
        },
    })
    res.status(200).json({ status: 200, data: users }).send();
};


export const leaderBoardController = { getLeaderBoard };