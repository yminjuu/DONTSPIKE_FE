import { React, useEffect } from 'react';
import styled, { css } from 'styled-components';
import LogoButton from '../../common/components/LogoButton';
import mainperson1 from '../assets/Section1_1/MainPerson1.png';
import mainperson2 from '../assets/Section1_1/MainPerson2.png';
import gsap from 'gsap';
import Vec1 from '../assets/background/backVector1.png';
import Imac from '../assets/Section1_1/Imac.png';
import Logo from '../assets/Section1_1/Logo.png';
import BookIcon from '../assets/Section1_2/Book.svg?react';
import GraphIcon from '../assets/Section1_2/Graph.svg?react';
import { SlLogin } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';

const Section1 = () => {
  const navigate = useNavigate();
  useEffect(() => {
    gsap.fromTo('.person1', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 });
    gsap.fromTo('.person2', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.8 });
    gsap.fromTo('.graph', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1.5 });
    gsap.fromTo('.book', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1.8 });
  }, []);

  return (
    <Wrapper>
      <BGVector src={Vec1}></BGVector>
      <ContentWrapper>
        <MainContent1>
          <MainHeader>
            <LogoButton></LogoButton>
            <LoginWrapper
              onClick={() => {
                navigate('/login', { replace: true });
              }}
            >
              <SlLogin></SlLogin>
              <div style={{ color: '#111111', fontWeight: '500', fontSize: '1rem' }}>로그인</div>
            </LoginWrapper>
          </MainHeader>
          <Content1_1Wrap>
            <MacWrap>
              <MacImg1 src={Imac}></MacImg1>
            </MacWrap>
            <MainWrap>
              <MainText>혈당 스파이크를 방지할 작은 시작,</MainText>
              <LogoWrap src={Logo} />
            </MainWrap>
          </Content1_1Wrap>
          <Content1_2Wrap>
            <Person1 className="person1">
              <PersonImg src={mainperson1}></PersonImg>
              <PersonContent direction="left">
                제 <PersonSpan>혈당 변화를 한눈에</PersonSpan> 볼 수 있고, 상황이 여의치 않을 경우 식단 정보를 바탕으로
                한 <PersonSpan>예상 혈당</PersonSpan>을 제공받을 수 있는 플랫폼이 있으면 좋겠어요.
              </PersonContent>
            </Person1>
            <Person2 className="person2">
              <PersonContent direction="right">
                잊어버리지 않게 지난번에 <PersonSpan>먹은 음식이 기록</PersonSpan>되고, 음식과 혈당의 관계를 분석해서{' '}
                <PersonSpan>효율적이고 건강하게 혈당을 관리</PersonSpan>하고 싶어요.
              </PersonContent>
              <PersonImg src={mainperson2}></PersonImg>
            </Person2>
          </Content1_2Wrap>
          <Footer>
            DON’T 스파이크는 당뇨병 환자들을 위한 맞춤형 정보제공 및 데이터 시각화를 통해 올바른 당뇨 관리를 돕는
            서비스입니다.
          </Footer>
        </MainContent1>
        <MainContent2>
          <Content2_Wrap>
            <Content2_1Wrap>
              <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>주기적인 혈당 체크가 필요한 당신에게,</div>
              <div style={{ fontSize: '1rem', fontWeight: '500', color: '#5975FA' }}>
                혈당 기록을 간편하게, 데이터는 한눈에
              </div>
            </Content2_1Wrap>
            <Content2_2Wrap>
              <GraphWrap className="graph">
                <GraphIcon></GraphIcon>
                <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111111' }}>
                  혈당 그래프 시각화, 맞춤형 분석
                </div>
                <div
                  style={{
                    width: '18rem',
                    fontSize: '0.875rem',
                    fontWeight: '400',
                    color: '#707070',
                    textAlign: 'center',
                    lineHeight: '1rem',
                  }}
                >
                  매일 입력된 혈당 수치를 기반으로 <br></br>그래프 시각화와 예상 혈당 수치를 알려드릴게요.
                </div>
              </GraphWrap>
              <BookWrap className="book">
                <BookIcon></BookIcon>
                <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111111' }}>혈당 백과</div>
                <div
                  style={{
                    width: '17rem',
                    fontSize: '0.875rem',
                    fontWeight: '400',
                    color: '#707070',
                    textAlign: 'center',
                    lineHeight: '1rem',
                    wordBreak: 'keep-all',
                  }}
                >
                  궁금한 음식을 검색해보세요! <br />
                  Open AI가 제공하는 음식 데이터를 기반으로 다양한 영양 정보와 함께 섭취 팁도 알려드릴게요.
                </div>
              </BookWrap>
            </Content2_2Wrap>
          </Content2_Wrap>
        </MainContent2>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 200vh; // Adjust the total height
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;

const BGVector = styled.img`
  width: 100%;
  position: absolute;
  top: 30%;
  z-index: 0;
`;

const ContentWrapper = styled.div`
  width: 100%;
  z-index: 1;
`;

const MainHeader = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid #cfcfcf;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  padding: 0.5rem 2rem;
  cursor: pointer;
`;

const MainContent1 = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Content1_1Wrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const Content1_2Wrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  gap: 1rem;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 0 5rem;
  }
`;

const Footer = styled.footer`
  width: 100%;
  height: 5vh;
  color: #707070;
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 5vh;
  text-align: center;
`;

const MacWrap = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 5rem;
  @media (min-width: 768px) {
    margin: 5rem;
  }
`;

const MacImg1 = styled.img`
  width: 80%;
  max-width: 30.8715rem;
  object-fit: cover;
`;

const MainWrap = styled.div`
  width: 80%;
  max-width: 40rem;
  padding: 2rem;
  text-align: center;
  @media (min-width: 768px) {
    text-align: left;
  }
`;

const MainText = styled.div`
  color: #414141;
  font-size: 1.5rem;
  font-weight: 600;
`;

const LogoWrap = styled.img`
  width: 80%;
  max-width: 24.5rem;
`;

const Person1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const Person2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  @media (min-width: 768px) {
    flex-direction: row-reverse;
    align-items: flex-start;
  }
`;

const PersonImg = styled.img`
  width: 4.8rem;
  height: 7.6rem;

  @media (max-width: 768px) {
    width: 0;
    height: 0;
  }
`;

const PersonContent = styled.div`
  width: 80%;
  max-width: 28rem;
  padding: 1.75rem;
  text-align: center;
  background-color: #ffffff;
  ${props =>
    props.direction === 'left'
      ? css`
          border-radius: 3.75rem 3.75rem 3.75rem 0rem;
        `
      : css`
          border-radius: 3.75rem 3.75rem 0rem 3.75rem;
        `}
  box-shadow: 2px 4px 10px 2px #e8e8e8;
  color: #111111;
  font-size: 0.9rem;
  font-weight: 450;
  word-spacing: 0.05rem;
  word-break: keep-all;
  line-height: 1.2rem;
`;

const PersonSpan = styled.span`
  color: #3053f9;
`;

const MainContent2 = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Content2_Wrap = styled.div`
  width: 100%;
  max-width: 56.75rem;
  height: 100%;
  max-height: 39.25rem;
  border-radius: 0.625rem;
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  flex-direction: column;
`;

const Content2_1Wrap = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const Content2_2Wrap = styled.div`
  width: 100%;
  flex: 2;
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const GraphWrap = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  @media (min-width: 768px) {
    height: 100%;
  }
`;

const BookWrap = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  @media (min-width: 768px) {
    height: 100%;
  }
`;

export default Section1;
