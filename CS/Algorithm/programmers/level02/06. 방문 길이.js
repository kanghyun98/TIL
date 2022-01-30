function solution(dirs) {
  const location = [0, 0];
  const arr = [];

  const movedLog = (order) => {
    const before = [...location];

    if (order === 'U') location[1] += location[1] !== 5 ? 1 : 0;
    else if (order === 'D') location[1] -= location[1] !== -5 ? 1 : 0;
    else if (order === 'L') location[0] -= location[0] !== -5 ? 1 : 0;
    else if (order === 'R') location[0] += location[0] !== 5 ? 1 : 0;
    else return;

    return [before.join(','), location.join(',')];
  };

  dirs.split('').forEach((ord) => {
    const [a, b] = movedLog(ord);
    if (a !== b) {
      const res = arr.findIndex(
        (data) =>
          (data[0] === a || data[0] === b) && (data[1] === a || data[1] === b)
      );
      if (res === -1) arr.push([a, b]);
    }
  });

  return arr.length;
}
