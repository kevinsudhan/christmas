import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Radio, RadioChangeEvent } from 'antd';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  AnimatedSection,
  GradientText,
  HoverCard,
  fadeInVariants,
  containerVariants,
  slideVariants,
} from '../Animations/AnimatedComponents';

// Import images
import personalLoanImg from '../../assets/images/services/personal-loan.jpg';
import businessLoanImg from '../../assets/images/services/business-loan.jpg';
import homeLoanImg from '../../assets/images/services/home-loan.jpg';
import creditCardImg from '../../assets/images/services/credit-card.jpg';
import healthInsuranceImg from '../../assets/images/services/health-insurance.jpg';
import lifeInsuranceImg from '../../assets/images/services/life-insurance.jpg';
import goldLoanImg from '../../assets/images/services/gold-loan.jpg';
import shortTermLoanImg from '../../assets/images/services/short-term-loan.jpg';

const ServicesSection = styled(motion.section)`
  padding: 120px 5% 80px;
  position: relative;
  background-color: #ffffff;

  @media (max-width: 768px) {
    padding: 100px 4% 60px;
  }

  @media (max-width: 480px) {
    padding: 80px 3% 40px;
  }
`;

const Container = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  color: #1a1a1a;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #0094d9, #0077b6);
    border-radius: 2px;

    @media (max-width: 480px) {
      width: 40px;
      height: 2px;
    }
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 2rem auto 0;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 1.5rem auto 0;
    padding: 0 20px;
  }
