import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../axiosApi.ts';
import { PostWithoutContent } from '../../types';

export const fetchPosts = createAsyncThunk<PostWithoutContent[] | undefined>(
  'posts/fetch',
  async ()=>{
    try{
      const response = await axiosApi.get<PostWithoutContent[]>('news')
      if(response.data){
        return response.data
      }
      return []
    }catch (e){
      console.log('Caught on try - FETCH ALL POSTS - ', e)
    }
  }
)