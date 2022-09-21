function solution(genres, plays) {
  // key: genre, val: {total: n, top: [{idx: n, play: n }, {idx: n, play: n }]}
  const info = {};

  genres.forEach((genre, idx) => {
    if (!info[genre]) {
      info[genre] = { total: 0, top: [] };
    }

    // 장르 별 총 play time
    info[genre].total += plays[idx];

    // 장르 별 상위 2곡
    info[genre].top.push({ idx, play: plays[idx] });
    info[genre].top.sort((a, b) => b.play - a.play);
    info[genre].top.splice(2, 1);
  });

  const answer = Object.keys(info)
    .sort((a, b) => info[b].total - info[a].total)
    .map((genre) => info[genre].top.map((obj) => obj.idx))
    .flat();

  return answer;
}
