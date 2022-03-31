// 이차방정식 이용
// brown: 2 * (w + h) - 4, yellow: w * h - brown
function solution(brown, yellow) {
  const width =
    (brown + 4 + Math.sqrt((brown + 4) ** 2 - 16 * (brown + yellow))) / 4;
  const height = (brown + yellow) / width;

  return [width, height];
}
