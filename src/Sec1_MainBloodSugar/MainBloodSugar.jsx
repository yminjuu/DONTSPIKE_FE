import MainBloodSugarChart from '../Graphs/components/MainBloodSugarChart';
import { commonGraphWrapper } from '../common/styles/commonStyles';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import RecordBloodSugar from './components/RecordBloodSugar';
import ReactDOM from 'react-dom';
import AddMealIc from '../Sec1_MainBloodSugar/assets/AddMealIcon.png';
import { useRecoilValue } from 'recoil';
import { modeState } from '../Recoil';

const MainBloodSugar = ({ setBS, mainData }) => {
  // 특정 action이 발생했을 때 어떤 주소로 이동할 수 있게 해준다.
  const navigate = useNavigate();

  const seniorMode = useRecoilValue(modeState);

  return (
    <Container>
      {/* 제목 */}
      {/* 상단: 그래프 설명 & 식단 추가하기 버튼 */}
      <Graph_DiscriptSec>
        <InfoWrapper>
          <AddInfo mode={seniorMode}>
            8시간 공복 후의 <AddSpan mode={seniorMode}>아침 공복 혈당</AddSpan>을 추가해주세요.
            <br />
            <AddSpan mode={seniorMode}>식단</AddSpan>도 함께 추가하시면 더욱 정확한 기록이 가능합니다.
          </AddInfo>
        </InfoWrapper>
        <ButtonWrapper>
          <RealBtn
            mode={seniorMode}
            onClick={() => {
              navigate(`/addMeal`);
            }}
          >
            식단 추가하기
          </RealBtn>
          <AddMealIcon mode={seniorMode} src={AddMealIc} />
        </ButtonWrapper>
      </Graph_DiscriptSec>
      {/* 동일 레벨에 그래프 & 혈당 기록하기 */}
      <ChartWrapper>
        <MainBloodSugarChart mainData={mainData} />
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
  flex: 1;
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

  font-size: 1rem;
  font-weight: 350;
  opacity: var(--sds-size-stroke-border);

  ${props =>
    props.mode === 'senior'
      ? css`
          font-size: 1.5rem;
          font-weight: 400;
        `
      : css``}
`;

const ButtonWrapper = styled.div`
  width: 91.5%;
  height: 2.5rem;
  flex-shrink: 0;

  display: flex;
  justify-content: flex-end;

  position: relative;
`;

const RealBtn = styled.div`
  cursor: pointer;
  background-color: #3053f9;
  height: 100%;
  width: 8rem;

  border-radius: 2rem;
  color: #fff;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;

  ${props =>
    props.mode === 'senior'
      ? css`
          font-size: 1.3rem;
          font-weight: 430;
          width: 10rem;
          height: 3rem;
        `
      : css`
          font-size: 1rem;
          font-weight: 350;
        `}
`;

const AddSpan = styled.span`
  opacity: var(--sds-size-stroke-border);
  color: var(--Primary-100, #3053f9);

  /* Pretendard/Md/16 */

  font-size: 1rem;
  font-weight: 350;

  ${props =>
    props.mode === 'senior'
      ? css`
          font-size: 1.5rem;
          font-weight: 430;
        `
      : css``}
`;

const AddMealIcon = styled.img`
  width: 4.5rem;
  height: 4.5rem;

  position: absolute;
  right: -50px;
  top: -20px;

  ${props =>
    props.mode === 'senior'
      ? css`
          width: 6rem;
          height: 6rem;
          right: -70px;
        `
      : css``}
`;

export default MainBloodSugar;
