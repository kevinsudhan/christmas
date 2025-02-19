import React, { useState, useEffect } from 'react';
import { Menu, Button, Dropdown, Avatar, Divider } from 'antd';
import type { MenuProps } from 'antd';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { DownOutlined, CloseOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import ebsLogo from './EBS logo.png';
import { supabase } from '@/lib/supabase';
import { useUser } from '@/contexts/UserContext';

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
}

const StyledHeader = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: white;
  padding: 0;
`;

const NavbarContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  min-width: 280px;

  @media (max-width: 768px) {
    min-width: auto;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  gap: 16px;

  img {
    height: 40px;
    width: auto;
    object-fit: contain;
  }

  span {
    font-size: 16px;
    font-weight: 500;
    color: #111;
    white-space: nowrap;
    transition: all 0.2s ease;
    letter-spacing: -0.2px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  justify-content: center;
  flex: 1;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  color: ${props => props.$active ? '#111' : '#666'};
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 0;
  position: relative;

  &:hover {
    color: #111;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: #111;
    transform: scaleX(0);
    transition: transform 0.2s ease;
  }

  .anticon-down {
    font-size: 20px;
    transition: transform 0.2s ease;
    alignment: center;
    padding-top: 2.5px;
  }

  &:hover .anticon-down {
    transform: rotate(180deg);
  }

  &:hover::after,
  ${props => props.$active && `
    &::after {
      transform: scaleX(1);
    }
  `}
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 280px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AvatarButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  height: 32px;
  border: none;
  background: none;
  cursor: pointer;

  .ant-avatar {
    width: 24px;
    height: 24px;
    line-height: 24px;
    font-size: 14px;
  }

  span {
    font-size: 14px;
  }

  &:hover {
    background: #f8f9fa;
  }
`;

const AboutUsButton = styled(Button)`
  background: #000;
  color: white;
  border: none;
  height: 38px;
  padding: 0 24px;
  border-radius: 6px;
  font-weight: 500;

  &:hover {
    background: #333 !important;
    color: white !important;
  }
`;

const LoginButton = styled(Button)`
  background: white;
  color: #333;
  border: 1px solid #ddd;
  height: 38px;
  padding: 0 24px;
  border-radius: 6px;
  font-weight: 500;
  box-shadow: none;
  transition: all 0.2s ease;

  &:hover {
    background: white !important;
    color: #333 !important;
    border-color: #bbb !important;
  }
`;

const CreateAccountButton = styled(Button)`
  background: #0077b6;
  color: white;
  border: none;
  height: 38px;
  padding: 0 24px;
  border-radius: 6px;
  font-weight: 500;

  &:hover {
    background: #006ba6 !important;
    color: white !important;
  }
`;

const DropdownMenu = styled(Menu)`
  background: white;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
  min-width: 200px;

  .ant-dropdown-menu-item,
  .ant-menu-item {
    margin: 4px 0;
    padding: 8px 16px;
    border-radius: 6px;
    white-space: nowrap;
    font-size: 14px;
    color: #666;
    transition: all 0.2s ease;

    &:hover {
      background: #f8f9fa;
      color: #111;
    }

    a {
      color: inherit;
      text-decoration: none;
      display: block;
      width: 100%;
    }
  }

  .ant-menu-submenu-title {
    padding: 8px 16px;
    font-weight: 500;
  }

  .ant-menu-sub {
    padding: 4px;
    background: white;
    border-radius: 6px;
    min-width: 100%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  width: 32px;
  height: 32px;
  position: relative;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:focus {
    outline: none;
  }
`;

