import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { supabase } from '../../supabaseClient';
import DataTable from '../../components/DataTable/DataTable';
import type { ColumnsType } from 'antd/es/table';
import { Tag, Select, message, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

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

const BackButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  height: auto;
  background: transparent;
  border: none;
  color: #64748b;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  .anticon {
    margin-right: 8px;
    font-size: 0.9rem;
  }

  &:hover {
    color: #1a365d;
    background: transparent;
    transform: translateX(-5px);
  }

  &:focus {
    background: transparent;
  }
`;

const HeaderSection = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Header = styled.div`
  text-align: left;
`;

const Title = styled.h1`
  color: #1a365d;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  color: #4a5568;
  font-size: 1.1rem;
  margin: 0;
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

const EmployeeLoans: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const navigate = useNavigate();

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

  const handleBack = () => {
    navigate('/EmployeeDashboard/EmployeeDashboard');
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
        .eq('producttype', 'Loans')  
        .order('created_at', { ascending: false });

      if (error) throw error;

      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching loan applications:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <MainContent>
        <ContentContainer>
          <BackButton 
            icon={<LeftOutlined />} 
            onClick={handleBack}
            aria-label="Back to dashboard"
          >
            Back to Dashboard
          </BackButton>
          
          <HeaderSection>
            <Header>
              <Title>Loan Applications</Title>
              <Subtitle>View and manage all loan applications</Subtitle>
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

export default EmployeeLoans;
