// 요세푸스 문제
/*
TODO: 1~N을 원으로 놓고, K번째 숫자를 계속 빼준다

1~N을 갖는 배열 하나를 만들고 targetIdx에 해당하는 값을 매번 빼준다. 
-> 매번 하나씩 빠지므로 targetIdx을 매번 -1 해줌 (이러면 알아서 다음 K번째를 찾음)
만약 targetIdx가 배열 크기보다 크면 맨앞으로 돌아오게 빼준다.
*/

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputList = [];

rl.on('line', function (input) {
  inputList.push(input);
}).on('close', function () {
  ///////////////////////////////

  let [N, K] = inputList[0].split(' ').map(Number);
  let result = '<';

  const arr = [...Array(N)].map((_, i) => i + 1);

  let targetIdx = -1;
  for (let i = N; i > 0; i--) {
    targetIdx += K;
    while (targetIdx > i - 1) {
      targetIdx -= i;
    }

    const [delNum] = arr.splice(targetIdx, 1);
    targetIdx -= 1;

    if (i > 1) result += delNum + ', ';
    else result += delNum + '>';
  }

  console.log(result);

  /////////////////////////////
  process.exit();
});
