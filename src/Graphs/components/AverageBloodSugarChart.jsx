// LineChartComponent.jsx
import { useEffect, React, useState, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, LabelList } from 'recharts';
import CustomLabel from '../AverageBS/CustomLabel';
import styled from 'styled-components';
import Icon from '../../common/assets/PencilIcon.svg?react';
import { useRecoilValue } from 'recoil';
import { modeState } from '../../Recoil';

const AverageBloodSugarChart = ({ averageData }) => {
  const chartContainerRef = useRef(null);
  const mode = useRecoilValue(modeState);

  var fillColor;
  mode === 'senior' ? (fillColor = '#6D986D') : (fillColor = '#4C62CA');

  useEffect(() => {
    if (chartContainerRef.current) {
      chartContainerRef.current.scrollLeft = chartContainerRef.current.scrollWidth;
    }
  }, []);

  const calculateChartWidth = dataLength => {
    if (dataLength <= 5) {
      return '500';
      // 기본 너비
    }
    return `${dataLength * 100}px`; // 데이터 포인트 하나당 50px의 너비를 할당
  };

  const chartWidth = calculateChartWidth(averageData.length); // 동적으로 차트의 너비 계산

  if (averageData.length != 0) {
    if (chartContainerRef.current) {
      chartContainerRef.current.scrollLeft = chartContainerRef.current.scrollWidth;
    }
    return (
      <div
        style={{ width: '100%', overflowX: 'auto', overflowY: 'hidden', display: 'flex', justifyContent: 'center' }}
        ref={chartContainerRef}
      >
        <div style={{ width: `${chartWidth}px`, height: '250px' }}>
          <LineChart
            width={averageData.length <= 5 ? 500 : averageData.length * 100}
            height={250}
            data={averageData}
            margin={{
              top: 40,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" padding={{ left: 20, right: 20 }} />
            <Line
              type="linear"
              dataKey="average"
              stroke={fillColor}
              strokeWidth={3.5}
              dot={{ r: 4, fill: fillColor }}
              activeDot={{ r: 6, fill: { fillColor }, strokeWidth: 0 }}
              label={<CustomLabel />}
            />
          </LineChart>
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
  margin: 0 30px;

  background-color: #f0f1f5;
  border-radius: 10px;
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

export default AverageBloodSugarChart;
