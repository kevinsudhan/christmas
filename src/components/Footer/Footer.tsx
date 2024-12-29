import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #0077b6 0%, #023e8a 100%);
  color: #ffffff;
  padding: 80px 0 40px;
  position: relative;
  overflow: hidden;

  /* Media Queries */
  @media (max-width: 968px) {
    padding: 60px 0 30px;
  }

  @media (max-width: 480px) {
    padding: 40px 0 20px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;

  /* Media Queries */
  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  margin-bottom: 60px;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    margin-bottom: 40px;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 24px;
    margin-bottom: 30px;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: #ffffff;
    font-size: 1.5rem;
    margin-bottom: 20px;
    font-weight: 600;

    @media (max-width: 968px) {
      font-size: 1.3rem;
      margin-bottom: 16px;
    }

    @media (max-width: 480px) {
      font-size: 1.2rem;
      margin-bottom: 12px;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 12px;

    @media (max-width: 480px) {
      margin-bottom: 10px;
    }
  }

  a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 1rem;
    display: inline-block;
    position: relative;

    @media (max-width: 480px) {
      font-size: 0.95rem;
    }

    &:hover {
      color: #ffffff;
      transform: translateX(5px);
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 1px;
      background: #ffffff;
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }
`;

const ContactInfo = styled.div`
  p {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 12px;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 8px;

    @media (max-width: 480px) {
      font-size: 0.95rem;
      margin-bottom: 10px;
    }

    svg {
      font-size: 1.2rem;
      color: #ffffff;
    }
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 40px 0;

  @media (max-width: 968px) {
    margin: 30px 0;
  }

  @media (max-width: 480px) {
    margin: 20px 0;
  }
`;

const Copyright = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  padding: 0 20px;

  @media (max-width: 480px) {
    font-size: 0.85rem;
    line-height: 1.5;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <h3>About Us</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/employee-login">Employee Login</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Products</h3>
            <ul>
              <li><Link to="/personal-loans">Personal Loans</Link></li>
              <li><Link to="/business-loans">Business Loans</Link></li>
              <li><Link to="/home-loans">Home Loans</Link></li>
              <li><Link to="/education-loans">Education Loans</Link></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Support</h3>
            <ul>
              <li><Link to="/faqs">FAQs</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/help">Help Center</Link></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Contact Us</h3>
            <ContactInfo>
              <p>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                1800-123-4567
              </p>
              <p>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                support@ebs.com
              </p>
              <p>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                Mon-Sat: 9:00 AM - 6:00 PM
              </p>
            </ContactInfo>
          </FooterSection>
        </FooterGrid>

        <Divider />
        <Copyright>
          2024 EBS. All rights reserved.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
