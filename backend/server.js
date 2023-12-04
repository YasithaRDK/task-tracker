import express from "express";
import color from "colors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config();

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

const server = () => {
  connectDB();
  app.listen(port, () => console.log(`Server started on port ${port}`));
};

app.use(errorHandler);

server();
