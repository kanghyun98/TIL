// 단어 뒤집기
/*
TODO: 주어진 문장의 단어들만 뒤집어서 출력
각 단어를 stack에 push 후, pop을 해주어 뒤집어지도록 만들었다.
*/

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputList = [];

rl.on('line', function (input) {
  inputList.push(input);
}).on('close', function () {
  ///////////////////////////////

  let result = '';
  const [len, ...sentences] = inputList;

  sentences.forEach((sentence) => {
    const revWords = sentence
      .split(' ')
      .map((word) => {
        const stack = [];
        let res = '';

        for (const w of word.split('')) {
          stack.push(w);
        }

        for (const w of word.split('')) {
          res += stack.pop();
        }

        return res;
      })
      .join(' ');

    result += revWords + '\n';
  });

  console.log(result);

  /////////////////////////////
  process.exit();
});
