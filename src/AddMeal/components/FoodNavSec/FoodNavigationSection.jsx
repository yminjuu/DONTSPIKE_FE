import { useEffect, useState } from 'react';
import { css, styled } from 'styled-components';
import OftFoodItem from '../FoodNavSec/components/OftFoodItem';
import AddFoodInfo from '../FoodNavSec/components/AddFoodInfo';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../Recoil';

const compare = (a, b) => {
  return parseInt(b.count) - parseInt(a.count);
};

const FoodNavigationSection = ({ selectedDate, fetchMeal }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const user = useRecoilValue(userState);

  // 자주 먹은 음식 데이터
  const [favFood, setFavFood] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/food/favorites/${user}`);
      console.log('자주 먹은 음식 API 결과 : ', data);

      const updatedData = data.map(item => ({
        ...item,
        foodId: item.foodDataId,
        addedState: false,
      }));

      const finalData = updatedData.sort(compare);

      setFavFood(finalData);
    } catch (error) {
      console.log(error);
    }
  };

  // 최초 렌더링 데이터 가져오기
  useEffect(() => {
    fetchData();
  }, []);

  const [navstate, setNavstate] = useState('freq');
  // 어떤 nav를 선택했는지 관리 : freq, onHand

  // nav 변경 관리
  const onNavClick = navkey => {
    if (navstate === 'freq' && navkey === 'onHand') {
      // API GET : 자주 먹었어요! 데이터 받아서 알맞게 뿌리기
      setNavstate('onHand');
    } else if (navstate === 'onHand' && navkey === 'freq') {
      setNavstate('freq');
    }
  };

  // 직접 음식 등록
  const onFoodReg = async ({ foodname }) => {
    try {
      console.log('음식 등록', foodname);
      const food = foodname;
      const res = await axios.post(`${BASE_URL}/api/food`, {
        foodname: food,
      });

      console.log('음식 등록 완료 ', res);
    } catch (error) {
      console.log('에러 발생: ', error);
      if (error.response && error.response.status === 404) {
        console.log('음식 등록 실패');
      }
    }
  };

  return (
    <>
      <PageBackground>
        {/* <NavWrapper>
          <NavItem
            onClick={() => {
              onNavClick('freq');
            }}
            $navstate={navstate}
            $navkey="freq"
          >
            자주 먹었어요!
          </NavItem>
          <NavItem
            onClick={() => {
              onNavClick('onHand');
            }}
            $navstate={navstate}
            $navkey="onHand"
          >
            직접 등록해요!
          </NavItem>
        </NavWrapper> */}
        <ItemsWrapper>
          <FoodItemWrapper>
            {favFood.map(item => (
              <OftFoodItem key={item.foodDataId} {...item} fetchMeal={fetchMeal}></OftFoodItem>
            ))}
          </FoodItemWrapper>
          <AddFoodInfo onClick={onFoodReg}></AddFoodInfo>
        </ItemsWrapper>
      </PageBackground>
    </>
  );
};

const PageBackground = styled.div`
  width: 90rem;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NavWrapper = styled.div`
  width: 15.875rem;
  height: 2.5rem;
  flex-shrink: 0;
  margin: 1.1rem;

  display: flex;
  flex-direction: row;
`;

const NavItem = styled.div`
  width: 8.125rem;
  height: 2.5rem;

  cursor: pointer;

  border-radius: 1.875rem;

  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1rem;
  font-weight: 600;
`;

const ItemsWrapper = styled.div`
  margin: 2rem 4rem;
  flex-shrink: 0;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 3rem;

  border-radius: 1rem;
`;

const FoodItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`;

export default FoodNavigationSection;
