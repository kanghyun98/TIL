function solve(...inputs) {
  const N = Number(inputs[0]);
  const arr = inputs[1].split(' ').map(Number);

  let left = 0;
  let right = N - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] == mid) return mid;
    if (arr[mid] > mid) right = mid - 1;
    else left = mid + 1;
  }
  return -1;
}

// test
const answer1 = 3;
const test1 = solve('5', '-15 -6 1 3 7');
console.log(answer1 === test1);

const answer2 = 2;
const test2 = solve('7', '-15 -4 2 8 9 13 15');
console.log(answer2 === test2);

const answer3 = -1;
const test3 = solve('7', '-15 -4 3 8 9 13 15');
console.log(answer3 === test3);
