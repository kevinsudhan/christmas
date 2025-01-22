import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';
import DataTable from '../../components/DataTable/DataTable';
import type { ColumnsType } from 'antd/es/table';
import { Tag, Input, Button, message } from 'antd';
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
  service_amount?: number;
  points?: number;
  isEditing?: boolean;
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
  const [editingKey, setEditingKey] = useState<string>('');

  const isEditing = (record: GroupedCustomer) => record.customer_id === editingKey;

  const edit = (record: GroupedCustomer) => {
    setEditingKey(record.customer_id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (record: GroupedCustomer) => {
    try {
      const { error } = await supabase
        .from('customer_points')
        .upsert({
          customer_id: record.customer_id,
          service_amount: record.service_amount,
          points: record.points,
        });

      if (error) throw error;

      message.success('Successfully updated customer points');
      setEditingKey('');
      await fetchCustomers();
    } catch (error) {
      console.error('Error saving customer points:', error);
      message.error('Failed to update customer points');
    }
  };

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
    {
      title: 'Service Amount',
      dataIndex: 'service_amount',
      key: 'service_amount',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Input
            type="number"
            defaultValue={record.service_amount?.toString()}
            onChange={(e) => {
              const newCustomers = [...customers];
              const index = newCustomers.findIndex(item => item.customer_id === record.customer_id);
              newCustomers[index] = { ...newCustomers[index], service_amount: parseFloat(e.target.value) };
              setCustomers(newCustomers);
            }}
          />
        ) : (
          record.service_amount || '-'
        );
      }
    },
    {
      title: 'Points',
      dataIndex: 'points',
      key: 'points',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Input
            type="number"
            defaultValue={record.points?.toString()}
            onChange={(e) => {
              const newCustomers = [...customers];
              const index = newCustomers.findIndex(item => item.customer_id === record.customer_id);
              newCustomers[index] = { ...newCustomers[index], points: parseFloat(e.target.value) };
              setCustomers(newCustomers);
            }}
          />
        ) : (
          record.points || '-'
        );
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button type="link" onClick={() => save(record)} style={{ marginRight: 8 }}>
              Save
            </Button>
            <Button type="link" onClick={cancel}>
              Cancel
            </Button>
          </span>
        ) : (
          <Button type="link" disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Button>
        );
      }
    }
  ];

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      console.log('Fetching customers...');
      const { data: applicationsData, error: applicationsError } = await supabase
        .from('applications')
        .select('id, customer_id, firstname, middlename, lastname, producttype')
        .order('created_at', { ascending: false });

      console.log('Applications Data:', applicationsData);
      console.log('Applications Error:', applicationsError);

      if (applicationsError) throw applicationsError;

      // Fetch points data
      const { data: pointsData, error: pointsError } = await supabase
        .from('customer_points')
        .select('customer_id, service_amount, points');

      console.log('Points Data:', pointsData);
      console.log('Points Error:', pointsError);

      if (pointsError) throw pointsError;

      // Create points lookup
      const pointsLookup = pointsData?.reduce((acc: { [key: string]: { service_amount?: number, points?: number } }, curr) => {
        acc[curr.customer_id] = {
          service_amount: curr.service_amount,
          points: curr.points
        };
        return acc;
      }, {});

      console.log('Points Lookup:', pointsLookup);

      // Group customers by customer_id
      const groupedData = applicationsData?.reduce((acc: { [key: string]: GroupedCustomer }, curr) => {
        const fullName = `${curr.firstname} ${curr.middlename || ''} ${curr.lastname}`.trim();
        
        if (!acc[curr.customer_id]) {
          acc[curr.customer_id] = {
            customer_id: curr.customer_id,
            name: fullName,
            producttypes: [curr.producttype],
            service_amount: pointsLookup?.[curr.customer_id]?.service_amount,
            points: pointsLookup?.[curr.customer_id]?.points
          };
        } else {
          if (!acc[curr.customer_id].producttypes.includes(curr.producttype)) {
            acc[curr.customer_id].producttypes.push(curr.producttype);
          }
        }
        
        return acc;
      }, {});

      const groupedCustomers = Object.values(groupedData);
      console.log('Final Grouped Customers:', groupedCustomers);
      
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
