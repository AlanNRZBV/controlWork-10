import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from '../components/Posts/postsSlice.ts';
import { postReducer } from '../components/Post/postSlice.ts';
import { commentsReducer } from '../components/comments/commentsSlice.ts';
import { commentFormReducer } from '../components/CommentForm/commentFormSlice.ts';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    post: postReducer,
    comments: commentsReducer,
    commentForm: commentFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
