import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Typography, Rate, Checkbox, Modal, Tabs, Badge } from 'antd';
import { StarFilled, PercentageOutlined, SwapOutlined, CloseOutlined, SafetyCertificateOutlined, GiftOutlined, DollarOutlined, FieldTimeOutlined, FileProtectOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../../components/Footer/Footer';

// Bank logos from public directory
const bankLogos = {
  star : "/images/partners/star-insurance.png"
};

interface Loan {
  id: number;
  name: string;
  bankName: string;
  bankLogo: string;
  interestRate: string;
  processingFee: string;
  maxAmount: string;
  minAmount: string;
  tenure: string;
  rating: number;
  suitedFor: string[];
  benefit: string;
  benefitIcon: typeof StarFilled | typeof PercentageOutlined | typeof DollarOutlined | typeof FieldTimeOutlined | typeof FileProtectOutlined;
}

interface LoanDetails {
  features: string[];
  benefits: string[];
  fees: {
    processing: string;
    prepayment: string;
    latePenalty: string;
  };
  eligibility: {
    salaried: string[];
    selfEmployed: string[];
  };
  documents: {
    salaried: string[];
    selfEmployed: string[];
  };
  maxAmount: string;
  minAmount: string;
  tenure: string;
  interestRate: string;
}

interface LoanDetailsMap {
  [key: string]: LoanDetails;
}

const { Title, Text } = Typography;

const personalLoans: Loan[] = [
  {
    id: 1,
    name: "Star Health Insurance",
    bankName: "Star Health",
    bankLogo: bankLogos.star,
    interestRate: "₹599/month",
    processingFee: "Nil",
    maxAmount: "₹1 Crore",
    minAmount: "₹2 Lakhs",
    tenure: "1 Year",
    rating: 4.5,
    suitedFor: ["Families", "Individuals", "Senior Citizens", "Critical Illness"],
    benefit: "Zero waiting period for COVID-19 coverage and 24/7 cashless hospitalization",
    benefitIcon: SafetyCertificateOutlined
  }
];

const loanDetails: LoanDetailsMap = {
  "Star Health Insurance": {
  features: [
    "Comprehensive coverage up to ₹1 Crore",
    "No medical check-up required up to 45 years",
    "15,000+ network hospitals for cashless treatment",
    "Coverage for 30+ critical illnesses",
    "Day care procedures covered",
    "Alternative treatments (AYUSH) covered",
    "Pre and post hospitalization expenses covered"
  ],
  benefits: [
    "Lifetime renewability option",
    "Tax benefits under Section 80D",
    "No claim bonus up to 100% of sum insured",
    "Free annual health check-up",
    "Automatic recharge of sum insured",
    "24/7 customer support",
    "Mobile app for easy claim tracking"
  ],
  fees: {
    processing: "No processing fee",
    prepayment: "Not applicable",
    latePenalty: "Grace period of 30 days for renewal"
  },
  eligibility: {
    salaried: [
      "Age: 18-65 years",
      "No medical test up to 45 years",
      "Valid ID and address proof"
    ],
    selfEmployed: [
      "Age: 18-65 years",
      "No medical test up to 45 years",
      "Valid ID and address proof"
    ]
  },
  documents: {
    salaried: [
      "Age proof",
      "Identity proof",
      "Address proof",
      "Passport size photographs",
      "Previous policy documents (if any)"
    ],
    selfEmployed: [
      "Age proof",
      "Identity proof",
      "Address proof",
      "Passport size photographs",
      "Previous policy documents (if any)"
    ]
  },
  maxAmount: "₹1 Crore",
  minAmount: "₹2 Lakhs",
  tenure: "1 Year",
  interestRate: "₹599/month"
} 
};

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #f9fafb, #ffffff);
  margin-top: 70px;
`;


const Breadcrumb = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BreadcrumbLink = styled(Link)`
  color: #666;
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: #1890ff;
  }
`;

const BreadcrumbSeparator = styled.span`
  color: #666;
  margin: 0 4px;
`;

const BreadcrumbCurrent = styled.span`
  color: #1890ff;
`;

const Container = styled.div`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const HeroSection = styled.section`
  position: relative;
  padding: 80px 0;
  background: linear-gradient(135deg, 
    rgba(0, 32, 96, 0.97) 0%,
    rgba(0, 45, 114, 0.95) 50%,
    rgba(0, 64, 135, 0.92) 100%
  );
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/images/abstract-bg.jpg') center/cover;
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
    background: radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 60%);
    z-index: 1;
  }

   @media (max-width: 968px) {
    padding: 20px 0;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;

   @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 20px 12px;
  }
`;


