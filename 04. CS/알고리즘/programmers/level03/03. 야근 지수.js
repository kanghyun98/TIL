function solution(n, works) {
  const heap = new Heap();

  // 삽입
  works.forEach((work) => heap.insert(work));

  for (let i = 0; i < n; i++) {
    heap.work();
  }

  return heap.getSumOfSquares();
}

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

    if (i > 0 && this.heap[i] > this.heap[parent]) {
      this.swap(i, parent);
      this.percolateUp(parent);
    }
  }

  // work
  work() {
    if (this.heap[0] > 0) {
      this.heap[0]--;
      this.percolateDown(0);
    }
  }

  percolateDown(i) {
    let child = 2 * i + 1;
    const right = 2 * i + 2;

    if (child <= this.heap.length - 1) {
      if (
        right <= this.heap.length - 1 &&
        this.heap[child] < this.heap[right]
      ) {
        child = right;
      }

      if (this.heap[i] < this.heap[child]) {
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

  getSumOfSquares() {
    return this.heap.reduce((acc, cur) => acc + cur ** 2, 0);
  }
}
