// 홀: 마지막에서 01 -> 10 or 맨앞 1 -> 10
// 짝: 무조건 끝에 1로 변경
function solution(numbers) {
  return numbers.map((num) => {
    if (num % 2) {
      // 홀
      const bin = num.toString(2);
      const targetIdx = bin.lastIndexOf('01');

      const res =
        targetIdx !== -1
          ? bin.slice(0, targetIdx) + '10' + bin.slice(targetIdx + 2)
          : bin.replace('1', '10');

      return parseInt(res, 2);
    } else {
      // 짝
      return num + 1;
    }
  });
}
