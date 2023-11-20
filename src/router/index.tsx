import { createHashRouter } from 'react-router-dom';

import { Home } from '../pages/Home';
import { Auth } from '../pages/Auth';
import { Settings } from '../pages/Settings';
import { EditArticle } from '../pages/EditArticle';
import { Article } from '../pages/Article';
import { Profile } from '../pages/Profile';

export const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
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
    path: '/profile/@:username',
    element: <Profile />,
  },
  {
    path: '/profile/@:username/favorites',
    element: <Profile />,
  },
  {
    path: '/article/:slug',
    element: <Article />,
  },
]);
