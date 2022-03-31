function solution(n, info) {
  const result = {
    maxDiff: 0,
    ryanArr: [],
    lastValIdx: 0,
    lastVal: 0,
  };

  function getRyanArr(lastArrow, arr, idx, lastIdx) {
    // 끝나는 조건
    if (lastArrow === 0 || idx === lastIdx) {
      const lastTime = lastIdx - idx;
      arr.push(...Array(lastTime).fill(0), lastArrow);

      const diff = getScoreDiff(arr, info);
      const lastValIdx = lastArrow ? lastIdx : idx;
      const lastVal = lastArrow ? lastArrow : arr[idx];

      if (diff > result.maxDiff) {
        // 차이가 더 큰 경우
        result.maxDiff = diff;
        result.ryanArr = arr;
        result.lastValIdx = lastValIdx;
        result.lastVal = lastVal;
      } else if (diff === result.maxDiff) {
        // 차이가 같은 경우
        if (lastValIdx > result.lastValIdx) {
          // 값이 들어있는 idx가 더 뒤에 있는 경우
          result.maxDiff = diff;
          result.ryanArr = arr;
          result.lastValIdx = lastValIdx;
          result.lastVal = lastVal;
        } else if (lastValIdx === result.lastValIdx) {
          // 값이 들어있는 idx가 같은 경우
          if (lastVal > result.lastVal) {
            result.maxDiff = diff;
            result.ryanArr = arr;
            result.lastValIdx = lastValIdx;
            result.lastVal = lastVal;
          }
        }
      }

      return;
    }

    // ryan 승리
    const canWinNum = info[idx] + 1;
    if (canWinNum <= lastArrow) {
      getRyanArr(lastArrow - canWinNum, [...arr, canWinNum], idx + 1, lastIdx);
    }

    // appeach 승리
    getRyanArr(lastArrow, [...arr, 0], idx + 1, lastIdx);
  }

  getRyanArr(n, [], 0, info.length - 1);

  return result.maxDiff ? result.ryanArr : [-1];
}

function getScoreDiff(ryanArr, apeachArr) {
  let ryanScore = 0;
  let apeachScore = 0;

  apeachArr.forEach((apeachVal, idx) => {
    const ryanVal = ryanArr[idx] || 0;
    if (ryanVal > apeachVal) {
      ryanScore += 10 - idx;
    } else if (ryanVal < apeachVal) {
      apeachScore += 10 - idx;
    } else {
      return;
    }
  });

  return ryanScore - apeachScore;
}
