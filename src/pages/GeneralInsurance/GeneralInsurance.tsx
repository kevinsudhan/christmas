import React from 'react';
import styled from 'styled-components';
import HeroHeader from '../../components/HeroHeader/HeroHeader';

const Container = styled.div`
  padding-top: 70px;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  font-size: 1.8rem;
  color: #444;
  margin: 30px 0 20px;
`;

const Text = styled.p`
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const List = styled.ul`
  list-style-type: disc;
  margin-left: 20px;
  margin-bottom: 20px;
`;

const ListItem = styled.li`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 10px;
  line-height: 1.5;
`;

const GeneralInsurance: React.FC = () => {
  return (
    <Container>
      <HeroHeader
        title="General Insurance"
        subtitle="Protect Your Assets with Comprehensive Coverage"
        description="Secure your valuable assets with our comprehensive general insurance solutions. We offer various types of coverage to safeguard what matters most to you."
      />
      
      <Content>
        <Section>
          <Title>What is General Insurance?</Title>
          <Text>
            General insurance provides financial protection against losses and damages to assets like vehicles, 
            property, and other valuables. It covers a wide range of insurance needs except for life insurance.
          </Text>
        </Section>

        <Section>
          <Subtitle>Types of General Insurance We Offer</Subtitle>
          <List>
            <ListItem>
              <strong>Motor Insurance:</strong> Comprehensive coverage for your vehicles, including third-party liability
            </ListItem>
            <ListItem>
              <strong>Property Insurance:</strong> Protection for your home and commercial properties
            </ListItem>
            <ListItem>
              <strong>Travel Insurance:</strong> Coverage for domestic and international travel
            </ListItem>
            <ListItem>
              <strong>Marine Insurance:</strong> Protection for goods in transit and vessels
            </ListItem>
            <ListItem>
              <strong>Fire Insurance:</strong> Coverage against fire and related perils
            </ListItem>
          </List>
        </Section>

        <Section>
          <Subtitle>Why Choose Our General Insurance?</Subtitle>
          <List>
            <ListItem>Comprehensive coverage options tailored to your needs</ListItem>
            <ListItem>Quick and hassle-free claim settlement process</ListItem>
            <ListItem>24/7 customer support</ListItem>
            <ListItem>Competitive premium rates</ListItem>
            <ListItem>Wide network of cashless service providers</ListItem>
          </List>
        </Section>
      </Content>
    </Container>
  );
};

export default GeneralInsurance;
