// 메인그래프 데이터 날짜순 정렬 함수
const compareMainData = (a, b) => {
  const dateA = new Date(a.recorddate);
  const dateB = new Date(b.recorddate);

  return dateA - dateB;
};

// 평균그래프 전월과 평균값 비교 함수
const calculateDifference = data => {
  if (data.length < 2) {
    return null; //null을 리턴하여 값을 구할 수 없음을 알려줌 => 알맞게 처리
  }

  const lastIndex = data.length - 1;
  const lastAverage = data[lastIndex].average;
  const secondLastAverage = data[lastIndex - 1].average;

  return lastAverage - secondLastAverage;
};

// 최애 음식 그래프 정렬 함수
const compareFavFood = (a, b) => {
  return parseInt(b.count) - parseInt(a.count);
};

export { compareMainData, calculateDifference, compareFavFood };
