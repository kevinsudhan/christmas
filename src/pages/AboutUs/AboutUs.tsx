import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Typography, Row, Col, Card, Timeline } from 'antd';
import { CheckCircleFilled, TeamOutlined, TrophyOutlined, GlobalOutlined } from '@ant-design/icons';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import BranchNetwork from './BranchNetwork';
import Footer from '../../components/Footer/Footer';

const { Title, Paragraph } = Typography;

const PageWrapper = styled.div`
  overflow-x: hidden;
  background-color: #ffffff;
  height: 100%;
  position: relative;
`;

const ParallaxSection = styled.div`
  position: relative;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a365d 0%, #023e8a 100%);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%);
    z-index: 1;
  }
`;

const ParallaxContent = styled(motion.div)`
  text-align: center;
  color: white;
  z-index: 2;
  max-width: 800px;
  padding: 0 20px;

  h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    margin-bottom: 1.5rem;
    background: linear-gradient(to right, #ffffff, #e0e0e0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1.2;
    letter-spacing: -0.02em;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  p {
    font-size: clamp(1.1rem, 2vw, 1.5rem);
    line-height: 1.6;
    opacity: 0.9;
    margin: 0 auto;
    max-width: 600px;
    transition: all 0.3s ease;

    &:hover {
      opacity: 1;
      text-shadow: 0 0 10px rgba(255,255,255,0.5);
    }
  }

  .hero-stats {
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin-top: 3rem;

    .stat {
      text-align: center;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-10px);
        .number {
          text-shadow: 0 0 20px rgba(255,255,255,0.8);
        }
      }

      .number {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        background: linear-gradient(to right, #ffffff, #e0e0e0);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        transition: all 0.3s ease;
      }

      .label {
        font-size: 1rem;
        opacity: 0.8;
        transition: all 0.3s ease;
      }
    }
  }
`;

const ParallaxBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 80%);
`;

const ContentSection = styled(motion.div)`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  background: white;
  border-radius: 30px;
  margin-top: -100px;
  box-shadow: 0 -20px 60px rgba(0,0,0,0.1);
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    margin-top: -50px;
    padding: 4rem 1.5rem;
    margin-bottom: 3rem;
  }

  @media (max-width: 480px) {
    margin-top: -30px;
    padding: 3rem 1rem;
    margin-bottom: 2rem;
  }
`;

const StyledCard = styled(motion(Card))`
  height: 100%;
  border-radius: 16px;
  border: none;
  background: white;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  overflow: hidden;
`;

const ValueCard = styled(motion(Card))`
  margin-bottom: 1rem;
  background: #f8fafc;
  border: none;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  overflow: hidden;
  
  .ant-card-body {
    padding: 2rem;
  }
`;

const MilestoneSection = styled(motion.div)`
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  padding: 4rem 2rem;
  border-radius: 30px;
  margin: 4rem 0;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
`;

const TimelineSection = styled.section`
  padding: 6rem 2rem;
  background: #f8f9fa;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 20%;
    bottom: 20%;
    left: 50%;
    width: 1px;
    background: #e0e0e0;
    transform: translateX(-50%);
  }
  
  .timeline-title {
    text-align: center;
    margin-bottom: 6rem;
    color: #1a1a1a;
    position: relative;
    z-index: 2;
  }

  .timeline-container {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
  }
`;

const TimelineItem = styled(motion.div)<{ isEven: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 6rem;
  align-items: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #1a1a1a;
    z-index: 2;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: ${props => props.isEven ? 'auto' : '50%'};
    right: ${props => props.isEven ? '50%' : 'auto'};
    width: 2rem;
    height: 1px;
    background: #e0e0e0;
  }
  
  ${props => props.isEven && `
    direction: rtl;
  `}

  .content {
    direction: ltr;
    padding: ${props => props.isEven ? '0 0 0 2rem' : '0 2rem 0 0'};
    text-align: ${props => props.isEven ? 'right' : 'left'};
  }

  .year {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #1a1a1a;
  }

  .description {
    font-size: 1rem;
    line-height: 1.6;
    color: #666;
  }

  .image-container {
    position: relative;
    width: 100%;
    height: 280px;
    background: #e5e7eb;
    border-radius: 4px;
    overflow: hidden;
    direction: ltr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    direction: ltr;

    &::after {
      left: 0;
    }

    &::before {
      left: 0;
      width: 2rem;
      right: auto;
    }

    .content {
      padding: 0 0 0 3rem;
      text-align: left;
    }

    .image-container {
      height: 200px;
    }
  }
`;

