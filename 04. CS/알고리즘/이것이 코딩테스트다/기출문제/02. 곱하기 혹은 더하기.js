function solve(input) {
  const nums = input.split('').map(Number);

  let result = 0;
  nums.forEach((num) => {
    const addRes = result + num;
    const mulRes = result * num;

    result = Math.max(addRes, mulRes);
  });

  return result;
}

// test
const answer1 = 576;
const test1 = solve('02984');
console.log(answer1 === test1);

const answer2 = 210;
const test2 = solve('567');
console.log(answer2 === test2);
