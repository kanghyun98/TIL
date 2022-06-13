function solution(n) {
  const result = [];

  const move = (n, src, tmp, dest) => {
    if (n > 0) {
      move(n - 1, src, dest, tmp);
      result.push([src, dest]);
      move(n - 1, tmp, src, dest);
    }
  };

  move(n, 1, 2, 3);

  return result;
}
