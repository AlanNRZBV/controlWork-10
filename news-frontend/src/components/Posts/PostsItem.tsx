import { PostWithoutContent } from '../../types';
import { FC } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material';
import { apiURL, imgPlaceholder } from '../../constants.ts';
import Grid from '@mui/material/Unstable_Grid2';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { deletePost, fetchPosts } from './postsThunks.ts';
import { isPostDeleting } from './postsSlice.ts';
import { NavLink } from 'react-router-dom';

const PostsItem: FC<PostWithoutContent> = ({ id, title, image, createdAt }) => {
  const dispatch = useAppDispatch();
  const isDeleting = useAppSelector(isPostDeleting);
  const deleteHandler = async () => {
    if (id) {
      await dispatch(deletePost(id));
      dispatch(fetchPosts());
    }
  };

  return (
    <Grid xs={4}>
      <Card>
        <CardMedia sx={{ height: 140 }} image={image ? `${apiURL}/images/${image}` : imgPlaceholder} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {createdAt}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" to={`/post/${id}`} component={NavLink}>
            Read Full Post
          </Button>
          <Button onClick={deleteHandler} size="small" disabled={isDeleting} variant="contained">
            {isDeleting ? <CircularProgress /> : 'Delete'}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PostsItem;