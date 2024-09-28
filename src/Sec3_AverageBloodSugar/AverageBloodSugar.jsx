import AverageBloodSugarChart from '../Graphs/components/AverageBloodSugarChart';
import { styled, css } from 'styled-components';
import { commonGraphWrapper } from '../common/styles/commonStyles';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { favFoodState, modeState } from '../Recoil';

const AverageBloodSugar = ({ averageData, offset }) => {
  useEffect(() => {}, [offset]);

  const seniorMode = useRecoilValue(modeState);
  return (
    <Container>
      <DescriptWrapper>
        <Description mode={seniorMode}>
          기록하신 혈당 수치를 바탕으로 산출한 월별 평균값이에요.
          <br />
          그래프를 바탕으로 혈당 관리가 잘 되어가는지 한번 검토해보시는건 어때요?
        </Description>
      </DescriptWrapper>
      <ChartWrapper averageDataLength={averageData.length}>
        <AverageBloodSugarChart averageData={averageData} />
      </ChartWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  background-color: #ffffff;
`;

const DescriptWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  box-sizing: border-box;
  padding: 2rem;
`;

const Description = styled.div`
  color: var(--Grayscale-80, #414141);

  /* Pretendard/Md/16 */

  font-size: 1rem;
  font-weight: 350;
  line-height: 1.3rem;

  ${props =>
    props.mode === 'senior'
      ? css`
          font-size: 1.5rem;
          font-weight: 400;
          line-height: 1.6rem;
        `
      : css``}
`;

const ChartWrapper = styled.div`
  ${commonGraphWrapper}
  flex-shrink: 0;

  ${props =>
    props.averageDataLength === 0
      ? css`
          width: 80%;
        `
      : css``}
`;

export default AverageBloodSugar;
