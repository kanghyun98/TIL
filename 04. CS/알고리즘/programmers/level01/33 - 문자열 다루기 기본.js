function solution(s) {
  return /^\d+$/.test(s) ? s.length === 4 || s.length === 6 : false;
}

// 모범 답안, 정규식을 조금 더 고민할 필요가 있어보인다.
function alpha_string46(s) {
  var regex = /^\d{6}$|^\d{4}$/;
  return regex.test(s);
}
