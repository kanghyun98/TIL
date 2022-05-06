function solution(n, info) {
  const ryanArr = Array(11).fill(0);
  let maxDiff = 0;
  let result = [-1];

  const getScoreDiff = (apeachArr, ryanArr) => {
    let diff = 0;
    for (let i = 0; i <= 10; i++) {
      if (ryanArr[i] || apeachArr[i]) {
        diff += ryanArr[i] > apeachArr[i] ? 10 - i : i - 10;
      }
    }
    return diff;
  };

  const dfs = (idx, lastArrow) => {
    if (idx === 10) {
      ryanArr[idx] = lastArrow; // 남은 화살

      const diff = getScoreDiff(info, ryanArr);
      if (diff > maxDiff) {
        maxDiff = diff;
        result = [...ryanArr];
      } else if (diff === maxDiff) {
        for (let i = 10; i > 0; i--) {
          if (ryanArr[i] < result[i]) break;
          else if (ryanArr[i] > result[i]) {
            result = [...ryanArr];
            break;
          }
        }
      }
      return;
    }

    const canWinArrow = info[idx] + 1;

    if (lastArrow - canWinArrow >= 0) {
      ryanArr[idx] = canWinArrow;
      dfs(idx + 1, lastArrow - canWinArrow);
    }

    ryanArr[idx] = 0;
    dfs(idx + 1, lastArrow);
  };

  dfs(0, n);

  return result;
}
