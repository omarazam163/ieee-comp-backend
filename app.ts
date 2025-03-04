import express from "express";
import { userRouter } from "./routers/user.router";
import { leaderBoaerdRouter } from "./routers/leaderBoard.router";
import { GlobalErrorHandler } from "./helpers/globalErrorHandler";


export const App = express();

App.use(express.json());
App.use("/user", userRouter);
App.use("/leaderboard", leaderBoaerdRouter);
let port: number = 3000;

App.use(
    GlobalErrorHandler
);

App.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
