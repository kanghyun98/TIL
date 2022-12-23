function solve(...inputs) {
  const [info, list] = inputs;

  const [N, x] = info.split(' ').map(Number);
  const numList = list.split(' ').map(Number);

  const firstIdx = binarySearch(numList, x, 0, numList.length - 1, 'first');
  const lastIdx = binarySearch(numList, x, 0, numList.length - 1, 'last');

  const count = lastIdx - firstIdx + 1;
  return firstIdx === undefined ? -1 : count;

  function binarySearch(array, target, start, end, type) {
    while (start <= end) {
      const mid = Math.floor((start + end) / 2); // 중간점

      if (type === 'first') {
        if (array[mid] === target && (mid === 0 || target > array[mid - 1])) {
          return mid;
        } else if (array[mid] >= target) {
          end = mid - 1;
        } else {
          start = mid + 1;
        }
      }

      if (type === 'last') {
        if (
          array[mid] === target &&
          (mid === array.length - 1 || target < array[mid + 1])
        ) {
          return mid;
        } else if (array[mid] > target) {
          end = mid - 1;
        } else {
          start = mid + 1;
        }
      }
    }

    return;
  }
}

// test
const answer1 = 4;
const test1 = solve('7 2', '1 1 2 2 2 2 3');
console.log(answer1 === test1);

const answer2 = -1;
const test2 = solve('7 4', '1 1 2 2 2 2 3');
console.log(answer2 === test2);
