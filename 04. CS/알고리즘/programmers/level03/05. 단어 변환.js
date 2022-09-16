// bfs
function solution(begin, target, words) {
  let answer = 0;

  const checked = Array(words.length).fill(0);

  const queue = [[begin, 0]];

  while (queue.length) {
    const [word, count] = queue.shift();

    if (word === target) {
      answer = count;
      break;
    }

    words.forEach((nextWord, idx) => {
      if (!checked[idx] && checkOneDiff(nextWord, word)) {
        queue.push([nextWord, count + 1]);
        checked[idx] = 1;
      }
    });
  }

  return answer;
}

function checkOneDiff(word1, word2) {
  let count = 0;
  let len = word1.length;
  let answer = true;

  for (let i = 0; i < len; i++) {
    if (word1[i] !== word2[i]) {
      count++;
    }

    if (count >= 2) {
      answer = false;
      break;
    }
  }

  return answer;
}
