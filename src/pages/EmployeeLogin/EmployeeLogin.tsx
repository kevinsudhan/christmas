import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Input, Button, Form, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, #0077b6 0%, #023e8a 100%);
    border-radius: 50%;
    top: -100px;
    left: -100px;
    opacity: 0.1;
  }

  &::after {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    background: linear-gradient(135deg, #023e8a 0%, #0077b6 100%);
    border-radius: 50%;
    bottom: -150px;
    right: -150px;
    opacity: 0.1;
  }
`;

const LoginCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  position: relative;
  z-index: 1;
  
  @media (max-width: 480px) {
    margin: 20px;
    padding: 30px;
  }
`;

const Title = styled.h1`
  color: #1a365d;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 30px;
  font-weight: 700;
`;

const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 24px;
  }

  .ant-input-affix-wrapper {
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    
    &:hover, &:focus {
      border-color: #0077b6;
      box-shadow: 0 0 0 2px rgba(0, 119, 182, 0.1);
    }
  }

  .ant-btn {
    height: 45px;
    font-size: 1rem;
  }
`;

const SubmitButton = styled(Button)`
  background: linear-gradient(135deg, #0077b6 0%, #023e8a 100%);
  width: 100%;
  border: none;
  height: 45px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 16px;

  &:hover {
    opacity: 0.9;
    background: linear-gradient(135deg, #0077b6 0%, #023e8a 100%);
  }
`;

const Subtitle = styled.p`
  color: #4a5568;
  text-align: center;
  margin-bottom: 30px;
  font-size: 1rem;
`;

const EmployeeLogin: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: { username: string; password: string }) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (values.username === 'EBS' && values.password === 'EBS123') {
        message.success('Login successful!');
        navigate('/employee-dashboard');
      } else {
        message.error('Invalid username or password');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <PageContainer>
      <LoginCard>
        <Title>Employee Dashboard</Title>
        <Subtitle>Enter your credentials to access the dashboard</Subtitle>
        
        <StyledForm
          name="employee_login"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Username" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <SubmitButton 
              type="primary" 
              htmlType="submit"
              loading={loading}
            >
              Log In
            </SubmitButton>
          </Form.Item>
        </StyledForm>
      </LoginCard>
    </PageContainer>
  );
};

export default EmployeeLogin;
