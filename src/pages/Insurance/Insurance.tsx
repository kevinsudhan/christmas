import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Typography, Carousel, Form, Input, Select, Button } from 'antd';
import { StarFilled, CheckCircleFilled, CreditCardOutlined, SafetyOutlined, SmileOutlined, BookOutlined, BankOutlined } from '@ant-design/icons';
import { typography, colors, effects, spacing, breakpoints } from '../../styles/theme';
import creditCardImg from '../../assets/images/services/credit-card.jpg';
import insuranceHeroImg from '../../assets/images/hero/Sitemap Whiteboard in Green Purple Basic Style (13).png';
import Footer from '../../components/Footer/Footer';
import healthInsImg from '../../assets/images/hero/healthins.jpg';
import personalInsImg from '../../assets/images/hero/personal insurance.jpg';
import generalInsImg from '../../assets/images/hero/general insurance.jpg';
import riskManagementImg from '../../assets/images/hero/risk management.jpg';
import wealthPreservationImg from '../../assets/images/hero/wealth preservation.jpg';
import peacefulMindImg from '../../assets/images/hero/peaceful mind.jpg';
import lawComplianceImg from '../../assets/images/hero/law compliance.jpg';
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
  padding-bottom: 60px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(${creditCardImg}) no-repeat center center;
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
  }

  > * {
    position: relative;
    z-index: 3;
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
  animation: fadeInUp 0.8s ease-out;

  h1 {
    font-family: ${typography.fontFamily.heading};
    font-size: ${typography.fontSize.hero.title};
    font-weight: ${typography.fontWeight.bold};
    line-height: ${typography.lineHeight.tight};
    margin-bottom: 1rem;
    background: linear-gradient(to right, #ffffff, #e0e0e0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
      font-size: ${typography.fontSize.h1.tablet};
    }
  }

  p {
    font-family: ${typography.fontFamily.primary};
    font-size: ${typography.fontSize.hero.subtitle};
    line-height: ${typography.lineHeight.relaxed};
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 1.5rem;

    @media (max-width: 768px) {
      font-size: ${typography.fontSize.body.large};
    }
  }

  .feature-tags {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    margin-top: 1.5rem;
  }

  @media (max-width: 1024px) {
    padding: 20px;
    text-align: center;

    h1 {
      font-size: 2.5rem;
    }
    p {
      font-size: 1.1rem;
    }
    .feature-tags {
      justify-content: center;
    }
  }
`;

const HeroImage = styled.div`
  flex: 1;
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: floatAnimation 3s ease-in-out infinite;

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
    filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.2));
    transform: perspective(1000px) rotateY(-15deg);
    transition: transform 0.3s ease;

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

const ContentSection = styled.section`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 24px;
`;

const StyledCard = styled(Card)`
  height: 100%;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const CarouselSection = styled.section`
  background: transparent;
  padding: 60px 0;
  position: relative;
  overflow: visible;
  max-width: 2400px;
  margin-right: auto;
  margin-left: 0;
`;

const FirstCarouselSection = styled(CarouselSection)`
  .slick-track {
    animation: scrollSlow 600s linear infinite;
  }

  @keyframes scrollSlow {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-100% - 50px));
    }
  }

  .slick-slide {
    opacity: 1;
    transition: transform 0.6s ease-in-out;
    
    &:hover {
      transform: translateY(-5px) scale(1.02);
    }
  }
`;

const SecondCarouselSection = styled(CarouselSection)`
  .slick-track {
    animation: scroll 600s linear infinite;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-100% - 50px));
    }
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  background: transparent;
  &.right-title {
    .slick-list {
      margin-right: 270px;
      margin-left: 0;
    }
  }

  @media (max-width: 768px) {
    &.right-title .slick-list {
      margin-right: 0;
    }
  }
