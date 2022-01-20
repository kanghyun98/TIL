// 5x5배열 0으로 채우고, P이면 상하좌우와 자신 -1, X이면 자신+100 을 해준 후
// -2 이하의 값이 존재하면 해당 place는 방역수칙 어김
function solution(places) {
  const answer = places.map((place) => {
    let result = 1;
    const arr = [...Array(5)].map(() => Array(5).fill(0)); // 5x5 배열 (with 0)

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (place[i][j] === 'P') {
          if (i + 1 <= 4) arr[i + 1][j] -= 1; // 상
          if (i - 1 >= 0) arr[i - 1][j] -= 1; // 하
          if (j - 1 >= 0) arr[i][j - 1] -= 1; // 좌
          if (j + 1 <= 4) arr[i][j + 1] -= 1; // 우
          arr[i][j] -= 1; // 자신
        } else if (place[i][j] === 'X') arr[i][j] += 100;
      }
    }

    arr.flat().forEach((num) => {
      if (num <= -2) result = 0;
    });

    return result;
  });

  return answer;
}