const HeroText = styled.div`
  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 24px;
    line-height: 1.2;

    @media (max-width: 968px) {
      font-size: 2.5rem;
      margin-bottom: 16px;
    }

    @media (max-width: 480px) {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 32px;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;

    @media (max-width: 968px) {
      font-size: 1rem;
      margin-bottom: 24px;
    }
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 24px;
  line-height: 1.2;
  background: linear-gradient(to right, #ffffff, #e0e0e0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 32px;
  color: rgba(255, 255, 255, 0.9);
`;

const HeroStats = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 48px;

  @media (max-width: 968px) {
    justify-content: center;
  }
`;

const StatItem = styled(motion.div)`
  text-align: left;

  @media (max-width: 968px) {
    text-align: center;
  }
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
`;

const HeroVisual = styled(motion.div)`
  position: relative;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 15%;
  width: 100%;

   @media (max-width: 968px) {
    height: 200px;
    margin-top: 0px;  // Reduced from 20px to 0px
  }
`;

const FloatingCard = styled(motion.div)<{ index: number }>`
  position: absolute;
  width: 280px;
  height: 160px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform-origin: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  

  ${({ index }) => {
    const positions = [
      { top: '10%', right: '10%', rotate: '-15deg' },
      { top: '30%', right: '25%', rotate: '5deg' },
      { top: '50%', right: '15%', rotate: '-5deg' }
    ];
    return `
      top: ${positions[index].top};
      right: ${positions[index].right};
      transform: rotate(${positions[index].rotate});
    `;
  }}
`;

const CardBank = styled.div`
  font-size: 1.2rem;
  color: white;
  font-weight: 600;
`;

const CardDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const CardRate = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
`;

const CardAmount = styled.div`
  color: #4CAF50;
  font-weight: 600;
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: 16px;
  margin-top: 32px;

  @media (max-width: 968px) {
    justify-content: center;
  }
`;

const StyledButton = styled(Button)`
  height: 48px;
  padding: 0 32px;
  font-size: 1rem;
  border-radius: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CardsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 16px;
  margin-bottom: 80px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #262626;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr 200px;
  gap: 20px;
  align-items: center;
  padding: 16px 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  margin-bottom: 16px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const CardImageContainer = styled.div`
  width: 260px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  margin: 0 auto;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px 16px;
  min-height: 100%;

  > div {
    &:last-child {
      margin-top: auto;
      padding-top: 8px;
    }
  }
`;

const CardTitle = styled(Title)`
  font-size: 20px !important;
  font-weight: 600 !important;
  margin: 0 !important;
  color: #1a1a1a;
  line-height: 1.3 !important;
`;

const Tag = styled.span`
  padding: 4px 8px;
  background-color: rgba(0, 102, 204, 0.08);
  border-radius: 4px;
  font-size: 13px;
  color: #0066cc;
  font-weight: 500;
  white-space: nowrap;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin: 4px 0;
`;

const BenefitSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BenefitIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #fff2f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff4d4f;
  font-size: 14px;
  flex-shrink: 0;
`;

const BenefitWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BenefitContent = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: #262626;
  flex: 1;
  display: flex;
  align-items: center;
`;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    overflow: visible;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
  }
  .ant-modal-body {
    padding: 0;
    overflow-y: auto;
    max-height: calc(90vh - 110px);

    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background: #f0f0f0;
      border-radius: 3px;
    }
    &::-webkit-scrollbar-thumb {
      background: #bfbfbf;
      border-radius: 3px;
      &:hover {
        background: #999;
      }
    }
  }
  .ant-modal-header {
    flex-shrink: 0;
    padding: 16px 24px;
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 0;
  }
`;

const CompareGrid = styled.div<{ cards: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.cards}, 1fr);
  gap: 24px;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  width: 100%;
  margin: 0 auto;
`;

const CompareCard = styled(motion.div)`
  background: #fff;
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow: hidden;
  position: relative;
  text-align: center;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0;
    top: 5%;
    height: 90%;
    width: 1px;
    background: #f0f0f0;
  }
`;

const CompareSection = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 16px;
  min-height: fit-content;
`;

const CompareCardImage = styled.div`
  width: 180px;
  height: 113px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  margin: 0 auto 16px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const CompareCardTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #262626;
  text-align: center;
  margin-bottom: 8px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CompareSectionTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #8c8c8c;
  margin-bottom: 8px;
  text-align: center;
  width: 100%;
  min-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
`;

