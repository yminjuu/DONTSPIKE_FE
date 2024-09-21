// BarChartComponent.jsx
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, LabelList } from 'recharts';
import CustomBarShape from '../FoodBar/CustomBarShape';
import CustomLabel from '../FoodBar/CustomLabel';
import axios from 'axios';
import styled from 'styled-components';
import Icon from '../../common/assets/PencilIcon.svg?react';
const compare = (a, b) => {
  return parseInt(b.count) - parseInt(a.count);
};

const FoodBarChart = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [favData, setFavData] = useState([]);

  const fetchFavFoodData = async () => {
    try {
      console.log(localStorage.getItem('토큰 출력: ', localStorage.getItem('token')));
      const res = await axios.get(`${BASE_URL}/api/food/favorites`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        withCredentials: true, // 쿠키 포함?..
      });
      console.log('foodbar 그래프 데이터', res);
      setFavData(res.data.sort(compare));
    } catch (error) {
      console.log(error);
    }
  };

  // 최초 렌더링시 데이터 가져옴
  useEffect(() => {
    fetchFavFoodData();
  }, []);

  if (favData.length != 0) {
    return (
      <div style={{ width: '100%', overflowX: 'hidden', overflowY: 'hidden' }}>
        <div style={{ width: '100%', height: '270px', margin: '0 auto' }}>
          <BarChart
            width={600}
            height={270}
            data={favData}
            margin={{
              top: 30,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            padding={{
              top: 10,
            }}
            barCategoryGap="30%" // 바 간의 간격 조절
          >
            <XAxis
              axisLine={false}
              tickLine={false}
              dataKey="foodName"
              interval={0}
              tick={{ fontSize: 13 }}
              count={length}
              padding={{ left: 20, right: 20 }}
            />
            <Bar
              dataKey="count"
              fill="#3053F9"
              shape={props => <CustomBarShape {...props} totalCount={favData.length} />}
            >
              {' '}
              <LabelList dataKey="count" content={CustomLabel} />
            </Bar>
          </BarChart>
        </div>
      </div>
    );
  } else
    return (
      <NoContentMainWrapper>
        <NoContentWrapper>
          <Icon></Icon>
          <NoContentText>아직 입력된 정보가 없어요.</NoContentText>
        </NoContentWrapper>
      </NoContentMainWrapper>
    );
};

const NoContentMainWrapper = styled.div`
  height: 270px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #f0f1f5;
  border-radius: 1rem;
  margin: 0 30px;
`;

const NoContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const NoContentText = styled.div`
  color: #000;
  font-size: 1rem;
  font-weight: 500;
`;

export default FoodBarChart;
