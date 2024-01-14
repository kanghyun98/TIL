function solution(n, weak, dist) {
  const weakCount = weak.length;
  const friendsCount = dist.length;

  // 원을 일자로 만들기
  for (let i = 0; i < weakCount; i++) {
    weak.push(n + weak[i]);
  }

  // 친구 순서 순열 구하기
  const friendsPermuArr = getPermutation(dist, friendsCount);

  let minFriendsCount = friendsCount + 1;

  // 취약 지점을 하나씩 시작 지점으로 두고 순회하면서 확인
  for (let i = 0; i < weakCount; i++) {
    friendsPermuArr.forEach((friendsArr) => {
      let count = 1;
      let maxMove = weak[i] + friendsArr[0]; // 최대 이동 위치

      // 취약 지점 순회
      for (let idx = i; idx < i + weakCount; idx++) {
        if (weak[idx] > maxMove) {
          count += 1;

          // 최대 친구 수 넘어가면 종료
          if (count > friendsCount) {
            break;
          }

          maxMove = weak[idx] + friendsArr[count - 1];
        }
      }

      minFriendsCount = Math.min(count, minFriendsCount);
    });
  }

  const answer = minFriendsCount > friendsCount ? -1 : minFriendsCount;

  return answer;
}

// * 추상화
// 순열 구하는 함수 (nPr)
const getPermutation = (arr, r) => {
  if (r === 1) return arr.map((val) => [val]);

  const result = [];
  arr.forEach((fixed, idx, origin) => {
    const rest = [...origin.slice(0, idx), ...origin.slice(idx + 1)];
    const permu = getPermutation(rest, r - 1);
    const attached = permu.map((val) => [fixed, ...val]);
    result.push(...attached);
  });

  return result;
};
