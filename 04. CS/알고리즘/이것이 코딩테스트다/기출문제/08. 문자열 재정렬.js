function solve(...inputs) {
  const arr = inputs[0].split('');

  const alps = [];
  const nums = [];

  arr.forEach((str) => {
    const num = Number(str);

    if (isNaN(num)) {
      alps.push(str);
    } else {
      nums.push(num);
    }
  });

  alps.sort();
  const sum = nums.reduce((acc, cur) => acc + cur, 0);

  const result = alps.join('') + sum;
  return result;
}

// test
const answer1 = 'ABCKK13';
const test1 = solve('K1KA5CB7');
console.log(answer1 === test1);

const answer2 = 'AJKDLSI412K4JSJ9D';
const test2 = solve('ADDIJJJKKLSS20');
console.log(answer1 === test1);
