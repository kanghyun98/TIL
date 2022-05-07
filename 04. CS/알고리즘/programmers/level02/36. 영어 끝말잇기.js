function solution(n, words) {
  const dictionary = {};
  dictionary[words[0]] = true;
  let turn = 0;

  for (let i = 1; i < words.length; i++) {
    // 중복 단어
    if (dictionary[words[i]]) {
      turn = i + 1;
      break;
    } else {
      dictionary[words[i]] = true;
    }

    // 끝말 잇지 못함
    if (words[i - 1].slice(-1) !== words[i][0]) {
      turn = i + 1;
      break;
    }
  }

  const wrongTime = Math.ceil(turn / n);
  const wrongPerson = turn === 0 ? 0 : turn % n === 0 ? n : turn % n;

  return [wrongPerson, wrongTime];
}
