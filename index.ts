import express from "express";
import { userRouter } from "./routers/user.router";
import { leaderBoaerdRouter } from "./routers/leaderBoard.router";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { GlobalErrorHandler } from "./helpers/globalErrorHandler";
let app = express();

app.use(express.json());
app.use("/user", userRouter);
app.use("/leaderboard", leaderBoaerdRouter);
let port: number = 3000;

app.use(
    GlobalErrorHandler
);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
