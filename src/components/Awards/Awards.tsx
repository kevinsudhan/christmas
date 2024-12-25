import React, { useState, useEffect, useRef, TouchEvent } from 'react';
import styled from 'styled-components';
import goldenLaurel from '../../assets/images/golden laurel.png';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { gsap } from 'gsap';

const AwardsSection = styled.section`
  padding: 60px 0;
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0;
  position: relative;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: #333333;
  margin-bottom: 40px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, #0094d9, #0077b6);
  }

  @media(max-width: 968px){
    font-size: 22px;
  }
`;

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: hidden;
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 0;
  
  .cards {
    list-style: none;
    padding: 0;
    margin: 0;
    position: relative;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1000px;

    @media (max-width: 1100px) {
      height: 340px;
      overflow-x: hidden;
      touch-action: pan-x;
    }
  }
`;

const AwardCard = styled.div`
  background: #ffffff;
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 25px;
  width: 340px;
  height: 380px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 480px) {
    min-width: 300px;
    width: 300px;
    height: 340px;
    padding: 20px;
    box-shadow: none;
    border: 1px solid rgba(0, 0, 0, 0.08);
    backdrop-filter: none;

    &:hover {
      transform: none;
      box-shadow: none;
      border: 1px solid rgba(0, 0, 0, 0.08);
    }
  }
`;

const ImageContainer = styled.div`
  width: 160px;
  height: 160px;
  margin: 0 0 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.4s ease;
    filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15));
  }

  ${AwardCard}:hover & img {
    transform: scale(1.08) rotate(5deg);
  }

  @media (max-width: 480px) {
    width: 140px;
    height: 140px;
    margin: 0 0 12px;

    img {
      filter: none;
    }

    ${AwardCard}:hover & img {
      transform: none;
    }
  }
`;

const AwardTitle = styled.h3`
  font-size: 1.1rem;
  color: #1a1a1a;
  margin: 0 0 8px;
  font-weight: 700;
  line-height: 1.4;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex-shrink: 0;
  padding: 0 10px;
`;

const AwardDescription = styled.p`
  font-size: 0.9rem;
  color: #666666;
  line-height: 1.6;
  margin: 0;
  padding: 0 15px;
  flex-grow: 1;
  width: 100%;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 30px;
`;

const CarouselButton = styled.button<{ direction: 'left' | 'right' }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #1a1a1a;
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;

  &:hover {
    background: #333333;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    transform: scale(1.05);
  }

  svg {
    font-size: 20px;
    color: white;
  }

  @media (max-width: 1100px) {
    display: none;
  }
`;

const MobileIndicators = styled.div`
  display: none;
  justify-content: center;
  gap: 8px;
  margin-top: 50px;

  @media (max-width: 1100px) {
    display: flex;
  }
`;

const Indicator = styled.div<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.active ? '#1a1a1a' : '#cccccc'};
  transition: background 0.3s ease;
