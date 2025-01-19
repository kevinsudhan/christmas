import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, Button, Spin, Typography, Space, Divider, message, Avatar, Tooltip } from 'antd';
import { CopyOutlined, UserOutlined, MailOutlined, CalendarOutlined, IdcardOutlined, PhoneOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Title, Text } = Typography;

const ProfileContainer = styled.div`
  padding-top: 70px;
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: -70px auto 0; /* Offset the padding-top of ProfileContainer */
  padding: 24px;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 70px);
  background: #f5f5f5;
  gap: 16px;

  .ant-spin-dot {
    font-size: 36px;
    
    i {
      width: 18px;
      height: 18px;
    }
  }
`;

const LoadingText = styled(Text)`
  margin-top: 16px;
  color: #666;
  font-size: 16px;
`;

const StyledCard = styled(Card)`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  
  .ant-card-head {
    border-bottom: none;
    padding: 24px 24px 0;
  }

  .ant-card-head-title {
    font-size: 20px;
    font-weight: 600;
    color: #1a1a1a;
  }

  .ant-card-body {
    padding: 24px;
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  text-align: center;
  flex-direction: column;
`;

const ProfileAvatar = styled(Avatar)`
  width: 80px;
  height: 80px;
  margin-bottom: 16px;
  background: #1890ff;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .anticon {
    font-size: 36px;
  }
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  transition: background-color 0.2s;
  margin-bottom: 8px;
  background: #fafafa;

  &:hover {
    background: #f0f0f0;
  }

  .anticon {
    font-size: 18px;
    color: #1890ff;
    margin-right: 16px;
  }
`;

const Label = styled(Text)`
  color: #666;
  min-width: 120px;
`;

const Value = styled(Text)`
  color: #1a1a1a;
  flex: 1;
  margin: 0 16px;
`;

const CopyButton = styled(Button)`
  padding: 4px 8px;
  border: none;
  background: transparent;
  
  &:hover {
    color: #1890ff;
    background: #e6f7ff;
  }

  .anticon {
    margin: 0;
  }
`;

const CustomerIdBadge = styled.div`
opacity:0;
  background: #e6f7ff;
  border: 1px solid #91d5ff;
  border-radius: 4px;
  padding: 4px 12px;
  display: inline-flex;
  align-items: center;
  margin-top: 8px;
  
  .anticon {
    color: #1890ff;
    margin-right: 8px;
    font-size: 14px;
  }
`;

interface UserProfile {
  id: string;
  customer_id: string;
  full_name: string;
  email: string;
  phone: string;
  created_at: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setError("Please login to view your profile");
          return;
        }

        const { data, error: profileError } = await supabase
          .from('customers')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;
        setProfile(data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      message.success('Customer ID copied to clipboard');
    } catch (err) {
      console.error('Failed to copy:', err);
      message.error('Failed to copy Customer ID');
    }
  };

  if (isLoading) {
    return (
      <ProfileContainer>
        <LoadingContainer>
          <Spin size="large" tip={
            <LoadingText>Loading your profile...</LoadingText>
          } />
        </LoadingContainer>
      </ProfileContainer>
    );
  }

  if (error) {
    return (
      <ProfileContainer>
        <LoadingContainer>
          <Text type="danger" style={{ fontSize: '16px' }}>{error}</Text>
        </LoadingContainer>
      </ProfileContainer>
    );
  }

  if (!profile) {
    return (
      <ProfileContainer>
        <LoadingContainer>
          <Text style={{ fontSize: '16px' }}>No profile found</Text>
        </LoadingContainer>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      <ContentContainer>
        <ProfileHeader>
          <ProfileAvatar icon={<UserOutlined />} />
          <div style={{ textAlign: 'center' }}>
            <Title level={3} style={{ margin: 0, marginBottom: 4 }}>{profile.full_name}</Title>
            
            <CustomerIdBadge>
              <IdcardOutlined />
              <Text>{profile.customer_id}</Text>
            </CustomerIdBadge>
          </div>
        </ProfileHeader>
        
        <StyledCard title="Account Information">
          <Space direction="vertical" size={0} style={{ width: '100%' }}>
            <InfoRow>
              <IdcardOutlined />
              <Label>Customer ID</Label>
              <Value>{profile.customer_id}</Value>
              <Tooltip title="Copy Customer ID">
                <CopyButton 
                  icon={<CopyOutlined />}
                  onClick={() => copyToClipboard(profile.customer_id)}
                />
              </Tooltip>
            </InfoRow>

            <InfoRow>
              <UserOutlined />
              <Label>Full Name</Label>
              <Value>{profile.full_name}</Value>
            </InfoRow>

            <InfoRow>
              <MailOutlined />
              <Label>Email</Label>
              <Value>{profile.email}</Value>
            </InfoRow>

            <InfoRow>
              <PhoneOutlined />
              <Label>Phone</Label>
              <Value>{profile.phone || 'Not provided'}</Value>
            </InfoRow>

            <InfoRow>
              <CalendarOutlined />
              <Label>Member Since</Label>
              <Value>{new Date(profile.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</Value>
            </InfoRow>
          </Space>
        </StyledCard>
      </ContentContainer>
    </ProfileContainer>
  );
}