const FloatingIcon = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 20px;
  background: linear-gradient(135deg, #1a365d 0%, #2a4365 100%);
  color: white;
  margin-bottom: 1.5rem;
`;

const FounderSection = styled.section`
  padding: 4rem 2rem;  
  background: #ffffff;
  position: relative;
`;

const FounderCard = styled(motion.div)`
  max-width: 1000px;  
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  position: relative;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageSection = styled.div`
  position: relative;
  height: 100%;
  min-height: 500px;  
  background: #1a365d;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  color: white;
  z-index: 1;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);

  h2 {
    color: white;
    font-size: 3rem;
    margin: 0;
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  }

  h3 {
    color: rgba(255,255,255,0.9);
    font-size: 1.5rem;
    margin: 0.5rem 0 0 0;
    font-weight: 500;
    text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
  }
`;

const FounderContentSection = styled.div`
  padding: 2.5rem;  
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Quote = styled.div`
  font-size: 1.3rem;  
  color: #1a365d;
  font-style: italic;
  margin-bottom: 1.5rem;  
  position: relative;
  line-height: 1.6;
`;

const BioText = styled(motion.p)`
  font-size: 1rem;  
  line-height: 1.7;
  color: #4a5568;
  margin-bottom: 1.5rem;
`;

const AchievementGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
`;

const AchievementCard = styled(motion.div)`
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: #1a365d;
    color: white;

    .achievement-number {
      color: white;
      
    }

    .achievement-label {
      color: rgba(255,255,255,0.9);
      
    }
  }

  .achievement-number {
    font-size: 2rem;
    font-weight: 700;
    color: #1a365d;
    margin-bottom: 0.5rem;
  }

  .achievement-label {
    font-size: 0.9rem;
    color: #4a5568;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const LeadershipSection = styled(motion.section)`
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  border-radius: 30px;
  margin: 4rem 0;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
`;

const LeadershipGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  margin: 4rem auto;
  max-width: 1200px;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const LeaderCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  max-width: 550px;
  margin: 0 auto;
  width: 100%;

  &:hover {
    transform: translateY(-5px);
  }
`;

const LeaderImageSection = styled.div`
  position: relative;
  height: 400px;
  overflow: hidden;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
    background: linear-gradient(to bottom, #ffffff 0%, #f8fafc 100%);
    padding: 20px;
  }

  &:hover img {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const LeaderInfo = styled.div`
  padding: 2.5rem;
  text-align: center;
  background: white;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 90%;
  margin: 0 auto;

  h3 {
    color: #1a365d;
    font-size: 1.75rem;
    margin-bottom: 0.75rem;
    font-weight: 600;
  }

  h4 {
    color: #4a5568;
    font-size: 1.1rem;
    margin-bottom: 2rem;
    font-weight: 500;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -1rem;
      left: 50%;
      transform: translateX(-50%);
      width: 50px;
      height: 2px;
      background: #e2e8f0;
    }
  }

  p {
    color: #718096;
    font-size: 1rem;
    line-height: 1.8;
    margin: 0 auto;
    max-width: 95%;
    text-align: justify;
    hyphens: auto;
    word-spacing: -0.05em;
  }
`;

const LeaderSocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;

  a {
    color: #4a5568;
    transition: color 0.2s ease;

    &:hover {
      color: #1a365d;
    }
  }
`;

