const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let arr = [];

rl.on('line', function (input) {
  arr = input.split(' ');
}).on('close', function () {
  ///////////////////////////////
  const [h, m] = arr;

  const numH = Number(h);
  const numM = Number(m);

  let alarmH = numH;
  let alarmM = numM - 45;

  if (alarmM < 0) {
    alarmH -= 1;
    alarmM = 60 + alarmM;

    if (alarmH < 0) {
      alarmH = 24 + alarmH;
    }
  }

  console.log(alarmH, alarmM);

  /////////////////////////////
  process.exit();
});
