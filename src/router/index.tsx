import { createHashRouter, useNavigate } from 'react-router-dom';
import { lazy, ReactNode, useEffect } from 'react';

import { Layout } from './Layout';
import HomePage from '../pages/Home';
import { useAppSelector } from '../hooks/store';

const SettingsPage = lazy(() => import('../pages/Settings'));
const EditorPage = lazy(() => import('../pages/EditArticle'));
const ArticlePage = lazy(() => import('../pages/Article/Article'));
const ProfilePage = lazy(() => import('../pages/Profile/Profile'));
const FeedPage = lazy(() => import('../pages/Profile/Feed'));
const AuthPage = lazy(() => import('../pages/Auth'));

export const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        index: true,
      },
      {
        path: '/login',
        element: <AuthPage />,
      },
      {
        path: '/register',
        element: <AuthPage isRegister />,
      },
      {
        path: '/settings',
        element: (
          <Authenticated>
            <SettingsPage />
          </Authenticated>
        ),
      },
      {
        path: '/editor',
        element: (
          <Authenticated>
            <EditorPage />
          </Authenticated>
        ),
      },
      {
        path: '/editor/:slug',
        element: (
          <Authenticated>
            <EditorPage />
          </Authenticated>
        ),
      },
      {
        path: '/profile',
        element: <ProfilePage />,
        children: [
          {
            path: ':username',
            element: <FeedPage />,
          },
          {
            path: ':username/favorites',
            element: <FeedPage />,
          },
        ],
      },
      {
        path: '/article/:slug',
        element: <ArticlePage />,
      },
      {
        path: '*',
        element: <HomePage />,
      },
    ],
  },
]);

function Authenticated({ children }: { children: ReactNode }) {
  const isAuthenticated = useAppSelector(state => !!state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated]);

  return <>{children}</>;
}
