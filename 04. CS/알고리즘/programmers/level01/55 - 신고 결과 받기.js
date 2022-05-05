function solution(id_list, report, k) {
  const reportedList = {}; // 신고당한 유저별 신고 유저 정리
  const emailCountObj = {}; // 신고한 유저별 이메일 갯수

  const filteredReport = [...new Set(report)]; // 중복 신고 제거

  // reportedList 채우기
  filteredReport.forEach((el) => {
    const [reportUser, reportedUser] = el.split(' ');

    if (!reportedList[reportedUser]) {
      reportedList[reportedUser] = [];
    }
    reportedList[reportedUser].push(reportUser);
  });

  // emailCountObj 채우기
  for (const reportedUser in reportedList) {
    if (reportedList[reportedUser].length >= k) {
      reportedList[reportedUser].forEach((reportUser) => {
        emailCountObj[reportUser] = (emailCountObj[reportUser] || 0) + 1;
      });
    }
  }

  const resultArr = id_list.map((user) => emailCountObj[user] || 0);
  return resultArr;
}
