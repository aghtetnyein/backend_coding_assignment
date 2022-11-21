import { Router } from "express";

import playerController from "../controllers/player.controller";

const playerRouter = Router();

playerRouter.post("/", playerController.playerCreator);
playerRouter.get("/", playerController.playerFetcher);

export default playerRouter;
