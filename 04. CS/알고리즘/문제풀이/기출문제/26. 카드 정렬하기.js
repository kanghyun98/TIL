const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let inputList = [];

rl.on('line', function (input) {
  inputList.push(input);
}).on('close', function () {
  ///////////////////////////////

  const [N, ...arr] = inputList;
  const cards = arr.map(Number);

  const heap = new MinHeap();
  cards.forEach((card) => {
    heap.insert(card);
  });

  let totalSum = 0;

  while (heap.size() > 1) {
    const a = heap.popMin();
    const b = heap.popMin();
    const sum = a + b;

    totalSum += sum;
    heap.insert(sum);
  }

  console.log(totalSum);

  /////////////////////////////
  process.exit();
});

class MinHeap {
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

  size() {
    return this.heap.length;
  }
}
