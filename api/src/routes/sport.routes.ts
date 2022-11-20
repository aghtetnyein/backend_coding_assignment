import { Router, Request, Response } from "express";

import sportController from "../controllers/sport.controller";

const sportRouter = Router();

sportRouter.post("/", sportController.sportCreator);
sportRouter.get("/", sportController.sportFetcher);

export default sportRouter;
