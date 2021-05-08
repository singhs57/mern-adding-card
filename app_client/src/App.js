import React, { useEffect, useState } from "react"; //initially useEffect will be componentDidMount but later on it will be componentWillUpdate
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux"; //used to dispatch an action

import { getPosts } from "./actions/posts";
import Form from "./Form/Form";
import useStyles from "./styles";
import memories from "./images/memories.png";
import Posts from "./Posts/Posts";

const App = () => {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch(); //1> we need to define useDispatch

  useEffect(() => {
    dispatch(getPosts()); // we have dispatch an action over here
  }, [currentId, dispatch]); //as a second parameter we have put a dependency array

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h2" align="center" className={classes.heading}>
          Details Card
        </Typography>
        <img className={classes.image} src={memories} alt="memo" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
