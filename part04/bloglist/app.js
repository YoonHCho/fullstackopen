// app.js responsibilities: setting the app(express) and use of middlewares and of establishing the connection to the database.
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./utils/config.js";
import logger from "./utils/logger.js";
import blogRouter from "./controllers/notes.js";
import middleware from "./utils/middleware.js";

const app = express();

mongoose.set("strictQuery", false);
logger.info("Connecting to MongoDB");

mongoose
  .connect(config.MONGO_URI)
  .then(() => logger.info("Connected to MongoDB"))
  .catch(error => logger.error(`Error connecting to MongoDB: ${error}`));

app.use(express.json());
app.use(cors());
app.use(middleware.requestLogger);
app.use("/api/blogs", blogRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
