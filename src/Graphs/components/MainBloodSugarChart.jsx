/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts';
import MainBSToolTip from '../MainBS/MainBSToolTip';
import '../styles/CustomScroll.css';
import axios from 'axios';
import styled from 'styled-components';

const isTomorrow = date => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  return (
    tomorrow.getFullYear() === date.getFullYear() &&
    tomorrow.getMonth() === date.getMonth() &&
    tomorrow.getDate() === date.getDate()
  );
};

// 8/2 형식
const formatDate = dateString => {
  const date = new Date(dateString);
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();
  return `${month}/${day}`;
};

// 2024/08/02 형식
const tooltipDate = dateString => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();
  return `${year}.${month}.${day}`;
};

const CustomizedDot = props => {
  const { cx, cy, stroke, payload } = props;
  const date = new Date();
  const indexDate = new Date(payload.recorddate);

  if (payload.isLast === true) {
    return <circle cx={cx} cy={cy} r={4} stroke={stroke} strokeWidth={1} fill="#D6DDFE" />;
    // 내일 날짜와 동일하면 띄우도록 설정을 해두었음.
  } else return <></>;
};

const CustomizedRegularDot = props => {
  const { cx, cy, stroke, payload } = props;
  return <circle cx={cx} cy={cy} r={4} stroke={stroke} strokeWidth={1} fill="#111111" />;
  // 내일 날짜와 동일하면 띄우도록 설정을 해두었음.
};

const MainBloodSugarChart = ({ fetchMainChartData, mainData }) => {
  const chartContainerRef = useRef(null);

  const getProcessedDataList = () => {
    // 포맷데이터를 추가: key값은 formatDate, tooltip의 날짜는 tooltipDate
    const updateData = mainData.map(item => ({
      ...item,
      formatDate: formatDate(item.recorddate),
      tooltipDate: tooltipDate(item.recorddate),
    }));

    const compare = (a, b) => {
      const dateA = new Date(a.recorddate);
      const dateB = new Date(b.recorddate);

      return dateA - dateB;
    };

    const sortedData = updateData.sort(compare);

    // 모든 데이터에 isLast 키 추가하여 예상 혈당값 line을 관리함.
    sortedData.forEach((item, index) => {
      item.isLast = index >= sortedData.length - 2;
    });

    // expect 그래프만 독립적으로 띄우기 위해서 expect를 관리함
    sortedData.forEach((item, index) => {
      if (item.isLast === true) {
        item.expect = item.bloodsugar;
      }
    });

    // bloodsugar 그래프에서 예상 혈당값까지 이어지지 않게 하기 위해서 예상혈당값은 bloodsugar을 삭제함
    if (sortedData.length > 1) {
      delete sortedData[sortedData.length - 1].bloodsugar;
    }

    return sortedData;
  };

  // interval을 동적으로 계산하기 위해서 존재
  const calculateInterval = dataLength => {
    if (dataLength < 10) {
      return 0;
    } else if (dataLength < 20) {
      return 1;
    } else if (dataLength < 50) {
      return 2;
    } else {
      return Math.floor(dataLength / 25);
    }
  };

  const calculateChartWidth = dataLength => {
    if (dataLength <= 10) {
      return '700';
      // 기본 너비
    }
    return `${dataLength * 100}px`;
  };

  // 최초 렌더링시 데이터 가져옴
  useEffect(() => {
    fetchMainChartData();
    if (chartContainerRef.current) {
      chartContainerRef.current.scrollLeft = chartContainerRef.current.scrollWidth;
    }
    console.log(mainData);
  }, []);

  // 데이터 중 최대 혈당량을 구함 => reference line 위함
  const dataMax = Math.max(...mainData.map(d => d.bloodsugar));
  const dataMin = Math.min(...mainData.map(d => d.bloodsugar));
  const chartWidth = calculateChartWidth(mainData.length); // 동적으로 차트의 너비 계산

  if (mainData.length > 1) {
    return (
      <div
        style={{ width: '100%', overflowX: 'auto', overflowY: 'hidden' }}
        className="custom-scroll"
        ref={chartContainerRef}
      >
        <div style={{ width: `${chartWidth}px`, height: '275px' }}>
          <LineChart
            width={mainData.length <= 10 ? 700 : mainData.length * 100}
            px
            height={275}
            data={getProcessedDataList(mainData)}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid horizontal={true} vertical={false} />
            <XAxis
              dataKey="recorddate"
              interval={calculateInterval(mainData.length)} // X축 간격을 동적으로 설정
              tick={{ fontSize: 13 }}
              padding={{ left: 20, right: 20 }}
              tickFormatter={formatDate}
            />
            <YAxis domain={['dataMin-20', 'dataMax+5']} tickCount={6} allowDecimals={false} orientation="right" />
            {/* y축 인덱스의 최대/최소값은 혈당의 실제 최대/최소값-20 */}
            <Tooltip content={<MainBSToolTip isTomorrow={isTomorrow} />} wrapperStyle={{ overflow: 'visible' }} />
            <ReferenceLine y={dataMax} stroke="red" strokeDasharray="3 10"></ReferenceLine>
            <ReferenceLine y={dataMin} stroke="#A0A0A0" strokeDasharray="3 10"></ReferenceLine>
            {mainData.length > 0 ? (
              <Line
                type="linear"
                dataKey="expect"
                stroke="#D6DDFE"
                strokeWidth={2}
                strokeDasharray="5 5" // 점선 설정
                dot={<CustomizedDot />}
                activeDot={{ r: 6, fill: '#3053f9', strokeWidth: 0 }}
              />
            ) : (
              <></>
            )}
            <Line
              type="linear"
              dataKey="bloodsugar"
              stroke="#414141"
              strokeWidth={2}
              dot={<CustomizedRegularDot />}
              activeDot={{ r: 6, fill: '#3053f9', strokeWidth: 0 }}
            />
          </LineChart>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{ width: '100%', overflowX: 'auto', overflowY: 'hidden' }}
        className="custom-scroll"
        ref={chartContainerRef}
      >
        <div style={{ width: { chartWidth }, height: '275px' }}>
          <AddBS>혈당 데이터를 추가해주세요!</AddBS>
        </div>
      </div>
    );
  }
};

const AddBS = styled.div`
  width: 100%;
  height: 100%;

  font-weight: 700;
  font-size: 2rem;
  text-align: center;
  vertical-align: middle;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: #111111;
`;

export default MainBloodSugarChart;
