import React from 'react';
import styled, { css } from 'styled-components';
import Logo from '../assets/Logo.svg?react';
import { useNavigate } from 'react-router-dom';

const LogoButton = ({ currState }) => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        console.log('클릭');
        if (currState === 'graph' || currState === 'foodwiki') {
          navigate(`/main`);
        }
      }}
      $currState={currState}
    >
      <Logo></Logo>
    </Button>
  );
};

const Button = styled.button`
  border: none;
  padding: 0;
  ${props =>
    props.$currState === 'graph' || props.$currState === 'foodwiki'
      ? css`
          cursor: pointer;
        `
      : css``}
  width: 7rem;
  height: 7rem;
  margin-left: 2.5rem;
  flex-shrink: 0;

  background: transparent;
`;

export default LogoButton;
