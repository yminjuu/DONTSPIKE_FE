import { React, useState, useEffect } from 'react';
import IconImg from '../assets/health.png';
import LogoButton from '../../common/components/LogoButton';
import styled from 'styled-components';
import { MdArrowBackIos } from 'react-icons/md';
import '../styles/login.css';
import ActiveBtn from '../assets/active.png';
import DefaultBtn from '../assets/default.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userState } from '../../Recoil';
import KakaoBtn from '../assets/kakao.svg?react';

const LoginPage = () => {
  const [id, setId] = useState('블로킹');
  const [pw, setPw] = useState('1234');

  const [user, setUser] = useRecoilState(userState);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  const fetchLoginData = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/login`, {
        username: id,
        password: pw,
      });
      setUser(res.data.user_id);
      navigate(`/main`, { replace: true });
    } catch (error) {
      alert('로그인에 실패했습니다. 다시 시도해주세요');
      setId('');
      setPw('');
    }
  };

  const checkValidJoin = () => {
    if (id && pw) {
      fetchLoginData();
    } else {
      if (!id) {
        alert('ID를 입력하세요');
        return;
      }
      if (!pw) alert('비밀번호를 입력하세요');
    }
  };

  return (
    <Wrapper>
      <MainHeader>
        <LogoButton type="loginPage"></LogoButton>
        {/* type을 주어 로그인하지 않고 main으로 이동하지 않도록 방지 */}
      </MainHeader>
      {/* 뒤로가기 버튼 헤더 */}
      <BackWrapper>
        <MdArrowBackIos
          style={{
            cursor: 'pointer',
            stroke: '#D6DDFE',
            fill: '#D6DDFE',
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
      <TextWrapper>
        <div style={{ color: '#FFFFFF', fontSize: '1.875rem', fontWeight: '600' }}>
          이름과 비밀번호를 입력하면 로그인이 완료됩니다.{' '}
        </div>
        <div style={{ color: '#D6DDFE', fontSize: '1.175rem', fontWeight: '400' }}>
          돈스파이크 에서 더욱 스마트한 혈당 관리를 시작해보세요.{' '}
        </div>
      </TextWrapper>
      {/* 로그인 창 */}
      <Icon src={IconImg}></Icon>
      <LoginWrapper>
        <LoginText>로그인</LoginText>
        <InputsWrapper>
          <InputWrapper>
            <InputTitle>이름</InputTitle>
            <StyledInput
              name="id"
              value={id}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  checkValidJoin();
                }
              }}
              onChange={e => {
                setId(e.target.value);
              }}
              type="text"
            ></StyledInput>
          </InputWrapper>
          <InputWrapper>
            <InputTitle>비밀번호</InputTitle>
            <StyledInput
              value={pw}
              onChange={e => {
                setPw(e.target.value);
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  checkValidJoin();
                }
              }}
              type="password"
            ></StyledInput>
          </InputWrapper>
        </InputsWrapper>
        <ButtonsWrapper>
          <ButtonWrapper>
            {id == '' || pw == '' ? (
              <GeneralBtn>로그인</GeneralBtn>
            ) : (
              <GeneralBtn onClick={checkValidJoin}>로그인</GeneralBtn>
            )}
          </ButtonWrapper>
          <Hr />
          <Button onClick={() => alert('준비 중인 서비스입니다.')}>
            <KakaoBtn></KakaoBtn>
          </Button>
          {/* 카카오 로그인 버튼 */}
          <JoinWrapper>
            <div
              style={{
                color: '#A0A0A0',
                fontSize: '0.75rem',
                fontWeight: '400',
                textAlign: 'center',
                height: '1.2rem',
                lineHeight: '1.2rem',
              }}
            >
              계정이 없으신가요?{' '}
            </div>
            <TransparentBtn
              onClick={() => {
                navigate('/join');
              }}
            >
              가입하기
            </TransparentBtn>
          </JoinWrapper>
        </ButtonsWrapper>
      </LoginWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to bottom, #4c62ca 50%, #f0f1f5 50%);

  position: relative;
`;

const BackWrapper = styled.div`
  width: calc(100% - 2rem);
  margin-left: 2rem;
  margin-top: 1rem;
  height: 3.5vh;
  display: flex;
  justify-content: left;
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
`;

const TextWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Icon = styled.img`
  width: 7.6875rem;
  height: 9.0625rem;

  position: relative;
  top: 5%;
  right: 10%;
  z-index: 3;
`;

const LoginWrapper = styled.div`
  min-width: 28rem;
  width: 30vw;
  height: 55vh;
  flex-shrink: 0;

  background-color: #ffffff;
  border-radius: 0.8rem;
  box-shadow: -3px 3px 20px rgba(0, 0, 0, 0.1);

  position: relative;
  top: 0%;
  z-index: 2;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const JoinWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
`;

const LoginText = styled.div`
  width: 100%;
  height: 10vh;

  color: #111111;
  font-size: 1.6rem;
  font-weight: 600;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const InputTitle = styled.div`
  width: 5rem;
  height: 3.125rem;
  color: #111111;

  font-size: 1rem;
  font-weight: 600;

  text-align: center;
  line-height: 3.125rem;
`;

const StyledInput = styled.input`
  border: none;
  outline: none;

  width: 16.875rem;
  height: 3.125rem;

  color: #111111;
  font-size: 0.9rem;
  font-weight: 500;

  text-align: center;
  vertical-align: middle;

  background-color: transparent;
  border: 1px solid #cfcfcf;
  border-radius: 1.8rem;

  &::placeholder {
    font-size: 0.8rem;
    font-weight: 400;
    color: #a0a0a0;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  gap: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  cursor: pointer;
`;

const Hr = styled.hr`
  width: 90%;
  height: 1px;

  background-color: #dddddd;
  border: 0;
`;

const Button = styled.div`
  flex-shrink: 0;

  cursor: pointer;
  border-radius: 4rem;
`;

const GeneralBtn = styled.button`
  min-width: 15rem;
  height: 3.1rem;

  background-color: hsl(229.55223880597015, 94.36619718309859%, 58.23529411764705%);
  border: 1px solid rgb(48, 83, 249);
  border-radius: 20rem;

  color: #ffffff;
  font-weight: 400;
  font-size: 1rem;

  cursor: pointer;
`;

const TransparentBtn = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  height: 1.2rem;

  cursor: pointer;
  color: #3053f9;
  font-size: 0.875rem;
  font-weight: 600;

  text-align: center;
  line-height: 1.2rem;
`;

export default LoginPage;
