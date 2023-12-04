import { Task } from "../models/taskModels.js";
import { User } from "../models/userModels.js";
import asyncHandler from "express-async-handler";

// @desc Get tasks
// @route GET /api/tasks
// @access Private
export const getTasks = asyncHandler(async (req, res) => {
  const task = await Task.find({ user: req.user.id });
  res.status(200).json(task);
});

// @desc Set task
// @route POST /api/tasks
// @access Private
export const postTasks = asyncHandler(async (req, res) => {
  const { taskName, date, description } = req.body;
  const user = req.user.id;
  if (!taskName || !date) {
    res.status(400);
    throw new Error("Please add fields");
  }
  const task = await Task.create({
    taskName,
    date,
    description,
    user,
  });
  res.status(200).json(task);
});

// @desc Update task
// @route PUT /api/tasks/:id
// @access Private
export const updateTasks = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }

  const user = await User.findById(req.user.id);

  //Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the logged in user matches the task user
  if (task.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updateTask);
});

// @desc Delete tasks
// @route DELETE /api/tasks/:id
// @access Private
export const deleteTasks = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }

  const user = await User.findById(req.user.id);

  //Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the logged in user matches the task user
  if (task.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await Task.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id });
});
