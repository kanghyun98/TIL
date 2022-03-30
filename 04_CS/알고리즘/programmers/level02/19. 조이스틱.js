function solution(name) {
  let alpCount = 0;
  const moveCountArr = [];

  // 이동) 오른쪽으로 쭉 가는 경우
  let moveRightCount = name.length - 1;
  while (name[moveRightCount] === 'A' && moveRightCount > 0) {
    moveRightCount--;
  }

  // 이동) 왼쪽으로 쭉 가는 경우
  let moveLeftCount = name.length - 1;
  while (name[name.length - moveLeftCount] === 'A' && moveLeftCount > 0) {
    moveLeftCount--;
  }

  let i = 0;
  while (i < name.length) {
    // 알파벳 전환
    const alp = name[i].charCodeAt();
    alpCount += alp < 79 ? alp - 65 : 91 - alp; // idx) A ~ N: 0 ~ 13 , Z ~ O: 1 ~ 12

    // 이동) 좌우 왔다갔다
    let endIndexOfA = i + 1;
    while (endIndexOfA < name.length - 1 && name[endIndexOfA] === 'A') {
      endIndexOfA++;
    }

    const [moveRightToStartA, moveLeftToEndA] = [i, name.length - endIndexOfA];
    moveCountArr.push(moveRightToStartA * 2 + moveLeftToEndA); // 오른쪽 갔다 왼쪽 다시
    moveCountArr.push(moveLeftToEndA * 2 + moveRightToStartA); // 왼쪽 갔다 오른쪽 다시

    i++;
  }

  const minMoveCount = Math.min(moveRightCount, moveLeftCount, ...moveCountArr);

  return alpCount + minMoveCount;
}
