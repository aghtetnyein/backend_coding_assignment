import { Router, Request, Response } from "express";

import playerController from "../controllers/player.controller";
import Player from "../models/player.model";
import Sport from "../models/sport.model";

const playerRouter = Router();

playerRouter.post("/", playerController.playerCreator);
playerRouter.get("/", playerController.playerFetcher);

export default playerRouter;
