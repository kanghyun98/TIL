function solution(dirs) {
  const nowLoc = [0, 0];
  const dir = { U: [0, 1], D: [0, -1], L: [-1, 0], R: [1, 0] };
  const log = new Set();

  dirs.split('').forEach((ord) => {
    const [nx, ny] = [nowLoc[0] + dir[ord][0], nowLoc[1] + dir[ord][1]];

    if (nx >= -5 && nx <= 5 && ny >= -5 && ny <= 5) {
      log.add(`${nowLoc[0]} ${nowLoc[1]} ${nx} ${ny}`);
      log.add(`${nx} ${ny} ${nowLoc[0]} ${nowLoc[1]}`);
      nowLoc[0] = nx;
      nowLoc[1] = ny;
    }
  });

  return log.size / 2;
}
