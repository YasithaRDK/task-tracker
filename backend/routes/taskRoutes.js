import Router from "express";
import {
  deleteTasks,
  getTasks,
  postTasks,
  updateTasks,
} from "../controllers/taskControllers.js";

const router = Router();

router.route("/").get(getTasks).post(postTasks);

router.route("/:id").put(updateTasks).delete(deleteTasks);

export default router;
