import {configureStore} from "@reduxjs/toolkit";
import { postsReducer } from '../components/Posts/postsSlice.ts';
import { postReducer } from '../components/Post/postSlice.ts';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    post: postReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