`;

const Awards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsRef = useRef<HTMLUListElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const isMobileView = window.innerWidth <= 1100;

  useEffect(() => {
    if (!cardsRef.current) return;
    
    const cards = gsap.utils.toArray<HTMLLIElement>('.cards li');
    gsap.set(cards, { xPercent: 400, opacity: 0, scale: 0.5, rotateY: 45, zIndex: -1 });

    // Show initial cards
    updateCardsVisibility(currentIndex);

    const handleResize = () => {
      const newIsMobileView = window.innerWidth <= 1100;
      if (newIsMobileView !== isMobileView) {
        window.location.reload();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const updateCardsVisibility = (index: number, direction: 'left' | 'right' | null = null) => {
    if (!cardsRef.current) return;
    setIsAnimating(true);

    const cards = gsap.utils.toArray<HTMLLIElement>('.cards li');
    const timeline = gsap.timeline({
      onComplete: () => setIsAnimating(false),
      defaults: {
        duration: 0.5,
        ease: "power2.inOut"
      }
    });

    if (window.innerWidth <= 1100) {
      // Mobile animation
      timeline.set(cards, { zIndex: 1 });
      
      // First, set initial positions for all cards
      cards.forEach((card, i) => {
        const position = (i - index + awards.length) % awards.length;
        if (direction) {
          const initialX = direction === 'left' ? 100 : -100;
          if (position === 0) {
            timeline.set(card, {
              xPercent: initialX,
              opacity: 0,
              scale: 0.8,
              rotateY: direction === 'left' ? 15 : -15,
              zIndex: 2
            });
          } else {
            timeline.set(card, {
              xPercent: position * 100,
              opacity: position === 1 ? 0.5 : 0,
              scale: 0.8,
              rotateY: 0,
              zIndex: 1
            });
          }
        }
      });

      // Then animate all cards to their new positions
      cards.forEach((card, i) => {
        const position = (i - index + awards.length) % awards.length;
        
        if (position === 0) {
          // Animate the active card
          timeline.to(card, {
            xPercent: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            zIndex: 2,
            duration: 0.4,
            ease: "power2.out"
          }, direction ? 0.1 : 0);
        } else {
          // Animate other cards
          timeline.to(card, {
            xPercent: position * 100,
            opacity: Math.abs(position) === 1 ? 0.5 : 0,
            scale: 0.8,
            rotateY: 0,
            zIndex: 1,
            duration: 0.4
          }, direction ? 0.1 : 0);
        }

        // Handle the card that's moving out
        if (direction) {
          const outgoingPosition = direction === 'left' ? -1 : 1;
          if ((position + (direction === 'left' ? 1 : -1) + awards.length) % awards.length === 0) {
            timeline.to(card, {
              xPercent: direction === 'left' ? -100 : 100,
              opacity: 0,
              scale: 0.8,
              rotateY: direction === 'left' ? -15 : 15,
              duration: 0.4,
              ease: "power2.in"
            }, 0);
          }
        }
      });
    } else {
      // Desktop animation (unchanged)
      timeline.set(cards, { zIndex: -1 }, 0);
      cards.forEach((card, i) => {
        const position = (i - index + awards.length) % awards.length;
        
        if (position >= 0 && position <= 2) {
          const rotation = position === 1 ? 0 : position === 0 ? -25 : 25;
          const xOffset = position === 1 ? 0 : position === 0 ? -100 : 100;
          const scale = position === 1 ? 1 : 0.8;
          
          timeline.to(card, {
            xPercent: xOffset,
            opacity: position === 1 ? 1 : 0.7,
            scale: scale,
            rotateY: rotation,
            zIndex: position === 1 ? 2 : 1,
            ease: "power3.out",
            immediateRender: false
          }, 0);

          if (position === 1) {
            timeline.to(card, {
              scale: 1.05,
              duration: 0.2,
              ease: "elastic.out(1, 0.5)"
            }, 0.3).to(card, {
              scale: 1,
              duration: 0.2,
              ease: "power2.inOut"
            }, 0.5);
          }
        } else {
          const isLeft = position < 0;
          timeline.set(card, {
            opacity: 0,
            immediateRender: true
          }, 0);
          timeline.to(card, {
            xPercent: isLeft ? -400 : 400,
            scale: 0.5,
            rotateY: isLeft ? -45 : 45,
            zIndex: -1,
            immediateRender: false
          }, 0);
        }
      });
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && !isAnimating) {
      handleNextClick();
    }

    if (isRightSwipe && !isAnimating) {
      handlePrevClick();
    }
  };

  const handlePrevClick = () => {
    if (isAnimating) return;
    const newIndex = (currentIndex - 1 + awards.length) % awards.length;
    setCurrentIndex(newIndex);
    updateCardsVisibility(newIndex, 'right');
  };

  const handleNextClick = () => {
    if (isAnimating) return;
    const newIndex = (currentIndex + 1) % awards.length;
    setCurrentIndex(newIndex);
    updateCardsVisibility(newIndex, 'left');
  };

  const awards = [
    {
      title: "Silver Jubilee Contribution",
      description: "25 Years of Dedication and Service to HDFC Bank"
    },
    {
      title: "Certificate of Appreciation",
      description: "Recognizing Excellence in Q1 FY 2022-2023 - Axis Finance"
    },
    {
      title: "Certificate of Appreciation",
      description: "Exceptional Contribution to Personal Loan Services in 2023 - Bandhan Bank"
    },
    {
      title: "Valued Partnership Recognition",
      description: "Significant Contribution in the Credit Card Category - Standard Chartered"
    },
    {
      title: "Exemplary Support Award",
      description: "Outstanding Contribution to Personal Loan Business in FY 23-24 - IndusInd Bank"
    },
    {
      title: "Growth Contribution Token",
      description: "In Recognition of Key Role in Incred's Success"
    },
    {
      title: "Highest Disbursement Achievement",
      description: "300 Crores in Personal Loans Disbursed from Chennai DSA Vertical - HDFC Bank"
    },
    {
      title: "Contribution Recognition",
      description: "Appreciation for Outstanding Support in Personal Loans - Yes Bank"
    },
    {
      title: "Unwavering Support Award",
      description: "In Acknowledgment of Contributions in FY 2023-24 - IDFC Bank"
    },
    {
      title: "Excellence in Loan Services",
      description: "Awarded for Outstanding Performance in Ask Loans - ICICI Bank"
    },
    {
      title: "Certificate of Excellence",
      description: "Heroes of South for Contribution to Home Loan Business in Q1 2024, Awarded by HDFC Bank"
    },
    {
      title: "Gratitude Certificate",
      description: "Recognizing Steadfast Support to Incred Finance in FY 2023-24"
    },
    {
      title: "Certificate of Appreciation",
      description: "Recognizing Excellence in GST Practices from Government of India, Ministry of Finance"
    },
    {
      title: "Outstanding Performance Award",
      description: "Recognizing Exceptional Results in FY 2023-24 - Tata Capital"
    },
    {
      title: "Gratitude Certificate",
      description: "In Appreciation of Valuable Contribution to SME Business in FY 2023-24 for Ask Loans- Bajaj Finance"
    },
    {
      title: "Strategic Partnership Recognition",
      description: "Acknowledging Key Partnership and Collaboration with Chola"
    }
  ];

  return (
    <AwardsSection>
      <Container>
        <Title>Our Achievements</Title>
        <CarouselContainer>
          <CarouselWrapper>
            <ul 
              className="cards" 
              ref={cardsRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {awards.map((award, index) => (
                <li key={index}>
                  <AwardCard>
                    <ImageContainer>
                      <img src={goldenLaurel} alt="Award Trophy" />
                    </ImageContainer>
                    <AwardTitle>{award.title}</AwardTitle>
                    <AwardDescription>{award.description}</AwardDescription>
                  </AwardCard>
                </li>
              ))}
            </ul>
            <ButtonContainer>
              <CarouselButton direction="left" onClick={handlePrevClick}>
                <LeftOutlined />
              </CarouselButton>
              <CarouselButton direction="right" onClick={handleNextClick}>
                <RightOutlined />
              </CarouselButton>
            </ButtonContainer>
            <MobileIndicators>
              {awards.map((_, index) => (
                <Indicator key={index} active={index === currentIndex} />
              ))}
            </MobileIndicators>
          </CarouselWrapper>
        </CarouselContainer>
      </Container>
    </AwardsSection>
  );
};

export default Awards;
