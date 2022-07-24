// TDD 연습
class Stack {
  constructor() {
    this.array = [];
  }

  size() {
    return this.array.length;
  }

  push(item) {
    this.array.push(item);
  }

  pop() {
    if (this.array.length === 0) {
      throw new Error();
    }

    this.array.pop();
  }
}

module.exports = Stack;
