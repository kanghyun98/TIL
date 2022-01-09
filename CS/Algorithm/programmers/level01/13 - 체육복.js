// lost 순회하면서 reserve에 idx-1 or idx+1 포함하는지 확인, 하면 빼기 (둘 다 있으먄 앞에 애한테 먼저 빌리기)
// reserve에 lost idx 있으먄 걔는 reserve에서 빼기

function solution(n, lost, reserve) {
  // 여벌이 있는 사람이 도난 당한 경우 처리 & 정렬
  const sortedLost = [
    ...lost.filter((num) => !reserve.includes(num)).sort((a, b) => a - b),
  ];

  const sortedReserve = [
    ...reserve.filter((num) => !lost.includes(num)).sort((a, b) => a - b),
  ];

  let answer = n - sortedLost.length;

  // 아예 없는 사람의 경우 처리
  sortedLost.forEach((lostNum) => {
    const targetIdx = sortedReserve.findIndex(
      (reserveNum) => lostNum === reserveNum - 1 || lostNum === reserveNum + 1
    );

    if (targetIdx !== -1) {
      sortedReserve.splice(targetIdx, 1);
      answer++;
    }
  });

  return answer;
}

// 모범 답안
function solution(n, lost, reserve) {
  const realLost = lost.filter((l) => !reserve.includes(l));
  let realReserve = reserve.filter((r) => !lost.includes(r));
  return (
    n -
    realLost.filter((a) => {
      const b = realReserve.find((r) => Math.abs(r - a) <= 1); // -1,1 챠이 챶기
      if (!b) return true;
      realReserve = realReserve.filter((r) => r !== b);
    }).length
  );
}
