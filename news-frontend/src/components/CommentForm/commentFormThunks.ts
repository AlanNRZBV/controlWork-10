import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../axiosApi.ts';
import { UserComment } from '../../types';

export const uploadComment = createAsyncThunk<void, { comment: UserComment; id: string }>(
  'commentForm/upload',
  async (arg) => {
    try {
      await axiosApi.post(`comments/?news_id=${arg.id}`, arg.comment);
    } catch (e) {
      console.log('Caught on try - UPLOAD COMMENT - ', e);
    }
  },
);
