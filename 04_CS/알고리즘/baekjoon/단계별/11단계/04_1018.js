// x:홀, y:짝 -> color
// x:짝, y:홀 -> other color

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

  const [chessInfo, ...chessArr] = inputList;

  const [numM, numN] = chessInfo.split(' ').map(Number);

  // 8x8을 골랐을 때 색칠해야할 최소 개수 반환하는 함수
  const colorList = ['W', 'B'];

  const getPaintNum = (arr) => {
    const count = [0, 0];
    let res;

    for (let c = 0; c < 2; c++) {
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          if (y % 2 === 0) {
            res =
              arr[y][x] !==
              (x % 2 === 0 ? colorList[c] : colorList[(c + 1) % 2]);
          } else {
            res =
              arr[y][x] !==
              (x % 2 === 0 ? colorList[(c + 1) % 2] : colorList[c]);
          }

          if (!res) count[c]++;
        }
      }
    }

    return Math.min(...count);
  };

  // 원하는 8x8 배열 추출
  const selectChess = (all, numI, numJ) => {
    const newArr = [];
    for (let i = numI; i < numI + 8; i++) {
      const newLineArr = [];

      for (let j = numJ; j < numJ + 8; j++) {
        newLineArr.push(all[i][j]);
      }

      newArr.push(newLineArr);
    }

    return newArr;
  };

  // 여러개의 8x8에 대해 결과 반환
  const allChess = chessArr.map((line) => {
    return line.split('');
  });

  const resultArr = [];

  for (let m = 0; m <= numM - 8; m++) {
    for (let n = 0; n <= numN - 8; n++) {
      const selectedChess = selectChess(allChess, m, n);
      const num = getPaintNum(selectedChess);
      resultArr.push(num);
    }
  }

  console.log(Math.min(...resultArr));

  /////////////////////////////
  process.exit();
});
