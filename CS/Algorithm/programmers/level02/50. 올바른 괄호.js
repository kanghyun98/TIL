function solution(s) {
  let num = 0;

  for (const v of s.split('')) {
    v === '(' ? num++ : num--;

    if (num < 0) break;
  }

  return num === 0;
}
