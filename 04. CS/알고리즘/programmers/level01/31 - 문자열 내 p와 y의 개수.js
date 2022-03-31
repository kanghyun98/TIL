function solution(s) {
  let countP = 0,
    countY = 0;

  const arr = s.match(/p|y/gi);
  if (arr) {
    arr.forEach((spell) => {
      if (spell.toLowerCase() === 'p') countP++;
      else countY++;
    });
  }

  return countP === countY ? true : false;
}
