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

  const [info, ...list] = inputList;

  const [N, M] = info.split(' ').map(Number);
  const arr = list.map((r) => r.split(' ').map(Number));

  let shortestCityChickenDist = Number.MAX_SAFE_INTEGER;

  const chickenList = [];
  const houseList = [];

  arr.forEach((li, rIdx) => {
    li.forEach((i, cIdx) => {
      if (i === 1) houseList.push([rIdx, cIdx]);
      if (i === 2) chickenList.push([rIdx, cIdx]);
    });
  });

  // 조합
  const chickenCombList = getCombination(chickenList, M);

  chickenCombList.forEach((selectedChickenList) => {
    const cityChickenDist = getCityChickenDist(houseList, selectedChickenList);
    if (cityChickenDist < shortestCityChickenDist) {
      shortestCityChickenDist = cityChickenDist;
    }
  });

  console.log(shortestCityChickenDist);

  /////////////////////////////
  process.exit();
});

// 거리 구하는 함수
function getDist(a, b) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

function getCityChickenDist(houseList, chickenList) {
  let cityChickenDist = 0;

  houseList.forEach((housePos) => {
    let chickenDist = Number.MAX_SAFE_INTEGER;

    chickenList.forEach((chickenPos) => {
      const dist = getDist(housePos, chickenPos);
      if (dist < chickenDist) chickenDist = dist;
    });

    cityChickenDist += chickenDist;
  });

  return cityChickenDist;
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
