function solve(s) {
  const maxNum = Math.ceil(s.length / 2);
  const numArr = [];

  // 1 ~ half개씩 문자열 분리
  for (let i = 1; i <= maxNum; i++) {
    const reg = new RegExp(`${'.'.repeat(i)}`, 'g');
    const splittedArr = s.match(reg);

    let strLen = s.length;

    splittedArr.forEach((element, idx) => {
      let continueCount = 1;
      if (splittedArr[idx] === splittedArr[idx + 1]) {
        strLen -= element.length;
        continueCount += 1;
      } else {
        if (continueCount > 1) strLen += String(continueCount).length;
      }
    });

    numArr.push(strLen);
  }

  return Math.min(...numArr);
}
