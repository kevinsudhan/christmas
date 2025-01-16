import React, { useState, useEffect } from 'react';
import { Form, Input, notification, Button, Select, Typography, Row, Col, Card } from 'antd';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  UserOutlined,
  MailOutlined,
  MobileOutlined,
  BankOutlined,
  DollarOutlined,
  HomeOutlined,
  SafetyOutlined,
  RiseOutlined,
  CheckCircleFilled,
  CalculatorOutlined,
  ShopOutlined,
  SwapOutlined,
  GoldOutlined
} from '@ant-design/icons';

import { colors, typography, spacing, effects, breakpoints } from '../../styles/theme';
import Footer from '../../components/Footer/Footer';
import loanHeroImage from '../../assets/images/hero/loan-main-hero.png';
import { supabase } from '@/supabaseClient';

const { Title, Text } = Typography;
const { Option } = Select;

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f7fa;
`;

const HeroSection = styled.section`
  padding: 60px 5%;
  background: linear-gradient(135deg, #0077b6 0%, #023e8a 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 400px;
  margin-top: 0;
  padding-top: 100px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-size: cover;
    opacity: 0.1;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #0077b6 0%, #023e8a 100%);
    opacity: 0.85;
    z-index: 1;
  }
  
   /* Modern geometric shapes */
  .shape-1, .shape-2, .shape-3, .shape-4 {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
    backdrop-filter: blur(5px);
    z-index: 2;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .shape-1 {
    width: 300px;
    height: 300px;
    top: -100px;
    right: -50px;
    animation: float 15s ease-in-out infinite;
  }

  .shape-2 {
    width: 200px;
    height: 200px;
    bottom: -50px;
    left: -50px;
    animation: float 20s ease-in-out infinite reverse;
  }

  .shape-3 {
    width: 150px;
    height: 150px;
    top: 50%;
    left: 15%;
    animation: float 18s ease-in-out infinite 1s;
  }

  .shape-4 {
    width: 100px;
    height: 100px;
    bottom: 20%;
    right: 15%;
    animation: float 12s ease-in-out infinite 0.5s;
  }

  /* Animated lines */
  .line-1, .line-2 {
    position: absolute;
    width: 200px;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    z-index: 2;
    transform: rotate(-45deg);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  }

  .line-1 {
    top: 20%;
    right: 10%;
    animation: moveLine 8s linear infinite;
  }

  .line-2 {
    bottom: 30%;
    left: 5%;
    animation: moveLine 12s linear infinite reverse;
  }

  /* Dot grid pattern */
  .dot-pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px);
    background-size: 40px 40px;
    z-index: 2;
    opacity: 0.7;
  }

  .shape-1, .shape-2, .shape-3, .shape-4 {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
    backdrop-filter: blur(5px);
    z-index: 2;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  

  @keyframes float {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(5deg);
    }
  }

  @keyframes moveLine {
    0% {
      transform: translateX(-100%) rotate(-45deg);
    }
    100% {
      transform: translateX(100%) rotate(-45deg);
    }
      @media (max-width: 1024px) {
    flex-direction: column;
    gap: 30px;
    padding: 100px 5% 40px;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  max-width: 600px;
  color: ${colors.text.white};
  padding: 20px 40px;
  position: relative;
  z-index: 2;

  h1 {
    font-family: ${typography.fontFamily.heading};
    font-size: ${typography.fontSize.hero.title};
    font-weight: ${typography.fontWeight.bold};
    line-height: ${typography.lineHeight.tight};
    margin-bottom: 1rem;
    color: white;
  }

  p {
    font-family: ${typography.fontFamily.primary};
    font-size: ${typography.fontSize.hero.subtitle};
    line-height: ${typography.lineHeight.relaxed};
    margin-bottom: 1.5rem;
  }

  .feature-tags {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    margin-top: 1.5rem;
  }
`;

const HeroImage = styled.div`
  
  flex: 1;
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: floatAnimation 3s ease-in-out infinite;
  opacity: 1;
  z-index: 2;
  position: relative;

  @keyframes floatAnimation {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-15px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  img {
    max-width: 90%;
    height: auto;
    filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.2)) brightness(1.2) contrast(1.1);
    transform: perspective(1000px) rotateY(-15deg);
    transition: transform 0.3s ease;
    opacity: 1;

    &:hover {
      transform: perspective(1000px) rotateY(-5deg) translateY(-10px);
    }
  }

  @media (max-width: 1024px) {
    max-width: 350px;
    margin: 0 auto;
    
    img {
      max-width: 85%;
      transform: perspective(1000px) rotateY(0deg);
      &:hover {
        transform: perspective(1000px) rotateY(0deg) translateY(-10px);
      }
    }
  }
`;

const FeatureTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  .anticon {
    font-size: 1rem;
  }
`;

const QuoteSection = styled.section`
  padding: 80px 5%;
  background: ${colors.background.light};
`;

const QuoteForm = styled(Form)`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
  background: white;
  border-radius: 24px;
  box-shadow: ${effects.shadow.medium};

  .form-header {
    text-align: center;
    margin-bottom: 40px;

    h2 {
      color: ${colors.text.primary};
      margin-bottom: 12px;
    }

    p {
      color: ${colors.text.secondary};
    }
  }

  .ant-form-item {
    margin-bottom: 24px;
  }

  .ant-input,
  .ant-select-selector {
    height: 45px;
    border-radius: 8px;
    border: 1px solid ${colors.border.main};
  }

  .ant-btn {
    height: 45px;
    font-weight: 600;
  }
`;

const ApplicationSection = styled.section`
  width: 100vw;
  margin-left: 50%;
  transform: translateX(-50%);
  background: ${colors.background.primary};
  padding: 80px 0;
  display: flex;
  justify-content: center;
`;

const ApplicationContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 40px;
  display: flex;
  position: relative;
  background: ${colors.background.white};
  border-radius: 24px;
  overflow: hidden;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    margin: 0 20px;
  }
