function solution(user_id, banned_id) {
  const list = banned_id.map((id) => {
    const s = id.replaceAll('*', '.');
    const reg = new RegExp(`^${s}$`);

    const arr = [];
    user_id.forEach((tid, idx) => {
      if (reg.test(tid)) arr.push([idx, tid]);
    });

    return arr;
  });

  const answerList = [];
  const visited = Array(user_id.length).fill(false);

  const dfs = (lev, arr) => {
    if (lev === list.length) {
      if (arr.length === list.length) {
        answerList.push([...arr]);
      }

      return;
    }

    for (let i = 0; i < list[lev].length; i++) {
      const [idx, name] = list[lev][i];

      if (!visited[idx]) {
        visited[idx] = true;
        arr.push(name);
        dfs(lev + 1, arr);
        arr.pop();
        visited[idx] = false;
      }
    }
  };

  dfs(0, []);

  // 중복 제거
  const answer = [...new Set(answerList.map((a) => a.sort().join()))].length;

  return answer;
}
