

[TOC]

### DFS

#### 타겟 넘버 만들기

 (프로그래머스: 타겟 넘버)

부가 설명) 주어진 n개의 정수의 합/차를 이용해 타겟 넘버를 몇 번 만들 수 있는지

##### DFS만 사용

```js
// dfs만 사용한 방식
function solution(numbers, target) {
  let count = 0;

  function dfs(level, sum) {
    if (level === numbers.length) {
      if (sum === target) count++;
      return;
    }

    dfs(level + 1, sum + numbers[level]);
    dfs(level + 1, sum - numbers[level]);
  }

  dfs(0, 0);

  return count;
}
```



##### n개의 정수를 이용해 구할 수 있는 숫자 조합(합) 만들기(DFS)

```js
// 빼줘야할 값을 먼저 구하고, 배열의 조합의 합을 이용해 count 구하기
function solution(numbers, target) {
  const totalSum = numbers.reduce((acc, cur) => acc + cur);
  if (totalSum === target) return 1;

  const minusSum = (totalSum - target) / 2;
  if (minusSum > Math.floor(minusSum)) return 0;

  let count = 0;

  function dfs(level, sum) {
    if (level === numbers.length) {
      if (sum === minusSum) count++;
      return;
    }

    dfs(level + 1, sum + numbers[level]);
    dfs(level + 1, sum);
  }

  dfs(0, 0);

  return count;
}
```

#####  
