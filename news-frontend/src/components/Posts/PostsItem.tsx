import { PostWithoutContent } from '../../types';
import { FC } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { apiURL, imgPlaceholder } from '../../constants.ts';
import  Grid  from '@mui/material/Unstable_Grid2';

const PostsItem:FC<PostWithoutContent> = ({id,title,image,createdAt}) => {

  const deleteHandler=()=>{
    console.log(id)
  }

  return (
    <Grid xs={4}>

    <Card>
      <CardMedia
        sx={{ height: 140 }}
        image={image ? `${apiURL}/images/${image}` : imgPlaceholder}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {createdAt}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Read Full Post</Button>
        <Button onClick={deleteHandler} size="small">Delete</Button>
      </CardActions>
    </Card>
    </Grid>
  );
};

export default PostsItem;