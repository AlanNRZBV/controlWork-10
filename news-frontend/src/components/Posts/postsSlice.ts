import { PostWithoutContent } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { deletePost, fetchPosts } from './postsThunks.ts';
import { RootState } from '../../store/store.ts';

interface PostsState {
  posts: PostWithoutContent[],
  isLoading: boolean,
  isDeleting: boolean
}

export const initialState: PostsState = {
  posts:[],
  isLoading: false,
  isDeleting: false,
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers:builder => {
    builder.addCase(fetchPosts.pending,(state)=>{
      state.isLoading = true
    });
    builder.addCase(fetchPosts.fulfilled, (state,{payload: posts})=>{
      if(posts){
        state.posts = posts
        state.isLoading = false
      }
      state.isLoading = false
    });
    builder.addCase(fetchPosts.rejected,(state)=>{
      state.isLoading = false
    });
    builder.addCase(deletePost.pending,(state)=>{
      state.isDeleting = true
    });
    builder.addCase(deletePost.fulfilled, (state)=>{
      state.isDeleting = false
    });
    builder.addCase(deletePost.rejected,(state)=>{
      state.isDeleting = false
    });

  }
})

export const postsReducer = postsSlice.reducer

export const postsState = (state: RootState)=>state.posts.posts
export const isPostsLoading = (state: RootState)=>state.posts.isLoading
export const isPostDeleting = (state: RootState)=>state.posts.isDeleting