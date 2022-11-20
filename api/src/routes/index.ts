import express, { Request, Response } from "express";
import roleRouter from "./role.routes";
import sportRouter from "./sport.routes";
import playerRouter from "./player.routes";

const routes: express.Router = express.Router();

routes.get("/", (req: Request, res: Response) => {
  res.send("There will be a list of all the available routes here!");
});

routes.use("/roles", roleRouter);
routes.use("/sports", sportRouter);
routes.use("/players", playerRouter);

export default routes;
