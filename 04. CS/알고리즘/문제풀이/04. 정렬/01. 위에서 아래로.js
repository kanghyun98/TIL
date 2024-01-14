function solve(...inputs) {
  const [n, ...arr] = inputs;

  const sortedArr = arr.sort((a, b) => b - a);

  const answer = sortedArr.join(' ');
  return answer;
}

// test
const answer1 = '27 15 12';
const test1 = solve(3, 15, 27, 12);
console.log(answer1 === test1);
