// 테스트케이스 13, 18, 20, 22, 24, 25, 27 실패
function solution(name) {
  let alpCount = 0;
  let moveCount = name.length - 1;

  while (name[moveCount] === 'A' && moveCount > 0) {
    moveCount--;
  }

  let i = 0;
  while (i < name.length) {
    // 알파벳
    const alp = name[i].charCodeAt();
    alpCount += alp < 79 ? alp - 65 : 91 - alp; // idx) A ~ N: 0 ~ 13 , Z ~ O: 1 ~ 12

    // 이동
    let beforeIdx = i;
    while (i + 1 < name.length && name[i + 1] === 'A') {
      i++;
    }

    moveCount = Math.min(moveCount, beforeIdx * 2 + name.length - i - 1);

    i++;
  }

  return alpCount + moveCount;
}
