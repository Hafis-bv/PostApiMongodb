import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  title: {
    type: String,
    minlength: [5, "Title should be at least 5 characters long"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

export const Post = mongoose.model("Post", postSchema);