const CompareValue = styled.div`
  font-size: 14px;
  color: #262626;
  font-weight: 500;
  margin-bottom: 4px;
  text-align: center;
  width: 100%;
  min-height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  &:last-child {
    margin-bottom: 0;
  }
`;

const BenefitList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 100%;

  .benefit-item {
    width: 100%;
    text-align: center;
    min-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .anticon {
    color: #52c41a;
    margin-right: 8px;
    font-size: 12px;
  }
`;

const CompareFloatingButton = styled(motion.div)`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
`;

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  margin-bottom: 8px;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    margin-bottom: 12px;
    display: flex;
    align-items: flex-start;
    gap: 8px;
    .anticon {
      color: #1890ff;
      margin-top: 4px;
    }
  }
`;

const FeeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 16px;
`;

const FeeCard = styled.div`
  background: #f5f5f5;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  h4 {
    margin: 0 0 8px 0;
    color: #1890ff;
  }
`;

const CompareCheckbox = styled(Checkbox)`
  .ant-checkbox {
    border-radius: 4px;
    border-color: #d9d9d9;
    
    &:hover {
      border-color: #1890ff;
    }
  }

  .ant-checkbox-checked {
    .ant-checkbox-inner {
      background-color: #1890ff;
      border-color: #1890ff;
    }
  }

  .ant-checkbox-inner {
    width: 18px;
    height: 18px;
    border-radius: 4px;

    &:after {
      width: 6px;
      height: 10px;
    }
  }
`;

const CompareWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-top: 1px solid #f0f0f0;
  margin-top: auto;
`;

const CompareText = styled(Text)`
  font-size: 13px;
  color: #595959;
  user-select: none;
  
  &:hover {
    color: #1890ff;
  }
`;

const FeatureTag = styled.div`
  margin: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  border: none;
  line-height: 1.2;
  background-color: rgba(0, 102, 204, 0.08);
  color: #0066cc;
  font-weight: 500;
`;

