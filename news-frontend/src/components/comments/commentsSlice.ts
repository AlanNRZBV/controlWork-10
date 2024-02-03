import { CommentFromBack } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store.ts';
import { deleteComment, fetchComments } from './commentsThunks.ts';

interface CommentsState {
  comments: CommentFromBack[];
  isLoading: boolean;
  isDeleting: boolean;
}

export const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  isDeleting: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, { payload: comments }) => {
      if (comments) {
        state.comments = comments;
      }
      state.isLoading = false;
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteComment.pending, (state) => {
      state.isDeleting = true;
    });
    builder.addCase(deleteComment.fulfilled, (state) => {
      state.isDeleting = false;
    });
    builder.addCase(deleteComment.rejected, (state) => {
      state.isDeleting = false;
    });
  },
});

export const commentsReducer = commentsSlice.reducer;

export const commentsState = (state: RootState) => state.comments.comments;
export const isCommentsLoading = (state: RootState) => state.comments.isLoading;
export const isCommentDeleting = (state: RootState) => state.comments.isDeleting;
