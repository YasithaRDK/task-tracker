import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: [true, "Please add a text field"],
    },
    date: {
      type: Date,
      required: [true, "Please add a date"],
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model("Task", taskSchema);