`;

const CarouselTitle = styled.div`
  background: linear-gradient(135deg, #0077b6 0%, #023e8a 100%);
  color: white;
  padding: 40px;
  width: 400px;
  height: 400px;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 10px 0 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;

  &.right-aligned {
    left: auto;
    right: 0;
    box-shadow: -10px 0 20px rgba(0, 0, 0, 0.1);
    border-radius: 0;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(0deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: 0.2;
    z-index: 1;
  }

  .floating-shapes {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
    z-index: 1;

    .shape {
      position: absolute;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      animation: float 6s infinite;

      &:nth-child(1) {
        width: 80px;
        height: 80px;
        top: 20%;
        left: 20%;
        animation-delay: 0s;
      }

      &:nth-child(2) {
        width: 60px;
        height: 60px;
        top: 60%;
        right: 20%;
        animation-delay: 2s;
      }

      &:nth-child(3) {
        width: 40px;
        height: 40px;
        bottom: 20%;
        left: 30%;
        animation-delay: 4s;
      }
    }
  }

  h2 {
    color: white;
    font-size: ${typography.fontSize.h2.desktop};
    font-weight: ${typography.fontWeight.bold};
    margin: 0;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: relative;
    z-index: 2;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: white;
      border-radius: 2px;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    position: relative;
    padding: 30px;
    border-radius: 0;
    transform: none;
    top: 0;

    &.right-aligned {
      border-radius: 0;
    }

    h2 {
      font-size: ${typography.fontSize.h3.tablet};
    }
  }
`;

const StyledCarousel = styled(Carousel)`
  margin-left: 270px;
  padding: 40px 0;
  max-width: calc(100% - 270px);
  background: transparent;
  width: 2000px;
  position: relative;
  overflow: visible;

  &.right-aligned {
    margin-left: 0;
    margin-right: 270px;
    .slick-list {
      overflow: visible;
    }
  }

  .slick-track {
    display: flex !important;
    align-items: center;
    gap: 50px;
    min-width: 2000px;
    position: relative;
  }

  .slick-slide {
    padding: 0 50px;
    opacity: 1;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    width: 650px !important;
    margin-right: 50px;

    > div {
      display: flex;
      justify-content: center;
      width: 100%;
    }

    &:hover {
      transform: translateY(-5px);
    }
  }

  .slick-list {
    margin: 0;
    overflow: visible;
  }

  .slick-dots {
    display: none !important;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-right: 0;
    padding: 20px;
    max-width: 100%;

    .slick-slide {
      padding: 0 20px;
      margin-right: 20px;
    }
  }
`;

const CarouselTrack = styled.div`
  display: flex;
  gap: 50px;
  animation: scroll 600s linear infinite;

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-100% - 50px));
    }
  }

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const CarouselCard = styled.div`
  background: transparent;
  border-radius: 24px;
  margin: 20px 40px;
  box-shadow: 0 20px 40px rgba(0, 119, 182, 0.08);
  height: 300px;
  width: 650px !important;
  min-width: 650px;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }

  .content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.5) 50%,
      transparent 100%
    );
    z-index: 2;

    h3 {
      margin: 0;
      font-size: ${typography.fontSize.h4.desktop};
      color: white;
      text-align: center;
    }
  }

  .image-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
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
    border: 2px solid rgba(0, 0, 0, 0.08) !important;
    padding: 0 16px !important;
    font-size: ${typography.fontSize.body.small} !important;

    &:hover {
      border-color: rgba(33, 147, 176, 0.3) !important;
    }

    &:focus {
      border-color: ${colors.primary.start} !important;
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

const InsuranceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const InsuranceCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  .image-wrapper {
    width: 100%;
    height: 220px;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
  }

  .content {
    padding: 24px;
    text-align: center;

    h3 {
      color: #1a365d;
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
      line-height: 1.4;
    }
  }
`;

const InsuranceSection = styled.section`
  padding: 60px 0;
  background: #f8fafc;

  .section-title {
    text-align: center;
    margin-bottom: 40px;
    
    h2 {
      color: #1a365d;
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 16px;
    }
  }
`;

