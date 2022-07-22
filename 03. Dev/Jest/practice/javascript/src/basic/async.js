function fetchData(error) {
  if (error === 'error') {
    return Promise.reject('network error');
  }
  return Promise.resolve('peanut butter');
}

module.exports = fetchData;
