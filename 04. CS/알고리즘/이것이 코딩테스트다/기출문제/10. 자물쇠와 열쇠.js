function solution(key, lock) {
  const keyLen = key.length;
  const lockLen = lock.length;

  // 자물쇠 포함한 확장 영역
  const lockArea = [...Array(lockLen * 3)].map(() =>
    Array(lockLen * 3).fill(0)
  );
  for (let i = 0; i < lockLen; i++) {
    for (let j = 0; j < lockLen; j++) {
      lockArea[i + lockLen][j + lockLen] = lock[i][j];
    }
  }

  for (let i = 0; i < 4; i++) {
    key = rotateRight90Deg(key);

    for (let a = 0; a < lockLen * 2; a++) {
      for (let b = 0; b < lockLen * 2; b++) {
        // 열쇠 넣기
        for (let x = 0; x < keyLen; x++) {
          for (let y = 0; y < keyLen; y++) {
            lockArea[a + x][b + y] += key[x][y];
          }
        }

        // 확인
        if (checkOpen(lockArea)) {
          return true;
        }

        // 열쇠 빼기
        for (let x = 0; x < keyLen; x++) {
          for (let y = 0; y < keyLen; y++) {
            lockArea[a + x][b + y] -= key[x][y];
          }
        }
      }
    }
  }

  return false;
}

// 전부 1인지 확인
function checkOpen(arr) {
  const len = arr.length / 3;

  for (let i = len; i < len * 2; i++) {
    for (let j = len; j < len * 2; j++) {
      if (arr[i][j] !== 1) {
        return false; // 안채워졌거나 돌기끼리 만났거나
      }
    }
  }

  return true;
}

function rotateRight90Deg(arr) {
  const r = arr.length;
  const c = arr[0].length;

  const res = [...Array(r)].map(() => Array(c).fill(0));

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      res[j][r - i - 1] = arr[i][j];
    }
  }

  return res;
}
