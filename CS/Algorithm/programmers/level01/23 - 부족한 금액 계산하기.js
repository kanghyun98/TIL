function solution(price, money, count) {
  let total = 0;

  for (let i = 1; i <= count; i++) {
    total += price * i;
  }

  const answer = total - money < 0 ? 0 : total - money;

  return answer;
}

// 모범답안, 가우스 이용할 수 있다!
function solution(price, money, count) {
  const tmp = (price * count * (count + 1)) / 2 - money;
  return tmp > 0 ? tmp : 0;
}
