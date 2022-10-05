// SJF (Shortes Job First) 방식을 사용
// turnarund time = 요청이 들어온 시간 - 요청이 종료된 시간
// 요청 대기 목록: 우선순위 큐
// 요청 완료 목록: 배열 (요소: trunaround time)

function solution(jobs) {
  const len = jobs.length;

  // 요청되는 시점 기준으로 오름차순 정렬 (같은 경우 실행 시간 오름차순 정렬)
  jobs.sort((a, b) => {
    return a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1];
  });

  const waitQueue = new Heap(); // 요청 대기 목록
  waitQueue.insert(jobs[0]);

  const finArr = []; // 요청 완료 목록

  let nowTime = jobs[0][0]; // 현재 시간 (처음 요청 들어온 시간으로 초기화)
  let turn = 1; // 순서

  // 모두 실행될 때까지 반복
  while (finArr.length < len) {
    // 대기 큐에 현재 시간까지 요청 들어온 목록 채워넣기
    while (jobs[turn] && jobs[turn][0] <= nowTime) {
      waitQueue.insert(jobs[turn]);
      turn++;
    }

    // 현재까지 들어온 요청이 없는 경우, 다음 요청으로 시간 업데이트
    if (waitQueue.size() === 0) {
      nowTime = jobs[turn][0];
      continue;
    }

    // 현재 시점에서 요청이 들어온 목록 중, 실행 시간이 가장 짧은 요청 실행
    const [reqTime, execTime] = waitQueue.popMin();

    nowTime += execTime;
    const turnaround = nowTime - reqTime;
    finArr.push(turnaround);
  }

  // average turnaround time
  const sum = finArr.reduce((acc, cur) => acc + cur, 0);
  const result = Math.floor(sum / len);

  return result;
}

// minHeap
class Heap {
  constructor() {
    this.heap = [];
  }

  // 삽입
  insert(x) {
    this.heap.push(x);
    this.percolateUp(this.heap.length - 1);
  }

  percolateUp(i) {
    const parent = Math.floor((i - 1) / 2);

    // 요청 시간 기준 정렬하도록 힙 수정
    if (i > 0 && this.heap[i][1] < this.heap[parent][1]) {
      this.swap(i, parent);
      this.percolateUp(parent);
    }
  }

  // popMin (최댓값 삭제)
  popMin() {
    if (this.heap.length > 0) {
      const min = this.heap[0];
      const last = this.heap.pop();
      if (this.heap.length > 0) {
        this.heap[0] = last;
        this.percolateDown(0);
      }
      return min;
    }
  }

  percolateDown(i) {
    let child = 2 * i + 1;
    const right = 2 * i + 2;

    // 요청 시간 기준 정렬하도록 힙 수정
    if (child <= this.heap.length - 1) {
      if (
        right <= this.heap.length - 1 &&
        this.heap[child][1] > this.heap[right][1]
      ) {
        child = right;
      }

      if (this.heap[i][1] > this.heap[child][1]) {
        this.swap(i, child);
        this.percolateDown(child);
      }
    }
  }

  // 교환
  swap(a, b) {
    if (a !== b) {
      const tmp = this.heap[a];
      this.heap[a] = this.heap[b];
      this.heap[b] = tmp;
    }
  }

  // heap size
  size() {
    return this.heap.length;
  }
}
