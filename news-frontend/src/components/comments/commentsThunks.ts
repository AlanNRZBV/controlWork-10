import { createAsyncThunk } from '@reduxjs/toolkit';
import { CommentFromBack } from '../../types';
import { axiosApi } from '../../axiosApi.ts';

export const fetchComments = createAsyncThunk<CommentFromBack[] | undefined, string>('comments/fetch', async (arg) => {
  try {
    const response = await axiosApi.get<CommentFromBack[]>(`comments/?news_id=${arg}`);
    if (response.data !== undefined) {
      return response.data;
    }
    return [];
  } catch (e) {
    console.log('Caught on try - FETCH COMMENTS - ', e);
  }
});

export const deleteComment = createAsyncThunk<void, number>('comments/delete', async (arg) => {
  try {
    await axiosApi.delete(`comments/${arg}`);
  } catch (e) {
    console.log('Caught on try - DELETE COMMENT - ', e);
  }
});
