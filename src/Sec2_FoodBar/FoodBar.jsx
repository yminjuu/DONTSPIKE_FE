import FoodBarChart from '../Graphs/components/FoodBarChart';
import { css, styled } from 'styled-components';
import { commonGraphWrapper } from '../common/styles/commonStyles';
import { commonChartTitle } from '../common/styles/commonStyles';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { modeState } from '../Recoil';

const FoodBar = ({ token }) => {
  const seniorMode = useRecoilValue(modeState);
  return (
    <Container>
      <DescriptWrapper>
        <Description mode={seniorMode}>
          최근 가장 많이 섭취한 음식 위주로 보여드릴게요.
          <br />
          음식을 섭취할 때 도움이 될만한 팁도 함께 참고해보세요!
        </Description>
      </DescriptWrapper>
      <ChartWrapper>
        {/* 설명 */}
        <FoodBarChart token={token}></FoodBarChart>
      </ChartWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
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
`;

export default FoodBar;
