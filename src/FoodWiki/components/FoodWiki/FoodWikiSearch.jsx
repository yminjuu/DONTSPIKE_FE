import { styled, keyframes, css } from 'styled-components';
import SearchBox from '../../../common/components/SearchBox';
import SearchSec from '../../../FoodWiki/assets/SearchSec.png';
import { useRecoilValue } from 'recoil';
import { modeState } from '../../../Recoil';

const FoodWikiSearch = () => {
  const mode = useRecoilValue(modeState);

  return (
    <>
      <MainWrapper mode={mode}>
        <RotatingTaco mode={mode} src={SearchSec}></RotatingTaco>
        <Title mode={mode}>혈당백과</Title>
        <Description mode={mode}>음식을 검색해보세요! 혈당 관리에 도움이 되는 방법을 함께 알려드릴게요.</Description>
        <SearchBox type="FoodWiki"></SearchBox>
      </MainWrapper>
    </>
  );
};

const MainWrapper = styled.div`
  font-size: 1.25rem;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  z-index: 2;

  position: relative;

  ${props =>
    props.mode === 'senior'
      ? css`
          height: 60%;
        `
      : css`
          height: 60%;
          margin-top: 3rem;
        `}
`;

const Title = styled.div`
  color: #111111;

  /* Pretendard/Sb/50 */

  ${props =>
    props.mode === 'senior'
      ? css`
          font-size: 3.7rem;
          font-weight: 800;
        `
      : css`
          font-size: 2.5rem;
          font-weight: 600;
        `}
`;

const Description = styled.div`
  color: #414141;

  /* Pretendard/Reg/20 */

  ${props =>
    props.mode === 'senior'
      ? css`
          font-size: 1.2rem;
          font-weight: 700;
          margin: 0.8rem;
        `
      : css`
          font-size: 0.8rem;
          font-weight: 400;
          margin: 2rem;
        `}
`;

const RotatingTaco = styled.img`
  flex-shrink: 0;

  ${props =>
    props.mode === 'senior'
      ? css`
          width: 7.5625rem;
          height: 6.06894rem;
        `
      : css`
          width: 5.0625rem;
          height: 4.16894rem;
        `}
`;

export default FoodWikiSearch;