const MenuLine = styled.span<{ $isOpen: boolean }>`
  display: block;
  width: 24px;
  height: 2px;
  background: #333;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${props => props.$isOpen ? 'rotate(45deg)' : 'rotate(0)'};

  &::before,
  &::after {
    content: '';
    display: block;
    width: 24px;
    height: 2px;
    background: #333;
    position: absolute;
    left: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &::before {
    top: ${props => props.$isOpen ? '0' : '-8px'};
    transform: ${props => props.$isOpen ? 'rotate(90deg)' : 'rotate(0)'};
    opacity: ${props => props.$isOpen ? '1' : '1'};
  }

  &::after {
    bottom: ${props => props.$isOpen ? '0' : '-8px'};
    transform: ${props => props.$isOpen ? 'rotate(90deg)' : 'rotate(0)'};
    opacity: ${props => props.$isOpen ? '0' : '1'};
  }

  @media (hover: hover) {
    ${MobileMenuButton}:hover & {
      background: #666;
      &::before,
      &::after {
        background: #666;
      }
    }
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  padding: 20px;
  transform: translateX(${props => props.isOpen ? '0' : '100%'});
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  z-index: 999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MobileNavLink = styled(Link)<{ $active?: boolean }>`
  color: ${props => props.$active ? '#111' : '#666'};
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  padding: 12px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
  background: ${props => props.$active ? '#f8f9fa' : 'transparent'};

  &:hover {
    color: #111;
    background: #f8f9fa;
  }

  &:active {
    background: #f0f1f2;
  }
`;

const MobileMenuSection = styled.div`
  border-bottom: 1px solid #eee;
  padding-bottom: 12px;
  margin-bottom: 12px;
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const MobileMenuHeader = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  color: ${props => props.$active ? '#111' : '#666'};
  font-size: 15px;
  font-weight: 500;
  border-radius: 8px;
  background: ${props => props.$active ? '#f8f9fa' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #111;
    background: #f8f9fa;
  }

  &:active {
    background: #f0f1f2;
  }
