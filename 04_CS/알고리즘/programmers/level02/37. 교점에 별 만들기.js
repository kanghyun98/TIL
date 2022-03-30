const getIntersectionPoint = (arr1, arr2) => {
  const [a, b, e] = arr1;
  const [c, d, f] = arr2;

  const slope = a * d - b * c;
  const x = slope ? (b * f - e * d) / slope : null;
  const y = slope ? (e * c - a * f) / slope : null;
  return [x, y];
};

function solution(line) {
  const points = [];
  let [minX, minY, maxX, maxY] = [
    Number.MAX_SAFE_INTEGER,
    Number.MAX_SAFE_INTEGER,
    Number.MIN_SAFE_INTEGER,
    Number.MIN_SAFE_INTEGER,
  ];

  for (let i = 0; i < line.length - 1; i++) {
    for (let j = i + 1; j < line.length; j++) {
      const [x, y] = getIntersectionPoint(line[i], line[j]);

      if (Number.isInteger(x) && Number.isInteger(y)) {
        points.push([x, y]);

        minX = x < minX ? x : minX;
        maxX = x > maxX ? x : maxX;
        minY = y < minY ? y : minY;
        maxY = y > maxY ? y : maxY;
      }
    }
  }

  const result = Array(maxY - minY + 1)
    .fill()
    .map(() => Array(maxX - minX + 1).fill('.'));

  points.forEach(([x, y]) => {
    result[maxY - y][x - minX] = '*';
  });

  return result.map((arr) => arr.join(''));
}
