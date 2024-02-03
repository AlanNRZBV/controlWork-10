import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../axiosApi.ts';
import { PostFromBack } from '../../types';

export const fetchPost = createAsyncThunk<PostFromBack[] | undefined, string>('post/fetch', async (arg) => {
  try {
    const response = await axiosApi.get<PostFromBack[]>(`news/${arg}`);
    if (response.data !== undefined) {
      return response.data;
    }
    return;
  } catch (e) {
    console.log('Caught on try - FETCH SINGLE POST - ', e);
  }
});
