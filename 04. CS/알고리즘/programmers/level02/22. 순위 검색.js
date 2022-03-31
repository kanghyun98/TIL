// 조합, 이진탐색 이용 방법
const binarySearch = (arr, n) => {
  let srt = 0;
  let fin = arr.length;
  while (srt < fin) {
    const mid = Math.floor((srt + fin) / 2);
    arr[mid] < n ? (srt = mid + 1) : (fin = mid);
  }

  return arr.length - srt;
};

function solution(info, query) {
  // info 데이터로 객체 만들기 (조합 with dfs)
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
    const userDataArr = data.split(' ');
    const score = Number(userDataArr.pop());
    getCombination(userDataArr, score, 0);
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

// 첫 시도, 시간 초과
function solution(info, query) {
  info.sort((a, b) => {
    const [scoreA] = a.match(/\d+/).map(Number);
    const [scoreB] = b.match(/\d+/).map(Number);
    return scoreA - scoreB;
  });

  const answer = query.map((oneQuery) => {
    let count = 0;
    const queryArr = oneQuery.replace(/and/g, '').match(/\w+|-/g); // 쿼리별 조건

    info.forEach((oneInfo) => {
      const infoArr = oneInfo.split(' ');

      // 언어, 직군, 경력, 소울푸드
      let isRight = true;
      for (let i = 0; i < 4; i++) {
        if (queryArr[i] !== infoArr[i] && queryArr[i] !== '-') isRight = false;
      }

      // 점수
      if (isRight && Number(infoArr[4]) >= Number(queryArr[4])) count++;
    });

    return count;
  });

  return answer;
}
