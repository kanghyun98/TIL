// 목록을 배열로 만들었으먄 더 깔끔했을텐데,, 까비!
// split을 이용한 모범답안의 아이디어가 기가 막힌다..

// 내 풀이
function solution(s) {
  const changedObj = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  const rule = Object.keys(changedObj).join('|');
  const reg = new RegExp(rule, 'g');

  const result = s.replace(reg, (match) => {
    return changedObj[match];
  });

  const answer = Number(result);
  return answer;
}

// 모범 답안
function solution(s) {
  let numbers = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];
  var answer = s;

  for (let i = 0; i < numbers.length; i++) {
    let arr = answer.split(numbers[i]);
    answer = arr.join(i);
  }

  return Number(answer);
}
