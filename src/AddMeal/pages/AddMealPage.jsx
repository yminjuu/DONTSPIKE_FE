import SearchSection from '../components/SearchSec/SearchSection';
import FoodNavigationSection from '../components/FoodNavSec/FoodNavigationSection';
import styled, { css } from 'styled-components';
import SubPageHeader from '../../common/components/SubPageHeader';
import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { modeState } from '../../Recoil';

const formatDate = date => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더합니다.
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const AddMealPage = () => {
  const mode = useRecoilValue(modeState);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  // SearchSection에서 선택된 날짜 관리
  const [selectedDate, setSelectedDate] = useState();

  const navigate = useNavigate();

  const fetchMeal = async foodId => {
    const date = new Date(selectedDate);
    try {
      console.log(foodId);
      const res = await axios.post(
        `${BASE_URL}/api/diet/add-food?foodId=${foodId}&recordDate=${formatDate(date)}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          withCredentials: true, // 쿠키 포함?..
        },
      );

      if (res.status === 200) {
        alert(`${selectedDate.getMonth() + 1}/${selectedDate.getDate()}에 식단이 추가되었어요!`);
        return true;
      }
      return false;
    } catch (error) {
      alert('해당 날짜의 혈당값이 존재하지 않습니다. 혈당을 먼저 입력해주세요!');
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    // 토큰값이 옳지 않으면 로그인 페이지로 redirect
    if (localStorage.getItem('token') === null) {
      navigate('/login');
    }
  }, []);

  return (
    <PageBackground mode={mode}>
      <SubPageHeader currState="graph"></SubPageHeader>
      <ContentWrapper>
        <SearchSection setSelectedDate={setSelectedDate} fetchMeal={fetchMeal}></SearchSection>
        <FoodNavigationSection selectedDate={selectedDate} fetchMeal={fetchMeal}></FoodNavigationSection>
      </ContentWrapper>
    </PageBackground>
  );
};
// 1. 검색창
// 2. 메뉴 탭
// 3. 리스트 or 직접 등록 화면

const PageBackground = styled.div`
  // 사용자가 보는 화면의 크기가 page의 크기가 됨
  width: 100%;

  ${props =>
    props.mode === 'senior'
      ? css`
          background-color: #eef0ec;
        `
      : css`
          background-color: #f0f1f5;
        `}
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default AddMealPage;
