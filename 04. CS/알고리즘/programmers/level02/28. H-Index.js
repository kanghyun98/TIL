// h번 이상 인용된 논문이 h편 이상, 나머지는 h번 이하
function solution(citations) {
  let h = 0;

  citations
    .sort((a, b) => b - a)
    .forEach((val) => {
      if (val > h) h++;
    });

  return h;
}