const ParticleField = () => {
  const count = 1000;
  const particlesRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const [positions] = React.useState(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  });

  useFrame((state) => {
    if (!particlesRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      particlesRef.current.geometry.attributes.position.array[i3] += Math.sin(time + i) * 0.001;
      particlesRef.current.geometry.attributes.position.array[i3 + 1] += Math.cos(time + i) * 0.001;
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.rotation.y = mouse.x * 0.1;
    particlesRef.current.rotation.x = -mouse.y * 0.1;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const ThreeBackground = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <ParticleField />
    </Canvas>
  );
};

const AboutUs: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });

  const heroVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <PageWrapper>
      <ParallaxSection ref={parallaxRef}>
        <ThreeBackground />
        <ParallaxContent
          initial="hidden"
          animate="visible"
          variants={heroVariants}
        >
          <motion.h1 variants={itemVariants}>
            Empowering Financial Futures
          </motion.h1>
          <motion.p variants={itemVariants}>
            Building Trust Through Financial Excellence Since 1995
          </motion.p>
          <motion.div 
            className="hero-stats"
            variants={itemVariants}
          >
            <div className="stat">
              <div className="number">19+</div>
              <div className="label">Years of Excellence</div>
            </div>
            <div className="stat">
              <div className="number">1M+</div>
              <div className="label">Happy Customers</div>
            </div>
            <div className="stat">
              <div className="number">50+</div>
              <div className="label">Cities Served</div>
            </div>
          </motion.div>
        </ParallaxContent>
      </ParallaxSection>

      <ContentSection
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Mission and Vision */}
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible" 
          style={{ marginBottom: '4rem', width: '100%' }}
        >
          <Row gutter={[24, 24]} style={{ marginBottom: '4rem' }}>
            <Col xs={24} md={12}>
              <StyledCard variants={cardVariants} whileHover={{ y: -10, transition: { duration: 0.3 } }}>
                <FloatingIcon
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <TeamOutlined style={{ fontSize: '2rem' }} />
                </FloatingIcon>
                <Title level={3}>Our Mission</Title>
                <Paragraph>
                  Our mission is to help people feel confident about their financial future and security.
                </Paragraph>
              </StyledCard>
            </Col>
            <Col xs={24} md={12}>
              <StyledCard variants={cardVariants} whileHover={{ y: -10, transition: { duration: 0.3 } }}>
                <FloatingIcon
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <GlobalOutlined style={{ fontSize: '2rem' }} />
                </FloatingIcon>
                <Title level={3}>Our Vision</Title>
                <Paragraph>
                  To be the most respected and referred Banking solutions company
                </Paragraph>
              </StyledCard>
            </Col>
          </Row>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Title level={2} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            Our Core Values
          </Title>
          <Row gutter={[24, 24]} style={{ marginBottom: '4rem' }}>
            {[/* eslint-disable @typescript-eslint/no-unused-vars */
              {
                icon: <TeamOutlined />,
                title: "Integrity",
                description: "We act with honesty and uphold strong moral principles in every decision."
              },
              {
                icon: <TrophyOutlined />,
                title: "Quality",
                description: "We deliver excellence through unmatched attention to detail and standards."
              },
              {
                icon: <GlobalOutlined />,
                title: "Teamwork",
                description: "We achieve more together by fostering collaboration and mutual respect."
              },
              {
                icon: <GlobalOutlined />,
                title: "Speed",
                description: "We work with agility to provide swift and effective solutions."
              }

            ].map((value, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <ValueCard
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <FloatingIcon
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
                  >
                    {value.icon}
                  </FloatingIcon>
                  <Title level={4}>{value.title}</Title>
                  <Paragraph>{value.description}</Paragraph>
                </ValueCard>
              </Col>
            ))/* eslint-enable @typescript-eslint/no-unused-vars */}
          </Row>
        </motion.div>

        {/* Milestones */}
        <MilestoneSection
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >

          <TimelineSection>
            <Title level={2} className="timeline-title">Our Journey</Title>
            <div className="timeline-container">
              {[
                {
                  year: "2005",
                  description: "Founded with a vision to revolutionize banking.",
                  image: "/images/WhatsApp Image 2025-01-07 at 10.43.37 PM.jpeg"
                },
                {
                  year: "2009",
                  description: "Expanded to multibanking and multistate operations; achieved ₹100M turnover.",
                  image: "/images/WhatsApp Image 2025-01-07 at 10.48.27 PM.jpeg"
                },
                {
                  year: "2015",
                  description: "Crossed ₹250M turnover, cementing industry leadership.",
                  image: "/images/WhatsApp Image 2025-01-07 at 10.50.35 PM (1).jpeg"
                },
                {
                  year: "2023",
                  description: "Surpassed ₹500M turnover with over 100 branches nationwide.",
                  image: "/images/WhatsApp Image 2025-01-07 at 10.50.35 PM.jpeg"
                }
              ].map((item, index) => (
                <TimelineItem
                  key={index}
                  isEven={index % 2 === 1}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="image-container">
                    <img 
                      src={item.image} 
                      alt={`${item.year} - ${item.description}`}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        opacity: 0.9
                      }} 
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.backgroundColor = '#e5e7eb';
                      }}
                    />
                  </div>
                  <div className="content">
                    <div className="year">{item.year}</div>
                    <div className="description">{item.description}</div>
                  </div>
                </TimelineItem>
              ))}
            </div>
          </TimelineSection>
        </MilestoneSection>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '5rem' }}
        >

          <Title level={2} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            Why Choose EBS Financial
          </Title>
          <Row gutter={[24, 24]}>
            {[/* eslint-disable @typescript-eslint/no-unused-vars */
              {
                title: "19+ Years of Experience",
                description: "Trusted by millions of customers with their financial needs for over two decades."
              },
              {
                title: "Customer-Centric Approach",
                description: "Tailored financial solutions designed around your unique needs and goals."
              },
              {
                title: "Digital Innovation",
                description: "Cutting-edge technology for seamless and secure financial services."
              }
            ].map((feature, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <StyledCard
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <FloatingIcon
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
                  >
                    <CheckCircleFilled style={{ fontSize: '2rem' }} />
                  </FloatingIcon>
                  <Title level={4}>{feature.title}</Title>
                  <Paragraph>{feature.description}</Paragraph>
                </StyledCard>
              </Col>
            ))/* eslint-enable @typescript-eslint/no-unused-vars */}
          </Row>
        </motion.div>
      

        {/* Founder Section */}
        <FounderSection>
          <FounderCard
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <ImageSection>
              <img src="/images/sivakumr.jpeg" alt="A A Sivakumar - Managing Director" />
              <ImageOverlay>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h2>A A Sivakumar</h2>
                  <h3>Managing Director</h3>
                </motion.div>
              </ImageOverlay>
            </ImageSection>

            <FounderContentSection>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Quote>
                  "Transforming India's Retail Banking landscape through innovation and excellence"
                </Quote>

                <BioText
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  A. A. Sivakumar, a distinguished postgraduate in Business Management from Madras University, brings over three decades of rich expertise in the retail banking and insurance sectors. Throughout his illustrious career, he has held pivotal roles in renowned institutions such as Bank of America, ANZ Grindlays Bank, Standard Chartered Bank, and Aviva Life Insurance Company. His journey has been defined by transformative leadership, innovative solutions, and a relentless pursuit of excellence.
                </BioText>

                <BioText
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  As a visionary leader, Sivakumar has played an instrumental role in revolutionizing the retail banking channel partner business in India. He has fostered a culture that prioritizes integrity, customer-centricity, and operational excellence, driving significant business growth and enhancing the customer experience. His strategic insights and ability to navigate complex business landscapes have solidified his reputation as a trailblazer in the industry.
                </BioText>

                <AchievementGrid>
                  <AchievementCard
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="achievement-number">30+</div>
                    <div className="achievement-label">Years of Experience</div>
                  </AchievementCard>
                  <AchievementCard
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="achievement-number">100+</div>
                    <div className="achievement-label">Branches Nationwide</div>
                  </AchievementCard>
                  <AchievementCard
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="achievement-number">₹500M+</div>
                    <div className="achievement-label">Annual Turnover</div>
                  </AchievementCard>
                </AchievementGrid>
              </motion.div>
            </FounderContentSection>
          </FounderCard>
        </FounderSection>

        {/* Leadership Team Section */}
        <LeadershipSection
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Title level={2} style={{ textAlign: 'center', marginBottom: '1rem' }}>
            Leadership Team
          </Title>
          <Paragraph style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem' }}>
            Meet our exceptional leaders who drive innovation and excellence across our organization
          </Paragraph>

          <LeadershipGrid>
            <LeaderCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <LeaderImageSection>
                <img src="/images/sunil.jpeg" alt="Sunil - Senior Banking Professional" />
              </LeaderImageSection>
              <LeaderInfo>
                <h3>Sunil</h3>
                <h4>Senior Banking Professional</h4>
                <p>
                  A seasoned banking professional with extensive experience at prestigious institutions including Bank of America, ABN AMRO, ANZ Grindlays, and Standard Chartered Bank. Expert in liability sales, wealth management, life insurance, and health insurance. Former Sales Manager at Max NewYork Life Insurance, bringing comprehensive financial services expertise to our team.
                </p>
              </LeaderInfo>
            </LeaderCard>

            <LeaderCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <LeaderImageSection>
                <img src="/images/senthil.jpeg" alt="S. Senthil Kumar - Head of Sales Operations" />
              </LeaderImageSection>
              <LeaderInfo>
                <h3>S. Senthil Kumar</h3>
                <h4>Head of Sales Operations</h4>
                <p>
                  With over 32 years of industry experience, Senthil Kumar is a distinguished leader in sales and business development. Currently serving at Fullerton India Credit Company Ltd, he has consistently achieved sales excellence and built high-performing teams. His expertise spans personal loans, retail assets, and channel partner management, with notable achievements at HDFC Bank and ICICI Bank.
                </p>
              </LeaderInfo>
            </LeaderCard>
          </LeadershipGrid>
        </LeadershipSection>

        {/* Branch Network Section */}
        <BranchNetwork />
    
      </ContentSection>
     
      <Footer />
    </PageWrapper>
    
  );
};

export default AboutUs;
