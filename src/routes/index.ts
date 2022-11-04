import express, { Request, Response } from "express";
import todo from "./todo.routes";

const routes: express.Router = express.Router();

routes.get("/", (req: Request, res: Response) => {
  res.send("There will be a list of all the available routes here!");
});

routes.use("/todos", todo);

export default routes;
