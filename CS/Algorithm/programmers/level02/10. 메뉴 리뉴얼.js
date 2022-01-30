function solution(orders, course) {
  // orders로 조합 생성(num개 메뉴, nCnum)
  const getComb = (num) => {
    const newMenus = {};

    const dfs = (level, str, fullStr) => {
      if (level === fullStr.length) {
        if (str.length === num) {
          const targetStr = str.split('').sort().join(''); // 순서 고려 x
          newMenus[targetStr] = (newMenus[targetStr] || 0) + 1;
        }
        return;
      }
      dfs(level + 1, str, fullStr);
      dfs(level + 1, str + fullStr[level], fullStr);
    };

    orders.forEach((order) => {
      dfs(0, '', order);
    });

    return newMenus;
  };

  // 정답 반환할 배열
  const answer = [];

  // course 개수 별로 돌리기
  course.forEach((courseCount) => {
    let maxArr = [];
    let maxNum = 0;

    const newMenus = getComb(courseCount);

    Object.keys(newMenus).forEach((key) => {
      if (newMenus[key] >= 2 && newMenus[key] >= maxNum) {
        newMenus[key] === maxNum ? maxArr.push(key) : (maxArr = [key]);
        maxNum = newMenus[key];
      }
    });

    answer.push(...maxArr);
  });

  return answer.sort();
}
