// 난 걍 조건문으로 무식하게 풀었는데, substr이라는 쉽고 좋은 방법이 있었따..! 반성ㅠ

function solution(s) {
  const len = s.length;

  let answer = '';

  if (len % 2 === 0) {
    answer += s[len / 2 - 1] + s[len / 2];
  } else {
    answer += s[(len + 1) / 2 - 1];
  }

  return answer;
}

// 모범답안
function solution(s) {
  return s.substr(Math.ceil(s.length / 2) - 1, s.length % 2 === 0 ? 2 : 1);
}
