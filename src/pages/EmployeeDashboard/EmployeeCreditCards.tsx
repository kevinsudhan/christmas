import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { supabase } from '../../supabaseClient';
import DataTable from '../../components/DataTable/DataTable';
import type { ColumnsType } from 'antd/es/table';
import { Tag, Select, message } from 'antd';

const { Option } = Select;

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
`;

const ContentContainer = styled.div`
  padding: 80px 20px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`;

const Header = styled.div`
  margin-top: 100px;
  margin-bottom: 40px;
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

interface Application {
  id: number;
  created_at: string;
  product_type: string;
  name: string;
  salary: number;
  net_take_home: number;
  mobile_number: string;
  email: string;
  current_company: string;
  bank_account_details: string;
  status: string;
}

const EmployeeCreditCards: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);

  const handleStatusChange = async (value: string, record: Application) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status: value })
        .eq('id', record.id);

      if (error) throw error;

      message.success('Status updated successfully');
      fetchApplications(); // Refresh the data
    } catch (err) {
      console.error('Error updating status:', err);
      message.error('Failed to update status');
    }
  };

  const columns: ColumnsType<Application> = [
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Product Type',
      dataIndex: 'product_type',
      key: 'product_type',
      render: (type: string) => {
        let color = 'blue';
        switch (type?.toLowerCase()) {
          case 'loan':
            color = 'blue';
            break;
          case 'insurance':
            color = 'purple';
            break;
          case 'credit_card':
            color = 'cyan';
            break;
          default:
            color = 'default';
        }
        return <Tag color={color}>{type || 'N/A'}</Tag>;
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => name || 'N/A',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
      render: (salary: number) => `₹${salary?.toLocaleString() || 0}`,
    },
    {
      title: 'Net Take Home',
      dataIndex: 'net_take_home',
      key: 'net_take_home',
      render: (amount: number) => `₹${amount?.toLocaleString() || 0}`,
    },
    {
      title: 'Mobile No',
      dataIndex: 'mobile_number',
      key: 'mobile_number',
      render: (phone: string) => phone || 'N/A',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => email || 'N/A',
    },
    {
      title: 'Current Company',
      dataIndex: 'current_company',
      key: 'current_company',
      render: (company: string) => company || 'N/A',
    },
    {
      title: 'Bank Account Details',
      dataIndex: 'bank_account_details',
      key: 'bank_account_details',
      render: (details: string) => details || 'N/A',
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Select
          defaultValue={record.status || 'pending'}
          style={{ width: 140 }}
          onChange={(value) => handleStatusChange(value, record)}
        >
          <Option value="pending">Pending</Option>
          <Option value="acknowledged">Acknowledged</Option>
          <Option value="processing">Processing</Option>
          <Option value="completed">Completed</Option>
        </Select>
      ),
    },
  ];

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('product_type', 'Credit Cards')  
        .order('created_at', { ascending: false });

      if (error) throw error;

      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching credit card applications:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <MainContent>
        <ContentContainer>
          <Header>
            <Title>Credit Card Applications</Title>
            <Subtitle>View and manage all credit card applications</Subtitle>
          </Header>
          <DataTable 
            columns={columns}
            data={applications}
            loading={loading}
          />
        </ContentContainer>
      </MainContent>
    </PageWrapper>
  );
};

export default EmployeeCreditCards;
