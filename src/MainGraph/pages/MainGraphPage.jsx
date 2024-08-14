import MainHeader from '../../common/components/MainHeader';
import MainBloodSugar from '../../Sec1_MainBloodSugar/MainBloodSugar';
import AverageBloodSugar from '../../Sec3_AverageBloodSugar/AverageBloodSugar';
import FoodBar from '../../Sec2_FoodBar/FoodBar';

import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../../Recoil';

const monthMapping = {
  JANUARY: '1월',
  FEBRUARY: '2월',
  MARCH: '3월',
  APRIL: '4월',
  MAY: '5월',
  JUNE: '6월',
  JULY: '7월',
  AUGUST: '8월',
  SEPTEMBER: '9월',
  OCTOBER: '10월',
  NOVEMBER: '11월',
  DECEMBER: '12월',
};

const monthOrder = [
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER',
];

// 날짜순 정렬
const compare = (a, b) => {
  const dateA = new Date(a.recorddate);
  const dateB = new Date(b.recorddate);

  return dateA - dateB;
};

const parseData = data => {
  return monthOrder.reduce((result, month) => {
    const average = Math.round(data[month]);
    if (average !== 0) {
      result.push({
        name: monthMapping[month],
        average: average,
      });
    }
    return result;
  }, []);
};

const calculateDifference = data => {
  console.log(data);
  if (data.length < 2) {
    throw new Error('Not enough data to calculate the difference');
  }

  const lastIndex = data.length - 1;
  const lastAverage = data[lastIndex].average;
  const secondLastAverage = data[lastIndex - 1].average;

  return lastAverage - secondLastAverage;
};

const MainGraphPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useRecoilState(userState);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const pageContainerRef = useRef(null);

  const [bloodSugar, setBS] = useState([]);

  const [mainData, setMainData] = useState([]); // 메인 그래프 데이터

  const [averageData, setAverageData] = useState([]); // 평균 그래프 데이터

  const [averageOffset, setOffset] = useState(null);

  // login 상태인지 확인
  useEffect(() => {
    if (user === null) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    // 혈당값이 바뀌면 밑의 2가지 그래프 리렌더링 발생
    fetchMainChartData();
    fetchAverageData();
    // 스크롤 위치 top이도록 관리
    if (pageContainerRef.current) {
      pageContainerRef.current.scrollTop = pageContainerRef.current.scrollHeight;
    }
    console.log(mainData);
  }, [bloodSugar]);

  useEffect(() => {
    // 스크롤 위치 top이도록 관리
    if (pageContainerRef.current) {
      pageContainerRef.current.scrollTop = pageContainerRef.current.scrollHeight;
    }
  }, []);

  // 메인 그래프 data fetch
  const fetchMainChartData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/blood-sugar/food/${user}`); // data를 배열 형식으로 새로 받아옴
      const newData = [...res.data];
      setMainData(newData.sort(compare));
    } catch (error) {
      console.log('에러 발생', error);
    }
  };

  // 평균 혈당 그래프 data fetch
  const fetchAverageData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/blood-sugar/average?user_id=${user}&year=2024`);

      if (res.status === 200) {
        const parsedData = parseData(res.data.monthly_averages);
        setAverageData(parsedData);

        // 차이 계산 후 offset 설정
        const difference = calculateDifference(parsedData);
        setOffset(difference);
        console.log('계산: ', difference);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (user === null) return null;

  return (
    <PageBackground ref={pageContainerRef}>
      <MainHeader currState="graph"></MainHeader>
      <SectionsWrapper>
        {/* 제목 + 혈당 섹션 */}
        <SectionWrapper>
          <MainBloodSugar setBS={setBS} mainData={mainData} fetchMainChartData={fetchMainChartData}></MainBloodSugar>
        </SectionWrapper>
        {/* 구분선 추가 */}
        <HorizonWrapper>
          <svg xmlns="http://www.w3.org/2000/svg" width="1292" height="1" viewBox="0 0 1292 1" fill="none">
            <path d="M1 0.5L1291 0.5" stroke="#CFCFCF" strokeLinecap="round" />
          </svg>
        </HorizonWrapper>
        {/* 하단 그래프 2개 섹션*/}
        <SectionWrapper2>
          <FoodBar></FoodBar>
          <AverageBloodSugar
            fetchAverageData={fetchAverageData}
            averageData={averageData}
            offset={averageOffset}
          ></AverageBloodSugar>
        </SectionWrapper2>
      </SectionsWrapper>
    </PageBackground>
  );
};

const PageBackground = styled.div`
  background-image: url('https://raw.githubusercontent.com/yminjuu/DONTSPIKE_FE/328516018febe495fa3f66b464cc9b82e25d8344/public/MainBG.svg');
  background-size: cover;
  overflow-y: auto;
`;

const SectionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin: 1.1rem 4.69rem 1.3rem 4.69rem;
`;

const SectionWrapper2 = styled.section`
  display: flex;
  flex-direction: row;
  margin: 1.3rem 4.69rem 2.5rem 4.69rem;
  justify-content: center;
  gap: 1.13rem;
`;

const HorizonWrapper = styled.div`
  width: 80.625rem;
  height: 1.75rem;
  flex-shrink: 0;
`;
export default MainGraphPage;
