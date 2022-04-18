// 최대공약수와 최소공배수
/*
TODO: 두 개의 자연수를 입력받아 최대 공약수와 최소 공배수를 출력
최대공약수와 최소공배수를 구하는 방법은 코드에 작성함
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().split('\n');

///////////////////////////////

const [num1, num2] = inputList[0].split(' ').map(Number);

// 최대공약수 구하기
const calc_gcd = (a, b) => {
  if (b == 0) return a;
  return a > b ? calc_gcd(b, a % b) : calc_gcd(a, b % a);
};

// 최소공배수 == (a * b) / 최대공약수
const gcd = calc_gcd(num1, num2);
const lcm = (num1 * num2) / gcd;

console.log(gcd + '\n' + lcm);

/////////////////////////////
