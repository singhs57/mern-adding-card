import express from "express";
import {
  getPosts,
  createPosts,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPosts);
router.patch("/:id", updatePost); //patch is used for updating existing documents.
router.patch("/:id/likePost", likePost); //each time when we click on like button we are updating the like count
router.delete("/:id", deletePost);

export default router;
