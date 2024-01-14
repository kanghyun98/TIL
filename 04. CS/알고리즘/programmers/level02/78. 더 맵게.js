function solution(scoville, K) {
  const minHeap = new MinHeap();
  for (let i = 0; i < scoville.length; i++) {
    minHeap.insert(scoville[i]);
  }

  let count = 0;

  while (minHeap.size() >= 2 && minHeap.checkMin() < K) {
    const min1 = minHeap.popMin();
    const min2 = minHeap.popMin();
    const newFood = min1 + min2 * 2;

    minHeap.insert(newFood);
    count++;
  }

  if (minHeap.checkMin() < K) {
    return -1;
  }

  return count;
}

// Heap 구현
class MinHeap {
  constructor() {
    this.heap = [];
  }

  // size
  size() {
    return this.heap.length;
  }

  // 삽입
  insert(x) {
    this.heap.push(x);
    this.percolateUp(this.heap.length - 1);
  }

  percolateUp(i) {
    const parent = Math.floor((i - 1) / 2);

    if (i > 0 && this.heap[i] < this.heap[parent]) {
      this.swap(i, parent);
      this.percolateUp(parent);
    }
  }

  // 최솟값 추출
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

    if (child <= this.heap.length - 1) {
      if (
        right <= this.heap.length - 1 &&
        this.heap[child] > this.heap[right]
      ) {
        child = right;
      }

      if (this.heap[i] > this.heap[child]) {
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

  // 최솟값 확인
  checkMin() {
    return this.heap[0];
  }
}
