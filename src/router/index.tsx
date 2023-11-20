import { createHashRouter } from 'react-router-dom';

import { Layout } from './Layout';
import { Home } from '../pages/Home';
import { Auth } from '../pages/Auth';
import { Settings } from '../pages/Settings';
import { EditArticle } from '../pages/EditArticle';
import { Article } from '../pages/Article';
import { Profile } from '../pages/Profile/Profile';
import { Feed } from '../pages/Profile/Feed';

export const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
        index: true,
      },
      {
        path: '/login',
        element: <Auth />,
      },
      {
        path: '/register',
        element: <Auth isRegister />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/editor',
        element: <EditArticle />,
      },
      {
        path: '/editor/:slug',
        element: <EditArticle />,
      },
      {
        path: '/profile',
        element: <Profile />,
        children: [
          {
            path: ':username',
            element: <Feed />,
          },
          {
            path: ':username/favorites',
            element: <Feed />,
          },
        ],
      },
      {
        path: '/article/:slug',
        element: <Article />,
      },
    ],
  },
]);
