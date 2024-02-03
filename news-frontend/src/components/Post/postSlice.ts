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
    createdAt: '',
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

        console.log('post from slice', post)
        state.post = {
          ...post[0],
          // id: post.id,
          // title: post.title,
          // content: post.content,
          // image: post.image,
          // createdAt: post.createdAt,
        };
        state.isLoading = false;
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
