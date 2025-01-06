import React, { useState } from 'react';
import styled from 'styled-components';
import { Tabs, Card, Typography, Badge, Row, Col } from 'antd';
import { BankOutlined, EnvironmentOutlined, GlobalOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const { TabPane } = Tabs;
const { Title, Text } = Typography;

const NetworkContainer = styled.div`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
`;

const NetworkHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;

  h2 {
    font-size: 2.5rem;
    color: #1a365d;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    color: #4a5568;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const StatsSection = styled.div`
  margin-bottom: 4rem;
`;

const StatCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  text-align: center;

  .stat-icon {
    font-size: 2.5rem;
    color: #1a365d;
    margin-bottom: 1rem;
  }

  .stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1a365d;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    font-size: 1rem;
    color: #4a5568;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const BranchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const StateCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const StateHeader = styled.div`
  background: linear-gradient(135deg, #1a365d 0%, #2a4365 100%);
  padding: 1.5rem;
  color: white;

  h3 {
    margin: 0;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
  }

  .branch-count {
    font-size: 0.9rem;
    opacity: 0.9;
    margin-top: 0.5rem;
  }
`;

const BranchList = styled.div`
  padding: 1.5rem;
`;

const BranchItem = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 10px;
  background: #f8fafc;
  margin-bottom: 0.75rem;
  transition: all 0.3s ease;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: #edf2f7;
    transform: translateX(5px);
  }

  .branch-icon {
    color: #2c5282;
    margin-right: 1rem;
    font-size: 1.2rem;
  }
`;

const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    margin-bottom: 3rem;
  }

  .ant-tabs-tab {
    padding: 1rem 2rem;
    
    &.ant-tabs-tab-active {
      .ant-tabs-tab-btn {
        color: #1a365d;
        font-weight: bold;
      }
    }
  }
`;

interface BranchData {
  [key: string]: string[];
}

const branchData = {
  everyday: {
    'TAMILNADU': ['Chennai', 'Trichy', 'Hosur', 'Pondicherry', 'Tirunelveli', 'Vellore', 'Coimbatore', 'Madurai'],
    'KARNATAKA': ['Hubli', 'Mangalore', 'Bangalore', 'Mysore', 'Tumkur', 'Davangere', 'Hosur'],
    'TELANGANA': ['Hyderabad'],
    'KERALA': ['Cochin', 'Thiruvananthapuram']
  },
  retail: {
    'TAMILNADU': ['Vellore Credit Card Unit', 'Trichy', 'Madurai', 'Pondicherry', 'Coimbatore'],
    'KARNATAKA': ['Bangalore Credit Card Unit 1', 'Bangalore Credit Card Unit 2'],
    'TELANGANA': ['Hyderabad', 'Vijayawada'],
    'KERALA': ['Thiruvananthapuram', 'Cochin']
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
};

const BranchNetwork: React.FC = () => {
  const [activeTab, setActiveTab] = useState('1');

  const getTotalBranches = (data: BranchData) => {
    return Object.values(data).reduce((acc, branches) => acc + branches.length, 0);
  };

  const getTotalStates = (data: BranchData) => {
    return Object.keys(data).length;
  };

  const renderBranches = (data: BranchData) => {
    return Object.entries(data).map(([state, branches]) => (
      <StateCard
        key={state}
        as={motion.div}
        variants={itemVariants}
      >
        <StateHeader>
          <h3>
            <EnvironmentOutlined /> {state}
          </h3>
          <div className="branch-count">
            {branches.length} {branches.length === 1 ? 'Branch' : 'Branches'}
          </div>
        </StateHeader>
        <BranchList>
          {branches.map((branch) => (
            <BranchItem
              key={branch}
              as={motion.div}
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <BankOutlined className="branch-icon" />
              <Text>{branch}</Text>
            </BranchItem>
          ))}
        </BranchList>
      </StateCard>
    ));
  };

  const renderStats = (data: BranchData) => {
    const totalBranches = getTotalBranches(data);
    const totalStates = getTotalStates(data);

    return (
      <Row gutter={[24, 24]} justify="center">
        <Col xs={24} sm={8}>
          <StatCard
            as={motion.div}
            variants={itemVariants}
          >
            <GlobalOutlined className="stat-icon" />
            <div className="stat-number">{totalStates}</div>
            <div className="stat-label">States</div>
          </StatCard>
        </Col>
        <Col xs={24} sm={8}>
          <StatCard
            as={motion.div}
            variants={itemVariants}
          >
            <BankOutlined className="stat-icon" />
            <div className="stat-number">{totalBranches}</div>
            <div className="stat-label">Branches</div>
          </StatCard>
        </Col>
      </Row>
    );
  };

  return (
    <NetworkContainer>
      <NetworkHeader>
        <Title level={2}>Our Branch Network</Title>
        <Text>Serving customers across India with our extensive network of branches</Text>
      </NetworkHeader>

      <StyledTabs
        activeKey={activeTab}
        onChange={setActiveTab}
        centered
      >
        <TabPane tab="Everyday Banking and Financial Solutions" key="1">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <StatsSection>
              {renderStats(branchData.everyday)}
            </StatsSection>
            <BranchGrid>
              {renderBranches(branchData.everyday)}
            </BranchGrid>
          </motion.div>
        </TabPane>
        
        <TabPane tab="Everyday Banking and Retail Assets" key="2">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <StatsSection>
              {renderStats(branchData.retail)}
            </StatsSection>
            <BranchGrid>
              {renderBranches(branchData.retail)}
            </BranchGrid>
          </motion.div>
        </TabPane>
      </StyledTabs>
    </NetworkContainer>
  );
};

export default BranchNetwork;
