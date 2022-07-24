const Stack = require('../stack.js');

describe('Stack', () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  test('init', () => {
    expect(stack.size()).toBe(0);
  });

  test('push', () => {
    stack.push('a');

    expect(stack.size()).toBe(1);
  });

  describe('pop', () => {
    test('pop - empty', () => {
      expect(() => stack.pop()).toThrow();
    });

    test('pop', () => {
      stack.push('a');
      stack.pop();

      expect(stack.size()).toBe(0);
    });
  });
});
