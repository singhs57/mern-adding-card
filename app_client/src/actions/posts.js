import * as api from "../api"; // we have import everything from actions as api

//Action Creators are functions that return actions
//creating action creators
//action is an object which has type and payload

export const getPosts = () => async (dispatch) => {
  //as a set of property we get access to dispatch by passing dispatch inside ().
  //redux thunk allows us to in here specify additional error function
  //using async (dispatch) we have created a function that returns another function. Now we can use async await property
  try {
    const { data } = await api.fetchPosts(); //we are first getting a response from api and in resonse we have data as object
    dispatch({ type: "FETCH_ALL", payload: data });
    // instead of returning an action we need to dispatch the action if using redux thunk.
    // payload: are data where we store all our posts
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  // 2> then we are receiving a post
  //dispatch comes from redux thunk
  try {
    const { data } = await api.createPost(post); // 1> we have first distructure the response as {data}, then we are making a post api request to our backend server. We are sending a post there.
    dispatch({
      type: "CREATE",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
}; // then we need to dispatch this action from From.js

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post); // api.updatePost id returning a updated memory or post, and we have data after updated post
    dispatch({
      type: "UPDATE",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
//after action we have to go to reducers.

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id); // api.updatePost id returning a updated memory or post, and we have data after updated post
    dispatch({
      type: "LIKE",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({
      type: "DELETE",
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};
