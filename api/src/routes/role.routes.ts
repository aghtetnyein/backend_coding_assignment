import { Router, Request, Response } from "express";

import roleController from "../controllers/role.controller";

const roleRouter = Router();

roleRouter.post("/", roleController.roleCreator);

roleRouter.get("/", roleController.roleFetcher);

export default roleRouter;
