function solution(want, number, discount) {
  let answer = 0;

  // 원하는 제품 별 수량 목록
  const wantList = {};
  for (let i = 0; i < want.length; i++) {
    wantList[want[i]] = number[i];
  }

  // 처음 시작
  for (let i = 0; i < 10; i++) {
    if (wantList[discount[i]] !== undefined) wantList[discount[i]] -= 1;
  }
  if (checkAllSale(wantList)) answer++;

  // 이후
  for (let i = 10; i < discount.length; i++) {
    if (wantList[discount[i - 10]] !== undefined)
      wantList[discount[i - 10]] += 1;
    if (wantList[discount[i]] !== undefined) wantList[discount[i]] -= 1;
    if (checkAllSale(wantList)) answer++;
  }

  return answer;
}

function checkAllSale(obj) {
  let returnVal = true;
  Object.keys(obj).forEach((key) => {
    if (obj[key] > 0) returnVal = false;
  });

  return returnVal;
}
