const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let inputList = [];

rl.on('line', function (input) {
  inputList.push(input);
}).on('close', function () {
  ///////////////////////////////

  const [lenInfo, ...arr] = inputList;
  const [N, M] = lenInfo.split(' ').map(Number);

  const virusPos = [];
  const list = [];
  let blockCount = 0;
  let maxSafeCount = 0;

  const graph = arr.map((r, i) =>
    r.split(' ').map((n, j) => {
      if (n === '2') virusPos.push([i, j]);
      if (n === '1') blockCount += 1;
      if (n === '0') list.push([i, j]); // 벽 3개 세우는 모든 경우의 수 작업

      return Number(n);
    })
  );

  const combList = getCombination(list, 3);

  combList.forEach((newWallInfo) => {
    // 새로운 벽 3개
    const copiedGraph = graph.map((r) => [...r]); // 배열 깊은 복사
    newWallInfo.forEach((pos) => {
      const [x, y] = pos;
      copiedGraph[x][y] = 1;
    });

    // 감염 구역 개수 구하기
    let virusCount = 0;
    virusPos.forEach((pos) => {
      const [x, y] = pos;
      virusCount += dfs(copiedGraph, x, y, virusCount);
    });

    // 안전구역 개수 구하기
    const safeCount = N * M - (virusCount + blockCount + 3);

    if (safeCount > maxSafeCount) maxSafeCount = safeCount;
  });

  console.log(maxSafeCount);

  // ** 추상화
  // 바이러스 감염 구역 구하기 -> dfs
  function dfs(graph, x, y, count) {
    const dx = [0, 0, 1, -1];
    const dy = [1, -1, 0, 0];

    // 감염 처리, 다음 노드 선택
    let sumCount = 0;
    graph[x][y] = 2;
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      // 유효범위 벗어나는 경우
      if (nx < 0 || nx >= N || ny < 0 || ny >= M) {
        continue;
      }

      // 벽 or 이미 감염구역인 경우
      if (graph[nx][ny] === 1 || graph[nx][ny] === 2) {
        continue;
      }

      sumCount += dfs(graph, nx, ny, count);
    }

    return sumCount + 1;
  }

  // nCr 조합 구하는 함수
  function getCombination(arr, r) {
    if (r === 1) return arr.map((val) => [val]);

    const result = [];
    arr.forEach((fixed, idx, origin) => {
      const rest = origin.slice(idx + 1); // 조합
      const comb = getCombination(rest, r - 1);
      const attached = comb.map((val) => [fixed, ...val]);
      result.push(...attached);
    });

    return result;
  }

  /////////////////////////////
  process.exit();
});
