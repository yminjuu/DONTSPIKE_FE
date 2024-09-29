import React from 'react';
import { styled, css } from 'styled-components';
import ExpectTooltip from '../assets/ExpectTooltip.svg?react';
import MainTooltip from '../assets/MainToolTip.svg?react';
import SeniorMainToolTip from '../assets/MainToolTipSenior.svg?react';
import { useRecoilValue } from 'recoil';
import { modeState } from '../../Recoil';

// active: hover 이벤트로 툴팁이 활성화된 상황
// payload: tooltip에 띄울 정보를 props로 받음

const MainBSTooltip = ({ active, payload, label, isTomorrow }) => {
  const mode = useRecoilValue(modeState);

  if (active && payload.length > 0) {
    const data = payload[0].payload;

    // 내일 날짜인 경우
    if (isTomorrow(new Date(data.recorddate))) {
      // 내일 날짜임을 확인 => 예상 혈당으로
      return (
        <ExpectToolTipWrapper>
          <Container>
            {' '}
            <ExpectTooltip></ExpectTooltip>
            <BSText mode={mode} type="expect">
              {Math.floor(parseInt(payload[0].payload.expect))}
            </BSText>
          </Container>
        </ExpectToolTipWrapper>
      );
    }
    // 정상적으로 혈당/ 식단이 있는 경우
    else {
      return (
        <ToolTipWrapper>
          {mode === 'senior' ? <SeniorMainToolTip /> : <MainTooltip></MainTooltip>}
          <DateText>{data.tooltipDate}</DateText>
          <MealWrapper>
            {/* 식단 데이터가 있을 때에만 map하도록 */}
            {payload[0].payload.foodBsMappingId.length != 0 ? (
              data.foodBsMappingId.map(item => <MealText key={item.id}>{item}</MealText>)
            ) : (
              <></>
            )}
          </MealWrapper>
          <BSText mode={mode} bloodsugar={data.bloodsugar}>
            {data.bloodsugar}
          </BSText>
        </ToolTipWrapper>
      );
    }
  }

  return null;
};

const ToolTipWrapper = styled.div`
  position: relative;
  width: 10rem;
  height: 10rem;
`;

const ExpectToolTipWrapper = styled.div`
  position: relative;
  width: 3rem;
  height: 3rem;
`;

const MealWrapper = styled.div`
  width: 5.4rem;
  height: 5.8375rem;

  position: absolute;
  top: 40%;
  left: 28%;

  padding: 0.3rem;
`;

const Container = styled.div`
  position: absolute;
  top: -25%;
  left: -10%;
`;

const BSText = styled.div`
  position: absolute;

  font-size: 0.875rem;
  font-weight: 600;

  ${props =>
    props.type === 'expect'
      ? css`
          top: 35%;
          left: 60%;
        `
      : css`
          top: 25%;
          left: 60%;
        `}

  ${props =>
    props.mode === 'senior'
      ? css`
          color: #008116;
        `
      : css`
          color: #3053f9;
        `}
`;

const DateText = styled.div`
  color: #707070;
  font-size: 0.75rem;
  font-weight: 500;

  position: absolute;
  top: 11%;
  left: 30%;
`;

const MealText = styled.div`
  color: #111111;

  font-size: 0.85rem;
  font-weight: 500;
  line-height: 1.05rem;
`;

export default MainBSTooltip;
