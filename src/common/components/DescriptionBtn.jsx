import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { TbFileDescription } from 'react-icons/tb';

const DescriptionBtn = () => {
  const navigate = useNavigate();

  const onLanding = () => {
    navigate(`/landing`, { replace: 'true' }); //뒤로가기 방지
  };

  return (
    <Wrapper onClick={onLanding}>
      <TbFileDescription />
      <div style={{ color: '#111111', fontSize: '1rem', fontWeight: '500', display: 'flex' }}>사용 설명서</div>
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

export default DescriptionBtn;
