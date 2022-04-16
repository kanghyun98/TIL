// 단어 뒤집기2
/*
TODO: 문자열에서 단어만 뒤집기
- 태그 만나면 닫힐 때까지 그대로 result에 추가
- 문자 만나면 공백 나올때까지 stack에 쌓고 뒤집어서 추가
- 공백 만나면 그대로 넣기

* 더 나은 방법: 정규표현식 /(<.+?>|\s)/g 활용
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().split('\n');

///////////////////////////////

const str = inputList[0];
let result = '';

for (let i = 0; i < str.length; i++) {
  if (str[i] === '<') {
    result += str[i]; // < 삽입
    while (str[i] !== '>') {
      i++;
      result += str[i]; // > 까지 삽입
    }
  } else if (str[i] === ' ') {
    result += str[i];
  } else {
    const stack = [];
    while (str[i] !== '<' && str[i] !== ' ' && i !== str.length) {
      stack.push(str[i]);
      i++;
    }
    i--;

    while (stack.length !== 0) {
      result += stack.pop();
    }
  }
}

console.log(result);

/////////////////////////////
