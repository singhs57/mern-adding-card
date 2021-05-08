import { combineReducers } from "redux";
import posts from "./posts";

export default combineReducers({ posts }); // we will call combineReducers as a function and put an object inside of it. As an object we will pass all the individual reducers we will have
