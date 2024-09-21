import { useEffect, useState } from 'react';
import { css, styled } from 'styled-components';
import OftFoodItem from '../FoodNavSec/components/OftFoodItem';
import AddFoodInfo from '../FoodNavSec/components/AddFoodInfo';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { favFoodState, modeState } from '../../../Recoil';

const compare = (a, b) => {
  return parseInt(b.count) - parseInt(a.count);
};

const FoodNavigationSection = ({ selectedDate, fetchMeal }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const mode = useRecoilValue(modeState);
  const favFood = useRecoilValue(favFoodState);

  useEffect(() => {}, []);

  // 직접 음식 등록
  const onFoodReg = async ({ foodname }) => {
    try {
      console.log('음식 등록', foodname);
      const food = foodname;
      const res = await axios.post(`${BASE_URL}/api/food`, {
        foodname: food,
      });

      console.log('음식 등록 완료 ', res);
    } catch (error) {
      console.log('에러 발생: navigation', error);
      if (error.response && error.response.status === 404) {
        console.log('음식 등록 실패');
      }
    }
  };

  return (
    <>
      <PageBackground>
        <ItemsWrapper>
          <Title mode={mode}>자주 먹은 음식</Title>
          {favFood.length !== 0 ? (
            <FoodItemWrapper>
              {favFood.map(item => (
                <OftFoodItem key={item.foodDataId} {...item} fetchMeal={fetchMeal}></OftFoodItem>
              ))}
            </FoodItemWrapper>
          ) : (
            <FoodItemWrapper>더 많은 식단 기록이 필요해요!</FoodItemWrapper>
          )}
        </ItemsWrapper>
        <ItemsWrapper>
          <Title mode={mode}>새로운 음식 등록하기</Title>
          <AddFoodInfo onClick={onFoodReg}></AddFoodInfo>
        </ItemsWrapper>
      </PageBackground>
    </>
  );
};

const PageBackground = styled.div`
  width: 90rem;
  flex-shrink: 0;

  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Title = styled.div`
  width: 100%;
  color: #111111;

  padding: 1rem;

  ${props =>
    props.mode === 'senior'
      ? css`
          font-size: 1.7rem;
          font-weight: 800;
        `
      : css`
          font-size: 1.3rem;
          font-weight: 600;
        `}
`;

const ItemsWrapper = styled.div`
  margin: 1rem 2rem;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  border-radius: 1rem;
`;

const FoodItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`;

export default FoodNavigationSection;
