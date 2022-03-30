function solution(n, words) {
  const wordsSet = [...new Set(words)];

  let turn = 0;
  if (words.length !== wordsSet.length) {
    // 중복 단어
    for (let i = 0; i < words.length; i++) {
      if (!wordsSet[i]) turn = words.length;
      if (words[i] !== wordsSet[i]) {
        turn = i + 1;
        break;
      }
    }
  } else {
    // 끝말 잇지 못함
    for (let i = 0; i < words.length - 1; i++) {
      const last = words[i].length - 1;
      if (words[i][last] !== words[i + 1][0]) {
        turn = i + 2;
        break;
      }
    }
  }

  const wrongTime = Math.ceil(turn / n);
  const wrongPerson = turn === 0 ? 0 : turn % n === 0 ? n : turn % n;

  return [wrongPerson, wrongTime];
}
