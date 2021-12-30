// 풀이1 (런타임 에러 (TypeError))
const fs = require('fs');
const [a, b] = fs.readFileSync('/dev/stdin').toString().split(''); // 여기 틀림!

const makeResult = (a, b) => {
  const numA = Number(a);
  const numB = Number(b);

  for (let i = b.length; i > 0; i--) {
    console.log(Number(b[i - 1]) * numA);
  }

  console.log(numA * numB);
};

makeResult(a, b);

// 풀이2
const fs = require('fs');
const [a, b] = fs.readFileSync('/dev/stdin').toString().split('\n');

const makeResult = (a, b) => {
  const numA = Number(a);
  const numB = Number(b);

  const firstNum = numB % 10;
  const secondNum = Math.floor((numB % 100) / 10);
  const thirdNum = Math.floor(numB / 100);

  console.log(numA * firstNum);
  console.log(numA * secondNum);
  console.log(numA * thirdNum);
  console.log(numA * numB);
};

makeResult(a, b);

`
피드백)
예제 입력이 이전 문제랑 동일한 줄 알고 그대로 구현했는데, 이 부분이 전과 달라서 오류가 났다... 문제 좀 똑바로 보자 제발
1단계인데 정답률이 너무 낮은거 아닌교ㅠㅠㅠㅠ
`;
