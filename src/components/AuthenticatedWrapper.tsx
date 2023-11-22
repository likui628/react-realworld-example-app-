import React from 'react';
import { useAppSelector } from '../hooks/store';
import { useNavigate } from 'react-router-dom';

interface AuthenticatedButtonProps {
  children: React.ReactNode;
}
export function AuthenticatedWrapper({ children }: AuthenticatedButtonProps) {
  const isAuthenticated = useAppSelector(state => !!state.auth.user);

  const navigate = useNavigate();
  const handleClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  };

  return <span onClick={handleClick}>{children}</span>;
}
