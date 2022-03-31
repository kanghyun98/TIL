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

  const [testLen, ...testArr] = inputList;

  testArr.forEach((test) => {
    const [studentLen, ...studentArr] = test.split(' ');

    const result = studentArr.reduce((acc, cur, index, { length }) => {
      if (index !== length - 1) {
        return acc + Number(cur);
      } else {
        const studentMean = (acc + Number(cur)) / length;

        let num = 0;
        studentArr.forEach((student) => {
          if (student > studentMean) {
            num += 1;
          }
        });

        const percent = (num / length) * 100;

        return `${percent.toFixed(3)}%`;
      }
    }, 0);

    console.log(result);
  });

  /////////////////////////////
  process.exit();
});
