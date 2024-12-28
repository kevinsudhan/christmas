import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Typography, Rate, Checkbox, Modal, Tabs, Badge } from 'antd';
import { StarFilled, PercentageOutlined, SwapOutlined, CloseOutlined, SafetyCertificateOutlined, GiftOutlined, CheckCircleFilled, DownloadOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../../components/Footer/Footer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';

// Import images
import hdfcHeroImage from '../../assets/images/cards/HDFC.png';
import swiggyCard from '../../assets/images/cards/hdfc-bank/swiggycard.png';
import regaliaCard from '../../assets/images/cards/hdfc-bank/regalia.png';
import millenniaCard from '../../assets/images/cards/hdfc-bank/millenia.png';
import freedomCard from '../../assets/images/cards/hdfc-bank/freedom.png';
import indianoilCard from '../../assets/images/cards/hdfc-bank/indianoil.png';
import upiCard from '../../assets/images/cards/hdfc-bank/upi rupay.png';
import infiniaCard from '../../assets/images/cards/hdfc-bank/infinia.png';
import moneybackCard from '../../assets/images/cards/hdfc-bank/moneyback+.png';

interface Card {
  id: number;
  name: string;
  image: string;
  joiningFee: string;
  rating: number;
  suitedFor: string[];
  benefit: string;
  benefitIcon: typeof StarFilled | typeof PercentageOutlined | typeof GiftOutlined | typeof SafetyCertificateOutlined;
  creditLimit?: string;
  interestRate?: string;
}

interface CardDetails {
  features: string[];
  rewards: string[];
  fees: {
    joining: string;
    annual: string;
    renewal: string;
  };
  creditLimit?: string;
  interestRate?: string;
}

interface CardDetailsMap {
  [key: string]: CardDetails;
}

const { Title, Text } = Typography;

const creditCards: Card[] = [
  {
    id: 1,
    name: "Swiggy HDFC Credit Card",
    image: swiggyCard,
    joiningFee: "₹500 + GST",
    rating: 4.8,
    suitedFor: ["Food", "Entertainment", "Online Shopping"],
    benefit: "15% cashback on Swiggy orders",
    benefitIcon: PercentageOutlined,
    creditLimit: "₹50,000 - ₹5,00,000",
    interestRate: "3.49% per month"
  },
  {
    id: 2,
    name: "HDFC Regalia Credit Card",
    image: regaliaCard,
    joiningFee: "₹2,500 + GST",
    rating: 4.8,
    suitedFor: ["Premium", "Travel", "Lifestyle"],
    benefit: "Up to 12 complimentary airport lounge visits per year",
    benefitIcon: StarFilled,
    creditLimit: "₹2,00,000 - ₹10,00,000",
    interestRate: "3.49% per month"
  },
  {
    id: 3,
    name: "HDFC Millennia Credit Card",
    image: millenniaCard,
    joiningFee: "₹1,000 + GST",
    rating: 4.7,
    suitedFor: ["Online Shopping", "Cashback", "Lifestyle"],
    benefit: "5% cashback on Amazon, Flipkart & online spends",
    benefitIcon: PercentageOutlined,
    creditLimit: "₹1,00,000 - ₹7,00,000",
    interestRate: "3.49% per month"
  },
  {
    id: 4,
    name: "HDFC Freedom Credit Card",
    image: freedomCard,
    joiningFee: "₹500 + GST",
    rating: 4.6,
    suitedFor: ["Rewards", "Shopping", "Dining"],
    benefit: "5X reward points on weekend spends",
    benefitIcon: GiftOutlined,
    creditLimit: "₹1,50,000 - ₹8,00,000",
    interestRate: "3.49% per month"
  },
  {
    id: 5,
    name: "HDFC IndianOil Credit Card",
    image: indianoilCard,
    joiningFee: "₹500 + GST",
    rating: 4.7,
    suitedFor: ["Fuel", "Rewards", "Utility Bills"],
    benefit: "2.5% fuel surcharge waiver + 4X rewards",
    benefitIcon: SafetyCertificateOutlined,
    creditLimit: "₹1,00,000 - ₹5,00,000",
    interestRate: "3.49% per month"
  },
  {
    id: 6,
    name: "HDFC UPI RuPay Credit Card",
    image: upiCard,
    joiningFee: "₹0",
    rating: 4.5,
    suitedFor: ["UPI", "Digital Payments", "Cashback"],
    benefit: "1% cashback on UPI transactions",
    benefitIcon: PercentageOutlined,
    creditLimit: "₹50,000 - ₹3,00,000",
    interestRate: "3.49% per month"
  },
  {
    id: 7,
    name: "HDFC Infinia Credit Card",
    image: infiniaCard,
    joiningFee: "₹10,000 + GST",
    rating: 4.9,
    suitedFor: ["Super Premium", "Travel", "Lifestyle"],
    benefit: "Unlimited airport lounge access worldwide",
    benefitIcon: StarFilled,
    creditLimit: "₹5,00,000 - ₹20,00,000",
    interestRate: "3.49% per month"
  },
  {
    id: 8,
    name: "HDFC MoneyBack+ Credit Card",
    image: moneybackCard,
    joiningFee: "₹750 + GST",
    rating: 4.7,
    suitedFor: ["Cashback", "Shopping", "Lifestyle"],
    benefit: "2% cashback on all spends",
    benefitIcon: PercentageOutlined,
    creditLimit: "₹75,000 - ₹4,00,000",
    interestRate: "3.49% per month"
  }
];

const cardDetailsMap: CardDetailsMap = {
  "Swiggy HDFC Credit Card": {
    features: [
      "15% cashback on Swiggy orders",
      "5% cashback on entertainment",
      "1% cashback on other spends",
      "4 complimentary domestic airport lounge visits per year"
    ],
    rewards: [
      "Welcome bonus 500 points",
      "1 reward point per ₹100 spent",
      "2X rewards on weekend dining"
    ],
    fees: {
      joining: "₹500 + GST",
      annual: "₹500 + GST",
      renewal: "₹500 + GST"
    },
    creditLimit: "₹50,000 - ₹5,00,000",
    interestRate: "3.49% per month"
  },
  "HDFC Regalia Credit Card": {
    features: [
      "Up to 12 complimentary airport lounge visits per year",
      "Golf privileges at select courses",
      "Premium concierge services",
      "Travel & air accident insurance cover"
    ],
    rewards: [
      "Welcome bonus 10,000 points",
      "4 reward points per ₹150 spent",
      "2X reward points on weekend spends"
    ],
    fees: {
      joining: "₹2,500 + GST",
      annual: "₹2,500 + GST",
      renewal: "₹2,500 + GST"
    },
    creditLimit: "₹2,00,000 - ₹10,00,000",
    interestRate: "3.49% per month"
  },
  "HDFC Millennia Credit Card": {
    features: [
      "5% cashback on Amazon, Flipkart & online spends",
      "2.5% cashback on offline spends",
      "1% cashback on utility bill payments",
      "Movie ticket discounts"
    ],
    rewards: [
      "2X rewards on weekends",
      "1000 welcome points",
      "Additional rewards on partner brands"
    ],
    fees: {
      joining: "₹1,000 + GST",
      annual: "₹1,000 + GST",
      renewal: "₹1,000 + GST"
    },
    creditLimit: "₹1,00,000 - ₹7,00,000",
    interestRate: "3.49% per month"
  },
  "HDFC Freedom Credit Card": {
    features: [
      "5X rewards on weekend spends",
      "Up to 20% discount on dining via Swiggy Dineout",
      "Movie ticket benefits",
      "Fuel surcharge waiver"
    ],
    rewards: [
      "Welcome bonus points",
      "1 reward point per ₹150 spent",
      "Extra rewards on weekend dining"
    ],
    fees: {
      joining: "₹500 + GST",
      annual: "₹500 + GST",
      renewal: "₹500 + GST"
    },
    creditLimit: "₹1,50,000 - ₹8,00,000",
    interestRate: "3.49% per month"
  },
  "HDFC IndianOil Credit Card": {
    features: [
      "2.5% fuel surcharge waiver at any fuel station",
      "4X reward points on fuel spends",
      "24/7 roadside assistance",
      "1% cashback on utility payments"
    ],
    rewards: [
      "1% cashback on fuel purchases",
      "Bonus points on IndianOil spends",
      "1 reward point per ₹150 spent"
    ],
    fees: {
      joining: "₹500 + GST",
      annual: "₹500 + GST",
      renewal: "₹500 + GST"
    },
    creditLimit: "₹1,00,000 - ₹5,00,000",
    interestRate: "3.49% per month"
  },
  "HDFC UPI RuPay Credit Card": {
    features: [
      "UPI payments enabled credit card",
      "1% cashback on UPI transactions",
      "Zero joining fee",
      "QR code-based merchant payments"
    ],
    rewards: [
      "RuPay Platinum benefits",
      "UPI rewards",
      "Special offers on RuPay network"
    ],
    fees: {
      joining: "₹0",
      annual: "₹500 + GST",
      renewal: "₹500 + GST"
    },
    creditLimit: "₹50,000 - ₹3,00,000",
    interestRate: "3.49% per month"
  },
  "HDFC Infinia Credit Card": {
    features: [
      "Unlimited airport lounge access worldwide",
      "Premium concierge services",
      "Golf privileges worldwide",
      "Comprehensive travel insurance"
    ],
    rewards: [
      "Welcome bonus 50,000 points",
      "5 reward points per ₹150 spent",
      "10X rewards on travel & shopping"
    ],
    fees: {
      joining: "₹10,000 + GST",
      annual: "₹10,000 + GST",
      renewal: "₹10,000 + GST"
    },
    creditLimit: "₹5,00,000 - ₹20,00,000",
    interestRate: "3.49% per month"
  },
  "HDFC MoneyBack+ Credit Card": {
    features: [
      "2% cashback on all spends",
      "10% cashback on partner brands",
      "Movie ticket discounts",
      "Fuel surcharge waiver"
    ],
    rewards: [
      "Welcome bonus 1500 points",
      "Points on every transaction",
      "Extra weekend rewards"
    ],
    fees: {
      joining: "₹750 + GST",
      annual: "₹750 + GST",
      renewal: "₹750 + GST"
    },
    creditLimit: "₹75,000 - ₹4,00,000",
    interestRate: "3.49% per month"
  }
};

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #f9fafb, #ffffff);
  margin-top: 70px;
`;

const BreadcrumbContainer = styled.div`
  padding: 24px 0;
  background: transparent;

  @media (max-width: 768px) {
    padding: 16px 8px;
  }
`;

const Breadcrumb = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 8px;

   @media (max-width: 768px) {
    font-size: 13px;
    gap: 8px;
  
  }
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
  background: linear-gradient(135deg, 
    rgba(0, 12, 23, 0.95) 0%,
    rgba(2, 30, 35, 0.9) 25%,
    rgba(4, 50, 45, 0.85) 50%,
    rgba(2, 40, 35, 0.9) 75%,
    rgba(0, 20, 30, 0.95) 100%
  );
  position: relative;
  padding: 48px 0;
  margin-bottom: 32px;
  border-radius: 16px;
  overflow: hidden;

   @media (max-width: 768px) {

    padding: 24px 0;
    margin-bottom: 24px;
  }
`;

const HeroGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 48px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 0 16px;
    text-align: center;
  }
