import { PostFromBack } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store.ts';
import { fetchPost } from './postThunks.ts';

interface PostState {
  post: PostFromBack;
  isLoading: boolean;
}

export const initialState: PostState = {
  post: {
    id: null,
    title: '',
    content: '',
    image: null,
    created_at: '',
  },
  isLoading: false,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPost.fulfilled, (state, { payload: post }) => {
      if (post) {
        state.post = {
          ...post[0],
        };
      }
      state.isLoading = false;
    });
    builder.addCase(fetchPost.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const postReducer = postSlice.reducer;

export const postState = (state: RootState) => state.post.post;
export const isPostLoading = (state: RootState) => state.post.isLoading;
