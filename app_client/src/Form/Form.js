import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux"; //once action is created, we need to use dispatch to dispatch that action
import { createPost, updatePost } from "../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    selectedFile: "",
    tags: "",
  });
  const post = useSelector(
    (state) => (currentId ? state.posts.find((p) => p._id === currentId) : null)
    // for this case we only want data for the post which need to be updated,
    //if current Id is not null means a id is present, then we need to loop over all the posts present and use find method on them.
    //more specificaly we need to find a post which has same id as current id, if not it wll return null.
  );
  // here we are using useEffect to populate the values of the form.
  //it accepts two parameters, first call back and secnd a dependency array.
  useEffect(() => {
    if (post) setPostData(post); //2> if post exists then we are going to set post data and we are going to populate it using setState i.e setPostData
  }, [post]); // 1> when array changes from nothing to actual post then useEffect should run

  const handleSubmit = (e) => {
    //once we click on HandleSubmit button and action is dispatch then we need to go to posts.js reducers.
    //we need to send over an array of data.
    e.preventDefault();
    // dispatch(createPost(postData));

    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData)); //we have dispatch an action. Inside createPost we have pass all our state
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      selectedFile: "",
      tags: "",
    });
  };
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} details card
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={
            (e) => setPostData({ ...postData, tags: e.target.value.split(",") }) // split is used to seperate the words
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
