import Grid from '@mui/material/Unstable_Grid2';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { commentsState, isCommentsLoading } from './commentsSlice.ts';
import CommentsItem from './CommentsItem.tsx';
import { useEffect } from 'react';
import { fetchComments } from './commentsThunks.ts';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
const Comments = () => {
  const comments = useAppSelector(commentsState);
  const isLoading = useAppSelector(isCommentsLoading);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) {
      dispatch(fetchComments(id));
    }
  }, [dispatch, id]);

  return (
    <Grid container direction="column" spacing={2} sx={{ mb: 2 }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        comments.map((item) => <CommentsItem id={item.id} author={item.author} content={item.content} key={item.id} />)
      )}
    </Grid>
  );
};

export default Comments;