`;

const CardImages = styled.div`
  position: relative;
  height: 250px;
  display: flex;
  justify-content: left;
  align-items: center;
  
  @media (max-width: 768px) {
    width: 280px;
    height: 180px;
    margin: 0 auto;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const CardImage = styled.img`
  width: 320px;
  height: 200px;
  border-radius: 12px;
  object-fit: cover;
  transition: transform 0.3s;

  &.rotated-left {
    position: absolute;
    transform: rotate(-6deg);
    &:hover {
      transform: rotate(0);
    }
  }

  &.rotated-right {
    position: absolute;
    transform: rotate(6deg);
    &:hover {
      transform: rotate(0);
    }
  }

   @media (max-width: 768px) {
    width: 250px;
    height: 150px;

    &.rotated-left {
    position: absolute;
    transform: rotate(-6deg);
    &:hover {
      transform: rotate(0);
    }
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  h1 {
    font-size: 2.5rem;
    margin-bottom: 16px;

    @media (max-width: 768px) {
      font-size: 1.75rem;
      margin-bottom: 12px;
    }
  }

  .ant-typography {
    @media (max-width: 768px) {
      font-size: 14px;
      line-height: 1.5;
    }
  }
`;

const CardsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 16px;
  margin-bottom: 80px;
`;

const SectionTitle = styled.h2`
  font-size: 15px;
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

  /* Specific adjustment for IndianOil card */
  img[src*="indianoil"] {
    transform: scale(1.65);
  }

  &:hover img {
    transform: scale(1.05);
  }

  /* Maintain the increased scale on hover for IndianOil card */
  &:hover img[src*="indianoil"] {
    transform: scale(1.70);
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

const HDFCCreditCard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [isCompareModalVisible, setIsCompareModalVisible] = useState(false);
  const compareContentRef = useRef<HTMLDivElement>(null);

  const handleViewDetails = (cardName: string) => {
    setSelectedCard(cardName);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  const toggleCardSelection = (cardName: string) => {
    console.log('Toggle card selection:', cardName);
    setSelectedCards(prev => {
      const newSelection = prev.includes(cardName)
        ? prev.filter(name => name !== cardName)
        : prev.length < 3
          ? [...prev, cardName]
          : prev;
      console.log('Updated selection:', newSelection);
      return newSelection;
    });
  };

  const handleDownloadPDF = async (): Promise<void> => {
    if (!compareContentRef.current) return;
    
    try {
      // Create canvas from the comparison content
      const canvas = await html2canvas(compareContentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      // Calculate dimensions
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('card-comparison.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <>
      <PageContainer>
        <BreadcrumbContainer>
          <Breadcrumb>
            <BreadcrumbLink to="/">Home</BreadcrumbLink>
            <BreadcrumbSeparator>&gt;</BreadcrumbSeparator>
            <BreadcrumbLink to="/credit-cards">Cards</BreadcrumbLink>
            <BreadcrumbSeparator>&gt;</BreadcrumbSeparator>
            <BreadcrumbCurrent>HDFC Bank Credit Cards</BreadcrumbCurrent>
          </Breadcrumb>
        </BreadcrumbContainer>
        <Container>
          <HeroSection>
            <HeroGrid>
              <CardImages>
                <CardImage src={hdfcHeroImage} alt="HDFC Bank Credit Card" className="rotated-left" />
                <CardImage src={hdfcHeroImage} alt="HDFC Bank Credit Card" className="rotated-right" />
              </CardImages>
              <HeroContent>
                <Title level={1} style={{ color: 'white', margin: 0 }}>
                  HDFC Bank Credit Cards
                </Title>
                <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '18px' }}>
                  HDFC Bank Credit Cards offer a range of benefits tailored to different lifestyles. 
                  From rewards on daily spends to exclusive lifestyle privileges, these cards are designed 
                  to enhance your banking experience.
                </Text>
                <div>
                  <Button   
                  type="default" 
                  size="large" 
                  style={{ marginRight: '16px' }}
                  onClick={() => navigate('/apply')}
                  >
                  Apply Now
                  </Button>
                  <Text type="secondary" style={{ fontSize: '14px' }}>
                    On HDFC Bank website
                  </Text>
                </div>
              </HeroContent>
            </HeroGrid>
          </HeroSection>

          <CardsSection>
            <SectionTitle>
              HDFC Bank Credit Cards
            </SectionTitle>

            {creditCards.map((card: Card) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: card.id * 0.1 }}
              >
                <CardGrid>
                  <CardImageContainer>
                    <img src={card.image} alt={card.name} />
                  </CardImageContainer>

                  <CardContent>
                    <div>
                      <CardTitle level={4}>{card.name}</CardTitle>
                    </div>

                    <div>
                      <SectionTitle>Best suited for</SectionTitle>
                      <TagContainer>
                        {card.suitedFor.map(suit => (
                          <Tag key={suit}>{suit}</Tag>
                        ))}
                      </TagContainer>
                    </div>

                    <BenefitSection>
                      <SectionTitle>Why this card</SectionTitle>
                      <BenefitWrapper>
                        <BenefitIcon>
                          {React.createElement(card.benefitIcon)}
                        </BenefitIcon>
                        <BenefitContent>{card.benefit}</BenefitContent>
                      </BenefitWrapper>
                    </BenefitSection>

                    <CompareWrapper>
                      <CompareCheckbox
                        checked={selectedCards.includes(card.name)}
                        onChange={() => toggleCardSelection(card.name)}
                      />
                      <CompareText>Compare</CompareText>
                    </CompareWrapper>
                  </CardContent>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <RatingContainer>
                      <Rate disabled defaultValue={card.rating} style={{ fontSize: '16px' }} />
                      <Text type="secondary" style={{ fontSize: '12px', textAlign: 'center' }}>
                        {card.rating} Customer Rating
                      </Text>
                    </RatingContainer>
                    <Button onClick={() => handleViewDetails(card.name)}>View Details</Button>
                    <Button type="primary" block onClick={() => navigate('/apply')}>Apply</Button>
                    <Text type="secondary" style={{ fontSize: '12px', textAlign: 'center' }}>
                      On HDFC Bank Website
                    </Text>
                  </div>
                </CardGrid>
              </motion.div>
            ))}
            
            <AnimatePresence>
              {selectedCards.length > 0 && (
                <CompareFloatingButton
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <Badge count={selectedCards.length} offset={[-5, 5]}>
                    <Button
                      type="primary"
                      icon={<SwapOutlined />}
                      onClick={() => setIsCompareModalVisible(true)}
                      size="large"
                    />
                  </Badge>
                </CompareFloatingButton>
              )}
              {isCompareModalVisible && (
                <StyledModal
                  title={
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: '140px' }}>
                      <span>Credit Card Comparison</span>
                      <DownloadButton 
                        type="primary" 
                        icon={<DownloadOutlined />}
                        onClick={handleDownloadPDF}
                      >
                        Download PDF
                      </DownloadButton>
                    </div>
                  }
                  open={isCompareModalVisible}
                  onCancel={() => setIsCompareModalVisible(false)}
                  footer={null}
                  width={900}
                  centered
                >
                  <div ref={compareContentRef}>
                    <CompareGrid cards={selectedCards.length}>
                      {selectedCards.map((cardName, index) => {
                        const card = creditCards.find(c => c.name === cardName);
                        const details = cardDetailsMap[cardName];
                        return (
                          <CompareCard
                            key={cardName}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <CompareSection>
                              <CompareCardImage>
                                <motion.img 
                                  src={card?.image} 
                                  alt={cardName}
                                  whileHover={{ scale: 1.05 }}
                                  transition={{ type: "spring", stiffness: 300 }}
                                />
                              </CompareCardImage>
                              <CompareCardTitle>{cardName}</CompareCardTitle>
                              <Rate disabled defaultValue={card?.rating || 0} style={{ fontSize: '12px', display: 'flex', justifyContent: 'center', marginBottom: '8px' }} />
                              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px', maxWidth: '80%', margin: '0 auto' }}>
                                {card?.suitedFor?.slice(0, 3).map(feature => (
                                  <motion.div
                                    key={feature}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                  >
                                    <FeatureTag>{feature}</FeatureTag>
                                  </motion.div>
                                ))}
                              </div>
                            </CompareSection>

                            <CompareSection>
                              <CompareSectionTitle>Card Fees</CompareSectionTitle>
                              <CompareValue>Joining Fee: {details?.fees?.joining || 'N/A'}</CompareValue>
                              <CompareValue>Annual Fee: {details?.fees?.annual || 'N/A'}</CompareValue>
                            </CompareSection>

                            <CompareSection>
                              <CompareSectionTitle>Rewards</CompareSectionTitle>
                              {details?.rewards?.slice(0, 2).map((reward, index) => (
                                <CompareValue key={index}>{reward}</CompareValue>
                              ))}
                            </CompareSection>

                            <CompareSection>
                              <CompareSectionTitle>Credit Limit</CompareSectionTitle>
                              <CompareValue>{details?.creditLimit || 'N/A'}</CompareValue>
                            </CompareSection>

                            <CompareSection>
                              <CompareSectionTitle>Key Benefits</CompareSectionTitle>
                              <BenefitList>
                                {details?.features?.slice(0, 3).map((benefit, index) => (
                                  <motion.div 
                                    key={index} 
                                    className="benefit-item"
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                  >
                                    <CheckCircleFilled /> {benefit}
                                  </motion.div>
                                ))}
                              </BenefitList>
                            </CompareSection>

                            <CompareSection>
                              <CompareSectionTitle>Interest Rate</CompareSectionTitle>
                              <CompareValue>{details?.interestRate || 'N/A'}</CompareValue>
                            </CompareSection>

                            <motion.div
                              style={{ marginTop: 'auto', width: '100%', padding: '0 16px' }}
                              whileHover={{ scale: 1.02 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Button type="primary" block>
                                Apply Now
                              </Button>
                            </motion.div>
                          </CompareCard>
                        );
                      })}
                    </CompareGrid>
                  </div>
                </StyledModal>
              )}
            </AnimatePresence>
          </CardsSection>
        </Container>
      </PageContainer>

      {selectedCard && (
        <StyledModal
          visible={!!selectedCard}
          onCancel={handleCloseModal}
          footer={null}
          width={800}
          title={selectedCard}
          closeIcon={<CloseOutlined />}
        >
          <Tabs defaultActiveKey="1" items={[
            {
              key: '1',
              label: 'Key Features',
              children: (
                <FeatureList>
                  {cardDetailsMap[selectedCard]?.features.map((feature: string, index: number) => (
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
                  {cardDetailsMap[selectedCard]?.rewards.map((reward: string, index: number) => (
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
                    <h4>Joining Fee</h4>
                    <Text>{cardDetailsMap[selectedCard]?.fees.joining}</Text>
                  </FeeCard>
                  <FeeCard>
                    <h4>Annual Fee</h4>
                    <Text>{cardDetailsMap[selectedCard]?.fees.annual}</Text>
                  </FeeCard>
                  <FeeCard>
                    <h4>Renewal Fee</h4>
                    <Text>{cardDetailsMap[selectedCard]?.fees.renewal}</Text>
                  </FeeCard>
                </FeeGrid>
              ),
            },
          ]} />
        </StyledModal>
      )}
      <Footer />
    </>
  );
};

export default HDFCCreditCard;
