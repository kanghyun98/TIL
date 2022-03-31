function solution(skill, skill_trees) {
  let count = 0;
  const reg = new RegExp(skill.split('').join('|'), 'g');

  skill_trees.forEach((tree) => {
    const matchResult = tree.match(reg);

    if (matchResult) {
      const newReg = new RegExp('^' + matchResult.join(''));
      if (newReg.test(skill)) count++;
    } else {
      count++;
    }
  });

  return count;
}
