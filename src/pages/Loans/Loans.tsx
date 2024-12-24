import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { Card, Row, Col, Typography, Form, Input, Select, Button } from 'antd';
import { BankOutlined, SafetyOutlined, DollarOutlined, HomeOutlined, CalculatorOutlined, RiseOutlined, CheckCircleFilled, UserOutlined, ShopOutlined, SwapOutlined, GoldOutlined } from '@ant-design/icons';
import { typography, colors, effects, spacing, breakpoints } from '../../styles/theme';
import Footer from '../../components/Footer/Footer';
import loanHeroImage from '../../assets/images/hero/loan-main-hero.png';

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
    background: url(${loanHeroImage}) no-repeat center center;
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

const LoanTypesSection = styled.section`
  padding: 60px 4%;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0, 119, 182, 0.2), transparent);
  }

  .section-title {
    text-align: center;
    margin-bottom: 35px;
    position: relative;
    font-size: 2.5rem;
    color: ${colors.text.primary};
    
    &:after {
      content: '';
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: ${colors.primary.gradient};
      border-radius: 2px;
    }
  }

  .ant-row {
    max-width: 1200px;
    width: 100%;
    margin: -8px !important;
    display: flex;
    justify-content: center;
    align-items: stretch;
  }

  .ant-col {
    padding: 8px !important;
    display: flex;
    justify-content: center;
    transition: all 0.3s ease;
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 50px 3%;
    
    .section-title {
      font-size: 2rem;
      margin-bottom: 30px;
    }

    .ant-row {
      margin: -6px !important;
    }

    .ant-col {
      padding: 6px !important;
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 40px 2%;
    
    .section-title {
      font-size: 1.8rem;
      margin-bottom: 25px;
    }

    .ant-row {
      margin: -4px !important;
    }

    .ant-col {
      padding: 4px !important;
    }
  }
`;

