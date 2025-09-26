import { Router } from "express";
import { Post } from "../models/Post.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();

    if (!posts.length) {
      return res.status(404).json({ message: "No posts found" });
    }

    res.status(200).json(posts);
  } catch (e) {
    console.error(e);
  }
});

export { router as postRouter };
