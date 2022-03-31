// 모범답안에서 제곱근이 정수이면 약수의 갯수가 홀수인 것을 이용하였다.
// 아이디어 차이

function solution(left, right) {
  // 약수의 개수 구하기
  const getDivisorsCount = (num) => {
    let count = 0;
    for (let i = 1; i <= Math.sqrt(num); i++) {
      if (i ** 2 === num) count += 1;
      else if (num % i === 0) count += 2;
    }

    return count;
  };

  // 계산
  let answer = 0;

  for (let i = left; i <= right; i++) {
    if (getDivisorsCount(i) % 2 === 0) answer += i;
    else answer -= i;
  }

  return answer;
}

// 모범 답안
function solution(left, right) {
  let answer = 0;
  for (let i = left; i <= right; i++) {
    if (Number.isInteger(Math.sqrt(i))) {
      answer -= i;
    } else {
      answer += i;
    }
  }
  return answer;
}
