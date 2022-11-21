import { Router } from "express";

import sportController from "../controllers/sport.controller";

const sportRouter = Router();

sportRouter.post("/", sportController.sportCreator);
sportRouter.get("/", sportController.sportsFetcher);
sportRouter.get("/:name", sportController.specificSportFetcher);

export default sportRouter;
