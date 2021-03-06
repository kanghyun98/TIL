// 최대 반 개의 길이까지, 정규표현식을 이용해 자르고 연속된 문자열끼리 같은지 비교

function solution(s) {
  const numArr = [];

  for (let i = 1; i <= s.length / 2; i++) {
    const reg = new RegExp(`${'.'.repeat(i)}`, 'g');
    const splittedArr = s.match(reg);

    let strLen = s.length;
    let continueCount = 1;

    splittedArr.forEach((element, idx) => {
      if (splittedArr[idx] === splittedArr[idx + 1]) {
        strLen -= element.length;
        continueCount += 1;
      } else {
        if (continueCount > 1) strLen += String(continueCount).length; // 문자열이 달라질 때 continueCount 문자열 추가
        continueCount = 1;
      }
    });

    numArr.push(strLen);
  }

  return Math.min(...numArr);
}
