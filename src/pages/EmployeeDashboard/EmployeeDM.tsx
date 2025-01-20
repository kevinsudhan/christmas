import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';
import DataTable from '../../components/DataTable/DataTable';
import type { ColumnsType } from 'antd/es/table';
import { Tag } from 'antd';
import BackButton from '../../components/BackButton/BackButton';

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f7fa;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
  padding-top: 80px;
`;

const ContentContainer = styled.div`
  padding: 0 20px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;

const HeaderSection = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Header = styled.div`
  margin-top: 0;
  margin-bottom: 0;
  text-align: left;
`;

const Title = styled.h1`
  color: #1a365d;
  font-size: 2.5rem;
  margin-bottom: 15px;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  color: #4a5568;
  font-size: 1.1rem;
`;

interface Customer {
  id: string;
  customer_id: string;
  firstname: string;
  middlename?: string;
  lastname: string;
  producttype: string;
}

interface GroupedCustomer {
  customer_id: string;
  name: string;
  producttypes: string[];
}

// Function to get tag color based on product type
const getTagColor = (productType: string): string => {
  const colorMap: { [key: string]: string } = {
    'Insurance': 'blue',
    'Credit Cards': 'green',
    'Loans': 'orange',
  };
  return colorMap[productType] || 'default';
};

const EmployeeDM: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<GroupedCustomer[]>([]);

  const columns: ColumnsType<GroupedCustomer> = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Customer ID',
      dataIndex: 'customer_id',
      key: 'customer_id',
    },
    {
      title: 'Product Types',
      key: 'producttypes',
      dataIndex: 'producttypes',
      render: (producttypes: string[]) => (
        <>
          {producttypes.map((type) => (
            <Tag color={getTagColor(type)} key={type} style={{ margin: '2px' }}>
              {type}
            </Tag>
          ))}
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      console.log('Fetching customers...');
      const { data, error } = await supabase
        .from('applications')
        .select('id, customer_id, firstname, middlename, lastname, producttype')
        .order('created_at', { ascending: false });

      console.log('Response:', { data, error });

      if (error) throw error;

      // Group customers by customer_id
      const groupedData = data?.reduce((acc: { [key: string]: GroupedCustomer }, curr) => {
        const fullName = `${curr.firstname} ${curr.middlename || ''} ${curr.lastname}`.trim();
        
        if (!acc[curr.customer_id]) {
          acc[curr.customer_id] = {
            customer_id: curr.customer_id,
            name: fullName,
            producttypes: [curr.producttype]
          };
        } else {
          // Only add product type if it's not already in the array
          if (!acc[curr.customer_id].producttypes.includes(curr.producttype)) {
            acc[curr.customer_id].producttypes.push(curr.producttype);
          }
        }
        
        return acc;
      }, {});

      const groupedCustomers = Object.values(groupedData);
      console.log('Grouped customers:', groupedCustomers);
      
      setCustomers(groupedCustomers);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <MainContent>
        <ContentContainer>
          <BackButton />
          
          <HeaderSection>
            <Header>
              <Title>Customer Points Management</Title>
              <Subtitle>View and manage customer points</Subtitle>
            </Header>
          </HeaderSection>

          <DataTable 
            columns={columns}
            data={customers}
            loading={loading}
          />
        </ContentContainer>
      </MainContent>
    </PageWrapper>
  );
};

export default EmployeeDM;
