import { PostWithoutContent } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts } from './postsThunks.ts';
import { RootState } from '../../store/store.ts';

interface PostsSlice {
  posts: PostWithoutContent[],
  isLoading: boolean,
}

export const initialState: PostsSlice = {
  posts:[],
  isLoading: false
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
    })
  }
})

export const postsReducer = postsSlice.reducer

export const postsState = (state: RootState)=>state.posts.posts
export const isPostsLoading = (state: RootState)=>state.posts.isLoading