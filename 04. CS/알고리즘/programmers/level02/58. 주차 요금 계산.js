function solution(fees, records) {
  const logData = {};
  const parkingTimeData = {};
  const feeData = {};
  const [basicTime, basicFee, unitTime, unitFee] = fees;

  records.forEach((rec) => {
    const [time, carNum, type] = rec.split(' ');
    if (logData[carNum]) {
      const parkingTime = calcParkingTime(logData[carNum], time);
      parkingTimeData[carNum] = (parkingTimeData[carNum] || 0) + parkingTime;

      delete logData[carNum];
    } else {
      logData[carNum] = time;
    }
  });

  // out 없는 경우 처리
  Object.keys(logData).forEach((carNum) => {
    const parkingTime = calcParkingTime(logData[carNum], '23:59');

    parkingTimeData[carNum] = (parkingTimeData[carNum] || 0) + parkingTime;
  });

  // 비용 계산
  Object.keys(parkingTimeData).forEach((carNum) => {
    feeData[carNum] = calcFee(
      parkingTimeData[carNum],
      basicTime,
      basicFee,
      unitTime,
      unitFee
    );
  });

  // 차 번호 순으로 비용 반환
  const result = Object.keys(feeData)
    .sort((a, b) => a - b)
    .map((key) => feeData[key]);

  return result;
}

function calcParkingTime(inTime, outTime) {
  const [inHour, inMin] = inTime.split(':');
  const [outHour, outMin] = outTime.split(':');

  const parkingTime = (outHour - inHour) * 60 + (outMin - inMin);

  return parkingTime;
}

function calcFee(parkingTime, basicTime, basicFee, unitTime, unitFee) {
  if (parkingTime <= basicTime) {
    return basicFee;
  } else {
    const extraFee = Math.ceil((parkingTime - basicTime) / unitTime) * unitFee;
    return basicFee + extraFee;
  }
}
