import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../axiosApi.ts';
import { PostWithoutContent } from '../../types';

export const fetchPosts = createAsyncThunk<PostWithoutContent[] | undefined>('posts/fetch', async () => {
  try {
    const response = await axiosApi.get<PostWithoutContent[]>('news');
    if (response.data) {
      console.log(response.data);
      return response.data;
    }
    return [];
  } catch (e) {
    console.log('Caught on try - FETCH ALL POSTS - ', e);
  }
});

export const deletePost = createAsyncThunk<void, number>('posts/delete', async (arg) => {
  try {
    await axiosApi.delete(`news/${arg}`);
  } catch (e) {
    console.log(`Caught on try - DELETE POST WITH ID ${arg} - `, e);
  }
});
