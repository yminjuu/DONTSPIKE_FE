import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import SubPageHeader from '../../common/components/SubPageHeader';
import FoodWikiLogo from '../assets/FoodWikiLogo.svg?react';
import Tip from '../components/FoodInfo/Tip';
import Nutrient from '../components/FoodInfo/Nutrient';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../Recoil';

const FoodInfoPage = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [foodSearch] = useSearchParams();
  const query = foodSearch.get('query');

  const [data, setData] = useState([]);

  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const fetchFoodWikiSearchResult = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/foodwiki?search_food=${query}`);

      setData(res.data[0]); // state 변경 => 리렌더링
      console.log(data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // 검색 결과 없을 때 처리
        console.log('에러 발생', res);
      }
    }
  };

  // 초기 렌더링 => 정보 가져옴
  useEffect(() => {
    fetchFoodWikiSearchResult();
  }, []);

  // login 상태인지 확인
  useEffect(() => {
    if (user === null) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (user === null) return null;

  return (
    <Wrapper>
      <HeaderWrapper>
        <SubPageHeader currState="foodwiki"></SubPageHeader>
        <LogoWrapper>
          <FoodWikiLogo></FoodWikiLogo>
        </LogoWrapper>
      </HeaderWrapper>
      <ContentWrapper>
        <InfoWrapper>
          <Nutrient {...data}></Nutrient>
        </InfoWrapper>
        <TipWrapper>
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
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1vh;

  background-color: #fafff2;

  height: 15vh;
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
  border: 1px solid #cfcfcf;
  background-color: #fafff2;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default FoodInfoPage;
