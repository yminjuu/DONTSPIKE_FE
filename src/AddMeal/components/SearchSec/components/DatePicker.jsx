import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState, useEffect } from 'react';
import { styled, css } from 'styled-components';
import { forwardRef } from 'react';
import '../styles/Datepicker.css';
import { ko } from 'date-fns/locale';
import { IoIosArrowDown } from 'react-icons/io'; // 아이콘 임포트
import { IoIosArrowUp } from 'react-icons/io';
import { useRecoilValue } from 'recoil';
import { modeState } from '../../../../Recoil';

const Datepicker = ({ onClick }) => {
  // default 값: 현재 날짜
  const [startDate, setStartDate] = useState(new Date());
  const mode = useRecoilValue(modeState);

  const CustomInput = forwardRef(({ value, onClick, className }, ref) => (
    <div className={className} style={{ display: 'flex', alignItems: 'center' }}>
      <CustomInputBtn mode={mode} onClick={onClick} ref={ref}>
        {value}
      </CustomInputBtn>
      <IoIosArrowDown onClick={onClick} style={{ marginLeft: '5px', cursor: 'pointer' }} /> {/* 아이콘 추가 */}
    </div>
  ));

  // 부모 컴포넌트에게 선택된 date 전달
  useEffect(() => {
    onClick(startDate);
  }, [startDate]);

  return (
    <>
      <AddMealWrapper $type="AddMeal" mode={mode}>
        <CustomDatePicker
          mode={mode}
          locale={ko}
          dateFormat=" M / d" /* 버튼에 명시되는 날짜 형식 커스텀*/
          selected={startDate} /* default 선택된 date 값*/
          maxDate={new Date()}
          onChange={date => setStartDate(date)} /* 날짜 선택 이벤트 */
          popperPlacement="bottom"
          customInput={<CustomInput className="customInput" />} /* input 디자인을 커스텀 */
        />{' '}
      </AddMealWrapper>
    </>
  );
};

const AddMealWrapper = styled.div`
  width: 5.5rem;
  height: 2.5rem;
  text-align: center;

  ${props =>
    props.mode === 'senior'
      ? css`
          background-color: #ecf1e7;
          box-shadow: 0px 2px 2px 2px #c6cac2;
        `
      : css`
          background-color: #ebeeff;
          box-shadow: 0px 2px 2px 2px #d7ddff;
        `}
`;

const CustomInputBtn = styled.button`
  outline: none;
  border: none;

  color: #111111;
  font-size: 1.2rem;
  font-weight: 600;

  ${props =>
    props.mode === 'senior'
      ? css`
          background: #ecf1e7;
        `
      : css`
          background: #ebeeff;
        `}
`;

const CustomDatePicker = styled(DatePicker)`
  width: 5.5rem;
  height: 2.5rem;
  box-sizing: border-box;
  border-radius: 0.625rem;
  border: none;

  color: #414141;
  font-family: 'Segoe UI';
  font-size: 1.22rem;
  font-weight: 600;
  letter-spacing: 0.03rem;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  cursor: pointer;

  ${props =>
    props.mode === 'senior'
      ? css`
          background-color: #ecf1e7;
        `
      : css`
          background-color: #ebeeff;
        `}
`;
export default Datepicker;
