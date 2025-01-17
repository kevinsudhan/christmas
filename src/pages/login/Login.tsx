import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Input, Form, notification, Button, Tabs } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { generateCustomerId } from '../../utils/customerIdGenerator';
import loginBg from '../../assets/login-bg.jpg';

const { TabPane } = Tabs;

interface LoginFormValues {
  email: string;
  password: string;
}

interface SignupFormValues extends LoginFormValues {
  fullName: string;
  phone: string;
}

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background: #f5f7fa;
  position: relative;
  overflow: hidden;

  @media (max-width: 968px) {
    flex-direction: column;
  }
`;

const LeftSection = styled(motion.section)`
  flex: 1;
  background: linear-gradient(135deg, #0077b6 0%, #023e8a 100%);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  overflow: hidden;

  @media (max-width: 968px) {
    padding: 40px 20px;
    min-height: 300px;
  }

  @media (max-width: 480px) {
    padding: 70px 24px;
    min-height: 250px;
  
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(${loginBg}) no-repeat center center;
    background-size: cover;
    opacity: 0.1;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 150px;
    background: linear-gradient(180deg, transparent, rgba(2, 62, 138, 0.3));
    pointer-events: none;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.7);
`;

const ContentWrapper = styled(motion.div)`
  width: 100%;
  max-width: 360px;
  z-index: 2;
`;

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 1;
  max-width: 600px;
`;

const MainTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 24px;
  line-height: 1.2;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #fff, transparent);
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Tagline = styled(motion.p)`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 40px;
  line-height: 1.6;
  max-width: 500px;
`;

const FormTitle = styled(motion.h2)`
  color: #1a365d;
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const LoginForm = styled(Form)`
  width: 100%;
`;

const StyledInput = styled(Input)`
  height: 40px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  background: rgba(255, 255, 255, 0.8);
  
  .ant-input {
    background: transparent;
    font-size: 0.95rem;
  }

  .ant-input-prefix {
    color: #64748b;
    margin-right: 8px;
  }

  &:hover, &:focus {
    border-color: #0077b6;
    box-shadow: none;
  }
`;

const StyledPasswordInput = styled(Input.Password)`
  height: 40px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  background: rgba(255, 255, 255, 0.8);
  
  .ant-input {
    background: transparent;
    font-size: 0.95rem;
  }

  .ant-input-prefix {
    color: #64748b;
    margin-right: 8px;
  }

  &:hover, &:focus {
    border-color: #0077b6;
    box-shadow: none;
  }
`;

const LoginButton = styled(Button)`
  width: 100%;
  height: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  background: linear-gradient(135deg, #0077b6 0%, #023e8a 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 119, 182, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: ${shimmer} 1.5s infinite;
  }
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 0;
  color: #718096;
  font-size: 0.9rem;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e2e8f0;
    margin: 0 12px;
  }
`;

const LoanAssistButton = styled(motion.button)`
  width: 100%;
  height: 50px;
  background: #ffffff;
  color: #0077b6;
  border: 2px solid #0077b6;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  overflow: hidden;

  &:hover {
    background: rgba(0, 119, 182, 0.05);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 119, 182, 0.1);
  }

  svg {
    font-size: 1.2rem;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(0, 119, 182, 0.1),
      transparent
    );
    transform: rotate(45deg);
    transition: all 0.6s ease;
  }

  &:hover::after {
    transform: rotate(45deg) translate(50%, 50%);
  }
`;

const ForgotPassword = styled(motion.a)`
  color: #0077b6;
  text-align: right;
  display: block;
  margin-top: 16px;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    color: #023e8a;
    transform: translateX(5px);
  }
`;

const FloatingShape = styled.div`
  position: absolute;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border-radius: 50%;
  z-index: 0;
  animation: ${float} 3s ease-in-out infinite;
`;

const CircleDecoration = styled.div`
  width: 300px;
  height: 300px;
  opacity: 0.1;
`;

const GridLines = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 30px 30px;
  z-index: 1;
  pointer-events: none;
`;

const RightGridLines = styled(GridLines)`
  background-image: 
    linear-gradient(rgba(0, 119, 182, 0.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 119, 182, 0.015) 1px, transparent 1px);
`;

const FloatingDot = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  z-index: 1;
`;

const FloatingCircle = styled(motion.div)`
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  z-index: 1;
`;

const GlowingOrb = styled(motion.div)`
  position: absolute;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 1;
`;

const FloatingSquare = styled(motion.div)`
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transform: rotate(45deg);
  z-index: 1;
`;

const GradientLine = styled(motion.div)`
  position: absolute;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  z-index: 1;
`;

const ParticleContainer = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
`;

const TabsContainer = styled.div`
  width: 100%;
  max-width: 360px;
  margin: 0 auto;

  .ant-tabs {
    width: 100%;
  }

  .ant-tabs-nav {
    margin-bottom: 1.5rem;
  }

  .ant-tabs-tab {
    font-size: 1rem;
    padding: 8px 0;
    margin: 0 1rem;
  }

  .ant-tabs-tab-active {
    font-weight: 600;
  }

  .ant-tabs-ink-bar {
    background: #0077b6;
  }

  .ant-form-item {
    margin-bottom: 1rem;
  }
`;