const DownloadButton = styled(Button)`
  position: absolute;
  top: -45px;
  right: 48px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const GeneralInsurance: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLoan, setSelectedLoan] = useState<string | null>(null);
  const [selectedLoans, setSelectedLoans] = useState<string[]>([]);
  const [isCompareModalVisible, setIsCompareModalVisible] = useState(false);
  const compareContentRef = useRef<HTMLDivElement>(null);

  const handleViewDetails = (loanName: string) => {
    setSelectedLoan(loanName);
  };

  const handleCloseModal = () => {
    setSelectedLoan(null);
  };

  const toggleLoanSelection = (loanName: string) => {
    console.log('Toggle loan selection:', loanName);
    setSelectedLoans(prev => {
      const newSelection = prev.includes(loanName)
        ? prev.filter(name => name !== loanName)
        : prev.length < 3
          ? [...prev, loanName]
          : prev;
      console.log('Updated selection:', newSelection);
      return newSelection;
    });
  };


  const handleCheckEligibility = () => {
    navigate('/loans#loan-application');
  };

  const renderHeroSection = () => (
    <HeroSection>
      <HeroContent>
        <HeroText>
          <HeroTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            General Insurance Made Simple
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Compare and choose from India's leading insurance providers. Get instant coverage, 
            lowest premiums, and hassle-free claims.
          </HeroSubtitle>
          <HeroButtons
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <StyledButton type="primary" size="large" onClick={handleCheckEligibility}>
              Check Eligibility
            </StyledButton>
            <StyledButton type="default" ghost size="large">
              Compare Plans
            </StyledButton>
          </HeroButtons>
          <HeroStats
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <StatItem>
              <StatValue>₹1Cr+</StatValue>
              <StatLabel>Maximum Coverage</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>599</StatValue>
              <StatLabel>Starting at ₹/month</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>24/7</StatValue>
              <StatLabel>Cashless Claims</StatLabel>
            </StatItem>
          </HeroStats>
        </HeroText>
        <HeroVisual
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {personalLoans.length > 0 && (
            <FloatingCard
              key={0}
              index={0}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05, rotate: '0deg' }}
            >
              <CardBank>{personalLoans[0].bankName}</CardBank>
              <CardDetails>
                <CardRate>From {personalLoans[0].interestRate}</CardRate>
                <CardAmount>Up to {personalLoans[0].maxAmount}</CardAmount>
              </CardDetails>
            </FloatingCard>
          )}
        </HeroVisual>
      </HeroContent>
    </HeroSection>
  );

  return (
    <PageContainer>
      {renderHeroSection()}
      <Container>
        <CardsSection>
          <b></b>
          <b></b>
          <SectionTitle>
            General Insurance
          </SectionTitle>

          {personalLoans.map((loan: Loan) => (
            <motion.div
              key={loan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: loan.id * 0.1 }}
            >
              <CardGrid>
                <CardImageContainer>
                  <img src={loan.bankLogo} alt={loan.name} />
                </CardImageContainer>

                <CardContent>
                  <div>
                    <CardTitle level={4}>{loan.name}</CardTitle>
                  </div>

                  <div>
                    <SectionTitle>Best suited for</SectionTitle>
                    <TagContainer>
                      {loan.suitedFor.map(suit => (
                        <Tag key={suit}>{suit}</Tag>
                      ))}
                    </TagContainer>
                  </div>

                  <BenefitSection>
                    <SectionTitle>Why this loan</SectionTitle>
                    <BenefitWrapper>
                      <BenefitIcon>
                        {React.createElement(loan.benefitIcon)}
                      </BenefitIcon>
                      <BenefitContent>{loan.benefit}</BenefitContent>
                    </BenefitWrapper>
                  </BenefitSection>

                  <CompareWrapper>
                    <CompareCheckbox
                      checked={selectedLoans.includes(loan.name)}
                      onChange={() => toggleLoanSelection(loan.name)}
                    />
                    <CompareText>Compare</CompareText>
                  </CompareWrapper>
                </CardContent>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <RatingContainer>
                    <Rate disabled defaultValue={loan.rating} style={{ fontSize: '16px' }} />
                    <Text type="secondary" style={{ fontSize: '12px', textAlign: 'center' }}>
                      {loan.rating} Customer Rating
                    </Text>
                  </RatingContainer>
                  <Button onClick={() => handleViewDetails(loan.name)}>View Details</Button>
                  <Button type="primary">Apply</Button>
                  <Text type="secondary" style={{ fontSize: '12px', textAlign: 'center' }}>
                    On bank website
                  </Text>
                </div>
              </CardGrid>
            </motion.div>
          ))}
            
          <AnimatePresence>
            {selectedLoans.length > 0 && (
              <CompareFloatingButton
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                <Badge count={selectedLoans.length} offset={[-5, 5]}>
                  <Button
                    type="primary"
                    icon={<SwapOutlined />}
                    onClick={() => setIsCompareModalVisible(true)}
                    size="large"
                  />
                </Badge>
              </CompareFloatingButton>
            )}
          </AnimatePresence>
        </CardsSection>
      </Container>

      {selectedLoan && (
        <StyledModal
          open={!!selectedLoan}
          onCancel={handleCloseModal}
          footer={null}
          width={800}
          title={selectedLoan}
          closeIcon={<CloseOutlined />}
        >
          <Tabs defaultActiveKey="1" items={[
            {
              key: '1',
              label: 'Key Features',
              children: (
                <FeatureList>
                  {loanDetails[selectedLoan]?.features.map((feature: string, index: number) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <SafetyCertificateOutlined />
                      {feature}
                    </motion.li>
                  ))}
                </FeatureList>
              ),
            },
            {
              key: '2',
              label: 'Rewards',
              children: (
                <FeatureList>
                  {loanDetails[selectedLoan]?.benefits.map((reward: string, index: number) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <GiftOutlined />
                      {reward}
                    </motion.li>
                  ))}
                </FeatureList>
              ),
            },
            {
              key: '3',
              label: 'Fees',
              children: (
                <FeeGrid>
                  <FeeCard>
                    <h4>Processing Fee</h4>
                    <Text>{loanDetails[selectedLoan]?.fees.processing}</Text>
                  </FeeCard>
                  <FeeCard>
                    <h4>Prepayment Fee</h4>
                    <Text>{loanDetails[selectedLoan]?.fees.prepayment}</Text>
                  </FeeCard>
                  <FeeCard>
                    <h4>Late Penalty Fee</h4>
                    <Text>{loanDetails[selectedLoan]?.fees.latePenalty}</Text>
                  </FeeCard>
                </FeeGrid>
              ),
            },
          ]} />
        </StyledModal>
      )}
      <Footer />
    </PageContainer>
  );
};

export default GeneralInsurance;