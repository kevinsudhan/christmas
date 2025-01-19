import React, { useState, useEffect, useRef, TouchEvent } from 'react';
import styled from 'styled-components';
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
  letter-spacing: 1px;
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
  justify-content: center;
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
  width: 280px;
  height: 280px;
  margin: 0 0 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.4s ease;
  }

  ${AwardCard}:hover & img {
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    width: 240px;
    height: 240px;
    margin: 0 0 12px;

    ${AwardCard}:hover & img {
      transform: none;
    }
  }
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

  // Generate array of award images (1.png to 23.png)
  const awards = Array.from({ length: 23 }, (_, i) => ({
    id: i + 1,
    image: `/images/awards/${i + 1}.png`,
  }));

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

        if (position === 0) {
          timeline.to(card, {
            xPercent: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            zIndex: 2
          }, direction ? 0.1 : 0);
        } else {
          timeline.to(card, {
            xPercent: position * 100,
            opacity: Math.abs(position) === 1 ? 0.5 : 0,
            scale: 0.8,
            rotateY: 0,
            zIndex: 1
          }, direction ? 0.1 : 0);
        }
      });
    } else {
      // Desktop animation
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
          timeline.set(card, {
            opacity: 0,
            immediateRender: true
          }, 0);
          timeline.to(card, {
            xPercent: position < 0 ? -400 : 400,
            scale: 0.5,
            rotateY: position < 0 ? -45 : 45,
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

  return (
    <AwardsSection>
      <Container>
        <Title>Appreciation & Excellence</Title>
        <CarouselContainer>
          <CarouselWrapper>
            <ul 
              className="cards" 
              ref={cardsRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {awards.map((award) => (
                <li key={award.id}>
                  <AwardCard>
                    <ImageContainer>
                      <img 
                        src={award.image} 
                        alt={`Award ${award.id}`}
                        loading="lazy"
                      />
                    </ImageContainer>
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
