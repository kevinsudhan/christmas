import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import loansBackground from '/images/Free_Vector___Collection_of_Financial_investment_Bank_deposit_profit_finance_Manage_money_in_cartoon_style_for_graphic_designer_vector_illustration.jpg';
import creditCardBackground from '/images/Credit_cards.jpg';
import insuranceBackground from '/Premium_Vector___Health_medical_report.jpg';

const ServicesSection = styled(motion.section)`
  padding: 120px 5% 80px;
  background: #ffffff;
  min-height: 100vh;
  display: flex;
  align-items: center;
`;

const Container = styled(motion.div)`
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 60px;
`;

const SectionSubtitle = styled(motion.h4)`
  color: #1a1a1a;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  color: #1a1a1a;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  
  span {
    color: #1a1a1a;
  }
`;

const CardsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  overflow: hidden;
  height: 650px;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

const ImageWrapper = styled.div<{ image: string }>`
  width: 100%;
  height: 350px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(44, 156, 145, 0.1),
      rgba(44, 156, 145, 0.2)
    );
    transition: all 0.3s ease;
  }

  ${ServiceCard}:hover &::after {
    background: linear-gradient(
      to bottom,
      rgba(44, 156, 145, 0.2),
      rgba(44, 156, 145, 0.3)
    );
  }
`;

const CardContent = styled.div`
  padding: 40px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: #1a1a1a;
  margin-bottom: 20px;
  font-weight: 600;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
  flex: 1;
`;

const ButtonWrapper = styled.div`
  margin-top: auto;
`;

const LearnMore = styled.button`
  background: #2c9c91;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;

  &:hover {
    background: #248f84;
    transform: translateY(-2px);
  }
`;

const Services: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    {
      image: loansBackground,
      title: 'Loans',
      description: 'Access flexible financing solutions tailored to your needs. Whether it\'s personal, business, or home loans, we offer competitive rates and quick approvals.',
      route: '/loans'
    },
    {
      image: insuranceBackground,
      title: 'Insurance',
      description: 'Protect what matters most with our comprehensive insurance coverage. From life to health insurance, we provide peace of mind for you and your loved ones.',
      route: '/insurance'
    },
    {
      image: creditCardBackground,
      title: 'Credit Cards',
      description: 'Discover premium credit cards with exclusive rewards, cashback offers, and special privileges. Enhance your lifestyle with our range of carefully curated options.',
      route: '/credit-cards'
    }
  ];

  return (
    <ServicesSection>
      <Container>
        <SectionHeader>
          <SectionSubtitle></SectionSubtitle>
          <Title>Our <span>Features</span> & Services.</Title>
        </SectionHeader>

        <CardsContainer>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              onClick={() => navigate(service.route)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <ImageWrapper image={service.image} />
              <CardContent>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
                <ButtonWrapper>
                  <LearnMore>More</LearnMore>
                </ButtonWrapper>
              </CardContent>
            </ServiceCard>
          ))}
        </CardsContainer>
      </Container>
    </ServicesSection>
  );
};

export default Services;