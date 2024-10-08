import styled, { css } from 'styled-components';
import { modeState } from '../../Recoil/index';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';

const ModeChange = () => {
  const [mode, setMode] = useRecoilState(modeState);
  // 현재 mode 관리
  const [openState, setOpenState] = useState(false);
  // 토글이 열렸는지를 관리

  const handleModeChange = reverse => {
    if (reverse === true) mode === 'senior' ? setMode('normal') : setMode('senior');
    setOpenState(!openState);
  };

  return (
    <MainWrapper>
      <Button onClick={() => handleModeChange(false)} mode={mode}>
        {openState === false ? <SlArrowDown /> : <SlArrowUp />}
        {mode === 'senior' ? '시니어모드' : '일반모드'}
      </Button>
      {openState === true ? (
        <DropdownWrapper mode={mode}>
          <ReverseButton mode={mode} onClick={() => handleModeChange(true)}>
            {mode === 'senior' ? '일반 모드' : '시니어 모드'}
          </ReverseButton>
        </DropdownWrapper>
      ) : (
        <></>
      )}
    </MainWrapper>

    // openState===true일 때 -> 배경이 되는 div가 버튼 밑으로 숨고
    // div 내부에 투명한 버튼을 추가한다.
  );
};

export default ModeChange;

const MainWrapper = styled.div`
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

// MainWrapper의 최소한 하나의 자식 요소가 공간 차지를 해야 상위의 display: flex가 알맞게 작동함
const Button = styled.div`
  width: 8rem;
  height: 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  line-height: 2.5rem;

  border: none;
  padding: 0;
  cursor: pointer;
  flex-shrink: 0;
  z-index: 2;

  border-radius: 1.875rem;
  border: 1px solid #414141;
  background: #fff;

  color: #111;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;

  ${props =>
    props.mode === 'senior'
      ? css`
          width: 12rem;
          height: 3.5rem;
          font-size: 1.4rem;
          font-weight: 800;
        `
      : css`
          width: 8rem;
          height: 2.5rem;
          font-size: 1rem;
          font-weight: 600;
          line-height: 2.5rem;
        `}
`;

const DropdownWrapper = styled.div`
  cursor: pointer;
  z-index: 1; // 버튼 밑으로 숨어야 하는 div

  flex-shrink: 0;

  border-bottom-left-radius: 1.25rem;
  border-bottom-right-radius: 1.25rem;
  border-top-left-radius: 1.875rem;
  border-top-right-radius: 1.875rem;
  border: 1px solid #414141;
  background: #111111;

  position: absolute;
  top: 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  ${props =>
    props.mode === 'senior'
      ? css`
          width: 12rem;
          height: 6.9rem;
          font-size: 1.4rem;
          font-weight: 800;
          line-height: 3.5rem;
        `
      : css`
          width: 7.625rem;
          height: 4.8rem;
          font-size: 1rem;
          font-weight: 600;
          line-height: 2.5rem;
        `}
`;

const ReverseButton = styled.div`
  border: none;
  padding: 0;
  background-color: transparent;
  cursor: pointer;
  flex-shrink: 0;
  z-index: 3;

  color: #ffffff;
  display: flex;
  justify-content: center;
  text-align: end;

  ${props =>
    props.mode === 'senior'
      ? css`
          width: 12rem;
          height: 3.5rem;
          font-size: 1.4rem;
          font-weight: 800;
        `
      : css`
          width: 7.625rem;
          height: 2.4rem;
          font-size: 1rem;
          font-weight: 600;
          line-height: 2.5rem;
        `}
`;
