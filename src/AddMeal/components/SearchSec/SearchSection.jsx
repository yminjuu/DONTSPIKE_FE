import styled, { css } from 'styled-components';
import SearchBox from '../../../common/components/SearchBox';
import Datepicker from '../SearchSec/components/DatePicker';
import { useRecoilValue } from 'recoil';
import { modeState } from '../../../Recoil';

const SearchSection = ({ setSelectedDate, fetchMeal }) => {
  const mode = useRecoilValue(modeState);

  const onDateChange = startDate => {
    setSelectedDate(startDate);
  };

  return (
    <>
      <PageBackground>
        <TextWrapper>
          <DatePickSen mode={mode}>식단을 추가할 날짜를 선택해주세요!</DatePickSen>
          <Info mode={mode}>
            <TodayDate mode={mode}>
              <Datepicker onClick={onDateChange} className="datepicker" type="AddMeal" />
            </TodayDate>
            에 먹은 음식을 추가해주세요!
          </Info>
        </TextWrapper>
        <SearchBox type="SearchSection" fetchMeal={fetchMeal}></SearchBox>
      </PageBackground>
    </>
  );
};

const PageBackground = styled.div`
  width: 100%;
  height: 8.3rem;
  padding-top: 0.1rem;
  padding-bottom: 1rem;
  flex-shrink: 0;

  background-color: #ffffff;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 0.5rem;

  position: relative;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  gap: 0.5rem;

  position: absolute;
  top: -25%;
`;

const Info = styled.div`
  color: #414141;

  /* Pretendard/B/24 */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 0.5rem;
  align-items: center;

  /* position: absolute; */
  /* top: -10%; */
  z-index: 3;

  ${props =>
    props.mode === 'senior'
      ? css`
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
        `
      : css`
          font-size: 1.3rem;
          font-weight: 600;
        `}
`;

const TodayDate = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;
  flex-shrink: 0;

  /* Pretendard/B/24 */

  font-size: 1.3rem;
  font-weight: 600;

  text-align: center;
  line-height: 2rem;

  ${props =>
    props.mode === 'senior'
      ? css`
          background: #ecf1e7;
        `
      : css`
          background: #ebeeff;
        `}
`;

const DatePickSen = styled.div`
  color: #707070;

  ${props =>
    props.mode === 'senior'
      ? css`
          font-size: 1.5rem;
          font-weight: 700;
        `
      : css`
          font-size: 1rem;
          font-weight: 500;
        `}
`;

export default SearchSection;
