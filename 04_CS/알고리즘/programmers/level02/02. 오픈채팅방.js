// Enter/Leave이면 문자열 생성
// Enter uid1234만 배열로 저장
// nickname을 객체로 관리

function solution(record) {
  const outputArr = [];
  const nicknameObj = {};

  record.forEach((rec) => {
    const [recType, uid, nickname] = rec.split(' ');

    if (recType !== 'Leave') nicknameObj[uid] = nickname;

    if (recType !== 'Change') outputArr.push([recType, uid]);
  });

  return outputArr.map(([recType, uid]) =>
    makeResult(nicknameObj[uid], recType)
  );
}

function makeResult(nickname, recType) {
  return recType === 'Enter'
    ? `${nickname}님이 들어왔습니다.`
    : `${nickname}님이 나갔습니다.`;
}
