import mongoose from "mongoose";
import { Post } from "../models/Post.js";
import AppError from "../utils/AppError.js";

export async function getAllPosts(req, res, next) {
  try {
    const posts = await Post.find();

    if (!posts.length) {
      return next(new AppError("No posts found", 404));
    }

    return res.status(200).json(posts);
  } catch (e) {
    console.error(e);
    next(new AppError(e.message));
  }
}

export async function getSinglePost(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError("ID is required", 400));
    }

    const post = await Post.findById(id);

    if (!post) {
      return next(new AppError("Post not found", 404));
    }

    return res.status(200).json(post);
  } catch (e) {
    console.error(e);
    next(new AppError(e.message));
  }
}

export async function createPost(req, res, next) {
  try {
    const { image, title, description, author } = req.body;

    if (!title || !description || !author || !image) {
      return next(new AppError("All fields are required", 400));
    }
    const post = await Post.create({
      image,
      title,
      description,
      author,
    });

    return res.status(201).json({
      msg: "Post created successfully!",
      post,
    });
  } catch (e) {
    console.error(e);
    next(new AppError(e.message));
  }
}

export async function deletePost(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError("ID is required", 400));
    }
    const post = await Post.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ msg: "Post deleted successfully!", deletedPost: post });
  } catch (e) {
    console.error(e);
    next(new AppError(e.message));
  }
}

export async function updatePost(req, res, next) {
  try {
    const { id } = req.params;

    const { image, title, description, author } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError("ID is required", 400));
    }

    const post = await Post.findByIdAndUpdate(
      id,
      {
        image,
        title,
        description,
        author,
      },
      {
        new: true, // возвращает обновлённый документ
        runValidators: true, // запускает валидации схемы ..... это че значит
      }
    );

    if (!post) {
      return next(new AppError("Post not found", 404));
    }

    return res.status(200).json({
      msg: "Post updated successfully!",
      updatedPost: post,
    });
  } catch (e) {
    console.error(e);
    next(new AppError(e.message));
  }
}
