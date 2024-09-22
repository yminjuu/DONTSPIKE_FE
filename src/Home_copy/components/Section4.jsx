import { React, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Btn from '../assets/Section4/NavBtn.svg?react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Vec1 from '../assets/background/backVector2.png';
import SeniorPrev from '../assets/Section4/SeniorPrev.png';
import SeniorAfter from '../assets/Section4/SeniorAfter.png';
import ChangeIcn from '../assets/Section4/DifferenceIcn.svg?react';

gsap.registerPlugin(ScrollTrigger); // ScrollTrigger Trigger 호출

const SubWrapper = styled.div`
  height: 80vh;
  background-color: #f0f1f5;

  @media (max-width: 768px) {
    height: auto;
    box-sizing: border-box;
    padding: 2rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
`;

const TextWrapper = styled.div`
  width: 100%;
  height: 25vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  @media (max-width: 768px) {
    box-sizing: border-box;
    padding: 1rem;
  }
`;

const BigText = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: #414141;

  display: flex;
  flex-direction: row;
  z-index: 2;
`;
const SmallText = styled.div`
  font-size: 1.5rem;
  font-weight: 400;
  color: #707070;
`;

const SeniorDiv = styled.div`
  position: relative;
  width: 11rem;
  display: flex;
  justify-content: center;
`;

const SeniorDivText = styled(BigText)`
  color: #3053f9;
  z-index: 2;
`;

const SeniorDivLine = styled.div`
  position: absolute;
  top: 70%;
  left: 12%;
  width: 9rem;
  height: 1rem;
  background-color: #d6ddfe;

  z-index: 1;

  @media (max-width: 768px) {
    visibility: hidden;
  }
`;

const ImgsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ImgWrapper = styled.img`
  object-fit: cover;
  width: 45%;
`;

const BGVector = styled.img`
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  position: absolute; // Wrapper에 대해 절대적인 위치로 설정
  top: 0%;
  z-index: 0; // 가장 하위에 위치하도록
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1rem;
  align-items: center;

  background-color: transparent;
  z-index: 1;
`;

const Text = styled.div`
  width: 18.75rem;
  height: 1.25rem;
  flex-shrink: 0;

  color: #111111;

  font-size: 1.375rem;
  font-weight: 400;
`;

const ImgBtn = styled.div`
  width: 21.875rem;
  height: 5rem;
  flex-shrink: 0;
  cursor: pointer;
`;

const Section4 = () => {
  const wrapperRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: 'top 100%',
        end: 'bottom 60%',
        toggleActions: 'play none restart none',
      },
    });

    tl.from(wrapperRef.current, {
      opacity: 0,
      y: +100,
      duration: 1.3,
    });
  }, []);

  return (
    <>
      <SubWrapper>
        <TextWrapper>
          <BigText>
            “5070 세대를 위한{' '}
            <SeniorDiv>
              {' '}
              <SeniorDivText>시니어모드</SeniorDivText> <SeniorDivLine />
            </SeniorDiv>{' '}
            지원”
          </BigText>
          <SmallText>혈당 관리가 필요한 다양한 연령층을 고려해 일반 모드와 큰글씨모드를 지원합니다.</SmallText>
        </TextWrapper>
        <ImgsWrapper>
          <ImgWrapper src={SeniorPrev} />
          <ChangeIcn />
          <ImgWrapper src={SeniorAfter} />
        </ImgsWrapper>
      </SubWrapper>
      <Wrapper>
        <BGVector src={Vec1}></BGVector>
        <MainWrapper ref={wrapperRef}>
          <Text>혈당 스파이크를 방지할 작은 시작,</Text>
          <ImgBtn
            onClick={() => {
              navigate('/main', { replace: 'true' });
            }}
          >
            <Btn></Btn>
          </ImgBtn>
        </MainWrapper>
      </Wrapper>
    </>
  );
};

export default Section4;
