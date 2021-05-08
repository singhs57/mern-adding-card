//a reducer is a function which accepts a state and also accepts a action, based on the action type it return the state

export default (posts = [], action) => {
  //we are not using reducers over here so we did export default. Inside CombineReducers we are using reducers.
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;

    case "CREATE":
      return [...posts, action.payload]; //we have spread all our state, then pass a new state using action.payload

    case "UPDATE":
    case "LIKE":
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    //arrya.map = array ,
    // for a single post , if post._id matches with payload._id then it will reaturn a new updatedPost or else it will return previous state
    case "DELETE":
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};