const Insurance: React.FC = () => {
  const insuranceCards = [
    {
      title: 'Health Insurance',
      image: healthInsImg,
    },
    {
      title: 'Life Insurance',  // Changed from Personal Insurance
      image: personalInsImg,
    },
    {
      title: 'General Insurance',
      image: generalInsImg,
    }
  ];
  const whyBeInsuredCards = [
    {
      title: 'Risk and Finance Management',
      image: riskManagementImg,
    },
    {
      title: 'Wealth Generation',
      image: wealthPreservationImg,
    },
    {
      title: 'Peace of Mind and Security',
      image: peacefulMindImg,
    },
    {
      title: 'Legal and Regulatory Compliance',
      image: lawComplianceImg,
    }
  ];

  // Duplicate items exactly twice for perfect loop
  const duplicatedItems = [...insuranceCards, ...insuranceCards, ...insuranceCards, ...insuranceCards];

  return (
    <PageContainer>
      <HeroSection>
        <div className="shape-1"></div>
        <div className="shape-2"></div>
        <div className="shape-3"></div>
        <div className="shape-4"></div>
        <div className="line-1"></div>
        <div className="line-2"></div>
        <div className="dot-pattern"></div>
        <HeroContent>
          <Title level={1}>
            Protect Your Future with Comprehensive Insurance Plans
          </Title>
          <Text style={{ color: 'white', fontSize: '1.2rem', display: 'block', marginBottom: '1.5rem' }}>
            Get access to exclusive benefits, coverage, and peace of mind. Apply now and secure your family's future with EBS Finance.
          </Text>
          <div className="feature-tags">
            <FeatureTag>
              <StarFilled /> Comprehensive Coverage
            </FeatureTag>
            <FeatureTag>
              <CheckCircleFilled /> Flexible Plans
            </FeatureTag>
            <FeatureTag>
              <CreditCardOutlined /> Exclusive Benefits
            </FeatureTag>
          </div>
        </HeroContent>
        <HeroImage>
          <img src={insuranceHeroImg} alt="Insurance Plans" />
        </HeroImage>
      </HeroSection>

      <InsuranceSection>
        <div className="section-title">
          <h2>Insurances Offered</h2>
        </div>
        <InsuranceGrid>
          {insuranceCards.map((item, index) => {
            const links = ['/health-insurance', '/life-insurance', '/general-insurance'];
            return (
              <Link to={links[index]} key={index}>
                <InsuranceCard>
                  <div className="image-wrapper">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="content">
                    <h3>{item.title}</h3>
                  </div>
                </InsuranceCard>
              </Link>
            );
          })}
        </InsuranceGrid>
      </InsuranceSection>

      <ApplicationSection>
        <ApplicationContainer>
          <FormLeftSection>
            <h3>Why Choose Our Insurance Plans?</h3>
            <p>Experience comprehensive protection and peace of mind with our tailored insurance solutions.</p>
            <ul className="benefits">
              <li>
                <CheckCircleFilled /> Customized coverage options
              </li>
              <li>
                <CheckCircleFilled /> Quick and hassle-free claims
              </li>
              <li>
                <CheckCircleFilled /> 24/7 customer support
              </li>
              <li>
                <CheckCircleFilled /> Competitive premiums
              </li>
              <li>
                <CheckCircleFilled /> Digital policy management
              </li>
              <li>
                <CheckCircleFilled /> Expert insurance advisors
              </li>
            </ul>
          </FormLeftSection>

          <FormContainer>
            <StyledForm
              layout="vertical"
              onFinish={(values) => console.log('Form values:', values)}
            >
              <div className="form-header">
                <h3>Get Your Insurance Quote</h3>
                <p>Fill in your details below and we'll help you find the perfect insurance plan</p>
              </div>

              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[{ required: true, message: 'Please enter your full name' }]}
              >
                <Input placeholder="Enter your full name" />
              </Form.Item>

              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input placeholder="Enter your email address" />
              </Form.Item>

              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[{ required: true, message: 'Please enter your phone number' }]}
              >
                <Input placeholder="Enter your phone number" />
              </Form.Item>

              <Form.Item
                label="Insurance Type"
                name="insuranceType"
                rules={[{ required: true, message: 'Please select an insurance type' }]}
              >
                <Select placeholder="Select insurance type">
                  <Option value="personal">Personal Insurance</Option>
                  <Option value="general">General Insurance</Option>
                  <Option value="health">Health Insurance</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Coverage Amount"
                name="coverageAmount"
                rules={[{ required: true, message: 'Please select a coverage amount' }]}
              >
                <Select placeholder="Select coverage amount">
                  <Option value="basic">Basic Coverage (₹5,00,000)</Option>
                  <Option value="standard">Standard Coverage (₹10,00,000)</Option>
                  <Option value="premium">Premium Coverage (₹20,00,000)</Option>
                  <Option value="custom">Custom Coverage Amount</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <SubmitButton type="primary" htmlType="submit">
                  Get Your Quote
                </SubmitButton>
              </Form.Item>
            </StyledForm>
          </FormContainer>
        </ApplicationContainer>
      </ApplicationSection>

      <SecondCarouselSection style={{ 
        maxWidth: '100%', 
        marginRight: '0',
        overflow: 'visible',
        background: 'transparent',
        position: 'relative'
      }}>
        <CarouselContainer style={{ 
          position: 'relative',
          marginRight: '0',
          paddingRight: '0',
          background: 'transparent',
          overflow: 'visible'
        }}>
          <CarouselTitle className="right-aligned" style={{ 
            right: '0',
            marginRight: '0',
            width: '270px',
            zIndex: 2
          }}>
            <div className="floating-shapes">
              <div className="shape"></div>
              <div className="shape"></div>
              <div className="shape"></div>
            </div>
            <Title level={2}>Why be insured?</Title>
          </CarouselTitle>
          <StyledCarousel 
            className="right-aligned"
            style={{
              background: 'transparent',
              zIndex: 1,
              position: 'relative',
              overflow: 'visible'
            }}
            autoplay
            autoplaySpeed={0}
            speed={0}
            slidesToShow={2}
            slidesToScroll={1}
            infinite={true}
            dots={false}
            pauseOnHover={false}
            cssEase="linear"
            arrows={false}
            swipe={false}
            draggable={false}
            variableWidth={true}
            centerMode={false}
          >
            {whyBeInsuredCards.map((item, index) => (
              <CarouselCard key={index}>
                <div className="content">
                  <h3>{item.title}</h3>
                </div>
                <div className="image-container">
                  <img src={item.image} alt={item.title} />
                </div>
              </CarouselCard>
            ))}
          </StyledCarousel>
        </CarouselContainer>
      </SecondCarouselSection>



      <Footer />
    </PageContainer>
  );
};

export default Insurance;
