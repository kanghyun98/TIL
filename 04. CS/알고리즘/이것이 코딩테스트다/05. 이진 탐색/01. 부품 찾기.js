// 문제
// 부품 N개, 손님이 M개 종류의 부품 구매 (1 <= N <= 1,000,000 , 1 <= M <= 100,000)
// 가게 안에 부품이 모두 있는지 확인, 요청 부품 순서대로 있으면 yes, 없으면 no 출력

// 아이디어
// 1. 각 원소를 이진 탐색을 이용하여 찾기
// 정렬하는데 O(NlogN), 1개 찾는데 O(logN), M개 찾는데 O(MlogN)

// 2. N을 Object의 키로 등록 후, M을 Object에서 확인하는 방법
// 정렬 필요 X, O(N+M)  -> 더 좋지만,, 이진 탐색 연습 문제니깐 1번 사용!!

function solve(...inputs) {
  const N = Number(inputs[0]);
  const listN = inputs[1].split(' ').map(Number);
  const M = Number(inputs[2]);
  const listM = inputs[3].split(' ').map(Number);

  // 정렬
  const sortedListN = listN.sort((a, b) => a - b);

  const answer = [];
  // 이진 탐색 수행
  listM.forEach((m) => {
    const result = binarySearch(sortedListN, m, 0, N - 1) ? 'yes' : 'no';
    answer.push(result);
  });

  return answer;
}

function binarySearch(array, target, start, end) {
  while (start <= end) {
    const mid = Math.floor((start + end) / 2); // 중간점

    if (array[mid] === target) {
      return mid;
    } else if (array[mid] > target) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return;
}

// test
const answer1 = ['no', 'yes', 'yes'];
const test1 = solve('5', '8 3 7 9 2', '3', '5 7 9');
const result = answer1.join(' ') === test1.join(' ');
console.log(result);
