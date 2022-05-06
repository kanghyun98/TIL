// dfs를 사용하여 해결
function solution(numbers, target) {
  let count = 0;

  function dfs(level, sum) {
    if (level === numbers.length) {
      if (sum === target) count++;
      return;
    }

    dfs(level + 1, sum + numbers[level]);
    dfs(level + 1, sum - numbers[level]);
  }

  dfs(0, 0);

  return count;
}
