function solution(board, moves) {
  const len = board.length;
  const bucket = [];
  let answer = 0;

  // 이동 시키는 함수 (바구니에서 중복 지우기)
  const moveDollFunc = (picked) => {
    if (bucket[bucket.length - 1] === picked) {
      bucket.pop();
      answer += 2;
    } else {
      bucket.push(picked);
    }
  };

  // 뽑기 함수
  const pickDollFunc = (colNum) => {
    let picked;

    for (let i = 0; i < len; i++) {
      if (board[i][colNum - 1] === 0) continue;

      picked = board[i][colNum - 1];
      board[i][colNum - 1] = 0;
      break;
    }

    return picked;
  };

  // 실행
  moves.forEach((move) => {
    const picked = pickDollFunc(move);

    if (picked) {
      moveDollFunc(picked);
    }
  });

  return answer;
}
