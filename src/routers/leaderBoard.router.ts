import { Router } from "express";
import { leaderBoardController } from "../controllers/leaderBoard.controller";


export const leaderBoaerdRouter = Router();

leaderBoaerdRouter.get("/:page",leaderBoardController.getLeaderBoard);