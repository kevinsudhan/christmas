import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const CombinedSection = styled.section`
  background: linear-gradient(135deg, #0077b6 0%, #023e8a 100%);
  color: #ffffff;
  position: relative;
  overflow: hidden;

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

const PartnersSection = styled.div`
  padding: 120px 0 80px;
  position: relative;
`;

const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
  position: relative;
  overflow: hidden;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 3rem;
  color: #ffffff;
  margin-bottom: 80px;
  font-weight: 600;
  position: relative;

  @media(max-width: 968px){
    font-size: 35px;
  }
`;

const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const LogoContainer = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
  width: 100%;
  padding: 0 40px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 300px;
    height: 100%;
    z-index: 2;
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, rgba(0, 119, 182, 1), rgba(0, 119, 182, 0));

    @media (max-width: 768px) {
      width: 100px;
      opacity: 0;
    }
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, rgba(0, 119, 182, 1), rgba(0, 119, 182, 0));

    @media (max-width: 768px) {
      width: 100px;
      opacity: 0;
    }
  }
`;

const LogoTrack = styled.div`
  display: flex;
  animation: ${scroll} 60s linear infinite;
  gap: 40px;
  padding: 30px 0;
  width: fit-content;

  &:hover {
    animation-play-state: paused;
  }
`;

const LogoCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.6);
  width: 260px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  flex-shrink: 0;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  }

  img {
    max-width: 85%;
    max-height: 85%;
    object-fit: contain;
  }
`;

// Footer Styles
const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  margin-bottom: 60px;

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
    margin-bottom: 20px;
    font-weight: 600;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 12px;
  }

  a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: color 0.3s ease;
    font-size: 1rem;

    &:hover {
      color: #ffffff;
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
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 40px 0;
`;

const Copyright = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  padding-bottom: 40px;
`;

const Partners: React.FC = () => {
  const partners = [
    'aditya.png', 'au.jpg', 'axis.jpg.png', 'chola.png', 'cs.png',
    'csb.png', 'dbs.jpg', 'eq.png', 'federal.png', 'gc.jpg',
    'hdfc.jpg', 'hero.png', 'icici.jpg', 'idfc.jpg', 'in.png',
    'inb.png', 'indusind.png', 'kotak.jpg', 'sc.jpg', 'sri.png',
    'yes.png'
  ];

  const quadruplePartners = [...partners, ...partners, ...partners, ...partners];

  return (
    <CombinedSection>
      <PartnersSection>
        <Container>
          <Title>Our Partners</Title>
          <LogoContainer>
            <LogoTrack>
              {quadruplePartners.map((logo, index) => (
                <LogoCard key={`${logo}-${index}`}>
                  <img
                    src={`/images/partners/${logo}`}
                    alt={`Partner ${logo.split('.')[0]}`}
                    loading="lazy"
                  />
                </LogoCard>
              ))}
            </LogoTrack>
          </LogoContainer>
        </Container>
      </PartnersSection>

      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
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
    </CombinedSection>
  );
};

export default Partners;
