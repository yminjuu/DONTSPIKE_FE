import { React, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import gsap from 'gsap';
import SmallLogo from '../assets/Section1_1/SmallLogo.png';
import BigLogo from '../assets/Section1_1/BigLogo.png';
import BookIcon from '../assets/Section1_2/Book.svg?react';
import GraphIcon from '../assets/Section1_2/Graph.svg?react';
import { SlLogin } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import MainBack from '../assets/Section1_1/MainBack.png';
import BackVec2 from '../assets/Section1_1/BackVec2.png';
import MainIcon from '../assets/Section1_1/MainIcon.png';
import ScrollDown from '../assets/Section1_1/ScrollDown.png';

const Section1 = () => {
  const navigate = useNavigate();
  useEffect(() => {
    gsap.fromTo('.graph', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1.5 });
    gsap.fromTo('.book', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1.8 });
  }, []);

  return (
    <Wrapper>
      <BGVector src={MainBack}></BGVector>
      <ContentWrapper>
        {/* 첫번째 100vh */}
        <MainContent1>
          <MainHeader>
            <SmallLogoWrap src={SmallLogo}></SmallLogoWrap>
            <LoginWrapper
              onClick={() => {
                navigate('/login', { replace: true });
              }}
            >
              <SlLogin color="#111"></SlLogin>
              <div style={{ color: '#111', fontWeight: '500', fontSize: '1rem' }}>로그인</div>
            </LoginWrapper>
          </MainHeader>
          <Content1_1Wrap>
            <HeaderWrap>
              <HeaderText>혈당 / 식단 기록</HeaderText>
              <HeaderText>데이터 시각화 / 맞춤형 분석</HeaderText>
              <HeaderText>혈당백과</HeaderText>
            </HeaderWrap>
            <Content1_1MainWrap>
              <IconWrap src={MainIcon}></IconWrap>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111', marginTop: '1rem' }}>
                주기적인 혈당 체크가 필요한 당신에게,{' '}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: '400', color: '#5975FA', marginTop: '1rem' }}>
                혈당 기록을 간편하게, 데이터는 한눈에
              </div>
            </Content1_1MainWrap>
            <FooterWrap>
              <LogoWrap>
                <BigLogoWrap src={BigLogo} />
                <ScrollDownWrap src={ScrollDown}></ScrollDownWrap>
              </LogoWrap>
            </FooterWrap>
          </Content1_1Wrap>
        </MainContent1>
        {/* 두번째 100vh */}
        <MainContent2>
          {' '}
          <BackVec2Wrap src={BackVec2}></BackVec2Wrap>
          <Content2_Wrap>
            <Content2_1Wrap>
              <Content2_1TextWrap>
                <div style={{ color: '#111', fontSize: '1.5rem', fontWeight: '600' }}>
                  맞춤형 혈당 관리 서비스, 왜 필요할까요?
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <Content2_1SmallText>
                    어떤 음식을 먹었을 때 혈당이 가장 많이 올라가는지 아시나요? 같은 음식이라도 사람마다 혈당을 올리는
                    정도가 다르다고 합니다.
                  </Content2_1SmallText>
                  <Content2_1SmallText>
                    DON’T 스파이크는 기록된 혈당 변화를 한눈에 볼 수 있도록 하고 다양한 음식에 대한 혈당 관련 정보를
                    제공해 줌으로서 스스로 혈당 / 식단 관리를 하도록 돕습니다.{' '}
                  </Content2_1SmallText>
                </div>
              </Content2_1TextWrap>
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
  top: 0%;
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
  border-bottom: 1px solid #cfcfcf;
`;

const SmallLogoWrap = styled.img`
  object-fit: cover;
  width: 5rem;

  padding: 1rem;
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
  justify-content: flex-start;
`;

const Content1_1Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
  }
`;

const HeaderWrap = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 1rem 10%;
`;

const HeaderText = styled.div`
  border-bottom: 1px solid #cfcfcf;
  font-size: 1.2rem;
  font-weight: 500;

  padding: 0.8rem;
`;

const Content1_1MainWrap = styled.div`
  width: 100%;
  height: 65vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IconWrap = styled.img`
  object-fit: cover;
  width: 15%;
`;

const FooterWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1rem;
`;

const BigLogoWrap = styled.img`
  object-fit: cover;
  height: 2.2rem;
`;

const flash = keyframes`
  0%{
    margin: 0;
     opacity: 1;
  }
  50% {
    margin-top: 1rem;
    opacity: 0.5;
  }
  100%{
    margin: 0;
    opacity: 1;
  }
`;

const ScrollDownWrap = styled.img`
  object-fit: cover;
  height: 2rem;

  animation: ${flash} 4s linear infinite;
`;

const MainContent2 = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
`;

const Content2_Wrap = styled.div`
  width: 100%;
  height: 100%;
  min-height: 30rem;
  border-radius: 0.625rem;
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  padding: 2rem;
  box-sizing: border-box;
`;

const BackVec2Wrap = styled.img`
  position: absolute;
  object-fit: cover;
  width: 100vw;
  top: 0;
`;

const Content2_1Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 3rem;
  margin-bottom: 3rem;
`;

const Content2_1TextWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1.5rem;
`;

const Content2_1SmallText = styled.div`
  color: #292929;
  font-size: 1rem;
  font-weight: 0;
  width: 100%;
  text-align: center;
`;

const Content2_2Wrap = styled.div`
  display: flex;
  flex-direction: row;
  height: auto;
  gap: 5rem;
  flex: 1;
  box-sizing: border-box;
  padding: 2rem 10rem;
  @media (min-width: 768px) {
  }
`;

const GraphWrap = styled.div`
  background-color: rgb(255, 255, 255);
  width: 50%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  box-shadow: 1px 2px 2px 1px rgba(151, 151, 151, 0.5);
  @media (min-width: 768px) {
  }
`;

const BookWrap = styled.div`
  background-color: #fff;
  width: 50%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  box-shadow: 1px 2px 2px 1px rgba(151, 151, 151, 0.5);
  @media (min-width: 768px) {
  }
`;

export default Section1;
