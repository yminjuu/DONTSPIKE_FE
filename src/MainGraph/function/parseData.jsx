const monthMapping = {
  JANUARY: '1월',
  FEBRUARY: '2월',
  MARCH: '3월',
  APRIL: '4월',
  MAY: '5월',
  JUNE: '6월',
  JULY: '7월',
  AUGUST: '8월',
  SEPTEMBER: '9월',
  OCTOBER: '10월',
  NOVEMBER: '11월',
  DECEMBER: '12월',
};

const monthOrder = [
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER',
];

const parseData = data => {
  return monthOrder.reduce((result, month) => {
    const average = Math.round(data[month]);
    if (average !== 0) {
      result.push({
        name: monthMapping[month],
        average: average,
      });
    }
    return result;
  }, []);
};

export default parseData;
