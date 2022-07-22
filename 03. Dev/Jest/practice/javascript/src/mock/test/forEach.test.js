const forEach = require('../forEach.js');

describe('mock - basic', () => {
  let mockCallback;

  beforeEach(() => {
    mockCallback = jest.fn((x) => 42 + x);
    forEach([0, 1], mockCallback);
  });

  // The mock function is called twice
  test('call length', () => {
    expect(mockCallback.mock.calls.length).toBe(2);
  });

  // The first argument of the first call to the function was 0
  test('call argument first', () => {
    expect(mockCallback.mock.calls[0][0]).toBe(0);
  });

  // The first argument of the second call to the function was 1
  test('call argument second', () => {
    expect(mockCallback.mock.calls[1][0]).toBe(1);
  });

  // The return value of the first call to the function was 42
  test('call return value first', () => {
    expect(mockCallback.mock.results[0].value).toBe(42);
  });

  // The return value of the second call to the function was 43
  test('call return value first', () => {
    expect(mockCallback.mock.results[1].value).toBe(43);
  });
});
