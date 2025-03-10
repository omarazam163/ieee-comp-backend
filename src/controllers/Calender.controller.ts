import { Request, Response } from "express";
import { client } from "../models/prismaClient";
import { validateResult } from "../helpers/validateResult";
let updateCalenderDay = async (req: Request, res: Response) => {
  try{
  if (!validateResult(req, res)) return;
  if (!(await DateExists(req.body.date))) {
    await client.days.create({
      data: {
        Date: new Date(req.body.date),
      },
    });
  }
  await client.userDays.upsert({
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
  await client.user.update({
      where: {
        id:req.body.user.id
      },
      data:{
        lastUpdated:new Date(),
        lastPage:req.body.endPage
      }
  })
  res.status(200).json({ status: 200, message: "success" }).send();
}
catch(err)
{
    res.status(500).json({ status: 500, message: err.message }).send();
}
};

const DateExists = async (date: Date) => {
  let day = await client.days.findFirst({
    where: {
      Date: new Date(date),
    },
  });
  return day ? true : false;
};

const getAllUserDates = async (req: Request, res: Response) => {
  let Days = await client.user.findFirst({
    where:{
        id:req.body.user.id
    },
    select:{
        id:true,
        userName:true
        ,UserDays:{
            select:{
                DayId:true,
                startPage:true,
                endPage:true,
                eveningAzkar:true,
                morningAzkar:true
            }
        }
    }
  })
  res.status(200).json(Days).send();
};

export const calenderContoller = { AddCalenderDay: updateCalenderDay, getAllUserDates };
