function solution(s) {
  const countP = (s.match(/p/gi) || []).length;
  const countY = (s.match(/y/gi) || []).length;

  return countP === countY;
}
