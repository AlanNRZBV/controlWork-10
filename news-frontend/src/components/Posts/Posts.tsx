import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';

const Posts = () => {
  return (
    <div>
      <Button to="/categories" component={NavLink} color="primary" variant="contained" sx={{mr:2}}>Add new post</Button>
      post will be here
    </div>
  );
};

export default Posts;
