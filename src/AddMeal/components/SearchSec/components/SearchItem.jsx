import styled from 'styled-components';
import AddBtn from '../../../assets/AddButton.svg?react';
import AddDoneBtn from '../../../assets/AfterAddButton.svg?react';
import { useState } from 'react';
import FoodItem from '../../FoodItem';

// props로 정보 받아서 띄우기
// props: foodId, food_name, food_info, addedState, onClick(fetchMeal)
const SearchItem = props => {
  return (
    <>
      <SearchItemWrapper>
        <FoodItem {...props}></FoodItem>
      </SearchItemWrapper>
    </>
  );
};

const SearchItemWrapper = styled.div`
  height: 6.66rem;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default SearchItem;
