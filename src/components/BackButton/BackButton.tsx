import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const StyledBackButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  height: auto;
  background: transparent;
  border: none;
  color: #64748b;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  .anticon {
    margin-right: 8px;
    font-size: 0.9rem;
  }

  &:hover {
    color: #1a365d;
    background: transparent;
    transform: translateX(-5px);
  }

  &:focus {
    background: transparent;
  }
`;

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/employee-dashboard');
  };

  return (
    <StyledBackButton 
      icon={<LeftOutlined />} 
      onClick={handleBack}
      aria-label="Back to dashboard"
    >
      Back to Dashboard
    </StyledBackButton>
  );
};

export default BackButton;
