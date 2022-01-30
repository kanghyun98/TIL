// 자카드 유사도 (교집합 수 / 합집합 수)
function solution(str1, str2) {
  const str1Obj = {};
  const str2Obj = {};
  let idx = 0;
  let count1 = 0;
  let count2 = 0;
  let interCount = 0;

  const check = (str) => /[a-z]{2}/.test(str);

  while (idx < Math.max(str1.length, str2.length) - 1) {
    const subStr1 = str1.slice(idx, idx + 2).toLowerCase();
    if (check(subStr1)) {
      str1Obj[subStr1] = (str1Obj[subStr1] || 0) + 1;
      count1++;
    }

    const subStr2 = str2.slice(idx, idx + 2).toLowerCase();
    if (check(subStr2)) {
      str2Obj[subStr2] = (str2Obj[subStr2] || 0) + 1;
      count2++;
    }

    idx++;
  }

  Object.keys(str1Obj).forEach((key) => {
    if (str2Obj[key]) interCount += Math.min(str1Obj[key], str2Obj[key]);
  });

  const unionCount = count1 + count2 - interCount;

  return unionCount !== 0
    ? Math.floor((interCount / unionCount) * 65536)
    : 65536;
}
