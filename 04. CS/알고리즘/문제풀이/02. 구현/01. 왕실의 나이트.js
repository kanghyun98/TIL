// prettier-ignore
function solve(input) {
  const x = Number(input[0].charCodeAt()) - 96; // a(97) -> 1로 변환
  const y = Number(input[1]);
  
  const dx = [-2, -2, 2, 2, -1, -1, 1, 1];
  const dy = [-1, 1, -1, 1, -2, 2, -2, 2];

  let count = 8;

  for(let i = 0; i < 8; i++) {
    if(x + dx[i] <= 0 || y + dy[i] <= 0) {
      count--;
    }
  }

  return count;
}

// test
const answer1 = 2;
const test1 = solve('a1');
console.log(test1 === answer1);
