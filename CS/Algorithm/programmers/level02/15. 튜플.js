// 배열로 만들고, 배열의 크기가 작은 순으로 추가해주면서 Set로 만든다.
function solution(s) {
  const arr = s.split('},').map((val) => val.match(/\d+/g).map(Number));
  arr.sort((a, b) => a.length - b.length);

  return [...arr.reduce((acc, cur) => new Set([...acc, ...cur]))];
}
