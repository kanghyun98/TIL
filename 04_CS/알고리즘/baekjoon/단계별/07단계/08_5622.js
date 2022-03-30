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

  const [word] = inputList;

  const dialNumber = {
    abc: 2,
    def: 3,
    ghi: 4,
    jkl: 5,
    mno: 6,
    pqrs: 7,
    tuv: 8,
    wxyz: 9,
  };

  // 스펠링에 해당하는 숫자 반환 함수 (인자: 알파벳)
  const getNumberBySpell = (spell) => {
    let resultNum;

    Object.keys(dialNumber).forEach((key) => {
      const lowerSpell = spell.toLowerCase();

      if (key.includes(lowerSpell)) {
        resultNum = dialNumber[key];
      }
    });

    return resultNum;
  };

  // 시간 반환 함수 (인자: 숫자)
  const getTime = (num) => {
    return num + 1;
  };

  // 결과 (인자: 문자열)
  let totalTime = 0;

  word.split('').forEach((spell) => {
    const targetNum = getNumberBySpell(spell);
    const time = getTime(targetNum);
    totalTime += time;
  });

  console.log(totalTime);

  /////////////////////////////
  process.exit();
});
