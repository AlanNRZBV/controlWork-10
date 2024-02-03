import { UserComment } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store.ts';
import { uploadComment } from './commentFormThunks.ts';

interface CommentFormState {
  comment: UserComment;
  isLoading: boolean;
}

export const initialState: CommentFormState = {
  comment: { author: '', content: '' },
  isLoading: false,
};

export const commentFormSlice = createSlice({
  name: 'commentForm',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<{ key: string; value: string | number }>) => {
      const { key, value } = action.payload;
      return {
        ...state,
        comment: {
          ...state.comment,
          [key]: value,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(uploadComment.fulfilled, (state) => {
      state.comment = { ...state.comment, author: '', content: '' };
      state.isLoading = false;
    });
    builder.addCase(uploadComment.rejected, (state) => {
      state.comment = { ...state.comment, author: '', content: '' };
      state.isLoading = false;
    });
  },
});

export const commentFormReducer = commentFormSlice.reducer;
export const { addComment } = commentFormSlice.actions;

export const commentFormState = (state: RootState) => state.commentForm.comment;
