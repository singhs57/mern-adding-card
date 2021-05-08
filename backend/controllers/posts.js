import PostMessage from "../models/postMessages.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPosts = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post); //passing value which we are receiving from req.body
  try {
    await newPost.save();
    res.status(200).json(newPost); //passing new json comming from newPost variable
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  //req and res as parameters
  const { id: _id } = req.params; // extract the id from req.params. Using Object destructuring we have rename as _id.
  const post = req.body; //sent from front end

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id"); //id validation

  //if we find our id is valid one then...
  const updatePost = await PostMessage.findByIdAndUpdate(
    //in updatedPost we will receive new updated post and it will updated in db also
    //then we need to pass _id as a first parameter and as second parameter or argument we have to pass whole updated post.
    _id,
    { ...post, _id },
    {
      new: true,
    }
  ); //it will updated n the data base

  res.json(updatePost); //we will send this updated post
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id"); //id validation
  const post = await PostMessage.findById(id);
  const updatePost = await PostMessage.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    {
      new: true,
    }
  );
  res.json(updatePost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};
