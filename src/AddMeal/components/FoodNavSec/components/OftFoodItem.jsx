import styled from 'styled-components';
import FoodItem from '../../FoodItem';

// 자주 먹은 음식 아이템
// props: food_name, food_info, addedState
const OftFoodItem = props => {
  return (
    <>
      <ItemWrapper>
        <FoodItem {...props}></FoodItem>
      </ItemWrapper>
    </>
  );
};

const ItemWrapper = styled.div`
  height: 5rem;
  width: 40rem;
  flex-shrink: 0;

  border-radius: 0.625rem;
  background: #fff;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default OftFoodItem;
