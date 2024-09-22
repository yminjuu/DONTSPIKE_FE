import MainHeader from '../../common/components/MainHeader';
import MainBloodSugar from '../../Sec1_MainBloodSugar/MainBloodSugar';
import AverageBloodSugar from '../../Sec3_AverageBloodSugar/AverageBloodSugar';
import FoodBar from '../../Sec2_FoodBar/FoodBar';

import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import React from 'react';

import { commonChartTitle } from '../../common/styles/commonStyles';
import doctor from '../assets/doctor.png';

import Fullpage, { FullPageSections, FullpageSection, FullpageNavigation } from '@ap.cx/react-fullpage';
import { useRecoilState } from 'recoil';
import { favFoodState } from '../../Recoil';
import Loader from '../../common/components/Loader';

import { compareMainData, calculateDifference, compareFavFood } from '../function/compare';
import parseData from '../function/parseData';

const MainGraphPage = () => {
  const [token, setToken] = useState(null);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const pageContainerRef = useRef(null);

  // 혈당값 관리
  const [bloodSugar, setBS] = useState([]);

  // 메인 데이터 관리
  const [mainData, setMainData] = useState([]);

  // 평균 데이터 관리
  const [averageData, setAverageData] = useState([]);

  // 자주 먹은 음식 관리
  const [favFood, setFavFood] = useRecoilState(favFoodState);

  // 평균 혈당값 차이 관리
  const [averageOffset, setOffset] = useState(null);

  // **  모든 데이터를 다 가져왔는지 관리  **
  const [fetchStatus, setFetchStatus] = useState(false);

  // gpt 코멘트 관리
  const [comment, setComment] = useState('');

  useEffect(() => {
    // api요청을 통해 토큰을 받는다
    fetchToken();
  }, []);

  useEffect(() => {
    // 혈당값이 바뀌면 밑의 2가지 그래프 리렌더링 발생
    fetchMainChartData();
    fetchAverageData();
    // 스크롤 위치 top이도록 관리
    if (pageContainerRef.current) {
      pageContainerRef.current.scrollTop = pageContainerRef.current.scrollHeight;
    }
  }, [bloodSugar]);

  // 토큰 바뀔 때마다 실행
  useEffect(() => {
    if (token != null) {
      localStorage.setItem('token', token);

      if (fetchMainChartData() === true && fetchAverageData() === true && fetchFavFoodData() === true)
        setFetchStatus(true);
    }
  }, [token]);

  // 최초 1회 토큰 받아오는 fetch 함수
  const fetchToken = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/getAccessToken`, {
        withCredentials: true,
        // 쿠키를 포함하여 전송
      });
      if (res.status === 200) {
        setToken(res.data);
      } else {
        alert('현재 서버 점검 중입니다.');
      }
    } catch (error) {
      console.log('토큰 get 오류: ', error);
    }
  };

  // 1) 메인 그래프 data fetch
  const fetchMainChartData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/blood-sugar/food`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // 쿠키 포함?..
      }); // data를 배열 형식으로 새로 받아옴

      if (res.status === 200) {
        const newData = [...res.data];
        setMainData(newData.sort(compareMainData));
        return true;
      }
    } catch (error) {
      console.log('에러 발생: 메인그래프', error);
    }
  };

  // 2) 평균 혈당 그래프 data fetch
  const fetchAverageData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/blood-sugar/average?year=2024`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // 쿠키 포함?.. 왜..
      });
      if (res.status === 200) {
        const parsedData = parseData(res.data.monthly_averages);
        setAverageData(parsedData);

        // 차이 계산 후 offset 설정
        const difference = calculateDifference(parsedData);
        setOffset(difference);
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 3) 자주 먹은 음식 데이터
  const fetchFavFoodData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/food/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // 쿠키 포함?..
      });

      if (res.status === 200) {
        // 자주 먹은 음식 전역으로 관리
        setFavFood(res.data.frequentFoods.sort(compareFavFood));
        // gpt comment set
        setComment(res.data.analysisDto.analysis);
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (fetchStatus === true)
    return (
      <Fullpage>
        <FullpageNavigation />
        <MainHeader currState="graph"></MainHeader>{' '}
        <FullPageSections>
          <FullpageSection>
            <SectionWrapper>
              <TitleWrapper>
                <ChartTitle>아침 공복 혈당 그래프</ChartTitle>
              </TitleWrapper>
              <ContentWrapper>
                {' '}
                <MainBloodSugar
                  setBS={setBS}
                  fetchMainChartData={fetchMainChartData}
                  mainData={mainData}
                ></MainBloodSugar>
                <TipWrapper>
                  <ImgWrapper src={doctor}></ImgWrapper>
                  <TipBox>
                    00 님의 최근 오늘 공복 평균 혈당은 0mg/dl입니다! <br />
                    어제에 비해 평균 공복 혈당이 00mg/dl 상승했군요.
                    <br />
                    사과, 바나나를 먹었을 때 다른 분들에 비해 혈당이 많이 올라가는 편이에요!
                    <br /> 반대로 상추, 깻잎을 먹었을 때 혈당이 내려가는 편이니까 참고해서 섭취하면 좋아요!
                  </TipBox>
                </TipWrapper>
              </ContentWrapper>
            </SectionWrapper>
          </FullpageSection>
          <FullpageSection>
            <SectionWrapper>
              {' '}
              <TitleWrapper>
                <ChartTitle>최근 30일간 가장 자주 먹은 음식</ChartTitle>
              </TitleWrapper>
              <ContentWrapper>
                <FoodBar token={token} />
                <TipWrapper>
                  <ImgWrapper src={doctor}></ImgWrapper>
                  <TipBox>{comment}</TipBox>
                </TipWrapper>
              </ContentWrapper>
            </SectionWrapper>
          </FullpageSection>
          <FullpageSection>
            <SectionWrapper>
              {' '}
              <TitleWrapper>
                <ChartTitle>월별 공복 혈당 평균</ChartTitle>
              </TitleWrapper>
              <ContentWrapper>
                <AverageBloodSugar
                  fetchAverageData={fetchAverageData}
                  averageData={averageData}
                  offset={averageOffset}
                ></AverageBloodSugar>
                <TipWrapper>
                  <ImgWrapper src={doctor}></ImgWrapper>
                  <TipBox>
                    00 님의 최근 오늘 공복 평균 혈당은 0mg/dl입니다! <br />
                    어제에 비해 평균 공복 혈당이 00mg/dl 상승했군요.
                    <br />
                    사과, 바나나를 먹었을 때 다른 분들에 비해 혈당이 많이 올라가는 편이에요!
                    <br /> 반대로 상추, 깻잎을 먹었을 때 혈당이 내려가는 편이니까 참고해서 섭취하면 좋아요!
                  </TipBox>
                </TipWrapper>
              </ContentWrapper>
            </SectionWrapper>
          </FullpageSection>
        </FullPageSections>
      </Fullpage>
    );
  else return <Loader />;
};

const SectionWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #e9eaf1;
`;
// content wrapper
const ContentWrapper = styled.div`
  width: 90%;
  height: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;

  box-sizing: border-box;

  background-color: #ffffff;
  /* padding으로 인해 이 요소의 크기 변경 x, 자식 요소의 크기 변경 */
`;
const TitleWrapper = styled.div`
  width: 100%;
  padding-left: 8rem;
  margin-top: 2rem;
  flex-shrink: 0;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  background-color: #e9eaf1;
`;

const ChartTitle = styled.div`
  ${commonChartTitle}
  font-size: 1.6rem;
  font-weight: 700;
  padding: 2rem;
`;

const ImgWrapper = styled.img`
  width: 7rem;
  height: 8.3rem;

  position: absolute;
  left: -4rem;
`;

const TipWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;

  margin-bottom: 3rem;
`;

const TipBox = styled.div`
  padding: 2rem;
  padding: 2rem 5rem 2rem 5rem;
  max-width: 65rem;

  border-radius: 1.25rem;

  background-color: #f0f1f5;

  line-height: 120%;
`;
export default MainGraphPage;
