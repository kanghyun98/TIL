function solution(m, musicinfos) {
  const newMelody = change(m);
  const answer = { title: '(None)', time: 0 };

  for (const info of musicinfos) {
    const [startTime, finishTime, title, score] = info.split(',');

    const playTime = getTime(startTime, finishTime);
    const newScore = change(score);

    const diff = playTime - newScore.length;
    const target =
      diff >= 0
        ? newScore.repeat(playTime / newScore.length) +
          newScore.slice(0, playTime % newScore.length)
        : newScore.slice(0, diff);

    if (target.includes(newMelody) && playTime > answer.time) {
      answer.title = title;
      answer.time = playTime;
    }
  }

  return answer.title;
}

function change(val) {
  return val.replace(/\w#/g, (a) => a[0].toLowerCase());
}

function getTime(start, finish) {
  const [startHour, startMin] = start.split(':').map(Number);
  const [finishHour, finishMin] = finish.split(':').map(Number);

  return (finishHour - startHour) * 60 + finishMin - startMin;
}
