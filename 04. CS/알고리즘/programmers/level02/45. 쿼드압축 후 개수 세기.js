function solution(arr) {
  const ZeroOneArr = [0, 0];

  function dfs(array) {
    const len = array.length;
    const sum = array.flat().reduce((pre, cur) => pre + cur);
    if (sum === 0) {
      ZeroOneArr[0]++;
      return;
    } else if (sum === len ** 2) {
      ZeroOneArr[1]++;
      return;
    }

    const quardLen = len / 2;
    const quardrant1 = array
      .slice(0, quardLen)
      .map((row) => row.slice(quardLen));

    const quardrant2 = array
      .slice(0, quardLen)
      .map((row) => row.slice(0, quardLen));

    const quardrant3 = array
      .slice(quardLen)
      .map((row) => row.slice(0, quardLen));

    const quardrant4 = array.slice(quardLen).map((row) => row.slice(quardLen));

    dfs(quardrant1);
    dfs(quardrant2);
    dfs(quardrant3);
    dfs(quardrant4);
  }

  dfs(arr);

  return ZeroOneArr;
}
