import React from 'react';
import styled, { css } from 'styled-components';
import Logo from '../assets/Logo.png';
import { useNavigate } from 'react-router-dom';
import { modeState } from '../../Recoil';
import { useRecoilValue } from 'recoil';

const LogoButton = ({ currState, subPage }) => {
  const navigate = useNavigate();
  const mode = useRecoilValue(modeState);

  return (
    <LogoImg
      mode={mode}
      src={Logo}
      onClick={() => {
        console.log('클릭');
        if (currState === 'graph' || currState === 'foodwiki') {
          navigate(`/main`);
        }
      }}
      $currState={currState}
      subPage={subPage}
    />
  );
};
const LogoImg = styled.img`
  width: 6rem;
  height: 3rem;
  margin-left: 2rem;
  object-fit: cover;
  ${props =>
    props.subPage !== true && (props.$currState === 'graph' || props.$currState === 'foodwiki')
      ? props.mode === 'senior'
        ? css`
            width: 23%;
            height: 100%;
          `
        : css`
            width: 15%;
            height: 100%;
          `
      : css`
          width: 6rem;
          height: 3rem;
        `}

  ${props =>
    props.$currState === 'graph' || props.$currState === 'foodwiki'
      ? css`
          cursor: pointer;
        `
      : css``}
`;

export default LogoButton;
