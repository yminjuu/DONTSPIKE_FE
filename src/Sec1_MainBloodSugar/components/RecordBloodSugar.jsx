import styled from 'styled-components';
import Button_before from '../assets/imgs/RecordBSBtn_Before.svg?react';
import Button_ok from '../assets/imgs/RecordBSBtn_OK.svg?react';
import Datepicker from './Datepicker';
import { useEffect, useState } from 'react';
import axios from 'axios';

const RecordBloodSugar = ({ setBS }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const user_id = 1;
  // 입력된 혈당값 관리
  const [text, setText] = useState('');

  // 선택된 날짜 관리
  const [selectedDate, setDate] = useState(new Date());

  // 혈당 입력시
  const onBSInput = e => {
    setText(e.target.value);
  };

  function formatDateToISOString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  // 혈당 입력 확인시 데이터 fetch
  const fetchNewBS = async () => {
    try {
      //http://api.donspike.store/api/1/blood-sugar?date=2024-08-02T12:00:00&bloodsugar=120.1
      console.log('혈당입력: ', formatDateToISOString(selectedDate));
      const isoDate = new Date(selectedDate).toISOString();
      console.log(isoDate);
      const res = await axios.post(
        `${BASE_URL}/api/${user_id}/blood-sugar?date=${formatDateToISOString(selectedDate)}&bloodsugar=${text}`,
      );

      if (res.status === 200) {
        console.log('혈당 입력 완료');

        setBS(text); // props로 전달받은 state 변경함수 실행 => 그래프 리렌더링되도록
        setText(''); // 입력 혈당 초기화
        setStartDate(new Date()); // 선택 날짜 초기화
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log(error);
      }
      console.log(error);
    }
  };

  return (
    <>
      <Wrapper>
        <Title>혈당 기록하기</Title>
        <LabelInput>
          <div>날짜</div>
          <Datepicker selectedDate={selectedDate} setDate={setDate}></Datepicker>
        </LabelInput>
        <LabelInput>
          <div>혈당</div>
          <InputWrapper>
            <BSInput onChange={onBSInput} value={text} type="number"></BSInput>
            <span>mg/dL</span>
          </InputWrapper>
        </LabelInput>
        <ButtonContainer>
          <ButtonWrapper>
            {text == '' ? <StyledBtn_Before></StyledBtn_Before> : <StyledBtn_OK onClick={fetchNewBS}></StyledBtn_OK>}
          </ButtonWrapper>
        </ButtonContainer>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 27%;
  height: 19rem;
  flex-shrink: 0;
  margin: 2.31rem 2.87rem 2.88rem 1rem;
  padding: 1.69rem 1.25rem 0.88rem 2.69rem;

  border-radius: 0.625rem;
  background: #fff;
  /* drop-shadow */
  box-shadow: 2px 4px 10px 2px var(--Grayscale-10, #e8e8e8);

  display: flex;
  flex-direction: column;
  align-items: left;
`;

const Title = styled.div`
  color: #111111;

  /* Pretendard/Sb/18 */

  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 2.3rem;
`;

const LabelInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  color: #414141;

  /* Pretendard/Sb/14 */

  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
`;

const InputWrapper = styled.div`
  height: 2.5rem;

  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;

  color: #414141;

  /* Pretendard/Sb/16 */

  font-size: 1rem;
  font-weight: 500;
`;

const BSInput = styled.input`
  box-sizing: content-box;
  width: 6.25rem;
  height: 2.5rem;
  color: #414141;

  font-size: 0.875rem;
  font-weight: 600;
  background-color: #f0f1f5;
  border-radius: 10px;
  border: none;
  outline: none;
  text-align: center;

  &::placeholder {
    color: #414141;

    /* Pretendard/Sb/14 */

    font-size: 0.875rem;
    font-weight: 500;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 2.5rem;

  display: flex;
  justify-content: right;
  margin-top: 0.8rem;
`;

const ButtonWrapper = styled.div`
  height: 2.5rem;
  cursor: pointer;
`;

const StyledBtn_OK = styled(Button_ok)``;

const StyledBtn_Before = styled(Button_before)`
  cursor: default;
`;
export default RecordBloodSugar;
