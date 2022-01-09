function solution(numbers, hand) {
  let answer = '';

  let leftLoc = 10; // *
  let rightLoc = 12; // #

  const alwaysLeft = [1, 4, 7];
  const alwaysRight = [3, 6, 9];

  // 이동거리 구하는 함수
  const getDist = (a, b) => {
    const diff = Math.abs(a - b);
    if (diff === 0) return 0;
    else if (diff === 1 || diff === 3) return 1;
    else if (diff === 2 || diff === 4 || diff === 6) return 2;
    else if (diff === 5 || diff === 7 || diff === 9) return 3;
    else if (diff === 8 || diff === 10) return 4;
  };

  // 손 옮기는 함수
  const moveHand = (where, targetNum) => {
    if (where === 'left') {
      leftLoc = targetNum;
      answer += 'L';
    } else {
      rightLoc = targetNum;
      answer += 'R';
    }
  };

  // 실행
  numbers.forEach((keypad) => {
    const targetNum = keypad === 0 ? 11 : keypad; // 0

    if (alwaysLeft.includes(targetNum)) moveHand('left', targetNum);
    else if (alwaysRight.includes(targetNum)) moveHand('right', targetNum);
    else {
      const diffL = getDist(targetNum, leftLoc);
      const diffR = getDist(targetNum, rightLoc);

      diffL < diffR
        ? moveHand('left', targetNum)
        : diffL > diffR
        ? moveHand('right', targetNum)
        : moveHand(hand, targetNum);
    }
  });

  return answer;
}
