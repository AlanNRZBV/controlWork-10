import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material/';
import  Grid  from '@mui/material/Unstable_Grid2';
import { CircularProgress, Container, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { isPostsLoading, postsState } from './postsSlice.ts';
import PostsItem from './PostsItem.tsx';
import { useEffect } from 'react';
import { fetchPosts } from './postsThunks.ts';

const Posts = () => {

  const dispatch = useAppDispatch();
  const posts = useAppSelector(postsState)
  const isLoading = useAppSelector(isPostsLoading)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch]);


  return (
    <Container>
      <Grid container sx={{pt:2}} spacing={2} justifyContent="space-between">
        <Grid container justifyContent="space-between" alignItems="center" sx={{mb:2, flexGrow:1, flexBasis: '100%'}}>
          <Typography variant="h3" component="span">Posts</Typography>
          <Button to="/add-post" component={NavLink} color="primary" variant="contained" sx={{mr:2}}>Add new post</Button>
        </Grid>
        {isLoading ? <CircularProgress /> : (
          posts.map((item)=>(
              <PostsItem id={item.id} title={item.title} image={item.image} createdAt={item.createdAt} key={item.id}/>
            ))
        ) }

      </Grid>
    </Container>

  );
};

export default Posts;
