// 처음 풀이 (시간 초과)
function solution(s) {
  let lastStr = s;
  let beforeLen = 0;

  while (beforeLen !== lastStr.length) {
    beforeLen = lastStr.length;

    let res = lastStr;

    for (let i = 0; i < lastStr.length; i++) {
      if (lastStr[i] === lastStr[i + 1]) {
        res = res.replace(lastStr[i] + lastStr[i + 1], '');
      }
    }

    lastStr = res;
  }

  return lastStr.length === 0 ? 1 : 0;
}

// stack을 이용한 방법
function solution(s) {
  const stack = [];

  const len = s.length;
  for (let i = 0; i < len; i++) {
    stack.length === 0 || stack[stack.length - 1] !== s[i]
      ? stack.push(s[i])
      : stack.pop();
  }

  return stack.length === 0 ? 1 : 0;
}
