import React from "react";
import useStyles from "./styles";
import Post from "./Post/Post";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux"; //we can fetch data from global redux store using useSelector

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts); //as a parameter in this call back function we get access to whole global redux store.
  //why state.posts ? :- if we got to reducers, inside combineReducers we have pass all the reducers as posts.
  console.log(posts);
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((
        post //in a map we will get a individual post and for each individual post we will return something
      ) => (
        <Grid key={post._id} item xs={12} sm={6}>
          <Post
            post={post} // as we are mapping with our real posts now so we can send that individual value of post to each post compont.
            setCurrentId={setCurrentId}
          />
        </Grid>
      ))}
      {/* {passing post and setCurrentID as a props to <Post/> component} */}
    </Grid>
  );
};

export default Posts;
