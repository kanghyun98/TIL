// 손님 수를 층 수로 나눈 나머지가 마지막 손님이 배정받을 층 (나머지가 0이면 꼭대기 층)
// 손님 수를 층 수로 나눈 값 + 1 이 마지막 손님이 배정받을 호수 뒷자리 ()

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

  const [testNum, ...testData] = inputList;

  testData.forEach((test) => {
    // h: 층, w: 각 층의 방 개수, n: 손님 수
    const [h, w, n] = test.split(' ');
    const numH = Number(h);
    const numN = Number(n);

    let floorNum, roomNum;

    if (numN % numH !== 0) {
      floorNum = numN % numH;
      roomNum = Math.floor(numN / numH) + 1;
    } else {
      floorNum = numH; // 꼭대기 층
      roomNum = Math.floor(numN / numH);
    }
    const floor = String(floorNum);
    const room = roomNum < 10 ? `0${roomNum}` : `${roomNum}`;

    console.log(floor + room);
  });

  /////////////////////////////
  process.exit();
});
