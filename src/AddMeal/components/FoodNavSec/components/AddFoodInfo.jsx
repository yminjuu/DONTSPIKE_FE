import { css, styled } from 'styled-components';
import AddFoodDoneBtn from '../assets/AddFoodDoneBtn.svg?react';
import AddFoodBtn from '../assets/AddFoodBtn.svg?react';
import DisableBtn from '../assets/AddFoodBtnDisable.svg?react';
import ResetBtn from '../assets/ResetBtn.svg?react';
import Horizon from '../assets/Horizon.svg?react';
import Essential from '../assets/Essential.svg?react';
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { modeState } from '../../../../Recoil';

// 직접 음식 등록하기
// 직접 음식 등록하기
const AddFoodInfo = ({ onClick }) => {
  const mode = useRecoilValue(modeState);

  const [foodname, setFoodname] = useState('');
  const [nutritionInfo, setNutritionInfo] = useState({
    amount: '',
    calorie: '',
    carbohydrate: '',
    protein: '',
    fat: '',
  });

  // 음식 이름이 입력되어야만 버튼이 활성화되도록
  const foodNameRef = useRef();
  const [regstate, setRegState] = useState(false);

  const onContentChange = e => {
    setFoodname(e.target.value);
    if (regstate === true) setRegState(false);
  };

  const onNutritionChange = (e, type) => {
    setNutritionInfo(prev => ({ ...prev, [type]: e.target.value }));
  };

  const onRegBtn = () => {
    if (foodname !== '') {
      onClick({
        foodname,
        ...nutritionInfo,
      });
      setFoodname('');
      setRegState(true);
      setNutritionInfo({
        amount: '',
        calorie: '',
        carbohydrate: '',
        protein: '',
        fat: '',
      });
    }
  };

  const onResetBtn = () => {
    setFoodname('');
    setNutritionInfo({
      amount: '',
      calorie: '',
      carbohydrate: '',
      protein: '',
      fat: '',
    });
    setRegState(false);
  };

  const FormInfo = [
    { type: 'amount', index: '내용량', unit: 'g' },
    { type: 'calorie', index: '칼로리', unit: 'kcal' },
    { type: 'carbohydrate', index: '탄수화물', unit: 'g' },
    { type: 'protein', index: '단백질', unit: 'g' },
    { type: 'fat', index: '지방', unit: 'g' },
  ];

  return (
    <Wrapper>
      <ResetWrapper mode={mode} onClick={onResetBtn}>
        <ResetBtn></ResetBtn>
        입력 초기화
      </ResetWrapper>
      <TitleWrapper>
        <TitleTextWrapper>
          <TitleText mode={mode}>음식명</TitleText>
          <Essential />
          {/* 필수 입력 항목 명시 아이콘 */}
        </TitleTextWrapper>
        <BigInput type="name" ref={foodNameRef} onChange={onContentChange} value={foodname}></BigInput>
      </TitleWrapper>
      <HorizonWrapper>
        <Horizon></Horizon>
        <HorizonText mode={mode}>영양정보</HorizonText>
        <Horizon></Horizon>
      </HorizonWrapper>
      {/* 영양정보 horizon  */}
      <InfoWrapper>
        <IndexWrapper>
          {FormInfo.map(item => (
            // React.Fragment를 사용하면 여러개의 태그를 map함수를 통해 반환할 수 있다.
            <Text mode={mode} key={item.index}>
              {item.index}
              {item.index === '내용량' ? (
                <LittleText mode={mode}>1인분을 기준으로 내용량을 입력해주세요.</LittleText>
              ) : (
                <></>
              )}
            </Text>
          ))}
        </IndexWrapper>
        <InputWrapper>
          {FormInfo.map(item => (
            <div style={{ display: 'flex' }}>
              <SmallInput
                key={item.type}
                type="number"
                onChange={e => onNutritionChange(e, item.type)}
                value={nutritionInfo[item.type]}
              />
              <Unit>{item.unit}</Unit>
            </div>
          ))}
        </InputWrapper>
      </InfoWrapper>
      <ButtonWrapper onClick={onRegBtn}>
        {regstate === true ? (
          <AddFoodDoneBtn></AddFoodDoneBtn>
        ) : foodname !== '' ? (
          <AddFoodBtn></AddFoodBtn>
        ) : (
          <DisableBtn></DisableBtn>
        )}
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  background-color: #ffffff;
  border-radius: 0.625rem;
`;

const ResetWrapper = styled.div`
  cursor: pointer;

  width: 35rem;
  height: 0.9rem;
  display: flex;
  flex-direction: row;
  justify-content: right;
  gap: 0.2rem;

  padding-top: 1rem;
  padding-right: 2.5rem;

  color: #707070;

  /* Pretendard/Md/12 */

  ${props =>
    props.mode === 'senior'
      ? css`
          font-size: 1.1rem;
          font-weight: 700;
        `
      : css`
          font-size: 0.75rem;
          font-weight: 500;
        `}
`;

const TitleWrapper = styled.div`
  height: 2rem;
  margin-top: 1rem;
  padding-left: 3.5rem;

  display: flex;
  justify-content: flex-start;
  gap: 0.9rem;
`;

const TitleTextWrapper = styled.div`
  height: 3rem;
  color: #111111;

  /* Pretendard/Sb/18 */

  font-size: 1.125rem;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  justify-content: left;
`;

const HorizonWrapper = styled.div`
  height: 2rem;
  margin: 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HorizonText = styled.div`
  color: var(--Grayscale-40, #a0a0a0);

  /* Pretendard/Md/12 */

  padding: 0.8rem;

  ${props =>
    props.mode === 'senior'
      ? css`
          font-size: 1rem;
          font-weight: 700;
        `
      : css`
          font-size: 0.75rem;
          font-weight: 500;
        `}
`;

const InfoWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;

const IndexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  margin-left: 3.5rem;
  width: 50%;
`;

const InputWrapper = styled.div`
  width: 50%;
  height: 17rem;
  display: flex;
  flex-direction: column;
  gap: 0.88rem;

  margin-right: 2rem;
  margin-bottom: 1rem;
`;

const TitleText = styled.span`
  color: #111111;

  text-align: center;
  line-height: 2.5rem;

  ${props =>
    props.mode === 'senior'
      ? css`
          font-size: 1.7rem;
          font-weight: 700;
        `
      : css`
          font-size: 1.125rem;
          font-weight: 600;
        `}
`;

const Text = styled.div`
  height: 2.5rem;
  color: #111111;

  text-align: left;

  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  ${props =>
    props.mode === 'senior'
      ? css`
          font-size: 1.6rem;
          font-weight: 700;
        `
      : css`
          font-size: 1.125rem;
          font-weight: 600;
        `}
`;

const LittleText = styled.div`
  display: inline-block;
  color: #707070;

  /* Pretendard/Md/12 */

  ${props =>
    props.mode === 'senior'
      ? css`
          font-size: 0.9rem;
          font-weight: 500;
        `
      : css`
          font-size: 0.7rem;
          font-weight: 400;
        `}
`;
const BigInput = styled.input`
  outline: none;
  border: none;
  box-sizing: border-box;

  display: flex;
  width: 80%;
  height: 3rem;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  background-color: transparent;
  border: 1px solid #a0a0a0;
  border-radius: 1rem;

  text-align: left;
`;

const SmallInput = styled.input`
  outline: none;
  border: none;

  display: flex;
  height: 2.1rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  border: 1px solid #a0a0a0;
  border-radius: 1rem;

  color: #111111;

  font-size: 0.8rem;
  font-weight: 400;
  text-align: left;
  padding: 0.2rem 1rem;
`;

const Unit = styled.span`
  height: 2.5rem;
  color: #707070;

  /* Pretendard/Md/14 */

  font-size: 0.875rem;
  font-weight: 500;
  line-height: 2.5rem;

  margin-left: 0.2rem;

  text-align: left;
`;

const ButtonWrapper = styled.div`
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 1rem;
`;

export default AddFoodInfo;
