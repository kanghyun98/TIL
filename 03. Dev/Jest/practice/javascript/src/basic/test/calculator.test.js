const Calculator = require('../calculator.js');

describe('test Calculator', () => {
  let calc;

  beforeEach(() => {
    calc = new Calculator();
  });

  // test() 대신 it() 사용가능
  test('init value', () => {
    expect(calc.value).toBe(0);
  });

  test('set', () => {
    calc.set(10);
    expect(calc.value).toBe(10);
  });

  test('clear', () => {
    calc.set(10);
    calc.clear();
    expect(calc.value).toBe(0);
  });

  describe('add', () => {
    test('add basic', () => {
      calc.set(10);
      calc.add(2);
      expect(calc.value).toBe(12);
    });

    test('add error', () => {
      expect(() => calc.add(1000)).toThrow();
    });
  });

  test('subtract', () => {
    calc.set(10);
    calc.subtract(2);
    expect(calc.value).toBe(8);
  });

  test('multiply', () => {
    calc.set(10);
    calc.multiply(2);
    expect(calc.value).toBe(20);
  });

  describe('divide', () => {
    test('divide basic', () => {
      calc.set(10);
      calc.divide(2);
      expect(calc.value).toBe(5);
    });

    test('0 / 0 === NaN', () => {
      calc.divide(0);
      expect(calc.value).toBe(NaN);
    });

    test('1 / 0 === Infinity', () => {
      calc.set(1);
      calc.divide(0);
      expect(calc.value).toBe(Infinity);
    });
  });
});
