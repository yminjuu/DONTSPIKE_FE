import React from 'react';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

const override = {
  span: '20px',
  margin: '0 auto',
  marginTop: '220px',
  textAlign: 'center',
  color: 'black',
  size: '20',
};

// 1. MainGraphPage에서 데이터 불러올 때 : "main"
// 2. FoodInfoPage에서 검색시 : "food"
const Loader = ({ type }) => {
  return (
    <>
      <LoaderWrapper>
        <ClipLoader color="#111" cssOverride={override} size={25} speedMultiplier={0.8} />
        {type === 'main' ? (
          <span>혈당과 식단 기록을 분석하고 있습니다..</span>
        ) : (
          <span>음식 정보와 팁을 불러오고 있습니다..</span>
        )}
      </LoaderWrapper>
    </>
  );
};

const LoaderWrapper = styled.div`
  color: '#111';
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5rem;
  align-items: center;
  height: 100%;
`;

export default Loader;
