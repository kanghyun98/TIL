function solution(land) {
  let rowLev = 0;
  const totalDepth = land.length;

  while (rowLev < totalDepth - 1) {
    land[rowLev + 1].forEach((num, idx) => {
      let max = 0;
      land[rowLev].forEach((n, i) => {
        if (idx !== i) max = num + n > max ? num + n : max;
      });

      land[rowLev + 1][idx] = max;
    });

    rowLev++;
  }

  return Math.max(...land[totalDepth - 1]);
}

// reduce를 이용해 만든 풀이 (조금 더 간결)
function solution(land) {
  const result = land.reduce(
    (bef, now) => {
      return now.map((num, idx) => {
        let max = 0;
        bef.forEach((n, i) => {
          if (idx !== i) max = num + n > max ? num + n : max;
        });

        return max;
      });
    },
    [0, 0, 0, 0]
  );

  return Math.max(...result);
}
