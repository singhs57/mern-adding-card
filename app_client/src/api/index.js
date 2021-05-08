import axios from "axios";

const url = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost); //it will take a post and then we need to specify the url then the data we need to send
export const updatePost = (
  id,
  updatedPost // here we are receivng two parameters id and updatedPost
) => axios.patch(`${url}/${id}`, updatedPost);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
