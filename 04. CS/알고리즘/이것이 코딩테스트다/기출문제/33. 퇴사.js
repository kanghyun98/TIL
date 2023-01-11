const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const [len, ...list] = inputList;
const outDate = Number(len);
const arrT = [];
const arrP = [];

list.forEach((str) => {
  const [t, p] = str.split(' ').map(Number);
  arrT.push(t);
  arrP.push(p);
});

const dp = Array(outDate + 1).fill(0);

for (let i = outDate - 1; i >= 0; i--) {
  if (arrT[i] + i > outDate) {
    dp[i] = dp[i + 1];
  } else {
    dp[i] = Math.max(arrP[i] + dp[i + arrT[i]], dp[i + 1]);
  }
}

console.log(dp[0]);

/////////////////////////////
