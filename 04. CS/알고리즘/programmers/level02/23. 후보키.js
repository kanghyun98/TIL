function solution(relation) {
  // 각 키의 인덱스들로 모든 조합 생성
  const combArr = [];
  const getComb = (level, result, maxLength) => {
    if (level === maxLength) {
      if (result.length > 0) combArr.push(result);
      return;
    }

    getComb(level + 1, result, maxLength);
    getComb(level + 1, result + level, maxLength);
  };

  getComb(0, '', relation[0].length);
  combArr.sort((a, b) => a.length - b.length); // 인덱스를 조금 포함한 것부터 실행하기 위해 정렬

  // 이미 후보키에 들어온 조합을 배열에서 제외하면서 확인
  let result = 0;
  combArr.forEach((combIdx) => {
    if (combIdx) {
      // 색인에 해당하는 데이터
      const indices = combIdx.split('').map(Number);
      const dataByIndices = relation.map((tuple) =>
        indices.reduce((acc, cur) => acc + tuple[cur], '')
      );

      // 후보키가 맞다면 (중복 제거 전후 길이 동일)
      if (dataByIndices.length === new Set(dataByIndices).size) {
        result++;

        // 최소성 조건 만족
        combArr.forEach((val, idx, origin) => {
          if (
            combIdx.length ===
            combIdx.split('').filter((n) => val.includes(n)).length // 떨어져있는 경우도 파악하기 위해 원소 각각 비교
          ) {
            origin[idx] = '';
          }
        });
      }
    }
  });

  return result;
}
