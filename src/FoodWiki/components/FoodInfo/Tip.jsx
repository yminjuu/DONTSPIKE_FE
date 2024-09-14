import styled, { css } from 'styled-components';
import Blood from '../../assets/bloodIcon.svg?react';
import Eat from '../../assets/eatIcon.svg?react';
import Rec from '../../assets/recIcon.svg?react';
import Search from '../../assets/searchIcon.svg?react';
import { useRecoilValue } from 'recoil';
import { modeState } from '../../../Recoil';

const Tip = ({ tip_title, tip_content }) => {
  const mode = useRecoilValue(modeState);

  return (
    // 이미지 추가
    <Wrapper>
      <TitleWrapper>
        {tip_title === '전문가의 소견' ? <Search></Search> : <></>}
        {tip_title === '적정 섭취량' ? <Eat></Eat> : <></>}
        {tip_title === '추천 섭취 방법' ? <Rec></Rec> : <></>}
        {tip_title === '혈당 지수' ? <Blood></Blood> : <></>}
        <Title mode={mode}>{tip_title}</Title>
      </TitleWrapper>
      <Content>{tip_content}</Content>
      {/* horizon */}
      {tip_title != '혈당 지수' ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="550" height="2" viewBox="0 0 550 2" fill="none">
          <path d="M1 1L631 0.999951" stroke="#E8E8E8" strokeLinecap="round" />
        </svg>
      ) : (
        <></>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: auto;
  height: auto;
  margin: 1vh 2vw;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  gap: 3vh;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

const Title = styled.div`
  color: #111111;

  font-size: 1.2rem;
  font-weight: 700;

  ${props =>
    props.mode === 'senior'
      ? css`
          font-size: 1.8rem;
          font-weight: 800;
        `
      : css`
          font-size: 1.2rem;
          font-weight: 700;
        `}
`;

const Content = styled.div`
  color: #414141;
  font-size: 0.8rem;
  font-weight: 350;

  letter-spacing: 0.03rem; //자간
  word-spacing: 0.05rem; //어간
  line-height: 1.5rem; // 행간

  ${props =>
    props.mode === 'senior'
      ? css`
          font-size: 1.6rem;
          font-weight: 700;
          top: 1.6rem;
        `
      : css`
          font-size: 1.2rem;
          font-weight: 500;
          top: 2rem;
        `}
`;

export default Tip;
