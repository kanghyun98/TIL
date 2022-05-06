function solution(record) {
  const nicknameById = {}; // id별 닉네임 관리
  const logList = []; // 배열 형태로 저장 [logType, uid]

  record.forEach((log) => {
    const [logType, uid, nickname] = log.split(' ');

    // Enter, Change -> 닉네임 등록 및 변경
    if (logType !== 'Leave') {
      nicknameById[uid] = nickname;
    }

    // Enter, Leave -> 로그에 추가
    if (logType !== 'Change') {
      logList.push([logType, uid]);
    }
  });

  const result = logList.map((log) => {
    const [logType, uid] = log;
    return makeOutput(logType, nicknameById[uid]);
  });

  return result;
}

function makeOutput(logType, nickname) {
  return logType === 'Enter'
    ? `${nickname}님이 들어왔습니다.`
    : `${nickname}님이 나갔습니다.`;
}
