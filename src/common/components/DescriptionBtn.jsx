import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { TbFileDescription } from 'react-icons/tb';
import { useRecoilValue } from 'recoil';
import { modeState } from '../../Recoil';

const DescriptionBtn = () => {
  const mode = useRecoilValue(modeState);
  const navigate = useNavigate();

  const onLanding = () => {
    navigate(`/landing`, { replace: 'true' }); //뒤로가기 방지
  };

  return (
    <Wrapper onClick={onLanding}>
      <TbFileDescription />
      <Text mode={mode}>사용 설명서</Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 9vw;
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Text = styled.div`
  color: #111111;
  display: flex;

  ${props =>
    props.mode === 'senior'
      ? css`
          font-size: 1.4rem;
          font-weight: 700;
        `
      : css`
          font-size: 1rem;
          font-weight: 500;
        `}
`;

export default DescriptionBtn;
