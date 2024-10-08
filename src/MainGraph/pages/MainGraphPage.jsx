import MainHeader from '../../common/components/MainHeader';
import MainBloodSugar from '../../Sec1_MainBloodSugar/MainBloodSugar';
import AverageBloodSugar from '../../Sec3_AverageBloodSugar/AverageBloodSugar';
import AverageGraphToolTip from '../../Sec3_AverageBloodSugar/components/AverageGraphToolTip';
import FoodBar from '../../Sec2_FoodBar/FoodBar';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import React from 'react';

import { commonChartTitle } from '../../common/styles/commonStyles';
import doctor from '../assets/doctor.png';

import Fullpage, { FullPageSections, FullpageSection, FullpageNavigation } from '@ap.cx/react-fullpage';
import { useRecoilState, useRecoilValue } from 'recoil';
import { favFoodState, modeState } from '../../Recoil';
import Loader from '../../common/components/Loader';

import { compareMainData, calculateDifference, compareFavFood } from '../function/compare';
import parseData from '../function/parseData';
import analyzeBS from '../function/analyzeBS';

const MainGraphPage = () => {
  const seniorMode = useRecoilValue(modeState);

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

  // MAIN - 코멘트 관리
  const [mainComment, setMainComment] = useState(null);

  // FOOD - gpt 코멘트 관리
  const [foodGPTComment, setGPTComment] = useState('');

  useEffect(() => {
    if (mainData.length != 0) {
      const result = analyzeBS(mainData);
      setMainComment(result);
    }
  }, [mainData]);

  useEffect(() => {
    // api요청을 통해 토큰을 받는다
    fetchToken();
  }, []);

  useEffect(() => {
    // 혈당값이 바뀌면 밑의 2가지 그래프 리렌더링 발생
    if (fetchStatus === true) {
      // 초기 렌더링이 여기서는 발생하지 않도록
      fetchMainChartData();
      fetchAverageData();
      if (mainData.length != 0) {
        const result = analyzeBS(mainData);
        setMainComment(result);
      }
    }

    // 스크롤 위치 top이도록 관리
    if (pageContainerRef.current) {
      pageContainerRef.current.scrollTop = pageContainerRef.current.scrollHeight;
    }
  }, [bloodSugar]);

  // 토큰 바뀔 때마다 실행
  useEffect(() => {
    // 비동기 함수 정의
    const fetchData = async () => {
      if (token != null) {
        localStorage.setItem('token', token);

        try {
          // 모든 비동기 작업이 완료될 때까지 기다림
          const favFoodSuccess = await fetchFavFoodData();
          const averageDataSuccess = await fetchAverageData();
          const mainChartSuccess = await fetchMainChartData();

          // 모든 요청이 성공했을 때만 setFetchStatus(true) 호출
          // if (favFoodSuccess && averageDataSuccess && mainChartSuccess) {
          setFetchStatus(true);
          // } else {
          // }
        } catch (error) {
          console.log('에러 발생:', error);
          setFetchStatus(false); // 에러가 발생하면 false로 설정
        }
      }
    };

    fetchData(); // 비동기 함수 호출
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
        if (res.data.frequentFoods.length != 0) setGPTComment(res.data.analysisDto.analysis);
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
            <SectionWrapper mode={seniorMode}>
              <TitleWrapper mode={seniorMode}>
                <ChartTitle mode={seniorMode}>아침 공복 혈당 그래프</ChartTitle>
              </TitleWrapper>
              <ContentWrapper mode={seniorMode}>
                {' '}
                <MainBloodSugar setBS={setBS} mainData={mainData}></MainBloodSugar>
                <TipWrapper>
                  <ImgWrapper src={doctor}></ImgWrapper>
                  {mainComment !== null ? (
                    <TipBox mode={seniorMode}>
                      {mainComment.today} 공복 혈당은 <EmphSpan mode={seniorMode}>{mainComment.todayBS}mg/dl</EmphSpan>
                      입니다!
                      <br />
                      지난 공복 혈당와 비교했을 때 평균 공복 혈당이{' '}
                      {mainComment.alertComment === '동일' ? (
                        '동일하군요.'
                      ) : (
                        <>
                          약{' '}
                          <EmphSpan mode={seniorMode} alertComment={mainComment.alertComment}>
                            {mainComment.difference}mg/dl
                          </EmphSpan>{' '}
                          {mainComment.alertComment}했군요.
                        </>
                      )}
                    </TipBox>
                  ) : (
                    <TipBox mode={seniorMode} null={true}>
                      {' '}
                      <EmphSpan mode={seniorMode}>충분한 혈당 기록</EmphSpan>이 필요해요!
                    </TipBox>
                  )}
                </TipWrapper>
              </ContentWrapper>
            </SectionWrapper>
          </FullpageSection>
          <FullpageSection>
            <SectionWrapper mode={seniorMode}>
              {' '}
              <TitleWrapper mode={seniorMode}>
                <ChartTitle mode={seniorMode}>최근 30일간 가장 자주 먹은 음식</ChartTitle>
              </TitleWrapper>
              <ContentWrapper mode={seniorMode}>
                <FoodBar token={token} />
                <TipWrapper mode={seniorMode}>
                  <ImgWrapper src={doctor}></ImgWrapper>
                  {foodGPTComment !== '' ? (
                    <TipBox mode={seniorMode}>{foodGPTComment}</TipBox>
                  ) : (
                    <TipBox mode={seniorMode} null={true}>
                      {' '}
                      더 많은 기록을 해주시면 <EmphSpan mode={seniorMode}>AI가 식단을 분석</EmphSpan>
                      해줄 거예요!
                      <br />
                    </TipBox>
                  )}
                </TipWrapper>
              </ContentWrapper>
            </SectionWrapper>
          </FullpageSection>
          <FullpageSection>
            <SectionWrapper mode={seniorMode}>
              {' '}
              <TitleWrapper mode={seniorMode}>
                <ChartTitle mode={seniorMode}>월별 공복 혈당 평균</ChartTitle>
              </TitleWrapper>
              <ContentWrapper mode={seniorMode}>
                <AverageBloodSugar averageData={averageData} offset={averageOffset}></AverageBloodSugar>
                <TipWrapper>
                  {/* 평균값을 구할 수 없는 경우와 구해진 경우를 구분하여 렌더링 */}
                  {averageOffset === null ? (
                    <TipBox mode={seniorMode} null={true}>
                      {' '}
                      더 많은 기록을 해주시면 <EmphSpan mode={seniorMode}>지난 달과의 혈당 평균 차이</EmphSpan>를
                      알려드릴게요!
                      <br />
                    </TipBox>
                  ) : (
                    <>
                      {' '}
                      <ImgWrapper src={doctor}></ImgWrapper>
                      <TipBox mode={seniorMode} null={false}>
                        <AverageGraphToolTip offset={averageOffset} />
                      </TipBox>
                    </>
                  )}
                </TipWrapper>
              </ContentWrapper>
            </SectionWrapper>
          </FullpageSection>
        </FullPageSections>
      </Fullpage>
    );
  else return <Loader type="main" />;
};

const SectionWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${props =>
    props.mode === 'senior'
      ? css`
          background-color: #ebf7de;
        `
      : css`
          background-color: #e9eaf1;
        `}
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
  ${props =>
    props.mode === 'senior'
      ? css`
          height: 80%;
        `
      : css``}
`;
const TitleWrapper = styled.div`
  width: 100%;
  padding-left: 8rem;
  margin-top: 2rem;
  flex-shrink: 0;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  ${props =>
    props.mode === 'senior'
      ? css`
          background-color: #ebf7de;
        `
      : css`
          background-color: #e9eaf1;
        `}
`;

const ChartTitle = styled.div`
  ${commonChartTitle}
  font-size: 1.6rem;
  font-weight: 700;
  padding: 2rem;

  ${props =>
    props.mode === 'senior'
      ? css`
          font-size: 1.8rem;
          font-weight: 800;
          padding: 1.5rem;
          background-color: #ebf7de;
        `
      : css``}
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

  margin-bottom: 1rem;
`;

const TipBox = styled.div`
  margin-top: 1rem;
  padding: 1rem 5rem 1rem 5rem;
  max-width: 65rem;

  border-radius: 1.25rem;

  background-color: #f0f1f5;

  line-height: 120%;

  color: #414141;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.3rem;
  word-spacing: 0.01rem;

  ${props =>
    props.null === true
      ? css`
          font-weight: 600;
        `
      : css``}

  ${props =>
    props.mode === 'senior'
      ? css`
          font-size: 1.5rem;
          font-weight: 600;
          line-height: 1.6rem;
          padding: 1rem 5rem;
          background-color: #ecf1e7;
        `
      : css``}
`;

const EmphSpan = styled.span`
  font-weight: 600;
  font-size: 1.1rem;
  color: '#D33F3F';

  ${props =>
    props.alertComment === '증가'
      ? // 다중 속성을 사용
        css`
          color: #d33f3f;
        `
      : css`
          color: #3053f9;
        `};

  ${props =>
    props.mode === 'senior'
      ? css`
          font-size: 1.7rem;
          font-weight: 700;
          color: #008116;
        `
      : css``}
`;

export default MainGraphPage;
