function solve(...inputs) {
  const nums = inputs[1].split(' ').map(Number);

  let groupCount = 0;

  nums.sort((a, b) => a - b); // 오름차순 정렬

  // 공포도 낮은 순으로 그룹 멤버 모으는 방식
  let memberCount = 0;
  nums.forEach((n) => {
    memberCount += 1;

    if (memberCount === n) {
      groupCount += 1;
      memberCount = 0;
    }
  });

  return groupCount;
}

// test
const answer1 = 2;
const test1 = solve(5, '2 3 1 2 2');
console.log(answer1 === test1);
