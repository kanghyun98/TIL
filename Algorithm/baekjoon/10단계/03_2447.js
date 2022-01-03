// 완성하고 찾아보니 보니 다른 사람들이랑 좀 다르다..
// 나는 그림을 결합해주는 함수(좌,우)를 구현하고,
// 상태값(brk)를 이용해 가운데를 비울 수 있게 만드는 재귀함수를 만들었다.

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let inputList = [];

rl.on('line', function (input) {
  inputList.push(input);
}).on('close', function () {
  ///////////////////////////////

  const [num] = inputList.map(Number);

  const combinePicture = (fir, sec, thr) => {
    const firArr = fir.split('\n');
    const secArr = sec.split('\n');
    const thrArr = thr.split('\n');

    const resultArr = [];

    const len = firArr.length;
    for (let i = 0; i < len; i++) {
      if (firArr[i]) {
        resultArr[i] = firArr[i] + secArr[i] + thrArr[i] + '\n';
      }
    }

    const result = resultArr.join('');
    return result;
  };

  const makeSquare = (N, brk = false) => {
    if (N === 1) {
      if (!brk) {
        return '*';
      } else {
        return ' ';
      }
    }

    let result = '';

    const full = makeSquare(N / 3, false);
    const space = makeSquare(N / 3, true);

    if (!brk) {
      result =
        combinePicture(full, full, full) +
        combinePicture(full, space, full) +
        combinePicture(full, full, full);

      // 아래처럼 만들 수도 있지만, 직관성이 떨어져서 그냥 위처럼 구현했다.
      // for (let i = 0; i < 3; i++) {
      //   if (i % 3 === 1) {
      //     result += combinePicture(full, space, full);
      //   } else {
      //     result += combinePicture(full, full, full);
      //   }
      // }
    } else {
      for (let i = 0; i < 3; i++) {
        result += combinePicture(space, space, space);
      }
    }

    return result;
  };

  console.log(makeSquare(num));

  /////////////////////////////
  process.exit();
});

// 다른 사람의 풀이 방법
/////////////////////////////

const [num] = inputList;

const makeStar = (x, y, num) => {
  if (x % 3 === 1 && y % 3 === 1) {
    // 3n-2 번째 x,y 는 빈 배열
    result += ' ';
  } else {
    if (num === 1) {
      result += '*';
    } else {
      makeStar(Math.floor(x / 3), Math.floor(y / 3), Math.floor(num / 3));
    }
  }

  // 한 칸씩 돌면서 각 칸 마다 재귀 돌림
  function getImage() {
    for (let y = 0; y < num; y++) {
      for (let x = 0; x < num; x++) {
        makeStar(y, x, num);
      }
      answer += '\n';
    }
  }

  getImage(num);
};
/////////////////////////////
