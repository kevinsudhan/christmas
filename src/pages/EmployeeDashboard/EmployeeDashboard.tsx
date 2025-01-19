import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useLoanStats } from '../../hooks/useLoanStats';
import { useInsuranceStats } from '../../hooks/useInsuranceStats';
import { useCreditCardStats } from '../../hooks/useCreditCardStats';

const PageContainer = styled.div`
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const DashboardContainer = styled.div`
  padding: 20px;
  max-width: 1600px;
  margin: auto;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const DashboardHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  padding: 0 20px;
`;

const HeaderTitle = styled.h1`
  color: #1a365d;
  font-size: 2.5rem;
  margin-bottom: 16px;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeaderSubtitle = styled.p`
  color: #4a5568;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
  margin-bottom: 20px;
  overflow-x: auto;
  
  @media (max-width: 1400px) {
    grid-template-columns: repeat(4, 300px);
    justify-content: flex-start;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(4, 280px);
    gap: 15px;
    padding: 10px;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  height: auto;
  min-height: 400px;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 15px;
    min-height: 380px;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const CardTitle = styled.h3`
  color: #2d3748;
  font-size: 1.3rem;
  margin-bottom: 10px;
  font-weight: 600;
  line-height: 1.4;
`;

const CardDescription = styled.p`
  color: #718096;
  font-size: 0.8rem;
  line-height: 1.6;
  height: 60px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-bottom: 12px;
`;

const CardStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
  overflow-x: auto;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

const Stat = styled.div`
  text-align: center;
  padding: 6px 4px;
  background: #f7fafc;
  border-radius: 8px;
  transition: all 0.2s ease;
  min-width: 80px;

  &:hover {
    background: #edf2f7;
  }
`;

const StatNumber = styled.div`
  color: #4299e1;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  color: #718096;
  font-size: 0.6rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
`;

interface ApplicationCounts {
  total: number;
  completed: number;
  pending: number;
  acknowledged: number;
  processing: number;
}

const EmployeeDashboard: React.FC = () => {
  const navigate = useNavigate();
  const loanStats = useLoanStats();
  const insuranceStats = useInsuranceStats();
  const creditCardStats = useCreditCardStats();

  return (
    <PageContainer>
      <DashboardContainer>
        <DashboardHeader>
          <HeaderTitle>Employee Dashboard</HeaderTitle>
          <HeaderSubtitle>
            Welcome to your dashboard. Monitor and manage your portfolio across different financial products.
          </HeaderSubtitle>
        </DashboardHeader>

        <CardsGrid>
          <Card onClick={() => navigate('/employee/loans')}>
            <CardImage 
              src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&q=80"
              alt="Loans"
            />
            <CardTitle>Loans</CardTitle>
            <CardDescription>
              Manage loan applications, track approval status, and monitor disbursements across various loan products.
            </CardDescription>
            <CardStats>
              <Stat>
                <StatNumber>{loanStats.total}</StatNumber>
                <StatLabel>Total</StatLabel>
              </Stat>
              <Stat>
                <StatNumber>{loanStats.completed}</StatNumber>
                <StatLabel>Completed</StatLabel>
              </Stat>
              <Stat>
                <StatNumber>{loanStats.pending}</StatNumber>
                <StatLabel>Pending</StatLabel>
              </Stat>
              <Stat>
                <StatNumber>{loanStats.acknowledged}</StatNumber>
                <StatLabel>Acknowledged</StatLabel>
              </Stat>
              <Stat>
                <StatNumber>{loanStats.processing}</StatNumber>
                <StatLabel>Processing</StatLabel>
              </Stat>
            </CardStats>
          </Card>

          <Card onClick={() => navigate('/employee/insurance')}>
            <CardImage 
              src="https://images.unsplash.com/photo-1556742393-d75f468bfcb0?auto=format&fit=crop&q=80"
              alt="Insurance"
            />
            <CardTitle>Insurance</CardTitle>
            <CardDescription>
              Review insurance policies, process claims, and analyze customer insurance portfolios efficiently.
            </CardDescription>
            <CardStats>
              <Stat>
                <StatNumber>{insuranceStats.total}</StatNumber>
                <StatLabel>Total</StatLabel>
              </Stat>
              <Stat>
                <StatNumber>{insuranceStats.completed}</StatNumber>
                <StatLabel>Completed</StatLabel>
              </Stat>
              <Stat>
                <StatNumber>{insuranceStats.pending}</StatNumber>
                <StatLabel>Pending</StatLabel>
              </Stat>
              <Stat>
                <StatNumber>{insuranceStats.acknowledged}</StatNumber>
                <StatLabel>Acknowledged</StatLabel>
              </Stat>
              <Stat>
                <StatNumber>{insuranceStats.processing}</StatNumber>
                <StatLabel>Processing</StatLabel>
              </Stat>
            </CardStats>
          </Card>

          <Card onClick={() => navigate('/employee/credit-cards')}>
            <CardImage 
              src="https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80"
              alt="Credit Cards"
            />
            <CardTitle>Credit Cards</CardTitle>
            <CardDescription>
              Handle credit card applications, monitor credit limits, and manage customer card services.
            </CardDescription>
            <CardStats>
              <Stat>
                <StatNumber>{creditCardStats.total}</StatNumber>
                <StatLabel>Total</StatLabel>
              </Stat>
              <Stat>
                <StatNumber>{creditCardStats.completed}</StatNumber>
                <StatLabel>Completed</StatLabel>
              </Stat>
              <Stat>
                <StatNumber>{creditCardStats.pending}</StatNumber>
                <StatLabel>Pending</StatLabel>
              </Stat>
              <Stat>
                <StatNumber>{creditCardStats.acknowledged}</StatNumber>
                <StatLabel>Acknowledged</StatLabel>
              </Stat>
              <Stat>
                <StatNumber>{creditCardStats.processing}</StatNumber>
                <StatLabel>Processing</StatLabel>
              </Stat>
            </CardStats>
          </Card>

          <Card onClick={() => navigate('/employee/database')}>
            <CardImage 
              src="/images/database-44.svg"
              alt="Customer Database"
              style={{ objectFit: 'contain', padding: '20px', background: '#f7fafc' }}
            />
            <CardTitle>Customer Database</CardTitle>
            <CardDescription>
              Access and manage comprehensive customer records, track interactions, and analyze customer data for better service delivery and decision-making.
            </CardDescription>
            <CardStats>
              <Stat>
                <StatNumber>--</StatNumber>
                <StatLabel>Total</StatLabel>
              </Stat>
              <Stat>
                <StatNumber>--</StatNumber>
                <StatLabel>Active</StatLabel>
              </Stat>
              <Stat>
                <StatNumber>--</StatNumber>
                <StatLabel>New</StatLabel>
              </Stat>
              <Stat>
                <StatNumber>--</StatNumber>
                <StatLabel>Acknowledged</StatLabel>
              </Stat>
              <Stat>
                <StatNumber>--</StatNumber>
                <StatLabel>Processing</StatLabel>
              </Stat>
            </CardStats>
          </Card>
        </CardsGrid>
      </DashboardContainer>
    </PageContainer>
  );
};

export default EmployeeDashboard;
