// 자카드 유사도 (교집합 수 / 합집합 수)
function solution(str1, str2) {
  const str1Obj = {};
  const str2Obj = {};

  // 집합 만들기
  const str1Arr = [
    ...(str1.match(/../g).filter((s) => /[A-Za-z]{2}/.test(s)) || []),
    ...(str1
      .slice(1)
      .match(/../g)
      .filter((s) => /[A-Za-z]{2}/.test(s)) || []),
  ];

  const str2Arr = [
    ...(str2.match(/../g).filter((s) => /[A-Za-z]{2}/.test(s)) || []),
    ...(str2
      .slice(1)
      .match(/../g)
      .filter((s) => /[A-Za-z]{2}/.test(s)) || []),
  ];

  str1Arr.forEach((w) => {
    const word = w.toLowerCase();
    str1Obj[word] = (str1Obj[word] || 0) + 1;
  });

  str2Arr.forEach((w) => {
    const word = w.toLowerCase();
    str2Obj[word] = (str2Obj[word] || 0) + 1;
  });

  // 교집합, 합집합 계산
  const count1 = str1Arr.length;
  const count2 = str2Arr.length;
  let interCount = 0;

  Object.keys(str1Obj).forEach((key) => {
    if (str2Obj[key]) interCount += Math.min(str1Obj[key], str2Obj[key]);
  });

  const unionCount = count1 + count2 - interCount;

  return unionCount !== 0
    ? Math.floor((interCount / unionCount) * 65536)
    : 65536;
}