const LoanCard = styled(Card)`
  width: 100%;
  max-width: 320px;
  height: 100%;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: white;
  position: relative;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);

    .ant-card-cover .anticon {
      transform: scale(1.1);
      background: ${colors.primary.gradient};
      color: white;
    }
  }

  .ant-card-cover {
    padding: 24px 20px 0;
    background: transparent;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    
    .anticon {
      font-size: 24px;
      color: ${colors.primary.main};
      background: ${colors.primary.light};
      padding: 14px;
      border-radius: 14px;
      transition: all 0.4s ease;
      box-shadow: 0 4px 10px rgba(0, 119, 182, 0.1);
    }
  }

  .ant-card-body {
    padding: 20px;
  }

  .ant-card-meta-title {
    font-size: 1.2rem;
    margin-bottom: 12px;
    color: ${colors.text.primary};
    font-weight: 600;
    line-height: 1.3;
  }

  .ant-card-meta-description {
    color: ${colors.text.secondary};
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 16px;
  }

  .features-list {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid rgba(0, 0, 0, 0.06);

    .ant-typography {
      display: flex !important;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      font-size: 0.85rem;
      color: ${colors.text.secondary};
      transition: color 0.3s ease;

      &:before {
        content: "→";
        color: ${colors.primary.main};
        font-size: 1rem;
        font-weight: 600;
        transition: transform 0.3s ease;
      }

      &:hover {
        color: ${colors.primary.main};
        
        &:before {
          transform: translateX(4px);
        }
      }
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 280px;

    .ant-card-cover {
      padding: 20px 16px 0;
      
      .anticon {
        font-size: 22px;
        padding: 12px;
      }
    }

    .ant-card-body {
      padding: 16px;
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    max-width: 260px;
    border-radius: 14px;

    .ant-card-cover {
      padding: 16px 14px 0;
      
      .anticon {
        font-size: 20px;
        padding: 10px;
        border-radius: 12px;
      }
    }

    .ant-card-body {
      padding: 14px;
    }
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

  .ant-input,
  .ant-select-selector {
    height: 45px !important;
    border-radius: 12px !important;
    border: 1px solid rgba(0, 0, 0, 0.1) !important;
    padding: 0 16px !important;
    font-size: ${typography.fontSize.body.small} !important;
    box-shadow: none !important;
    outline: none !important;

    &:hover, &:focus {
      border-color: ${colors.primary.start} !important;
      box-shadow: none !important;
    }
  }

  .ant-input-affix-wrapper {
    padding: 0 11px !important;
    border: 1px solid rgba(0, 0, 0, 0.1) !important;
    border-radius: 12px !important;
    box-shadow: none !important;

    &:hover, &:focus, &-focused {
      border-color: ${colors.primary.start} !important;
      box-shadow: none !important;
    }

    .ant-input {
      border: none !important;
      padding: 0 8px !important;
      
      &:hover, &:focus {
        border: none !important;
        box-shadow: none !important;
      }
    }
  }

  .ant-select-selection-item,
  .ant-select-selection-placeholder {
    line-height: 41px !important;
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
  const location = useLocation();

  useEffect(() => {
    // Check if we have a hash in the URL
    if (location.hash === '#loan-application') {
      setTimeout(() => {
        const element = document.getElementById('loan-application');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Pre-select Personal Loan if coming from Personal Loan page
          form.setFieldsValue({ loanType: 'personal' });
        }
      }, 500);
    }
  }, [location, form]);

  const loanTypes = [
    {
      title: "Personal Loans",
      description: "Quick, collateral-free loans for your personal needs",
      icon: <UserOutlined />,
      link: "/personal-loan",
      features: [
        "Minimal documentation",
        "Quick approval process",
        "Flexible repayment options",
        "Competitive interest rates"
      ]
    },
    {
      title: "Business Loan",
      description: "Fuel your business growth with our tailored financing solutions",
      icon: <ShopOutlined />,
      link: "/business-loan",
      features: [
        "Working capital finance",
        "Equipment financing",
        "Business expansion loans",
        "Flexible tenure options"
      ]
    },
    {
      title: "Home Loan",
      description: "Make your dream home a reality with our affordable home loans",
      icon: <HomeOutlined />,
      link: "/home-loan",
      features: [
        "Attractive interest rates",
        "Long repayment tenure",
        "Quick loan processing",
        "Transparent charges"
      ]
    },
    {
      title: "Home Loan Balance Transfer",
      description: "Switch your existing home loan for better terms",
      icon: <SwapOutlined />,
      link: "/home-loan-balance-transfer",
      features: [
        "Lower interest rates",
        "Top-up loan facility",
        "Minimal transfer charges",
        "Hassle-free process"
      ]
    },
    {
      title: "Loan Against Property",
      description: "Unlock the value of your property with secured loans",
      icon: <BankOutlined />,
      link: "/loan-against-property",
      features: [
        "High loan amount",
        "Lower interest rates",
        "Longer repayment period",
        "Multiple property types accepted"
      ]
    },
    {
      title: "Gold Loan",
      description: "Get instant loans against your gold jewelry",
      icon: <GoldOutlined />,
      link: "/gold-loan",
      features: [
        "Quick disbursement",
        "High value assessment",
        "Safe gold storage",
        "Flexible repayment options"
      ]
    }
  ];

  const onFinish = (values: any) => {
    console.log('Form values:', values);
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
        <img src={loanHeroImage} alt="Loan Services" />        </HeroImage>
      </HeroSection>

      <LoanTypesSection>
        <Title level={2} className="section-title">
          Explore Our Loan Products
        </Title>
        <Row>
          {loanTypes.map((loan, index) => (
            <Col xs={20} sm={11} lg={7} key={index}>
              <Link to={loan.link} style={{ width: '100%', display: 'block' }}>
                <LoanCard
                  hoverable
                  cover={<div>{loan.icon}</div>}
                >
                  <Card.Meta
                    title={loan.title}
                    description={loan.description}
                  />
                  <div className="features-list">
                    {loan.features.map((feature, idx) => (
                      <Text key={idx}>
                        {feature}
                      </Text>
                    ))}
                  </div>
                </LoanCard>
              </Link>
            </Col>
          ))}
        </Row>
      </LoanTypesSection>

      

      <ApplicationSection id="loan-application">
        <ApplicationContainer>
          <FormLeftSection>
            <h3>Why Choose EBS Loans?</h3>
            <p>Get quick and hassle-free loans with competitive interest rates tailored to your needs.</p>
            <ul className="benefits">
              <li>
                <CheckCircleFilled /> Quick loan approval within 24 hours
              </li>
              <li>
                <CheckCircleFilled /> Competitive interest rates starting at 8.99%
              </li>
              <li>
                <CheckCircleFilled /> Flexible loan amounts up to ₹50 lakhs
              </li>
              <li>
                <CheckCircleFilled /> Minimal documentation required
              </li>
              <li>
                <CheckCircleFilled /> No hidden charges or processing fees
              </li>
              <li>
                <CheckCircleFilled /> Dedicated loan relationship manager
              </li>
            </ul>
          </FormLeftSection>

          <FormContainer>
            <StyledForm
              form={form}
              layout="vertical"
              onFinish={onFinish}
            >
              <div className="form-header">
                <h3>Apply for a Loan</h3>
                <p>Fill in your details and get instant loan approval</p>
              </div>

              <Form.Item
                label="Loan Type"
                name="loanType"
                rules={[{ required: true, message: 'Please select loan type' }]}
              >
                <Select placeholder="Select loan type" size="large">
                  <Option value="personal">Personal Loan</Option>
                  <Option value="home">Home Loan</Option>
                  <Option value="business">Business Loan</Option>
                  <Option value="education">Education Loan</Option>
                  <Option value="vehicle">Vehicle Loan</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Loan Amount"
                name="loanAmount"
                rules={[{ required: true, message: 'Please enter loan amount' }]}
              >
                <Input 
                  placeholder="Enter loan amount" 
                  size="large"
                  prefix="₹"
                />
              </Form.Item>

              <Form.Item
                label="Monthly Income"
                name="monthlyIncome"
                rules={[{ required: true, message: 'Please enter your monthly income' }]}
              >
                <Input 
                  placeholder="Enter your monthly income" 
                  size="large"
                  prefix="₹"
                />
              </Form.Item>

              <Form.Item
                label="Employment Type"
                name="employmentType"
                rules={[{ required: true, message: 'Please select your employment type' }]}
              >
                <Select placeholder="Select your employment type" size="large">
                  <Option value="salaried">Salaried</Option>
                  <Option value="self-employed">Self Employed</Option>
                  <Option value="business">Business Owner</Option>
                  <Option value="professional">Professional</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Mobile Number"
                name="mobile"
                rules={[
                  { required: true, message: 'Please enter your mobile number' },
                  { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit mobile number' }
                ]}
              >
                <Input 
                  placeholder="Enter your 10-digit mobile number" 
                  size="large"
                  maxLength={10}
                />
              </Form.Item>

              <Form.Item>
                <SubmitButton type="primary" htmlType="submit" block size="large">
                  Check Loan Eligibility
                </SubmitButton>
              </Form.Item>
            </StyledForm>
          </FormContainer>
        </ApplicationContainer>
      </ApplicationSection>

      <Footer />
    </PageContainer>
  );
};

export default Loans;
