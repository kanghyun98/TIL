const getPermutation = (arr, r) => {
  if (r === 1) return arr.map((val) => [val]);

  const result = [];
  arr.forEach((fixed, idx, origin) => {
    const rest = [...origin.slice(0, idx), ...origin.slice(idx + 1)];
    const permu = getPermutation(rest, r - 1);
    const attached = permu.map((val) => [fixed, ...val]);
    result.push(...attached);
  });

  return result;
};

function solution(k, dungeons) {
  const result = [];
  const permu = getPermutation(dungeons, dungeons.length);

  permu.forEach((arr) => {
    let count = 0;
    let cond = k;
    let i = 0;

    while (i < arr.length) {
      if (cond < arr[i][0] || cond < arr[i][1]) {
        break;
      }
      cond -= arr[i][1];
      count++;
      i++;
    }

    result.push(count);
  });

  return Math.max(...result);
}
