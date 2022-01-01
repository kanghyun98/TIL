const makeDFunc = (n) => {
  const numArr = String(n).split('');
  const sum = numArr.reduce((acc, cur) => {
    return acc + Number(cur);
  }, n);

  return sum;
};

let n = 0;
let result = [];
const range = 10000;

while (true) {
  n++;
  result.push(makeDFunc(n));

  if (n === range) {
    break;
  }
}

let res = '';

for (let i = 0; i < range; i++) {
  if (!result.includes(i + 1)) {
    res += i + 1 + '\n';
  }
}

console.log(res);
