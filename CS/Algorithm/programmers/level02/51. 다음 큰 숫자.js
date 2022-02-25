// 맨 오른쪽의 01 -> 10 // 나머지는 1 다 뒤로 밀어
// 없으면 맨 왼쪽의 1 -> 10 // 나머지는 1 다 뒤로 밀어
function solution(n) {
  const target = n.toString(2).split('').reverse().join('');
  const idx = target.indexOf('10');

  let result;
  if (idx !== -1) {
    const left = target
      .slice(0, idx)
      .split('')
      .sort((a, b) => Number(b) - Number(a))
      .join('');
    const right = target.slice(idx).replace('10', '01');
    result = left + right;
  } else {
    const left = target
      .slice(0, -1)
      .split('')
      .sort((a, b) => Number(b) - Number(a))
      .join('');
    const right = '01';

    result = left + right;
  }

  return parseInt(result.split('').reverse().join(''), 2);
}

// 모범답안 (돌면서 구하기)
function solution(n) {
  const len = n.toString(2).match(/1/g).length;
  while (true) {
    n++;

    if (len === n.toString(2).match(/1/g).length) return n;
  }
}
