import { Router, Request, Response } from "express";

import {
  createToDo,
  deleteToDo,
  getAllToDo,
  updateTodo,
  getTodoById,
} from "../controllers/todo.controller";

const todoRouter = Router();

todoRouter.post("/", createToDo);

todoRouter.get("/", getAllToDo);

todoRouter.get("/:id", getTodoById);

todoRouter.put("/:id", updateTodo);

todoRouter.delete("/:id", deleteToDo);

export default todoRouter;
