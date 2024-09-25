import React, { useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, LabelList } from 'recharts';
import MainBSToolTip from '../MainBS/MainBSToolTip';
import styled from 'styled-components';
import Icon from '../../common/assets/PencilIcon.svg?react';
import { useRecoilValue } from 'recoil';
import { modeState } from '../../Recoil';

var coreSubColor;
var coreColor;

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

const SpikeDot = ({ cx, cy, fill }) => (
  <svg
    x={cx - 12.5} // cx와 cy가 SVG 중앙에 위치하도록 조정
    y={cy - 17.5}
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <text
      x="10" // 텍스트의 x 좌표를 동그라미 중앙으로 맞춤
      y="40" // 텍스트의 y 좌표를 동그라미 위로 배치
      textAnchor="middle"
      fill="#D33F3F"
      fontSize="10"
      dx=".5em"
      dy=".1em"
      fontWeight="bold"
    >
      SPIKE!
    </text>
    <g filter="url(#filter0_i_1404_2810)">
      <circle cx="13" cy="13.6487" r="13" fill="#D33F3F" />
    </g>
    <g filter="url(#filter1_if_1404_2810)">
      <path
        d="M6.53558 14.4451L15.2806 3.929C15.5457 3.61022 16.0598 3.86622 15.9651 4.26988L14.2234 11.6979C14.1685 11.932 14.3348 12.16 14.5745 12.1792L18.2654 12.4744C18.5846 12.5 18.7408 12.8761 18.5336 13.1202L9.83339 23.3721C9.56478 23.6886 9.05272 23.4264 9.15252 23.0235L10.9968 15.5765C11.0582 15.3287 10.8707 15.0892 10.6155 15.0892H6.83764C6.50475 15.0892 6.32273 14.7011 6.53558 14.4451Z"
        fill="#F89E9E"
      />
    </g>
    <defs>
      <filter
        id="filter0_i_1404_2810"
        x="0"
        y="0.648682"
        width="27.375"
        height="27.375"
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
        <feOffset dx="1.375" dy="1.375" />
        <feGaussianBlur stdDeviation="1.375" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1404_2810" />
      </filter>
      <filter
        id="filter1_if_1404_2810"
        x="6.18337"
        y="3.52493"
        width="12.7047"
        height="21.0302"
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
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1404_2810" />
        <feGaussianBlur stdDeviation="0.130298" result="effect2_foregroundBlur_1404_2810" />
      </filter>
    </defs>
  </svg>
);

const CustomizedDot = props => {
  const { cx, cy, stroke, payload } = props;
  const date = new Date();
  const indexDate = new Date(payload.recorddate);

  if (payload.isLast === true) {
    return <circle cx={cx} cy={cy} r={4} stroke={stroke} strokeWidth={1} fill={coreSubColor} />;
    // 내일 날짜와 동일하면 띄우도록 설정을 해두었음.
  } else return <></>;
};

const CustomizedRegularDot = props => {
  const { cx, cy, payload, stroke } = props;

  if (payload.significantIncrease) {
    return <SpikeDot cx={cx} cy={cy} fill="#ff0000" />;
  }

  return <circle cx={cx} cy={cy} r={4} stroke={stroke} strokeWidth={1} fill="#111111" />;
};

const CustomizedActiveDot = props => {
  const { cx, cy, payload } = props;
  console.log(coreColor);

  if (payload.significantIncrease) {
    return <></>;
  }

  return <circle cx={cx} cy={cy} r={6} fill={coreColor} />;
};

const MainBloodSugarChart = ({ mainData }) => {
  const mode = useRecoilValue(modeState);

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
    mode === 'senior' ? (coreColor = '#6D986D') : (coreColor = '#3053f9'),
      mode === 'senior' ? (coreSubColor = '#ECF1E7') : (coreSubColor = '#D6DDFE');
    if (chartContainerRef.current) {
      chartContainerRef.current.scrollLeft = chartContainerRef.current.scrollWidth;
    }
  }, []);

  // 데이터 중 최대 혈당량을 구함 => reference line 위함
  const dataMax = Math.max(...mainData.map(d => d.bloodsugar));
  const dataMin = Math.min(...mainData.map(d => d.bloodsugar));
  const chartWidth = calculateChartWidth(mainData.length); // 동적으로 차트의 너비 계산

  if (mainData.length > 1) {
    if (chartContainerRef.current) {
      chartContainerRef.current.scrollLeft = chartContainerRef.current.scrollWidth;
    }
    return (
      <div
        style={{ width: '100%', overflowX: 'auto', overflowY: 'hidden', display: 'flex', justifyContent: 'center' }}
        ref={chartContainerRef}
      >
        <div style={{ width: `${chartWidth}px`, height: '320px' }}>
          <LineChart
            width={mainData.length <= 10 ? 700 : mainData.length * 100}
            height={300}
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
                stroke={coreSubColor}
                strokeWidth={2}
                strokeDasharray="5 5" // 점선 설정
                dot={<CustomizedDot coreColor={coreColor} />}
                activeDot={{ r: 6, fill: coreColor, strokeWidth: 0 }}
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
              activeDot={<CustomizedActiveDot coreColor={coreColor} />}
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

const NoContentMainWrapper = styled.div`
  width: 100%;
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
