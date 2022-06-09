function solution(n) {
  let res = n - 1;
  const arr = [];

  do {
    arr.unshift(res % 3);
    res = Math.floor(res / 3) - 1;
  } while (res !== -1);

  return arr.map((val) => (val === 0 ? '1' : val === 1 ? '2' : '4')).join('');
}

// 모범 답안, 재귀를 이용한 방법
function change124(n) {
  return n === 0
    ? ''
    : change124(Math.floor((n - 1) / 3)) + [1, 2, 4][(n - 1) % 3];
}
