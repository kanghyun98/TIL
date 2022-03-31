// 시간 감축 방법
function solution(bridge_length, weight, truck_weights) {
  let time = 0;
  let bridge = [[0, 0]]; // 무게, 나갈 시간
  let bridgeWeight = 0;

  while (bridge.length) {
    if (bridge[0][1] === time) bridgeWeight -= bridge.shift()[0]; // 현재 시간이 맨 앞의 나갈 시간과 같다면 내보내주기

    if (bridgeWeight + truck_weights[0] <= weight) {
      bridgeWeight += truck_weights[0];
      bridge.push([truck_weights.shift(), time + bridge_length]);
    } else {
      if (bridge[0]) time = bridge[0][1] - 1; // 최대치 넘기면 시간 업데이트
    }

    time++;
  }
  return time;
}

// 첫번째 방법 (시간 소모 큼)
function solution(bridge_length, weight, truck_weights) {
  const bridge = Array(bridge_length).fill(0); // bridge
  let time = 0;

  while (bridge.length) {
    time++;
    bridge.shift();

    if (truck_weights.length) {
      const bridgeWeight = bridge.reduce((acc, cur) => acc + cur);
      if (bridgeWeight + truck_weights[0] <= weight) {
        bridge.push(truck_weights.shift());
      } else {
        bridge.push(0);
      }
    }
  }

  return time;
}
