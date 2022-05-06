// 조합, 이진탐색 이용 방법

// 이진 탐색으로 특정 점수 이상 유저 수 반환
const binarySearch = (arr, n) => {
  let srt = 0;
  let fin = arr.length;
  while (srt < fin) {
    const mid = Math.floor((srt + fin) / 2);
    n > arr[mid] ? (srt = mid + 1) : (fin = mid);
  }

  return arr.length - srt;
};

function solution(info, query) {
  // info 데이터로 모든 경우의 조건 만들기 (with dfs)
  const infoObj = {};
  const getCombination = (arr, score, idx) => {
    const infoKey = arr.join('');

    if (idx === 4) {
      infoObj[infoKey]
        ? infoObj[infoKey].push(score)
        : (infoObj[infoKey] = [score]);
      return;
    }

    const temp = [...arr];
    getCombination(temp, score, idx + 1);

    temp[idx] = '-';
    getCombination(temp, score, idx + 1);
  };

  for (const data of info) {
    const userInfoArr = data.split(' ');
    const score = Number(userInfoArr.pop());
    getCombination(userInfoArr, score, 0);
  }

  // 이진 탐색을 위한 정렬
  for (const key of Object.keys(infoObj)) {
    infoObj[key].sort((a, b) => a - b);
  }

  // 각 쿼리별로 진행 (이진 탐색)
  const answer = [];
  for (const q of query) {
    const conditions = q.replace(/and/g, '').match(/\w+|-/g);
    const minScore = Number(conditions.pop());
    const queryKey = conditions.join('');
    const numArr = infoObj[queryKey];

    numArr ? answer.push(binarySearch(numArr, minScore)) : answer.push(0);
  }

  return answer;
}
