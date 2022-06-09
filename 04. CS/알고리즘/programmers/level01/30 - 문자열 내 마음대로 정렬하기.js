function solution(strings, n) {
  const compare = (a, b) => {
    if (a[n] !== b[n]) {
      return a[n] > b[n] ? 1 : a[n] < b[n] ? -1 : 0;
    }

    return a > b ? 1 : a < b ? -1 : 0;
  };

  return strings.sort(compare);
}
