import { Request, Response } from "express";
import { client } from "../models/prismaClient";
import { validateResult } from "../helpers/validateResult";
let updateDayQuraan = async (req: Request, res: Response) => {
  try {
    if (!validateResult(req, res)) return;
    let theDateNorm = new Date(req.body.date + "T00:00:00"); // Forces local time interpretation
    theDateNorm.setHours(12, 0, 0, 0);
    await DateExists(theDateNorm);
    await client.userDays.upsert({
      where: {
        userId_DayId: {
          DayId: theDateNorm,
          userId: req.body.user.id,
        },
      },
      update: {
        pageRead: req.body.numberOfPages,
      },
      create: {
        userId: req.body.user.id,
        DayId: theDateNorm,
      },
    });
    await client.user.update({
      where: {
        id: req.body.user.id,
      },
      data: {
        lastUpdated: new Date(),
        lastPage: req.body.endPage,
      },
    });
    res.status(200).json({ status: 200, message: "success" }).send();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message }).send();
  }
};

const DateExists = async (date: Date) => {
  let day = await client.days.findFirst({
    where: {
      Date: date,
    },
  });
  if (!day) {
    await client.days.create({
      data: {
        Date: date,
      },
    });
  }
};

let updateAzkarMorning = async (req: Request, res: Response) => {
  try {
    //check for errors and nomlize dater
    if (!validateResult(req, res)) return;
    let theDateNorm = new Date(req.body.date);
    theDateNorm.setHours(12, 0, 0, 0);
    await DateExists(theDateNorm);

    //adds the DayUser if not exist
    await client.userDays.upsert({
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
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message }).send();
  }
};

let updateAzkarEvening = async (req: Request, res: Response) => {
  try {
    //check for errors and nomlize dater
    if (!validateResult(req, res)) return;
    let theDateNorm = new Date(req.body.date);
    theDateNorm.setHours(12, 0, 0, 0);
    await DateExists(theDateNorm);
    //adds the DayUser if not exist
    await client.userDays.upsert({
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
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message }).send();
  }
};

const getAllUserDates = async (req: Request, res: Response) => {
  let Days = await client.user.findFirst({
    where: {
      id: req.body.user.id,
    },
    select: {
      id: true,
      userName: true,
      UserDays: {
        select: {
          DayId: true,
          pageRead: true,
          eveningAzkar: true,
          morningAzkar: true,
        },
      },
    },
  });
  res.status(200).json(Days).send();
};

const getSpecificDate = async (req: Request, res: Response) => {
  try {
    let theDateNorm = new Date(req.body.date);
    theDateNorm.setHours(12, 0, 0, 0);
    if (!validateResult(req, res)) return;
    const day = await client.userDays.findUnique({
      where: {
        userId_DayId: {
          userId: req.body.user.id,
          DayId: theDateNorm,
        },
      },
    });
    if (day) res.status(200).json({ message: "success", data: day }).send();
    else {
      await client.days.upsert({
        where: {
          Date: theDateNorm,
        },
        update: {},
        create: {
          Date: theDateNorm,
        },
      });

      const newDay = await client.userDays.create({
        data: {
          userId: req.body.user.id,
          DayId: new Date(req.body.date),
        },
      });
      res.status(200).json({ message: "success", data: newDay });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message }).send();
  }
};

const updateBookMark = async (req: Request, res: Response) => {
  try {
    if (!validateResult(req, res)) return;
    console.log(req.body.bookMark);
    await client.user.update({
      where: {
        id: req.body.user.id,
      },
      data: {
        lastUpdated: new Date(),
        bookMark: req.body.bookMark,
      },
    });
    res.status(200).json({ status: 200, message: "success" }).send();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message }).send();
  }
};

const getBookmark = async (req: Request, res: Response) => {
  try {
    if (!validateResult(req, res)) return;
    const data = await client.user.findUnique({
      where: {
        id: req.body.user.id,
      },
      select: {
        bookMark: true,
      },
    });
    res.status(200).json({ status: 200, data: data }).send();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message }).send();
  }
};

export const calenderContoller = {
  updateDayQuraan,
  getAllUserDates,
  getSpecificDate,
  updateAzkarMorning,
  updateAzkarEvening,
  updateBookMark,
  getBookmark,
};
