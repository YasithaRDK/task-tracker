import Router from "express";
import {
  deleteTasks,
  getTasks,
  postTasks,
  updateTasks,
} from "../controllers/taskControllers.js";

import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").get(protect, getTasks).post(protect, postTasks);

router.route("/:id").put(protect, updateTasks).delete(protect, deleteTasks);

export default router;
