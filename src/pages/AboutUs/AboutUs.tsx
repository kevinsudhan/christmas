import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Typography, Row, Col, Card, Timeline } from 'antd';
import { CheckCircleFilled, TeamOutlined, TrophyOutlined, GlobalOutlined } from '@ant-design/icons';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

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

  @media (max-width: 768px) {
    margin-top: -50px;
    padding: 4rem 1.5rem;
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

const StyledTimeline = styled(Timeline)`
  .ant-timeline-item-tail {
    border-left: 2px solid rgba(26, 54, 93, 0.2);
  }
  
  .ant-timeline-item-head {
    background: #1a365d;
    border-color: #1a365d;
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
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
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
          <Title level={2} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            Our Journey
          </Title>
          <StyledTimeline mode="alternate">
            {[/* eslint-disable @typescript-eslint/no-unused-vars */
              { year: "1995", event: "Founded as EBS Financial Services" },
              { year: "2000", event: "Expanded operations to 10 major cities" },
              { year: "2010", event: "Launched digital banking services" },
              { year: "2015", event: "Achieved 1 million customer milestone" },
              { year: "2020", event: "Introduced AI-powered financial advisory" },
              { year: "Present", event: "Serving millions of customers with innovative financial solutions" }
            ].map((milestone, index) => (
              <Timeline.Item key={index}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Title level={4}>{milestone.year}</Title>
                  <Paragraph>{milestone.event}</Paragraph>
                </motion.div>
              </Timeline.Item>
            ))/* eslint-enable @typescript-eslint/no-unused-vars */}
          </StyledTimeline>
        </MilestoneSection>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
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
      </ContentSection>
    </PageWrapper>
  );
};

export default AboutUs;
