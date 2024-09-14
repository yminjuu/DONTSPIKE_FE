import { css, styled } from 'styled-components';
import Logo from '../components/LogoButton';
import LogoButton from '../components/LogoButton';
import { useNavigate } from 'react-router-dom';
import Icon from '../assets/delete.png';

const SubPageHeader = ({ currState }) => {
  const navigate = useNavigate();

  const onBtnClick = () => {
    navigate(-1); //뒤로가기
  };

  return (
    <HeaderWrapper $currState={currState}>
      <LogoButton currState={currState} subPage={true}></LogoButton>
      {/* x 버튼 svg 태그 */}
      <ButtonWrapper onClick={onBtnClick}>
        <Img src={Icon} alt="음식 이미지"></Img>
      </ButtonWrapper>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;

  ${props =>
    props.$currState === 'foodwiki'
      ? // 현재 state가 해당 버튼이 눌린 상태라면
        css`
          height: 3rem;
        `
      : css`
          background-color: #ffffff;
        `};
`;

const ButtonWrapper = styled.div`
  cursor: pointer;
  width: 4rem;
  height: 4rem;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  width: 1.7rem;
  height: 1.7rem;
  object-fit: cover;
  margin: 1rem;
`;
export default SubPageHeader;
