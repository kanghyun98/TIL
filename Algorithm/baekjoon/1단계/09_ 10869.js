const fs = require('fs');
const [a, b] = fs.readFileSync('/dev/stdin').toString().split(' ');

const makeResult = (a, b) => {
  const numA = Number(a);
  const numB = Number(b);

  console.log(numA + numB);
  console.log(numA - numB);
  console.log(numA * numB);
  console.log(Math.floor(numA / numB));
  console.log(numA % numB);
};

makeResult(a, b);

`
피드백)
예제 출력에 나누기의 결과가 정수로 나와있는 부분을 놓쳐서 계속 틀렸다.
문제를 똑바로 보자.
`;
