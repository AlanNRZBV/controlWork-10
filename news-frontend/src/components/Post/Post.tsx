import { Box, CircularProgress, Typography } from '@mui/material';
import { apiURL, imgPlaceholder } from '../../constants.ts';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { isPostLoading, postState } from './postSlice.ts';
import { useEffect } from 'react';
import { fetchPost } from './postThunks.ts';
import { useParams } from 'react-router-dom';

const Post = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const post = useAppSelector(postState);
  const isLoading = useAppSelector(isPostLoading);

  useEffect(() => {
      if (id) {
         dispatch(fetchPost(id));
      }
  }, [dispatch, id]);
  return (
    <Box>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <img src={post.image ? `${apiURL}images/${post.image}` : imgPlaceholder} alt={`${post.title} image`} style={{maxWidth:'50%'}}/>
          <Typography variant="h5">{post.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {post.createdAt}
          </Typography>
          <Typography variant="h6">{post.content}</Typography>
        </>
      )}
    </Box>
  );
};

export default Post;
