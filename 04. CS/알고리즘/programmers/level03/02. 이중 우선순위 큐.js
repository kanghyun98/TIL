function solution(operations) {
  const heap = new Heap();

  operations.forEach((operation) => {
    const [type, val] = operation.split(' ');
    if (type === 'I') {
      heap.insert(Number(val));
    }
    if (type === 'D') {
      if (Number(val) === 1) {
        heap.deleteMax();
      } else {
        heap.deleteMin();
      }
    }
  });

  const max = heap.deleteMax() || 0;
  const min = heap.deleteMin() || 0;

  return [max, min];
}

// MaxHeap 구현
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

  // 삭제 (최댓값)
  deleteMax() {
    if (this.heap.length > 0) {
      const max = this.heap[0];
      const popVal = this.heap.pop();
      if (this.heap.length > 0) {
        this.heap[0] = popVal;
        this.percolateDown(0);
      }
      return max;
    }
  }

  // 삭제 (최솟값)
  deleteMin() {
    if (this.heap.length > 0) {
      const startLeaf = Math.floor((this.heap.length - 2) / 2) + 1;
      let minVal = this.heap[startLeaf];
      let minIdx = startLeaf;

      for (let i = startLeaf; i < this.heap.length; i++) {
        if (this.heap[i] < minVal) {
          minVal = this.heap[i];
          minIdx = i;
        }
      }

      this.swap(minIdx, this.heap.length - 1);
      const min = this.heap.pop();
      return min;
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
}
