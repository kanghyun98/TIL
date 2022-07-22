const fetchData = require('../async.js');

describe('async', () => {
  test('async - return', () => {
    return fetchData().then((data) => {
      expect(data).toBe('peanut butter');
    });
  });

  test('async - resolves', () => {
    return expect(fetchData()).resolves.toBe('peanut butter');
  });

  test('async - rejects', () => {
    return expect(fetchData('error')).rejects.toMatch('network error');
  });

  test('async - await', async () => {
    const data = await fetchData();
    expect(data).toBe('peanut butter');
  });

  test('async - await + resolves', async () => {
    await expect(fetchData()).resolves.toBe('peanut butter');
  });

  test('async - await + rejects', async () => {
    await expect(fetchData('error')).rejects.toMatch('error');
  });

  test('async - callback', (done) => {
    fetchData().then((data) => {
      expect(data).toBe('peanut butter');
      done();
    });
  });
});
