import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #0077b6 0%, #023e8a 100%);
  color: #ffffff;
  padding: 4rem 0 2rem;
  position: relative;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: #ffffff;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: color 0.2s ease;
    font-size: 0.9rem;

    &:hover {
      color: #ffffff;
    }
  }
`;

const ContactInfo = styled.div`
  p {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.5;

    svg {
      margin-top: 0.25rem;
      flex-shrink: 0;
    }
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 2rem 0;
`;

const Copyright = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
`;

const Footer = (): React.ReactElement => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <h3>Loans</h3>
            <ul>
              <li><Link to="/personal-loan">Personal Loan</Link></li>
              <li><Link to="/business-loan">Business Loan</Link></li>
              <li><Link to="/home-loan">Home Loan</Link></li>
              <li><Link to="/gold-loan">Gold Loan</Link></li>
              <li><Link to="/loan-against-property">Loan Against Property</Link></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Insurance</h3>
            <ul>
              <li><Link to="/life-insurance">Life Insurance</Link></li>
              <li><Link to="/health-insurance">Health Insurance</Link></li>
              <li><Link to="/general-insurance">General Insurance</Link></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/cards">Cards</Link></li>
              <li><Link to="/employee-login">Employee Login</Link></li>
              <li><Link to="/apply">Apply Now</Link></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Contact</h3>
            <ContactInfo>
              <p>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                No. B1 2nd floor, 3rd Cross Street,<br />
                Minor Trustpuram, Choolaimedu,<br />
                Chennai-600094
              </p>
              <p>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                +91 9841002005
              </p>
              <p>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                info@ebsgroup.co.in
              </p>
            </ContactInfo>
          </FooterSection>
        </FooterGrid>

        <Divider />
        <Copyright>
          {new Date().getFullYear()} EBS. All rights reserved.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
