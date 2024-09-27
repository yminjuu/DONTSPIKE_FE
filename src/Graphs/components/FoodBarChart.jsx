// BarChartComponent.jsx
import React from 'react';
import { BarChart, Bar, XAxis, LabelList } from 'recharts';
import CustomBarShape from '../FoodBar/CustomBarShape';
import CustomLabel from '../FoodBar/CustomLabel';
import styled from 'styled-components';
import Icon from '../../common/assets/PencilIcon.svg?react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { favFoodState, modeState } from '../../Recoil';

const FoodBarChart = () => {
  const [favFood, setFavFood] = useRecoilState(favFoodState);
  const mode = useRecoilValue(modeState);

  var fillColor = '#3053f9';
  {
    mode !== 'senior' ? (fillColor = '#3053F9') : (fillColor = '#6D986D');
  }

  if (favFood.length != 0) {
    return (
      <div
        style={{
          width: '100%',
          overflowX: 'hidden',
          overflowY: 'hidden',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}
      >
        <div style={{ width: '100%', height: '250px', margin: '0 auto' }}>
          <BarChart
            width={600}
            height={250}
            data={favFood}
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
              fill={fillColor}
              shape={props => <CustomBarShape {...props} totalCount={favFood.length} />}
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
