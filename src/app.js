import express from "express";
import { connectDB } from "./db.js";
import { postRouter } from "./routes/posts.js";

const app = express();

const PORT = process.env.PORT;

// connect to db
connectDB();

// routes
app.use("/api/posts", postRouter);

app.get("/api", (req, res) => {
  res.status(200).json({ message: "Hello world from POST api !" });
});

app.listen(PORT, () => {
  console.log(`Server has started on http://localhost:${PORT}`);
});
