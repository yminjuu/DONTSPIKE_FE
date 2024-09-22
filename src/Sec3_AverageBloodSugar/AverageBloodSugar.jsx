import AverageBloodSugarChart from '../Graphs/components/AverageBloodSugarChart';
import styled from 'styled-components';
import { commonGraphWrapper } from '../common/styles/commonStyles';
import { useEffect } from 'react';

const AverageBloodSugar = ({ fetchAverageData, averageData, offset }) => {
  useEffect(() => {}, [offset]);
  console.log('averageData', averageData);
  return (
    <Container>
      <ChartWrapper>
        <GraphWrapper>
          <AverageBloodSugarChart
            fetchAverageData={fetchAverageData}
            averageData={averageData}
          ></AverageBloodSugarChart>
        </GraphWrapper>
      </ChartWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 3vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #ffffff;
`;

const ChartWrapper = styled.div`
  ${commonGraphWrapper}
  width: 43.75rem;
  height: 21.75rem;
  flex-shrink: 0;
`;

const GraphWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export default AverageBloodSugar;
