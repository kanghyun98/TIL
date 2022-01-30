function solution(clothes) {
  const cloObj = {};

  clothes.forEach((cloth) => {
    const [cloName, cloType] = cloth;
    cloObj[cloType] = (cloObj[cloType] || 0) + 1;
  });

  return Object.values(cloObj).reduce((acc, cur) => acc * (cur + 1), 1) - 1;
}
