import mongoose from "mongoose";
import "dotenv/config";
const MONGO_URI = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(error => console.error("Error connecting to MongoDB: ", error));

const bloglistSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

export const Blog = mongoose.model("Blog", bloglistSchema);
