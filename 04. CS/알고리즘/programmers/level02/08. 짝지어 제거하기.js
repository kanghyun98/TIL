// stack을 이용하여 해결
function solution(s) {
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    stack[stack.length - 1] !== s[i] ? stack.push(s[i]) : stack.pop();
  }

  return stack.length === 0 ? 1 : 0;
}
