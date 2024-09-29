import React from 'react';
import { ClipLoader } from 'react-spinners';

const override = {
  span: '20px',
  margin: '0 auto',
  marginTop: '220px',
  textAlign: 'center',
  color: 'black',
  size: '20',
};

// 1. MainGraphPage에서 데이터 불러올 때
// 2. FoodInfoPage에서 검색시
const Loader = ({ type }) => {
  return (
    <div
      style={{
        color: '#111',
        fontWeight: '700',
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <ClipLoader color="#111" cssOverride={override} size={25} speedMultiplier={0.8} />
    </div>
  );
};

export default Loader;
