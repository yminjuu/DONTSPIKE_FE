import MainBloodSugarChart from '../Graphs/components/MainBloodSugarChart';
import { commonGraphWrapper } from '../common/styles/commonStyles';
import styled from 'styled-components';
import AddMealButton from './assets/AddMealButton.svg?react';
import { useNavigate } from 'react-router-dom';
import RecordBloodSugar from './components/RecordBloodSugar';
import ReactDOM from 'react-dom';
import AddMealIc from '../Sec1_MainBloodSugar/assets/AddMealIcon.png';

const MainBloodSugar = ({ setBS, fetchMainChartData, mainData }) => {
  // 특정 action이 발생했을 때 어떤 주소로 이동할 수 있게 해준다.
  const navigate = useNavigate();

  return (
    <Container>
      {/* 제목 */}
      {/* 상단: 그래프 설명 & 식단 추가하기 버튼 */}
      <Graph_DiscriptSec>
        <InfoWrapper>
          <AddInfo>
            8시간 공복 후의 <AddSpan>아침 공복 혈당</AddSpan>을 추가해주세요.
            <br />
            <AddSpan>식단</AddSpan>도 함께 추가하시면 더욱 정확한 기록이 가능합니다.
          </AddInfo>
        </InfoWrapper>
        <ButtonWrapper
          role="button"
          onClick={() => {
            navigate(`/addMeal`);
          }}
        >
          <AddMealButton>식단 추가하기</AddMealButton>
          <AddMealIcon src={AddMealIc} />
        </ButtonWrapper>
      </Graph_DiscriptSec>
      {/* 동일 레벨에 그래프 & 혈당 기록하기 */}
      <ChartWrapper>
        <MainBloodSugarChart fetchMainChartData={fetchMainChartData} mainData={mainData} />
        <RecordBloodSugar setBS={setBS}></RecordBloodSugar>
      </ChartWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 3vh;
  background-color: #ffffff;

  display: flex;
  flex-direction: column;
`;

const ChartWrapper = styled.div`
  ${commonGraphWrapper}
  flex-shrink: 0;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  padding: 1rem 1.5rem;
`;

// 설명/ 식단추가하기 / 그래프 섹션
const Graph_DiscriptSec = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 1rem 2rem;
`;

// 설명 + 식단 추가 버튼의 wrapper
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 0.5rem;
`;

const AddInfo = styled.div`
  color: var(--Grayscale-80, #414141);

  /* Pretendard/Md/16 */

  font-size: 1.15rem;
  font-weight: 350;
  opacity: var(--sds-size-stroke-border);
`;

const ButtonWrapper = styled.div`
  width: 91.5%;
  cursor: pointer;
  height: 2.375rem;
  flex-shrink: 0;

  display: flex;
  justify-content: flex-end;

  position: relative;
`;

const AddSpan = styled.span`
  opacity: var(--sds-size-stroke-border);
  color: var(--Primary-100, #3053f9);

  /* Pretendard/Md/16 */

  font-size: 1.15rem;
  font-weight: 350;
`;

const AddMealIcon = styled.img`
  width: 4.5rem;
  height: 4.5rem;

  position: absolute;
  right: -50px;
  top: -20px;
`;
export default MainBloodSugar;
