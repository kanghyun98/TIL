function solution(s) {
  const arr = s.split(' ').sort((a, b) => Number(a) - Number(b));
  return `${arr[0]} ${arr[arr.length - 1]}`;
}
