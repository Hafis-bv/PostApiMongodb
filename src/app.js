import express from "express";
import { connectDB } from "./db.js";
import { postRouter } from "./routes/posts.js";

const app = express();

const PORT = process.env.PORT;

// connect to db
connectDB();

// middlewares
app.use(express.json()); //обязательно юез этого в post body ну будет

// routes
app.use("/api/posts", postRouter);

app.get("/api", (req, res) => {
  res.status(200).json({ message: "Hello world from POST api !" });
});

app.use((err, req, res, next) => {
  console.error(err.stack); //в терминале видно
  res
    .status(err.statusCode || 500)
    .json({ success: false, error: err.message || "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server has started on http://localhost:${PORT}`);
});
