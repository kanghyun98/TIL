function solution(arr) {
  const len = arr.length;
  const answer = [arr[0]];

  for (let i = 0; i < len - 1; i++) {
    if (arr[i] !== arr[i + 1]) {
      answer.push(arr[i + 1]);
    }
  }

  return answer;
}

// 모범답안, 간결하게 표현할 수 있는 방법을 생각할 필요가 있는 것 같다! 고치자!!
function solution(arr) {
  return arr.filter((val, index) => val != arr[index + 1]);
}
