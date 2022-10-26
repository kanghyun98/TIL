// 문제
// 떡의 개수 N, 요청한 떡의 길이 M (1 <= N <= 1,000,000 , 1 <= M <= 2,000,000,000)
// 떡의 개별 높이가 주어질 때, 높이가 H인 절단기로 잘라내어 적어도 M만큼의 떡을 제공 -> 절단기 높이 구하기

// 아이디어
// 최적화된 절단기의 높이를 0 ~ 떡의 최대 길이 이진 탐색

function solve(input1, input2) {
  const [N, M] = input1.split(' ').map(Number);
  const arr = input2.split(' ').map(Number); // 떡의 개별 높이

  let start = 0;
  let end = Math.max(...arr);

  let answer = 0;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    const dduk = calcGetDDuk(arr, mid);

    if (dduk < M) {
      // 부족한 경우
      end = mid - 1;
    } else {
      // 많거나 같은 경우
      start = mid + 1;
      answer = mid;
    }
  }

  return answer;
}

function calcGetDDuk(arr, h) {
  let res = 0;

  arr.forEach((a) => {
    const last = a - h;
    if (last > 0) res += last;
  });

  return res;
}

// test
const answer1 = 15;
const test1 = solve('4 6', '19 15 10 17');
console.log(answer1 === test1);
