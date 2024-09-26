import { React, useState, useEffect } from 'react';
import LogoButton from '../../common/components/LogoButton';
import styled from 'styled-components';
import { MdArrowBackIos } from 'react-icons/md';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';
import LoginBackVec from '../assets/LoginPageVec.png';
import SmallLogo from '../assets/SmallLogo.svg?react';

const LoginPage = () => {
  const [id, setId] = useState('블로킹');
  const [pw, setPw] = useState('1234');

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  const onNaverLogin = async () => {
    window.location.href = `${BASE_URL}/oauth2/authorization/naver`;
  };

  const onGoogleLogin = async () => {
    window.location.href = `${BASE_URL}/oauth2/authorization/google`;
  };

  return (
    <Wrapper>
      <LoginPageVecWrap src={LoginBackVec} />
      <MainHeader>
        <LogoButton type="loginPage"></LogoButton>
        {/* type을 주어 로그인하지 않고 main으로 이동하지 않도록 방지 */}
      </MainHeader>
      {/* 뒤로가기 버튼 헤더 */}
      <BackWrapper>
        <MdArrowBackIos
          style={{
            cursor: 'pointer',
            strokeWidth: 0,
            height: '1.5rem',
            width: '1.5rem',
          }}
          onClick={() => {
            navigate('/');
          }}
        />
      </BackWrapper>
      {/* 텍스트 Wrapper */}
      <MainWrapper>
        <TextWrapper>
          <div style={{ color: '#111111', fontSize: '1.875rem', fontWeight: '600' }}>로그인</div>
          <div style={{ color: '#707070', fontSize: '1.175rem', fontWeight: '400' }}>
            소셜 계정을 통해 간편하게 로그인하세요.
          </div>
        </TextWrapper>
        {/* 로그인 창 */}
        <LoginWrapper>
          <LoginTextWrapper>
            {' '}
            <div style={{ fontWeight: '400', fontSize: '1rem', color: '#414141' }}>
              혈당 스파이크를 방지할 작은 시작,
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', alignItems: 'center' }}>
              {' '}
              <SmallLogo />
              <div style={{ fontWeight: '600', fontSize: '1.5rem' }}>돈스파이크와 함께하세요.</div>
            </div>
          </LoginTextWrapper>

          <ButtonsWrapper>
            <LoginBtnsWrapper>
              {' '}
              <LoginBtn src="/assets/NaverLogin.png" onClick={onNaverLogin} />
              <LoginBtn src="assets/GoogleLogin.png" onClick={onGoogleLogin} />
            </LoginBtnsWrapper>
            {/* 카카오 로그인 버튼 */}
          </ButtonsWrapper>
        </LoginWrapper>
      </MainWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
`;

const LoginPageVecWrap = styled.img`
  object-fit: cover;
  position: absolute;
  z-index: 0;

  height: 100vh;
  width: 100vw;
`;

const MainWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  z-index: 1;
`;
const BackWrapper = styled.div`
  width: calc(100% - 2rem);
  margin-left: 2rem;
  margin-top: 1rem;
  height: 3.5vh;
  display: flex;
  justify-content: left;

  z-index: 1;
`;

const MainHeader = styled.div`
  width: 100%;
  height: 8vh;

  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;

  /* // 헤더의 border */
  border-bottom: 1px solid #cfcfcf;
  z-index: 1;
`;

const TextWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const LoginWrapper = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  min-width: 28rem;
  width: 30vw;
  flex-shrink: 0;

  background-color: #ffffff;
  border-radius: 0.8rem;
  border: 1px solid #e8e8e8;

  position: relative;
  top: 0%;
  z-index: 2;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 4rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
`;

const LoginTextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LoginBtnsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LoginBtn = styled.img`
  width: 24rem;
  height: 3rem;
  object-fit: cover;
  cursor: pointer;
`;

export default LoginPage;
