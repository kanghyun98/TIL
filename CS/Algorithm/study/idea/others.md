- [배열의 각 원소의 개수 파악](#배열의-각-원소의-개수-파악)
  * [순서가 중요한 경우: 배열 반환](#순서가-중요한-경우-배열-반환)
  * [객체 반환](#객체-반환)
- [1부터 n까지를 원소로 갖는 배열 만들기](#1부터-n까지를-원소로-갖는-배열-만들기)
- [기본 행렬 만들기](#기본-행렬-만들기)
- [a부터 b 까지 합](#a부터-b-까지-합)
- [조합](#조합)



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
const arr = [...Array(n)].map((_, i) => i + 1);
```



### 기본 행렬 만들기

```js
// 행으로 1씩 증가
const arr = [...Array(rows)].map((_, r) =>
  [...Array(columns)].map((_, c) => r * columns + c + 1)
);
```

```js
// 0으로 채우기
const arr = [...Array(rows)].map(() => Array(cols).fill(0));
```



### a부터 b 까지 합

```js
const result = ((a + b) * (Math.abs(b - a) + 1)) / 2;
```



### 조합

```js
// 방법1) 반복문
const getCombinations = (arr, selectNumber) => {
  const results = [];
  if (selectNumber === 1) return arr.map((element) => [element]);

  arr.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1); // 해당하는 fixed를 제외한 나머지 뒤
    const combinations = getCombinations(rest, selectNumber - 1); // 나머지에 대해서 조합을 구한다.
    const attached = combinations.map((element) => [fixed, ...element]); //  돌아온 조합에 떼 놓은(fixed) 값 붙이기
    results.push(...attached); // 배열 spread syntax 로 모두다 push
  });

  return results; // 결과 담긴 results return
};
```

```js
// 방법2) dfs
const newMenus = {};
const dfs = (level, str, fullStr) => {
  if (level === fullStr.length) {
    if (str.length > 1) {
      const targetStr = str.split('').sort().join('');
      newMenus[targetStr] = (newMenus[targetStr] || 0) + 1;
    }
    return;
  }
  dfs(level + 1, str, fullStr);
  dfs(level + 1, str + fullStr[level], fullStr);
};

orders.forEach((order) => {
  dfs(0, '', order);
});
```

