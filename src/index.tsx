import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './state/store';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Settings } from './pages/Settings';
import { EditArticle } from './pages/EditArticle';
import { Article } from './pages/Article';
import { Profile } from './pages/Profile';

const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
