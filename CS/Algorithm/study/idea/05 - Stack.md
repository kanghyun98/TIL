[TOC]

### Stack

#### 연속되는 동일한 알파벳(2개) 제거하기

(프로그래머스: 짝지어 제거하기)

```js
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
```

