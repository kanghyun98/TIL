function solve(...inputs) {
  const [n, ...arr] = inputs;
  const nArr = arr.map((str) => str.split(' '));

  // 낮은 성적순 정렬
  const sortedArr = nArr.sort((a, b) => Number(a[1]) - Number(b[1]));

  // 이름만 추출
  const answer = sortedArr.map((li) => li[0]).join(' ');
  return answer;
}

// test
const answer1 = '이순신 홍길동';
const test1 = solve(2, '홍길동 95', '이순신 77');
console.log(answer1 === test1);
