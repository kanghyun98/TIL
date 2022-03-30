// 자연수 N의 약수들은 대칭을 이룬다.
// 즉, N^(1/2)까지만 N을 나눠보면 소수인지 판단할 수 있다.
// '에라토스테네스의 체'라는 개념을 활용할 수도 있다.

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

  const [values] = inputList;
  const [numM, numN] = values.split(' ').map(Number);

  const checkPrime = (num) => {
    let isPrime = true;

    const divideNum = Math.ceil(Math.sqrt(num));
    for (let i = 2; i <= divideNum; i++) {
      if (num % i === 0) {
        isPrime = false;
        break;
      }
    }

    if (num === 1) isPrime = false;
    if (num === 2) isPrime = true;

    return isPrime;
  };

  let result = '';
  for (let num = numM; num <= numN; num++) {
    if (checkPrime(num)) {
      result += num + '\n';
    }
  }

  console.log(result);

  /////////////////////////////
  process.exit();
});

// 에라토스테네스의 체 사용 방법
// 소수인 숫자의 배수들은 소수가 아님을 이용
///////////////////////////////

// const [values] = inputList;
// const [numM, numN] = values.split(' ').map(Number);

// const isPrimeArr = Array(numN + 1).fill(true);
// isPrimeArr[1] = false;

// for (let i = 2; i <= Math.ceil(Math.sqrt(numN)); i++) {
//   if (isPrimeArr[i]) {
//     let t = 2;
//     while (t * i <= numN) {
//       isPrimeArr[t * i] = false;
//       t++;
//     }
//   }
// }

// result = '';
// for (let num = numM; num <= numN; num++) {
//   if (isPrimeArr[num]) {
//     result += num + '\n';
//   }
// }

// console.log(result);

/////////////////////////////
