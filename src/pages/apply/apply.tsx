import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Input, Form } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, MobileOutlined, BankOutlined, DollarOutlined, HomeOutlined } from '@ant-design/icons';
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
  padding: 40px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 119, 182, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 968px) {
    max-width: 100%;
    padding: 30px;
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
  font-size: 2.2rem;
  color: #0077b6;
  margin-bottom: 40px;
  text-align: center;
  font-weight: 700;
  position: relative;
  background: linear-gradient(135deg, #0077b6 0%, #023e8a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 4px;
    background: linear-gradient(90deg, #0077b6, #023e8a);
    border-radius: 2px;
  }

  @media (max-width: 968px) {
    font-size: 1.8rem;
    margin-bottom: 30px;
  }
`;

const InputWrapper = styled(motion.div)`
  position: relative;
  margin-bottom: 24px;

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
  height: 54px;
  border-radius: 12px;
  font-size: 1.1rem;
  border: 2px solid rgba(0, 119, 182, 0.1);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  padding: 0 20px;
  transition: all 0.3s ease;

  .ant-input {
    background: transparent;
  }

  .ant-input-prefix {
    margin-right: 15px;
    color: #0077b6;
    font-size: 1.2rem;
    opacity: 0.8;
    transition: all 0.3s ease;
  }

  &:hover {
    border-color: #0077b6;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 119, 182, 0.1);

    .ant-input-prefix {
      opacity: 1;
      transform: scale(1.1);
    }
  }

  &:focus {
    border-color: #0077b6;
    box-shadow: 0 0 0 2px rgba(0, 119, 182, 0.2);
    transform: translateY(-2px);
  }

  @media (max-width: 968px) {
    height: 50px;
    font-size: 1rem;
  }
`;

const StyledPasswordInput = styled(Input.Password)`
  height: 54px;
  border-radius: 12px;
  font-size: 1.1rem;
  border: 2px solid rgba(0, 119, 182, 0.1);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  padding: 0 20px;
  transition: all 0.3s ease;

  .ant-input {
    background: transparent;
  }

  .ant-input-prefix {
    margin-right: 15px;
    color: #0077b6;
    font-size: 1.2rem;
    opacity: 0.8;
    transition: all 0.3s ease;
  }

  .ant-input-suffix {
    font-size: 1.2rem;
    color: #0077b6;
    opacity: 0.8;
    transition: all 0.3s ease;
  }

  &:hover {
    border-color: #0077b6;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 119, 182, 0.1);

    .ant-input-prefix,
    .ant-input-suffix {
      opacity: 1;
      transform: scale(1.1);
    }
  }

  &:focus {
    border-color: #0077b6;
    box-shadow: 0 0 0 2px rgba(0, 119, 182, 0.2);
    transform: translateY(-2px);
  }

  @media (max-width: 968px) {
    height: 50px;
    font-size: 1rem;
  }
`;

const LoginButton = styled(motion.button)`
  width: 100%;
  height: 54px;
  background: linear-gradient(135deg, #0077b6 0%, #023e8a 100%);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

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

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 119, 182, 0.3);
  }

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: 968px) {
    height: 50px;
    font-size: 1rem;
  }
`;

const ForgotPassword = styled(motion.a)`
  display: block;
  text-align: center;
  color: #0077b6;
  font-size: 1rem;
  margin-top: 20px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  text-shadow: 0 0 1px rgba(0, 119, 182, 0.1);

  &:hover {
    color: #023e8a;
    text-shadow: 0 0 2px rgba(0, 119, 182, 0.2);
  }
`;

const ParticleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
`;

const FloatingDot = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
`;

const FloatingSquare = styled(motion.div)`
  position: absolute;
  transform: rotate(45deg);
  pointer-events: none;
`;

const GradientLine = styled(motion.div)`
  position: absolute;
  height: 1px;
  pointer-events: none;
