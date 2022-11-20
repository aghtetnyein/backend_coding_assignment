import { Router, Request, Response } from "express";

import sportController from "../controllers/sport.controller";
import Model from "../models";
const Sport = Model.Sport;

const sportRouter = Router();

sportRouter.post("/", sportController.sportCreator);
sportRouter.get("/", sportController.sportsFetcherWithMultipleUsers);
sportRouter.get("/", sportController.sportsWithNoPlayer);

export default sportRouter;