`;

const FormLeftSection = styled.div`
  width: 45%;
  background: linear-gradient(135deg, #0077b6 0%, #023e8a 100%);
  color: ${colors.text.white};
  padding: 50px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -30%;
    right: -30%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -20%;
    left: -20%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%);
    border-radius: 50%;
  }

  > * {
    position: relative;
    z-index: 1;
  }

  h3 {
    font-family: ${typography.fontFamily.heading};
    font-size: ${typography.fontSize.h3.desktop};
    font-weight: ${typography.fontWeight.bold};
    line-height: ${typography.lineHeight.tight};
    margin-bottom: 1.2rem;
  }

  p {
    font-family: ${typography.fontFamily.primary};
    font-size: ${typography.fontSize.body.regular};
    line-height: ${typography.lineHeight.relaxed};
    margin-bottom: 1.5rem;
    opacity: 0.9;
  }

  .benefits {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 0.8rem;
      font-size: ${typography.fontSize.body.small};
      line-height: ${typography.lineHeight.normal};

      .anticon {
        font-size: 1rem;
        color: #6dd5ed;
      }
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    padding: 40px;
    
    h3 {
      font-size: ${typography.fontSize.h3.tablet};
    }
  }
`;

const FormContainer = styled.div`
  width: 55%;
  padding: 50px;
  position: relative;
  overflow: hidden;
  background: ${colors.background.white};

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: ${colors.primary.gradient};
    opacity: 0.03;
    border-radius: 50%;
    transform: rotate(-15deg);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -50%;
    left: -50%;
    width: 100%;
    height: 100%;
    background: ${colors.primary.gradient};
    opacity: 0.03;
    border-radius: 50%;
    transform: rotate(15deg);
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    padding: 40px;
  }
