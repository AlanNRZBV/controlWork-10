import { TextField } from '@mui/material';
import { Button } from '@mui/material/';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { addComment, commentFormState } from './commentFormSlice.ts';
import React from 'react';
import { uploadComment } from './commentFormThunks.ts';
import { useParams } from 'react-router-dom';

const CommentForm = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(commentFormState);
  const { id: newsId } = useParams();
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newsId);
    dispatch(
      uploadComment({
        comment: state,
        id: newsId as string,
      }),
    );
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = {
      key: e.target.name,
      value: e.target.value,
    };
    dispatch(addComment(userInput));
  };
  return (
    <form onSubmit={submitHandler}>
      <TextField
        onChange={changeHandler}
        value={state.author}
        name="author"
        id="outlined-basic"
        label="author"
        variant="outlined"
      />
      <TextField
        onChange={changeHandler}
        value={state.content}
        name="content"
        id="outlined-basic"
        label="content"
        variant="outlined"
      />
      <Button type="submit" variant="outlined">
        Add
      </Button>
    </form>
  );
};

export default CommentForm;
