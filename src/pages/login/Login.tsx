import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Input, Form } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import loginBg from '../../assets/login-bg.jpg';
import { GlassCard, ShimmerButton, PulseCircle, FloatingElement } from '../../components/Animations/AnimatedComponents';

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

const RightSection = styled(GlassCard)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  border: none;
  border-radius: 0;

  @media (max-width: 968px) {
    padding: 40px 20px;
  }

  @media (max-width: 480px) {
    padding: 30px 16px;
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(0, 119, 182, 0.05) 0%, rgba(2, 62, 138, 0.05) 100%);
    transform: rotate(-45deg);
    z-index: 0;
  }
`;

const ContentWrapper = styled(motion.div)`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 400px;

  @media (max-width: 968px) {
    max-width: 100%;
    padding: 0 20px;
  }
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

const LoginForm = styled(Form)`
  width: 100%;
`;

const FormTitle = styled(motion.h2)`
  font-size: 2rem;
  color: #0077b6;
  margin-bottom: 40px;
  text-align: center;
  font-weight: 600;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, #0077b6, transparent);
  }

  @media (max-width: 968px) {
    font-size: 1.75rem;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 24px;
  }
`;

const InputWrapper = styled(motion.div)`
  position: relative;
  margin-bottom: 20px;

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
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const StyledInput = styled(Input)`
  height: 50px;
  border-radius: 8px;
  font-size: 1rem;
  border: 2px solid #e2e8f0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  &:hover, &:focus {
    border-color: #0077b6;
    box-shadow: 0 0 0 2px rgba(0, 119, 182, 0.1);
    transform: translateY(-2px);
  }

  @media (max-width: 968px) {
    height: 45px;
    font-size: 0.95rem;
  }
`;

const StyledPasswordInput = styled(Input.Password)`
  height: 50px;
  border-radius: 8px;
  font-size: 1rem;
  border: 2px solid #e2e8f0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  &:hover, &:focus {
    border-color: #0077b6;
    box-shadow: 0 0 0 2px rgba(0, 119, 182, 0.1);
    transform: translateY(-2px);
  }

  @media (max-width: 968px) {
    height: 45px;
    font-size: 0.95rem;
  }
`;

const LoginButton = styled(ShimmerButton)`
  width: 100%;
  height: 50px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 20px;
  position: relative;
  overflow: hidden;

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
    animation: ${shimmer} 2s infinite;
  }

  @media (max-width: 968px) {
    height: 45px;
    padding: 0 16px;
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

const FloatingShape = styled(FloatingElement)`
  position: absolute;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border-radius: 50%;
  z-index: 0;
  animation: ${float} 3s ease-in-out infinite;
`;

const CircleDecoration = styled(PulseCircle)`
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

const Login: React.FC = () => {
  const [form] = Form.useForm();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const handleSubmit = (values: any) => {
    console.log('Login values:', values);
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
          {[...Array(15)].map((_, i) => (
            <FloatingDot
              key={i}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 2}px`,
                height: `${Math.random() * 3 + 2}px`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </ParticleContainer>

        {[...Array(3)].map((_, i) => (
          <GradientLine
            key={i}
            style={{
              width: '150px',
              top: `${30 + i * 20}%`,
              left: '10%',
            }}
            animate={{
              x: ['-100%', '200%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1,
            }}
          />
        ))}

        <FloatingSquare
          style={{
            width: '80px',
            height: '80px',
            top: '60%',
            left: '20%',
          }}
          animate={{
            rotate: [45, 225, 45],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

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

        <CircleDecoration 
          style={{ bottom: -150, left: -150 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <FloatingShape
          style={{
            width: 200,
            height: 200,
            top: '20%',
            right: '10%',
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </LeftSection>
      
      <RightSection
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
        <RightGridLines />
        <ParticleContainer>
          {[...Array(10)].map((_, i) => (
            <FloatingDot
              key={i}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                background: 'rgba(0, 119, 182, 0.3)',
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 15 - 7.5, 0],
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </ParticleContainer>

        <FloatingSquare
          style={{
            width: '60px',
            height: '60px',
            bottom: '20%',
            right: '15%',
            border: '1px solid rgba(0, 119, 182, 0.1)',
          }}
          animate={{
            rotate: [45, -135, 45],
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.2, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {[...Array(2)].map((_, i) => (
          <GradientLine
            key={i}
            style={{
              width: '120px',
              bottom: `${40 + i * 15}%`,
              right: '20%',
              background: 'linear-gradient(90deg, transparent, rgba(0, 119, 182, 0.1), transparent)',
            }}
            animate={{
              x: ['100%', '-200%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          />
        ))}

        <ContentWrapper
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <FormTitle variants={itemVariants}>
            Welcome Back
          </FormTitle>
          
          <LoginForm 
            form={form} 
            onFinish={handleSubmit}
          >
            <InputWrapper variants={itemVariants}>
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please enter your username' }]}
              >
                <StyledInput
                  prefix={<UserOutlined style={{ color: '#0077b6' }} />}
                  placeholder="Username"
                  size="large"
                />
              </Form.Item>
            </InputWrapper>
            
            <InputWrapper variants={itemVariants}>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please enter your password' }]}
              >
                <StyledPasswordInput
                  prefix={<LockOutlined style={{ color: '#0077b6' }} />}
                  placeholder="Password"
                  size="large"
                />
              </Form.Item>
            </InputWrapper>
            
            <motion.div variants={itemVariants}>
              <LoginButton
                type="button" 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign In
              </LoginButton>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <ForgotPassword 
                href="/forgot-password"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Forgot your password?
              </ForgotPassword>
            </motion.div>
          </LoginForm>
        </ContentWrapper>

        <CircleDecoration 
          style={{ top: -100, right: -100 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </RightSection>
    </LoginContainer>
  );
};

export default Login;
