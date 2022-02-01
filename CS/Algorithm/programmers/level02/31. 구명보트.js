function solution(people, limit) {
  let count = people.length;
  people.sort((a, b) => a - b);
  let i = 0;
  let j = people.length - 1;

  while (i < j) {
    if (people[i] + people[j] <= limit) {
      i++;
      count--;
    }

    j--;
  }

  return count;
}
