import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
  display: flex;
  flex-direction: column;
`;

const DashboardContainer = styled.div`
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  flex: 1;
  
  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`;

const DashboardHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  padding: 0 20px;
`;

const HeaderTitle = styled.h1`
  color: #1a365d;
  font-size: 2.5rem;
  margin-top: 100px;
  margin-bottom: 20px;
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 10px;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 20px;
`;

const CardTitle = styled.h3`
  color: #2d3748;
  font-size: 1.5rem;
  margin-bottom: 15px;
  font-weight: 600;
`;

const CardDescription = styled.p`
  color: #718096;
  font-size: 1rem;
  line-height: 1.6;
`;

const CardStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
`;

const Stat = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  color: #4299e1;
  font-size: 1.5rem;
  font-weight: 700;
`;

const StatLabel = styled.div`
  color: #718096;
  font-size: 0.875rem;
`;

interface ApplicationCounts {
  total: number;
  completed: number;
  pending: number;
}

const EmployeeDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loanStats, setLoanStats] = useState<ApplicationCounts>({ total: 0, completed: 0, pending: 0 });
  const [insuranceStats, setInsuranceStats] = useState<ApplicationCounts>({ total: 0, completed: 0, pending: 0 });
  const [creditCardStats, setCreditCardStats] = useState<ApplicationCounts>({ total: 0, completed: 0, pending: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch loan statistics
      const { data: loanData } = await supabase
        .from('applications')
        .select('status')
        .eq('product_type', 'Loans');

      if (loanData) {
        setLoanStats({
          total: loanData.length,
          completed: loanData.filter(app => app.status === 'completed').length,
          pending: loanData.filter(app => app.status === 'pending').length
        });
      }

      // Fetch insurance statistics
      const { data: insuranceData } = await supabase
        .from('applications')
        .select('status')
        .eq('product_type', 'Insurance');

      if (insuranceData) {
        setInsuranceStats({
          total: insuranceData.length,
          completed: insuranceData.filter(app => app.status === 'completed').length,
          pending: insuranceData.filter(app => app.status === 'pending').length
        });
      }

      // Fetch credit card statistics
      const { data: creditCardData } = await supabase
        .from('applications')
        .select('status')
        .eq('product_type', 'Credit Cards');

      if (creditCardData) {
        setCreditCardStats({
          total: creditCardData.length,
          completed: creditCardData.filter(app => app.status === 'completed').length,
          pending: creditCardData.filter(app => app.status === 'pending').length
        });
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

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
            </CardStats>
          </Card>
        </CardsGrid>
      </DashboardContainer>
    </PageContainer>
  );
};

export default EmployeeDashboard;
