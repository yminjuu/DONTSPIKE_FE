import styled, { css } from 'styled-components';
import AddBtn from '../assets/AddButton.svg?react';
import AddDoneBtn from '../assets/AfterAddButton.svg?react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { modeState } from '../../Recoil';

// props: foodId, foodName, addedStatem fetchMeal

const FoodItem = ({ foodDataId, foodName, addedState, fetchMeal }) => {
  const [added, setAdd] = useState(false);
  const mode = useRecoilValue(modeState);

  // 음식 추가됨
  const onAddBtnClick = () => {
    if (added === false) {
      fetchMeal(foodDataId).then(result => {
        setAdd(true);
      });
      // 식단 추가 버튼이 눌린 경우임 => 식단 추가 POST
    }
  };

  return (
    <>
      <InfoWrapper>
        <FoodTitle mode={mode}>{foodName}</FoodTitle>
      </InfoWrapper>
      <AddBtnWrapper mode={mode} onClick={onAddBtnClick}>
        {mode !== 'senior' ? (
          added === true ? (
            <AddDoneBtn></AddDoneBtn>
          ) : (
            <AddBtn></AddBtn>
          )
        ) : added === true ? (
          <SeniorBtn mode={mode} added={added}>
            추가 완료
          </SeniorBtn>
        ) : (
          <SeniorBtn mode={mode} added={added}>
            추가하기
          </SeniorBtn>
        )}
      </AddBtnWrapper>
    </>
  );
};

// AddDoneBtn: 이미 추가됨
// AddBtn: 추가 안 됨

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  margin-left: 2rem;
`;

const FoodTitle = styled.div`
  color: #111111;

  font-size: 1.125rem;
  font-weight: 600;

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

const AddBtnWrapper = styled.div`
  cursor: pointer;
  margin-right: 1.7rem;
`;

const SeniorBtn = styled.button`
  border: none;
  font-size: 1.6rem;
  font-weight: 700;
  width: 8rem;
  height: 4rem;
  border-radius: 1rem;

  ${props =>
    props.added === false
      ? css`
          background-color: #548a54;
          color: #fff;
        `
      : css`
          background-color: #ecf1e7;
        `}
`;

export default FoodItem;
