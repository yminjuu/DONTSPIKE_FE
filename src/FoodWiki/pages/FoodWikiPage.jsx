import MainHeader from '../../common/components/MainHeader';
import styled, { css } from 'styled-components';
import FoodWikiSearch from '../components/FoodWiki/FoodWikiSearch';
import FoodCarousel from '../components/FoodWiki/FoodCarousel';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { modeState } from '../../Recoil';

import Background from '../../FoodWiki/assets/background_foodwiki.png';

const FoodWikiPage = () => {
  const mode = useRecoilValue(modeState);
  // senior or normal

  return (
    <PageBackground>
      <BackImg mode={mode} src={Background} />
      <MainHeader currState="foodwiki"></MainHeader>
      <FoodWikiSearch></FoodWikiSearch>
      <CarouselBox mode={mode}>
        <CarouselWrapper>
          <CarouselTitle mode={mode}>최근 먹은 음식</CarouselTitle>
          <FoodCarousel></FoodCarousel>
        </CarouselWrapper>
      </CarouselBox>
    </PageBackground>
  );
};

const PageBackground = styled.div`
  background-size: cover;
  background-color: #f0f1f5;

  display: flex;
  flex-direction: column;
  height: 100%;
`;

const BackImg = styled.img`
  width: 100vw;
  object-fit: cover;
  position: absolute;
  top: -5rem;

  z-index: 1;

  ${props =>
    props.mode === 'senior'
      ? css`
          height: 80vh;
        `
      : css`
          height: 100vh;
        `}
`;

const CarouselBox = styled.div`
  width: 100%;
  background-color: #ffffff;

  flex: 1 0 auto;
  border-top: 2px solid #e8e8e8;
  z-index: 2;
`;

const CarouselWrapper = styled.div`
  margin: 0 10rem;
  padding-top: 2rem;

  flex-shrink: 0;
  text-align: center;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CarouselTitle = styled.div`
  color: #414141;

  ${props =>
    props.mode === 'senior'
      ? css`
          font-size: 2rem;
          font-weight: 800;
        `
      : css`
          font-size: 1.5rem;
          font-weight: 500;
        `}
`;

export default FoodWikiPage;
