import React, { useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, LabelList } from 'recharts';
import MainBSToolTip from '../MainBS/MainBSToolTip';
import styled from 'styled-components';
import Icon from '../../common/assets/PencilIcon.svg?react';

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

const CustomActiveDot = ({ cx, cy, fill }) => (
  <svg
    x={cx - 16.5}
    y={cy - 16.5}
    width="33"
    height="33"
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_817_1885)">
      <circle cx="15" cy="15" r="13" fill="#FFD7D7" />
    </g>
    <g filter="url(#filter1_if_817_1885)">
      <path
        d="M8.53558 15.7964L17.2806 5.28032C17.5457 4.96153 18.0598 5.21754 17.9651 5.6212L16.2234 13.0492C16.1685 13.2833 16.3348 13.5113 16.5745 13.5305L20.2654 13.8258C20.5846 13.8513 20.7408 14.2274 20.5336 14.4716L11.8334 24.7234C11.5648 25.0399 11.0527 24.7777 11.1525 24.3748L12.9968 16.9278C13.0582 16.68 12.8707 16.4405 12.6155 16.4405H8.83764C8.50475 16.4405 8.32273 16.0524 8.53558 15.7964Z"
        fill="#D33F3F"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_817_1885"
        x="0.625"
        y="0.625"
        width="31.5"
        height="31.5"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="1.375" dy="1.375" />
        <feGaussianBlur stdDeviation="1.375" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_817_1885" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_817_1885" result="shape" />
      </filter>
      <filter
        id="filter1_if_817_1885"
        x="8.18337"
        y="4.87612"
        width="12.7047"
        height="21.03"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1.04238" />
        <feGaussianBlur stdDeviation="0.521191" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_817_1885" />
        <feGaussianBlur stdDeviation="0.130298" result="effect2_foregroundBlur_817_1885" />
      </filter>
    </defs>
  </svg>
);

const SpikeDot = ({ cx, cy, fill }) => (
  <svg
    x={cx - 16.5}
    y={cy - 24.5} // Adjusted to accommodate the text above the circle
    width="33"
    height="41" // Increased height to fit the text above the circle
    viewBox="0 0 33 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_817_1885)">
      <circle cx="16.5" cy="24.5" r="13" fill="#FFD7D7" />
    </g>
    <g filter="url(#filter1_if_817_1885)">
      <path
        d="M10.0356 24.7964L18.7806 14.2803C19.0457 13.9615 19.5598 14.2175 19.4651 14.6212L17.7234 22.0492C17.6685 22.2833 17.8348 22.5113 18.0745 22.5305L21.7654 22.8258C22.0846 22.8513 22.2408 23.2274 22.0336 23.4716L13.3334 33.7234C13.0648 34.0399 12.5527 33.7777 12.6525 33.3748L14.4968 25.9278C14.5582 25.68 14.3707 25.4405 14.1155 25.4405H10.3376C10.0048 25.4405 9.82273 25.0524 10.0356 24.7964Z"
        fill="#D33F3F"
      />
    </g>
    <text
      x="16.5"
      y="10" // Positioning the text above the circle
      textAnchor="middle"
      dy=".3em"
      fill="#D33F3F"
      fontSize="10"
      fontWeight="bold"
    >
      Spike
    </text>
    <defs>
      <filter
        id="filter0_d_817_1885"
        x="0.625"
        y="8.625"
        width="31.5"
        height="31.5"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="1.375" dy="1.375" />
        <feGaussianBlur stdDeviation="1.375" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_817_1885" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_817_1885" result="shape" />
      </filter>
      <filter
        id="filter1_if_817_1885"
        x="8.18337"
        y="13.8761"
        width="12.7047"
        height="21.03"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1.04238" />
        <feGaussianBlur stdDeviation="0.521191" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_817_1885" />
        <feGaussianBlur stdDeviation="0.130298" result="effect2_foregroundBlur_817_1885" />
      </filter>
    </defs>
  </svg>
);

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
  console.log(props);
  const { cx, cy, payload, stroke } = props;

  if (payload.significantIncrease) {
    return <SpikeDot cx={cx} cy={cy} fill="#ff0000" />;
  }

  return <circle cx={cx} cy={cy} r={4} stroke={stroke} strokeWidth={1} fill="#111111" />;
};

const CustomizedActiveDot = props => {
  const { cx, cy, payload } = props;

  if (payload.significantIncrease) {
    return <></>;
  }

  return <circle cx={cx} cy={cy} r={6} fill="#3053f9" />;
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

    // 혈당 스파이크가 발생했는지 확인하는 키를 넣어줌
    for (let i = 1; i < sortedData.length; i++) {
      sortedData[i].significantIncrease = sortedData[i].bloodsugar > sortedData[i - 1].bloodsugar * 1.2; // 20% increase
    }

    return sortedData;
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
    console.log(chartContainerRef.current);
    if (chartContainerRef.current) {
      chartContainerRef.current.scrollLeft = chartContainerRef.current.scrollWidth;
    }
    console.log(mainData);
  }, []);

  // 데이터 중 최대 혈당량을 구함 => reference line 위함
  const dataMax = Math.max(...mainData.map(d => d.bloodsugar));
  const dataMin = Math.min(...mainData.map(d => d.bloodsugar));
  const chartWidth = calculateChartWidth(mainData.length); // 동적으로 차트의 너비 계산

  console.log('mainData: ', getProcessedDataList(mainData));
  if (mainData.length > 1) {
    if (chartContainerRef.current) {
      chartContainerRef.current.scrollLeft = chartContainerRef.current.scrollWidth;
    }
    return (
      <div style={{ width: '100%', overflowX: 'auto', overflowY: 'hidden' }} ref={chartContainerRef}>
        <div style={{ width: `${chartWidth}px`, height: '275px' }}>
          <LineChart
            width={mainData.length <= 10 ? 700 : mainData.length * 100}
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
              interval="0"
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
              activeDot={<CustomizedActiveDot />}
            ></Line>
          </LineChart>
        </div>
      </div>
    );
  } else {
    return (
      <NoContentMainWrapper>
        <NoContentWrapper>
          <Icon></Icon>
          <NoContentText>
            아직 입력된 정보가 없어요. <br />
            날짜를 선택하고 혈당과 식단을 추가해주세요!
          </NoContentText>
        </NoContentWrapper>
      </NoContentMainWrapper>
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

const NoContentMainWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #f0f1f5;
  margin-bottom: 3vh;
  border-radius: 1rem;
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

export default MainBloodSugarChart;
