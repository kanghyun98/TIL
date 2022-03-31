function solution(files) {
  // 파일 이름 분해
  const arr = files.map((file) => {
    const number = String(file.match(/\d{1,5}/));
    const [head, ...tail] = file.split(number);

    return [head, number, tail.join(number)];
  });

  // 정렬 함수
  const sortFunc = (a, b) => {
    const [aHead, aNumber, aTail] = a;
    const [bHead, bNumber, bTail] = b;

    if (aHead.toLowerCase() > bHead.toLowerCase()) {
      return 1;
    } else if (aHead.toLowerCase() < bHead.toLowerCase()) {
      return -1;
    } else {
      return Number(aNumber) - Number(bNumber);
    }
  };

  return arr.sort(sortFunc).map((v) => v.join(''));
}
