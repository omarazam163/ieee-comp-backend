import { Request, Response } from "express";
import { Iuser } from "../models/user.model";
import { validationResult } from "express-validator";
import { client,apiKey } from "../models/prismaClient";
import Jwt from "jsonwebtoken";
import {validateResult} from "../helpers/validateResult"
let AddNewUser = async (req: Request, res: Response) => {
  if (!validateResult(req, res)) return;
  let newUser: Iuser = req.body;
  await client.user.create({ data: newUser });
  res.status(200).json({ status: 200, message: "success" }).send();
};

let SignIn = async (req: Request, res: Response) => {
  if (!validateResult(req, res)) return;
  let user = await client.user.findFirst({
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  });
  if (user) {
    let token = Jwt.sign(
      {
        id: user.id,
        email: user.email,
        userName: user.userName,
        name: user.name,
      },
      apiKey as string,
      {
        expiresIn: "4days",
      }
    );
    res
      .status(200)
      .json({ status: 200, message: "success", token: token })
      .send();
  } else {
    res.status(401).json({ status: 401, message: "unauthorized" }).send();
  }
};



let updateScore = async (req: Request, res: Response) => {
  if (!validateResult(req, res)) return;
  await client.user.update({
    where: {
      id: req.body.user.id,
    },
    data: {
      score: { increment: 1 },
      lastUpdated: new Date(),
    },
  });
  res.status(200).json({ status: 200, message: "success" }).send();
};



let GetUserScore = async (req: Request, res: Response) => {
  if (!validateResult(req, res)) return;
  if (req.params["id"]) {
    let user: any = await client.$queryRaw`select * from (
                    select "lastUpdated","score","userName","id","name",
                    cast(rank() over(order by score DESC) as Int) as "rank"  from "User")
                    where id=${req.params["id"]}`;
    if (user.length > 0) {
      [user] = user
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
    else
    {
        res.status(404).json({ status: 404, message: "not found" }).send();
    }
  } else {
    res.status(404).json({ status: 404, message: "not found" }).send();
  }
};




let AddUserDate = async (req: Request, res: Response) => {
  
}


export const userController = {
  AddNewUser,
  SignIn,
  updateScore,
  GetUserScore,
};
