// forEach문을 사용했었는데, filter를 이용해 구현한 로직이 훨씬 깔끔하다.

// 내 풀이
function solution(lottos, win_nums) {
  let sameNumCount = 0;
  let zeroCount = 0;

  lottos.forEach((num) => {
    if (num === 0) {
      zeroCount += 1;
      return;
    }
    if (win_nums.includes(num)) sameNumCount += 1;
  });

  const worst = sameNumCount < 2 ? 6 : 7 - sameNumCount;
  const best =
    sameNumCount + zeroCount < 2 ? 6 : 7 - (sameNumCount + zeroCount);

  const answer = [best, worst];
  return answer;
}

// 모범 답안
function solution(lottos, win_nums) {
  const rank = [6, 6, 5, 4, 3, 2, 1];

  let minCount = lottos.filter((v) => win_nums.includes(v)).length;
  let zeroCount = lottos.filter((v) => !v).length;

  const maxCount = minCount + zeroCount;

  return [rank[maxCount], rank[minCount]];
}
