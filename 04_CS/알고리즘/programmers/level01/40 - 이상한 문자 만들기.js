function solution(s) {
  return s
    .split(' ')
    .map((word) => {
      return word
        .split('')
        .map((spell, idx) => {
          return idx % 2 === 0 ? spell.toUpperCase() : spell.toLowerCase();
        })
        .join('');
    })
    .join(' ');
}
