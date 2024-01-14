// TODO
function solution(words, queries) {
  // 단어 길이 별 저장 (?가 접두사인 경우를 위한 역순도 저장)
  const arrByLen = {};
  const arrByLenRev = {};

  words.forEach((word) => {
    const len = word.length;
    if (!arrByLen[len]) {
      arrByLen[len] = [];
      arrByLenRev[len] = [];
    }

    arrByLen[len].push(word);
    arrByLenRev[len].push(reverseStr(word));
  });

  // 정렬
  Object.keys(arrByLen).forEach((key) => {
    arrByLen[key].sort();
    arrByLenRev[key].sort();
  });

  const answer = queries.map((query) => {
    const len = query.length;
    const targetArr = isPrefix(query) ? arrByLenRev[len] : arrByLen[len];
    const targetQuery = isPrefix(query) ? reverseStr(query) : query;

    if (!targetArr) {
      return 0;
    }

    const pattern = targetQuery.replaceAll('?', '.');
    const reg = new RegExp(pattern, 'i');

    const firstIdx = findWordsCount(targetArr, reg, 'first');
    const lastIdx = findWordsCount(targetArr, reg, 'last');

    const count = lastIdx - firstIdx + 1;
    return firstIdx === undefined ? 0 : count;
  });

  return answer;
}

// 문자 뒤집기
function reverseStr(str) {
  return str.split('').reverse().join('');
}

// '?'가 접두사인지
function isPrefix(query) {
  return query[0] === '?';
}

// Binary Search
function findWordsCount(arr, reg, type) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (type === 'first') {
      if (reg.test(arr[mid]) && (mid === 0 || !reg.test(arr[mid - 1]))) {
        return mid;
      } else if (reg.test(arr[mid - 1])) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }

    if (type === 'last') {
      if (
        reg.test(arr[mid]) &&
        (mid === arr.length - 1 || !reg.test(arr[mid + 1]))
      ) {
        return mid;
      } else if (reg.test(arr[mid + 1])) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
  }
}
