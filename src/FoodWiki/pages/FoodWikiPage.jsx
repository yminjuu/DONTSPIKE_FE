import MainHeader from '../../common/components/MainHeader';
import styled from 'styled-components';
import FoodWikiSearch from '../components/FoodWiki/FoodWikiSearch';
import FoodCarousel from '../components/FoodWiki/FoodCarousel';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../Recoil';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FoodWikiPage = () => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  // login 상태인지 확인
  useEffect(() => {
    if (user === null) {
      navigate('/login');
    }
  }, [user, navigate]);
  if (user === null) return null;

  return (
    <PageBackground>
      <MainHeader currState="foodwiki"></MainHeader>
      <FoodWikiSearch></FoodWikiSearch>
      <CarouselBox>
        <CarouselWrapper>
          <CarouselTitle>최근 먹은 음식</CarouselTitle>
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

const CarouselBox = styled.div`
  width: 100%;
  background-color: #ffffff;

  flex: 1 0 auto;
  border-top: 2px solid #e8e8e8;
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
  font-size: 1.5rem;
  font-weight: 500;
`;

export default FoodWikiPage;
