import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Input, Form, notification, Select, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, MobileOutlined, BankOutlined, DollarOutlined, HomeOutlined, AppstoreOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import loginBg from '../../assets/login-bg.jpg';
import { GlassCard, ShimmerButton, PulseCircle, FloatingElement } from '../../components/Animations/AnimatedComponents';
import { submitApplication } from '@/services/applicationService';
import { sendWhatsAppMessage } from '@/services/whatsappService';

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
  align-items: center;
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
  margin: 0 auto;
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

const StyledInput = styled(Input)`
  height: 42px;
  border-radius: 8px;
  font-size: 0.95rem;
  border: 2px solid rgba(0, 119, 182, 0.1);

  .ant-input-prefix {
    margin-right: 10px;
    color: #0077b6;
    opacity: 0.8;
  }

  &:hover {
    border-color: #0077b6;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 119, 182, 0.1);
  }

  &:focus {
    border-color: #0077b6;
    box-shadow: 0 0 0 2px rgba(0, 119, 182, 0.1);
    transform: translateY(-1px);
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

interface FormValues {
  name: string;
  salary: number;
  mobileNumber: string;
  email: string;
  currentCompany: string;
  netTakeHome: number;
  bankAccountDetails: string;
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
      console.log('Form values:', values);

      const applicationData = {
        name: values.name,
        salary: values.salary,
        mobile_number: values.mobileNumber,
        email: values.email,
        current_company: values.currentCompany,
        net_take_home: values.netTakeHome,
        bank_account_details: values.bankAccountDetails,
        product_type: values.productType,
      };

      console.log('Formatted application data:', applicationData);

      await submitApplication(applicationData);
      
      // Send WhatsApp message
      try {
        await sendWhatsAppMessage(values.mobileNumber);
      } catch (whatsappError) {
        console.error('WhatsApp message error:', whatsappError);
        // Don't show error to user as the form submission was successful
      }
      
      notification.success({
        message: 'Application Submitted',
        description: 'Your loan application has been submitted successfully. We will contact you soon.',
      });
      
      form.resetFields();
    } catch (error: any) {
      console.error('Form submission error:', error);
      
      notification.error({
        message: 'Submission Failed',
        description: error.message || 'There was an error submitting your application. Please try again.',
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
            onFinish={handleSubmit}
            layout="vertical"
            requiredMark={false}
            className="space-y-3"
          >
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
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Required' }]}
              >
                <StyledInput prefix={<UserOutlined />} placeholder="Full Name" />
              </Form.Item>
            </motion.div>

            <div className="grid grid-cols-2 gap-3">
              <motion.div variants={itemVariants}>
                <Form.Item
                  name="salary"
                  rules={[
                    { required: true, message: 'Required' },
                    { pattern: /^\d+$/, message: 'Invalid amount' }
                  ]}
                >
                  <StyledInput prefix={<DollarOutlined />} placeholder="Monthly Salary" />
                </Form.Item>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Form.Item
                  name="netTakeHome"
                  rules={[
                    { required: true, message: 'Required' },
                    { pattern: /^\d+$/, message: 'Invalid amount' }
                  ]}
                >
                  <StyledInput prefix={<DollarOutlined />} placeholder="Net Take Home" />
                </Form.Item>
              </motion.div>
            </div>

            <motion.div variants={itemVariants}>
              <Form.Item
                name="mobileNumber"
                rules={[
                  { required: true, message: 'Required' },
                  { pattern: /^\d{10}$/, message: 'Invalid phone number' }
                ]}
              >
                <StyledInput prefix={<MobileOutlined />} placeholder="Mobile Number" />
              </Form.Item>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Required' },
                  { type: 'email', message: 'Invalid email' }
                ]}
              >
                <StyledInput prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Form.Item
                name="currentCompany"
                rules={[{ required: true, message: 'Required' }]}
              >
                <StyledInput prefix={<BankOutlined />} placeholder="Current Company" />
              </Form.Item>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Form.Item
                name="bankAccountDetails"
                rules={[{ required: true, message: 'Required' }]}
              >
                <StyledInput.TextArea
                  placeholder="Bank Account Details"
                  autoSize={{ minRows: 2, maxRows: 3 }}
                  className="text-sm"
                />
              </Form.Item>
            </motion.div>

            <motion.div variants={itemVariants}>
              <ShimmerButton
                type="submit"
                disabled={isSubmitting}
                className="w-full h-10 text-sm"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </ShimmerButton>
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
                <StyledInput prefix={<UserOutlined />} placeholder="Email" />
              </Form.Item>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Required' }]}
              >
                <StyledInput.Password prefix={<LockOutlined />} placeholder="Password" />
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
