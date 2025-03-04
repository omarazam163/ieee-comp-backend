import express from "express";
import { userRouter } from "./routers/user.router";
import { leaderBoaerdRouter } from "./routers/leaderBoard.router";
import { GlobalErrorHandler } from "./helpers/globalErrorHandler";


export const App = express();

App.use(express.json());
App.use("/api/user", userRouter);
App.use("/api/leaderboard", leaderBoaerdRouter);
const PORT = process.env.PORT || 3000;

App.use(
    GlobalErrorHandler
);

App.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
