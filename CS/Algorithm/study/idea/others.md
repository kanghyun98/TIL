- [배열의 각 원소의 개수 파악](#배열의-각-원소의-개수-파악)
  * [순서가 중요한 경우: 배열 반환](#순서가-중요한-경우-배열-반환)
  * [객체 반환](#객체-반환)
- [1부터 n까지를 원소로 갖는 배열 만들기](#1부터-n까지를-원소로-갖는-배열-만들기)
- [a부터 b 까지 합](#a부터-b-까지-합)



### 배열의 각 원소의 개수 파악

#### 순서가 중요한 경우 (배열 반환)
```js
// 프로그래머스: 실패율
const eachStageUserCount = Array(N).fill(0);

stages.forEach((num) => {
  eachStageUserCount[num - 1] += 1;
});
```



#### 객체 반환

```js
const values = ['a', 'b', 'c', 'c', 'd', 'b'];

const count = values.reduce((acc, cur) => {
  acc[cur] = (acc[cur] || 0) + 1;
  return acc;
}, {});
```



### 1부터 n까지를 원소로 갖는 배열 만들기

```js
[...Array(n)].map((_, i) => i + 1);
```



### a부터 b 까지 합

```js
const result = ((a + b) * (Math.abs(b - a) + 1)) / 2;
```

