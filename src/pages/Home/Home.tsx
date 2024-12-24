import React from 'react';
import styled from 'styled-components';
import Hero from '../../components/Hero/Hero';
import Services from '../../components/Services/Services';
import Awards from '../../components/Awards/Awards';
import Partners from '../../components/Partners/Partners';
import Metrics from '../../components/Metrics/Metrics';

const HomeContainer = styled.div`
  position: relative;
`;

const MetricsWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 1200px;
  z-index: 10;
  margin-top: -150px;

  @media (max-width: 768px) {
    width: calc(100% - 32px);
    margin-top: -100px;
  }
`;

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <Hero />
      <MetricsWrapper>
        <Metrics />
      </MetricsWrapper>
      <Services />
      <Awards />
      <Partners />
    </HomeContainer>
  );
};

export default Home;