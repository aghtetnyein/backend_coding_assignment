import { Router } from "express";

import sportController from "../controllers/sport.controller";

const sportRouter = Router();

sportRouter.post("/", sportController.sportCreator);
sportRouter.get("/", sportController.sportsFetcher);

export default sportRouter;
