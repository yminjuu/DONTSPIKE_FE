// 두가지 Date 객체를 받아 시간 제외, "날짜"만 같은지 확인하는 함수
const isSameDate = (a, b) => {
  console.log(a, b);
  if (a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()) return true;
  else return false;
};

const analyzeBS = mainData => {
  const length = mainData.length;
  if (mainData.length < 3) return null;
  // 최근 2개의 혈당에 대한 날짜 구하기
  // 오늘 혈당 후보 객체
  const recentBS = mainData[length - 2];
  // 지난 혈당 후보 객체
  const lastBS = mainData[length - 3];
  // 오늘 혈당 존재, 어제 혈당 존재 X, 오늘 이전 혈당 존재 X

  // 지난 혈당과 최근 혈당값의 차이를 구하기
  var alertComment = '';
  var difference = recentBS.bloodsugar - lastBS.bloodsugar;
  if (difference < 0) {
    alertComment = '감소';
    difference = -1 * difference;
  } else difference === 0 ? (alertComment = '동일') : (alertComment = '증가');
  if (isSameDate(new Date(), new Date(recentBS.recorddate))) {
    // 오늘 혈당 있는 경우
    return {
      today: true,
      todayBS: recentBS.bloodsugar,
      lastBS: lastBS.bloodsugar,
      difference: difference,
      alertComment: alertComment,
    };
  } else {
    return {
      today: false, //오늘 혈당이 아님
      todayBS: recentBS.bloodsugar,
      lastBS: lastBS.bloodsugar,
      difference: difference,
      alertComment: alertComment,
    };
  }
};

export default analyzeBS;

// 00 님의 최근 오늘 공복 평균 혈당은 0mg/dl입니다! <br />
// 어제에 비해 평균 공복 혈당이 00mg/dl 상승했군요.
