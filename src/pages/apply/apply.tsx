import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Input, Form, notification, Select, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, MobileOutlined, BankOutlined, DollarOutlined, HomeOutlined, AppstoreOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import loginBg from '../../assets/login-bg.jpg';
import { GlassCard, ShimmerButton, PulseCircle, FloatingElement } from '../../components/Animations/AnimatedComponents';
import { supabase } from '@/supabaseClient';

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
  display: flex;
  min-height: 100vh;
  background: #f3f4f6;
`;

const LeftSection = styled(motion.section)`
  flex: 1;
  background: linear-gradient(135deg, #0077b6 0%, #023e8a 100%);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding-top: 4rem;
  padding-right: 1rem;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(${loginBg}) no-repeat center center;
    background-size: cover;
    opacity: 0.05;
    z-index: 0;
  }

  @media (max-width: 968px) {
    padding: 1.5rem;
    min-height: auto;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
  }
`;

const FormContainer = styled(motion.div)`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 580px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin: auto 0;

  h1 {
    font-size: 1.8rem;
    font-weight: 700;
    color: #1a365d;
    margin-bottom: 0.25rem;
    text-align: center;
    background: linear-gradient(135deg, #0077b6 0%, #023e8a 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    text-align: center;
    color: #64748b;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .full-width {
    grid-column: 1 / -1;
  }

  .ant-form-item {
    margin-bottom: 0.5rem;
  }

  .ant-form-item-label {
    padding-bottom: 2px;

    label {
      color: #1e293b;
      font-weight: 500;
      font-size: 0.8rem;
      height: auto;
      
      &::before {
        display: none !important;
      }
    }
  }

  .ant-input-affix-wrapper {
    padding: 4px 8px;
    border-radius: 6px;
    border: 1.5px solid #e2e8f0;
    transition: all 0.3s ease;
    height: 32px;

    &:hover, &:focus {
      border-color: #0077b6;
      box-shadow: 0 0 0 2px rgba(0, 119, 182, 0.1);
    }

    .anticon {
      color: #0077b6;
      font-size: 0.9rem;
    }

    input {
      font-size: 0.85rem;
    }
  }

  .ant-select {
    .ant-select-selector {
      padding: 0 8px;
      height: 32px;
      border-radius: 6px;
      border: 1.5px solid #e2e8f0;
      transition: all 0.3s ease;

      .ant-select-selection-item {
        line-height: 30px;
        font-size: 0.85rem;
      }
    }

    &:hover, &.ant-select-focused {
      .ant-select-selector {
        border-color: #0077b6;
        box-shadow: 0 0 0 2px rgba(0, 119, 182, 0.1);
      }
    }
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 1.5rem 0;
    
    .form-grid {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }

    h1 {
      font-size: 1.5rem;
    }

    p {
      font-size: 0.85rem;
      margin-bottom: 0.75rem;
    }
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
    margin: 1.25rem 0;
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 8px;
  background: linear-gradient(135deg, #0077b6 0%, #023e8a 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
  height: 36px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 119, 182, 0.2);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const FloatingParticle = styled(motion.div)`
  position: absolute;
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
`;

const GradientCircle = styled(motion.div)`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle at center, rgba(96, 165, 250, 0.2) 0%, transparent 70%);
  z-index: 0;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  .form-header {
    margin-bottom: 0.5rem;
    h3 {
      font-size: 1.1rem;
      margin-bottom: 0.1rem;
      color: #1a1a1a;
    }
    p {
      font-size: 0.75rem;
      color: #666;
    }
  }

  .ant-form-item {
    margin-bottom: 0.5rem;
  }

  .ant-form-item-label {
    padding-bottom: 1px;
    label {
      font-size: 0.7rem;
      height: 14px;
    }
  }

  .ant-input-affix-wrapper {
    height: 28px;
    font-size: 0.8rem;
    .anticon {
      font-size: 0.9rem;
    }
  }

  .ant-select-selector {
    height: 28px !important;
    .ant-select-selection-item,
    .ant-select-selection-placeholder {
      line-height: 26px !important;
      font-size: 0.8rem !important;
    }
  }

  .grid {
    gap: 0.5rem !important;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

const LoginButton = styled(motion.button)`
  width: 100%;
  height: 28px;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

const RightSection = styled(GlassCard)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  position: relative;
  overflow: hidden;
  border: none;
  border-radius: 0;

  .content-container {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 480px;
  }

  .section-title {
    text-align: center;
    margin-bottom: 2rem;

    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #0f172a 0%, #334155 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p {
      font-size: 1rem;
      color: #64748b;
      line-height: 1.5;
    }
  }

  .features-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .feature-item {
    background: white;
    padding: 1.25rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }

    .icon {
      width: 40px;
      height: 40px;
      background: #f0f9ff;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;

      svg {
        font-size: 1.25rem;
        color: #0077b6;
      }
    }

    h3 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 0.9rem;
      color: #64748b;
      line-height: 1.4;
    }
  }

  .info-section {
    background: #f8fafc;
    padding: 1.5rem;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    margin-top: 1rem;

    h4 {
      font-size: 1rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 0.75rem;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        color: #64748b;
        margin-bottom: 0.5rem;

        svg {
          color: #0077b6;
          font-size: 1rem;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .background-pattern {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0);
    background-size: 40px 40px;
    opacity: 0.4;
    z-index: 0;
  }

  @media (max-width: 968px) {
    padding: 1.5rem;

    .section-title {
      margin-bottom: 1.5rem;

      h2 {
        font-size: 1.75rem;
      }
    }

    .features-list {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }

  @media (max-width: 480px) {
    padding: 1rem;

    .section-title {
      h2 {
        font-size: 1.5rem;
      }

      p {
        font-size: 0.9rem;
      }
    }

    .feature-item {
      padding: 1rem;

      .icon {
        width: 36px;
        height: 36px;
      }

      h3 {
        font-size: 1rem;
      }
    }
  }
`;

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
  productType: 'Loans' | 'Insurance' | 'Credit Cards';
}

const Apply: React.FC = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      console.log('Form Values:', values);
      
      // Create the payload with lowercase column names to match the database
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
        producttype: values.productType || 'Credit Cards'
      };
      
      console.log('Payload being sent to Supabase:', payload);

      const { data, error } = await supabase
        .from('applications')
        .insert([payload])
        .select();

      console.log('Complete Supabase Response:', { data, error });

      if (error) {
        console.error('Detailed Error:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }

      notification.success({
        message: 'Application Submitted',
        description: 'Your application has been successfully submitted.'
      });

      form.resetFields();
    } catch (error) {
      console.error('Full error object:', error);
      notification.error({
        message: 'Submission Failed',
        description: error.message || 'There was an error submitting your application. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LoginContainer>
      <LeftSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {[...Array(20)].map((_, i) => (
          <FloatingParticle
            key={i}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        <FormContainer
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1>Apply Now</h1>
          <p>Fill in your details to get started with your application</p>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark={false}
          >
            <div className="form-grid">
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: 'First Name is required' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Enter First Name" />
              </Form.Item>

              <Form.Item
                name="middleName"
                label="Middle Name"
              >
                <Input prefix={<UserOutlined />} placeholder="Enter Middle Name (Optional)" />
              </Form.Item>

              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: 'Last Name is required' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Enter Last Name" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Email is required' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Enter Email Address" />
              </Form.Item>

              <Form.Item
                name="mobileNumber"
                label="Mobile Number"
                rules={[
                  { required: true, message: 'Mobile Number is required' },
                  { pattern: /^[6-9]\d{9}$/, message: 'Please enter a valid 10-digit mobile number' }
                ]}
              >
                <Input
                  prefix={<MobileOutlined />}
                  placeholder="Enter Mobile Number"
                  maxLength={10}
                />
              </Form.Item>

              <Form.Item
                name="currentCompany"
                label="Current Company"
                rules={[{ required: true, message: 'Current Company is required' }]}
              >
                <Input prefix={<HomeOutlined />} placeholder="Enter Company Name" />
              </Form.Item>

              <Form.Item
                name="monthlySalary"
                label="Monthly Salary"
                rules={[
                  { required: true, message: 'Monthly Salary is required' },
                  { pattern: /^\d+$/, message: 'Please enter a valid amount' }
                ]}
              >
                <Input
                  prefix={<DollarOutlined />}
                  placeholder="Enter Monthly Salary"
                  type="number"
                />
              </Form.Item>

              <Form.Item
                name="netTakeHome"
                label="Net Take Home"
                rules={[
                  { required: true, message: 'Net Take Home is required' },
                  { pattern: /^\d+$/, message: 'Please enter a valid amount' }
                ]}
              >
                <Input
                  prefix={<DollarOutlined />}
                  placeholder="Enter Net Take Home"
                  type="number"
                />
              </Form.Item>

              <Form.Item
                className="full-width"
                name="bankingDetails"
                label="Banking Details"
                rules={[{ required: true, message: 'Banking Details are required' }]}
              >
                <Input
                  prefix={<BankOutlined />}
                  placeholder="Enter Bank Name and Account Number"
                />
              </Form.Item>

              <Form.Item
                className="full-width"
                name="productType"
                label="Product Type"
                rules={[{ required: true, message: 'Product Type is required' }]}
              >
                <Select
                  placeholder="Select Product Type"
                  suffixIcon={<AppstoreOutlined className="text-primary" />}
                >
                  <Select.Option value="Loans">Loans</Select.Option>
                  <Select.Option value="Insurance">Insurance</Select.Option>
                  <Select.Option value="Credit Cards">Credit Cards</Select.Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item>
              <SubmitButton
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </SubmitButton>
            </Form.Item>
          </Form>
        </FormContainer>
      </LeftSection>

      <RightSection
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="background-pattern" />
        <div className="content-container">
          <div className="section-title">
            <h2>Why Choose Us?</h2>
            <p>Discover the advantages of our financial solutions</p>
          </div>

          <div className="features-list">
            <motion.div 
              className="feature-item"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="icon">
                <DollarOutlined />
              </div>
              <h3>Competitive Rates</h3>
              <p>Get access to the best market rates and flexible repayment options.</p>
            </motion.div>

            <motion.div 
              className="feature-item"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="icon">
                <BankOutlined />
              </div>
              <h3>Quick Processing</h3>
              <p>Fast approval process with minimal documentation required.</p>
            </motion.div>

            <motion.div 
              className="feature-item"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="icon">
                <UserOutlined />
              </div>
              <h3>Dedicated Support</h3>
              <p>Personal assistance throughout your application journey.</p>
            </motion.div>

            <motion.div 
              className="feature-item"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="icon">
                <LockOutlined />
              </div>
              <h3>Secure Process</h3>
              <p>Your information is protected with bank-grade security.</p>
            </motion.div>
          </div>

          <div className="info-section">
            <h4>What you'll need:</h4>
            <ul>
              <li>
                <UserOutlined /> Valid identification documents
              </li>
              <li>
                <BankOutlined /> Recent bank statements
              </li>
              <li>
                <HomeOutlined /> Proof of address
              </li>
              <li>
                <DollarOutlined /> Salary slips or income proof
              </li>
            </ul>
          </div>
        </div>
      </RightSection>
    </LoginContainer>
  );
};

export default Apply;