`;

const FilterContainer = styled(motion.div)`
  text-align: center;
  margin-bottom: 40px;
  padding: 0 15px;

  @media (max-width: 768px) {
    margin-bottom: 30px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 5px;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 4px;
    }
  }

  .ant-radio-group {
    display: inline-flex;
    background: white;
    padding: 4px;
    border-radius: 30px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    gap: 4px;

    @media (max-width: 768px) {
      display: flex;
      width: max-content;
      margin: 0 auto;
    }

    .ant-radio-button-wrapper {
      height: 36px;
      line-height: 36px;
      border: none;
      background: transparent;
      padding: 0 24px;
      border-radius: 18px;
      transition: all 0.3s ease;
      white-space: nowrap;

      @media (max-width: 768px) {
        height: 32px;
        line-height: 32px;
        padding: 0 16px;
        font-size: 0.9rem;
      }

      &:not(:first-child)::before {
        display: none;
      }

      &:hover {
        color: #0094d9;
      }

      &.ant-radio-button-wrapper-checked {
        background: linear-gradient(135deg, #0094d9 0%, #0077b6 100%);
        color: white;
        box-shadow: 0 2px 6px rgba(0, 148, 217, 0.3);
      }
    }
  }
`;

const CardsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    padding: 0 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    max-width: 400px;
    gap: 20px;
    padding: 0 10px;
  }
`;

const ServiceCard = styled(HoverCard)`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  @media (max-width: 968px) {
    max-width: 300px;
    margin: 0 auto;
  }

  @media (max-width: 480px) {
    max-width: 260px;
    margin: 0 auto;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  }

`;

const CardImage = styled(motion.div)<{ $backgroundImage: string }>`
  height: 180px;
  background-image: url(${props => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  border-radius: 12px 12px 0 0;
  position: relative;
  overflow: hidden;

@media (max-width: 968px) {
    height: 160px;
  }

  @media (max-width: 480px) {
    height: 140px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  ${ServiceCard}:hover &::before {
    opacity: 1;
  }
`;

const CardContent = styled(motion.div)`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;

 @media (max-width: 968px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }


  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 2px;
    background: linear-gradient(90deg, #0094d9, #0077b6);
    border-radius: 1px;
  }
`;

const CardTitle = styled(motion.h3)`
  font-size: 1.1rem;
  color: #1a1a1a;
  margin-bottom: 8px;
  font-weight: 600;
  line-height: 1.4;
  min-height: 2.4em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

   @media (max-width: 968px) {
    font-size: 1rem;
    margin-bottom: 6px;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    margin-bottom: 4px;
  }
`;

const CardDescription = styled(motion.p)`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 968px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.82rem;
  }
`;

const ServiceLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  height: 100%;
  display: block;
`;

type ServiceType = 'all' | 'loans' | 'cards' | 'insurance';

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  type: ServiceType[];
}

const services: Service[] = [
  {
    id: 1,
    title: 'Personal Loan',
    description: 'Get instant personal loans with minimal documentation and competitive interest rates',
    image: personalLoanImg,
    type: ['loans'],
  },
  {
    id: 2,
    title: 'Credit Cards',
    description: 'Premium credit cards with exclusive rewards and lifestyle benefits',
    image: creditCardImg,
    type: ['cards'],
  },
  {
    id: 3,
    title: 'Health Insurance',
    description: 'Comprehensive health coverage for you and your family with cashless claims',
    image: healthInsuranceImg,
    type: ['insurance'],
  },
  {
    id: 4,
    title: 'Business Loan',
    description: 'Flexible financing solutions to fuel your business growth and expansion',
    image: businessLoanImg,
    type: ['loans'],
  },
  {
    id: 5,
    title: 'Life Insurance',
    description: "Secure your family's future with our comprehensive life insurance plans",
    image: lifeInsuranceImg,
    type: ['insurance'],
  },
  {
    id: 6,
    title: 'Home Loan',
    description: 'Make your dream home a reality with attractive interest rates and long tenure',
    image: homeLoanImg,
    type: ['loans'],
  },
  {
    id: 7,
    title: 'Short Term Loan',
    description: 'Quick loans for immediate financial needs with flexible repayment options',
    image: shortTermLoanImg,
    type: ['loans'],
  },
  {
    id: 8,
    title: 'Gold Loan',
    description: 'Unlock the value of your gold with minimal documentation and quick processing',
    image: goldLoanImg,
    type: ['loans'],
  }
];

const Services: React.FC = () => {
  const [filter, setFilter] = useState<ServiceType>('all');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFilterChange = (e: RadioChangeEvent) => {
    setFilter(e.target.value);
  };

  const mainCategories = [
    {
      id: 'main-1',
      title: 'Loans',
      description: 'Explore our range of loan options tailored to meet your financial needs.',
      image: personalLoanImg,
      type: ['loans'],
      link: '/loans'
    },
    {
      id: 'main-2',
      title: 'Credit Cards',
      description: 'Premium credit cards with exclusive rewards and lifestyle benefits',
      image: creditCardImg,
      type: ['cards'],
      link: '/credit-cards'
    },
    {
      id: 'main-3',
      title: 'Insurance',
      description: 'Protect what matters most with our diverse insurance solutions',
      image: healthInsuranceImg,
      type: ['insurance'],
      link: '/insurance'
    }
  ];

  const filteredServices = filter === 'all'
    ? services
    : services.filter(service => service.type.includes(filter));

  const displayServices = windowWidth <= 768 ? mainCategories : filteredServices;

  return (
    <ServicesSection
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInVariants}
    >
      <Container variants={containerVariants}>
        <SectionHeader>
          <Title>
            Our <GradientText>Services</GradientText>
          </Title>
          <Subtitle variants={fadeInVariants}>
            Explore our comprehensive range of financial solutions tailored to meet your needs
          </Subtitle>
        </SectionHeader>

        {windowWidth > 768 && (
          <FilterContainer variants={fadeInVariants}>
            <Radio.Group
              value={filter}
              onChange={handleFilterChange}
              buttonStyle="solid"
              size="large"
            >
              <Radio.Button value="all">All Services</Radio.Button>
              <Radio.Button value="loans">Loans</Radio.Button>
              <Radio.Button value="cards">Cards</Radio.Button>
              <Radio.Button value="insurance">Insurance</Radio.Button>
            </Radio.Group>
          </FilterContainer>
        )}

        <CardsGrid variants={containerVariants}>
          {displayServices.map((service) => (
            <ServiceLink 
              key={service.id} 
              to={windowWidth <= 768 ? service.link : `/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <ServiceCard variants={slideVariants}>
                <CardImage
                  $backgroundImage={service.image}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <CardContent>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </ServiceCard>
            </ServiceLink>
          ))}
        </CardsGrid>
      </Container>
    </ServicesSection>
  );
};

export default Services;