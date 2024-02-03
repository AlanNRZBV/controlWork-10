import { createBrowserRouter } from 'react-router-dom';
import PostForm from '../components/PostForm/PostForm.tsx';
import Layout from '../layout/layout.tsx';
import Posts from '../components/Posts/Posts.tsx';
import NotFound from '../components/NotFound/NotFound.tsx';

export const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:'/',
        element:<Posts/>
      },
      {
        path:'/add-post',
        element:<PostForm/>
      },
      {
        path:'*',
        element:<NotFound/>
      }

    ]
  },

]);