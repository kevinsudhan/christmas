import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { supabase } from '../../supabaseClient';
import DataTable from '../../components/DataTable/DataTable';
import type { ColumnsType } from 'antd/es/table';
import { Tag, Select, message } from 'antd';
import BackButton from '../../components/BackButton/BackButton';

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

interface Application {
  id: string;
  created_at: string;
  firstname: string;
  middlename?: string;
  lastname: string;
  email: string;
  mobilenumber: string;
  currentcompany: string;
  monthlysalary: number;
  nettakehome: number;
  bankingdetails: string;
  producttype: string;
  status: string;
}

const EmployeeInsurance: React.FC = () => {
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
      title: 'Name',
      key: 'name',
      render: (_, record) => `${record.firstname} ${record.middlename || ''} ${record.lastname}`.trim(),
    },
    {
      title: 'Monthly Salary',
      dataIndex: 'monthlysalary',
      key: 'monthlysalary',
      render: (salary: number) => `₹${salary?.toLocaleString() || 0}`,
    },
    {
      title: 'Net Take Home',
      dataIndex: 'nettakehome',
      key: 'nettakehome',
      render: (amount: number) => `₹${amount?.toLocaleString() || 0}`,
    },
    {
      title: 'Mobile No',
      dataIndex: 'mobilenumber',
      key: 'mobilenumber',
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
      dataIndex: 'currentcompany',
      key: 'currentcompany',
      render: (company: string) => company || 'N/A',
    },
    {
      title: 'Banking Details',
      dataIndex: 'bankingdetails',
      key: 'bankingdetails',
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
        .eq('producttype', 'Insurance')  // Updated to match new column name
        .order('created_at', { ascending: false });

      if (error) throw error;

      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching insurance applications:', error);
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
              <Title>Insurance Applications</Title>
              <Subtitle>View and manage all insurance applications</Subtitle>
            </Header>
          </HeaderSection>

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

export default EmployeeInsurance;
