import { React, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Icon from '../assets/Section4/Icon.svg?react';
import Btn from '../assets/Section4/NavBtn.svg?react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Vec1 from '../assets/background/backVector2.png';

gsap.registerPlugin(ScrollTrigger); // ScrollTrigger Trigger 호출

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
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
  flex-direction: row;
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
  font-weight: 600;
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

    tl.from(wrapperRef.current, { opacity: 0, y: +100, duration: 1.3 });
  }, []);

  return (
    <Wrapper>
      <BGVector src={Vec1}></BGVector>
      <MainWrapper ref={wrapperRef}>
        <Icon></Icon>
        <Text>혈당 스파이크를 방지할 작은 시작,</Text>
        <ImgBtn
          onClick={() => {
            navigate(`/main`, { replace: 'true' });
          }}
        >
          <Btn></Btn>
        </ImgBtn>
      </MainWrapper>
    </Wrapper>
  );
};

export default Section4;
