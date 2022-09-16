function solution(routes) {
  routes.sort((a, b) => a[1] - b[1]); // 진출 기준 오름차순 정렬

  let count = 0;
  let camPoint = -30001; // 초기값 (범위가 -30000~30000 이므로)

  routes.forEach((route) => {
    // 진입 포인트가 camPoint보다 작으면 추가 X
    // 크면 해당 route의 진출 포인트를 다음 camPoint로 등록
    const [inPoint, outPoint] = route;

    if (inPoint > camPoint) {
      camPoint = outPoint;
      count++;
    }
  });

  return count;
}
