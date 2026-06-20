import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.js";
import modalReducer from "./reducers/modal.js";
import postReducer from "./reducers/post.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    posts: postReducer,
  },
  devTools: true,
});

export default store;
