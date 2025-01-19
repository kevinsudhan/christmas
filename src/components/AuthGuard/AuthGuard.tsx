import React from 'react';
import { useAuthGuard } from '../../hooks/useAuthGuard';
import { Spin } from 'antd';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f7fa;
`;

interface AuthGuardProps {
  children: React.ReactNode;
  redirectPath?: string;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  redirectPath = '/login' 
}) => {
  const { isAuthenticated } = useAuthGuard(redirectPath);

  if (isAuthenticated === null) {
    return (
      <LoadingContainer>
        <Spin size="large" />
      </LoadingContainer>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};