const Login: React.FC = () => {
  const [loginForm] = Form.useForm();
  const [signupForm] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      // First, try to sign in with Supabase auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (authError) throw authError;

      // Check if user exists in customers table
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .select('customer_id, full_name')
        .eq('id', authData.user.id)
        .single();

      if (customerError) {
        // If user doesn't exist in customers table, show signup form
        notification.info({
          message: 'Account Not Found',
          description: 'Please create an account to continue.',
          duration: 5,
        });
        setShowSignup(true);
        loginForm.resetFields();
        return;
      }

      notification.success({
        message: 'Welcome back!',
        description: `Successfully logged in. Your Customer ID: ${customerData.customer_id}`,
      });

      // Navigate to home page after successful login
      navigate('/');

    } catch (error: any) {
      notification.error({
        message: 'Login Failed',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (values: SignupFormValues) => {
    setIsLoading(true);
    try {
      // Generate unique customer ID
      const customerId = generateCustomerId();

      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.fullName,
            customer_id: customerId,
          },
        },
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Failed to create user account');

      // Immediately sign in with the created credentials
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (signInError) throw signInError;
      if (!signInData.user) throw new Error('Failed to establish session');

      // Create the customer record using the auth user's ID
      const { error: customerError } = await supabase
        .from('customers')
        .insert({
          id: signInData.user.id,
          customer_id: customerId,
          full_name: values.fullName,
          email: values.email,
          phone: values.phone || null, // Make phone optional
        });

      if (customerError) {
        console.error('Customer creation error:', customerError);
        await supabase.auth.signOut();
        throw new Error('Failed to create customer profile. Please try again.');
      }

      notification.success({
        message: 'Account Created Successfully',
        description: `Welcome! Your Customer ID is: ${customerId}`,
        duration: 5,
      });

      // Navigate to home page after successful signup
      navigate('/');

    } catch (error: any) {
      console.error('Signup error:', error);
      notification.error({
        message: 'Signup Failed',
        description: error.message,
      });
      // Cleanup on failure
      try {
        await supabase.auth.signOut();
      } catch (signOutError) {
        console.error('Cleanup error:', signOutError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LeftSection
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
        <GridLines />
        <ParticleContainer>
          {/* ... Existing particle animations ... */}
        </ParticleContainer>
        <HeroContent>
          <MainTitle
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            Everyday Banking Solutions
          </MainTitle>
          <Tagline
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          >
            Empowering your financial journey with seamless banking solutions. 
            Experience banking reimagined for the modern world.
          </Tagline>
        </HeroContent>
        {/* ... Existing decorative elements ... */}
      </LeftSection>

      <RightSection
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
        <RightGridLines />
        <ParticleContainer>
          {/* ... Existing particle animations ... */}
        </ParticleContainer>

        <ContentWrapper>
          <TabsContainer>
            <Tabs 
              defaultActiveKey="login" 
              activeKey={showSignup ? "signup" : "login"}
              onChange={(key) => setShowSignup(key === "signup")}
              centered
            >
              <TabPane tab="Login" key="login">
                <Form
                  form={loginForm}
                  name="login"
                  onFinish={handleLogin}
                  layout="vertical"
                >
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' }
                    ]}
                  >
                    <StyledInput
                      prefix={<MailOutlined />}
                      placeholder="Email"
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password' }]}
                  >
                    <StyledPasswordInput
                      prefix={<LockOutlined />}
                      placeholder="Password"
                    />
                  </Form.Item>

                  <LoginButton
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    block
                  >
                    Log In
                  </LoginButton>
                </Form>
              </TabPane>

              <TabPane tab="Sign Up" key="signup">
                <Form
                  form={signupForm}
                  name="signup"
                  onFinish={handleSignup}
                  layout="vertical"
                >
                  <Form.Item
                    name="fullName"
                    rules={[{ required: true, message: 'Please enter your full name' }]}
                  >
                    <StyledInput
                      prefix={<UserOutlined />}
                      placeholder="Full Name"
                    />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' }
                    ]}
                  >
                    <StyledInput
                      prefix={<MailOutlined />}
                      placeholder="Email"
                    />
                  </Form.Item>

                  <Form.Item
                    name="phone"
                    rules={[{ required: true, message: 'Please enter your phone number' }]}
                  >
                    <StyledInput
                      prefix={<PhoneOutlined />}
                      placeholder="Phone Number"
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: 'Please enter your password' },
                      { min: 6, message: 'Password must be at least 6 characters' }
                    ]}
                  >
                    <StyledPasswordInput
                      prefix={<LockOutlined />}
                      placeholder="Password"
                    />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                      { required: true, message: 'Please confirm your password' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject('Passwords do not match');
                        },
                      }),
                    ]}
                  >
                    <StyledPasswordInput
                      prefix={<LockOutlined />}
                      placeholder="Confirm Password"
                    />
                  </Form.Item>

                  <LoginButton
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    block
                  >
                    Create Account
                  </LoginButton>
                </Form>
              </TabPane>
            </Tabs>
          </TabsContainer>
        </ContentWrapper>

        {/* ... Existing decorative elements ... */}
      </RightSection>
    </LoginContainer>
  );
};

export default Login;
