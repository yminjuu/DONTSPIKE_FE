import React, { useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, LabelList } from 'recharts';
import MainBSToolTip from '../MainBS/MainBSToolTip';
import styled from 'styled-components';
import Icon from '../../common/assets/PencilIcon.svg?react';
import { useRecoilValue } from 'recoil';
import { modeState } from '../../Recoil';
import SpikeDot from './SpikeDot';

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

  useEffect(() => {
    mode === 'senior' ? (coreColor = '#6D986D') : (coreColor = '#3053f9'),
      mode === 'senior' ? (coreSubColor = '#ECF1E7') : (coreSubColor = '#D6DDFE');
  }, [mode]);

  // 데이터 중 최대 혈당량을 구함 => reference line 위함
  const dataMax = Math.max(...mainData.map(d => d.bloodsugar));
  const dataMin = Math.min(...mainData.map(d => d.bloodsugar));

  if (mainData.length > 1) {
    if (chartContainerRef.current) {
      chartContainerRef.current.scrollLeft = chartContainerRef.current.scrollWidth;
    }
    return (
      <div
        style={{ width: '100%', overflowX: 'scroll', display: 'flex', justifyContent: 'center' }}
        ref={chartContainerRef}
      >
        <div style={{ width: `100%`, height: '320px' }}>
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