`;

const StyledForm = styled(Form)`
  .form-header {
    text-align: center;
    margin-bottom: 30px;

    h3 {
      font-family: ${typography.fontFamily.heading};
      font-size: ${typography.fontSize.h4.desktop};
      font-weight: ${typography.fontWeight.bold};
      color: ${colors.text.primary};
      margin-bottom: 8px;
    }

    p {
      font-family: ${typography.fontFamily.primary};
      font-size: ${typography.fontSize.body.small};
      color: ${colors.text.secondary};
      line-height: ${typography.lineHeight.relaxed};
    }
  }

  .ant-form-item {
    margin-bottom: 20px;
  }

  .ant-btn {
    height: 45px;
    border-radius: 12px;
    font-size: ${typography.fontSize.body.regular};
  }

  .ant-form-item-label {
    padding-bottom: 4px;
    
    label {
      font-size: ${typography.fontSize.body.small};
      height: auto;
    }
  }
`;

const StyledInput = styled(Input)`
  height: 42px;
  border-radius: 8px;
  font-size: 0.95rem;
  border: 2px solid rgba(0, 119, 182, 0.1);
  background: white;

  .ant-input-prefix {
    margin-right: 10px;
    color: #0077b6;
  }

  &:hover, &:focus {
    border-color: #0077b6;
    box-shadow: 0 2px 8px rgba(0, 119, 182, 0.1);
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
  height: 50px;
  font-size: 18px;
  font-weight: 600;
  background: linear-gradient(135deg, #0077b6 0%, #023e8a 100%);
  border: none;
  margin-top: 20px;

  &:hover {
    background: linear-gradient(135deg, #023e8a 0%, #0077b6 100%);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 119, 182, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Loans: React.FC = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();

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

  interface FormValues {
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    currentCompany: string;
    monthlySalary: number;
    netTakeHome: number;
    bankingDetails: string;
  }
  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const payload = {
        firstname: values.firstName,
        middlename: values.middleName || null,
        lastname: values.lastName,
        email: values.email,
        mobilenumber: values.mobileNumber,
        currentcompany: values.currentCompany,
        monthlysalary: Number(values.monthlySalary),
        nettakehome: Number(values.netTakeHome),
        bankingdetails: values.bankingDetails,
        producttype: 'Credit Cards'
      };
  
      console.log('Submitting payload:', payload);
  
      const { data, error } = await supabase
        .from('applications')
        .insert([payload])
        .select();
  
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
  
      notification.success({
        message: 'Application Submitted',
        description: 'Your credit card application has been successfully submitted.'
      });
  
      form.resetFields();
    } catch (error) {
      console.error('Submission error:', error);
      notification.error({
        message: 'Submission Failed',
        description: error.message || 'There was an error submitting your application. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <HeroSection>
        <div className="shape-1" />
        <div className="shape-2" />
        <div className="shape-3" />
        <div className="shape-4" />
        <div className="line-1" />
        <div className="line-2" />
        <div className="dot-pattern" />
        
        <HeroContent>
          <h1>Unlock Your Financial Potential with EBS Loans</h1>
          <p>
            Experience hassle-free borrowing with competitive interest rates and flexible repayment options. 
            Our expert financial advisors are here to help you choose the right loan solution.
          </p>
          <div className="feature-tags">
            <FeatureTag>
              <DollarOutlined /> Quick Approval
            </FeatureTag>
            <FeatureTag>
              <SafetyOutlined /> 100% Secure
            </FeatureTag>
            <FeatureTag>
              <RiseOutlined /> Low Interest
            </FeatureTag>
          </div>
        </HeroContent>
        <HeroImage>
          <img src={loanHeroImage} alt="Loan Services" />
        </HeroImage>
      </HeroSection>

      <ApplicationSection id="loan-application">
        <ApplicationContainer>
          <FormLeftSection>
            <h3>Why Choose Our Loans?</h3>
            <p>Experience a world of financial flexibility with our diverse loan offerings.</p>
            <ul className="benefits">
              <li>
                <CheckCircleFilled /> Quick approval process
              </li>
              <li>
                <CheckCircleFilled /> Competitive interest rates
              </li>
              <li>
                <CheckCircleFilled /> Minimal documentation required
              </li>
              <li>
                <CheckCircleFilled /> Flexible repayment options
              </li>
              <li>
                <CheckCircleFilled /> Dedicated relationship manager
              </li>
            </ul>
          </FormLeftSection>

          <FormContainer>
          <StyledForm
  form={form}
  layout="vertical"
  onFinish={handleSubmit}
  requiredMark={false}
>
  <div className="form-header">
    <h3>Credit Card Application</h3>
    <p>Fill in your details below</p>
  </div>

  <div className="grid grid-cols-2 gap-4">
    <motion.div variants={itemVariants}>
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[{ required: true, message: 'First Name is required' }]}
      >
        <StyledInput prefix={<UserOutlined />} placeholder="Enter First Name" />
      </Form.Item>
    </motion.div>

    <motion.div variants={itemVariants}>
      <Form.Item
        name="middleName"
        label="Middle Name"
      >
        <StyledInput prefix={<UserOutlined />} placeholder="Enter Middle Name (Optional)" />
      </Form.Item>
    </motion.div>
  </div>

  <motion.div variants={itemVariants}>
    <Form.Item
      name="lastName"
      label="Last Name"
      rules={[{ required: true, message: 'Last Name is required' }]}
    >
      <StyledInput prefix={<UserOutlined />} placeholder="Enter Last Name" />
    </Form.Item>
  </motion.div>

  <motion.div variants={itemVariants}>
    <Form.Item
      name="email"
      label="Email"
      rules={[
        { required: true, message: 'Email is required' },
        { type: 'email', message: 'Please enter a valid email' }
      ]}
    >
      <StyledInput prefix={<MailOutlined />} placeholder="Enter Email Address" />
    </Form.Item>
  </motion.div>

  <motion.div variants={itemVariants}>
    <Form.Item
      name="mobileNumber"
      label="Mobile Number"
      rules={[
        { required: true, message: 'Mobile Number is required' },
        { pattern: /^[6-9]\d{9}$/, message: 'Please enter a valid 10-digit mobile number' }
      ]}
    >
      <StyledInput 
        prefix={<MobileOutlined />} 
        placeholder="Enter Mobile Number" 
        maxLength={10}
      />
    </Form.Item>
  </motion.div>

  <motion.div variants={itemVariants}>
    <Form.Item
      name="currentCompany"
      label="Current Company"
      rules={[{ required: true, message: 'Current Company is required' }]}
    >
      <StyledInput prefix={<HomeOutlined />} placeholder="Enter Company Name" />
    </Form.Item>
  </motion.div>

  <div className="grid grid-cols-2 gap-4">
    <motion.div variants={itemVariants}>
      <Form.Item
        name="monthlySalary"
        label="Monthly Salary"
        rules={[
          { required: true, message: 'Monthly Salary is required' },
          { pattern: /^\d+$/, message: 'Please enter a valid amount' }
        ]}
      >
        <StyledInput 
          prefix={<DollarOutlined />} 
          placeholder="Enter Monthly Salary" 
          type="number"
        />
      </Form.Item>
    </motion.div>

    <motion.div variants={itemVariants}>
      <Form.Item
        name="netTakeHome"
        label="Net Take Home"
        rules={[
          { required: true, message: 'Net Take Home is required' },
          { pattern: /^\d+$/, message: 'Please enter a valid amount' }
        ]}
      >
        <StyledInput 
          prefix={<DollarOutlined />} 
          placeholder="Enter Net Take Home" 
          type="number"
        />
      </Form.Item>
    </motion.div>
  </div>

  <motion.div variants={itemVariants}>
    <Form.Item
      name="bankingDetails"
      label="Banking Details"
      rules={[{ required: true, message: 'Banking Details are required' }]}
    >
      <StyledInput 
        prefix={<BankOutlined />} 
        placeholder="Enter Bank Name and Account Number" 
      />
    </Form.Item>
  </motion.div>

  <motion.div variants={itemVariants}>
    <Form.Item>
      <SubmitButton
        type="primary"
        htmlType="submit"
        loading={isSubmitting}
      >
        Submit Application
      </SubmitButton>
    </Form.Item>
  </motion.div>
</StyledForm>
          </FormContainer>
        </ApplicationContainer>
      </ApplicationSection>

      <Footer />
    </PageContainer>
  );
};

export default Loans;

