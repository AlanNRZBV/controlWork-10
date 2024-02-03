import { FC } from 'react';
import { CommentFromBack } from '../../types';
import { CircularProgress, Typography } from '@mui/material';
import { Button } from '@mui/material/';
import Grid from '@mui/material/Unstable_Grid2';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { deleteComment, fetchComments } from './commentsThunks.ts';
import { isCommentDeleting } from './commentsSlice.ts';
import { useParams } from 'react-router-dom';

const CommentsItem: FC<CommentFromBack> = ({ id, author, content }) => {
  const dispatch = useAppDispatch();
  const { id: newsId } = useParams();
  const isDeleting = useAppSelector(isCommentDeleting);
  const onDeleteHandler = async () => {
    if (newsId) {
      await dispatch(deleteComment(id));
      await dispatch(fetchComments(newsId));
    }
  };

  return (
    <Grid sx={{ border: 1 }}>
      <Typography variant="h6">{author}</Typography>
      <Typography variant="h6">{content}</Typography>
      <Button onClick={onDeleteHandler} variant="outlined" disabled={isDeleting}>
        {isDeleting ? <CircularProgress /> : 'Delete'}
      </Button>
    </Grid>
  );
};

export default CommentsItem;
