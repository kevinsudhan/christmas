import React from 'react';
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const MetricsCard = styled.div`
  background: white;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.1),
    0 20px 60px rgba(0, 119, 182, 0.1),
    0 0 120px rgba(2, 62, 138, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 10px;
    border-radius: 16px;
    box-shadow: 
      0 8px 20px rgba(0, 0, 0, 0.08),
      0 15px 40px rgba(0, 119, 182, 0.08),
      0 0 80px rgba(2, 62, 138, 0.08);
  }

  &:hover {
    box-shadow: 
      0 15px 40px rgba(0, 0, 0, 0.15),
      0 25px 70px rgba(0, 119, 182, 0.15),
      0 0 140px rgba(2, 62, 138, 0.15);
    transform: translateY(-5px);

    @media (max-width: 768px) {
      transform: translateY(-3px);
    }
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  position: relative;
  z-index: 1;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
`;

const MetricItem = styled.div`
  text-align: center;
  padding: 15px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 150px;
  
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0;
    top: 20%;
    height: 60%;
    width: 1px;
    background: linear-gradient(135deg, #0077b6 0%, #023e8a 100%);
  }
  
  @media (max-width: 768px) {
    min-height: 70px;
    padding: 8px 4px;
    
    &:not(:last-child)::after {
      top: 15%;
      height: 70%;
      width: 1px;
    }
  }
`;

const MetricNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #0077b6 0%, #023e8a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 15px;
  text-shadow: none;
  text-align: center;
  width: 100%;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 4px;
  }
`;

const MetricTitle = styled.div`
  font-size: 1rem;
  background: linear-gradient(135deg, #0077b6 0%, #023e8a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 0.7rem;
    letter-spacing: 0.5px;
    line-height: 1.2;
  }
`;

const Metrics: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <MetricsCard ref={ref}>
      <MetricsGrid>
        <MetricItem>
          <MetricNumber>
            {inView && (
              <CountUp
                start={0}
                end={60}
                duration={2.5}
                suffix="+"
              />
            )}
          </MetricNumber>
          <MetricTitle>Cities</MetricTitle>
        </MetricItem>
        <MetricItem>
          <MetricNumber>
            {inView && (
              <CountUp
                start={0}
                end={50}
                duration={2.5}
                suffix="+"
              />
            )}
          </MetricNumber>
          <MetricTitle>Partners</MetricTitle>
        </MetricItem>
        <MetricItem>
          <MetricNumber>
            {inView && (
              <CountUp
                start={0}
                end={1000}
                duration={2.5}
                suffix="Cr+"
              />
            )}
          </MetricNumber>
          <MetricTitle>Loans{'\n'}Disbursed</MetricTitle>
        </MetricItem>
      </MetricsGrid>
    </MetricsCard>
  );
};

export default Metrics;