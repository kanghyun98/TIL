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
  const N = Number(lenInfo);
  let answer = 'NO';

  const teacherPos = [];
  const nothingList = [];

  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];

  const graph = arr.map((r, i) =>
    r.split(' ').map((n, j) => {
      if (n === 'T') teacherPos.push([i, j]);
      if (n === 'X') nothingList.push([i, j]);

      return n;
    })
  );

  // 벽 3개 세우는 모든 경우의 수 작업
  const combList = getCombination(nothingList, 3);

  combList.forEach((newWallInfo) => {
    // 새로운 벽 3개 추가
    const copiedGraph = graph.map((r) => [...r]); // 배열 깊은 복사
    newWallInfo.forEach((pos) => {
      const [x, y] = pos;
      copiedGraph[x][y] = 'O';
    });

    let canAvoidThisTurn = true;

    // 선생님 마주치는지 확인
    teacherPos.forEach((pos) => {
      const [x, y] = pos;
      let canAvoidThisTeacher = true;

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        const dir = [dx[i], dy[i]];

        const canAvoidThisLine = dfs(copiedGraph, nx, ny, dir);

        if (!canAvoidThisLine) {
          canAvoidThisTeacher = false;
        }
      }

      if (!canAvoidThisTeacher) {
        canAvoidThisTurn = false;
      }
    });

    if (canAvoidThisTurn) {
      answer = 'YES';
    }
  });

  console.log(answer);

  // * 추상화
  // 감시를 피할 수 있는지 반환
  function dfs(graph, x, y, dir) {
    if (x < 0 || x >= N || y < 0 || y >= N) {
      return true;
    }

    // 벽
    if (graph[x][y] === 'O') {
      return true;
    }

    // 마주쳤는지 확인
    if (graph[x][y] === 'S') {
      return false;
    }

    const [dx, dy] = dir;
    const nx = x + dx;
    const ny = y + dy;

    const res = dfs(graph, nx, ny, dir);

    return res;
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
