import styled from 'styled-components';
import Button_before from '../assets/RecordBSBtn_Before.svg?react';
import Button_ok from '../assets/RecordBSBtn_OK.svg?react';
import Datepicker from './Datepicker';
import { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const RecordBloodSugar = ({ setBS }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const BASE_URL = import.meta.env.VITE_BASE_URL;
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
      console.log('fetch');
      console.log(selectedDate);
      console.log(localStorage.getItem('token'));
      const res = await axios.post(
        `${BASE_URL}/api/blood-sugar?date=${formatDateToISOString(selectedDate)}&bloodsugar=${text}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          withCredentials: true, // 쿠키 포함?..
        },
      );
      console.log(res);

      if (res.status === 200) {
        setBS(text); // props로 전달받은 state 변경함수 실행 => 그래프 리렌더링되도록
        setText(''); // 입력 혈당 초기화
        setDate(new Date()); // 선택 날짜 초기화
        setModalIsOpen(true); // 모달 열기
        console.log(res);
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            borderRadius: '10px',
            width: '300px',
            textAlign: 'center',
          },
        }}
      >
        <ModalTitle>혈당 입력이 완료됐어요!</ModalTitle>
        <CloseBtnWrapper>
          <StyledButton onClick={closeModal}>닫기</StyledButton>
        </CloseBtnWrapper>
      </Modal>
    </>
  );
};

const Wrapper = styled.div`
  width: 22%;
  height: 17.5rem;
  flex-shrink: 0;
  margin: 0rem 1rem 0rem 1rem;
  padding: 1.5rem 1.5rem 0.88rem 2rem;

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

const CloseBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.div`
  margin-top: 1rem;
  padding: 0.5rem;
  width: 5rem;
  border-radius: 1rem;
  font-size: 0.9rem;

  background-color: #d6ddfe;
`;

const ModalTitle = styled.div`
  color: #111111;

  font-size: 1rem;
  font-weight: 500;
`;
export default RecordBloodSugar;
