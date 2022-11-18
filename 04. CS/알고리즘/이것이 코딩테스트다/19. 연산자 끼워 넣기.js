function solve(...inputs) {
  const N = Number(inputs[0]); // 수의 개수
  const numList = inputs[1].split(' ').map(Number); // Ai
  const ops = inputs[2].split(' ').map(Number); // 연산자 [+, -, *, /]

  let minVal = Number.MAX_SAFE_INTEGER;
  let maxVal = 0;

  const dfs = (lev, accVal) => {
    if (lev === N - 1) {
      if (minVal > accVal) minVal = accVal;
      if (maxVal < accVal) maxVal = accVal;
      return;
    }

    for (let i = 0; i < 4; i++) {
      if (ops[i] > 0) {
        const calcVal = calc(accVal, numList[lev + 1], i);
        ops[i]--;
        dfs(lev + 1, calcVal);
        ops[i]++;
      }
    }
  };

  dfs(0, numList[0]);

  return `${maxVal} ${minVal}`;
}

function calc(n1, n2, opIdx) {
  let returnVal;

  switch (opIdx) {
    case 0:
      returnVal = n1 + n2;
      break;
    case 1:
      returnVal = n1 - n2;
      break;
    case 2:
      returnVal = n1 * n2;
      break;
    case 3:
      returnVal = n1 < 0 ? -Math.floor(-n1 / n2) : Math.floor(n1 / n2); // C++14 기준
      break;
  }

  return returnVal;
}

// test
const answer1 = '30 30';
const test1 = solve('2', '5 6', '0 0 1 0');
console.log(answer1 === test1);

const answer2 = '35 17';
const test2 = solve('3', '3 4 5', '1 0 1 0');
console.log(answer2 === test2);

const answer3 = '54 -24';
const test3 = solve('6', '1 2 3 4 5 6', '2 1 1 1');
console.log(answer3 === test3);
