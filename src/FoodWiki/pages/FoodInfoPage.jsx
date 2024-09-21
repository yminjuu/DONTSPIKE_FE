import { useNavigate, useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import SubPageHeader from '../../common/components/SubPageHeader';
import Tip from '../components/FoodInfo/Tip';
import Nutrient from '../components/FoodInfo/Nutrient';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { modeState } from '../../Recoil';
import SearchSec from '../assets/SearchSec.png';
import Loader from '../../common/components/Loader';

const FoodInfoPage = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [foodSearch] = useSearchParams();
  const query = foodSearch.get('query');

  const mode = useRecoilValue(modeState);

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchFoodWikiSearchResult = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/foodwiki?search_food=${query}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        withCredentials: true, // 쿠키 포함?..
      });
      console.log(res);
      setData(res.data); // state 변경 => 리렌더링
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // 검색 결과 없을 때 처리
        console.log('에러 발생 : food info', res);
      }
    }
  };

  // 초기 렌더링 => 정보 가져옴
  useEffect(() => {
    fetchFoodWikiSearchResult();
  }, [data]);

  if (loading) {
    return <Loader />;
  } else
    return (
      <Wrapper>
        <HeaderWrapper>
          <SubPageHeader currState="foodwiki"></SubPageHeader>
          <LogoWrapper mode={mode}>혈당백과</LogoWrapper>
        </HeaderWrapper>
        <ContentWrapper>
          <InfoWrapper>
            <Nutrient {...data}></Nutrient>
          </InfoWrapper>
          <TipWrapper>
            <WikiLogo src={SearchSec} />
            <Tip tip_title="전문가의 소견" tip_content={data.expertOpinion} />
            <Tip tip_title="적정 섭취량" tip_content={data.properIntake} />
            <Tip tip_title="추천 섭취 방법" tip_content={data.ingestionMethod} />
            <Tip tip_title="혈당 지수" tip_content={data.gi} />
          </TipWrapper>
        </ContentWrapper>
      </Wrapper>
    );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: #f0f1f5;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.7rem;

  position: relative;

  border-bottom: 1px solid #cfcfcf;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 5vw;
  width: 95vw;

  height: 85vh;
`;

const InfoWrapper = styled.div`
  width: 46vw;
  height: 81vh;
  flex-shrink: 0;

  /* margin: 2vw 2vh; */
`;

const TipWrapper = styled.div`
  width: 45vw;
  height: 82vh;
  flex-shrink: 0;

  border-radius: 0.625rem;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: #fff;
  border-radius: 1rem;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 50%;

  ${props =>
    props.mode === 'senior'
      ? css`
          font-size: 1.8rem;
          font-weight: 700;
          top: 1.6rem;
        `
      : css`
          font-size: 1.2rem;
          font-weight: 500;
          top: 2rem;
        `}
`;

const WikiLogo = styled.img`
  width: 4.5rem;
  height: 4rem;

  margin: 0.5rem 0 0.5rem 1rem;
`;

export default FoodInfoPage;
