import express,{ Request,Response} from "express";
import { userRouter } from "./routers/user.router";
import { leaderBoaerdRouter } from "./routers/leaderBoard.router";
import { GlobalErrorHandler } from "./helpers/globalErrorHandler";
import { calenderRouter } from "./routers/calender.router";
export const App = express();

App.use(express.json());
App.use("/api/user", userRouter);
App.use("/api/leaderboard", leaderBoaerdRouter);
App.use("/api/calender", calenderRouter);
const PORT = process.env.PORT || 3000;
App.get(
  "/ping",
  (req:Request, res:Response) => {
    res.send("pong");
  }
);
App.use(GlobalErrorHandler);

App.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});

export default App;