`;

const MobileSubMenu = styled.div<{ isOpen?: boolean }>`
  margin: 4px 0 4px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  max-height: ${props => props.isOpen ? '1000px' : '0'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const MobileActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
  padding: 0 16px;
`;

const RotatingIcon = styled(DownOutlined)<{ $isOpen?: boolean }>`
  font-size: 12px;
  transition: transform 0.3s ease;
  transform: rotate(${props => props.$isOpen ? '180deg' : '0'});
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  background: #0077b6;
  
  &:hover {
    opacity: 0.9;
  }
`;

const UserPreview = styled.div`
  padding: 12px 16px;
  margin-bottom: 4px;

  .name {
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 2px;
  }

  .id {
    color: #1890ff;
    font-size: 13px;
    margin-bottom: 2px;
  }

  .email {
    color: #666;
    font-size: 13px;
  }
`;

const MenuItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f5;
    color: #1890ff;
  }

  .anticon {
    font-size: 16px;
  }
`;

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<string[]>([]);
  const { user, loading, signOut, isEmployee } = useUser();
  const [userProfile, setUserProfile] = useState<{ customer_id: string; full_name: string; email: string } | null>(null);

  useEffect(() => {
    async function fetchUserProfile() {
      if (user && !isEmployee) {
        const { data, error } = await supabase
          .from('customers')
          .select('customer_id, full_name, email')
          .eq('id', user.id)
          .single();

        if (!error && data) {
          setUserProfile(data);
        }
      }
    }

    fetchUserProfile();
  }, [user, isEmployee]);

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      // Reset all open submenus when closing the mobile menu
      setOpenSubMenus([]);
    }
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSubMenu = (key: string) => {
    setOpenSubMenus(prev => 
      prev.includes(key) 
        ? prev.filter(item => item !== key)
        : [...prev, key]
    );
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const cardItems: MenuProps['items'] = [
    {
      key: 'axis-bank',
      label: <Link to="/cards/axis-bank">Axis Bank Credit Cards</Link>,
    },
    {
      key: 'hdfc-bank',
      label: <Link to="/cards/hdfc-bank">HDFC Bank Credit Cards</Link>,
    },
    {
      key: 'icici-bank',
      label: <Link to="/cards/icici-bank">ICICI Bank Credit Cards</Link>,
    },
    {
      key: 'idfc-bank',
      label: <Link to="/cards/idfc-bank">IDFC Bank Credit Cards</Link>,
    },
    {
      key: 'indusind-bank',
      label: <Link to="/cards/indusind-bank">IndusInd Bank Credit Cards</Link>,
    },
  ];

  const loansMenu = {
    personal: [
      {
        key: 'personal-banking',
        label: <Link to="/personal-loan/banking-partners">Banking Partners</Link>,
      },
      {
        key: 'personal-nbfc',
        label: <Link to="/personal-loan/nbfc-partners">Non-Banking Financial Company Partners</Link>,
      },
      {
        key: 'personal-fintech',
        label: <Link to="/personal-loan/fintech-partners">Fintech Partners</Link>,
      },
    ],
    business: [
      {
        key: 'business-banking',
        label: <Link to="/business-loan/banking-partners">Banking Partners</Link>,
      },
      {
        key: 'business-nbfc',
        label: <Link to="/business-loan/nbfc-partners">Non-Banking Financial Company Partners</Link>,
      },
      {
        key: 'business-fintech',
        label: <Link to="/business-loan/fintech-partners">Fintech Partners</Link>,
      },
    ],
    lap: [
      {
        key: 'lap-banking',
        label: <Link to="/loan-against-property/banking-partners">Banking Partners</Link>,
      },
      {
        key: 'lap-nbfc',
        label: <Link to="/loan-against-property/nbfc-partners">Non-Banking Financial Company Partners</Link>,
      },
      {
        key: 'lap-fintech',
        label: <Link to="/loan-against-property/fintech-partners">Fintech Partners</Link>,
      },
    ],
    homeLoan: [
      {
        key: 'home-loan-banking',
        label: <Link to="/home-loan/banking-partners">Banking Partners</Link>,
      },
      {
        key: 'home-loan-nbfc',
        label: <Link to="/home-loan/nbfc-partners">Non-Banking Financial Company Partners</Link>,
      },
    ],
    goldLoan: [
      {
        key: 'gold-loan-banking',
        label: <Link to="/gold-loan/banking-partners">Banking Partners</Link>,
      },
    ],
  };

  const loansDropdownMenu = (
    <DropdownMenu>
      <Menu.SubMenu key="personal" title="Personal Loans">
        {loansMenu.personal.map(item => (
          <Menu.Item key={item.key}>{item.label}</Menu.Item>
        ))}
      </Menu.SubMenu>
      <Menu.SubMenu key="business" title="Business Loan">
        {loansMenu.business.map(item => (
          <Menu.Item key={item.key}>{item.label}</Menu.Item>
        ))}
      </Menu.SubMenu>
      <Menu.SubMenu key="lap" title="Loan Against Property">
        {loansMenu.lap.map(item => (
          <Menu.Item key={item.key}>{item.label}</Menu.Item>
        ))}
      </Menu.SubMenu>
      <Menu.SubMenu key="home-loan" title="Home Loan">
        {loansMenu.homeLoan.map(item => (
          <Menu.Item key={item.key}>{item.label}</Menu.Item>
        ))}
      </Menu.SubMenu>
      <Menu.SubMenu key="gold-loan" title="Gold Loan">
        {loansMenu.goldLoan.map(item => (
          <Menu.Item key={item.key}>{item.label}</Menu.Item>
        ))}
      </Menu.SubMenu>
    </DropdownMenu>
  );

  const insuranceItems = [
    {
      key: 'health',
      label: <Link to="/health-insurance">Health Insurance</Link>,
    },
    {
      key: 'life',
      label: <Link to="/life-insurance">Life Insurance</Link>,
    },
    {
      key: 'general',
      label: <Link to="/general-insurance">General Insurance</Link>,
    },
  ];

  const insuranceMenu = (
    <DropdownMenu>
      {insuranceItems.map(item => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
    </DropdownMenu>
  );

  const profileMenuItems = [
    // Add Dashboard option for employees
    ...(isEmployee ? [{
      key: '1',
      label: 'Dashboard',
      icon: <UserOutlined />,
      onClick: () => navigate('/EmployeeDashboard/EmployeeDashboard')
    }] : []),
    // Profile option for customers
    ...(!isEmployee ? [{
      key: '2', 
      label: 'Profile',
      icon: <UserOutlined />,
      onClick: () => navigate('/profile')
    }] : []),
    {
      key: '3',
      label: 'Sign Out',
      icon: <LogoutOutlined />,
      onClick: handleSignOut
    }
  ];

  return (
    <StyledHeader>
      <NavbarContainer>
        <LogoSection>
          <Link to="/" onClick={handleHomeClick}>
            <LogoContainer>
              <img src={ebsLogo} alt="EBS Finance" />
              <span>Everyday Banking Solutions</span>
            </LogoContainer>
          </Link>
        </LogoSection>

        <NavLinks>
          <NavLink to="/" onClick={handleHomeClick} $active={location.pathname === '/'}>Home</NavLink>
          <Dropdown overlay={<Menu items={cardItems} />} placement="bottom" trigger={['hover']}>
            <NavLink to="/credit-cards" $active={location.pathname.includes('credit-cards')}>Cards <DownOutlined style={{ fontSize: 8 }} /></NavLink>
          </Dropdown>
          <Dropdown overlay={loansDropdownMenu} trigger={['hover']} placement="bottom">
            <NavLink to="/loans" $active={location.pathname.includes('loan')}>Loans <DownOutlined style={{ fontSize: 8 }} /></NavLink>
          </Dropdown>
          <Dropdown overlay={insuranceMenu} trigger={['hover']} placement="bottom">
            <NavLink to="/insurance" $active={location.pathname.includes('insurance')}>Insurance <DownOutlined style={{ fontSize: 8 }} /></NavLink>
          </Dropdown>
          <NavLink to="/about-us" $active={location.pathname.includes('about-us')}>About Us</NavLink>
        </NavLinks>
        <ActionButtons>
          {!loading && (
            <>
              {user || isEmployee ? (
                <ProfileSection>
                  <Dropdown menu={{ items: profileMenuItems }} placement="bottomRight">
                    <AvatarButton>
                      <Avatar size="small" icon={<UserOutlined />} />
                      <span>{isEmployee ? 'Employee' : userProfile?.full_name || 'User'}</span>
                      <DownOutlined style={{ fontSize: '12px' }} />
                    </AvatarButton>
                  </Dropdown>
                </ProfileSection>
              ) : (
                <>
                  <Link to="/login">
                    <LoginButton>Login</LoginButton>
                  </Link>
                  <Link to="/login?signup=true">
                    <CreateAccountButton>Create Account</CreateAccountButton>
                  </Link>
                </>
              )}
            </>
          )}
        </ActionButtons>

        <MobileMenuButton 
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <MenuLine $isOpen={isMobileMenuOpen} />
        </MobileMenuButton>

        <MobileMenu isOpen={isMobileMenuOpen}>
          <MobileNavLinks>
            <MobileNavLink 
              to="/" 
              onClick={(e) => {
                handleHomeClick(e);
                setIsMobileMenuOpen(false);
              }} 
              $active={location.pathname === '/'}
            >
              Home
            </MobileNavLink>
            
            <MobileMenuSection>
              <MobileMenuHeader 
                onClick={() => toggleSubMenu('cards')} 
                $active={location.pathname.includes('credit-cards')}
              >
                <span>Cards</span>
                <RotatingIcon $isOpen={openSubMenus.includes('cards')} />
              </MobileMenuHeader>
              <MobileSubMenu isOpen={openSubMenus.includes('cards')}>
                {cardItems.map(item => (
                  <MobileNavLink 
                    key={item.key} 
                    to={`/cards/${item.key}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </MobileNavLink>
                ))}
              </MobileSubMenu>
            </MobileMenuSection>

            <MobileMenuSection>
              <MobileMenuHeader 
                onClick={() => toggleSubMenu('loans')} 
                $active={location.pathname.includes('loan')}
              >
                <span>Loans</span>
                <RotatingIcon $isOpen={openSubMenus.includes('loans')} />
              </MobileMenuHeader>
              <MobileSubMenu isOpen={openSubMenus.includes('loans')}>
                <MobileMenuSection>
                  <MobileMenuHeader onClick={() => toggleSubMenu('personal')}>
                    <span>Personal Loans</span>
                    <RotatingIcon $isOpen={openSubMenus.includes('personal')} />
                  </MobileMenuHeader>
                  <MobileSubMenu isOpen={openSubMenus.includes('personal')}>
                    {loansMenu.personal.map(item => (
                      <MobileNavLink 
                        key={item.key} 
                        to={item.key}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </MobileNavLink>
                    ))}
                  </MobileSubMenu>
                </MobileMenuSection>

                <MobileMenuSection>
                  <MobileMenuHeader onClick={() => toggleSubMenu('business')}>
                    <span>Business Loan</span>
                    <RotatingIcon $isOpen={openSubMenus.includes('business')} />
                  </MobileMenuHeader>
                  <MobileSubMenu isOpen={openSubMenus.includes('business')}>
                    {loansMenu.business.map(item => (
                      <MobileNavLink 
                        key={item.key} 
                        to={item.key}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </MobileNavLink>
                    ))}
                  </MobileSubMenu>
                </MobileMenuSection>

                <MobileMenuSection>
                  <MobileMenuHeader onClick={() => toggleSubMenu('lap')}>
                    <span>Loan Against Property</span>
                    <RotatingIcon $isOpen={openSubMenus.includes('lap')} />
                  </MobileMenuHeader>
                  <MobileSubMenu isOpen={openSubMenus.includes('lap')}>
                    {loansMenu.lap.map(item => (
                      <MobileNavLink 
                        key={item.key} 
                        to={item.key}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </MobileNavLink>
                    ))}
                  </MobileSubMenu>
                </MobileMenuSection>

                <MobileMenuSection>
                  <MobileMenuHeader onClick={() => toggleSubMenu('home-loan')}>
                    <span>Home Loan</span>
                    <RotatingIcon $isOpen={openSubMenus.includes('home-loan')} />
                  </MobileMenuHeader>
                  <MobileSubMenu isOpen={openSubMenus.includes('home-loan')}>
                    {loansMenu.homeLoan.map(item => (
                      <MobileNavLink 
                        key={item.key} 
                        to={item.key}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </MobileNavLink>
                    ))}
                  </MobileSubMenu>
                </MobileMenuSection>

                <MobileMenuSection>
                  <MobileMenuHeader onClick={() => toggleSubMenu('gold-loan')}>
                    <span>Gold Loan</span>
                    <RotatingIcon $isOpen={openSubMenus.includes('gold-loan')} />
                  </MobileMenuHeader>
                  <MobileSubMenu isOpen={openSubMenus.includes('gold-loan')}>
                    {loansMenu.goldLoan.map(item => (
                      <MobileNavLink 
                        key={item.key} 
                        to={item.key}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </MobileNavLink>
                    ))}
                  </MobileSubMenu>
                </MobileMenuSection>
              </MobileSubMenu>
            </MobileMenuSection>

            <MobileMenuSection>
              <MobileMenuHeader 
                onClick={() => toggleSubMenu('insurance')} 
                $active={location.pathname.includes('insurance')}
              >
                <span>Insurance</span>
                <RotatingIcon $isOpen={openSubMenus.includes('insurance')} />
              </MobileMenuHeader>
              <MobileSubMenu isOpen={openSubMenus.includes('insurance')}>
                <MobileNavLink 
                  to="/health-insurance"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Health Insurance
                </MobileNavLink>
                <MobileNavLink 
                  to="/life-insurance"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Life Insurance
                </MobileNavLink>
                <MobileNavLink 
                  to="/general-insurance"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  General Insurance
                </MobileNavLink>
              </MobileSubMenu>
            </MobileMenuSection>

            <MobileMenuSection>
              <MobileNavLink 
                to="/about-us"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </MobileNavLink>
            </MobileMenuSection>
          </MobileNavLinks>
          <MobileActionButtons>
            {!loading && (
              <>
                {user || isEmployee ? (
                  <>
                    <Button onClick={handleSignOut} style={{ width: '100%' }}>
                      <UserOutlined />
                      <span style={{ marginLeft: '8px' }}>Sign Out</span>
                    </Button>
                    <Link 
                      to={isEmployee ? '/EmployeeDashboard/EmployeeDashboard' : '/profile'} 
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button style={{ width: '100%' }}>Profile</Button>
                    </Link>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <LoginButton style={{ width: '100%' }}>Login</LoginButton>
                  </Link>
                )}
                <Link to="/about-us" onClick={() => setIsMobileMenuOpen(false)}>
                  <AboutUsButton style={{ width: '100%' }}>About Us</AboutUsButton>
                </Link>
              </>
            )}
          </MobileActionButtons>
        </MobileMenu>
      </NavbarContainer>
    </StyledHeader>
  );
};

export default Navbar;
