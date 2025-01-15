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
  padding: 1.5rem;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #0077b6 0%, #023e8a 100%);
  }

  .form-header {
    margin-bottom: 1rem;
    text-align: center;

    h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 0.25rem;
    }

    p {
      color: #666;
      font-size: 0.875rem;
    }
  }

  .ant-form-item {
    margin-bottom: 0.75rem;
  }

  .ant-form-item-label {
    padding-bottom: 2px;
    
    label {
      font-size: 0.75rem;
      color: #4b5563;
      height: 16px;
    }
  }

  .ant-input-affix-wrapper {
    border-radius: 6px;
    border: 1px solid #e5e7eb;
    transition: all 0.2s;
    background: #ffffff;
    height: 32px;

    &:hover, &:focus {
      border-color: #0077b6;
      box-shadow: 0 0 0 2px rgba(0, 119, 182, 0.1);
    }
  }

  .ant-select {
    .ant-select-selector {
      border-radius: 6px;
      border: 1px solid #e5e7eb;
      height: 32px;
      padding: 0 11px;
      
      .ant-select-selection-placeholder,
      .ant-select-selection-item {
        line-height: 30px;
        font-size: 0.875rem;
      }
    }

    &:hover, &.ant-select-focused {
      .ant-select-selector {
        border-color: #0077b6;
        box-shadow: 0 0 0 2px rgba(0, 119, 182, 0.1);
      }
    }
  }

  .grid {
    gap: 0.75rem !important;
  }

  @media (max-width: 968px) {
    padding: 1rem;
  }
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
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ContentWrapper>
          <motion.h1
            className="text-2xl font-bold text-white mb-6 text-center"
            variants={itemVariants}
          >
            Enquire Now
          </motion.h1>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark={false}
            className="space-y-3"
          >
            <div className="form-header">
              <h3>Application Form</h3>
              <p>Fill in your details below</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div variants={itemVariants}>
                <Form.Item
                  name="firstName"
                  label="First Name"
                  rules={[{ required: true, message: 'First Name is required' }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Enter First Name" />
                </Form.Item>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Form.Item
                  name="middleName"
                  label="Middle Name"
                >
                  <Input prefix={<UserOutlined />} placeholder="Enter Middle Name (Optional)" />
                </Form.Item>
              </motion.div>
            </div>

            <motion.div variants={itemVariants}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: 'Last Name is required' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Enter Last Name" />
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
                <Input prefix={<MailOutlined />} placeholder="Enter Email Address" />
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
                <Input
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
                <Input prefix={<HomeOutlined />} placeholder="Enter Company Name" />
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
                  <Input
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
                  <Input
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
                <Input
                  prefix={<BankOutlined />}
                  placeholder="Enter Bank Name and Account Number"
                />
              </Form.Item>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Form.Item
                name="productType"
                rules={[{ required: true, message: 'Required' }]}
              >
                <Select
                  placeholder="Select Product Type"
                  className="h-[42px]"
                  suffixIcon={<AppstoreOutlined className="text-primary opacity-80" />}
                >
                  <Select.Option value="Loans">Loans</Select.Option>
                  <Select.Option value="Insurance">Insurance</Select.Option>
                  <Select.Option value="Credit Cards">Credit Cards</Select.Option>
                </Select>
              </Form.Item>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Form.Item>
                <LoginButton
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </LoginButton>
              </Form.Item>
            </motion.div>
          </Form>
        </ContentWrapper>
      </LeftSection>

      <RightSection
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ContentWrapper>
          <motion.h2
            className="text-2xl font-bold text-primary mb-8 text-center"
            variants={itemVariants}
          >
            Login to Your Account
          </motion.h2>
          <Form
            layout="vertical"
            requiredMark={false}
            className="space-y-4"
          >
            <motion.div variants={itemVariants}>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Required' },
                  { type: 'email', message: 'Invalid email' }
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Email" />
              </Form.Item>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Required' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
              </Form.Item>
            </motion.div>

            <motion.div variants={itemVariants}>
              <ShimmerButton
                type="submit"
                className="w-full h-10 text-sm"
              >
                Login
              </ShimmerButton>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="text-center mt-4"
            >
              <a href="#" className="text-primary text-sm hover:underline">
                Forgot Password?
              </a>
            </motion.div>
          </Form>
        </ContentWrapper>
      </RightSection>
    </LoginContainer>
  );
};

export default Apply;
