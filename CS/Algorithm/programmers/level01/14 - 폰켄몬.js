function solution(nums) {
  const typeNum = new Set(nums).size;
  const reqNum = nums.length / 2;

  return typeNum > reqNum ? reqNum : typeNum;
}
