// The index.js file only import the actual application from the app.js file and then starts the application
import express from "express";
import cors from "cors";
import "dotenv/config";
import { Blog } from "./blogs.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs);
  });
});

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then(result => {
    response.status(201).json(result);
  });
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