`;

const CircleDecoration = styled(motion.div)`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  pointer-events: none;
`;

const FloatingShape = styled(FloatingElement)`
  position: absolute;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border-radius: 50%;
  z-index: 0;
  animation: ${float} 3s ease-in-out infinite;
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

const GlowingOrb = styled(motion.div)`
  position: absolute;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 1;
`;

const Apply: React.FC = () => {
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
    console.log('Form values:', values);
  };

  return (
    <LoginContainer>
      <LeftSection
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <GridLines />
        
        <ParticleContainer>
          {[...Array(10)].map((_, i) => (
            <FloatingDot
              key={i}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                background: 'rgba(255, 255, 255, 0.3)',
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

        <FloatingShape
          style={{
            width: '150px',
            height: '150px',
            top: '20%',
            left: '10%',
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <FloatingShape
          style={{
            width: '100px',
            height: '100px',
            bottom: '15%',
            right: '5%',
          }}
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <GlowingOrb
          style={{
            width: '300px',
            height: '300px',
            top: '30%',
            right: '20%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <FloatingSquare
          style={{
            width: '60px',
            height: '60px',
            bottom: '20%',
            right: '15%',
            border: '1px solid rgba(255, 255, 255, 0.1)',
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
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
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

        <CircleDecoration 
          style={{ bottom: -100, left: -100 }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <HeroContent>
          <MainTitle
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Enquire Now!
          </MainTitle>
          <Tagline
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Complete your application in minutes
          </Tagline>
          <LoginForm onFinish={handleSubmit}>
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <StyledInput prefix={<UserOutlined />} placeholder="Full Name" />
            </Form.Item>


            <Form.Item
              name="mobile"
              rules={[
                { required: true, message: 'Please enter your mobile number' },
                { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit mobile number' }
              ]}
            >
              <StyledInput prefix={<MobileOutlined />} placeholder="Mobile Number" maxLength={10} />
            </Form.Item>



            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email address' }
              ]}
            >
              <StyledInput prefix={<MailOutlined />} placeholder="Email Address" />
            </Form.Item>

            <Form.Item
              name="salary"
              rules={[{ required: true, message: 'Please enter your salary' }]}
            >
              <StyledInput prefix={<DollarOutlined />} placeholder="Monthly Salary" type="number" />
            </Form.Item>


            <Form.Item
              name="company"
              rules={[{ required: true, message: 'Please enter your current company' }]}
            >
              <StyledInput prefix={<HomeOutlined />} placeholder="Current Employer Company" />
            </Form.Item>

            <Form.Item
              name="netTakeHome"
              rules={[{ required: true, message: 'Please enter your net take home' }]}
            >
              <StyledInput prefix={<DollarOutlined />} placeholder="Net Take Home" type="number" />
            </Form.Item>

            <Form.Item
              name="bankDetails"
              rules={[{ required: true, message: 'Please enter your bank account details' }]}
            >
              <StyledInput prefix={<BankOutlined />} placeholder="Salary Bank Account Details" />
            </Form.Item>

            <ShimmerButton type="submit">Submit Application</ShimmerButton>
          </LoginForm>
        </HeroContent>
      </LeftSection>
      <RightSection
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
        <RightGridLines />
        <GlowingOrb
          style={{
            width: '400px',
            height: '400px',
            top: '-10%',
            right: '-10%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.07, 0.03],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <GlowingOrb
          style={{
            width: '300px',
            height: '300px',
            bottom: '-5%',
            left: '-5%',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.02, 0.05, 0.02],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <FloatingShape
          style={{
            width: '80px',
            height: '80px',
            top: '10%',
            left: '10%',
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <FloatingShape
          style={{
            width: '60px',
            height: '60px',
            bottom: '15%',
            right: '10%',
          }}
          animate={{
            rotate: [360, 0],
            scale: [1, 1.15, 1],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
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
            Login via Loan Assist
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

export default Apply;
